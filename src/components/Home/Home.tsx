import { getStrapiURL } from "@/lib/api";
import {
  Gallery,
  GalleryListResponse,
  GalleryListResponseDataItem,
} from "@/lib/schema";
import Image from "next/image";
import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { animationHandler } from "./utils";

export interface HomeProps {
  galleries: GalleryListResponseDataItem[];
}

export const Home = ({ galleries }: HomeProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      window.onmousedown = (e) => {
        ref.current!.dataset.mouseDownAt = e.clientX.toString();
      };
      window.onmousemove = (e) => {
        if (ref.current!.dataset.mouseDownAt === "0") return;
        const mouseDelta = parseFloat(ref.current?.dataset.mouseDownAt ?? "0") - e.clientX;

        animationHandler({ref, delta: mouseDelta})

      };
      window.onmouseup = (e) => {
        ref.current!.dataset.mouseDownAt = "0";
        ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
       }

       window.onwheel = e => {
        const wheelDelta = e.deltaY;
        
        animationHandler({ref, delta: wheelDelta})

        ref.current!.dataset.prevPercentage = ref.current!.dataset.percentage;
       }
    }
  });

  return (
      <div data-mouse-down-at="0" data-prev-percentage="0" className="flex grow absolute left-1/2 top-1/2 gap-8 -translate-y-1/2" ref={ref}>
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
          </div>
        ))}
      </div>
  );
};
