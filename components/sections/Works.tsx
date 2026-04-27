'use client';

import Link from 'next/link';
import Image from 'next/image';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { WORKS_ITEMS } from '@/lib/config';

export default function Works() {
  // NOTE: ビジュアル未作成のため、Works上では一旦非表示（後で戻せるようデータは残す）
  const visibleWorks = WORKS_ITEMS.filter(
    (work): work is (typeof WORKS_ITEMS)[number] => work.id !== 'ai-sns-operation',
  );

  return (
    <section
      id="works"
      className="bg-white py-24 md:py-36 border-t border-[#e5e5e5]"
      aria-labelledby="works-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
        {/* ヘッダー（About / Services と同ルール） */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] md:gap-20 lg:gap-24 md:items-start mb-12 md:mb-14">
          <RevealAnimation>
            <h2
              id="works-heading"
              className="text-[#0a0a0a] tracking-[0.12em] leading-[1.1]"
              style={{ fontSize: 'clamp(40px, 3.8vw, 64px)', fontWeight: 500 }}
            >
              WORKS
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <p
              className="text-[#555555] leading-[2.0] copy-ja max-w-[720px] mt-6 md:mt-1"
              style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 300 }}
            >
              RAPTOVAが実際に形にしてきたプロジェクト。
              <br className="hidden md:inline" />
              思考を設計し、使われる仕組みへ変えた事例です。
            </p>
          </RevealAnimation>
        </div>

        {/* 一覧（各実績 = 1ブロック） */}
        <div>
          {visibleWorks.map((work, i) => (
            <article key={work.id} aria-label={work.titleEn} className="border-b border-[#e5e5e5]">
              <RevealAnimation delay={0.05 + i * 0.08}>
                <div className="group transition-colors duration-300 hover:bg-[#fafafa]">
                  <div className="py-12 md:py-14">
                    <div className="flex flex-col md:grid md:items-stretch md:gap-x-10 lg:gap-x-12 md:grid-cols-[40px_minmax(0,2.4fr)_minmax(0,3.2fr)]">
                      {/* ビジュアル（SPは先頭） */}
                      {work.externalHref ? (
                        <a
                          href={work.externalHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={[
                            'order-1 md:order-3 block relative transition-opacity duration-200 hover:opacity-95',
                            work.id === 'questoria' || work.id === 'raptova-website'
                              ? 'overflow-visible border-none bg-transparent'
                              : 'overflow-hidden border border-[#e5e5e5] bg-white',
                          ].join(' ')}
                          aria-label={`${work.titleEn} のプロジェクトを見る（外部サイト）`}
                        >
                          <div className="relative w-full aspect-[16/8.5] overflow-hidden">
                            {work.id === 'questoria' ? (
                              <div className="absolute inset-0">
                                <Image
                                  src="/images/works/questoria-work-visual.png"
                                  alt="QUESTORIAのAIスキル診断アプリ画面"
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 720px"
                                  priority={i === 0}
                                />
                              </div>
                            ) : (
                              <Image
                                src={work.thumbnail}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 720px"
                                priority={i === 0}
                              />
                            )}
                            <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/[0.03] transition-colors duration-300" />
                          </div>
                        </a>
                      ) : (
                        <div
                          className={[
                            'order-1 md:order-3 block relative',
                            work.id === 'questoria' || work.id === 'raptova-website'
                              ? 'overflow-visible border-none bg-transparent'
                              : 'overflow-hidden border border-[#e5e5e5] bg-white',
                          ].join(' ')}
                          aria-hidden="true"
                        >
                          <div className="relative w-full aspect-[16/8.5] overflow-hidden">
                            {work.id === 'raptova-website' ? (
                              <div className="absolute inset-0">
                                <Image
                                  src="/images/works/raptova-website-work-visual.png"
                                  alt="RAPTOVA公式サイトのPC/SPモックアップ"
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 720px"
                                  priority={i === 0}
                                />
                              </div>
                            ) : (
                              <Image
                                src={work.thumbnail}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 720px"
                                priority={i === 0}
                              />
                            )}
                            <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/[0.03] transition-colors duration-300" />
                          </div>
                        </div>
                      )}

                      {/* 番号 */}
                      <div className="order-2 md:order-1 mt-6 md:mt-0">
                        <span className="text-[#7f7f7f] text-[12px] tracking-[0.1em] font-medium">
                          {work.number}
                        </span>
                      </div>

                      {/* 情報 */}
                      <div className="order-3 md:order-2 mt-3 md:mt-0 min-w-0">
                        <p
                          className="text-[#0a0a0a] tracking-[0.1em]"
                          style={{
                            fontSize: 'clamp(24px, 2.2vw, 38px)',
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {work.titleEn}
                        </p>
                        <p className="text-[#555555] text-xs tracking-[0.12em] mt-2">
                          {work.titleJa}
                        </p>

                        <p
                          className="text-[#555555] leading-[1.95] copy-ja whitespace-pre-line mt-5"
                          style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 300 }}
                        >
                          {work.description}
                        </p>

                        <p className="text-[#777777] text-xs tracking-[0.14em] mt-6">
                          {work.tags.join(' / ')}
                        </p>

                        {work.externalHref ? (
                          <a
                            href={work.externalHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-7 text-[#0a0a0a] text-sm tracking-[0.12em] hover:opacity-60 transition-opacity duration-200 group"
                            aria-label={`${work.titleEn} のプロジェクトを見る（外部サイト）`}
                          >
                            View Project{' '}
                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                              →
                            </span>
                          </a>
                        ) : work.href ? (
                          <Link
                            href={work.href}
                            className="inline-flex items-center gap-2 mt-7 text-[#0a0a0a] text-sm tracking-[0.12em] hover:opacity-60 transition-opacity duration-200 group"
                            aria-label={`${work.titleEn} のプロジェクトを見る`}
                          >
                            View Project{' '}
                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                              →
                            </span>
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-2 mt-7 text-[#8a8a8a] text-sm tracking-[0.12em]">
                            View Project{' '}
                            <span aria-hidden="true">
                              →
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
