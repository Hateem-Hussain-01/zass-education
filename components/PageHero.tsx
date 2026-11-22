import Link from "next/link";

/**
 * Shared hero for inner pages — flat Cyprus, same feel as the home hero:
 * subtle floating 3D-style shapes (CSS only, lightweight) and small cute
 * accents, all in the two palette colours. Optional small arched student
 * photo on the right. Title + description are the page's real copy.
 */
export default function PageHero({
  title,
  description,
  image,
  imageAlt,
  eyebrow,
  cta,
}: {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--zass-primary)] text-white px-5 md:px-14 pt-10 pb-12">
      {/* Floating 3D-style shapes — white alpha only, no new colours. */}
      <div
        aria-hidden="true"
        className="animate-zass-float absolute left-[6%] top-8 h-10 w-10 rounded-full border-2 border-white/25"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float-slow absolute right-[24%] top-6 h-8 w-8 rounded-lg bg-white/10"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float absolute bottom-8 left-[38%] h-6 w-6 rounded-full bg-white/15"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float-slow absolute right-[8%] bottom-10 text-2xl text-white/30"
      >
        ★
      </div>
      <div
        aria-hidden="true"
        className="animate-zass-float absolute left-[46%] top-5 text-xl text-white/25"
      >
        ✎
      </div>
      <div
        aria-hidden="true"
        className="animate-zass-float-slow absolute bottom-6 right-[38%] h-5 w-5 rounded-full border-2 border-white/20"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="inline-block rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-xs font-bold">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/85">
            {description}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-5 inline-block rounded-full bg-[var(--zass-card)] px-5 py-2.5 text-sm font-bold text-[#004643]"
            >
              {cta.label}
            </Link>
          )}
        </div>
        {image && (
          <div className="relative hidden shrink-0 justify-center sm:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt ?? "O & A Level student"}
              className="animate-zass-rise h-[220px] w-[170px] object-cover rounded-t-[120px] rounded-b-3xl shadow-[0_0_0_10px_rgba(255,255,255,0.14)]"
            />
            <div
              aria-hidden="true"
              className="animate-zass-float absolute -left-4 top-6 rounded-2xl bg-[var(--zass-card)] px-3 py-2 text-sm font-bold text-[#004643] shadow-xl"
            >
              ★ 4.8
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
