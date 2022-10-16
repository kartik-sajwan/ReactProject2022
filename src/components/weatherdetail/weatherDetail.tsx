import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFavourite, clearSelected } from "../../app/reducer/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import "./weatherDetail.scss";
import { IWeather } from "../../interfaces/interfaces";
import { bool } from "prop-types";
import { boolean } from "yargs";
import moment from 'moment';


const WeatherDetail = () => {
  const {favourites, selected} = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const isSelectedInFavourites = () => {
    favourites.map((fav) => {
      if(fav.id === selected.id) { return true; }
    })
  }

  const icon: any = selected.weather?.map((item) => {return item.icon}) ?? "";
  const temp: any = (selected.main?.temp) ?  Math.trunc(selected.main.temp) : "";
  const time = moment(selected.dt).format('hh:mm A');

  return (
    <div className="card-wrapper-details">
      <div className="action-btn">
        <button className="back-btn" onClick={() => {dispatch(clearSelected({}));navigateTo("/home")}}></button>
        <div className="add-to-favs">
          <button className="add-to-list">Add to list</button>
          <button className="add-to-list-icon"></button>
          {false && <div className="remove-from-list">
            <button>Added to list</button>
            <button>Remove</button>
            </div>
          }
        </div>
      </div>
      <div className="city-detail">
        <div>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div className="location"><h3><strong>{selected.name}</strong></h3><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.95159 19.7136C10.5044 21.3753 11.553 21.434 12.2927 19.8498L20.7022 1.82996C21.4419 0.242634 20.7561 -0.441723 19.1705 0.29808L1.15088 8.70681C-0.434702 9.44661 -0.37451 10.4953 1.28552 11.0498L7.78468 13.2153L9.95159 19.7136Z" fill="#2C2C2C"/>
          </svg>
        </div>
        <div className="temperature">
          <h2><strong>{temp}</strong></h2><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="3.25" stroke="#2C2C2C" stroke-width="1.5"/>
            </svg>
        </div>
        
        
        </div>
      </div>
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
      <div className="graph">Graph</div>
      
      {/* <button onClick={() => {dispatch(clearSelected({}));navigateTo("/home")}}>
        Back
      </button>
      {selected.name}
      <button onClick={() => dispatch(addFavourite(selected))}>
        Add To fav
      </button> */}


    </div>
  );
};

export { WeatherDetail };
