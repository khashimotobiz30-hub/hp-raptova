'use client';

import Link from 'next/link';
import RevealAnimation from '@/components/ui/RevealAnimation';

export default function About() {
  return (
    <section
      id="about"
      className="grid w-full grid-cols-1 bg-[#f4f3ef] min-[1440px]:grid-cols-[34%_66%]"
      aria-labelledby="about-heading"
    >
      <div className="px-7 py-20 md:px-14 lg:px-20">
        <RevealAnimation>
          <p className="mb-10 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">
            ABOUT
          </p>
          <h2
            id="about-heading"
            className="copy-ja font-serif text-3xl tracking-[0.18em] text-zinc-950"
          >
            RAPTOVAとは
          </h2>
          <p className="copy-ja mt-10 text-sm leading-loose tracking-[0.14em] text-zinc-700">
            RAPTOVAは、AIを活用して、
            <br />
            人や組織の中にある構想・課題・情報を整理し、
            <br />
            実行できる形へ変えていくパートナーです。
          </p>
          <p className="copy-ja mt-8 text-sm leading-loose tracking-[0.14em] text-zinc-700">
            最初の重点領域として、採用活動を支援しながら、
            <br />
            より広い領域で、仕事を前に進めるブランドを
            <br />
            展開していきます。
          </p>
          <Link
            href="/about"
            className="mt-10 flex w-44 items-center justify-between border border-zinc-950 px-6 py-4 text-xs font-semibold tracking-[0.18em] transition hover:bg-zinc-950 hover:text-white"
          >
            VIEW MORE <span>→</span>
          </Link>
        </RevealAnimation>
      </div>

      <RevealAnimation delay={0.08} className="relative min-h-[420px] overflow-hidden bg-zinc-300">
        <div className="absolute inset-0 bg-[linear-gradient(105deg,#9d9d97_0%,#d8d8d2_35%,#363633_36%,#75756d_54%,#c8c8c1_55%,#efeee9_100%)]" />
        <div className="absolute left-[25%] top-0 h-full w-px bg-white/30" />
        <div className="absolute left-[58%] top-0 h-full w-px bg-black/20" />
        <div className="absolute bottom-[20%] left-[34%] h-[18%] w-[28%] bg-black/30 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-black/10" />
      </RevealAnimation>
    </section>
  );
}
