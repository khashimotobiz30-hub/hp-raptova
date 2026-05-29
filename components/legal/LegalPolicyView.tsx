import type { LegalPolicyContent } from '@/lib/legal/types';

const serifStyle = {
  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
} as const;

function PolicyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="copy-ja mt-5 list-disc space-y-2.5 pl-5 text-sm leading-[2.05] tracking-[0.06em] text-black/[0.72] md:text-[15px] md:leading-[2.12]">
      {items.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

function PolicyContact({ contact }: { contact: LegalPolicyContent['sections'][number]['contact'] }) {
  if (!contact) return null;

  return (
    <div className="copy-ja mt-6 space-y-2 text-sm leading-[2.05] tracking-[0.06em] text-black/[0.72] md:text-[15px] md:leading-[2.12]">
      <p>{contact.organization}</p>
      <p>
        {contact.emailLabel}
        <a
          href={`mailto:${contact.email}`}
          className="text-[#111111] underline decoration-[#111]/30 underline-offset-4 transition-opacity hover:opacity-80"
        >
          {contact.email}
        </a>
      </p>
    </div>
  );
}

export default function LegalPolicyView({ content }: { content: LegalPolicyContent }) {
  const { englishLabel, japaneseTitle, intro, sections, enactedDate } = content;

  return (
    <article className="min-h-[calc(100svh-72px)] bg-[#f2f0e9] text-[#0a0a0a]">
      <div className="mx-auto max-w-[800px] px-7 py-20 md:px-14 md:py-24 lg:px-20 lg:py-28">
        <header className="mb-14 md:mb-16">
          <p className="mb-6 text-[10px] font-semibold tracking-[0.42em] text-black/34 md:mb-7">
            {englishLabel}
          </p>
          <h1
            className="copy-ja font-serif text-[26px] leading-relaxed tracking-[0.06em] text-[#0a0a0a] min-[430px]:text-[1.75rem] md:text-3xl md:tracking-[0.08em] lg:text-[2.125rem] lg:tracking-[0.09em]"
            style={serifStyle}
          >
            {japaneseTitle}
          </h1>
          <div className="mt-8 h-px w-12 bg-black/18 md:mt-9" aria-hidden />
          <p className="copy-ja mt-8 max-w-[42rem] text-sm leading-[2.05] tracking-[0.08em] text-black/[0.68] md:mt-9 md:text-[15px] md:leading-[2.12] md:tracking-[0.1em]">
            {intro}
          </p>
        </header>

        <div className="space-y-14 md:space-y-16">
          {sections.map((section) => (
            <section key={section.heading} aria-labelledby={`policy-${section.heading}`}>
              <h2
                id={`policy-${section.heading}`}
                className="copy-ja mb-5 font-serif text-lg font-medium tracking-[0.05em] text-[#0a0a0a] md:mb-6 md:text-xl"
                style={serifStyle}
              >
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="copy-ja text-sm leading-[2.05] tracking-[0.06em] text-black/[0.72] md:text-[15px] md:leading-[2.12] [&+p]:mt-5"
                >
                  {paragraph}
                </p>
              ))}
              {section.listItems ? <PolicyList items={section.listItems} /> : null}
              {section.afterListParagraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="copy-ja mt-5 text-sm leading-[2.05] tracking-[0.06em] text-black/[0.72] md:text-[15px] md:leading-[2.12]"
                >
                  {paragraph}
                </p>
              ))}
              {section.contact ? <PolicyContact contact={section.contact} /> : null}
            </section>
          ))}
        </div>

        <p className="copy-ja mt-16 border-t border-black/[0.08] pt-10 text-sm tracking-[0.08em] text-black/[0.55] md:mt-20 md:pt-12">
          {enactedDate}
        </p>
      </div>
    </article>
  );
}
