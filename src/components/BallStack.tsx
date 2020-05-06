import React, { FunctionComponent } from "react";
import BallComponent from "./Ball";
import styled from "@emotion/styled";
import { Ball } from "../types";
import { useBallContext } from "../providers";

const BallStackContainer = styled.div`
  display: flex;
  flex-direction: column;
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
      {balls.map(({color, id}) => (
        <BallComponent color={color} key={id} id={id}/>
      ))}
    </BallStackContainer>
  );
};

export default BallStack;
