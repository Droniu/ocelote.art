import { InstagramButton } from "../Buttons/InstagramButton";
import { MailButton } from "../Buttons/MailButton";
import { WhatsappButton } from "../Buttons/WhatsappButton";
import { LogoFull } from "../Logo/LogoFull";

import Tilt from "react-parallax-tilt";

import Image from "next/image";

import { XyzTransition } from "@animxyz/react";
import { useWindowSize } from "usehooks-ts";

export const Contact = () => {
  const { width } = useWindowSize();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-full overflow-y-scroll">
      {width >= 768 && (
        <XyzTransition appear xyz="fade small-25% duration-15">
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
        </XyzTransition>
      )}
      <XyzTransition appear xyz="fade right-3 duration-15">
        <div className="flex flex-col md:justify-center justify-start items-center md:gap-16 gap-2">
          <LogoFull className="md:w-96 w-64 h-32" />
          <span className="md:w-1/2 w-3/4 text-justify mb-4">{`ocelote.art is a photography brand based in Wroclaw that specializes in capturing stunning photos in low-light conditions. With a keen eye for detail and a passion for photography, ocelote.art delivers unique and high-quality photos to clients. The brand's expertise in low-light photography allows them to create beautiful, moody, and atmospheric images that stand out from the crowd. ocelote.art's commitment to excellence and creativity make them a top choice for anyone seeking exceptional photography services.`}</span>
          <span className="w-3/4 text-center mb-8">
            Pricing is dependent on the project. Please contact me for more
            information:
          </span>
          <div className="flex md:flex-row flex-col md:gap-8 gap-2 items-center whitespace-nowrap">
            <InstagramButton />
            <WhatsappButton />
            <MailButton />
          </div>
        </div>
      </XyzTransition>
    </div>
  );
};
