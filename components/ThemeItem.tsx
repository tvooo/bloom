import React from 'react';
import { styled } from '@linaria/react';

export const ThemeDot = styled.div<{ color: string }>`
  border-radius: 1em;
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
  background: ${props => props.color};
  margin-right: 0.4em;
`;

interface ThemeProps {
  color: string; name: string;
}
export const ThemeItem: React.FC<ThemeProps> = ({ color, name }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <ThemeDot color={color} /> {name}
  </div>
)