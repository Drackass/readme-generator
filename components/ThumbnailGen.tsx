"use client";
import { GalleryThumbnails, Moon, Sun } from "lucide-react";
import Thumbnail from "./Thumbnail";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CirclePicker } from "react-color";
import { Switch } from "./ui/switch";
import { SetStateAction, useRef, useState } from "react";
import { colorsPicker } from "@/lib/data";
import { toPng } from "html-to-image";

export default function ThumbnailGen() {
  const elementRef = useRef(null);
  const [color, setColor] = useState({ hex: "#dc2626" });
  const [title, setTitle] = useState("Full Stack 'Netflix' Clone");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>();

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title}.png`;
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
      <Thumbnail
        color={color}
        darkMode={darkMode}
        elementRef={elementRef}
        selectedImage={selectedImage}
        title={title}
      />

      <Button
        className="w-full"
        onClick={htmlToImageConvert}
        variant={"outline"}
      >
        Download Image
      </Button>

      <Input
        type="file"
        accept="image/*"
        id="dropzone-file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setSelectedImage(file ? URL.createObjectURL(file) : undefined);
        }}
      />

      <div className="flex gap-3 w-full justify-between">
        <CirclePicker
          colors={colorsPicker}
          color={color.hex}
          onChangeComplete={(color: SetStateAction<{ hex: string }>) =>
            setColor(color)
          }
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex items-center justify-center space-x-2">
              <Sun />
              <Switch
                checked={darkMode}
                onCheckedChange={() => setDarkMode(!darkMode)}
                id="darkmode"
              />
              <Moon />
            </div>
          </div>

          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
