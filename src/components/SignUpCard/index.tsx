"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TextField from "@/components/TextField";

const formSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(1, { message: "Password is required" }).min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm: z.string().min(1, { message: "Password is required" }).min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export type SignUpCardProps = {
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export default function SignUpCard({ className, onSubmit }: SignUpCardProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Register to continue in the app</CardDescription>
        </CardHeader>
        <CardContent>
          <TextField
            register={register}
            name="email"
            label="Email"
            errorMessage={errors?.email?.message}
          />
          <TextField
            register={register}
            type="password"
            name="password"
            label="Password"
            errorMessage={errors?.password?.message}
          />
          <TextField
            register={register}
            type="password"
            name="confirm"
            label="Confirm Password"
            errorMessage={errors?.confirm?.message}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/signin">Login</Link>
          </Button>
          <Button type="submit">Register</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
