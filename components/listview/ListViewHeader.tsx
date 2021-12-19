import { styled } from "@linaria/react";

const ListViewHeader = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-large);
  & > svg {
    margin-right: 0.2em;
  }
`;

export const ListViewHeaderInput = styled.input`
  font-weight: bold;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);

  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;

`

export default ListViewHeader;
