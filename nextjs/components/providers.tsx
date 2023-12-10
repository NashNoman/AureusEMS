"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ThemesProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
