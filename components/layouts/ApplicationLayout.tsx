import { styled } from "@linaria/react";
import Navigation from "components/navigation/Navigation";
import Toolbar from "components/toolbar/Toolbar"
import Head from "next/head"
import { ReactNode, useState } from "react";
import GlobalStyle from "./GlobalStyle"

const Container = styled.div<{ showSidebar: boolean }>`
  display: flex;
  overflow-x: auto;
  flex: 1;
  align-items: stretch;
  padding: 0 var(--space-sm);

  @media only screen and (max-width: 480px) {
    & .sidebar {
        display: ${props => props.showSidebar ? 'block' : 'none'};
    }
    & .content {
        display: ${props => props.showSidebar ? 'none' : 'block'};
    }
  }
`;

const Column = styled.div`
  flex: 1 0 280px;
  padding: var(--space-sm);
  overflow-y: auto;
`;

interface ApplicationLayoutProps {
    title?: string;
    children?: ReactNode;
}

const ApplicationLayout = ({ title, children }: ApplicationLayoutProps) => {
    const [showSidebar, toggleSidebar] = useState(true);
    return (
        <GlobalStyle>
            <Head>
            <title>{title ? `${title} — bloom` : 'bloom'}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossOrigin" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" /> 
            </Head>
            <Toolbar showSidebar={showSidebar} onToggleSidebar={() => toggleSidebar(t => !t)} />
            <Container showSidebar={showSidebar}>
                <Column className="sidebar">
                    <Navigation />
                </Column>
                <Column className="content" style={{ flex: '1 1 100%', minWidth: 0 }}>{children}
                </Column>
            </Container>
        </GlobalStyle>
    )
}

export default ApplicationLayout;