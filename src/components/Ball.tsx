import React, { useState, useEffect } from "react";
import { getRandomHexColor } from "../utils";
import styled from "@emotion/styled";

const BallContainer = styled.div<{ color: string }>`
  border-radius: 100%;
  background-color: ${({ color }) => color};
  width: 100px;
  height: 100px;
`;

const Ball = () => {
  const [color, setColor] = useState(getRandomHexColor());

  useEffect(() => {
    setTimeout(() => {
      setColor(getRandomHexColor());
    }, 3000);
  }, [color]);

  return <BallContainer color={color} />;
};

export default Ball;
