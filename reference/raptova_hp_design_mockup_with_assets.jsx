export default function RaptovaHpDesignMockup() {
  const businesses = [
    {
      no: "01",
      en: "RECRUITING SUPPORT",
      titleLines: ["採用活動の", "立ち上げ支援"],
      body: "採用LP、採用サイト、説明会資料、求人票、文面設計まで。採用活動に必要な初期装備を整えます。",
      visual: "from-zinc-950 via-zinc-800 to-zinc-400",
    },
    {
      no: "02",
      en: "BUSINESS CREATIVE",
      titleLines: ["Web・資料・文章の", "制作支援"],
      body: "Webサイト、LP、会社案内、営業資料、文章制作など、伝えたい価値を形にします。",
      visual: "from-zinc-100 via-zinc-300 to-zinc-600",
    },
    {
      no: "03",
      en: "WORKFLOW DESIGN",
      titleLines: ["業務整理・AI活用", "支援"],
      body: "手が回っていない業務や属人的な作業を整理し、AIを活用できる仕組みに変えていきます。",
      visual: "from-black via-zinc-900 to-zinc-500",
    },
  ];

  const values = [
    "現実に届くAI活用",
    "整理してから、形にする",
    "小さく始めて、継続できる形へ",
    "人の思考を置き換えず、拡張する",
  ];

  const heroCopy = [
    "未来の話で終わらせない。",
    "目の前にある仕事から変えていく。",
  ];

  const devChecks = [
    businesses.length === 3,
    businesses.every((item) => item.no && item.en && item.titleLines.length > 0 && item.body && item.visual),
    values.length === 4,
    heroCopy.length === 2,
  ];

  if (devChecks.some((passed) => !passed)) {
    throw new Error("RAPTOVA mockup data is incomplete.");
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-zinc-950 antialiased selection:bg-zinc-950 selection:text-white">
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-8 py-7 mix-blend-difference md:px-12">
        <div className="text-sm font-medium tracking-[0.38em] text-white">RAPTOVA</div>
        <nav className="hidden items-center gap-10 text-[10px] font-semibold tracking-[0.32em] text-white md:flex">
          <a href="#about" className="hover:opacity-60">ABOUT</a>
          <a href="#business" className="hover:opacity-60">BUSINESS</a>
          <a href="#philosophy" className="hover:opacity-60">PHILOSOPHY</a>
          <a href="#contact" className="hover:opacity-60">CONTACT</a>
        </nav>
      </header>

      <section className="relative min-h-screen overflow-hidden bg-[#ecebe6]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/raptova-hero-bg.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f3ef]/78 via-[#f4f3ef]/36 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f3ef]/8" aria-hidden="true" />
        <div className="absolute left-[62%] top-0 hidden h-full w-px bg-zinc-900/10 md:block" aria-hidden="true" />

        <div className="relative grid min-h-screen grid-cols-1 md:grid-cols-[62%_38%]">
          <div className="flex min-h-screen flex-col justify-center px-8 pb-20 pt-28 md:px-16 lg:px-20">
            <h1 className="max-w-4xl font-serif text-[18vw] leading-[0.86] tracking-[-0.08em] text-zinc-950 md:text-[9.8vw]">
              Make<br />Work Move.
            </h1>
            <p className="mt-16 text-[15px] leading-loose tracking-[0.18em] text-zinc-900 md:text-base">
              {heroCopy.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < heroCopy.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>

          <div className="hidden min-h-screen border-l border-zinc-300/60 md:grid md:grid-rows-[45%_55%]">
            <div className="bg-zinc-950 px-12 py-24 text-white">
              <p className="mb-10 text-[10px] font-semibold tracking-[0.38em] text-zinc-400">STATEMENT</p>
              <h2 className="font-serif text-[2.25vw] leading-[1.5] tracking-[0.06em]">
                Work is changing.<br />
                But the future<br />
                should not stay<br />
                far away.
              </h2>
              <p className="mt-12 max-w-sm text-xs leading-loose tracking-[0.18em] text-zinc-400">
                未来の話で終わらせない。<br />
                目の前にある仕事から変えていく。<br />
                RAPTOVA makes work move.
              </p>
            </div>
            <div
              className="relative overflow-hidden bg-black bg-cover bg-center"
              style={{ backgroundImage: "url('/images/raptova-statement-visual.png')" }}
              aria-label="Statement visual"
            />
          </div>
        </div>

        <div className="absolute bottom-12 right-10 hidden items-center gap-4 text-[10px] font-semibold tracking-[0.24em] text-zinc-700 [writing-mode:vertical-rl] md:flex">
          SCROLL
          <span className="mt-4 h-16 w-px bg-zinc-700" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[62%_38%]">
        <div id="business" className="bg-[#f4f3ef] px-8 py-24 md:px-14 lg:px-20">
          <div className="mb-16 max-w-3xl">
            <p className="mb-8 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">BUSINESS</p>
            <h2 className="font-serif text-3xl leading-relaxed tracking-[0.14em] md:text-4xl">
              3つの領域で、<br />仕事を前に進める。
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-loose tracking-[0.16em] text-zinc-600">
              RAPTOVAは、人や組織の中にある構想・課題・情報を整理し、実行できる形へ変えていきます。
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {businesses.map((item) => (
              <article key={item.no} className="group cursor-pointer">
                <div className={`relative mb-7 h-40 overflow-hidden bg-gradient-to-br ${item.visual}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.3),transparent)] opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />
                  <div className="absolute left-5 top-5 text-sm tracking-[0.2em] text-white mix-blend-difference">{item.no}</div>
                </div>
                <p className="mb-5 text-[10px] font-semibold tracking-[0.28em] text-zinc-500">{item.en}</p>
                <h3 className="font-serif text-xl leading-snug tracking-[0.12em] text-zinc-950 lg:text-2xl">
                  {item.titleLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </h3>
                <p className="mt-5 min-h-24 text-xs leading-loose tracking-[0.12em] text-zinc-600">{item.body}</p>
                <div className="mt-7 flex items-center gap-4 text-xs tracking-[0.18em] text-zinc-950">
                  <span className="h-px w-10 bg-zinc-950 transition-all group-hover:w-16" />
                  VIEW MORE
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside id="philosophy" className="bg-zinc-950 px-8 py-24 text-white md:px-14 lg:px-16">
          <p className="mb-12 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">PHILOSOPHY</p>
          <h2 className="mb-20 font-serif text-3xl leading-relaxed tracking-[0.18em] md:text-4xl">
            私たちが<br />大切にしていること
          </h2>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {values.map((value, index) => (
              <div key={value} className="grid grid-cols-[52px_1fr] py-7 text-sm tracking-[0.16em] md:text-base">
                <span className="text-zinc-500">{String(index + 1).padStart(2, "0")}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <button className="mt-12 flex items-center gap-5 text-xs font-semibold tracking-[0.24em] text-zinc-300 hover:text-white">
            VIEW MORE <span className="h-px w-12 bg-current" />
          </button>
        </aside>
      </section>

      <section id="about" className="grid grid-cols-1 bg-[#f4f3ef] md:grid-cols-[34%_66%]">
        <div className="px-8 py-20 md:px-14 lg:px-20">
          <p className="mb-10 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">ABOUT</p>
          <h2 className="font-serif text-3xl tracking-[0.18em]">RAPTOVAとは</h2>
          <p className="mt-10 text-sm leading-loose tracking-[0.14em] text-zinc-700">
            RAPTOVAは、AIを活用して、人や組織の中にある構想・課題・情報を整理し、Web、資料、文章、業務フローなど、実行できる形へ変えていく事業です。
          </p>
          <button className="mt-10 flex w-44 items-center justify-between border border-zinc-950 px-6 py-4 text-xs font-semibold tracking-[0.18em] transition hover:bg-zinc-950 hover:text-white">
            VIEW MORE <span>→</span>
          </button>
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-zinc-300">
          <div className="absolute inset-0 bg-[linear-gradient(105deg,#a2a29d_0%,#d8d8d3_35%,#383838_36%,#6f6f69_54%,#c8c8c1_55%,#efeee9_100%)]" />
          <div className="absolute left-[25%] top-0 h-full w-px bg-white/30" />
          <div className="absolute left-[58%] top-0 h-full w-px bg-black/20" />
          <div className="absolute bottom-[20%] left-[34%] h-[18%] w-[28%] bg-black/30 blur-sm" />
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-zinc-950 px-8 py-16 text-white md:px-14 lg:px-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr_300px] md:items-center">
          <div>
            <p className="mb-5 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">CONTACT</p>
            <h2 className="font-serif text-3xl leading-relaxed tracking-[0.18em]">
              目の前の仕事を、<br />前に進める相談をする。
            </h2>
          </div>
          <p className="max-w-lg text-xs leading-loose tracking-[0.16em] text-zinc-400">
            採用活動の立ち上げ、Web・資料・文章の整理、業務効率化など、まずは今必要な一歩からご相談ください。
          </p>
          <button className="flex items-center justify-between border border-white/35 px-8 py-5 text-xs font-semibold tracking-[0.22em] text-white transition hover:bg-white hover:text-zinc-950">
            お問い合わせする <span>→</span>
          </button>
        </div>
      </section>

      <footer className="flex flex-col gap-8 border-t border-white/10 bg-zinc-950 px-8 py-9 text-white md:flex-row md:items-center md:justify-between md:px-14 lg:px-20">
        <div className="text-sm font-medium tracking-[0.38em]">RAPTOVA</div>
        <nav className="flex flex-wrap gap-8 text-[10px] font-semibold tracking-[0.26em] text-zinc-400">
          <a href="#about">ABOUT</a>
          <a href="#business">BUSINESS</a>
          <a href="#philosophy">PHILOSOPHY</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <p className="text-[10px] tracking-[0.18em] text-zinc-500">© RAPTOVA Inc.</p>
      </footer>
    </main>
  );
}
