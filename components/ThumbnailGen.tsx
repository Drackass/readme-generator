"use client";
import {
  Check,
  ChevronsUpDown,
  GalleryThumbnails,
  ImageDown,
  Moon,
  Sun,
} from "lucide-react";
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

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DefaultThumbnail from "./DefaultTumbnail";
import BackgroungThumbnail from "./BackgroundThumbnaill";
import NeonThumbnail from "./NeonThumbnail";

export default function ThumbnailGen() {
  const elementRef = useRef(null);
  const [color, setColor] = useState({ hex: "#dc2626" });
  const [title, setTitle] = useState("Full Stack 'Netflix' Clone");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [info, setInfo] = useState("#42");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(thumbnailsTypes[0]?.value || "");

  const htmlToImageConvert = () => {
    toPng(elementRef.current ?? document.createElement('div') , { cacheBust: false })
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
          checked={darkMode}
          onCheckedChange={() => setDarkMode(!darkMode)}
          id="darkmode"
        />
        <Moon />
      </div>
      {value === "default" && (
        <DefaultThumbnail
          color={color}
          darkMode={darkMode}
          elementRef={elementRef}
          selectedImage={selectedImage}
          title={title}
          info={info}
        />
      )}
      {value === "background" && (
        <BackgroungThumbnail
          color={color}
          darkMode={darkMode}
          elementRef={elementRef}
          selectedImage={selectedImage}
          title={title}
          info={info}
        />
      )}

      {value === "neon" && (
        <NeonThumbnail
          color={color}
          darkMode={darkMode}
          elementRef={elementRef}
          selectedImage={selectedImage}
          title={title}
          info={info}
        />
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
            color={color.hex}
            onChangeComplete={(color: SetStateAction<{ hex: string }>) =>
              setColor(color)
            }
            className="!grid grid-cols-7"
          />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="resize-none"
          />

          <div className="flex gap-5">
            <Input
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? thumbnailsTypes.find(
                        (thumbnail) => thumbnail.value === value
                      )?.label
                    : "Select Type..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Type..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {thumbnailsTypes.map((thumbnail) => (
                        <CommandItem
                          key={thumbnail.value}
                          value={thumbnail.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === thumbnail.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {thumbnail.label}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedImage(file ? URL.createObjectURL(file) : undefined);
            }}
          />
        </Label>
      </div>
    </div>
  );
}
