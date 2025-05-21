
import { Card, CardContent } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva(
  "flex items-center p-6 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-white",
        blue: "bg-gradient-to-r from-condo-blue/10 to-condo-teal/10 border-l-4 border-condo-blue",
        green: "bg-gradient-to-r from-green-500/10 to-green-400/5 border-l-4 border-green-500",
        orange: "bg-gradient-to-r from-amber-500/10 to-amber-400/5 border-l-4 border-amber-500",
        red: "bg-gradient-to-r from-red-500/10 to-red-400/5 border-l-4 border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatsCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  variant,
}) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className={statCardVariants({ variant })} style={{ padding: 0 }}>
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <div className="flex items-center mt-1">
              <span className={`text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              {description && <span className="text-xs text-muted-foreground ml-1">{description}</span>}
            </div>
          )}
          {!trend && description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
