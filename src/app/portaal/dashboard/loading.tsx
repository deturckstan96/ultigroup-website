function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E1DDD0] ${className ?? ""}`} />;
}

export default function DashboardLoading() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-7 w-48 mb-1.5" />
        <Skeleton className="h-3 w-56" />
      </div>

      {/* KPI kaarten */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E1DDD0] p-5">
            <Skeleton className="h-2.5 w-24 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-2.5 w-32" />
          </div>
        ))}
      </div>

      {/* Twee kolommen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E1DDD0] p-6">
          <div className="flex justify-between mb-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-1.5 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-[#E1DDD0] p-6">
          <div className="flex justify-between mb-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#E1DDD0] last:border-0">
                <div>
                  <Skeleton className="h-3 w-28 mb-1.5" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Laatste levering */}
      <div className="bg-white border border-[#E1DDD0] p-6 mt-6">
        <div className="flex justify-between mb-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex gap-8 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-2.5 w-16 mb-1.5" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
