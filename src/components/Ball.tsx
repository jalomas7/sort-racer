import React, { FunctionComponent } from "react";
import { getRandomHexColor } from "../utils";
import styled from "@emotion/styled";
import { useBallContext } from "../providers";

export type BallProps = {
  id: string;
  color?: string;
  x?: number;
  y?: number;
};

const BallContainer = styled.div<{
  color: string;
  active: boolean;
  x?: number;
  y?: number;
}>`
  border-radius: 100%;
  background: radial-gradient(
    circle at 50px 20px,
    ${({ color }) => color},
    #000
  );
  width: 100px;
  height: 100px;
  position: ${({ active }) => (active ? "absolute" : "unset")};
  left: ${({x}) => x}px;
  top: ${({y}) => y}px;
`;

const Ball: FunctionComponent<BallProps> = ({
  id,
  color = getRandomHexColor(),
  x,
  y,
}) => {
  const { activeBall } = useBallContext();
  const isActive: boolean = (activeBall && activeBall.id === id) || false;

  return <BallContainer color={color} active={isActive} x={x} y={y} />;
};

export default Ball;
