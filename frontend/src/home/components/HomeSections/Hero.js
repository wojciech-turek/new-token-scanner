import React from 'react'
import Lottie from 'react-lottie';
import styled from 'styled-components';
import homeAnimation from '../../../assets/images/lottie/58096-startup-project/data.json'
import Button from '../../../styles/Button';
import bg from '../../../assets/backgrounds/blobs-main.svg'
import {CopyText} from '../../../styles/TextStyles'
import constructionPng from '../../../assets/images/construction-tape.png'
import { Link } from 'react-router-dom';

const Background = styled.div`
background-image: url(${bg});
background-size: cover;

`

const HeroSectionWrapper = styled.div`
width: var(--layoutWidth);
height: 95vh;
margin: 0 auto;
padding: 0 16px;
display: flex;
color: white;
align-items: center;
justify-content: space-between;

@media(max-width: 768px){
  height: auto;
  flex-direction: column;
  padding: 0;
  padding-top: 80px;
}
`

const TextConteredVertically = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
flex-basis: 30%;
gap: var(--rowGapLarge);
.construction{
  height: 60px;
  width:187px;
  position: absolute;
  background-image: url(${constructionPng});
  background-size: contain;
  background-repeat: no-repeat;
}
`

export default function Hero() {


    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: homeAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
      <Background>
        <HeroSectionWrapper>
            <TextConteredVertically>
                <h1>Fast. Rocket. Verification.</h1>
                <CopyText>Lucas ipsum dolor sit amet darth naboo palpatine thrawn jabba utapau droid kashyyyk skywalker twi'lek. Han fett leia wicket skywalker wedge sidious tatooine. </CopyText>
                <Link to='/pcs'><Button>View for PancakeSwap</Button></Link>
                <div >
                  <div className='construction'></div>
                  <Button>View for Uniswap</Button>
                  </div>
              
            </TextConteredVertically>
            <div>
            <Lottie options={defaultOptions}
             style={{margin: 0}}
              height={'100%'}
              width={'100%'}
           />
            </div>
            
        </HeroSectionWrapper>
        </Background>
    )
}
