import React from 'react';
import { styled } from '@linaria/react';

const Wrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`

const Logo = () => (
    <Wrapper>
        <img src="/teaque.svg" />
    </Wrapper>
)

export default Logo;