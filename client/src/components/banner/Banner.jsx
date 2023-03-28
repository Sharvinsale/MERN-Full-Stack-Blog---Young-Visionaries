
import {Box, Typography,styled} from '@mui/material';


import BannerImage from './YRV-Boxed-logo-with-quote.png';


const Image = styled(Box)`
background: url(${BannerImage}) center/35% repeat-x #000;
width:100%;
height:40vh;
display:flex;
align-item: center; 
justify-content: center;
`;

//flex-direction:column;
const Heading = styled(Typography)`
color: white;
font-size:50px;
line-height:1
background:#FFFFFF;
margin-top:50;
`;


const Banner =() => {

    return(
        
            
            <Image>
            </Image>
        
    )
}

export default Banner;