import { Logo } from "../Logo/Logo";


export const Navbar = () => {
  return (
    <nav className="flex gap-16 justify-center items-center text-white p-4">
      <span>Portfolio</span>
      <div>
        <Logo className="h-12 w-fit"/>
      </div>
      <span>Kontakt</span>
    </nav>
  );
};
