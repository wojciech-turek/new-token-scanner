import React from "react";
import copy from "copy-to-clipboard";
import copyIcon from "../../assets/icons/copy1.svg";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default function Copy({ contract }) {
  const handleClick = () => {
    copy(contract);
    setState(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };
  const [state, setState] = React.useState(false);
  const handleClose = () => {
    setState(false);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state}
      >
        <Alert onClose={handleClose} severity="success">
          Contract address copied to clipboard!
        </Alert>
      </Snackbar>
      <StyledIcon src={copyIcon} alt="copy" onClick={handleClick}></StyledIcon>
    </>
  );
}
