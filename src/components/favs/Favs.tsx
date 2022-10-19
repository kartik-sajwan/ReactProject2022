import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Favs.scss";

import moment from "moment";
import { useState } from "react";
import Carousel from "react-simply-carousel";
import { removeFavourite } from "../../app/reducer/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import { IWeather } from "../../interfaces/interfaces";
import { GraphComponent } from "../graphComponent/graphComponent";

const Favs = () => {
  const favourites = useAppSelector((state) => state.weather.favourites);
  const dispatch = useAppDispatch();
  const [activeSlide, setActiveSlide] = useState(0);

  const findIcon = (fav: IWeather) => {
    let icon: any = "";
    fav.weather?.forEach((item) => {
      icon = item.icon;
    });
    return icon;
  };

  const calculate = (val) => {
    const sunrise = moment.unix(val.sys.sunrise);
    const sunset = moment.unix(val.sys.sunset);

    // Find length of day and daylight left
    const now = moment();
    const dayLength = sunset.diff(sunrise, "minutes");
    const daylightLeft = sunset.diff(now, "minutes");

    return {
      dayLenghtHours: Math.floor(dayLength / 60),
      dayLenghtMins: dayLength % 60,
      daylightHours:
        Math.floor(daylightLeft / 60) >= 12
          ? 24 - Math.floor(daylightLeft / 60)
          : Math.floor(daylightLeft / 60),
      daylightMins: daylightLeft % 60,
      expected: moment().add(1, "hours").format("hh:mm A"),
      warning: (Math.trunc(val.clouds.all) > 80 ? true : false),
    };
  };

  return (
    <div className="home-favs">
      {favourites.length > 0 ? (
        <Carousel
          containerProps={{
            style: {
              width: "99.9%",
              justifyContent: "space-between",
              userSelect: "text",
            },
          }}
          activeSlideIndex={activeSlide}
          onRequestChange={setActiveSlide}
          dotsNav={{
            show: true,
            itemBtnProps: {
              style: {
                height: 8,
                width: 8,
                borderRadius: "50%",
                border: 0,
                background: "#ccc",
                margin: "0 0.25rem",
                // position: 'relative',
                // bottom: '44rem',
              },
            },
            activeItemBtnProps: {
              style: {
                height: 8,
                width: 8,
                borderRadius: "50%",
                border: 0,
                background: "#2c2c2c",
                // position: 'relative',
                // bottom: '44rem',
                margin: "0 0.25rem",
              },
            },
          }}
          itemsToShow={1}
          speed={400}
        >
          {favourites.map((val) => {
            const dayDetails = calculate(val);
            return (
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
                {dayDetails.warning && (
        <div className="rain-check">
          <div className="data">
            <p className="warning">&#9888; WARNING</p>
            <div className="expected">
              <div className="item">
                <p>% RAIN</p>
                <p className="value">{val.clouds?.all}%</p>
              </div>
              <div className="item">
                <p>EXP. TIME</p>
                <p className="value">{dayDetails.expected}</p>
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
                    <GraphComponent cityName={val.name} />
                  </div>
                  <div className="daylight">
                    <p>
                      Length of day:{" "}
                      <strong>
                        {dayDetails.dayLenghtHours}H {dayDetails.dayLenghtMins}M
                      </strong>
                    </p>
                    <p>
                      Remaining daylight:{" "}
                      <strong>
                        {dayDetails.daylightHours}H {dayDetails.daylightMins}M
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

const NoResults = () => {
  return (
    <div className="empty-watchlist">
      <div className="clouds"></div>
      <p>No locations added to watchlist</p>
    </div>
  );
};

export { Favs };
