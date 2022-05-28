import {IUser} from "../models/IUser";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {authDomen} from "../domens";

interface UserState {
    user: IUser,
    newUser: IUser,
    isLoading: boolean
    passwordChangeLoading: boolean
    error: string
}

const initialState: UserState = {
    user: {
        idUser: 0,
        firstName: '',
        secondName: '',
        patronymic: null,
        email: '',
        phone: null,
        idCompany: null,
        idRole: null
    },
    newUser: {
        idUser: 0,
        firstName: '',
        secondName: '',
        patronymic: null,
        email: '',
        phone: null,
        idCompany: null,
        idRole: null
    },
    isLoading: false,
    passwordChangeLoading: false,
    error: ''
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.get<IUser>(`${authDomen}/User/${id}`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

// export const fetchUserWithCompany = createAsyncThunk(
//     'user/fetchUserWithCompany',
//     async (id: number, thunkAPI) => {
//         try {
//             const response = await fetchUser(id)
//             console.log(response)
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message)
//         }
//     }
// )

export const pushEditUser = createAsyncThunk(
    'user/pushEditUser',
    async (data: IUser, thunkAPI) => {
        try {
            console.log('pushing edit', data)
            const response = await axios.put<IUser>(`${authDomen}/User/update`, data)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export interface passwordChangeInterface {
    id: number,
    password: string,
    confirmPassword: string
}

export const pushChangePassword = createAsyncThunk(
    'user/pushChangePassword',
    async (data:passwordChangeInterface, thunkApi) => {
        try {
            const response = await axios.post(`${authDomen}/User/reset-password`, data)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        editUser(state, action: PayloadAction<IUser>) {
            console.log(action.payload)
            state.newUser = action.payload
        }
    },
    extraReducers: {
        [fetchUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.user = action.payload
            state.newUser = action.payload
        },
        [pushEditUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [pushEditUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
            state.newUser = state.user
        },
        [pushEditUser.fulfilled.type]: (state) => {
            state.isLoading = false
            state.user = state.newUser
        },
        [pushChangePassword.pending.type]: (state) => {
            state.passwordChangeLoading = true
        },
        [pushChangePassword.rejected.type]: (state, action: PayloadAction<string>) => {
            state.passwordChangeLoading = false
            state.error = action.payload
        },
        [pushChangePassword.fulfilled.type]: (state) => {
            state.passwordChangeLoading = false
        },
    }
})

export const { editUser } = userSlice.actions;


export default userSlice.reducer