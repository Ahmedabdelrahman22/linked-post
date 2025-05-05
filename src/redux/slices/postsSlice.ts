import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


let initialState = {posts:[] , isLoading : true , isLoad: false, post:null }

export let addPost = createAsyncThunk('posts/addPost' , async (formdata: FormData)=>{

    let {data} = await axios.post( `https://linked-posts.routemisr.com/posts/` , formdata , {
        headers:{
            token: localStorage.getItem('token')
        }
    } )
    console.log(data);
    
   

})

export let deletePost = createAsyncThunk('posts/deletePost' , async (id: string)=>{
try{
    
    let {data} = await axios.delete( `https://linked-posts.routemisr.com/posts/${id}` , {
        headers:{
            token: localStorage.getItem('token')
        }
    } )
    console.log(data);
    
        toast.success(data.message);
    return data.post
}catch(err){
    console.log(err);
    
}

})

export let getSinglePost = createAsyncThunk('posts/getSinglePost' , async (id: string)=>{

    let {data} = await axios.get( `https://linked-posts.routemisr.com/posts/${id}` , {
        headers:{
            token: localStorage.getItem('token')
        }
    } )
    console.log(data);
    
    return data.post

})

export let getPosts = createAsyncThunk('posts/getPosts' , async ()=>{

    let {data} = await axios.get( `https://linked-posts.routemisr.com/posts?limit=50&page=16` , {
        headers:{
            token: localStorage.getItem('token')
        }
    } )
    console.log(data);
    
    return data.posts

})

let postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getPosts.fulfilled , (state , {payload})=>{
            state.isLoading = false;
            state.posts = payload;
        })     

        builder.addCase(getSinglePost.fulfilled , (state , {payload})=>{
            state.isLoading = false;
            state.post = payload;
        })     

        builder.addCase(addPost.pending , (state , {payload})=>{
            state.isLoad = true;
        })     

        builder.addCase(addPost.fulfilled , (state , {payload})=>{
            state.isLoad = false;
        })     

        builder.addCase(deletePost.pending , (state , {payload})=>{
            state.isLoad = true;
        })     
        builder.addCase(deletePost.fulfilled , (state , {payload})=>{
            state.isLoad = false;
            state.posts = state.posts.filter((post) => post._id != payload._id)

        })     
    },
}) 


export let postsReducer = postsSlice.reducer