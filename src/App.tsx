import React, { useState } from 'react';
import './App.scss';
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";


import { Search } from "./components/search/Search";
import { Favs } from './components/favs/Favs';
import { WeatherCard } from "./components/weatherCard/weatherCard";
import { IWeather } from './interfaces/interfaces';
import { useAppDispatch, useAppSelector } from './app/reducer/hook';

function App() {

  const [searchResult, setSearchResults] = useState<IWeather>({})
  const handleSearchResultUpdate = (result: IWeather) => {
    setSearchResults(result);
  }

  return (
    <div className="App">
        <Search handleSearchResultUpdate={handleSearchResultUpdate}/>
        <WeatherCard result={searchResult}  />
        <Favs />
    </div>
  );
}

export default App;
