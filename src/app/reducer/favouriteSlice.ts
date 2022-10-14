import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../interfaces/interfaces";

type initialStateType = {
	favourites : IWeather[]
}

const initialState: initialStateType ={
	favourites: []
}

const favouriteSlice = createSlice({

	name: "favourites",
		initialState,
		reducers: {
			addFavourite: (state, action) => {
				state.favourites = [...state.favourites, action.payload]
			}
			// removeFavourite: (state, action) => {
			// 	const
				
			// }
	}
})

export default favouriteSlice.reducer;
export const { addFavourite } = favouriteSlice.actions