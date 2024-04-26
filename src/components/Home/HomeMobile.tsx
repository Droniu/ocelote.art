import Image from "next/image";
import React from "react";
import { animationHandler, animationHandlerVertical } from "./utils";

import { XyzTransitionGroup, XyzTransition } from "@animxyz/react";
import { useWindowSize } from "usehooks-ts";
import { Gallery } from "@/contentful/galleries";

export interface HomeMobileProps {
  // Codegen not working with Contenful 10 - no types for now.
  galleries: Gallery[];
}

export const HomeMobile = ({ galleries }: HomeMobileProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      ref.current!.dataset.mouseDownAt = e.clientY.toString();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current?.dataset.mouseDownAt === "0") return;
      const mouseDelta =
        parseFloat(ref.current?.dataset.mouseDownAt ?? "0") - e.clientY;

      animationHandlerVertical({ ref, delta: mouseDelta });
    };

    const handleMouseUp = () => {
      ref.current!.dataset.mouseDownAt = "0";
      ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
    };

    const handleWheel = (e: WheelEvent) => {
      const wheelDelta = e.deltaY;
      animationHandlerVertical({ ref, delta: wheelDelta });
      ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
    };

    const handleTouchDown = (e: TouchEvent) => {
      ref.current!.dataset.mouseDownAt = e.touches[0].clientY.toString();
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (ref.current?.dataset.mouseDownAt === "0") return;
      const mouseDelta =
        parseFloat(ref.current?.dataset.mouseDownAt ?? "0") -
        e.touches[0].clientY;

      animationHandlerVertical({ ref, delta: mouseDelta });
    };
    const handleTouchUp = () => {
      ref.current!.dataset.mouseDownAt = "0";
      ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
    };

    if (ref.current && ref.current?.dataset) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchstart", handleTouchDown);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchUp);
      window.addEventListener("wheel", handleWheel);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [ref]);

  return (
    <div
      data-mouse-down-at="0"
      data-prev-percentage="0"
      className="flex flex-col grow absolute left-0 top-1/2 gap-10 justify-center items-center w-screen"
      ref={ref}
    >
      <XyzTransitionGroup
        appear
        xyz="fade small-25% stagger-2 duration-15"
        className="contents"
      >
        {galleries?.map(
          (gallery) =>
            gallery.coverVertical && (
              <div
                key={gallery?.title}
                className="w-screen lg:w-1/2 aspect-photoHorizontal relative select-none drag-none justify-start flex items-center"
              >
                <Image
                  fill
                  draggable={false}
                  style={{
                    objectFit: "cover",
                    objectPosition: `50% 100%`,
                    willChange: "transform",
                  }}
                  src={`https:${gallery.coverVertical.src}`}
                  alt=""
                />
                <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-accent opacity-0 hover:opacity-60 duration-500">
                  <h2 className="font-bold text-4xl opacity-100 text-opacity-100 text-white">
                    {gallery?.title}
                  </h2>
                </div>
              </div>
            )
        )}
      </XyzTransitionGroup>
    </div>
  );
};
