function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E1DDD0] ${className ?? ""}`} />;
}

export default function IoNummersLoading() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-7 w-36 mb-1.5" />
        <Skeleton className="h-3 w-52" />
      </div>
      <div className="bg-white border border-[#E1DDD0]">
        <div className="border-b border-[#E1DDD0] px-6 py-3 flex gap-12">
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="h-2.5 w-40" />
          <Skeleton className="h-2.5 w-28" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-[#E1DDD0] last:border-0 flex gap-12 items-center">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
