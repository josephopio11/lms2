import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryItemProps {
  item: { id: string; name: string };
  icon: IconType;
}

const CategoryItem = ({ item, icon: Icon }: CategoryItemProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-x-1 rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700",
        //TODO: change style if active
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{item.name}</div>
    </button>
  );
};

export default CategoryItem;
