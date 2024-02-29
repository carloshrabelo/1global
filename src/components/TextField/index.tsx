import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import InputPassword from "../ui/input-password";

interface TextFieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errorMessage?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TextField = <T extends FieldValues>({
  id,
  name,
  label,
  type,
  register,
  errorMessage,
  inputProps,
}: TextFieldProps<T>) => {
  const MyInput = type !== "password" ? Input : InputPassword;
  const _id = id || `input-${name}`;

  return (
    <div>
      <Label htmlFor={_id}>{label}</Label>
      <MyInput
        id={_id}
        className={cn({
          "border-destructive": !!errorMessage,
        })}
        type={type}
        {...register(name)}
        {...inputProps}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextField;
