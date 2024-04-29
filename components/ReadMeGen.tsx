import { useThumbnail } from "@/context/thumbnail-context";
import { AlignLeft, ArrowDownToLine, ClipboardCheck, FileText, Globe, Type } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Features from "./Features";
import { useToast } from "@/components/ui/use-toast"

export default function ReadMeGen() {
  const { toast } = useToast()
  const { thumbnail } = useThumbnail();
  const [markdown, setMarkdown] = useState<string>("");
  const [repository, setRepository] = useState<string>("");
  const [title, setTitle] = useState<string>("Project Title");
  const [description, setDescription] = useState<string>(
    "⚙️ lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const features = thumbnail.features.filter((feature) => feature.checked);
  useEffect(() => {
    setMarkdown(
      `# ${title}\n\n${description}\n\n![${repository.split("/")[4]}-tumbnail](https://github.com/${
      repository.split("https://github.com/")[1]
      }/raw/main/public/tumbnail.png)\n\n${features.length > 0 ? "Key Features:\n\n" + features
      .map((feature) => `- ${feature.label}`)
      .join("\n") : ""}`
    );
  }, [features, thumbnail.title]);

  

  return (
    <div className="flex flex-col gap-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex flex-col gap-3 items-center mt-10">
        <FileText size={50} /> ReadMe Generator
      </h1>

      <div className="flex flex-col gap-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="repository" className="flex items-center gap-1">
            <Globe size={17} />
            Repository Url
          </Label>
          <Input
            type="text"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            id="repository"
            placeholder="Repository Url"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title" className="flex items-center gap-1">
            <Type size={17} />
            Title
          </Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="title"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title" className="flex items-center gap-1">
            <AlignLeft size={17} />
            Title
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Description"
          />
        </div>
      </div>
      <Features />
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
          README.md
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Markdown
            className=""
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h1
                  className="scroll-m-20 text-2xl font-semibold tracking-tight"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="leading-7 [&:not(:first-child)]:mt-6"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="w-full rounded-md" {...props} />
              ),
            }}
          >
            {markdown}
          </Markdown>
        </CardContent>
        <CardFooter className="flex- gap-3 justify-between">
          <Button
          className="flex gap-1"
            onClick={() => {
              const link = document.createElement("a");
              link.download = `README.md`;
              link.href = `data:text/markdown;charset=utf-8,${encodeURIComponent(
                markdown
              )}`;
              link.click();
              toast({
                title: "README.md downloaded",
                description: "You can now add it to your repository",
              })
            }}
          >
            Download <ArrowDownToLine size={17} />
          </Button>
          <Button
            className="flex gap-1"
            variant={"outline"}
            onClick={() => {
              navigator.clipboard.writeText(markdown)
              toast({
                title: "README.md copied to clipboard",
                description: "You can now paste it in your repository",
              })
            }}
          >
            Copy <ClipboardCheck size={17} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
