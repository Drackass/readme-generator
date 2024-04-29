"use client"
import Footer from "@/components/Footer";
import ReadMeGen from "@/components/ReadMeGen";
import ThumbnailGen from "@/components/ThumbnailGen";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThumbnail } from "@/context/thumbnail-context";

export default function Home() {


  return (
    <div id="app" className="relative overflow-y-hidden">
      <main className="max-w-2xl mx-auto flex flex-col gap-5 justify-center items-center pb-[8rem] p-6 mt-10">
        <Tabs defaultValue="thumbnail" className="w-full">
          <TabsList className="fixed top-5 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-muted/80 border z-50">
            <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
            <TabsTrigger value="readme">ReadMe</TabsTrigger>
          </TabsList>
          <TabsContent value="thumbnail">
            <ThumbnailGen />
          </TabsContent>
          <TabsContent value="readme">
            <ReadMeGen />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
