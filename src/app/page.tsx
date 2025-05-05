'use client'
import { getPosts } from "@/redux/slices/postsSlice"
import { storeDispatch, storeState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./loading"
import Post from "./_components/Post/Post"
import { Container } from "@mui/material"
import {  PostInterface } from "@/postInterface"

export default function Home() {


  let { posts, isLoading } = useSelector((state: storeState) => state.postsReducer)

  let { push } = useRouter();
  let dispatch = useDispatch<storeDispatch>()

  useEffect(() => {

    if (!localStorage.getItem('token')) {
      push('/login');
    } else {
      dispatch(getPosts())
    }
  }, [])


  

  return <>

    <Container maxWidth={'sm'} >
      {isLoading ? <Loading /> : posts?.map((post:PostInterface) =>  <Post key={post._id} postDetails={post} />)}
    </Container>



  </>
}