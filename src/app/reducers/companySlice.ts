import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ICompany} from "../models/ICompony";
import {authDomen} from "../domens";

interface CompanyState {
    company: ICompany,
    isLoading: boolean,
    error: string
}

const initialState: CompanyState = {
    company: {
        idCompany: null,
        companyName: null,
        idRate: null
    },
    isLoading: false,
    error: ''
}

export const fetchCompany = createAsyncThunk(
    'company/fetchCompany',
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.get<CompanyState>(`${authDomen}/Company/${id}`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchCompany.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchCompany.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchCompany.fulfilled.type]: (state, action: PayloadAction<ICompany>) => {
            state.isLoading = false
            state.company = action.payload
        },
    }
})

export default companySlice.reducer