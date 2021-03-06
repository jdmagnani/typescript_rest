import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Post } from '../model/post';

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    })
}

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;

    let response: AxiosResponse = await await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
}

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
}


// adding a post
const addPost = async (req:Request, res: Response, next: NextFunction) => {
    
    let title: string = req.body.title;
    let body: string = req.body.body;

    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });

    // return response
    return res.status(200).json({
        message: response.data
    })
}

export default { getPosts, getPost, updatePost, deletePost, addPost };
