import React from "react";
import styled from "styled-components";

const StyledSectionWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 80px;
`;

export default function SectionWrapper(props) {
  const { children } = props;
  return <StyledSectionWrapper>{children}</StyledSectionWrapper>;
}
