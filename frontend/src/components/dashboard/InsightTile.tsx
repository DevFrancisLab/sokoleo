import { cn } from "@/lib/utils";

interface InsightTileProps {
  icon: string;
  label: string;
  value: string;
  subtext?: string;
  variant?: "primary" | "secondary" | "accent";
}

const variantStyles = {
  primary: "bg-primary/10 border-primary/20",
  secondary: "bg-secondary/20 border-secondary/30",
  accent: "bg-accent/10 border-accent/20",
};

const InsightTile = ({ icon, label, value, subtext, variant = "primary" }: InsightTileProps) => {
  return (
    <div className={cn("insight-tile border-2 p-3 rounded-xl", variantStyles[variant])}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-lg font-bold text-foreground mt-0.5 truncate">{value}</p>
          {subtext && <p className="text-sm text-muted-foreground mt-1">{subtext}</p>}
        </div>
      </div>
    </div>
  );
};

export default InsightTile;
