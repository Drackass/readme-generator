import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import imageLight from "@/public/light.png";
import imageDark from "@/public/dark.png";
import { useThumbnail } from "@/context/thumbnail-context";

const inter = Inter({ subsets: ["latin"] });
const year = new Date().getFullYear();

interface NeonThumbnailProps {
  elementRef: React.RefObject<HTMLDivElement>;
}

export default function NeonThumbnail({
  elementRef,
}: NeonThumbnailProps) {
  const { thumbnail } = useThumbnail();

  const splitString = (str: string) => {
    const highlights = str.match(/'(.*?)'/g);
    const globals = str.match(/(?:'([^']*)'|([^'"\s]+(?:\s+[^'"\s]+)*))/g);
    return (
      <>
        {globals?.map((text, index) => {
          if (highlights?.includes(text)) {
            return (
              <>
                <br />
                <span key={index} style={{ color: thumbnail.hexColor }} className="mr-1">
                  {text.replace(/'/g, "")}
                </span>
              </>
            );
          } else {
            return <span key={index}>{text}</span>;
          }
        })}
      </>
    );
  };

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
          className={`w-full h-1/2 absolute bottom-0 left-0 z-10 bg-gradient-to-t ${
            thumbnail.darkMode ? "from-black " : "from-white"
          } to-transparent`}
        ></div>
        <Image
          style={{
            border: `4px solid ${thumbnail.hexColor}`,
            filter: `drop-shadow(0 0 25px ${thumbnail.hexColor})`,
          }}
          width={1280}
          height={720}
          src={thumbnail.selectedImage ?? (thumbnail.darkMode ? imageDark : imageLight)}
          alt={`${thumbnail.title}-${year}`}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] object-cover rounded-md"
        />
        <span className="w-full flex justify-center text-5xl tracking-tight font-extrabold">
          {thumbnail.info}
        </span>

        <div className="z-20"></div>
        <div className="text-6xl z-20 flex flex-col gap-3 items-center text-center">
          <p>{splitString(thumbnail.title)}</p>

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
