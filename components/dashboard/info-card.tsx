import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  LucideIcon,
  TrendingDown,
  TrendingUp,
  TrendingUpDownIcon,
} from "lucide-react";
import type React from "react";

const infoCardVariants = cva("transition-colors", {
  variants: {
    trend: {
      up: "text-green-500",
      down: "text-red-500",
      neutral: "text-gray-500",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

interface InfoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCardVariants> {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  description?: string;
  trendValue?: string | number;
  isCurrency?: boolean;
}

export function InfoCard({
  title,
  value,
  Icon,
  description,
  trendValue,
  className,
  isCurrency,
  ...props
}: InfoCardProps) {
  const trend =
    trendValue === 0 || trendValue === undefined
      ? "neutral"
      : Number(trendValue) > 0
        ? "up"
        : "down";
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency ? formatCurrency(Number(value)) : value}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div
            className={cn(
              "mt-2 flex items-center text-sm font-medium",
              infoCardVariants({ trend }),
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : trend === "down" ? (
              <TrendingDown className="mr-1 h-4 w-4" />
            ) : (
              <TrendingUpDownIcon className="mr-1 h-4 w-4" />
            )}
            {trendValue}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
