import "./Favs.scss";
import empty from "../../assets/empty.png";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import { removeFavourite, updateChart } from "../../app/reducer/favouriteSlice";
import moment from "moment";
import { IForecast, IWeather } from "../../interfaces/interfaces";
import { GraphComponent } from "../graphComponent/graphComponent";
import axios from "axios";
import { useState } from "react";

const Favs = () => {
  const favourites = useAppSelector((state) => state.weather.favourites);
  const dispatch = useAppDispatch();
  const [cityForecast, setCityForecast] = useState<IForecast>({});
  const [apiError, setApiError] = useState("");

  const findIcon = (fav: IWeather) => {
    let icon: any = "";
    fav.weather?.map((item) => {
      console.log(item.icon);
      icon = item.icon;
    });
    return icon;
  };

  const drawGraph = (cityName: String) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=34e0733052ac7efacd645cd60b0fc116&units=metric`
      )
      .then(
        (response) => {
          setCityForecast(response.data);

          if (response.data !== cityForecast) {
            const data: number[] = [];
            const label: string[] = [];
            response.data.list?.filter((val) => {
              if (val.dt_txt?.includes("12:00:00")) {
                data.push(val.main?.temp);
                label.push(val.dt_txt?.slice(8, 10));
              }
            });
            dispatch(updateChart({ plots: data, labels: label }));
          }
        },
        (error) => {
          setApiError(error.response.data.message);
        }
      );
  }

  // const sunrise = moment.unix(favourites.sys.sunrise);
  // const sunset = moment.unix(selected.sys.sunset);

  // // Find length of day and daylight left
  // const now = moment()

  // const dayLength = sunset.diff(sunrise, 'minutes');
  // const dayLengthHours = Math.floor(dayLength/60);
  // const dayLengthMins = dayLength % 60;

  // const daylightLeft = sunset.diff(now, 'minutes');
  // const daylightHours = (Math.floor(daylightLeft/60) > 12) ? (24 - Math.floor(daylightLeft/60)) : Math.floor(daylightLeft/60);
  // const daylightMins = daylightLeft % 60;


  return (
    <div className="home-favs">
      {favourites.length > 0 ? (
        favourites.map((val) => (
          <div className="card-wrapper-favs">
            <div className="remove-from-list">
              <button
                onClick={() => {
                  dispatch(removeFavourite(val.id));
                }}
                className="remove"
              >
                Remove
              </button>
            </div>

            <div className="city-detail">
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${findIcon(
                    val
                  )}@2x.png`}
                  alt=""
                />
                <div className="location">
                  <h3>
                    <strong>{val.name}</strong>
                  </h3>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.95159 19.7136C10.5044 21.3753 11.553 21.434 12.2927 19.8498L20.7022 1.82996C21.4419 0.242634 20.7561 -0.441723 19.1705 0.29808L1.15088 8.70681C-0.434702 9.44661 -0.37451 10.4953 1.28552 11.0498L7.78468 13.2153L9.95159 19.7136Z"
                      fill="#2C2C2C"
                    />
                  </svg>
                </div>
                <div className="temperature">
                  <h2>
                    <strong>
                      {val.main?.temp ? Math.trunc(val.main.temp) : ""}
                    </strong>
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
              </div>
            </div>
            <div className="weather-detail">
              <div className="item">
                <p>TIME</p>
                <p className="value">{moment(val.dt).format("hh:mm A")}</p>
              </div>
              <div className="item">
                <p>PRESSURE</p>
                <p className="value">{val.main?.pressure}</p>
              </div>
              <div className="item">
                <p>% RAIN</p>
                <p className="value">{val.clouds?.all}%</p>
              </div>
              <div className="item">
                <p>HUMIDITY</p>
                <p className="value">{val.main?.humidity}</p>
              </div>
            </div>
            <div className="graph-wrapper">
              <h5>UPCOMING DAYS</h5>
              <div className="graph">
              
                <GraphComponent />
              </div>
              <div className="daylight">
                <p>
                  Length of day:{" "}
                  <strong>
                    {/* {dayLengthHours}H {dayLengthMins}M */}
                  </strong>
                </p>
                <p>
                  Remaining daylight:{" "}
                  <strong>
                    {/* {daylightHours}H {daylightMins}M */}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoResults />
      )}
    </div>
  );
};

const NoResults = () => {
  return (
    <div className="empty-watchlist">
      <img src={empty} alt="" />
      <p>No locations added to watchlist</p>
    </div>
  );
};

export { Favs };
