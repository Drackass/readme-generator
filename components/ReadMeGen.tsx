import { useThumbnail } from "@/context/thumbnail-context";
import {
  AlertCircle,
  AlignLeft,
  ArrowDownToLine,
  ClipboardCheck,
  FileText,
  Globe,
  Type,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import BackgroundThumbnail from "./BackgroundThumbnaill";
import NeonThumbnail from "./NeonThumbnail";
import DefaultThumbnail from "./DefaultTumbnail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useReadme } from "@/context/readme-context";

export default function ReadMeGen() {
  const { toast } = useToast();
  const { readme, setReadme } = useReadme();
  const { thumbnail } = useThumbnail();
  const [markdown, setMarkdown] = useState<string>("");
  const features = thumbnail.features.filter((feature) => feature.checked);
  useEffect(() => {
    setMarkdown(
      `# ${readme.title}\n\n![${
        readme.repositoryUrl.split("/")[4]
      }-tumbnail](https://github.com/${
        readme.repositoryUrl.split("https://github.com/")[1]
      }/raw/main/public/tumbnail.png)\n\n${readme.description}${
        features.length > 0
          ? "Key Features:\n\n" +
            features.map((feature) => `- ${feature.label}`).join("\n")
          : ""
      }\n\nCloning the repository\n\n\`\`\`bash\ngit clone git@github.com:${
        readme.repositoryUrl.split("https://github.com/")[1]
      }.git \n\`\`\``
    );
  }, [
    features,
    thumbnail.title,
    readme.title,
    readme.description,
    readme.repositoryUrl,
  ]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex flex-col gap-3 items-center mt-10">
        <FileText size={50} /> ReadMe Generator
      </h1>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="repository" className="flex items-center gap-1">
          <Globe size={17} />
          Repository Url
        </Label>
        <Input
          type="text"
          value={readme.repositoryUrl}
          onChange={(e) =>
            setReadme({ ...readme, repositoryUrl: e.target.value })
          }
          id="repository"
          placeholder="Repository Url"
        />
      </div>
      {!/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(readme.repositoryUrl) &&
        readme.repositoryUrl.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Please enter a valid GitHub repository url
            </AlertDescription>
          </Alert>
        )}

      {/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(readme.repositoryUrl) && (
        <div className="flex flex-col gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title" className="flex items-center gap-1">
              <Type size={17} />
              Title
            </Label>
            <Input
              type="text"
              value={readme.title}
              onChange={(e) => setReadme({ ...readme, title: e.target.value })}
              id="title"
              placeholder="Title"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title" className="flex items-center gap-1">
              <AlignLeft size={17} />
              Description
            </Label>
            <Textarea
              value={readme.description}
              onChange={(e) =>
                setReadme({ ...readme, description: e.target.value })
              }
              id="description"
              placeholder=""
            />
          </div>
          <Features />
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>README.md</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col ">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
                {readme.title}
              </h1>
              {thumbnail.Type === "background" ? (
                <BackgroundThumbnail />
              ) : thumbnail.Type === "neon" ? (
                <NeonThumbnail />
              ) : (
                <DefaultThumbnail />
              )}
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {readme.description}
              </p>

              {features.length > 0 && (
                <>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Key Features:
                  </p>
                  <ul className=" ml-6 list-disc [&>li]:mt-2">
                    {features.map((feature) => (
                      <li key={feature.name}>{feature.label}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Cloning the repository
              </p>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-2">
                git clone git@github.com:
                {readme.repositoryUrl.split("https://github.com/")[1]}.git
              </code>
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
                  });
                }}
              >
                Download <ArrowDownToLine size={17} />
              </Button>
              <Button
                className="flex gap-1"
                variant={"outline"}
                onClick={() => {
                  navigator.clipboard.writeText(markdown);
                  toast({
                    title: "README.md copied to clipboard",
                    description: "You can now paste it in your repository",
                  });
                }}
              >
                Copy <ClipboardCheck size={17} />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
