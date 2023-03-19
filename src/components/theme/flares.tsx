import * as React from "react";

const FlareAnimation = () => {
  const flareStyle = {
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "100%",
    background: "white",
    animation: "flareAnimation var(--flare-duration, 30s) linear infinite",
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

export const Flares = () => (
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
    <FlareAnimation />
  </div>
);
