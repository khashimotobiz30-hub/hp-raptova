import Image from 'next/image';

const STATEMENT_PARAGRAPHS = [
  [
    'AIの力で、',
    'すべてが一瞬で変わるわけではない。',
  ],
  [
    'けれど、',
    'これまで手が届かなかったことに、',
    '少しずつ手が届く時代になった。',
  ],
  [
    'RAPTOVAは、',
    '構想や課題を置き去りにせず、',
    'AIと人の思考を掛け合わせ、',
    '実行できる形へ変えていく。',
  ],
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="grid min-h-[100svh] w-full overflow-x-hidden bg-[#e9e8e2] xl:grid-cols-[62%_38%]"
      aria-label="Hero and statement"
    >
      <div className="relative min-h-[100svh] overflow-hidden bg-[#e9e8e2]" aria-label="Hero">
        <div
          className="absolute inset-0 bg-cover bg-[position:64%_center] xl:bg-center"
          style={{ backgroundImage: "url('/images/raptova-hero-bg.png')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ecebe5]/82 via-[#e4e3dd]/48 to-white/5"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#f1f0ea]/14 via-transparent to-[#d9d8d2]/16"
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-7 pb-20 pt-28 md:px-14 lg:px-20">
          <h1 className="font-serif text-[16.5vw] leading-[0.88] tracking-[-0.08em] text-[#0a0a0a] md:text-[8.7vw]">
            Make
            <br />
            Work Move.
          </h1>
          <p className="copy-ja mt-12 text-[16px] leading-[2.12] tracking-[0.18em] text-[#111] md:mt-16 md:text-[19px]">
            未来の話で終わらせない。
            <br />
            目の前にある仕事から変えていく。
          </p>
        </div>

        <div className="absolute bottom-9 right-7 hidden items-center gap-4 text-[10px] font-semibold tracking-[0.24em] text-black/55 [writing-mode:vertical-rl] md:flex">
          SCROLL
          <span className="mt-4 h-16 w-px bg-black/45" />
        </div>
      </div>

      <div
        id="statement"
        className="flex flex-col border-l border-black/10 bg-[#070707] text-white xl:min-h-[100svh]"
        aria-label="ステートメント"
      >
        <div className="flex flex-col px-7 pb-14 pt-24 md:px-12 xl:flex-1 xl:px-14 xl:pb-12 xl:pt-[7.5rem]">
          <p className="mb-8 text-[10px] font-semibold tracking-[0.42em] text-white/52">
            STATEMENT
          </p>
          <div className="copy-ja max-w-[460px] font-light tracking-[0.03em] [font-family:var(--font-noto-serif-jp),'Yu_Mincho','YuMincho','Hiragino_Mincho_ProN',serif] min-[390px]:tracking-[0.05em]">
            {STATEMENT_PARAGRAPHS.map((paragraph, index) => (
              <p
                key={paragraph.join('')}
                className={[
                  index === 0 ? '' : index === 2 ? 'mt-10 xl:mt-8' : 'mt-7 xl:mt-6',
                  index < 2
                    ? 'text-[18px] leading-[1.92] text-white/86 xl:text-[clamp(17px,1.22vw,23px)] xl:leading-[1.82]'
                    : 'text-[15px] leading-[2.0] tracking-[0.06em] text-white/64 xl:text-[clamp(13px,0.9vw,16px)] xl:leading-[1.9]',
                ].join(' ')}
              >
                {paragraph.map((line) =>
                  line === 'すべてが一瞬で変わるわけではない。' ? (
                    <span key={line}>
                      <span className="block min-[390px]:hidden">すべてが一瞬で</span>
                      <span className="block min-[390px]:hidden">変わるわけではない。</span>
                      <span className="hidden min-[390px]:block">{line}</span>
                    </span>
                  ) : (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>

        <div className="relative h-[230px] shrink-0 overflow-hidden bg-black xl:h-auto xl:min-h-[145px] xl:flex-[0_1_clamp(180px,31svh,330px)]">
          <Image
            src="/images/raptova-statement-visual.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover object-[55%_52%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-black/15"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
