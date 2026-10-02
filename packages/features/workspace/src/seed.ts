import { projectColors } from "./constants.js";
import { addDays, startOfDay, toISODate } from "./dates.js";
import type { Member, Project, Task, TaskPriority, TaskStatus, WorkspaceData } from "./types.js";

export interface SeedOwner {
  id: string;
  name: string;
  email: string;
}

const teammates: [string, string, Member["role"]][] = [
  ["Grace Hopper", "grace@aliveui.dev", "admin"],
  ["Alan Turing", "alan@aliveui.dev", "member"],
  ["Katherine Johnson", "katherine@aliveui.dev", "member"],
  ["Margaret Hamilton", "margaret@aliveui.dev", "member"],
  ["Tim Berners Lee", "tim@aliveui.dev", "viewer"],
];

const projectSeeds: [string, string, Project["status"], number | null][] = [
  ["Glass design system", "Ship the complete glass component kit and its docs.", "active", 12],
  ["Mobile app", "Bring the console to iOS and Android with shared tokens.", "active", 30],
  ["Marketing site", "Relaunch the website with the new brand and case studies.", "planning", 45],
  ["Customer onboarding", "Guided setup that gets new teams productive on day one.", "active", 8],
  ["Analytics pipeline", "Collect usage events and surface them in the dashboard.", "paused", null],
  ["Brand refresh", "New logo, colours and type across every touchpoint.", "completed", -10],
];

const taskTitles = [
  "Write the component guidelines",
  "Audit colour contrast in dark mode",
  "Design the empty states",
  "Set up the release pipeline",
  "Interview five customers",
  "Draft the launch announcement",
  "Fix focus rings on Safari",
  "Prepare the quarterly roadmap",
  "Add keyboard shortcuts",
  "Review the pricing page copy",
  "Benchmark list rendering",
  "Create onboarding checklist",
  "Migrate icons to the new set",
  "Plan the team offsite",
  "Document the token contract",
  "Polish the toast animations",
  "Write integration tests",
  "Design the settings page",
  "Clean up stale feature flags",
  "Record the product demo",
  "Translate the app into German",
  "Optimise image loading",
  "Research competitor dashboards",
  "Set up error monitoring",
];

const statuses: TaskStatus[] = ["todo", "in_progress", "review", "done"];
const priorities: TaskPriority[] = ["low", "medium", "high", "urgent"];

/** A small seeded random generator, so demo data looks the same on every reset. */
function random(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return state / 4_294_967_296;
  };
}

/** Realistic starting data so every screen has something to show. */
export function createSeedData(owner: SeedOwner, now = new Date()): WorkspaceData {
  const rand = random(42);
  const pick = <T>(items: readonly T[]) => items[Math.floor(rand() * items.length)]!;
  const today = startOfDay(now);
  const iso = (daysAgo: number, hour = 10) => {
    const date = addDays(today, -daysAgo);
    date.setHours(hour, Math.floor(rand() * 60));
    return date.toISOString();
  };

  const members: Member[] = [
    {
      id: owner.id,
      name: owner.name,
      email: owner.email,
      role: "owner",
      status: "active",
      joinedAt: iso(60),
    },
    ...teammates.map(([name, email, role], index) => ({
      id: `member-${index + 1}`,
      name,
      email,
      role,
      status: index === teammates.length - 1 ? ("invited" as const) : ("active" as const),
      joinedAt: iso(50 - index * 5),
    })),
  ];
  const active = members.filter((member) => member.status === "active");

  const projects: Project[] = projectSeeds.map(([name, description, status, dueIn], index) => ({
    id: `project-${index + 1}`,
    name,
    description,
    status,
    color: projectColors[index % projectColors.length]!,
    dueDate: dueIn === null ? null : toISODate(addDays(today, dueIn)),
    createdAt: iso(40 - index * 3),
    updatedAt: iso(index + 1),
  }));

  const tasks: Task[] = Array.from({ length: 48 }, (_, index) => {
    const project = projects[index % projects.length]!;
    const status: TaskStatus = project.status === "completed" ? "done" : pick(statuses);
    const createdDaysAgo = Math.floor(rand() * 20) + 1;
    const completedDaysAgo = Math.max(0, createdDaysAgo - Math.floor(rand() * 6) - 1);
    const dueOffset = Math.floor(rand() * 24) - 6;
    return {
      id: `task-${index + 1}`,
      projectId: project.id,
      title: taskTitles[index % taskTitles.length]!,
      description: "",
      status,
      priority: pick(priorities),
      assigneeId: rand() > 0.15 ? pick(active).id : null,
      dueDate: rand() > 0.2 ? toISODate(addDays(today, dueOffset)) : null,
      createdAt: iso(createdDaysAgo, 9),
      updatedAt: iso(Math.min(createdDaysAgo, 3), 15),
      completedAt: status === "done" ? iso(completedDaysAgo, 17) : null,
    };
  });

  const activity = tasks
    .filter((task) => task.completedAt)
    .slice(0, 8)
    .map((task, index) => ({
      id: `activity-${index + 1}`,
      actorName: members.find((member) => member.id === task.assigneeId)?.name ?? owner.name,
      action: "completed",
      target: task.title,
      createdAt: task.completedAt!,
    }))
    .concat(
      projects.slice(0, 3).map((project, index) => ({
        id: `activity-project-${index + 1}`,
        actorName: pick(active).name,
        action: "updated project",
        target: project.name,
        createdAt: project.updatedAt,
      })),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return {
    workspace: {
      id: `workspace-${owner.id}`,
      name: `${owner.name.split(" ")[0]}'s workspace`,
      createdAt: iso(60),
    },
    projects,
    tasks,
    members,
    activity,
    notifications: [
      {
        id: "notification-1",
        title: "Welcome to your workspace",
        body: "This demo data lives in your browser. Reset it any time from Settings.",
        read: false,
        createdAt: iso(0, 8),
      },
      {
        id: "notification-2",
        title: "Grace Hopper mentioned you",
        body: "Can you review the component guidelines before Friday?",
        read: false,
        createdAt: iso(1, 16),
      },
      {
        id: "notification-3",
        title: "Customer onboarding is due soon",
        body: "The project is due in 8 days with open tasks remaining.",
        read: true,
        createdAt: iso(2, 11),
      },
    ],
  };
}
