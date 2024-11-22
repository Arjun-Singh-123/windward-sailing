interface Destination {
  emoji: string;
  value: number;
  label: string;
  bgColor: string;
  isCenter: boolean;
}
const StatItem = ({
  emoji,
  value,
  label,
  bgColor,
}: {
  emoji: string;
  value: number;
  label: string;
  bgColor: string;
}) => (
  <div className="flex gap-3 items-center justify-center">
    <div
      className={`w-20 h-20 rounded-full ${bgColor} bg-opacity-50 flex items-center justify-center mb-2`}
    >
      <span className="text-4xl">{emoji}</span>
    </div>
    <div>
      <div className="text-4xl font-bold text-white">
        {value.toLocaleString()}
      </div>
      <div className="text-xl text-white">{label}</div>
    </div>
  </div>
);
export default StatItem;
