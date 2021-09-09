import styled from "styled-components";

export const CopyText = styled.p`
  line-height: 22px;
  font-weight: 400;
  font-size: 18px;
  padding: 12px;
`;
export const SubHeading = styled.div`
  font-size: var(--fz-heading2);
  font-weight: 600;
  color: var(--black);
  margin: 12px;
`;
export const StyledLink = styled.a`
  color: var(--link);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: var(--link-darker);
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  span {
    position: relative;
    top: -8px;
    font-size: 10px;
    font-weight: 400;
    padding-left: 4px;
  }
`;
export const ListWithBulletpoints = styled.ul`
  list-style: square;
  font-size: 18px;
  li {
    padding: 8px;
  }
`;
export const SpecialLink = styled.p`
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
  text-decoration-color: var(--primary);
  text-align: center;
  width: 100%;
  &:hover {
    background-color: var(--primary);
    color: white;
  }
  @media (min-width: 1024px) {
    width: auto;
  }
`;
export const RegularLink = styled.a`
  text-decoration: underline;
  color: var(--primary);
  text-decoration-color: var(--primary);
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;
