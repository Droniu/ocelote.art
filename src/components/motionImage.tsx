import { ImageProps } from "next/image";
import Image from "next/image";
import { forwardRef } from "react";
import { m } from "framer-motion";
import React from "react";

const ExoticImage = forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper(props, ref) {
    return <Image {...props} ref={ref} />;
  }
);

export const MotionImage = m(ExoticImage);
