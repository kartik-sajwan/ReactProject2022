import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFavourite, clearSelected } from "../../app/reducer/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../app/reducer/hook";
import "./weatherDetail.scss";
import { IWeather } from "../../interfaces/interfaces";


const WeatherDetail = () => {
  const {favourites, selected} = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  return (
    <div>
      <button onClick={() => {dispatch(clearSelected({}));navigateTo("/home")}}>
        Back
      </button>
      {selected.name}
      <button onClick={() => dispatch(addFavourite(selected))}>
        Add To fav
      </button>
    </div>
  );
};

export { WeatherDetail };
