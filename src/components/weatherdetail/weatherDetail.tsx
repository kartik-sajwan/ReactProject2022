import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addFavourite,
  clearSelected,
  removeFavourite,
} from "../../app/reducer/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import { GraphComponent } from "../graphComponent/graphComponent";
import "./weatherDetail.scss";

import moment from "moment";

const WeatherDetail = () => {
  const { favourites, selected } = useAppSelector((state) => state.weather);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    //   if (selected.name="") {
    //     navigateTo("/home")
    //  }
    const isSelectedInFavourites = () => {
      favourites.forEach((fav) => {
        if (fav.id === selected?.id) {
          setIsFavourite(true);
        }
      });
    };
    isSelectedInFavourites();
  }, [favourites, selected]);

  //Get weather icon
  const icon: any =
    selected?.weather?.map((item) => {
      return item.icon;
    }) ?? "";

  const temp: any = Math.round(selected?.main?.temp);
  const time = moment(selected?.dt).format("hh:mm A");

  const sunrise = moment.unix(selected?.sys?.sunrise);
  const sunset = moment.unix(selected?.sys?.sunset);

  // Find length of day and daylight left
  const now = moment();

  const dayLength = sunset.diff(sunrise, "minutes");
  const dayLengthHours = Math.floor(dayLength / 60);
  const dayLengthMins = dayLength % 60;

  const daylightLeft = sunset.diff(now, "minutes");
  const daylightHours =
    Math.floor(daylightLeft / 60) >= 12
      ? 24 - Math.floor(daylightLeft / 60)
      : Math.floor(daylightLeft / 60);
  const daylightMins = daylightLeft % 60;

  const expected = moment().add(1, "hours").format("HH:mm a");
  const cloudiness: any = selected.clouds?.all
    ? Math.trunc(selected.clouds?.all)
    : "";
  const warning: boolean = cloudiness > 80 ? true : false;

  return (
    <div className="card-wrapper-details">
      <div className="top-bar">
        <div className="logo"></div>
        <h6>Weather Forecaster</h6>
      </div>
      <div className="action-btn">
        <div className="go-back">
          <button
            className="back-icon"
            onClick={() => {
              dispatch(clearSelected({}));
              navigateTo("/home");
            }}
          ></button>
          <button
            className="back-btn"
            onClick={() => {
              dispatch(clearSelected({}));
              navigateTo("/home");
            }}
          >
            Back
          </button>
        </div>

        <div className="add-to-favs">
          {!isFavourite && (
            <div className="add-to-list">
              <button
                onClick={() => {
                  dispatch(addFavourite(selected));
                  setIsFavourite(true);
                }}
              >
                <strong>Add to list</strong>
              </button>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM6.3 3.5V6.3H3.5V7.7H6.3V10.5H7.7V7.7H10.5V6.3H7.7V3.5H6.3ZM1.39994 7.00008C1.39994 10.0871 3.91294 12.6001 6.99994 12.6001C10.0869 12.6001 12.5999 10.0871 12.5999 7.00008C12.5999 3.91309 10.0869 1.40009 6.99994 1.40009C3.91294 1.40009 1.39994 3.91309 1.39994 7.00008Z"
                  fill="#2C2C2C"
                />
              </svg>
            </div>
          )}
          {isFavourite && (
            <div className="remove-from-list">
              <label className="added">Added to list &#10003;</label>
              <button
                onClick={() => {
                  dispatch(removeFavourite(selected));
                  setIsFavourite(false);
                }}
                className="remove"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="city-detail">
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
          />
          <div className="location">
            <h3>
              <strong>{selected.name}</strong>
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
        </div>
      </div>

      {warning && (
        <div className="rain-check">
          <div className="data">
            <p className="warning">&#9888; WARNING</p>
            <div className="expected">
              <div className="item">
                <p>% RAIN</p>
                <p className="value">{selected.clouds?.all}</p>
              </div>
              <div className="item">
                <p>EXP. TIME</p>
                <p className="value">{expected}</p>
              </div>
            </div>
            <p className="warning">Expecting Rainfall</p>
          </div>
          <div className="image">
            <div className="rain-img"></div>
          </div>
        </div>
      )}

      <div className="weather-detail">
        <div className="item">
          <p>TIME</p>
          <p className="value">{time}</p>
        </div>
        <div className="item">
          <p>PRESSURE</p>
          <p className="value">{selected.main?.pressure}</p>
        </div>
        <div className="item">
          <p>% RAIN</p>
          <p className="value">{selected.clouds?.all}%</p>
        </div>
        <div className="item">
          <p>HUMIDITY</p>
          <p className="value">{selected.main?.humidity}</p>
        </div>
      </div>

      <div className="graph-wrapper">
        <h5>UPCOMING DAYS</h5>
        <div className="graph">
          <GraphComponent cityName={selected.name} />
        </div>
        <div className="daylight">
          <p>
            Length of day:{" "}
            <strong>
              {dayLengthHours}H {dayLengthMins}M
            </strong>
          </p>
          <p>
            Remaining daylight:{" "}
            <strong>
              {daylightHours}H {daylightMins}M
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export { WeatherDetail };
