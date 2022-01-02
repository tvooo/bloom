import { styled } from "@linaria/react";
import Navigation from "components/navigation/Navigation";
import Toolbar from "components/toolbar/Toolbar"
import Head from "next/head"
import { ReactNode } from "react";
import GlobalStyle from "./GlobalStyle"

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  flex: 1;
  align-items: stretch;
  padding: 0 var(--space-sm);
`;

const Column = styled.div`
  flex: 0 0 auto;
  padding: var(--space-sm);
  overflow-y: auto;
`;

interface ApplicationLayoutProps {
    title?: string;
    children?: ReactNode;
    route: (s: string) => void;
    currentRoute: string;
}

const ApplicationLayout = ({ title, children, route, currentRoute }: ApplicationLayoutProps) => {
    return (
        <GlobalStyle>
            <Head>
            <title>{title ? `${title} — bloom` : 'bloom'}</title>
            </Head>
            <Toolbar />
            <Container>
                <Column>
                    <Navigation
                        route={(r) => route(r)}
                        currentRoute={currentRoute}
                    />
                </Column>
                <Column style={{ flex: '1 1 auto', minWidth: 0 }}>{children}
                </Column>
            </Container>
        </GlobalStyle>
    )
}

export default ApplicationLayout;