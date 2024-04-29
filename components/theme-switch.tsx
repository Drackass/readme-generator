"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Button } from "./ui/button";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 size-14 text-xl rounded-full hover:scale-[1.15] active:scale-105 transition-all "
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </Button>
  );
}
