import * as React from "react";
import { useColorModeValue } from "@chakra-ui/react";

interface FlareAnimationProps {
  raveMode: boolean;
}


const FlareAnimation: React.FC<FlareAnimationProps> = ({ raveMode }) => {
  const normalBackground = useColorModeValue("black", "white");
  const background = raveMode
    ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
    : normalBackground;
  const flareStyle = {
    position: "absolute",
    width: "4px",
    height: raveMode ? "40px" : "4px",
    borderRadius: "100%",
    background: raveMode
      ? background
      : normalBackground,
    animation: `flareAnimation var(--flare-duration, ${
      raveMode ? "15" : "30"
    }s) linear infinite`,
  };

  const flareAnimation = `
    0%, 100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
    50% {
      opacity: 1;
      transform: translate3d(
        calc((100vw - 4px) * var(--flare-x)),
        calc((100vh - 4px) * var(--flare-y)),
        0
      );
    }
  `;

  return (
    <>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          style={{
            ...flareStyle,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            "--flare-x": Math.random(),
            "--flare-y": Math.random(),
            "--flare-duration": `${Math.floor(Math.random() * 8) + 10}s`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`@keyframes flareAnimation {${flareAnimation}}`}</style>
    </>
  );
};

export const Flares = () => {
  const [raveMode, setRaveMode] = React.useState(false);

  const toggleRaveMode = () => {
    setRaveMode(!raveMode);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(./background.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.7)",
        }}
      />
      <FlareAnimation raveMode={raveMode} />
      <button
        onClick={toggleRaveMode}
        style={{
          border: "5px",
          color: "pink",
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "50px",
          height: "50px",
          opacity: 0.5,
          cursor: "pointer",
        }}
      ></button>
    </div>
  );
};
