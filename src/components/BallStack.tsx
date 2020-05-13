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
`;

const BallStackVase = styled.div`
  min-width: 120px;
  height: 200px;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  bottom: 0;
`;

export type BallStackProps = {
  id: string;
  balls: Ball[];
};

const BallStack: FunctionComponent<BallStackProps> = ({ balls, id }) => {
  const { onDrag, onDrop } = useBallContext();

  return (
    <BallStackContainer
      onMouseDown={() => onDrag(id)}
      onMouseUp={() => onDrop(id)}
    >
      <BallStackVase />
      {balls.map(({color, id}) => (
        <BallComponent color={color} key={id} id={id}/>
      ))}
    </BallStackContainer>
  );
};

export default BallStack;
