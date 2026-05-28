'use client';

import Image from 'next/image';
import { RECRUITING_MAIN_SUPPORT } from '@/lib/business/recruiting-content';
import {
  BUSINESS_AREAS_CARDS_CLASS,
  BUSINESS_PAGE_CONTAINER_CLASS,
  SectionReveal,
  serifStyle,
} from '@/components/business/shared';
import RecruitingAdditionalSupport from '@/components/business/recruiting/RecruitingAdditionalSupport';

export default function RecruitingMainSupport() {
  const { title, body, items } = RECRUITING_MAIN_SUPPORT;

  return (
    <section
      className="border-b border-black/[0.12] bg-[#f2f0e9] pt-10 pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
      aria-labelledby="recruiting-main-support-heading"
    >
      <div className={BUSINESS_PAGE_CONTAINER_CLASS}>
        <SectionReveal>
          <div className="max-w-[44rem]">
            <h2
              id="recruiting-main-support-heading"
              className="copy-ja font-serif text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.45] tracking-[0.04em] text-[#0a0a0a]"
              style={serifStyle}
            >
              {title}
            </h2>
            <p className="copy-ja mt-4 text-[13px] leading-[1.9] tracking-[0.03em] text-black/[0.62] sm:mt-5 sm:text-sm sm:leading-[1.95]">
              {body}
            </p>
          </div>
        </SectionReveal>

        <div className={['mt-10 md:mt-12', BUSINESS_AREAS_CARDS_CLASS].join(' ')}>
          <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {items.map((item, index) => (
              <SectionReveal key={item.id} delay={0.06 + index * 0.06} fill className="h-full min-w-0">
                <article className="flex h-full min-h-0 flex-col border border-black/[0.12] bg-white">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e6df]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center opacity-92"
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-5 py-6 md:px-6 md:py-7">
                    <h3
                      className="copy-ja font-serif text-lg font-medium tracking-[0.04em] text-[#0a0a0a] md:text-xl"
                      style={serifStyle}
                    >
                      {item.title}
                    </h3>
                    <p className="copy-ja mt-4 flex-1 text-[13px] leading-[1.85] tracking-[0.03em] text-black/[0.62]">
                      {item.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-block border border-black/[0.14] bg-[#f2f0e9] px-2.5 py-1 text-[10px] tracking-[0.02em] text-black/[0.55]">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>

        <RecruitingAdditionalSupport />
      </div>
    </section>
  );
}
