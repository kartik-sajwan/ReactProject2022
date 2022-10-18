import { useState } from "react";
import { IWeather } from "../../interfaces/interfaces";
import { Favs } from "../favs/Favs";
import { Search } from "../search/Search";
import { WeatherCard } from "../weatherCard/weatherCard";
import "./home.scss";

const Home = () => {
  const [searchResult, setSearchResults] = useState<IWeather>({});
  const handleSearchResultUpdate = (result: IWeather) => {
    setSearchResults(result);
  };
  return (
    <div className="home">
      <div className="top-bar">
        <div className="logo"></div>
        <h6>Weather Forecaster</h6>
      </div>
      <Search handleSearchResultUpdate={handleSearchResultUpdate} />
      {searchResult.id && <WeatherCard result={searchResult} />}
      {!searchResult.id && <Favs />}
    </div>
  );
};

export { Home };

