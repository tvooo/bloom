import { styled } from "@linaria/react"

const Circle = styled.circle<{ progress: number; color: string }>`
  stroke: ${(props) => props.color};
  stroke-width: 1.5;
  fill: transparent;
  r: 0.4em;
  cx: 0.5em;
  cy: 0.5em;
  stroke-dasharray: ${0.4 * 16 * 2 * Math.PI};
  stroke-dashoffset: ${(props) => {
    const radius = 0.4 * 16;
    const circumference = radius * 2 * Math.PI;
    return circumference - (props.progress / 100) * circumference;
  }};
`;

const Pie = styled.circle<{ progress: number; color: string }>`
  stroke: ${(props) => props.color};
  stroke-width: 0.4em;
  fill: transparent;
  r: 0.2em;
  cx: 0.5em;
  cy: 0.5em;
  stroke-dasharray: ${0.2 * 16 * 2 * Math.PI};
  stroke-dashoffset: ${(props) => {
    const radius = 0.2 * 16;
    const circumference = radius * 2 * Math.PI;
    return circumference - (props.progress / 100) * circumference;
  }};
`;

export const ProgressPie = ({ progress }: { progress: number }) => {
  return (
    <svg width="1rem" height="1rem" style={{ transform: 'rotate(-90deg)' }}>
      <Pie progress={100} color="var(--color-neutral-light)" />
      {/* <Pie progress={progress} color="grey" /> */}
      <Pie progress={progress} color="var(--color-project)" />
        <Circle progress={100} color="var(--color-project)" />
    </svg>
  );
};
