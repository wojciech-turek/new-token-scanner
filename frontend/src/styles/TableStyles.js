import styled from "styled-components";

export const TableHeader = styled.th`
  background-color: rgb(230, 230, 230);
  padding: 8px 8px;
  div {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  }
`;

export const StyledTable = styled.div`
  width: 100%;
  margin: 24px 0;
  box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
  max-width: 100vw;
  overflow-x: scroll;
  @media (min-width: 1280px) {
    overflow-x: hidden;
  }
`;
export const StyledTableWrapp = styled.table`
  border-radius: 5px;
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  background-color: white;
  th {
    text-align: center;
    padding: 8px;
  }
  tr:nth-child(even) {
    background: #f8f8f8;
  }
`;

export const TableData = styled.td`
  border-right: 1px solid #f8f8f8;
  font-size: 12px;
  padding: 8px;
  vertical-align: middle;
  /* display: flex;
  flex-direction: column; */
  &.blank {
    color: gray;
  }
  &.increased {
    background-color: rgba(78, 245, 66, 0.1);
    color: darkgreen;
  }
  &.decreased {
    background-color: rgba(245, 66, 81, 0.1);
    color: darkred;
  }
  &.excellent,
  .perfect,
  .very-high {
    color: green;
  }
  span {
    &.blank {
      color: gray;
    }
  }
`;

export const FlexCenterHorizontal = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  &.left {
    justify-content: flex-start;
  }
`;

export const FlexCenterVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PercentageChange = styled.div`
  display: inline-block;
  font-weight: normal;
  padding-left: 4px;
  color: var(--black);
  &.positive {
    color: #029c11;
  }
  &.negative {
    color: #c90000;
  }
`;

export const HoldersCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg.incr {
    padding: 0 4px;
    fill: #029c11;
  }
  svg.decr {
    padding: 0 4px;
    fill: #c90000;
    transform: rotate(180deg);
  }
  svg.stale {
    display: none;
  }
`;

export const InfoHover = styled.span`
  border: 1px solid var(--black);
  display: inline-block;
  background-color: white;
  border-radius: 50%;
  width: 16px;
  height: 14px;
`;
