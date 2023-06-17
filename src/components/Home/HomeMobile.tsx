import Image from "next/image";
import React from "react";
import { animationHandler, animationHandlerVertical } from "./utils";

import { XyzTransitionGroup } from "@animxyz/react";
import { useWindowSize } from "usehooks-ts";

export interface HomeMobileProps {
  // Codegen not working with Contenful 10 - no types for now.
  galleries: any[];
}

export const HomeMobile = ({ galleries }: HomeMobileProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      ref.current!.dataset.mouseDownAt = e.clientX.toString();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current?.dataset.mouseDownAt === "0") return;
      const mouseDelta =
        parseFloat(ref.current?.dataset.mouseDownAt ?? "0") - e.clientX;

      animationHandler({ ref, delta: mouseDelta });
    };

    const handleMouseUp = () => {
      ref.current!.dataset.mouseDownAt = "0";
      ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
    };


    const handleTouchDown = (e: TouchEvent) => {
      ref.current!.dataset.mouseDownAt = e.touches[0].clientY.toString();
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (ref.current?.dataset.mouseDownAt === "0") return;
      const mouseDelta =
        parseFloat(ref.current?.dataset.mouseDownAt ?? "0") - e.touches[0].clientY;

      animationHandlerVertical({ ref, delta: mouseDelta });
    }
    const handleTouchUp = () => {
      ref.current!.dataset.mouseDownAt = "0";
      ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
    }

    if (ref.current && ref.current?.dataset) {
      window.addEventListener("touchstart", handleTouchDown);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchUp);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchUp);
    };
  }, [ref]);

  console.log(galleries)

  const { width } = useWindowSize();
  console.log(width)

  return (
    <div
      data-mouse-down-at="0"
      data-prev-percentage="0"
      className="flex flex-col grow absolute left-0 top-1/2 gap-8"
      ref={ref}
    >
      <XyzTransitionGroup
        appear
        xyz="fade small-25% stagger-2 duration-15"
        className="contents"
      >
        {galleries?.map((gallery) => gallery.fields.coverVertical && (
          <div
            key={gallery?.sys?.id}
            className="w-screen aspect-photoHorizontal relative select-none drag-none"
          >
            <Image
              fill
              draggable={false}
              style={{ objectFit: "cover", objectPosition: `50% 100%` }}
              src={`https:${gallery.fields.coverVertical.fields.file.url}`}
              alt=""
            />
            <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-accent opacity-0 hover:opacity-60 duration-500">
              <h2 className="font-bold text-4xl opacity-100 text-opacity-100 text-white">{gallery?.fields?.title}</h2>
            </div>
          </div>
        ))}
      </XyzTransitionGroup>
    </div>
  );
};
