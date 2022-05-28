import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWork, IWorkName, IWorkType, WorkAddInterface} from "../models/IWork";
import axios from "axios";
import {mainDomen} from "../domens";
import moment from "moment";

interface WorkState {
    planWorks: IWork[]
    factWorks: IWork[]
    workTypes: IWorkType[]
    currentWorkType: IWorkType | null
    currentWorkName: IWorkName | null
    isLoading: boolean
    error: string
}

const initialState: WorkState = {
    planWorks: [],
    factWorks: [],
    workTypes: [],
    currentWorkType: null,
    currentWorkName: null,
    isLoading: false,
    error: '',
}

export const fetchPlanWorks = createAsyncThunk(
    'works/fetchPlanWorks',
    async (idField: number, thunkAPI) => {
        try {
            const response = await axios.get<IWork[]>(`${mainDomen}/`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const fetchFactWorks = createAsyncThunk(
    'works/fetchFactWorks',
    async (ifField: number, thunkAPI) => {
        try {
            const response = await axios.get<IWork[]>(`${mainDomen}/`)
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)


const fetchWorkSort = (a: IWorkType, b: IWorkType): number => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0;
}

export const fetchWorkTypes = createAsyncThunk(
    'works/fetchWorkTypes',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IWorkType[]>(`${mainDomen}/WorkType/getAll `)
            console.log(response)
            return response.data.sort(fetchWorkSort)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)


export const addWorkType = createAsyncThunk(
    'works/addWorkType',
    async (workTypeName: string, thunkAPI) => {
        try {
            const response = await axios.post<IWorkType>(`${mainDomen}/WorkType/AddType `, {
                name: workTypeName
            })
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const addPlanWork = createAsyncThunk(
    'work/addPlanWork',
    async (data: WorkAddInterface, thunkAPI) => {
        try {
            const dateToFormatString = moment(data.date).format("YYYY-MM-DD")
            const response = await axios.post<IWork>(`${mainDomen}/Work/AddWorkPlan`, {
                ...data,
                date: dateToFormatString,
            })
            console.log(response)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        setCurrentWorkType: (state, action: PayloadAction<IWorkType | null>) => {
            state.currentWorkType = action.payload
        },
        setCurrentWorkName: (state, action: PayloadAction<IWorkName | null>) => {
            state.currentWorkName = action.payload
        }
    },
    extraReducers: {
        [fetchPlanWorks.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchPlanWorks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchPlanWorks.fulfilled.type]: (state, action: PayloadAction<IWork[]>) => {
            state.isLoading = false
            state.planWorks = action.payload
        },
        [fetchFactWorks.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchFactWorks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchFactWorks.fulfilled.type]: (state, action: PayloadAction<IWork[]>) => {
            state.isLoading = false
            state.factWorks = action.payload
        },
        [fetchWorkTypes.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchWorkTypes.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchWorkTypes.fulfilled.type]: (state, action: PayloadAction<IWorkType[]>) => {
            state.isLoading = false
            state.workTypes = action.payload
        },
        [addWorkType.pending.type]: (state) => {
            state.isLoading = true
        },
        [addWorkType.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [addWorkType.fulfilled.type]: (state, action: PayloadAction<IWorkType>) => {
            state.isLoading = false
            state.workTypes = [...state.workTypes, action.payload]
            state.currentWorkType = action.payload
        },
        [addPlanWork.pending.type]: (state) => {
            state.isLoading = true
        },
        [addPlanWork.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [addPlanWork.fulfilled.type]: (state, action: PayloadAction<IWork>) => {
            state.isLoading = false
            state.planWorks = [...state.planWorks, action.payload]
        },
    }
})

export const {setCurrentWorkType, setCurrentWorkName} = workSlice.actions

export default workSlice.reducer