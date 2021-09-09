import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  color: white;
  font-weight: 600;
  background-color: var(--secondary);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--secondary-darker);
  }
`;

export default function Link({ href, text }) {
  return (
    <StyledLink target="_blank" href={href}>
      Buy
    </StyledLink>
  );
}
