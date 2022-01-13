import { styled } from "@linaria/react"

const Circle = styled.circle<{ progress: number; color: string; size: number }>`
  stroke: ${(props) => props.color};
  stroke-width: 1.5;
  fill: transparent;
  r: ${props => props.size * 0.4}px;
  cx: ${props => props.size * 0.5}px;
  cy: ${props => props.size * 0.5}px;
  stroke-dasharray: ${props => 0.4 * props.size * 2 * Math.PI};
  stroke-dashoffset: ${(props) => {
    const radius = 0.4 * props.size;
    const circumference = radius * 2 * Math.PI;
    return circumference - (props.progress / 100) * circumference;
  }};
`;

const shrink = 0.15;

const Pie = styled.circle<{ progress: number; color: string; size: number }>`
  stroke: ${(props) => props.color};
  stroke-width: ${props => props.size * shrink * 2};
  fill: transparent;
  r: ${props => props.size * shrink}px;
  cx: ${props => props.size * 0.5}px;
  cy: ${props => props.size * 0.5}px;
  stroke-dasharray: ${props => shrink * props.size * 2 * Math.PI};
  stroke-dashoffset: ${(props) => {
    const radius = shrink * props.size;
    const circumference = radius * 2 * Math.PI;
    return circumference - (props.progress / 100) * circumference;
  }};
`;

export const ProgressPie = ({ progress, size = 16 }: { progress: number; size?: number }) => {
  return (
    <svg width={`${size}px`} height={`${size}px`} style={{ transform: 'rotate(-90deg)' }}>
      <Pie progress={progress} color="var(--color-project)" size={size} />
      <Circle progress={100} color="var(--color-project)" size={size} />
    </svg>
  );
};
