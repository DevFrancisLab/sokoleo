import { useState } from "react";
import { ChevronDown, MapPin, Package, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarketCardProps {
  name: string;
  price: number;
  demand: "high" | "medium" | "low";
  crates: number;
  bestTime: string;
  distance: number;
}

const demandConfig = {
  high: { emoji: "🟢", label: "High" },
  medium: { emoji: "🟡", label: "Medium" },
  low: { emoji: "🔴", label: "Low" },
};

const MarketCard = ({ name, price, demand, crates, bestTime, distance }: MarketCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const demandInfo = demandConfig[demand];

  return (
    <div className="market-card animate-fade-in-up border rounded-2xl p-4 bg-card">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-left">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">🏪</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-foreground truncate">{name}</h3>
            <p className="text-base md:text-lg font-semibold text-primary mt-1">Ksh {price}/kg</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
              <span className="text-lg">{demandInfo.emoji}</span>
              <span className="text-sm font-medium text-muted-foreground">{demandInfo.label}</span>
            </div>
            <ChevronDown className={cn("w-6 h-6 text-muted-foreground transition-transform duration-300", isExpanded && "rotate-180")} />
          </div>
        </div>
      </button>

      <div className={cn("transition-all duration-300 overflow-hidden", isExpanded ? "max-h-96 mt-4" : "max-h-0") }>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Needs</p>
              <p className="text-lg font-bold text-foreground">{crates} crates</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Clock className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Best Time</p>
              <p className="text-lg font-bold text-foreground">{bestTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 col-span-2">
            <Navigation className="w-8 h-8 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-lg font-bold text-foreground">{distance} km away</p>
            </div>
            <MapPin className="w-6 h-6 text-destructive ml-auto" />
          </div>
        </div>

        <Button className="w-full btn-large bg-primary hover:bg-primary/90 text-primary-foreground">See Details</Button>
      </div>
    </div>
  );
};

export default MarketCard;
