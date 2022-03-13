import React from 'react';
import { styled } from '@linaria/react';

import { APPLICATION_NAME } from "utils/meta";

const Wrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  padding: 0 0px 0 4px;
  box-sizing: content-box;
`

const Logo = () => (
    <Wrapper>
        <img src="/teaque.svg" />
    </Wrapper>
)

const LogoTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`
export const LogoType = () => (
  <LogoTypeWrapper>
    <Logo />
    {APPLICATION_NAME}
  </LogoTypeWrapper>
)

export default Logo;