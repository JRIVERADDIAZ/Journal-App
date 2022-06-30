import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './Auth';
import { JournalSlice } from './Journal';

export const store = configureStore({
 reducer:{
     auth: AuthSlice.reducer, 
     journal: JournalSlice.reducer
 },
});