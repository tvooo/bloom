import { styled } from "@linaria/react";
import Navigation from "components/navigation/Navigation";
import Toolbar from "components/toolbar/Toolbar"
import Head from "next/head"
import { ReactNode, useState } from "react";
import GlobalStyle from "./GlobalStyle"
import { APPLICATION_NAME } from "utils/meta";
import { Laptop, LogOut, NavArrowDown, Plus, Search, Settings, SidebarCollapse, SidebarExpand, Type, User } from "iconoir-react";
import Button from "components/Button";


import {
    useMenuState,
    Menu,
    MenuItem,
    MenuButton,
    MenuSeparator,
  } from "reakit/Menu";
import { useRouter } from "next/router";
import Logo from "components/toolbar/Logo";
import ListViewHeader, { ListViewTitle } from "components/listview/ListViewHeader";


const Container = styled.div<{ showSidebar: boolean }>`
  display: flex;
  overflow-x: auto;
  flex: 1;
  align-items: stretch;
//   padding: 0 var(--space-sm);
& .sidebar {
            display: ${props => props.showSidebar ? 'flex' : 'none'};
        }

//   @media only screen and (max-width: 480px) {
//     & .sidebar {
//         display: ${props => props.showSidebar ? 'block' : 'none'};
//     }
//     & .content {
//         display: ${props => props.showSidebar ? 'none' : 'block'};
//     }
  }
`;

const Column = styled.div`
  flex: 1 0 280px;
  // padding: var(--space-md);
  // overflow-y: auto;
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

const MenuItemButton = styled.button`
background: none;
border: none;
cursor: pointer;
width: 100%;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  border-radius: 0.2rem;
  padding: var(--space-sm);
  gap: var(--space-xs);

  &:hover {
    background: var(--color-neutral-lighter);
  }
`;
const Separator = styled.hr`
  background: var(--color-neutral-light);
  height: 1px;
  border: none;
  margin: var(--space-sm) var(--space-sm);
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
  border-right:1px solid var(--color-neutral-light);
`;


const ApplicationLayout = ({ title, children }: ApplicationLayoutProps) => {
    const [showSidebar, toggleSidebar] = useState(true);
    const menu = useMenuState();
    const { push } = useRouter();
    return (
        <GlobalStyle>
            <Head>
            <title>{title ? `${title} — ${APPLICATION_NAME}` : APPLICATION_NAME}</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossOrigin" />
            {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />  */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Karla:wght@400;600&display=swap" rel="stylesheet" />
            </Head>
            <Container showSidebar={showSidebar}>
                <Column className="sidebar">
                 {/* <Toolbar showSidebar={showSidebar} onToggleSidebar={() => toggleSidebar(t => !t)} /> */}
                 {/* <div style={{ margin: '0 auto var(--space-md) 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-sm)'}}><Logo /> Teaque</div> */}
                 <Header><Logo /> Teaque</Header>
                 {/* <Separator /> */}
                    <Navigation />
                </Column>
                <Column className="content" style={{ flex: '1 1 100%', minWidth: 0, background: 'white' }}>
                  <Header>
                    {/* <div style={{ marginBottom: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)'}}> */}
                        <Button onClick={() => toggleSidebar(t => !t)}>{showSidebar ? <SidebarCollapse /> : <SidebarExpand />}</Button>
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

                        <MenuButton {...menu} as={Button} style={{ marginLeft: 'auto'}}><User /> timbo <NavArrowDown /></MenuButton>

      <Menu {...menu} aria-label="Preferences" as={MenuWrapper} >
        <MenuItem {...menu} as={MenuItemButton} onClick={() => push("/settings")}><Settings /> Settings</MenuItem>
        <MenuItem {...menu} as={MenuItemButton}><Laptop /> Keyboard shortcuts</MenuItem>
        <MenuSeparator {...menu} as={Separator} />
        <MenuItem {...menu} as={MenuItemButton}><LogOut /> Log out</MenuItem>
      </Menu>
                    {/* </div> */}
                    </Header>
                    {/* <Separator /> */}
                    {children}
                </Column>
            </Container>
        </GlobalStyle>
    )
}

export default ApplicationLayout;