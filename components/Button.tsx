import { styled } from '@linaria/react'

const Button = styled.button`
    appearance: none;
    border: 0;
    background: var(--color-neutral-lighter);
    border-radius: 0.4rem;
    cursor: pointer;
    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
        outline: 4px solid cornflowerblue;
    }

    &:hover {
        background: var(--color-neutral-light);

    }
`

export default Button;