export default function AccountLoading() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col">
      {/* Top nav skeleton */}
      <header className="bg-[#FDFCF8]/80 border-b border-[rgba(26,15,8,0.08)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#F7F5F0] animate-pulse" />
            <div className="h-4 w-28 rounded bg-[#F7F5F0] animate-pulse" />
          </div>
          <div className="h-4 w-16 rounded bg-[#F7F5F0] animate-pulse" />
        </div>
      </header>

      <div className="flex-1 px-6 py-12 md:py-20">
        <div className="max-w-xl mx-auto">
          {/* "Your account" label */}
          <div className="h-3 w-28 rounded bg-[#EDE8DD] animate-pulse mb-3" />
          {/* Heading */}
          <div className="h-8 w-56 rounded bg-[#F7F5F0] animate-pulse mb-2" />
          {/* Email */}
          <div className="h-3.5 w-44 rounded bg-[#EDE8DD] animate-pulse mb-10" />

          {/* Order card skeleton */}
          <div className="rounded-2xl bg-white border border-[rgba(26,15,8,0.08)] p-6" style={{ boxShadow: "0 2px 16px rgba(26,15,8,0.07)" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="h-5 w-40 rounded bg-[#F7F5F0] animate-pulse" />
                <div className="h-3 w-56 rounded bg-[#EDE8DD] animate-pulse" />
              </div>
              <div className="h-6 w-20 rounded-full bg-[#F7F5F0] animate-pulse" />
            </div>
            <div className="border-t border-[rgba(26,15,8,0.06)] pt-4 flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="h-3.5 w-24 rounded bg-[#EDE8DD] animate-pulse" />
                <div className="h-3.5 w-16 rounded bg-[#F7F5F0] animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-3.5 w-16 rounded bg-[#EDE8DD] animate-pulse" />
                <div className="h-3.5 w-28 rounded bg-[#F7F5F0] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
