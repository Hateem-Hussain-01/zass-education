import Link from "next/link";
import Icon from "./icons";

/**
 * Shared hero for inner pages — Purdue style: flat Cyprus, big bold
 * title, soft flat circle shapes (no gradients), a small arched student
 * photo on the right with a floating star 4.8 badge. Title + description
 * are the page's real copy.
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
    <section className="relative overflow-hidden bg-[var(--zass-primary)] text-white px-5 md:px-14 pt-12 pb-14">
      {/* Soft flat background shapes — white alpha circles only. */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float absolute left-[5%] top-8 h-10 w-10 rounded-full border-2 border-white/25"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float-slow absolute right-[28%] top-6 h-8 w-8 rounded-lg bg-white/10"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float absolute bottom-8 left-[42%] h-6 w-6 rounded-full bg-white/15"
      />
      <div
        aria-hidden="true"
        className="animate-zass-float-slow absolute right-[10%] bottom-8 text-white/30"
      >
        <Icon name="star" filled className="h-6 w-6" />
      </div>
      <div
        aria-hidden="true"
        className="animate-zass-float absolute left-[48%] top-5 text-white/25"
      >
        <Icon name="pencil" className="h-5 w-5" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="inline-block rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
            {description}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-6 inline-block rounded-full bg-[var(--zass-card)] px-6 py-2.5 text-sm font-bold text-[#004643] hover:opacity-90"
            >
              {cta.label} →
            </Link>
          )}
        </div>
        {image && (
          <div className="relative hidden shrink-0 justify-center sm:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt ?? "O & A Level student"}
              className="animate-zass-rise h-[240px] w-[190px] object-cover rounded-t-[130px] rounded-b-3xl shadow-[0_0_0_10px_rgba(255,255,255,0.14)]"
            />
            <div
              aria-hidden="true"
              className="animate-zass-bob absolute -left-4 top-6 flex items-center gap-1 rounded-2xl bg-[var(--zass-card)] px-3 py-2 text-sm font-bold text-[#004643] shadow-xl"
            >
              <Icon name="star" filled className="h-4 w-4" /> 4.8
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
