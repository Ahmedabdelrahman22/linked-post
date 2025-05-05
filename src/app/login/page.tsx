'use client'
import { login } from '@/redux/slices/userSlice'
import { storeDispatch, storeState } from '@/redux/store'
import { Button, CircularProgress, Paper, TextField } from '@mui/material'
import Container from '@mui/material/Container'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {

    let {isLoading} =useSelector((state:storeState)=> state.userReducer)

    let dispatch = useDispatch<storeDispatch>()

    let {push} = useRouter()
    let {handleSubmit , handleChange , values} = useFormik({
        initialValues:{
            email:'',
            password:''
        },onSubmit: async (values)=>{
           await dispatch(login(values))

            if (localStorage.getItem('token')) {
                push('/')
            }
        }
    })

    useEffect(()=>{
        
        if (localStorage.getItem('token')) {
            push('/')
        }
    } , [])


    return <>

        <Container maxWidth="sm" sx={{}} >
            <Paper elevation={10} sx={{ p: 3, m: 3 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} >
                    <h2>Login Page</h2>

                    <TextField onChange={handleChange} value={values.email} fullWidth id="email" label="Email" variant="outlined" type='email' />
                    <TextField onChange={handleChange} value={values.password} fullWidth id="password" label="Password" type='password' variant="outlined" />

                    <Button type='submit' variant="contained"> {isLoading? <CircularProgress sx={{color:'#fff'}} /> : 'Login'} </Button>
                </form>


            </Paper>

        </Container>

    </>
}