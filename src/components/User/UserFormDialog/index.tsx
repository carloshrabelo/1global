import { UserRound } from "lucide-react";
import { ReactNode, cloneElement, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UserForm, { UserFormProps } from "../UserForm";

import { User } from "@/types/user";

type UserFormDialogProps = Partial<User> & {
  children?: ReactNode;
  onSubmit: UserFormProps["onSubmit"];
};

const UserFormDialog = ({
  children,
  onSubmit,
  ...user
}: UserFormDialogProps) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const actionButton = children ? (
    cloneElement(children as React.ReactElement, { onClick: openDialog })
  ) : (
    <Button size="icon" onClick={openDialog} data-cy="user-form-dialog-button">
      <UserRound className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {actionButton}
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>{user.id ? "Edit" : "New"} User</DialogTitle>
          <DialogDescription>
            {user.id ? "Make changes to" : "Create new"} user here. Click save
            when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserForm
          {...user}
          onSubmit={(e) => {
            onSubmit(e);
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
