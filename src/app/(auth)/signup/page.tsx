"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import SignUpCard, { SignUpCardProps } from "@/components/SignUpCard";
import { useToast } from "@/components/ui/use-toast";
import { useSignUpMutation } from "@/store/api/auth";

export default function CardWithForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [signUp] = useSignUpMutation();
  const handleSubmit: SignUpCardProps["onSubmit"] = (data) =>
    signUp(data)
      .unwrap()
      .then(() => router.push("/"))
      .catch(({ data }) =>
        toast({
          title: data?.error,
          variant: "destructive",
        }),
      );

  return <SignUpCard onSubmit={handleSubmit} className="min-w-[350px]" />;
}
