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
  x: number;
  y: number;
}>`
  left: ${({x}) => x-25}px;
  top: ${({y}) => y-25}px;
  border-radius: 100%;
  background: radial-gradient(
    circle at 25px 10px,
    ${({ color }) => color},
    #000
  );
  min-width: 50px;
  min-height: 50px;
  position: ${({ active }) => (active ? "absolute" : "unset")};
  pointer-events: ${({ active }) => (active ? "none" : "unset")};
`;

const Ball: FunctionComponent<BallProps> = ({
  id,
  color = getRandomHexColor(),
  x = 0,
  y = 0,
}) => {
  const { activeBall } = useBallContext();
  const isActive: boolean = (activeBall && activeBall.id === id) || false;

  return <BallContainer color={color} active={isActive} x={x} y={y}/>;
};

export default Ball;
