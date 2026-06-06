function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E1DDD0] ${className ?? ""}`} />;
}

export default function LeveringenLoading() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-7 w-40 mb-1.5" />
        <Skeleton className="h-3 w-44" />
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E1DDD0]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1DDD0]">
              <div className="flex gap-8">
                <div>
                  <Skeleton className="h-2.5 w-16 mb-1.5" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div>
                  <Skeleton className="h-2.5 w-12 mb-1.5" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-2.5 w-20 mb-1.5" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            {/* Tabel */}
            <div className="px-6 py-4">
              <div className="space-y-3">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <Skeleton className="h-3 w-48" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
