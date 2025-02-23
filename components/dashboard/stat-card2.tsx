import { cn, formatNumber } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  percentage?: number;
  Icon: LucideIcon;
};

const StatCard2 = ({ title, value, percentage, Icon }: StatCardProps) => {
  return (
    <div className=" rounded-xl bg-muted/50 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="tracking-tight text-sm font-medium">{title}</div>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{formatNumber(value)}</div>
          <div className="flex flex-row">
            {percentage && percentage < 0 ? (
              <TrendingDown className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingUp className="h-4 w-4 text-primary" />
            )}
            <p
              className={cn(
                "text-xs ml-1",
                percentage && percentage < 0
                  ? "text-destructive"
                  : "text-primary"
              )}
            >
              {percentage}% from last year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard2;
