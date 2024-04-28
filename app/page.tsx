import Footer from "@/components/Footer";
import ReadMeGen from "@/components/ReadMeGen";
import ThumbnailGen from "@/components/ThumbnailGen";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { features } from "@/lib/data";

export default function Home() {
  return (
    <div id="app" className="relative overflow-y-hidden">
      <main className="max-w-2xl mx-auto flex flex-col gap-5 justify-center items-center pb-[8rem] p-6 mt-10">
        <Tabs defaultValue="readme" className="w-full">
          <TabsList className="fixed top-5 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-muted/80 border z-50">
            <TabsTrigger value="readme">ReadMe</TabsTrigger>
            <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
          </TabsList>
          <TabsContent value="thumbnail">
            <ThumbnailGen />
          </TabsContent>
          <TabsContent value="readme">
            <ReadMeGen />
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-4 gap-5 w-full">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={feature.name}
                checked={feature.checked}
              />
              <label
                htmlFor={feature.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {feature.name}
              </label>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
