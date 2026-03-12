export default function RecommendationPanel({ message }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 text-white">

      <h2 className="text-lg mb-3">Farm Recommendation</h2>

      <p>{message}</p>

    </div>
  );
}