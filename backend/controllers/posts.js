import express from 'express'
import mongoose from "mongoose";
import PostMessage from "../models/postsMessageModel.js";
import User from '../models/userModel.js'
// req (request), respond (respond) 
export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();     
        res.status(200).json(postMessages);
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