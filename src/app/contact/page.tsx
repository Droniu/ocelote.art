import { Metadata } from "next";
import { LogoFull } from "@/components/Logo/LogoFull";
import { InstagramButton } from "@/components/Buttons/InstagramButton";
import { WhatsappButton } from "@/components/Buttons/WhatsappButton";
import { MailButton } from "@/components/Buttons/MailButton";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z ocelote.art - fotografia portretowa i eventowa we Wrocławiu",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <main className="grid grid-cols-1 w-full h-full overflow-x-hidden">
      <div className="flex flex-col justify-center items-center lg:gap-16 gap-2 text-white">
        <h1 className="sr-only">Kontakt - ocelote.art</h1>
        <LogoFull className="lg:w-96 w-64 h-32" />
        <p className="lg:w-1/3 w-3/4 text-justify mb-4">
          Hej! Zajmuję się głównie fotografią portretową i eventową w okolicach{" "}
          <b>Wrocławia</b>, aczkolwiek zdarza mi się realizować też inne
          projekty. W szczególności specjalizuję się w robieniu zdjęć w nocy. Na
          tej stronie możesz obejrzeć moje portfolio. Jeśli masz jakiś ciekawy
          projekt i jesteś zainteresowany/a współpracą, napisz do mnie 👌
        </p>
        <nav
          className="flex lg:flex-row flex-col lg:gap-8 gap-2 items-center whitespace-nowrap h-auto"
          aria-label="Linki kontaktowe"
        >
          <InstagramButton />
          <WhatsappButton />
          <MailButton />
        </nav>
      </div>
    </main>
  );
}
