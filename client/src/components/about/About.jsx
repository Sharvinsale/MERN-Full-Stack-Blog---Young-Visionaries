import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Sharvin Sale</Typography>
                <Text variant="h5">I pursued my education at VCU studying Computer Science and minor in Mathematics with interests in aviation, software development, and start-ups. Im an entrepreneur at heart driven by my passion for technology and a creative mind with one end goal: Success.
                    <Box component="span" style={{ marginLeft: 5 }}>
                        
                    </Box>
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;