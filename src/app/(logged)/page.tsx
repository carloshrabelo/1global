"use client";

import { cx } from "class-variance-authority";
import { Pencil, UserPlus2Icon, UserRoundX } from "lucide-react";
import { useState } from "react";

import List from "@/components/List";
import ListItem from "@/components/List/ListItem";
import Pagination from "@/components/Pagination";
import UserFormDialog from "@/components/User/UserFormDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "@/store/api/users";

export default function Home() {
  const [page, setPage] = useState(1);
  const usersFilter = { page };
  const { data: users } = useGetUsersQuery(usersFilter);
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();
  const [removeUser] = useRemoveUserMutation();

  if (!users?.data) return;
  return (
    <div className="flex flex-col h-full">
      <List className="flex-1">
        {users.data.map((user) => (
          <ListItem key={user.id} className="gap-3 flex-row">
            <Avatar>
              <AvatarImage
                className={cx({
                  "dark:invert":
                    !user.avatar || user.avatar === "/img/user.png",
                })}
                src={user.avatar || "/img/user.png"}
              />
              <AvatarFallback>
                {user.first_name[0]}
                {user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <div>
                {user.first_name} {user.last_name}
              </div>
              <div>{user.email}</div>
            </div>
            <div className="flex gap-1">
              <UserFormDialog
                {...user}
                onSubmit={(data) =>
                  updateUser({ ...user, ...data, ...usersFilter })
                }
              >
                <Button size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </UserFormDialog>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => removeUser({ id: user.id, page })}
              >
                <UserRoundX className="h-4 w-4" />
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="fixed bottom-4 right-4">
        <UserFormDialog
          onSubmit={(data) => createUser({ ...data, ...usersFilter })}
        >
          <Button className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-400">
            <UserPlus2Icon />
          </Button>
        </UserFormDialog>
      </div>
      <Pagination current={page} pages={users.total_pages} onClick={setPage} />
    </div>
  );
}
