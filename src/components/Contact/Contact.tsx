import { InstagramButton } from "../Buttons/InstagramButton";
import { MailButton } from "../Buttons/MailButton";
import { WhatsappButton } from "../Buttons/WhatsappButton";
import { LogoFull } from "../Logo/LogoFull";

import Tilt from "react-parallax-tilt";

import Image from "next/image";

export const Contact = () => {
  return (
    <div className="grid grid-cols-2 w-screen h-full">
      <div className="flex justify-center items-center">
        <Tilt trackOnWindow tiltReverse>
          <Image
            src="https://images.unsplash.com/photo-1499417267106-45cebb7187c9"
            alt=""
            width={400}
            height={600}
          />
        </Tilt>
      </div>
      <div className="flex flex-col justify-start items-center gap-16">
        <LogoFull className="w-96" />
        <span className="w-1/2 text-justify">{`ocelote.art is a photography brand based in Wroclaw that specializes in capturing stunning photos in low-light conditions. With a keen eye for detail and a passion for photography, ocelote.art delivers unique and high-quality photos to clients. The brand's expertise in low-light photography allows them to create beautiful, moody, and atmospheric images that stand out from the crowd. ocelote.art's commitment to excellence and creativity make them a top choice for anyone seeking exceptional photography services.`}</span>
        <span>
          Pricing is dependent on the project. Please contact me for more
          information:
        </span>
        <div className="flex gap-8 items-center whitespace-nowrap">
          <InstagramButton />
          <WhatsappButton />
          <MailButton />
        </div>
      </div>
    </div>
  );
};
