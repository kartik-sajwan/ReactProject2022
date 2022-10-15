import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../interfaces/interfaces";

type initialStateType = {
	favourites : IWeather[];
	selected: IWeather;
}

const initialState: initialStateType ={
	favourites: [],
	selected: {}
}

const favouriteSlice = createSlice({

	name: "favourites",
		initialState,
		reducers: {
			addFavourite: (state, action) => {
				state.favourites = [...state.favourites, action.payload]
			},
			removeFavourite: (state, action) => {
				const indexPos = state.favourites.findIndex((val) => val.id === action.payload);
				state.favourites.splice(indexPos,1)
				
			},
			addSelected: (state, action) => {
				state.selected = action.payload;
			},
			
			clearSelected: (state, action) => {
				state.selected = action.payload;
			}
	}
})

export default favouriteSlice.reducer;
export const { addFavourite, addSelected, removeFavourite, clearSelected } = favouriteSlice.actions