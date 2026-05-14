export default function CheckoutLoading() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] pt-[88px] pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Title area */}
        <div className="mb-8 md:mb-10">
          <div className="h-3 w-16 rounded bg-[#EDE8DD] animate-pulse mb-2" />
          <div className="h-8 w-36 rounded bg-[#F7F5F0] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14">
          {/* Line items column */}
          <section>
            {/* Items header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,15,8,0.12)]">
              <div className="h-4 w-16 rounded bg-[#F7F5F0] animate-pulse" />
              <div className="h-3 w-24 rounded bg-[#EDE8DD] animate-pulse" />
            </div>

            {/* Line item skeletons */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-4 py-5 border-b border-[rgba(26,15,8,0.08)]">
                {/* Image square */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#F7F5F0] animate-pulse flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-36 rounded bg-[#F7F5F0] animate-pulse" />
                      <div className="h-3 w-14 rounded bg-[#EDE8DD] animate-pulse" />
                    </div>
                    <div className="h-4 w-14 rounded bg-[#F7F5F0] animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-24 rounded-full bg-[#F7F5F0] animate-pulse" />
                    <div className="h-3 w-14 rounded bg-[#EDE8DD] animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Summary card skeleton */}
          <aside>
            <div className="rounded-2xl bg-[#F7F5F0] border border-[rgba(26,15,8,0.06)] p-6 md:p-7 flex flex-col gap-5">
              {/* "Order summary" */}
              <div className="h-5 w-32 rounded bg-[#EDE8DD] animate-pulse" />

              {/* Subtotal / Shipping */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <div className="h-3.5 w-16 rounded bg-[#EDE8DD] animate-pulse" />
                  <div className="h-3.5 w-14 rounded bg-[#EDE8DD] animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-16 rounded bg-[#EDE8DD] animate-pulse" />
                  <div className="h-3.5 w-10 rounded bg-[#EDE8DD] animate-pulse" />
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-4 border-t border-[rgba(26,15,8,0.1)]">
                <div className="h-3 w-12 rounded bg-[#EDE8DD] animate-pulse" />
                <div className="h-7 w-20 rounded bg-[#EDE8DD] animate-pulse" />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <div className="h-3 w-10 rounded bg-[#EDE8DD] animate-pulse" />
                <div className="h-11 w-full rounded-full bg-[#FDFCF8] border border-[rgba(26,15,8,0.12)] animate-pulse" />
              </div>

              {/* Checkout button */}
              <div className="h-12 w-full rounded-full bg-[#EDE8DD] animate-pulse" />

              {/* Stripe note */}
              <div className="h-3 w-36 mx-auto rounded bg-[#EDE8DD] animate-pulse" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
