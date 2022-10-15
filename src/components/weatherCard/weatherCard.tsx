import { useNavigate } from "react-router-dom";
import { addFavourite, addSelected } from "../../app/reducer/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import { IWeather } from "../../interfaces/interfaces";
import "./weatherCard.scss"

type WeatherProp = {
	result: IWeather;
}

const WeatherCard: React.FC<WeatherProp> =  (cityWeather: WeatherProp) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	 const icon: any = cityWeather.result.weather?.map((item) => {return item.icon}) ?? "";
	 const description: any = cityWeather.result.weather?.map((item) => {return item.description}) ?? "";
	 const temp: any = (cityWeather.result.main?.temp) ?  Math.trunc(cityWeather.result.main.temp) : "";

	 return(
		<div className="card-wrapper" onClick={() => {dispatch(addSelected(cityWeather.result));navigate("/weatherdetail")}}>
			<h3>{cityWeather.result.name}</h3>
			<h2>{temp}<sup>o</sup>C</h2>
			<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
			<p>{description}</p>
		</div>
	)
};

export { WeatherCard };