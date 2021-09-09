import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
 --primary: #3F51B5;
 --secondary: #13C4A3;
 --secondary-darker: #0d947b;
 --tertiary: #123123;
 --black: #3c4257;
 --link: #5b3fb5;
 --link-darker: #36256e;

 --padding-s: 8px;
 --padding-m: 16px;
 --padding-l: 24px;
 --padding-xl: 36px;

 --margin-s: 8px;
 --margin-m: 16px;
 --margin-l: 24px;
 --margin-xl: 36px;

 --fz-regular: 16px;
 --fz-heading1: 32px;
 --fz-heading2: 24px; 

 --rowGapLarge: 32px;
 --rowGapMedium: 24px;
 --rowGapSmall: 16px;

 --bodyMaxWidth: calc(calc(1080px * 025) *3);

/* 
 @media(max-width: 1024px){
    --layoutWidth: 768px;
 }
 @media(max-width: 768px){
    --layoutWidth: 480px;
 }
 @media(max-width: 767px){
    --layoutWidth: 340px;
 }*/
} 
html{
    overflow-x: hidden;;
}
 body{
     font-family: Poppins, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
     padding-right: 0!important;
     
 }

 h1,h2,h3,h4,h5,h6,p{
     margin: 0;
 }

 h1 {
     font-size: 48px;
 }

 a{
     text-decoration: none;
     color: inherit;
 }
 table, caption, tbody, tfoot, thead, tr, th, td{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    border-spacing: 0;
 }
 .incr {
     display: flex;
     align-items: center;
     justify-content: center;
     color: #029c11;
     font-weight: bold;
     svg {
         padding: 0 4px;
         fill: #029c11;
         
     }
     img{
        display:none
     }
 }
 .decr {
    display: flex;
     align-items: center;
     justify-content: center;
     color: #c90000;
     font-weight: bold;
     svg {
         padding: 0 4px;
         fill: #c90000;
         transform: rotate(180deg);
         
     }
     img{
        display:none
     }
 }
 .stale{
     svg{
         display:none
     }
     img{
        display:none
     }
 }
 .ath{
    display: flex;
     align-items: center;
     justify-content: center;
     font-weight: bold;
     color: #d4a600;
     svg{
        padding: 0 4px;
         &.icon{
             display: none;
         }
         
     }
     img{
         padding: 0 4px;
         width: 14px;
     }
 }
 .warning{
     display: flex;
     justify-content: center;
     align-items: center;
     display: inline-block;
     background-color: #c90000;
     color:white;
     padding: 2px 8px;
    font-size:14px;
     font-weight: 600;
     border-radius: 50%;
 }

`;

export default GlobalStyle;
