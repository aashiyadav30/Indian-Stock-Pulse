interface PriceChangeBadgeProps {
  change: number;
  changePercent: number;
  size?: "sm" | "md" | "lg";
}

const PriceChangeBadge = ({ change, changePercent, size = "sm" }: PriceChangeBadgeProps) => {
  const isPositive = change >= 0;
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-mono font-medium ${sizeClasses[size]} ${
        isPositive ? "bg-gain text-gain" : "bg-loss text-loss"
      }`}
    >
      {isPositive ? "+" : ""}
      {change.toFixed(2)} ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
    </span>
  );
};

export default PriceChangeBadge;
