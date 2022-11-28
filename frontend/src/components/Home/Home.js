import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MuiChipsInput } from 'mui-chips-input'
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from '@mui/material';
import { getSearchPost } from '../../actions/posts'
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import Paginate from '../Pagination/Paginations';
import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery'); 
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if(search.trim() || tags){
            // fetch search post 
            // tags: ['europe', 'use'] -> 'europe, usa' 
            dispatch(getSearchPost({ search, tags: tags.join(',')}));
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history('/')
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost();
        }
    };

    const handleTagChange = (newtags) => {
        setTags(newtags)
    }

    return (
    <Grow in>
        <Container maxWidth="xl" >
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={8}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField name="search" variant="outlined" label="Search" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                        <MuiChipsInput style={{ margin: '10px 0' }} value={tags} onChange={handleTagChange} label="Search Tags" />
                        <Button onClick={searchPost} color="primary" variant="contained">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    {( !searchQuery && !tags.length ) && (
                        <Paper className={classes.pagination} elevation={6}>
                            <Paginate page={page} />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home