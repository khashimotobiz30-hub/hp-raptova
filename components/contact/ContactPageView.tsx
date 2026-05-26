import { MAILTO_HREF, SITE_CONFIG } from '@/lib/config';

export default function ContactPageView() {
  return (
    <article className="min-h-[calc(100svh-72px)] bg-[#f2f0e9] text-[#0a0a0a]">
      <div className="mx-auto flex min-h-[calc(100svh-72px)] max-w-[720px] flex-col justify-center px-7 py-24 md:px-14 md:py-32 lg:px-20">
        <div className="-translate-y-4 md:-translate-y-6">
          <p className="mb-6 text-[10px] font-semibold tracking-[0.42em] text-black/34 md:mb-8">
            CONTACT
          </p>
          <h1
            className="copy-ja mb-8 font-serif text-[26px] leading-relaxed tracking-[0.06em] text-[#0a0a0a] min-[430px]:text-3xl md:mb-10 md:tracking-[0.1em]"
            style={{ fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" }}
          >
            お問い合わせ
          </h1>
          <p className="copy-ja mb-12 max-w-[36rem] text-sm leading-[2.05] tracking-[0.1em] text-black/[0.62] md:mb-14 md:text-[15px] md:leading-[2.1] min-[430px]:tracking-[0.12em]">
            採用支援、Web制作、資料制作、業務設計に関するご相談は、以下のフォームよりお気軽にお問い合わせください。
          </p>
          <a
            href={SITE_CONFIG.contactFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 flex w-full max-w-[420px] items-center justify-between border border-black/35 bg-[#f2f0e9] px-6 py-5 text-xs font-semibold tracking-[0.18em] text-[#0a0a0a] transition hover:bg-[#0a0a0a] hover:text-white min-[430px]:px-7 min-[430px]:tracking-[0.22em] md:mb-12"
            aria-label="お問い合わせフォームを開く"
          >
            <span className="min-w-0">フォームを開く</span>
            <span className="shrink-0">→</span>
          </a>
          <p className="copy-ja max-w-[36rem] text-xs leading-[2.05] tracking-[0.1em] text-black/[0.52] md:text-[13px] md:leading-[2.1]">
            メールで直接ご連絡の場合は、
            <a
              href={MAILTO_HREF}
              className="text-[#111111] underline-offset-4 decoration-[#111]/35 transition-opacity hover:underline hover:opacity-80"
            >
              {SITE_CONFIG.email}
            </a>
            までご連絡ください。
          </p>
        </div>
      </div>
    </article>
  );
}
