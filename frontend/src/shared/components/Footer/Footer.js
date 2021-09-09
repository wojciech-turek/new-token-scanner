import React from "react";
import styled from "styled-components";

import TelegramIcon from "../../../assets/icons/social/telegram.svg";
import DiscordIcon from "../../../assets/icons/social/discord.svg";

const FooterWrapper = styled.div`
  background-color: var(--primary);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  justify-content: space-around;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const GeneralInfoWrapper = styled.div`
  flex-basis: 30%;
  padding: 24px 0;
  p {
    margin: 12px 0;
    font-size: 18px;
    line-height: 22px;
  }
`;

const FutureTaskList = styled.ul`
  font-size: 18px;
  line-height: 32px;
`;

const SocialIcons = styled.div`
  display: flex;
  flex-grow: 1;
  a {
    width: 30px;
    margin: 6px;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <GeneralInfoWrapper>
        <h2>General info</h2>
        <p>
          I have noticed that most of the people that invest early in sound
          projects tend to make profits most of the time. If the initial
          research is done right the chance of success is notable. This website
          will attempt to be a base for new token researchers with additional
          features being added with time.
        </p>
        <p>
          Currently, this page is being developed by one person only so I don't
          have a lot of resources, but as we grow I might introduce our own
          token too.
        </p>
        <p>
          I am open to your ideas and suggestions as well as criticism so please
          feel free to express them.
        </p>
      </GeneralInfoWrapper>
      <GeneralInfoWrapper>
        <h2>What can you expect in the future?</h2>
        <FutureTaskList>
          <li>Personal accounts with favorite tokens</li>
          <li>Metamask integration with realtime balance and P/L</li>
          <li>Top list with the best prospering coins to invest in</li>
          <li>More information in the main table</li>
          <li>Better safety verification</li>
          <li>Automatic Trading Bot</li>
          <li>UX/UI Improvements</li>
        </FutureTaskList>
      </GeneralInfoWrapper>
      <GeneralInfoWrapper>
        <h2>Contact</h2>

        <p>
          Email:{" "}
          <a href="mailto:contact@newtokenscanner.com">
            contact@newtokenscanner.com
          </a>
        </p>
        <SocialIcons>
          <a href="https://t.me/wojtek_web" target="_blank" rel="noreferrer">
            <img src={TelegramIcon} alt="telegram logo" />
          </a>
          <a
            href="https://discord.gg/HQx9C4mk"
            target="_blank"
            rel="noreferrer"
          >
            <img src={DiscordIcon} alt="telegram logo" />
          </a>
        </SocialIcons>
      </GeneralInfoWrapper>
    </FooterWrapper>
  );
}
