import { Component, useEffect, useState } from "react";
import "./carousel.scss";
import empty from "../../assets/empty.png";

import Slider from "react-slick";
import moment from "moment";
import { removeFavourite } from "../../app/reducer/favouriteSlice";
import { useAppSelector, useAppDispatch } from "../../app/reducer/hook";
import { IWeather } from "../../interfaces/interfaces";


const Carousel = () => {

	const favourites = useAppSelector((state) => state.weather.favourites);
	const dispatch = useAppDispatch();
	
	const findIcon = (fav: IWeather) => {
	let icon: any = "";
				fav.weather?.map((item) => {
					console.log(item.icon);
					icon = item.icon;
				});
				return icon;
	}

	const data: String[] = ["1", "2", "3"]
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselInfiniteScroll = () => {
	if(currentIndex === data.length-1) {
		return setCurrentIndex(0);
	}
	return setCurrentIndex(currentIndex+1);
	}

	useEffect(() => {
	const interval = setInterval(() => {
		carouselInfiniteScroll()}, 3000)
		return () => clearInterval(interval);
	})
	return (
<div style={{transform: `translate(-${currentIndex * 100}%)`}}>
      {favourites.length > 0 ? (
        favourites.map((val) => 
        <div className="card-wrapper-favs">

          <div className="remove-from-list">
            <button
              onClick={() => {dispatch(removeFavourite(val.id))}}
              className="remove"
            >
              Remove
            </button>
          </div>

        <div className="city-detail">
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${findIcon(val)}@2x.png`}
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
                <strong>{val.main?.temp ? Math.trunc(val.main.temp) : ""}</strong>
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
        <div className="graph">Graph</div>
    </div>
      )) : (
        // <NoResults />
		<div></div>
      )}

    </div>
	);
};

export { Carousel }