import React, { useRef } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import imageLight from "@/public/light.png";
import imageDark from "@/public/dark.png";
import { useThumbnail } from "@/context/thumbnail-context";

const inter = Inter({ subsets: ["latin"] });
const year = new Date().getFullYear();

interface DefaultThumbnailProps {
  elementRef: React.RefObject<HTMLDivElement>;
}

export default function DefaultThumbnail({
  elementRef,
}: DefaultThumbnailProps) {
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
                <span
                  key={index}
                  style={{ color: thumbnail.hexColor }}
                  className="mr-1"
                >
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
          style={{ backgroundColor: thumbnail.hexColor }}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[20rem] rounded-full opacity-70 filter blur-[100px]"
        ></div>
        <div
          style={{ backgroundColor: thumbnail.hexColor }}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[30rem] h-[10rem] rounded-full opacity-70 filter blur-[100px] z-10"
        ></div>
        <Image
          width={1280}
          height={720}
          src={
            thumbnail.selectedImage ??
            (thumbnail.darkMode ? imageDark : imageLight)
          }
          alt={`${thumbnail.title}-${year}`}
          className="absolute top-10 left-1/3 object-cover rounded-md"
        />
        <span className="absolute right-[1.25rem] text-4xl font-extrabold ">
          {thumbnail.info}
        </span>

        <div className="z-20">
          <p className="text-3xl font-extrabold">{year}</p>
        </div>
        <div className="text-6xl z-20 flex flex-col gap-3">
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
