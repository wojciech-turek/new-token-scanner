import React, { useState, useEffect } from "react";
import useInterval from "react-useinterval";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../shared/components/Table/Table";
import SectionWrapper from "../../styles/SectionWrapper";
import ShieldIcon from "../../assets/icons/shield.svg";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import Loader from "../../shared/utils/Loader";
import {
  CopyText,
  ListWithBulletpoints,
  RegularLink,
  SpecialLink,
  SubHeading,
} from "../../styles/TextStyles";

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const InfoContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

const Banner1 = styled.div`
  background-color: var(--secondary-darker);
  color: white;
  border-radius: 4px;
  padding: 24px 60px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  @media (min-width: 1024px) {
    min-width: 320px;
  }
`;

const UnderstoodButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: var(--secondary-darker);
  border-radius: 4px;
  color: white;
  margin-top: 12px;
  padding: 12px 24px;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "60%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: "none",
    outline: "none",
    [theme.breakpoints.down("lg")]: {
      width: "85%",
      height: "90%",
      overflowX: "scroll",
      padding: theme.spacing(1, 3, 2),
    },
  },
}));

export default function Pancakeswap() {
  const [tokenData, setData] = useState([]);
  const [dataLoaded, setLoadedData] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const getPricesUpdate = async () => {
    const newPrices = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/tokens/prices"
    )
      .then((res) => res.json())
      .then((data) => {
        return data.tokens;
      });
    return newPrices;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className={classes.paper}>
      <SubHeading id="simple-modal-title">Basic safety guidelines</SubHeading>
      <CopyText>
        The tokens in the list change rapidly and so does the price, while some
        of them can make you money other are directly targeted at stealing from
        you.
      </CopyText>
      <CopyText>I recommend following checks before you buy:</CopyText>
      <ListWithBulletpoints>
        <li>Check for any comments on BSCScan</li>
        <li>
          Lookup the name on{" "}
          <RegularLink href="https://tokensniffer.com/">
            TokenSniffer
          </RegularLink>
        </li>
        <li>Search reddit for any information</li>
        <li>
          Check the 'Charts' link and see if there are
          <strong> both buy and sell orders</strong>
        </li>
        <li>
          Check few transactions there and see if they are not faked from the
          same address (same person buy and sell)
        </li>
        <li>Buy and sell for 1$ to make sure you can sell your tokens</li>
      </ListWithBulletpoints>
      <CopyText>
        Most of these coins come and go so be sure to book your profits!
      </CopyText>
      <CopyText>
        If you have any other tips I should share contact me directly.
      </CopyText>
      <UnderstoodButton onClick={handleClose}>Understood</UnderstoodButton>
    </div>
  );
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/tokens")
      .then((res) => res.json())
      .then((data) => {
        setData(data.tokens);
        setLoadedData(true);
        return data;
      })
      .catch((err) => {
        setLoadedData(false);
        setData([]);
      });
    const socket = socketIOClient(ENDPOINT);
    socket.on("token", (data) => {
      if (data.action === "create") {
        updateData(data.token);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  async function fetchNewPrices() {
    const tokensUpdated = await getPricesUpdate();
    setData(tokensUpdated);
  }

  useInterval(fetchNewPrices, 60000);
  const bannedList = ["CZ", "test", "testing"];
  const updateData = (token) => {
    if (bannedList.includes(token.tokenname)) {
      return;
    }
    const updatedToken = {
      ...token,
    };
    if (token.price === "0" || token.price === "0.0000000000000000") {
      return;
    }
    setData((prevState) => {
      const updatedData = [...prevState];
      if (updatedData.length >= 20) {
        updatedData.pop();
        updatedData.unshift(updatedToken);
      } else {
        updatedData.unshift(updatedToken);
      }
      return updatedData;
    });
  };

  return (
    <SectionWrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <InfoSection>
        <InfoContent>
          <h2>You are trading at high risk!</h2>
          <p>
            The tokens listed below can be created by anyone, remember to DYOR
            before you buy!
          </p>
          <p>
            Displaying 20 newest tokens. Prices are updating every 60 seconds.
          </p>
          <SpecialLink onClick={handleOpen}>
            <img src={ShieldIcon} alt="warning sign"></img>
            Read this before you buy!
          </SpecialLink>
        </InfoContent>
        <Banner1>Your ad goes here!</Banner1>
      </InfoSection>
      {dataLoaded ? <Table tokenData={tokenData} /> : <Loader />}
      <Banner1>Your ad goes here!</Banner1>
    </SectionWrapper>
  );
}
