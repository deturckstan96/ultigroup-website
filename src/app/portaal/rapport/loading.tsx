function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E1DDD0] ${className ?? ""}`} />;
}

export default function RapportLoading() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-7 w-32 mb-1.5" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E1DDD0] p-6">
            <Skeleton className="h-4 w-40 mb-6" />
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
