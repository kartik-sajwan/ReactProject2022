import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import favouriteReducer from "../../../app/reducer/favouriteSlice";
import { IWeather } from '../../../interfaces/interfaces';
import { WeatherCard } from '../weatherCard';

export function createTestStore() {
	const store = configureStore({
	  reducer: {
		weather: favouriteReducer 

	  }
});
	return store;
  }
  
let store;

beforeEach(() => {
	store = createTestStore();
});
  
test('should render same text passed in cityName', () => {
	let result: IWeather = {}
	result.name = "Dehradun";

	render(	<BrowserRouter><Provider store={store}><WeatherCard result={result}/></Provider></BrowserRouter>);
	const headerElement = screen.getByText(/dehradun/i);
	expect(headerElement).toBeInTheDocument();
});