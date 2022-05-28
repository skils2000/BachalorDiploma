import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {mainDomen} from "../domens";
import {ITraining, TrainingAddInterface} from "../models/ITraining";
import moment from "moment";

interface TrainingState {
    planTraining: ITraining[]
    factTraining: ITraining[]
    isLoading: boolean
    error: string
}

const initialState: TrainingState = {
    planTraining: [],
    factTraining: [],
    isLoading: false,
    error: '',
}

export const fetchPlanTraining = createAsyncThunk(
    'training/fetchPlanWorks',
    async (idField: number, thunkAPI) => {
        try {
            const response = await axios.get<ITraining[]>(`${mainDomen}/Training/PlanByDateRange/${idField}/2020-01-01/2022-01-01`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const fetchFactTraining = createAsyncThunk(
    'training/fetchFactTraining',
    async (ifField: number, thunkAPI) => {
        try {
            const response = await axios.get<ITraining[]>(`${mainDomen}/`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const addPlanTraining = createAsyncThunk(
    'training/addPlanTraining',
    async (data: TrainingAddInterface, thunkAPI) => {
        try {
            const dateToFormatString = moment(data.date).format("YYYY-MM-DD")
            const timeStartToFormatString = data.start += ":00"
            const timeEndToFormatString = data.start += ":00"
            const response = await axios.post(`${mainDomen}/Training/AddTrainingPlan`, {
                ...data,
                date: dateToFormatString,
                start: timeStartToFormatString,
                end: timeEndToFormatString
            })
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })


export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPlanTraining.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchPlanTraining.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchPlanTraining.fulfilled.type]: (state, action: PayloadAction<ITraining[]>) => {
            state.isLoading = false
            state.planTraining = action.payload
        },
        [fetchFactTraining.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchFactTraining.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchFactTraining.fulfilled.type]: (state, action: PayloadAction<ITraining[]>) => {
            state.isLoading = false
            state.factTraining = action.payload
        },
    }
})


export default trainingSlice.reducer