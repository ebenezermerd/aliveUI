import { describe, expect, it } from "vitest";
import { createLocalWorkspaceAdapter, createMemoryStorage } from "./local.js";

const owner = { id: "owner-1", name: "Ada Lovelace", email: "ada@example.com" };

function setup(seed = true) {
  const storage = createMemoryStorage();
  return createLocalWorkspaceAdapter({ owner, storage, latency: 0, seed });
}

describe("local workspace adapter", () => {
  it("seeds a realistic workspace with the owner as its first member", async () => {
    const data = await setup().load();
    expect(data.projects.length).toBeGreaterThan(3);
    expect(data.tasks.length).toBeGreaterThan(20);
    expect(data.members[0]).toMatchObject({ id: owner.id, role: "owner", status: "active" });
  });

  it("persists projects and logs activity", async () => {
    const adapter = setup(false);
    const project = await adapter.createProject({
      name: "Launch",
      description: "",
      status: "active",
      color: "#3b82f6",
      dueDate: null,
    });
    const reloaded = await adapter.load();
    expect(reloaded.projects.map((item) => item.id)).toEqual([project.id]);
    expect(reloaded.activity[0]).toMatchObject({ action: "created project", target: "Launch" });
  });

  it("stamps completion when a task moves to done and clears it when reopened", async () => {
    const adapter = setup(false);
    const project = await adapter.createProject({
      name: "Launch",
      description: "",
      status: "active",
      color: "#3b82f6",
      dueDate: null,
    });
    const task = await adapter.createTask({
      projectId: project.id,
      title: "Write docs",
      description: "",
      status: "todo",
      priority: "high",
      assigneeId: null,
      dueDate: null,
    });
    expect(task.completedAt).toBeNull();
    const done = await adapter.updateTask(task.id, { status: "done" });
    expect(done.completedAt).not.toBeNull();
    const reopened = await adapter.updateTask(task.id, { status: "in_progress" });
    expect(reopened.completedAt).toBeNull();
  });

  it("removes a project's tasks with it", async () => {
    const adapter = setup();
    const data = await adapter.load();
    const project = data.projects[0]!;
    await adapter.deleteProject(project.id);
    const after = await adapter.load();
    expect(after.tasks.some((task) => task.projectId === project.id)).toBe(false);
  });

  it("guards members: no duplicates, keeps an owner, unassigns removed people", async () => {
    const adapter = setup();
    await expect(
      adapter.inviteMember({ name: "Ada", email: "ADA@example.com", role: "member" }),
    ).rejects.toMatchObject({ code: "DUPLICATE_MEMBER" });
    await expect(adapter.updateMember(owner.id, { role: "member" })).rejects.toMatchObject({
      code: "LAST_OWNER",
    });

    const data = await adapter.load();
    const assigned = data.tasks.find((task) => task.assigneeId && task.assigneeId !== owner.id)!;
    await adapter.removeMember(assigned.assigneeId!);
    const after = await adapter.load();
    expect(after.tasks.find((task) => task.id === assigned.id)!.assigneeId).toBeNull();
  });

  it("marks notifications read and resets to the seed", async () => {
    const adapter = setup();
    await adapter.markNotificationsRead();
    expect((await adapter.load()).notifications.every((item) => item.read)).toBe(true);
    const reset = await adapter.reset();
    expect(reset.notifications.some((item) => !item.read)).toBe(true);
  });
});
