import MenuItemWrapper from "./MenuItemWrapper";

const MenuHeading: React.FC = ({children}) => (
  <MenuItemWrapper>
    <small style={{textTransform: 'uppercase', fontWeight: 'bold', paddingLeft: 'var(--space-xs)'}}>{children}</small>
  </MenuItemWrapper>
);

export default MenuHeading;
