"use client";

import { CircleUserRound, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import SignInCard, { SignInCardProps } from "@/components/SignInCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useSignInMutation } from "@/store/api/auth";

export default function Signin() {
  const { toast } = useToast();
  const router = useRouter();
  const [signIn] = useSignInMutation();
  const handleSubmit: SignInCardProps["onSubmit"] = (data) =>
    signIn(data)
      .unwrap()
      .then(() => router.push("/"))
      .catch(({ data }) =>
        toast({
          title: data?.error,
          variant: "destructive",
        }),
      );

  return (
    <>
      <SignInCard onSubmit={handleSubmit} className="min-w-[350px]" />
      <Card className="flex-1 space-y-1 bg-slate-200 border-slate-400 dark:bg-slate-700 dark:border-slate-900">
        <CardHeader>
          <CardTitle>Mock values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="flex gap-1 items-center text-sm font-medium">
            <CircleUserRound /> eve.holt@reqres.in
          </p>
          <p className="flex gap-1 items-center text-sm text-muted-foreground">
            <KeyRound />
            cityslicka
          </p>
        </CardContent>
      </Card>
    </>
  );
}
