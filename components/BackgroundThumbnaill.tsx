import React, { useRef } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import imageLight from "@/public/light.png";
import imageDark from "@/public/dark.png";
import { useThumbnail } from "@/context/thumbnail-context";
import SplitTitle from "./SplitTitle";

const inter = Inter({ subsets: ["latin"] });
const year = new Date().getFullYear();

interface BackgroundThumbnailProps {
  elementRef?: React.RefObject<HTMLDivElement>;
}

export default function BackgroundThumbnail({
  elementRef,
}: BackgroundThumbnailProps) {
  const { thumbnail} = useThumbnail();

  return (
    <div
      className="rounded-md overflow-hidden"
      style={{ filter: `drop-shadow(0px 0px 100px ${thumbnail.hexColor}22)` }}
    >
      <div
        ref={elementRef}
        className={`${inter.className} aspect-video relative h-full w-full ${
          thumbnail.darkMode ? "bg-black text-white" : "bg-white text-black"
        } flex flex-col justify-between p-5 font-semibold overflow-hidden`}
      >
        <div
          className={`w-full h-full absolute bottom-0 left-0 z-10 bg-gradient-to-t ${
            thumbnail.darkMode ? "from-black " : "from-white"
          } to-transparent`}
        ></div>
        <div
          className={`w-full h-1/3 absolute top-0 left-0 z-10 bg-gradient-to-b ${
            thumbnail.darkMode ? "from-black" : "from-white"
          } to-transparent`}
        ></div>
        <div
          style={{
            background: `linear-gradient(180deg, ${thumbnail.hexColor} 0%, rgba(0,0,0,0) 100%)`,
          }}
          className="opacity-25 w-full h-full absolute top-0 left-0 z-10"
        ></div>
        <Image
          width={1280}
          height={720}
          src={thumbnail.selectedImage ?? (thumbnail.darkMode ? imageDark : imageLight)}
          alt={`${thumbnail.title}-${year}`}
          className="absolute w-full h-full top-0 left-0 object-cover rounded-md"
        />
        <span className="absolute right-[1.25rem] text-4xl font-extrabold z-10">
          {thumbnail.info}
        </span>

        <div className="z-20">
          <p className="text-3xl font-extrabold">{year}</p>
        </div>
        <div className="text-6xl z-20 flex flex-col gap-3">
          <p>
          <SplitTitle title={thumbnail.title}/>
          </p>

          <div className="flex gap-2 flex-wrap">
            {thumbnail.features.map((feature, index) => {
              return feature.checked ? (
                <Image
                  key={index}
                  width={30}
                  height={30}
                  src={`/features/${feature.logoDark}`}
                  alt={feature.name}
                  className="object-contain"
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
