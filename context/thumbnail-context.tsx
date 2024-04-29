"use client";

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
  selectedImage: string | null;
  title: string;
  features: feature[]
};

const initThumbnail: Thumbnail = {
  hexColor: "#000000",
  darkMode: false,
  selectedImage: null,
  title: "",
  features: [
    {
      name: "nextjs",
      logoDark: "dark/nextjs.png",
      logoLight: "light/nextjs.png",
      label: "📦 Package management with Next.js",
      checked: true,
    },
    {
      name: "chatGPT",
      logoDark: "dark/chatGPT.png",
      logoLight: "light/chatGPT.png",
      label: "💬 AI-powered chat with ChatGPT",
      checked: false,
    },
    {
      name: "clerk",
      logoDark: "dark/clerk.png",
      logoLight: "light/clerk.png",
      label: "🔒 Secure authentication powered by Clerk",
      checked: true,
    },
    {
      name: "react",
      logoDark: "dark/react.png",
      logoLight: "light/react.png",
      label: "🔄 Dynamic state management with React",
      checked: true,
    },
    {
      name: "shadcn",
      logoDark: "dark/shadcn.png",
      logoLight: "light/shadcn.png",
      label: "💅 Modern components with Shadcn",
      checked: true,
    },
    {
      name: "stripe",
      logoDark: "dark/stripe.png",
      logoLight: "light/stripe.png",
      label: "🌐 Payment services integration with Stripe",
      checked: false,
    },
    {
      name: "tailwind",
      logoDark: "dark/tailwind.png",
      logoLight: "light/tailwind.png",
      label: "💎 Sleek styling with Tailwind",
      checked: true,
    },
    {
      name: "typescript",
      logoDark: "dark/typescript.png",
      logoLight: "light/typescript.png",
      label: "⚙️ Static typing with TypeScript",
      checked: true,
    },
    {
      name: "prisma",
      logoDark: "dark/prisma.png",
      logoLight: "light/prisma.png",
      label: "📊 Data management and analytics with Prisma",
      checked: false,
    },
    {
      name: "docker",
      logoDark: "dark/docker.png",
      logoLight: "light/docker.png",
      label: "🛠️ Container management with Docker",
      checked: false,
    },
    {
      name: "flutter",
      logoDark: "dark/flutter.png",
      logoLight: "light/flutter.png",
      label: "📱 Mobile app development with Flutter",
      checked: false,
    },
    {
      name: "nextAuth",
      logoDark: "dark/nextAuth.png",
      logoLight: "light/nextAuth.png",
      label: "🤝 Secure authentication with NextAuth",
      checked: false,
    },
    {
      name: "symfony",
      logoDark: "dark/symfony.png",
      logoLight: "light/symfony.png",
      label: "🏗️ Web application development with Symfony",
      checked: false,
    },
    {
      name: "express",
      logoDark: "dark/express.png",
      logoLight: "light/express.png",
      label: "🌐 Server-side development with Express.js",
      checked: false,
    },
    {
      name: "nodejs",
      logoDark: "dark/nodejs.png",
      logoLight: "light/nodejs.png",
      label: "🌐 Server-side API development with Node.js",
      checked: false,
    },
    {
      name: "postgre",
      logoDark: "dark/postgre.png",
      logoLight: "light/postgre.png",
      label: "🗄️ Relational database management with PostgreSQL",
      checked: false,
    },
    {
      name: "mongodb",
      logoDark: "dark/mongodb.png",
      logoLight: "light/mongodb.png",
      label: "📈 NoSQL database management with MongoDB",
      checked: false,
    },
    {
      name: "firebase",
      logoDark: "dark/firebase.png",
      logoLight: "light/firebase.png",
      label: "🔥 Cloud services integration with Firebase",
      checked: false,
    },
    {
      name: "supabase",
      logoDark: "dark/supabase.png",
      logoLight: "light/supabase.png",
      label: "🔐 Data security with Supabase",
      checked: false,
    },
    {
      name: "markdown",
      logoDark: "dark/markdown.png",
      logoLight: "light/markdown.png",
      label: "📝 Content formatting and editing with Markdown",
      checked: false,
    },
  ],
};

type ThumbnailContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  thumbnail: Thumbnail;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail>>
};

const ThumbnailContext = createContext<ThemeContextType | null>(null);

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
