"use client";
import React, { useEffect, useState, createContext, useContext } from "react";

type Readme = {
  repositoryUrl: string;
  title: string;
  description: string;
  content: string;
};

const initReadme: Readme = {
  repositoryUrl: "",
  title: "Build a E-Commerce website With Next.js (2024)",
  description: "💰 This repository is made to contain a Full Stack E-Commerce website.",
  content: ""
};

type ReadmeContextProviderProps = {
  children: React.ReactNode;
};

type ReadmeContextType = {
  readme: Readme;
  setReadme: React.Dispatch<React.SetStateAction<Readme>>
};

const ReadmeContext = createContext<ReadmeContextType | null>(null);

export default function ReadmeContextProvider({
  children,
}: ReadmeContextProviderProps) {
  const [readme, setReadme] = useState<Readme>(initReadme);

  return (
    <ReadmeContext.Provider
      value={{
        readme,
        setReadme
      }}
    >
      {children}
    </ReadmeContext.Provider>
  );
}

export function useReadme() {
  const context = useContext(ReadmeContext);

  if (context === null) {
    throw new Error("useReadme must be used within a ReadmeContextProvider");
  }

  return context;
}
