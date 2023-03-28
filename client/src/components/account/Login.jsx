
import {Box,TextField, styled, Button,Typography} from '@mui/material';
import imageFile from './card-YRV.jpg';

import { useState, useContext } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';

// STYLING LOGIN COMPONENTS 

const Component= styled(Box)`
    width:400px;
    margin:auto;
    box-shadow: 5px 5px 25px 5px
`
                                        //IMAGE FORMAT
const Image = styled('img')({ 
    width:350,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0' 
 })

                                        // WRAPPER FORMAT LOGIN SCREEN VERTICALLY
 const Wrapper = styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex:1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top:20px;
    }
 `;
                                        // LOGIN BUTTON STYLE
 const LogInButton = styled(Button)`
    text-transform: none;
    background:black;
    color:white;
    height:50px;
    border-radius: 6px;
` ;
                                       // SIGN UP BUTTON STYLE 
const SignUpButton = styled(Button)`
    text-transform: none;
    background:black;
    color:white;
    height:50px;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%)
`;

                                        // OR TEXT
const OrText = styled(Typography)`          
    color: #878787;
    font-size: 16px;
`
const Error = styled(Typography)`
font-size 10px;
color:red;
line-height: 0;
margin-top: 10px;
font-weight: 600;
`


                                // ******* END STYLING *********

const signupInitialValue={
    name:'',
    username:'',
    password:''
}

const loginInitialValues = {
    username:'',
    password:''
}

                            //*** Login Function ******/
const Login = ({isUserAuthenticated}) => {
    
    // Changing state to Signup
    const toggleSignUp = ()  => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    //Use States
    const [account,toggleAccount] = useState('login');
    const[signup, setSignup] = useState(signupInitialValue);  // Sign up useState
    const[login, setLogin] = useState(loginInitialValues);   //Log in useState
    const[error, setError] = useState('');

    const{setAccount} = useContext(DataContext);
    const navigate = useNavigate();
                                         

    const onInputChange = (event) =>{
        setSignup({ ...signup, [event.target.name]: event.target.value});  //printing value to Console
    }

    
    const signupUser = async () =>{
        let response = await API.userSignup(signup);
        if (response.isSuccess){
            setError('');
            setSignup(signupInitialValue);
            toggleAccount('login')
        } else{
            setError('Something went wrong! Try Again');
        }
}


const  onValueChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value})

}


const loginUser = async () => {       
       let response = await API.userLogin(login);   //Calling API  from api.js for LogIn
       
           if(response.isSuccess){
                setError('');

                sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
            
                setAccount({username: response.data.username, name: response.data.name})
                isUserAuthenticated(true);

                navigate('/');  // Navigates to the home page
            
        }else {
            setError('Something went wrong! Please try again');
       }

    }


    return(
<Component>
    <Box>
        <Image src={imageFile} alt="login" />
         {
            account === 'login' ?
                <Wrapper>
                        <TextField  variant='standard' value={login.username} onChange={(event) => onValueChange(event)}  name="username" label="Enter User Name"/>
                        <TextField variant='standard'  value={login.password} onChange={(event) => onValueChange(event)}  name= "password" label="Enter Password"/>
                       
                        { error && <Error>{error}</Error> }  
                        <LogInButton variant='contained' onClick={() => loginUser()}>Login</LogInButton>
                            <OrText style={{textAlign:'center'}}>OR</OrText>
                        <SignUpButton variant='contained' onClick={()=>toggleSignUp()}> Create an account</SignUpButton>
                </Wrapper> 
        :
                <Wrapper>
                        <TextField  variant='standard'  onChange={(event) => onInputChange(event)}  name= "name"        label="Enter Name"/>
                        <TextField variant='standard'   onChange={(event) => onInputChange(event)}  name= "username"    label="Enter User Name"/>
                        <TextField variant='standard'   onChange={(event) => onInputChange(event)}  name= "password"    label="Enter Password"/>
                       
                        { error && <Error>{error}</Error> }
                        <SignUpButton onClick={() => signupUser()} variant='contained'>Sign Up</SignUpButton>
                        <OrText style={{textAlign:'center'}}>OR</OrText>
                        <LogInButton variant='contained' onClick={()=>toggleSignUp()}> Already have an account</LogInButton>
                </Wrapper>

        }
    </Box>
</Component>

    )
}

export default Login;