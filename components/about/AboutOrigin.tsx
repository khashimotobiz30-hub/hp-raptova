'use client';

import Image from 'next/image';
import { SectionLabel, SectionReveal, serifStyle } from '@/components/about/shared';

const HEADING = 'もっと良くできるのに、忙しくてできない。';

const BODY_LINES = [
  '採用支援の現場で見てきたのは、課題がない会社ではありませんでした。',
  '改善したいことはある。伝えたい魅力もある。変えたい仕組みもある。',
  'けれど、日々の業務に追われ、そこに向き合う時間と手が足りない。',
  'やりたいことはあるのに、できないまま残っていく。',
  'RAPTOVA（ラプトーバ）は、その状態を少しずつ前に進めるためにあります。',
] as const;

export default function AboutOrigin() {
  return (
    <section
      className="w-full border-b border-black/[0.08] bg-[#f2f0e9]"
      aria-labelledby="about-origin-heading"
    >
      <div className="grid w-full lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:items-stretch">
        <div className="relative h-[280px] min-h-[280px] border-b border-black/[0.08] bg-[#f2f0e9] lg:h-auto lg:min-h-[min(42vh,440px)] lg:self-stretch lg:border-b-0 lg:border-r lg:border-black/[0.08] xl:min-h-[min(48vh,520px)]">
          <div className="relative h-full min-h-[1px] w-full">
            <Image
              src="/images/about/about-origin-desk.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-start px-7 py-16 md:px-12 md:py-20 lg:justify-center lg:py-12 lg:pl-12 lg:pr-10 xl:py-14 xl:pl-[5.5rem] xl:pr-12 min-[1440px]:pl-[6.5rem]">
          <SectionReveal>
            <SectionLabel title="ORIGIN" />
            <h2
              id="about-origin-heading"
              className="copy-ja mt-9 max-w-[36rem] font-serif md:mt-10 text-[clamp(22px,4.2vw,32px)] font-medium leading-[1.55] tracking-[0.05em] text-[#0a0a0a] md:text-[clamp(24px,2.6vw,36px)] lg:max-w-[38rem] lg:leading-[1.5] xl:max-w-[40rem] min-[1440px]:max-w-[44rem]"
              style={serifStyle}
            >
              {HEADING}
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.06} className="mt-8 md:mt-10 lg:mt-10 xl:mt-12">
            <p className="copy-ja max-w-[40rem] text-[13px] leading-[2.05] tracking-[0.08em] text-black/[0.68] md:text-[14px] md:leading-[2.08] lg:max-w-[38rem] lg:text-[14px] xl:max-w-[44rem] xl:text-[15px] xl:leading-[2.1]">
              {BODY_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
