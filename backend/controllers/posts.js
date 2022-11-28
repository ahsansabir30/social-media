import express from 'express'
import mongoose from "mongoose";
import PostMessage from "../models/postsMessageModel.js";
import User from '../models/userModel.js'
// req (request), respond (respond) 
export const getPosts = async (req, res) => { 
    const { page } = req.query;
    try {
        // limit of post per page
        const LIMIT = 9;
        // get the starting index of every page
        const startIndex = (Number(page) - 1)*LIMIT;
        const total = await PostMessage.countDocuments({});

        // Sort by Id
        // Limit the no of post (here we limit by 9)
        // Skip - when going to a new page we will avoid the previous post from the other pages
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostSearch = async(req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        // the flag 'i' ignores the case
        const title = new RegExp(searchQuery, 'i');
        // $or -> either find me a post or the tag
        // as the tags are in an array, we have to split the tags by the comma (and then check if those tags are in any tag array in the database)
        const posts = await PostMessage.find({ $or: [{title}, {tags: {$in: tags.split(',')}}]});
        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const id = req.userId
    
    const user = await User.findOne({ _id: id })
    const name = user['firstname'] + ' ' + user['lastname']
    const newPostMessage = new PostMessage({ ...post, name: name, creator: id, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with ID given');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with ID given');
    await PostMessage.findByIdAndDelete(id);
    res.json({ message: 'Post delete successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: "Please sign in"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with ID given');
    const likedPost = await PostMessage.findById(id);

    // check if the user has liked a post or not
    const index = likedPost.likes.findIndex((id) => id === String(req.userId));
    // if the id is not in index, it will return -1
    if (index === -1 ){
        //  thus we want to like the post
        likedPost.likes.push(req.userId)
    }else{
        // remove his/her like
        likedPost.likes = likedPost.likes.filter((id) => id !== String(req.userId))
    }
    const updateLikedPost = await PostMessage.findByIdAndUpdate(id, likedPost, { new: true })

    res.status(200).json(updateLikedPost)
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}
