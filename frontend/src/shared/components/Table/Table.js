import React, { useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import Decimal from "decimal.js";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import {
  TableHeader,
  StyledTable,
  StyledTableWrapp,
  TableData,
  FlexCenterHorizontal,
  FlexCenterVertical,
  PercentageChange,
  HoldersCell,
} from "../../../styles/TableStyles";
import Copy from "../../utils/Copy";
import Favorites from "../../utils/Favorites";
import Link from "../../utils/Link";
import Chart from "../../utils/Chart";
import StarIcon from "../../../assets/icons/star.svg";
import ThummbsVoting from "../ThumbsVoting";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

let alreadyVotedContracts = JSON.parse(localStorage.getItem("voted"))
  ? JSON.parse(localStorage.getItem("voted"))
  : [];

export default function Table({ tokenData = [] }) {
  useEffect(() => {
    const alreadyVotedContractsLocalStorage = JSON.parse(
      localStorage.getItem("voted")
    )
      ? JSON.parse(localStorage.getItem("voted"))
      : [];
    alreadyVotedContracts = [
      ...alreadyVotedContracts,
      ...alreadyVotedContractsLocalStorage,
    ];
  }, []);

  const data = React.useMemo(() => tokenData, [tokenData]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Contract",
        accessor: "contr", // accessor is the "key" in the data
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Token Name",
        accessor: "tokenname",
      },
      {
        Header: "Symbol",
        accessor: "tokensymbol",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      // {
      //   Header: "Holders",
      //   accessor: "holders",
      // },
      {
        Header: "Safety",
        accessor: "safety",
      },
      {
        Header: "",
        accessor: "buy",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const renderTableComponent = (cell) => {
    if (cell.column.id === "buy") {
      return (
        <FlexCenterHorizontal>
          <Link
            text="PancakeSwap"
            href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${cell.value}`}
          />

          <Chart href={`https://charts.bogged.finance/?token=${cell.value}`} />
          <Favorites />
        </FlexCenterHorizontal>
      );
    }
    if (cell.column.id === "price") {
      const currentPrice = new Decimal(cell.row.original.price);
      const initialPrice = new Decimal(cell.row.original.initialPrice);
      const percentChange = currentPrice
        .minus(initialPrice)
        .div(initialPrice)
        .toFixed(2);
      let percentageClasses;
      if (percentChange > 0) {
        percentageClasses = "positive";
      } else if (percentChange < 0) {
        percentageClasses = "negative";
      }
      if (cell.value === "0") {
        return <span className="blank">No Data</span>;
      } else {
        return (
          <div className={cell.row.original.pricechange}>
            <span>${cell.value}</span>
            {cell.row.original.pricechange ? (
              <svg
                height="14px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 512 512"
                width="14px"
                className="icon"
              >
                <path d="M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z" />
              </svg>
            ) : null}
            <img className="star" src={StarIcon} alt="all time high" />
            <PercentageChange className={percentageClasses}>
              {" ( " + (percentChange * 100).toFixed(2) + "% )"}
            </PercentageChange>
          </div>
        );
      }
    }
    if (cell.column.id === "holders") {
      return (
        <HoldersCell>
          <span>{cell.value ? cell.value : "1"}</span>
          {cell.row.original.holdersChange ? (
            <svg
              height="14px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="14px"
              className={cell.row.original.holdersChange}
            >
              <path d="M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z" />
            </svg>
          ) : null}
        </HoldersCell>
      );
    }
    if (cell.column.id === "safety") {
      return (
        <ThummbsVoting
          data={{ votes: cell.value, contract: cell.row.values.contr }}
          alreadyVotedContracts={alreadyVotedContracts}
        />
      );
    }
    if (cell.column.id === "date") {
      let current_datetime = new Date(cell.value);
      let year = current_datetime.getFullYear();
      let month = current_datetime.getMonth() + 1;
      let day = current_datetime.getDate();
      let hour = current_datetime.getHours();
      let minute = current_datetime.getMinutes();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    }
    if (cell.column.id === "contr") {
      return `${cell.value.slice(0, 6)}...${cell.value.slice(
        cell.value.length - 5
      )}`;
    }
  };

  return (
    <StyledTable>
      <StyledTableWrapp {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <TableHeader {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header").toUpperCase() === "PRICE" ||
                        column.render("Header").toUpperCase() === "SAFETY" ? (
                          <div>
                            {column.render("Header").toUpperCase()}{" "}
                            <LightTooltip
                              title={
                                column.render("Header").toUpperCase() ===
                                "SAFETY"
                                  ? "If you think the coin is safe/unsafe please vote to let others know"
                                  : "Price with % change from ICO"
                              }
                              placement="top"
                            >
                              <svg
                                height="16px"
                                id="Layer_1"
                                version="1.1"
                                viewBox="0 0 512 512"
                                width="14px"
                              >
                                <g>
                                  <path
                                    d="M257.338,166.245c16.297,0,29.52-13.223,29.52-29.52c0-16.317-13.223-29.501-29.52-29.501   c-16.298,0-29.52,13.185-29.52,29.501C227.818,153.022,241.04,166.245,257.338,166.245z"
                                    fill="#37404D"
                                  />
                                  <polygon
                                    fill="#37404D"
                                    points="277.383,205.605 277.383,195.265 277.383,185.925 218.343,185.925 218.343,205.605    238.023,205.605 238.023,372.885 218.343,372.885 218.343,392.565 297.063,392.565 297.063,372.885 277.383,372.885  "
                                  />
                                  <path
                                    d="M256.108,9.65c-135.857,0-246,110.143-246,246c0,135.877,110.143,246,246,246   c135.857,0,246-110.123,246-246C502.108,119.793,391.966,9.65,256.108,9.65z M256.108,481.97   c-124.797,0-226.32-101.533-226.32-226.32S131.312,29.33,256.108,29.33c124.797,0,226.32,101.533,226.32,226.32   S380.905,481.97,256.108,481.97z"
                                    fill="#37404D"
                                  />
                                </g>
                              </svg>
                            </LightTooltip>
                          </div>
                        ) : (
                          column.render("Header").toUpperCase()
                        )
                      }
                    </TableHeader>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      const classes = [];
                      if (cell.column.id === "price") {
                        if (cell.row.original.priceChange === "incr") {
                          classes.push("increased");
                        }
                        if (cell.row.original.priceChange === "decr") {
                          classes.push("decreased");
                        }
                      }
                      if (cell.column.id === "safety") {
                        if (cell.value >= 80) {
                          classes.push("excellent");
                        }
                      }
                      return (
                        <TableData {...cell.getCellProps()}>
                          <FlexCenterHorizontal
                            className={cell.column.id === "price" ? "" : ""}
                          >
                            {
                              // Render the cell contents
                              <FlexCenterVertical>
                                {cell.column.id === "buy" ||
                                cell.column.id === "favorites" ||
                                cell.column.id === "price" ||
                                cell.column.id === "date" ||
                                cell.column.id === "contr" ||
                                cell.column.id === "holders" ||
                                cell.column.id === "safety"
                                  ? renderTableComponent(cell)
                                  : cell.render("Cell")}
                              </FlexCenterVertical>
                            }
                            {cell.column.id === "contr" ? (
                              <Copy contract={cell.value} />
                            ) : null}
                          </FlexCenterHorizontal>
                        </TableData>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </StyledTableWrapp>
    </StyledTable>
  );
}
