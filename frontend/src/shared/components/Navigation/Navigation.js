import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo } from "../../../styles/TextStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

//styled-components
const NavWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
`;
const NavList = styled.nav`
  list-style: none;
  display: flex;
  gap: 16px;
`;
const LogoHamburgerWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
  }
`;
export default function Navigation() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense" disableGutters>
          <NavWrapper>
            <LogoHamburgerWrapper>
              <Link to="/">
                <div>
                  {" "}
                  <Logo>
                    NewTokenScanner <span> (beta)</span>
                  </Logo>
                </div>
              </Link>
              {/* <svg
                height="20px"
                version="1.1"
                viewBox="0 0 32 32"
                width="20px"
                fill="white"
              >
                <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
              </svg> */}
            </LogoHamburgerWrapper>

            <nav>
              <NavList>
                {/* <ListElement className="button">
                  <Link to="/login">
                    <span>Sign in</span>
                  </Link>
                </ListElement> */}
              </NavList>
            </nav>
          </NavWrapper>
        </Toolbar>
      </AppBar>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
