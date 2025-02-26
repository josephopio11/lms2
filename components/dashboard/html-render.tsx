import { cn } from "@/lib/utils";

type Props = {
  htmlText?: string | null;
};

const HtmlRender = ({ htmlText }: Props) => {
  return (
    <div
      className={cn(
        "prose prose-sm mx-auto w-full max-w-prose dark:prose-invert lg:prose-lg prose-h2:font-medium prose-p:text-xs prose-a:font-bold prose-a:italic prose-a:transition prose-a:duration-300 prose-a:ease-in-out hover:prose-a:text-red-700 prose-img:rounded-xl prose-img:shadow-lg prose-img:shadow-black/50 prose-img:transition-all prose-img:duration-300 prose-img:ease-in-out prose-img:hover:translate-y-1 sm:text-lg",
        htmlText ? "" : "font-serif italic text-muted-foreground",
      )}
      dangerouslySetInnerHTML={{
        __html: htmlText || "Nothing to display",
      }}
    />
  );
};

export default HtmlRender;
