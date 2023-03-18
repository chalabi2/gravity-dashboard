import {
  chakra,
  ImageProps,
  forwardRef,
} from "@chakra-ui/react"
import darklogo from "./darklogo.svg"
import lightlogo from "./lightlogo.svg"
import { useColorModeValue } from "@chakra-ui/react";

export const Logo = forwardRef<ImageProps, 'img'>((props, ref) => {
  const logoSrc = useColorModeValue(darklogo, lightlogo);

  return (
    <chakra.img
      src={logoSrc}
      ref={ref}
      {...props}
    />
  );
});
