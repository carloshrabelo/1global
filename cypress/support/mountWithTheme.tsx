import { mount } from "cypress/react18";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import "../../src/app/globals.css";
import "./commands";

export const mountWithTheme = (children: ReactNode) =>
  mount(
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>,
  );
