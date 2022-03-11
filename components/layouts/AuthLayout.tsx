import { styled } from "@linaria/react";
import Logo from "components/toolbar/Logo";
import Toolbar from "components/toolbar/Toolbar"
import Head from "next/head"
import { ReactNode } from "react";
import { APPLICATION_NAME } from "utils/meta";
import GlobalStyle from "./GlobalStyle"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Window = styled.div`
  padding: var(--space-sm);
  background: white;
`;

interface AuthLayoutProps {
    title?: string;
    children?: ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
    return (
        <GlobalStyle>
            <Head>
                <title>{title ? `${title} — ${APPLICATION_NAME}` : APPLICATION_NAME}</title>
            </Head>
            <Container>
                <Logo />
                <Window>
                    {children}
                </Window>
            </Container>
        </GlobalStyle>
    )
}

export default AuthLayout;