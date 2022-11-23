import * as api from '../api';
import { GET, CREATE, UPDATE, DELETE } from '../constants/actions'

export const getPosts = () => async (dispatch) => {
    try {
        // first we are getting the response from the api (i.e. the data , this represents the post)
        // the dispatch is the action (i.e. an object)  
        const { data } = await api.getPosts();
        dispatch( {type: GET, payload: data} );
    } catch (error) {
        console.log(error.message)
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: data })
    } catch (error) {
      console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message)
  }
}

export const updateLikedPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}