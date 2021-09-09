import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--black);
  svg {
    width: 8px;
    fill: white;
    padding: 2px;
  }
  &:hover {
  }
`;

export default function Chart({ href }) {
  return (
    <StyledLink target="_blank" href={href}>
      Chart
      <svg id="Layer_1_1_" version="1.1" viewBox="0 0 16 16">
        <rect height="6" width="4" y="10" />
        <rect height="10" width="4" x="6" y="6" />
        <rect height="16" width="4" x="12" />
      </svg>
    </StyledLink>
  );
}
