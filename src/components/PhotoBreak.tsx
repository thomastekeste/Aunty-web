import Image from "next/image";

/**
 * Full-bleed photo section — editorial visual break between content blocks.
 * Shows the texture triptych: coil close-up, wash day, hands in hair.
 */
export default function PhotoBreak() {
  return (
    <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
      <Image
        src="/texture-triptych.png"
        fill
        className="object-cover object-center"
        alt="Textured hair close-up, wash day routine, and hands working product through curls"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F08]/55 via-[#1A0F08]/10 to-transparent" />
      <div className="absolute inset-0 flex items-end justify-center pb-10 md:pb-14 px-6">
        <div className="text-center">
          <p
            className="font-display font-bold text-[#FDFCF8] leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
          >
            Built for textured hair.
            <br />
            <span className="font-light italic opacity-80">
              Not adapted from straight.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
