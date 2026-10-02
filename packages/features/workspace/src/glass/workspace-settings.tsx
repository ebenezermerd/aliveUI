"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
  Spinner,
} from "@aliveui/glass";
import { useState } from "react";
import { useWorkspace, useWorkspaceActions } from "../react/provider.js";
import { toFieldErrors, workspaceSchema, type FieldErrors } from "../schemas.js";
import { useRunAction } from "./shared.js";

/** Rename the workspace. */
export function WorkspaceNameForm() {
  const { workspace } = useWorkspace();
  const actions = useWorkspaceActions();
  const run = useRunAction();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  return (
    <Form
      errors={errors}
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const parsed = workspaceSchema.safeParse(
          Object.fromEntries(new FormData(event.currentTarget)),
        );
        if (!parsed.success) return setErrors(toFieldErrors(parsed.error));
        setErrors({});
        setPending(true);
        await run(actions.updateWorkspace(parsed.data), "Workspace renamed");
        setPending(false);
      }}
    >
      <Field name="name">
        <FieldLabel>Workspace name</FieldLabel>
        <Input defaultValue={workspace.name} key={workspace.name} />
        <FieldError />
      </Field>
      <Button type="submit" variant="tinted" disabled={pending} className="self-start">
        {pending ? <Spinner size="sm" label="Saving" /> : null}
        Save
      </Button>
    </Form>
  );
}

/** Restore the demo data, with a confirmation first. */
export function ResetWorkspaceButton() {
  const actions = useWorkspaceActions();
  const run = useRunAction();
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="danger" />}>
        Reset workspace data
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset all workspace data?</AlertDialogTitle>
          <AlertDialogDescription>
            Projects, tasks, people and activity go back to the starting demo data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button />}>Cancel</AlertDialogClose>
          <AlertDialogClose
            render={<Button variant="danger" />}
            onClick={() => void run(actions.reset(), "Workspace reset")}
          >
            Reset
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
