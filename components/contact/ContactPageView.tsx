import { MAILTO_HREF, SITE_CONFIG } from '@/lib/config';

const serifStyle = {
  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
} as const;

function MailCircleIcon({ tone = 'default' }: { tone?: 'default' | 'notice' }) {
  const circleClass =
    tone === 'notice'
      ? 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c8bfb0] bg-[#ddd6c8] text-[#3a3530]'
      : 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/45';

  return (
    <span className={circleClass} aria-hidden>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="1.25" />
        <path d="M3 7.5 12 13l9-5.5" />
      </svg>
    </span>
  );
}

export default function ContactPageView() {
  return (
    <article className="min-h-[calc(100svh-72px)] bg-[#f2f0e9] text-[#0a0a0a]">
      <div className="mx-auto flex min-h-[calc(100svh-72px)] max-w-[1240px] flex-col justify-center px-7 py-20 md:px-14 md:py-24 lg:px-20 lg:pb-20 lg:pt-[clamp(8.75rem,17vh,12rem)]">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:translate-y-5 lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0 lg:max-w-[34rem]">
            <p className="mb-6 text-[10px] font-semibold tracking-[0.42em] text-black/34 md:mb-7">
              CONTACT
            </p>
            <h1
              className="copy-ja font-serif text-[26px] leading-relaxed tracking-[0.06em] text-[#0a0a0a] min-[430px]:text-[1.75rem] md:text-3xl md:tracking-[0.08em] lg:text-[2.125rem] lg:tracking-[0.09em]"
              style={serifStyle}
            >
              お問い合わせ
            </h1>
            <div className="mb-8 mt-7 h-px w-12 bg-black/18 md:mb-9" aria-hidden />
            <p className="copy-ja mb-10 max-w-[32rem] text-sm leading-[2.05] tracking-[0.1em] text-black/[0.62] md:mb-11 md:text-[15px] md:leading-[2.12] min-[430px]:tracking-[0.12em] lg:text-[15.5px] lg:text-black/[0.66]">
              採用、Web・資料などの制作、業務設計に関するご相談は、
              <br className="hidden sm:inline" />
              以下のフォームよりお気軽にお問い合わせください。
            </p>
            <div className="flex w-full max-w-[32rem] items-start gap-4 md:gap-5">
              <MailCircleIcon tone="notice" />
              <p className="copy-ja min-w-0 text-xs leading-[2] tracking-[0.08em] text-black/[0.58] md:text-[13px] md:leading-[2.05] lg:text-[13.5px]">
                ご相談内容に応じて、
                <br />
                最適な形でご連絡いたします。
              </p>
            </div>
          </div>

          <div className="min-w-0 w-full lg:max-w-[460px] lg:justify-self-end">
            <div className="border border-black/[0.1] bg-[#faf9f6] px-7 py-9 md:px-9 md:py-11 lg:px-11 lg:py-12">
              <p className="mb-5 text-[10px] font-semibold tracking-[0.42em] text-black/34 md:mb-6">
                FORM
              </p>
              <h2
                className="copy-ja mb-4 font-serif text-xl leading-relaxed tracking-[0.06em] text-[#0a0a0a] md:mb-5 md:text-[1.35rem] lg:text-[1.4rem]"
                style={serifStyle}
              >
                フォームから問い合わせる
              </h2>
              <p className="copy-ja mb-8 text-xs leading-[2.05] tracking-[0.1em] text-black/[0.58] md:mb-9 md:text-[13px] md:leading-[2.1] lg:text-[13.5px] lg:text-black/[0.6]">
                必要事項をご記入のうえ、送信してください。
                <br />
                内容を確認後、メールにてご連絡いたします。
              </p>
              <a
                href={SITE_CONFIG.contactFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 flex w-full min-w-0 items-center justify-between border border-black/35 bg-[#faf9f6] px-6 py-5 text-xs font-semibold tracking-[0.18em] text-[#0a0a0a] transition-[color,background-color,border-color] duration-200 hover:border-black/55 hover:bg-black/[0.05] min-[430px]:tracking-[0.22em] md:mb-9 lg:min-h-[56px] lg:px-7 lg:py-[1.35rem] lg:text-[13px] lg:font-bold"
                aria-label="お問い合わせフォームを開く"
              >
                <span className="min-w-0">フォームを開く</span>
                <span className="shrink-0 pl-3">→</span>
              </a>
              <div className="mb-6 h-px w-full bg-black/[0.08]" aria-hidden />
              <div className="flex min-w-0 gap-4 md:gap-5">
                <MailCircleIcon />
                <p className="copy-ja min-w-0 text-xs leading-[2.05] tracking-[0.08em] text-black/[0.52] md:text-[13px] md:leading-[2.1]">
                  メールで直接ご連絡の場合は、
                  <br />
                  <a
                    href={MAILTO_HREF}
                    className="text-[#111111] underline decoration-[#111]/30 underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  までご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
