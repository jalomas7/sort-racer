import React, { FunctionComponent } from "react";
import { getRandomHexColor } from "../utils";
import styled from "@emotion/styled";

export type BallProps = {
  color?: string;
};

const BallContainer = styled.div<{ color: string }>`
  border-radius: 100%;
  background: radial-gradient(
    circle at 50px 20px,
    ${({ color }) => color},
    #000
  );
  width: 100px;
  height: 100px;
`;

const Ball: FunctionComponent<BallProps> = ({
  color = getRandomHexColor(),
}) => {
  return <BallContainer color={color} />;
};

export default Ball;
