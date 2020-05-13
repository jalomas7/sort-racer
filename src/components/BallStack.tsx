import React, { FunctionComponent } from "react";
import BallComponent from "./Ball";
import styled from "@emotion/styled";
import { Ball } from "../types";
import { useBallContext } from "../providers";

const BallStackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 20px;
  align-self: flex-end;
  min-width: 120px;
`;

const BallStackVase = styled.div`
  min-width: 120px;
  height: 500px;
  border-radius: 10px;
  background-color: rgba(0,0,0,0.2);
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    to left,
    rgba(0,0,0,0.5),
    rgba(0,0,0,0.4),
    rgba(0,0,0,0.5)
  );
`;

export type BallStackProps = {
  id: string;
  balls: Ball[];
};

const BallStack: FunctionComponent<BallStackProps> = ({ balls, id }) => {
  const { onDrag, onDrop, activeBall } = useBallContext();

  return (
    <BallStackContainer
      onMouseDown={() => !activeBall && onDrag(id)}
      onMouseUp={() => activeBall && onDrop(id)}
      onClick={() => {
        activeBall && onDrop(id);
      }}
    >
      <BallStackVase />
      {balls.map(({ color, id }) => (
        <BallComponent color={color} key={id} id={id} />
      ))}
    </BallStackContainer>
  );
};

export default BallStack;
