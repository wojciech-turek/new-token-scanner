import React from "react";
import styled from "styled-components";

const StyledLikeIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    svg {
      fill: #d4281c;
      .heart {
        stroke-width: 0px;
      }
    }
  }
  svg {
    width: 16px;
    height: 16px;
    padding-right: 4px;
    color: var(--black);
    fill: none;
    cursor: pointer;
    /* box-shadow: 2px 2px 2px var(--black); */
    .heart {
      stroke: var(--black);
      stroke-width: 2px;
    }
    &:hover {
      fill: #d4281c;
      .heart {
        stroke-width: 0px;
      }
    }
  }
`;

export default function Favorites() {
  return (
    <StyledLikeIcon>
      <svg
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h48v48h-48z" fill="none" />
        <path
          className="heart"
          d="M24 42.7l-2.9-2.63c-10.3-9.35-17.1-15.52-17.1-23.07 0-6.17 4.83-11 11-11 3.48 0 6.82 1.62 9 4.17 2.18-2.55 5.52-4.17 9-4.17 6.17 0 11 4.83 11 11 0 7.55-6.8 13.72-17.1 23.07l-2.9 2.63z"
        />
      </svg>
      Like
    </StyledLikeIcon>
  );
}
