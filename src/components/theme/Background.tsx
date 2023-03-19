import { chakra, ImageProps, forwardRef } from "@chakra-ui/react";
import background from "./background.svg";


export const Background = forwardRef<ImageProps, "img">((props, ref) => {
  return (
    <chakra.div
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      overflow="hidden"
      zIndex="-1"
    >
      <chakra.img src={background} ref={ref} {...props} width="100%" height="100%" objectFit="cover" />
    </chakra.div>
  );
});
