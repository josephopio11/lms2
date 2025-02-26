import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

const bannerVariants = cva(
  "border text-center py-1 px-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        success: "bg-green-500 text-white border-green-500",
        error: "bg-red-500 text-white border-red-500",
        warning: "bg-yellow-500 text-white border-yellow-500",
        info: "bg-blue-500 text-white border-blue-500",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(`italic ${bannerVariants({ variant })}`)}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </div>
  );
};

export default Banner;
