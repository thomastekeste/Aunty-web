const VALUES = [
  "made for textured hair",
  "aunty-curated",
  "no sulfates",
  "no silicones",
  "no parabens",
  "cruelty free",
  "no mineral oils",
  "made for melanin-rich skin",
  "clean ingredients",
];

function MarqueeRow() {
  return (
    <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
      {VALUES.map((v, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-body text-[15px] md:text-lg text-[#2D1B0E] tracking-[-0.01em]">{v}</span>
          <span className="text-[#E8DCC8] text-lg">—</span>
        </span>
      ))}
    </div>
  );
}

export default function ValuesMarquee() {
  return (
    <div className="py-6 overflow-hidden border-y border-[rgba(26,15,8,0.06)] bg-[#FDFCF8]">
      <div className="flex gap-8">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
