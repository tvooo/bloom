import React from 'react';
import { styled } from '@linaria/react';

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

export default Logo;