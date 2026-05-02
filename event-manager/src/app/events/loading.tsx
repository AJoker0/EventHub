// src/app/events/loading.tsx
import SkeletonCard from "./SkeletonCard";

export default function LoadingEvents() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="h-10 w-48 bg-gray-700 rounded skeleton"></div>
        <div className="h-10 w-32 bg-green-800 rounded skeleton"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}