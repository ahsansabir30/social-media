import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, updateLikedPost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [likes, setLikes] = useState(post?.likes);
    const userID = user?.result.googleId || user?.result?._id
    const hasLiked = post.likes.find((like) => like === userID);

    const handleLikes = async () => {
       dispatch(updateLikedPost(post._id))
       if(hasLiked){
        setLikes(post.likes.filter((id) => id !== userID));
       }else{
        setLikes([...post.likes, userID]);
       }
    }

    const Likes = () => {
        if (likes.length > 0) {
            // first checking if the user liked something or didnt like something
            return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
                <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        history(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} justify="space-between" component='div'/> 
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                    <MoreVertIcon />
                </Button>
            )}
            </div>
            <div className={classes.detail}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent onClick={openPost}>
                <Typography variant="h4" color="textSecondary">{post.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikes}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" style={{ align: "right" }} onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post