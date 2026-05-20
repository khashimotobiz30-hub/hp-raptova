'use client';

import {
  BusinessLabel,
  BUSINESS_AREAS_CARDS_CLASS,
  BUSINESS_PAGE_CONTAINER_CLASS,
  SectionReveal,
  serifStyle,
} from '@/components/business/shared';

const AREAS = [
  {
    id: 'recruiting-support',
    number: '01',
    titleEn: 'RECRUITING SUPPORT',
    titleJa: '採用活動支援',
    description:
      '採用で伝えるべき魅力や情報を整理し、求人原稿、採用LP、説明資料など、応募者に届く形へ整えます。',
    tags: ['採用コンセプト整理', '求人原稿', '採用LP', '説明資料'],
  },
  {
    id: 'web-creative',
    number: '02',
    titleEn: 'WEB / CREATIVE SUPPORT',
    titleJa: 'Web・資料制作支援',
    description:
      '伝えたい内容や事業の強みを整理し、Webサイト、LP、会社資料、営業資料など、見た人に伝わる形へ落とし込みます。',
    tags: ['コーポレートサイト', 'LP', '会社資料', '営業資料'],
  },
  {
    id: 'workflow-ai',
    number: '03',
    titleEn: 'WORKFLOW / AI SUPPORT',
    titleJa: '業務整理・AI活用支援',
    description:
      '日々の業務や情報の流れを整理し、AIやツールを活用しながら、仕事を進めやすい仕組みに整えます。',
    tags: ['業務フロー整理', '情報整理', 'AI活用相談', '仕組み化'],
  },
] as const;

export default function BusinessAreas() {
  return (
    <section
      className="border-b border-black/[0.12] bg-[#f2f0e9] py-9 md:py-10 lg:py-12"
      aria-labelledby="business-areas-heading"
    >
      <div className={BUSINESS_PAGE_CONTAINER_CLASS}>
        <SectionReveal>
          <BusinessLabel>BUSINESS AREAS</BusinessLabel>
          <h2 id="business-areas-heading" className="sr-only">
            Business Areas
          </h2>
        </SectionReveal>
        <div className={["mt-5 md:mt-6", BUSINESS_AREAS_CARDS_CLASS].join(" ")}>
          <div className="grid divide-y divide-black/[0.12] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {AREAS.map((area, index) => (
              <SectionReveal key={area.number} delay={0.06 + index * 0.06} className="min-w-0">
                <article id={area.id} className="flex h-full scroll-mt-28 flex-col px-0 py-7 md:py-8 lg:px-8 lg:py-9 xl:px-10">
                  <p className="text-sm font-medium tracking-[0.18em] text-black/38">{area.number}</p>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.28em] text-black/55">
                    {area.titleEn}
                  </p>
                  <h3
                    className="copy-ja mt-3 font-serif text-xl tracking-[0.06em] text-[#0a0a0a] md:text-[22px]"
                    style={serifStyle}
                  >
                    {area.titleJa}
                  </h3>
                  <p className="copy-ja mt-5 flex-1 text-[13px] leading-[2] tracking-[0.06em] text-black/[0.62] lg:-mx-4 lg:w-[calc(100%+2rem)] xl:-mx-5 xl:w-[calc(100%+2.5rem)]">
                    {area.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block border border-black/[0.14] px-2.5 py-1 text-[10px] tracking-[0.06em] text-black/[0.55]">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-[10px] font-semibold tracking-[0.24em] text-black/40">
                    COMING SOON
                  </p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
