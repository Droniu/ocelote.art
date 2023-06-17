import { Logo } from "../Logo/Logo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex gap-16 justify-center items-center text-white bg-black p-4">
      <Link href="/">Portfolio</Link>
      <div>
        <Logo className="h-12 w-12"/>
      </div>
      <Link href="/contact">Kontakt</Link>
    </nav>
  );
};
