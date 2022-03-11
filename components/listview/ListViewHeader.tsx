import { styled } from "@linaria/react";

const ListViewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--space-md);
  margin-bottom: var(--space-large);
  justify-content: space-between;
`;

export const ListViewTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.2em;

  font-size: 2rem;
  font-weight: 600;
`;

export const ListViewMeta = styled.div`
  background: var(--color-neutral-light);
  padding: var(--space-sm) var(--space-sm);
  margin-bottom: var(--space-large);
  display: inline-flex;
  gap: 0.2em;
  border-radius: 0.2rem;
`

export const ListViewHeaderInput = styled.input`
  font-weight: 600;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);

  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;

`

export default ListViewHeader;
