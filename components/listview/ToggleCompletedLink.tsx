import { styled } from "@linaria/react";

const ToggleCompletedLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  color: var(--color-focus);
  font-size: 0.8rem;
  margin-top: var(--space-md);
  &:hover {
    text-decoration: underline;
  }
`;

export default ToggleCompletedLink;
