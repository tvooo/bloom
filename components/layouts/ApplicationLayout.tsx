import { styled } from "@linaria/react";
import Navigation from "components/navigation/Navigation";
import Toolbar from "components/toolbar/Toolbar"
import Head from "next/head"
import { ReactNode, useState } from "react";
import GlobalStyle from "./GlobalStyle"
import { APPLICATION_NAME } from "utils/meta";
import { NavArrowDown, SidebarCollapse, SidebarExpand, User } from "iconoir-react";
import Button from "components/Button";
import {useHotkeys} from 'react-hotkeys-hook';

import {
  useMenuState,
  MenuButton,
} from "reakit/Menu";
import { LogoType } from "components/toolbar/Logo";
import ListViewHeader, { ListViewMeta, ListViewTitle } from "components/listview/ListViewHeader";
import UserMenu from "components/menus/UserMenu";


const Container = styled.div<{ showSidebar: boolean }>`
  display: flex;
  flex: 1;
  align-items: stretch;
  height: 100%;
`;

const Column = styled.div`
  flex: 1 0 280px;
  display: flex;
  flex-direction: column;
`;

interface ApplicationLayoutProps {
  title?: string;
  children?: ReactNode;
}

const MenuWrapper = styled.div`
  list-style: none;
  background: white;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.05);
  border-radius: var(--space-xs);
  padding: var(--space-xs);
  width: 200px;
  z-index: 999;

//   font-size: var(--font-size-sm);
//   line-height: var(--line-height-sm);
`;

const Header = styled.div`
  border-bottom: 1px solid var(--color-neutral-light);
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md);

  background: white;
  height: 64px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  border-right:1px solid var(--color-neutral-light);
`;

const ApplicationLayout = ({ title, children }: ApplicationLayoutProps) => {
  const [showSidebar, toggleSidebar] = useState(true);
  useHotkeys('[', () => toggleSidebar(t => !t));
  useHotkeys('Q', () => alert('Quick Add'));
  useHotkeys('cmd+,', () => alert('Settings'));
  const menu = useMenuState();
  return (
    <GlobalStyle>
      <Head>
        <title>{title ? `${title} — ${APPLICATION_NAME}` : APPLICATION_NAME}</title>
      </Head>
      <Container showSidebar={showSidebar} style={{ marginLeft: showSidebar ? '0' : '-280px', transition: 'all 0.3s ease'}}>
          <Column>
            <Header><LogoType /></Header>
            <Navigation />
            </Column>
        <Column className="content" style={{ flex: '1 1 100%', minWidth: 0, background: 'white' }}>
          <Header>
            {/* <Toolbar /> */}
            <Button onClick={() => toggleSidebar(t => !t)}>{showSidebar ? <SidebarCollapse /> : <SidebarExpand />}</Button>
            <h2>{title}</h2>
            {/* <Button><Plus /> Quick add</Button>
                        <Button><Search /> Search</Button> */}

            {/* <ListViewHeader>
        <ListViewTitle>
          {list && list.type === "PROJECT" ? (
            <div onClick={() => {
              updateList({ ...list, status: list.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED' });
            }}>{icon}</div>
          ) : icon}
          {isEditing && isRenamable ? (
            <ListViewHeaderInput
              autoFocus
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={label}
              onBlur={handleBlur}
            />
          ) : (
            <div onClick={() => isRenamable && setEditing(true)}>{title}</div>
          )}
        </ListViewTitle>
        {list && list.type === "PROJECT" && (
          // <Menu trigger={<Settings />}>
          //   <ProjectContextMenu project={list} />
          // </Menu>
          <div>cog</div>
        )}
      </ListViewHeader> */}

            <MenuButton {...menu} as={Button}><User /> timbo <NavArrowDown /></MenuButton>
            <UserMenu menu={menu} />
          </Header>
          {children}
        </Column>
      </Container>
    </GlobalStyle>
  )
}

export default ApplicationLayout;