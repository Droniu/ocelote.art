import { LogoFull } from "@/components/Logo/LogoFull";
import { InstagramButton } from "@/components/Buttons/InstagramButton";
import { WhatsappButton } from "@/components/Buttons/WhatsappButton";
import { MailButton } from "@/components/Buttons/MailButton";

export default function Contact() {
  return (
    <div className="grid grid-cols-1 w-screen h-full">
      <div className="flex flex-col md:justify-center justify-start items-center md:gap-16 gap-2 text-white">
        <LogoFull className="md:w-96 w-64 h-32" />
        <span className="md:w-1/3 w-3/4 text-justify mb-4 font-montserrat">
          Hej! Zajmuję się głównie fotografią portretową i eventową w okolicach{" "}
          <b>Wrocławia</b>, aczkolwiek zdarza mi się realizować też inne
          projekty. W szczególności specjalizuję się w robieniu zdjęć w nocy. Na
          tej stronie możesz obejrzeć moje portfolio. Jeśli masz jakiś ciekawy
          jesteś zateresowany/a współpracą, napisz do mnie 👌
        </span>
        <div className="flex md:flex-row flex-col md:gap-8 gap-2 items-center whitespace-nowrap mb-16 h-auto">
          <InstagramButton />
          <WhatsappButton />
          <MailButton />
        </div>
      </div>
    </div>
  );
}
