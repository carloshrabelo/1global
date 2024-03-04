"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "@/components/ui/button";

const ToggleThemeButton = (props: ButtonProps) => {
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkTheme = currentTheme === "dark";
  const Icon = isDarkTheme ? Sun : Moon;

  return (
    <Button
      aria-label="Toggle theme"
      {...props}
      onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default ToggleThemeButton;
