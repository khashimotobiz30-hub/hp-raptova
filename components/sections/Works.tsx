'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { WORKS_ITEMS } from '@/lib/config';

export default function Works() {
  return (
    <section
      id="works"
      className="bg-white py-32 md:py-48 border-t border-[#e5e5e5]"
      aria-labelledby="works-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20">
        {/* ヘッダー */}
        <RevealAnimation>
          <h2
            id="works-heading"
            className="text-[#0a0a0a] tracking-[0.22em] text-xs font-medium mb-20 md:mb-28"
          >
            SELECTED WORKS
          </h2>
        </RevealAnimation>

        {/* 1カラム縦並び */}
        <div className="flex flex-col gap-28 md:gap-40">
          {WORKS_ITEMS.map((work, i) => (
            <RevealAnimation key={work.id} delay={0.1}>
              <article aria-label={work.titleEn}>
                {/* サムネイル */}
                <Link
                  href={work.href}
                  className="block group relative overflow-hidden border border-[#e5e5e5]"
                  aria-label={`${work.titleEn} のプロジェクトを見る`}
                  tabIndex={0}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full aspect-video overflow-hidden"
                  >
                    <Image
                      src={work.thumbnail}
                      alt={`${work.titleEn} サムネイル`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1120px"
                      priority={i === 0}
                    />
                    {/* Hoverオーバーレイ */}
                    <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/5 transition-colors duration-300" />
                  </motion.div>
                </Link>

                {/* テキスト */}
                <div className="mt-8 md:mt-10">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-[#8a8a8a] text-xs tracking-[0.16em] mt-1 flex-shrink-0">
                      {work.number}
                    </span>
                    <div>
                      <p className="text-[#0a0a0a] text-base md:text-lg tracking-[0.1em] font-medium">
                        {work.titleEn}
                      </p>
                      <p
                        className="text-[#555555] mt-1 copy-ja"
                        style={{ fontSize: 'clamp(13px, 1vw, 15px)', fontWeight: 300 }}
                      >
                        {work.titleJa}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-[#555555] leading-[1.9] copy-ja whitespace-pre-line mt-4 max-w-[640px]"
                    style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 300 }}
                  >
                    {work.description}
                  </p>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[#8a8a8a] text-xs tracking-[0.06em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project */}
                  <Link
                    href={work.href}
                    className="inline-flex items-center gap-2 mt-6 text-[#0a0a0a] text-sm tracking-[0.1em] hover:opacity-50 transition-opacity duration-200 group"
                    aria-label={`${work.titleEn} のプロジェクトを見る`}
                  >
                    View Project{' '}
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
