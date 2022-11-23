import React from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import useStyles from './styles';

const Posts = ( {setCurrentId} ) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    return (
        // check if a post exist, if the not it will show a circular progress
        // !post.length = true - means there are no post
        // !post.length = false - mean there are post
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {/* the map, loop over all the posts */}
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            < Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts