"use client";
import { GalleryThumbnails, ImageDown, Moon, Sun } from "lucide-react";
import Thumbnail from "./Thumbnail";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CirclePicker } from "react-color";
import { Switch } from "./ui/switch";
import { SetStateAction, useRef, useState } from "react";
import { colorsPicker, thumbnailsTypes } from "@/lib/data";
import { toPng } from "html-to-image";
import { Label } from "./ui/label";
import { Textarea } from "@/components/ui/textarea";
import DefaultThumbnail from "./DefaultTumbnail";
import BackgroungThumbnail from "./BackgroundThumbnaill";
import NeonThumbnail from "./NeonThumbnail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Features from "./Features";
import { useThumbnail } from "@/context/thumbnail-context";
import BackgroundThumbnail from "./BackgroundThumbnaill";
// type feature = {
//   name: string;
//   logoDark: string;
//   logoLight: string;
//   label: string;
//   checked: boolean;
// }

// type Thumbnail = {
//   hexColor: string;
//   darkMode: boolean;
//   selectedImage: string | null;
//   title: string;
//   features: feature[]
// };
export default function ThumbnailGen() {
  const elementRef = useRef(null);
  const { thumbnail, setThumbnail } = useThumbnail();

  const htmlToImageConvert = () => {
    toPng(elementRef.current ?? document.createElement("div"), {
      cacheBust: false,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `tumbnail.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex flex-col gap-3 items-center mt-10">
        <GalleryThumbnails size={50} /> Thumbail Generator
      </h1>
      <div className="flex items-center justify-center space-x-2">
        <Sun />
        <Switch
          checked={thumbnail.darkMode}
          onCheckedChange={() =>
            setThumbnail({ ...thumbnail, darkMode: !thumbnail.darkMode })
          }
          id="darkmode"
        />
        <Moon />
      </div>
      {thumbnail.Type === "background" ? (
        <BackgroundThumbnail elementRef={elementRef} />
      ) : thumbnail.Type === "neon" ? (
        <NeonThumbnail elementRef={elementRef} />
      ) : (
        <DefaultThumbnail elementRef={elementRef} />
      )}
      <Button
        className="w-full"
        onClick={htmlToImageConvert}
        variant={"outline"}
      >
        Download
      </Button>

      <div className="flex gap-5 justify-between">
        <div>
          <CirclePicker
            colors={[...colorsPicker]}
            color={thumbnail.hexColor}
            onChangeComplete={(color) =>
              setThumbnail({ ...thumbnail, hexColor: color.hex })
            }
            className="!grid grid-cols-7"
          />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <Textarea
            value={thumbnail.title}
            onChange={(e) =>
              setThumbnail({ ...thumbnail, title: e.target.value })
            }
            className="resize-none"
          />

          <div className="flex gap-5">
            <Input
              type="text"
              value={thumbnail.info}
              onChange={(e) =>
                setThumbnail({ ...thumbnail, info: e.target.value })
              }
            />
            <Select
              onValueChange={(value) =>
                setThumbnail({ ...thumbnail, Type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Default"}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {thumbnailsTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-dashed cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm hover:opacity-80 transition"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <ImageDown size={30} />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-sm ">SVG, PNG, JPG (Pref. 1280x720px)</p>
          </div>
          <Input
            type="file"
            accept="image/*"
            id="dropzone-file"
            className="hidden"
            // onChange={(e) => {
            //   const file = e.target.files?.[0];
            //   setSelectedImage(file ? URL.createObjectURL(file) : undefined);
            // }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setThumbnail({
                ...thumbnail,
                selectedImage: file ? URL.createObjectURL(file) : undefined,
              });
            }}
          />
        </Label>
      </div>
      <Features />
    </div>
  );
}
