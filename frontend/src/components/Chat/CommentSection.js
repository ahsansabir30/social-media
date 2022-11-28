import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ( {post} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState([post?.comments]);
    const [comment, setComment] = useState(' ');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleComment = async () => {
        const finalComment = `${user.result.firstname} ${user.result.lastname}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ 
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="body2">
                            {c}
                        </Typography>
                    ))}
                <div ref={commentsRef} />
                </div>
                {user?.result?.firstname && (
                <div style={{width: '80%'}}>
                    <Typography gutterBottom variant="h6">Write a comment</Typography>
                    <TextField fullWidth rows={4} variant="outlined" label="comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleComment} color="primary">Comment</Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection