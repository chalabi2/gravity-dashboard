import {
  chakra,
  ImageProps,
  forwardRef,
} from "@chakra-ui/react"
import logo from "./logo.svg"
import { useColorModeValue } from "@chakra-ui/react";

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const textColor = useColorModeValue("#000000", "#FFFFFF");
  return <chakra.img fill={textColor} src={logo} ref={ref} {...props} />
})
