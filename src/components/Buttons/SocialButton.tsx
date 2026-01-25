import { ReactNode } from "react";

interface SocialButtonProps {
  href: string;
  label: string;
  icon: ReactNode;
  colorClass: string;
  external?: boolean;
}

export const SocialButton = ({
  href,
  label,
  icon,
  colorClass,
  external = false,
}: SocialButtonProps) => (
  <a
    href={href}
    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    className={`py-2 px-4 gap-2 flex justify-center items-center ${colorClass} text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
  >
    {icon}
    {label}
  </a>
);
