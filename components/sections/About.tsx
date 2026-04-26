'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-20 md:py-28 border-t border-[#e5e5e5]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16">
          {/* 左：タイトル */}
          <RevealAnimation className="md:w-48 lg:w-52 flex-shrink-0 mb-10 md:mb-0">
            <h2
              id="about-heading"
              className="text-[#0a0a0a] tracking-[0.22em] text-xs font-medium"
            >
              ABOUT RAPTOVA
            </h2>
          </RevealAnimation>

          {/* 右：本文 */}
          <RevealAnimation delay={0.1} className="flex-1 max-w-[560px]">
            <div
              className="text-[#0a0a0a] leading-[1.9] copy-ja"
              style={{ fontSize: 'clamp(15px, 1.3vw, 20px)', fontWeight: 300 }}
            >
              <p>RAPTOVAは、AIを活用して、</p>
              <p className="mt-6 leading-[2.2]">
                アイデアの整理、
                <br />
                要件定義、
                <br />
                UI設計、
                <br />
                実装、
                <br />
                改善までを一貫して支援し、
              </p>
              <p className="mt-6">
                個人や組織が、自分たちの構想を現実に動かせる状態をつくります。
              </p>
              <p className="mt-8">
                AIは、単純に作業を置き換えるだけのものではなく、
                <br className="hidden md:inline" />
                人の思考と実行力を拡張するための技術です。
              </p>
              <p className="mt-8">
                RAPTOVAは、その力を使って、
                <br className="hidden md:inline" />
                まだ形になっていない可能性を、
                <br className="hidden md:inline" />
                使われる仕組みへと変えていきます。
              </p>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
