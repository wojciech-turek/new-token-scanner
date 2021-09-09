import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbsUpIMg from "../../assets/icons/thumbsup.svg";
import ThumbsDownIMg from "../../assets/icons/thumbsdown.svg";
import GoodFace from "../../assets/icons/faces/good.svg";
import BadFace from "../../assets/icons/faces/bad.svg";
import NeutralFace from "../../assets/icons/faces/neutral.svg";
import VeryGood from "../../assets/icons/faces/very-good.svg";
import VeryBad from "../../assets/icons/faces/very-bad.svg";

const ThumbsVotingWrapper = styled.div`
  display: flex;
  height: 100%;
  img {
    width: 24px;
    padding: 0 8px;
  }
`;

const ThumbsAndCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  img {
    width: 20px;
    padding: 0 8px;
    cursor: pointer;
    &.voted {
      opacity: 0.3;
      cursor: auto;
    }
  }
  .count {
    font-weight: bold;
    width: 12px;
    &.up {
      color: var(--secondary-darker);
    }
    &.down {
      color: #c90000;
      text-align: right;
    }
  }
`;
export default function ThummbsVoting(props) {
  const { data, alreadyVotedContracts } = props;
  const [alreadyVoted, setAlreadyVoted] = useState(true);
  const [votesUp, setVotesUp] = useState(data.votes.votesUp);
  const [votesDown, setVotesDown] = useState(data.votes.votesDown);
  const [updatedVotesUp, setUpdatedVotesUp] = useState(data.votes.votesUp);
  const [updatedVotesDown, setUpdatedVotesDown] = useState(
    data.votes.votesDown
  );
  const tokenContr = data.contract;
  let face = NeutralFace;
  let likesValue = votesUp - votesDown;

  useEffect(() => {
    setVotesUp(data.votes.votesUp);
    setVotesDown(data.votes.votesDown);
    if (alreadyVotedContracts.findIndex((el) => el === tokenContr) !== -1) {
      setAlreadyVoted(true);
    } else {
      setAlreadyVoted(false);
    }
  }, [
    data.votes.votesUp,
    data.votes.votesDown,
    alreadyVotedContracts,
    tokenContr,
  ]);

  if (likesValue === 0) {
    face = NeutralFace;
  }
  if (likesValue < -1) {
    face = BadFace;
  }
  if (likesValue <= -3) {
    face = VeryBad;
  }
  if (likesValue > 1) {
    face = GoodFace;
  }
  if (likesValue >= 3) {
    face = VeryGood;
  }

  const handleIncrease = () => {
    if (!alreadyVoted) {
      fetch(process.env.REACT_APP_BACKEND_URL + "/tokens/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vote: "up",
          contr: tokenContr,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alreadyVotedContracts.push(tokenContr);
          localStorage.setItem("voted", JSON.stringify(alreadyVotedContracts));
          setUpdatedVotesUp(data.res.votesUp);
          setAlreadyVoted(true);
        });
    }
  };

  const handleDecrease = () => {
    if (!alreadyVoted) {
      fetch(process.env.REACT_APP_BACKEND_URL + "/tokens/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vote: "down",
          contr: tokenContr,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alreadyVotedContracts.push(tokenContr);
          localStorage.setItem("voted", JSON.stringify(alreadyVotedContracts));
          setUpdatedVotesDown(data.res.votesDown);
          setAlreadyVoted(true);
        });
    }
  };
  return (
    <ThumbsVotingWrapper>
      {data.counter}
      <ThumbsAndCount>
        <img
          src={ThumbsDownIMg}
          alt="thumbs up"
          className={alreadyVoted ? "voted" : ""}
          onClick={handleDecrease}
        />
        <div className={`count down`}>
          {alreadyVoted && updatedVotesDown > votesDown
            ? updatedVotesDown
            : votesDown}
        </div>
      </ThumbsAndCount>
      <img src={face} alt="moodface" />
      <ThumbsAndCount>
        <div className="count up">
          {alreadyVoted && updatedVotesUp > votesUp ? updatedVotesUp : votesUp}
        </div>
        <img
          src={ThumbsUpIMg}
          className={alreadyVoted ? "voted" : ""}
          alt="thumbs up"
          onClick={handleIncrease}
        />
      </ThumbsAndCount>
    </ThumbsVotingWrapper>
  );
}
