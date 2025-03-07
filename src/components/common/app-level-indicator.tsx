import React from "react";

interface AppLevelIndicatorProps {
  indicator: number; // Comes dynamically from API in percentage
  totalIndicators?: number; // Default is 6, but can be adjusted
  filledColor?: string;
  emptyColor?: string;
}

const AppLevelIndicator: React.FC<AppLevelIndicatorProps> = ({
  indicator,
  totalIndicators = 6,
  filledColor = "bg-green-600",
  emptyColor = "bg-green-300",
}) => {

  const filledCount = Math.round((indicator / 100) * totalIndicators);
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalIndicators }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-8 rounded overflow-hidden transition-all duration-500 ${
            i < filledCount ? filledColor : emptyColor
          }`}
        />
      ))}
    </div>
  );
};

export default AppLevelIndicator;
