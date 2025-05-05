import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

let initialState = {
    token: '',
    isLoading: false,
}
export let login = createAsyncThunk('user/login', async (values : {email:string , password: string}) => {
    try {

        let { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`, values)

        console.log(data);

        return data
    } catch (err: any) {
        toast.error(err.response.data.error)
        return err;
    }

})

let userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.message == 'success') {

                state.isLoading = false;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                console.log(action.payload);
            }
            else{
                state.isLoading = false
            }

        })
    },
})

export let userReducer = userSlice.reducer