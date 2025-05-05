'use client'
import Post from "@/app/_components/Post/Post"
import Loading from "@/app/loading"
import { getSinglePost } from "@/redux/slices/postsSlice"
import { storeDispatch, storeState } from "@/redux/store"
import { Container } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function PostDetails({params :{id}} :{params :{id:string}}){

    let dispatch = useDispatch<storeDispatch>()

    useEffect(() => {
        dispatch(getSinglePost(id))
    } , []);
    let  {post} =useSelector((state: storeState) => state.postsReducer)

    return <>
    {post?
       <Container maxWidth='sm' > <Post postDetails={post} isComments={true} /></Container> : <Loading/>}
    </>
}