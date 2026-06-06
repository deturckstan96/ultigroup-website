function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E1DDD0] ${className ?? ""}`} />;
}

export default function StockLoading() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-7 w-36 mb-1.5" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-9 w-36" />
      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E1DDD0] p-5">
            <Skeleton className="h-2.5 w-24 mb-3" />
            <Skeleton className="h-7 w-20" />
          </div>
        ))}
      </div>

      {/* Tabel */}
      <div className="bg-white border border-[#E1DDD0]">
        <div className="border-b border-[#E1DDD0] px-6 py-3 flex gap-8">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="h-2.5 w-28" />
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2.5 w-48" />
          <Skeleton className="h-2.5 w-16" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-[#E1DDD0] last:border-0 flex gap-8 items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-16" />
            <div className="flex-1 flex items-center gap-3">
              <Skeleton className="flex-1 h-1.5" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-6 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}
