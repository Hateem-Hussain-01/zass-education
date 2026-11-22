"use client";

import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        description="Questions about a subject, a past paper or a course? Send us a message."
        image="/images/purdue/c4.png"
        imageAlt="Books on a study desk"
      />
      <ContactSection eyebrow="Contact Us" title="We'd Love to Hear From You" />
    </div>
  );
}
