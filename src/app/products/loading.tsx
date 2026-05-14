export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] pt-[72px]">
      {/* Sticky header + filter bar skeleton */}
      <div className="sticky z-30 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[rgba(26,15,8,0.06)]" style={{ top: 72 }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="py-3 flex items-center gap-4">
            {/* Title shimmer */}
            <div className="h-5 w-14 rounded bg-[#F7F5F0] animate-pulse" />

            {/* Category pills */}
            <div className="flex items-center gap-1.5">
              <div className="h-7 w-[76px] rounded-full bg-[#EDE8DD] animate-pulse" />
              <div className="h-7 w-[72px] rounded-full bg-[#F7F5F0] animate-pulse" />
              <div className="h-7 w-[88px] rounded-full bg-[#F7F5F0] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-6 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              {/* Image placeholder */}
              <div className="aspect-square rounded-2xl bg-[#F7F5F0] animate-pulse" />
              {/* Product name */}
              <div className="h-4 w-3/4 rounded bg-[#F7F5F0] animate-pulse" />
              {/* Subtitle */}
              <div className="h-3 w-1/2 rounded bg-[#EDE8DD] animate-pulse" />
              {/* Price */}
              <div className="h-4 w-16 rounded bg-[#F7F5F0] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
