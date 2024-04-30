import { useThumbnail } from "@/context/thumbnail-context";
import React from "react";

type SplitTitleProps = {
  title: string;
};

export default function SplitTitle({ title }: SplitTitleProps) {
  const { thumbnail } = useThumbnail();
  const highlights = title.match(/'(.*?)'/g);
  const globals = title.match(/(?:'([^']*)'|([^'"\s]+(?:\s+[^'"\s]+)*))/g);
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
}