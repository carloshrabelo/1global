"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cx } from "class-variance-authority";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TextField from "@/components/TextField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

const formSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(3, {
    message: "First Name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "Last Name must be at least 3 characters.",
  }),
});

export type UserFormProps = {
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
} & Partial<User>;

export default function UserForm({
  className,
  onSubmit,
  onCancel,
  avatar = "/img/user.png",
  email,
  first_name,
  last_name,
}: UserFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      first_name,
      last_name,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="w-full flex justify-center">
        <Avatar className="w-[128px] h-[128px]">
          <AvatarImage
            className={cx({
              "dark:invert": avatar === "/img/user.png",
            })}
            src={avatar}
            alt="@shadcn"
          />
          <AvatarFallback>IMG</AvatarFallback>
        </Avatar>
      </div>
      <TextField
        register={register}
        name="first_name"
        label="First Name"
        errorMessage={errors?.first_name?.message}
      />
      <TextField
        register={register}
        name="last_name"
        label="Last Name"
        errorMessage={errors?.last_name?.message}
      />
      <TextField
        register={register}
        name="email"
        label="Email"
        errorMessage={errors?.email?.message}
      />
      <div className="flex justify-between mt-4">
        <Button onClick={onCancel} type="reset" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
