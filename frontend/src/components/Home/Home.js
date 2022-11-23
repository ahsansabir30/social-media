import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Grow, Grid, Container } from '@mui/material';
import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';

const Home = () => {
    // const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const [currentId, setCurrentId] = useState(null);

    return (
    <Grow in>
        <Container >
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home