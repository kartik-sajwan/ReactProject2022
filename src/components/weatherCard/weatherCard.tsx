import { addFavourite } from "../../app/reducer/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import { IWeather } from "../../interfaces/interfaces";
import "./weatherCard.scss"

type WeatherProp = {
	result: IWeather;
}

const WeatherCard: React.FC<WeatherProp> =  (weather: WeatherProp) => {
	const dispatch = useAppDispatch();

	return(
		<div className="card-wrapper">
			<h3>{weather.result.name}</h3>
			<button onClick={() => dispatch(addFavourite(weather.result))}>Add To fav</button>
		</div>
	)
};

export { WeatherCard };