'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';

const PARAGRAPHS = [
  '思考は、はじめから形を持っているわけではない。',
  `まだ言葉にならない違和感。\n輪郭のないアイデア。\n誰にも見えていない、可能性の粒子。`,
  `それらは、ただ頭の中にあるだけでは、\n現実を変える力にはならない。`,
  `RAPTOVAは、AIの力を重ねながら、\n曖昧な思考に輪郭を与え、\nひとつの形へと導いていく。`,
  `小さな着想を、動き出す仕組みへ。\n個人の可能性を、次の現実へ。`,
];

export default function Statement() {
  return (
    <section
      id="statement"
      className="bg-white py-20 md:py-32"
      aria-labelledby="statement-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20">
        {/* SP/MD: mx-auto 中央寄せ / LG+: 14% 左オフセット（中央より左） */}
        <div className="max-w-[660px] mx-auto lg:mx-0 lg:ml-[14%]">
          {PARAGRAPHS.map((para, i) => (
            <RevealAnimation key={i} delay={i * 0.12} className={i > 0 ? 'mt-7 md:mt-9' : ''}>
              <p
                className="text-[#0a0a0a] leading-[1.9] copy-ja whitespace-pre-line"
                style={{ fontSize: 'clamp(17px, 1.5vw, 22px)', fontWeight: 300 }}
              >
                {para}
              </p>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
