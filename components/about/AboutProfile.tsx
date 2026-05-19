'use client';

import Image from 'next/image';
import { SectionLabel, SectionReveal } from '@/components/about/shared';

const PROFILE_ROWS: ReadonlyArray<{
  label: string;
  value: string;
  displayLines?: readonly string[];
}> = [
  { label: '屋号', value: 'RAPTOVA' },
  { label: 'Location', value: 'Kobe, Japan' },
  { label: 'Founder', value: 'Kohei Hashimoto' },
  {
    label: '事業内容',
    value: 'コンサルティング / Web制作',
  },
  {
    label: '事業領域',
    value: '採用活動支援 / Web・資料制作 / 業務整理・AI活用',
    displayLines: [
      '採用活動支援 / Web・資料制作',
      '業務整理・AI活用',
    ],
  },
  { label: '設立', value: '2026年' },
] as const;

export default function AboutProfile() {
  return (
    <section
      className="border-b border-black/[0.08] bg-[#f2f0e9] px-7 md:px-14 lg:pl-20 lg:pr-0"
      aria-labelledby="about-profile-heading"
    >
      <div className="mx-auto w-full max-w-[1240px] lg:max-w-none">
        <div className="grid lg:grid-cols-[minmax(0,48%)_minmax(0,1fr)] lg:items-stretch">
          <div className="flex flex-col justify-start border-b border-black/[0.08] px-0 pt-10 pb-10 md:pt-12 md:pb-12 lg:border-b-0 lg:border-r lg:border-black/[0.08] lg:pt-10 lg:pb-10 lg:pl-[max(0px,calc((100vw-10rem-1240px)/2))] lg:pr-12 xl:pr-16">
            <div className="w-full max-w-[540px]">
            <SectionReveal>
              <SectionLabel title="PROFILE" />
              <h2 id="about-profile-heading" className="sr-only">
                Profile
              </h2>
            </SectionReveal>

            <div className="mt-7 divide-y divide-black/[0.07] border-t border-black/[0.07] md:mt-8">
              {PROFILE_ROWS.map((row, index) => (
                <SectionReveal key={row.label} delay={0.04 * index}>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-3.5 md:grid-cols-[6.5rem_1fr] md:gap-5 md:py-4">
                    <p className="copy-ja text-[12px] tracking-[0.05em] text-black/[0.48] md:text-[13px]">
                      {row.label}
                    </p>
                    <p className="copy-ja text-[12px] leading-[1.9] tracking-[0.04em] text-black/[0.8] md:text-[13px]">
                      {row.displayLines ? (
                        row.displayLines.map((line, lineIndex) => (
                          <span
                            key={line}
                            className={lineIndex > 0 ? 'mt-1 block' : undefined}
                          >
                            {line}
                          </span>
                        ))
                      ) : (
                        row.value
                      )}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
            </div>
          </div>

          <div className="relative min-h-[min(56vw,360px)] bg-[#f2f0e9] md:min-h-[320px] lg:min-h-full lg:h-full">
            <div className="relative h-full min-h-[min(56vw,360px)] w-full md:min-h-[320px] lg:min-h-full">
              <Image
                src="/images/about/about-profile-kobe.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center lg:object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
