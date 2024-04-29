import { useThumbnail } from "@/context/thumbnail-context";
import { Checkbox } from "./ui/checkbox"

export default function Features() {
    const handleFeatureChange = (index: number) => {
        const newThumbnail = { ...thumbnail };
        newThumbnail.features[index].checked = !newThumbnail.features[index].checked;
        setThumbnail(newThumbnail);
      }
    const { thumbnail, setThumbnail} = useThumbnail();
  return (
    <div className="grid grid-cols-4 gap-5 w-full">
    {thumbnail.features.map((feature, index) => (
      <div key={index} className="flex items-center space-x-2">
        <Checkbox
          id={feature.name}
          checked={feature.checked}
          onCheckedChange={(checked) => {handleFeatureChange(index)}}
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
  )
}
