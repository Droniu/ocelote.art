import { getStrapiURL } from "@/lib/api";
import { GalleryListResponseDataItem } from "@/lib/schema";
import Image from "next/image";
import React from "react";
import { animationHandler } from "./utils";

import { XyzTransitionGroup } from "@animxyz/react";

export interface HomeProps {
  galleries: GalleryListResponseDataItem[];
}

export const Home = ({ galleries }: HomeProps) => {
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

    const handleWheel = (e: WheelEvent) => {
      const wheelDelta = e.deltaY;
      animationHandler({ ref, delta: wheelDelta });
      ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
    };

    if (ref.current && ref.current?.dataset) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [ref]);

  return (
    <div
      data-mouse-down-at="0"
      data-prev-percentage="0"
      className="flex grow absolute left-1/3 top-1/2 gap-8 -translate-y-1/2"
      ref={ref}
    >
      <XyzTransitionGroup
        appear
        xyz="fade small-25% stagger-2 duration-15"
        className="contents"
      >
        {galleries?.map((gallery) => (
          <div
            key={gallery.id}
            className="h-screen-2/3 aspect-photoVertical relative select-none drag-none"
          >
            <Image
              fill
              draggable={false}
              style={{ objectFit: "cover", objectPosition: `100% 50%` }}
              src={
                getStrapiURL(
                  gallery?.attributes?.cover?.data?.attributes?.url
                ) ?? ""
              }
              alt=""
            />
            <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-accent opacity-0 hover:opacity-60 duration-500">
              <h2 className="font-bold text-4xl opacity-100 text-opacity-100 text-white">{gallery?.attributes?.title}</h2>
            </div>
          </div>
        ))}
      </XyzTransitionGroup>
    </div>
  );
};