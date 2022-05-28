import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IField} from "../models/IField";
import axios from "axios";
import {mainDomen} from "../domens";
interface FieldState {
    fields: IField[],
    isLoading: boolean,
    error: string,
    activeField: number | null,
    currentField: IField | null
}

const initialState: FieldState = {
    fields: [],
    isLoading: false,
    error: '',
    activeField: null,
    currentField: null
}

export const fetchFields = createAsyncThunk(
    'field/fetchFields',
    async (idCompany: number, thunkAPI) => {
        try {
            const response = await axios.get<IField[]>(`${mainDomen}/Field/GetByCompany/${idCompany}`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const setActiveField = createAsyncThunk(
    'field/setActiveField',
    (activeField: number, thunkAPI)  => {
        const {fields} = thunkAPI.getState() as {fields: FieldState}
        const currentField = fields.fields.find(field => field.id === activeField)

        if(currentField)
            thunkAPI.dispatch(setCurrentField(currentField))

        return activeField
    }
)

export const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setCurrentField: (state, action: PayloadAction<IField>) => {
            state.currentField = action.payload
        }
    },
    extraReducers: {
        [fetchFields.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchFields.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchFields.fulfilled.type]: (state, action: PayloadAction<IField[]>) => {
            state.isLoading = false
            state.fields = action.payload
        },
        [setActiveField.fulfilled.type]: (state, action: PayloadAction<number>) => {
            state.activeField = action.payload
        }
    }
})

export const { setCurrentField } = fieldSlice.actions

export default fieldSlice.reducer