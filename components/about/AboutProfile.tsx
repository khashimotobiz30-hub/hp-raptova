'use client';

import Image from 'next/image';
import { SectionLabel, SectionReveal } from '@/components/about/shared';

const PROFILE_ROWS = [
  { label: '屋号', value: 'RAPTOVA' },
  { label: '所在地', value: '兵庫県神戸市' },
  { label: '代表', value: '橋本 康平' },
  { label: '事業内容', value: 'ITコンサルティング / Web制作' },
  { label: '事業領域', value: '採用活動支援 / Web・資料制作 / 業務整理・AI活用' },
  { label: '設立', value: '2026年' },
] as const;

export default function AboutProfile() {
  return (
    <section
      className="border-b border-black/[0.08] bg-[#f4f3ef]"
      aria-labelledby="about-profile-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:items-stretch">
          <div className="flex min-h-0 flex-col justify-start border-b border-black/[0.08] px-7 pt-10 pb-10 md:px-14 md:pt-12 md:pb-12 lg:h-[min(52vh,560px)] lg:min-h-[min(52vh,560px)] lg:border-b-0 lg:border-r lg:border-black/[0.08] lg:px-16 lg:pt-10 lg:pb-10 xl:px-20">
            <SectionReveal>
              <SectionLabel title="PROFILE" />
              <h2 id="about-profile-heading" className="sr-only">
                Profile
              </h2>
            </SectionReveal>

            <div className="mt-6 divide-y divide-black/[0.1] border-t border-black/[0.1] md:mt-7">
              {PROFILE_ROWS.map((row, index) => (
                <SectionReveal key={row.label} delay={0.04 * index}>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-3 md:grid-cols-[6.5rem_1fr] md:gap-5 md:py-3.5">
                    <p className="copy-ja text-[12px] tracking-[0.06em] text-black/[0.55] md:text-[13px]">
                      {row.label}
                    </p>
                    <p className="copy-ja text-[12px] leading-[1.85] tracking-[0.04em] text-black/[0.78] md:text-[13px]">
                      {row.value}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          <div className="relative h-[280px] min-h-[280px] bg-[#f4f3ef] lg:h-[min(52vh,560px)] lg:min-h-[min(52vh,560px)]">
            <div className="relative h-full min-h-[1px] w-full">
              <Image
                src="/images/about/about-profile-kobe.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
