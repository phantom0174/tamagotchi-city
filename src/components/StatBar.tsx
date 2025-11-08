import { Progress } from "@/components/ui/progress";

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  icon: string;
  iconType?: 'emoji' | 'svg';
}

const StatBar = ({ label, value, max, icon, iconType = 'emoji' }: StatBarProps) => {
  const percentage = (value / max) * 100;
  
  const getStatColor = () => {
    // For 力量 / 體力 / 心情 use thresholds relative to max:
    // - below 1/4 -> #D45251 (critical)
    // - below 1/2 -> #E7A43C (warning)
    const critical = "#D45251";
    const warning = "#E7A43C";
    if (label.includes("力量") || label.includes("體力") || label.includes("心情")) {
      if (value < max / 4) return critical;
      if (value < max / 2) return warning;
      return undefined;
    }

    if (percentage > 70) return "stat-good";
    if (percentage > 40) return "stat-medium";
    return "stat-low";
  };

  const statColor = getStatColor();

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-foreground">
          {iconType === 'svg' ? (
            <img src={icon} alt="" className="w-4 h-4" />
          ) : (
            <span>{icon}</span>
          )}
          <span className="font-medium">{label}</span>
        </span>
        <span className="text-muted-foreground">
          {value}/{max}
        </span>
      </div>
      <Progress value={percentage} className="h-2" indicatorStyle={statColor ? { backgroundColor: statColor } : undefined} />
    </div>
  );
};

export default StatBar;
