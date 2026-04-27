'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';
import { Fragment } from 'react';

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
      className="bg-white py-24 md:py-40"
      aria-label="ステートメント"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="max-w-[820px] mx-auto lg:mx-0 lg:ml-[10%]">
          {PARAGRAPHS.map((para, i) => {
            const isLast = i === PARAGRAPHS.length - 1;
            return (
              <RevealAnimation
                key={i}
                delay={i * 0.1}
                className={
                  isLast
                    ? 'mt-14 md:mt-20'
                    : i > 0
                    ? 'mt-10 md:mt-14'
                    : ''
                }
              >
                <p
                  className="text-[#0a0a0a] copy-ja whitespace-pre-line"
                  style={{
                    fontSize: 'clamp(19px, 1.9vw, 28px)',
                    fontWeight: 300,
                    lineHeight: 2.0,
                  }}
                >
                  {para.split('\n').map((line, idx) => (
                    <Fragment key={idx}>
                      {idx > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
