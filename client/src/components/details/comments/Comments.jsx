import { useState,useContext, useEffect} from 'react';

import {Box,TextareaAutosize, Button, styled}  from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//component
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}



export const Comments  = ({post}) =>{

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment,setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const[toggle, setToggle] = useState(false);

    const{account} = useContext(DataContext);

    useEffect(() => {
        const getData = async () =>{
           const response= await API.getAllComments(post._id);
           if(response.isSuccess){
                setComments(response.data);
           }
        }
            getData();
    },[post,toggle])

    const handleChange = (event) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: event.target.value
        });
    }

    const addComment = async() => {
        await API.newComment(comment);
        if (Response.isSuccess){
            setComment(initialValue);
        }
        setToggle(prevState => !prevState);
        
    }

    return (
        <Box>
            <Container>
                <Image src = {url} alt= "dp"/>
                <StyledTextArea
                 minRows={5}
                 placeholder="What's on your mind?"
                 value={comment.comments}
                 onChange={(event) => handleChange(event)}
                />

                <Button 
                variant= "contained" 
                color="primary" 
                size="medium"
                style={{height:40}}
                onClick={(event) => addComment(event)}>
            Post </Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;