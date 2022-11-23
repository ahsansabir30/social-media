import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { create } from '@mui/material/styles/createTransitions';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    // this will check which post we want to upate (and will return a singular post)
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        }else{
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    if(!user?.result?.firstname){
        return(
            <Paper className={classes.paper}>
                <Typography>Please sign in to create a post!</Typography>
            </Paper>
        )
    };

    return (
        // paper is a div with a whiteish background
        <Paper classes={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h5">NEW POST</Typography>    
                <TextField name="title" variant="outlined" margin="dense" label="Title" fullWidth value ={postData.title} onChange={(e) => setPostData( { ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" margin="dense" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData( { ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" margin="dense" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData( { ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
                </div> 
                <Button className={classes.buttonSubmit} variant="contained" size="small" sx={{ my: 1 }} color="primary" type="submit" fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant="contained" size="small" color="warning" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form