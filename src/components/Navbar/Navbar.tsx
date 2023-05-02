import { Logo } from "../Logo/Logo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex gap-16 justify-center items-center text-white p-4">
      <Link href="/">Portfolio</Link>
      <div>
        <Logo className="h-12 w-fit"/>
      </div>
      <Link href="/contact">Kontakt</Link>
    </nav>
  );
};
