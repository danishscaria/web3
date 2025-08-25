interface ProgressProps {
  percent: number;
}

export default function Progress({ percent }: ProgressProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${clampedPercent}%` }}
      ></div>
    </div>
  );
}