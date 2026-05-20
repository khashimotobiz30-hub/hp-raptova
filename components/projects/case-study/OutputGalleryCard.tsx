'use client';

import Image from 'next/image';

export type OutputGalleryCardProps = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export default function OutputGalleryCard({
  label,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
}: OutputGalleryCardProps) {
  return (
    <article className="flex w-[var(--gallery-card-width)] shrink-0 flex-col gap-2">
      <div className="overflow-hidden rounded-sm border border-black/[0.1] bg-white shadow-[0_1px_8px_rgba(10,10,10,0.035)]">
        <div className="flex h-6 items-center gap-1 border-b border-black/[0.06] bg-[#faf9f6] px-2" aria-hidden>
          <span className="size-1 rounded-full bg-black/10" />
          <span className="size-1 rounded-full bg-black/10" />
          <span className="size-1 rounded-full bg-black/10" />
          <span className="ml-1 h-px min-w-0 flex-1 bg-black/[0.06]" />
        </div>
        <div className="relative aspect-video w-full bg-[#f0efeb]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 1024px) 82vw, 42vw"
            draggable={false}
          />
        </div>
      </div>

      <p className="copy-ja text-center text-[10px] font-medium tracking-[0.2em] text-black/[0.5]">
        {label}
      </p>
    </article>
  );
}
