import React, { useRef } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import imageLight from "@/public/light.png";
import imageDark from "@/public/dark.png";

const inter = Inter({ subsets: ["latin"] });
const year = new Date().getFullYear();

interface ThumbnailProps {
  color: {
    hex: string;
  };
  darkMode: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  selectedImage: string | undefined;
  title: string;
  // features: {
  //     checked: boolean;
  //     image: string;
  //     name: string;
  // }[];
}

export default function Thumbnail({
  color,
  darkMode,
  elementRef,
  selectedImage,
  title,
}: ThumbnailProps) {
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
                  style={{ color: color.hex }}
                  className="uppercase mr-1"
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
        style={{ filter: `drop-shadow(0px 0px 100px ${color.hex}22)` }}
      >
        <div
          ref={elementRef}
          className={`${inter.className} aspect-video relative h-full w-full ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } flex flex-col justify-between p-5 font-semibold overflow-hidden`}
        >
          <div
            style={{ backgroundColor: color.hex }}
            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[20rem] rounded-full opacity-70 filter blur-[100px]"
          ></div>
          <div
            style={{ backgroundColor: color.hex }}
            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[30rem] h-[10rem] rounded-full opacity-70 filter blur-[100px] z-10"
          ></div>
          <Image
            width={1280}
            height={720}
            src={selectedImage ?? (darkMode ? imageDark : imageLight)}
            alt={`${title}-${year}`}
            className="absolute top-10 left-1/3 object-cover rounded-md"
          />

          <div className="z-20">
            <p className="text-3xl">{year}</p>
          </div>
          <div className="text-5xl z-20 flex flex-col gap-3">
            <p>{splitString(title)}</p>

            {/* <div className="flex gap-2 flex-wrap">
                        {features.map((feature, index) => {
                            return feature.checked ? (
                                <Image
                                    key={index}
                                    width={30}
                                    height={30}
                                    src={`/features/${feature.image}`}
                                    alt={feature.name}
                                    className="object-contain"
                                />
                            ) : null;
                        })}
                    </div> */}
          </div>
        </div>
      </div>
  );
}
