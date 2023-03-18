import {
    chakra,
    ImageProps,
    forwardRef,
  } from "@chakra-ui/react"
  import background from "./background.svg"
  
  export const Background = forwardRef<ImageProps, "img">((props, ref) => {
    return <chakra.img src={background} ref={ref} {...props} />
  })
  