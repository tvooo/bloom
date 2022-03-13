import { styled } from '@linaria/react'

const Button = styled.button`
    appearance: none;
    border: 0;
    background: var(--color-neutral-lighter);
    border-radius: 0.4rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid var(--color-neutral-light);

    &:focus {
        outline: 4px solid cornflowerblue;
    }

    &:hover {
        background: var(--color-neutral-light);
        border-color: var(--color-neutral-medium-light);
    }
`

export default Button;