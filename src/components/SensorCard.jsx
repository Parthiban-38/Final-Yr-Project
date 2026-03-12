export default function SensorCard({ label, value, unit }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 text-white shadow-md">
      <h3 className="text-sm text-gray-400">{label}</h3>

      <p className="text-3xl font-bold">
        {value} {unit}
      </p>
    </div>
  );
}