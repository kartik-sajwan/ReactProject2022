import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./favouriteSlice";
export const store = configureStore({
	reducer: {
		weather: favouriteReducer 
	}
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatcher = typeof store.dispatch