import React from "react";
import BackgroundCircle from "./BackgroundCircle";
import Eyes from "./Eyes";
import Mouth from "./Mouth";
import FaceContainer from "./FaceContainer";

function Face() {
  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10;
  const eyeOffsetX = 90;
  const eyeOffsetY = 100;
  const eyeRadius = 50;
  const mouthWidth = 20;
  const mouthRadius = 150;

  return (
    <div>
      <FaceContainer
        width={width}
        height={height}
        centerX={centerX}
        centerY={centerY}
      >
        <BackgroundCircle
          radius={centerY - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <Eyes
          eyeOffsetX={eyeOffsetX}
          eyeOffsetY={eyeOffsetY}
          eyeRadius={eyeRadius}
        />
        <Mouth mouthWidth={mouthWidth} mouthRadius={mouthRadius} />
      </FaceContainer>
    </div>
  );
}

export default Face;
