function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E1DDD0] ${className ?? ""}`} />;
}

export default function AfroepenLoading() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-7 w-40 mb-1.5" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-9 w-36" />
      </div>

      {/* Status legenda */}
      <div className="bg-white border border-[#E1DDD0] px-6 py-4 mb-6 flex items-center gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Afroep kaarten */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E1DDD0]">
            <div className="flex items-start justify-between px-6 py-4 border-b border-[#E1DDD0]">
              <div className="flex gap-4">
                <Skeleton className="w-9 h-9" />
                <div>
                  <div className="flex gap-2 mb-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-48 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-3 w-32 mb-1.5" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="px-6 py-3">
              <Skeleton className="h-1.5 w-full mb-2" />
              <div className="flex justify-between">
                {[...Array(4)].map((_, j) => <Skeleton key={j} className="h-2.5 w-16" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
