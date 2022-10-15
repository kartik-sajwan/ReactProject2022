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

	 const show: boolean = (cityWeather)? true : false;
	 const icon: any = cityWeather.result.weather?.map((item) => {return item.icon}) ?? "";
	 const description: any = cityWeather.result.weather?.map((item) => {return item.description}) ?? "";
	 const temp: any = (cityWeather.result.main?.temp) ?  Math.trunc(cityWeather.result.main.temp) : "";
	 const cloudiness: any = (cityWeather.result.clouds?.all) ?  Math.trunc(cityWeather.result.clouds?.all) : "";
	 const warning: boolean = ((cloudiness) > 80)? true : false;

	 return(
		 <div className="card-wrapper" onClick={() => {dispatch(addSelected(cityWeather.result));navigate("/weatherdetail")}}>
			<div className="city-details">
				<h3><strong>{cityWeather.result.name}</strong></h3>
				<h2>{temp}&#176;</h2>
				{ warning && <p className="warning">&#9888; WARNING</p>}
			</div>
			<div className="brief-weather">
				<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
				{ warning && <p className="warning">Expecting Rainfall</p>}
				{ !warning && <p className="desc">{description}</p>}
			</div>			
		</div>
	)
};

export { WeatherCard };