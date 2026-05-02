export default function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-64 skeleton">
      <div>
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-6"></div>
        
        <div className="space-y-2">
          <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-10 w-full bg-blue-100 rounded mt-4"></div>
    </div>
  );
}
