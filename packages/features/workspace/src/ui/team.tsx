"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  IconButton,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@aliveui/glass";
import { useMemo, useState } from "react";
import { memberRoles } from "../constants.js";
import { timeAgo } from "../dates.js";
import { useWorkspace, useWorkspaceActions } from "../react/provider.js";
import type { Member, MemberRole } from "../types.js";
import { InviteDialog } from "./dialogs.js";
import { MemberAvatar, PageHeader, useRunAction } from "./shared.js";

function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="3.5" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="12.5" cy="8" r="1.25" />
    </svg>
  );
}

function MemberActions({ member, isSelf }: { member: Member; isSelf: boolean }) {
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [confirming, setConfirming] = useState(false);
  if (isSelf) return null;
  return (
    <>
      <Menu>
        <MenuTrigger
          render={
            <IconButton aria-label={`Actions for ${member.name}`} variant="ghost" size="sm" />
          }
        >
          <DotsIcon />
        </MenuTrigger>
        <MenuContent align="end">
          {member.status === "invited" ? (
            <>
              <MenuItem
                onClick={() => toast({ title: "Invitation resent", description: member.email })}
              >
                Resend invitation
              </MenuItem>
              <MenuItem
                onClick={() =>
                  void run(
                    actions.updateMember(member.id, { status: "active" }),
                    `${member.name} joined`,
                  )
                }
              >
                Mark as accepted
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => toast({ title: "Copied", description: member.email })}>
              Copy email
            </MenuItem>
          )}
          <MenuSeparator />
          <MenuItem destructive onClick={() => setConfirming(true)}>
            {member.status === "invited" ? "Revoke invitation" : "Remove from workspace"}
          </MenuItem>
        </MenuContent>
      </Menu>
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {member.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Their tasks stay in the workspace and become unassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button />}>Cancel</AlertDialogClose>
            <AlertDialogClose
              render={<Button variant="danger" />}
              onClick={() => void run(actions.removeMember(member.id), `${member.name} removed`)}
            >
              Remove
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export interface TeamViewProps {
  /** The signed in person's member id, who cannot remove or demote themselves here. */
  currentMemberId: string;
}

/** People in the workspace, their roles, invitations and workload. */
export function TeamView({ currentMemberId }: TeamViewProps) {
  const { members, tasks } = useWorkspace();
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [inviting, setInviting] = useState(false);
  const [query, setQuery] = useState("");

  const workload = useMemo(() => {
    const counts = new Map<string, number>();
    for (const task of tasks) {
      if (task.assigneeId && task.status !== "done")
        counts.set(task.assigneeId, (counts.get(task.assigneeId) ?? 0) + 1);
    }
    return counts;
  }, [tasks]);

  const visible = members.filter((member) => {
    const text = query.trim().toLowerCase();
    return !text || member.name.toLowerCase().includes(text) || member.email.includes(text);
  });
  const invited = members.filter((member) => member.status === "invited").length;

  return (
    <>
      <PageHeader
        title="Team"
        description={`${members.length - invited} members${invited ? `, ${invited} invited` : ""}.`}
        actions={
          <Button variant="tinted" onClick={() => setInviting(true)}>
            Invite people
          </Button>
        }
      />
      <Input
        aria-label="Search people"
        placeholder="Search by name or email"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        className="mb-6 w-full sm:w-72"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Person</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Open tasks</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((member) => {
            const isSelf = member.id === currentMemberId;
            return (
              <TableRow key={member.id}>
                <TableCell>
                  <span className="flex items-center gap-3">
                    <MemberAvatar member={member} size="md" />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-medium">
                        {member.name}
                        {isSelf ? <Badge tone="accent">You</Badge> : null}
                        {member.status === "invited" ? <Badge tone="warning">Invited</Badge> : null}
                      </span>
                      <span className="block text-xs text-muted-foreground">{member.email}</span>
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    aria-label={`Role for ${member.name}`}
                    items={memberRoles.map(({ value, label }) => ({
                      value,
                      label,
                      disabled: value === "owner" && member.role !== "owner",
                    }))}
                    value={member.role}
                    disabled={isSelf}
                    onValueChange={(value) =>
                      value &&
                      value !== member.role &&
                      void run(
                        actions.updateMember(member.id, { role: value as MemberRole }),
                        "Role updated",
                      )
                    }
                    className="min-w-32"
                  />
                </TableCell>
                <TableCell className="tabular-nums">{workload.get(member.id) ?? 0}</TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {member.status === "invited" ? "Pending" : timeAgo(member.joinedAt)}
                </TableCell>
                <TableCell>
                  <MemberActions member={member} isSelf={isSelf} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <InviteDialog open={inviting} onOpenChange={setInviting} />
    </>
  );
}
