import React from 'react';
import { styled } from '@linaria/react';
import { ThemeItem } from './ThemeItem';
import Button from './Button';
import { NavArrowDown } from 'iconoir-react';

export const CurrentThemesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  width: 100%;
  justify-content: space-between;
  // & > * {
    
  //   flex: 1 0 auto;
  // }
`;

const CurrentThemes = () => {
  const themePeriods = [
    // { label: '2022', themes: [{ color: '#628ead', name: 'Dutch' }, { color: '#77c570', name: 'Year of Health' }] },
    // { label: 'Q2', themes: [{ color: '#77c570', name: 'Running' }] },
    { label: 'March', themes: [{ color: '#c67177', name: 'Taxes'}] },
    // { label: 'W20', themes: [] }
  ];
  return (
    <CurrentThemesWrapper>
      {themePeriods.map(p => (
        <div style={{ borderRight: '0px solid var(--color-neutral-medium-light'}}>
          <small style={{ display: 'block', color: 'var(--color-neutral-medium)', fontWeight: '600' }}>{p.label}</small>
          <div>{p.themes.map(theme => (
            <ThemeItem key={theme.name} name={theme.name} color={theme.color} />
          ))}</div>
        </div>
      ))}
      <Button><NavArrowDown /> Horizon</Button>
    </CurrentThemesWrapper>
  )
}

// interface ThemeProps {
//   color: string; name: string;
// }
// export const ThemeItem: React.FC<ThemeProps> = ({ color, name }) => (
//   <div style={{display: 'flex', alignItems: 'center'}}>
//     <ThemeDot color={color} /> {name}
//   </div>
// )

export default CurrentThemes;