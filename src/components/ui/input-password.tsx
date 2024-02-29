"use client";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleVisibility = () => setShowPassword((visible) => !visible);
    const Icon = showPassword && !disabled ? EyeIcon : EyeOffIcon;

    return (
      <div className="relative">
        <Input
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          disabled={disabled}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={toggleVisibility}
          disabled={disabled}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">
            {showPassword ? "Hide" : "Show"} password
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  },
);

export default InputPassword;
