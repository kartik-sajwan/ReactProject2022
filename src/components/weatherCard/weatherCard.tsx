import { useNavigate } from "react-router-dom";
import { addSelected } from "../../app/reducer/favouriteSlice";
import { useAppDispatch } from "../../app/reducer/hook";
import { IWeather } from "../../interfaces/interfaces";
import "./weatherCard.scss";

type WeatherProp = {
  result: IWeather;
};

const WeatherCard: React.FC<WeatherProp> = (cityWeather) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const icon: any =
    cityWeather.result.weather?.map((item) => {
      return item.icon;
    }) ?? "";
  const description: any =
    cityWeather.result.weather?.map((item) => {
      return item.description;
    }) ?? "";
  const temp: any = cityWeather.result.main?.temp
    ? Math.trunc(cityWeather.result.main.temp)
    : "";

  //Show warning based on cloudiness
  const cloudiness: any = cityWeather.result.clouds?.all
    ? Math.trunc(cityWeather.result.clouds?.all)
    : "";
  const warning: boolean = cloudiness > 80 ? true : false;

  return (
    <div
      className="card-wrapper"
      onClick={() => {
        dispatch(addSelected(cityWeather.result));
        navigate("/weatherdetail");
      }}
    >
      <div className="city-details">
        <h3>
          <strong>{cityWeather.result.name}</strong>
        </h3>
        <div className="temperature">
          <h2>
            <strong>{temp}</strong>
          </h2>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="4"
              cy="4"
              r="3.25"
              stroke="#2C2C2C"
              stroke-width="1.5"
            />
          </svg>
        </div>
        {warning && <p className="warning">&#9888; WARNING</p>}
      </div>
      <div className="brief-weather">
        <div className="forward"></div>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        {warning && <p className="warning">Expecting Rainfall</p>}
        {!warning && <p className="desc">{description}</p>}
      </div>
    </div>
  );
};

export { WeatherCard };

