import { ReactNode } from "react";
import { InstagramIcon } from "@/components/Buttons/InstagramButton";

function InstagramMention({ username }: { username: string }) {
  return (
    <a
      href={`https://instagram.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline text-pink-400 hover:text-pink-300 transition-colors whitespace-nowrap"
    >
      <span className="inline-block align-middle mr-1">
        <InstagramIcon />
      </span>
      {username}
    </a>
  );
}

const MENTION_OR_NEWLINE_REGEX = /(@[a-zA-Z0-9._]+|\n)/g;

export function parseDescriptionWithMentions(description: string): ReactNode[] {
  const parts = description.split(MENTION_OR_NEWLINE_REGEX);

  return parts
    .map((part, index) => {
      if (part === "\n") {
        return <br key={index} />;
      }
      if (part.startsWith("@")) {
        const username = part.slice(1);
        return <InstagramMention key={index} username={username} />;
      }
      return part || null;
    })
    .filter(Boolean);
}
