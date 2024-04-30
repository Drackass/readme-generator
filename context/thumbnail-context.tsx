"use client";
import { featuresList } from "@/lib/data";
import React, { useEffect, useState, createContext, useContext } from "react";

type feature = {
  name: string;
  logoDark: string;
  logoLight: string;
  label: string;
  checked: boolean;
}


type Thumbnail = {
  hexColor: string;
  darkMode: boolean;
  selectedImage: string | undefined;
  Url: string | undefined;
  title: string;
  info: string;
  Type: string;
  features: feature[]
};

const checkedFeaturesNames: string[]  = ["nextjs", "clerk", "react", "shadcn", "tailwind", "typescript", "prisma", "stripe" ]

const initThumbnail: Thumbnail = {
  hexColor: "#2563eb",
  darkMode: true,
  selectedImage: undefined,
  Url: undefined,
  title: "Full Stack 'E-Commerce'",
  info: "#42",
  Type: "default",
  features: featuresList.map(feature => ({
    ...feature,
    checked: checkedFeaturesNames.includes(feature.name)
  }))
};

type ThumbnailContextProviderProps = {
  children: React.ReactNode;
};

type ThumbnailContextType = {
  thumbnail: Thumbnail;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail>>
};

const ThumbnailContext = createContext<ThumbnailContextType | null>(null);

export default function ThumbnailContextProvider({
  children,
}: ThumbnailContextProviderProps) {
  const [thumbnail, setThumbnail] = useState<Thumbnail>(initThumbnail);

  return (
    <ThumbnailContext.Provider
      value={{
        thumbnail,
        setThumbnail
      }}
    >
      {children}
    </ThumbnailContext.Provider>
  );
}

export function useThumbnail() {
  const context = useContext(ThumbnailContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
