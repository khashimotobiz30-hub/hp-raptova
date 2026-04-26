'use client';

import Image from 'next/image';
import RevealAnimation from '@/components/ui/RevealAnimation';

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-24 md:py-36 border-t border-[#e5e5e5]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">

        {/* 1. 上段：大見出し + 導入本文 */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] md:gap-14 lg:gap-20 md:items-start">
          <RevealAnimation>
            <h2
              id="about-heading"
              className="text-[#0a0a0a] tracking-[0.16em] leading-[1.1] mb-10 md:mb-0"
              style={{ fontSize: 'clamp(38px, 4.1vw, 68px)', fontWeight: 400 }}
            >
              ABOUT
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <p
              className="text-[#0a0a0a] copy-ja max-w-[720px]"
              style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', fontWeight: 300, lineHeight: 2.0 }}
            >
              RAPTOVAは、AIを活用して、
              <br className="hidden md:inline" />
              アイデアの整理、要件定義、UI設計、実装、改善までを一貫して支援し、
              <br className="hidden md:inline" />
              個人や組織が、自分たちの構想を現実に動かせる状態をつくります。
            </p>
          </RevealAnimation>
        </div>

        {/* 2. 中段：プロセス図 */}
        <RevealAnimation delay={0.18}>
          <div className="mt-12 md:mt-14 -mx-5 sm:mx-0 md:-mx-8 lg:-mx-14">
            <Image
              src="/images/about/raptova-process-diagram.webp"
              alt="RAPTOVAの支援プロセス。思考の粒子から、アイデアの整理、要件定義、UI設計、実装、改善を経て、使われる仕組みへ変わる流れ。"
              width={1400}
              height={520}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) calc(100vw - 80px), 1240px"
              className="w-full h-auto"
            />
          </div>
        </RevealAnimation>

        {/* 3. 下段：補足本文（右カラム位置に揃える） */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] md:gap-14 lg:gap-20">
          <div className="hidden md:block" aria-hidden="true" />
          <RevealAnimation delay={0.12}>
            <div
              className="text-[#0a0a0a] copy-ja max-w-[720px]"
              style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', fontWeight: 300, lineHeight: 2.0 }}
            >
              <p>
                AIは、単純に作業を置き換えるだけのものではなく、
                <br className="hidden md:inline" />
                人の思考と実行力を拡張するための技術です。
              </p>
              <p className="mt-9 md:mt-10">
                RAPTOVAは、その力を使って、<br />
                まだ形になっていない可能性を、<br />
                使われる仕組みへと変えていきます。
              </p>
            </div>
          </RevealAnimation>
        </div>

      </div>
    </section>
  );
}
