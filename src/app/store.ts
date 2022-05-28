import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {userSlice} from "./reducers/userSlice";
import {companySlice} from "./reducers/companySlice";
import {fieldSlice} from "./reducers/fieldSlice";
import {trainingSlice} from "./reducers/trainingSlice";
import {workSlice} from "./reducers/workSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    company: companySlice.reducer,
    fields: fieldSlice.reducer,
    training: trainingSlice.reducer,
    work: workSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
