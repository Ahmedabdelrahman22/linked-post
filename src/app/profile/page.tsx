'use client'
import Image from 'next/image'
import staticImg from '../../assets/images/slider-image-3.jpeg'
import { Button, CircularProgress, Container, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { storeDispatch, storeState } from '@/redux/store';
import { addPost } from '@/redux/slices/postsSlice';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function Profile() {

    let { isLoad } = useSelector((state: storeState) => state.postsReducer)

    let dispatch = useDispatch<storeDispatch>()


    function handleSubmit(e: Event) {

        e.preventDefault();

        let body = e.target?.body.value;
        let image = e.target?.image.files[0];


        let formData = new FormData();
        formData.append('body', body);
        formData.append('image', image);

        dispatch(addPost(formData))

    }

    return <>



        <Container sx={{ p: 2 }} maxWidth='sm'>
            <Paper elevation={6} sx={{ p: 2 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <h2>Write Post</h2>
                    <TextField
                        id="body"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                    />
                    <Button
                        component="label"
                        role={undefined}
                        variant="text"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            id='image'
                        />
                    </Button>

                    {isLoad ? <Button type='button' variant='contained'><CircularProgress sx={{ color: '#fff' }} /></Button> :
                        <Button type='submit' variant='contained'>Add Post</Button>

                    }



                </form>

            </Paper>
        </Container>



    </>
}