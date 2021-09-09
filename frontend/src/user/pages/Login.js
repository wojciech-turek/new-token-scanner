import React from "react";
import { useState } from "react";
import styled from "styled-components";
import bg from "../../assets/backgrounds/circle-scatter-haikei.svg";
import { StyledLink, SubHeading } from "../../styles/TextStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "../../styles/Button";
import Spacer from "../../shared/utils/Spacer";
import { Link } from "react-router-dom";

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
`;

const LoginWrapper = styled.div`
  width: var(--layoutWidth);
  margin: 0 auto;
  padding-top: 56px;
  @media (max-width: 767px) {
    margin: 0 auto;
  }
`;
const LoginBox = styled.div`
  width: 540px;
  min-width: 540px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  @media (max-width: 768px) {
    width: 100%;
    min-width: 300px;
  }
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 56px 48px;
  background-color: white;
  box-shadow: 0 15px 35px 0 rgb(60 66 87 / 8%), 0 5px 15px 0 rgb(0 0 0 / 12%);
  p {
    margin: 0 12px;
  }
  @media (max-width: 768px) {
    padding: 12px 8px;
  }
`;

const LogoContainer = styled.div`
  padding: 42px 0;
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  color: var(--black);
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Ubuntu, sans-serif;
  * {
    font-weight: 600;
  }
  label {
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 12px;
  }
  input {
    min-height: 44px;
    font-size: 16px;
    line-height: 28px;
    margin-top: 12px;
    padding: 4px 16px;
    margin-left: 12px;
    margin-right: 12px;
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px;
    border-radius: 4px;
    border: none;
  }
  button {
    margin: 0 12px;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-right: 12px;
`;

const CheckboxWrapper = styled.div`
  margin: 16px 0;
`;

export default function Login() {
  const [checked, setChecked] = useState(false);
  return (
    <Background>
      <LoginWrapper>
        <LoginBox>
          {/* <LogoContainer>Logo</LogoContainer> */}
          <LoginCard>
            <SubHeading>
              <span>Sign in to your account</span>
            </SubHeading>
            <StyledLoginForm noValidate>
              <label for="email">Email</label>
              <input id="email"></input>
              <Spacer space={1} />
              <FlexWrap>
                <label for="password">Password</label>
                <StyledLink>Forgot your password?</StyledLink>
              </FlexWrap>

              <input id="password" type="password"></input>
              <CheckboxWrapper>
                <Checkbox
                  checked={checked}
                  color="primary"
                  onChange={() => setChecked(!checked)}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                Keep me signed in
              </CheckboxWrapper>
              <Button>Sign in</Button>
            </StyledLoginForm>
            <Spacer space={1} />
            <p>
              Don't have an account yet?
              <Link to="/signup">
                <StyledLink> Create one free now</StyledLink>
              </Link>
            </p>
            <Spacer space={1} />
          </LoginCard>
          <Spacer space={4} />
        </LoginBox>
      </LoginWrapper>
    </Background>
  );
}
