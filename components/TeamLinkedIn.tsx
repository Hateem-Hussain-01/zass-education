import Icon from "@/components/icons";

/**
 * LinkedIn mark on a team card, on the name's line at the right edge.
 * A real link (new tab) when a profile URL is set; the same icon with
 * no link when it is not - the spot is never left empty and no URL is
 * ever guessed. Same Cyprus colour and size either way.
 */
export default function TeamLinkedIn({
  url,
  name,
}: {
  url?: string;
  name: string;
}) {
  const icon = (
    <Icon name="linkedin" filled className="h-5 w-5 text-[#004643]" />
  );
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on LinkedIn`}
        className="shrink-0 transition-opacity hover:opacity-70"
      >
        {icon}
      </a>
    );
  }
  return (
    <span aria-hidden="true" className="shrink-0">
      {icon}
    </span>
  );
}
