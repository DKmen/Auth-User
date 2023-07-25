import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'

const URL = 'https://auth-8z6z.onrender.com/api/v1/user'

interface IUser {
    name: string,
    email: string
}

interface User {
    user: IUser,
    error: boolean,
    loading: boolean
}

const initialState: User = {
    user: {
        email: "",
        name: ""
    },
    error: false,
    loading: false
}

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
    const user = (await axios.get(URL, {
        withCredentials: true
    })).data.user as IUser

    return user;
})

export const createUser = createAsyncThunk('users/createUser', async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const user = (await axios.post(URL, {
        name,
        email,
        password
    }, {
        withCredentials: true
    })).data.user as IUser

    return user;
})

export const loginUser = createAsyncThunk('users/loginUser', async ({ email, password }: { email: string, password: string }) => {
    const userData = (await axios.post(URL + "/login", {
        email,
        password
    }, {
        withCredentials: true
    }));

    console.log(userData);

    return userData.data.user as IUser;
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
    }
})

export const selectUser = (state: RootState) => state.user
export default userSlice.reducer;