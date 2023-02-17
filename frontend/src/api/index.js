import axios from 'axios';

const API = axios.create({
    baseURL: '/backend/'
});

// to send a token to our backend we need to the below
API.interceptors.request.use((req) => { 
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const comment = (value, id) => API.post(`/posts/comment/${id}`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/likepost/${id}/`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);