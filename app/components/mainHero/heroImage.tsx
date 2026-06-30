"use client";
import { useTheme } from "@barrelrolla/react-components-library";
import lightImage from "@/public/hero-light.png";
import darkImage from "@/public/hero-dark.png";
import Image from "next/image";

export default function HeroImage() {
  const theme = useTheme();
  const image = theme?.isDark ? darkImage : lightImage;

  return (
    <Image
      className="hero-image"
      src={image}
      alt="An image showing a plate full of tasty food."
      loading="eager"
    />
  );
}
