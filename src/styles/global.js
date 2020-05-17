import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import back from '../assets/images/back.svg';
import '../assets/fonts/roboto.css';

export default createGlobalStyle`
    *{
        margin :0;
        padding : 0;
        outline : 0;
        box-sizing : border-box;
    } 
    body {
        background : #191920 url(${back}) no-repeat center top;
        -webkit-font-smoothing : antialiased !important;
    }
    body,input,button{
        font : 14px Roboto, sans-serif;
    }
    #root{
        max-width : 1202px;
        margin : 0 auto;
        padding : 0 20px 50px; 
    }
    button{
        cursor: pointer;
    }
`;
