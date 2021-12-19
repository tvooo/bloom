import React from "react";
import { styled } from "@linaria/react";
import type { TaskStatus } from "model/task";
import { CheckCircledOutline, Circle, LabelOutline } from "iconoir-react";

const StatusIndicatorWrapper = styled.button`
  flex: 0 0 auto;
  border: none;
  margin: 0;
  padding: 0;
  color: grey;
  cursor: pointer;
  background: transparent;
  transition: 0.1s color ease, transform 0.05s ease;

  &:hover {
    color: black;
  }
  &:active {
    transform: scale(0.9);
  }
`;

interface StatusIndicatorProps {
  status: TaskStatus;
  progress?: number;
  onClick?: () => void;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  progress,
  onClick,
}) => {
  const handleClick = () => onClick && onClick();

  if (progress !== undefined) {
    return (
      <LabelOutline
        color="var(--color-project)"
        height="1.6rem"
        onClick={handleClick}
      />
    );
  }

  return status === "done" ? (
    <StatusIndicatorWrapper>
      <CheckCircledOutline
        height="1.6em"
        onClick={handleClick}
      />
    </StatusIndicatorWrapper>
  ) : (
    <StatusIndicatorWrapper>
      <Circle
        height="1.6em"
        onClick={handleClick}
      />
    </StatusIndicatorWrapper>
  );
};

export default StatusIndicator;
