import axios from "axios";
import { useState } from "react";
import cities from "../../assets/cities.json";
import { ICity, IWeather } from "../../interfaces/interfaces";
import "./Search.scss";
import { Tag } from "./tag/Tag";

type SearchProps = {
  handleSearchResultUpdate: (result: IWeather) => void;
};
const Search: React.FC<SearchProps> = ({ handleSearchResultUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [citiesList, setCitiesList] = useState(cities);
  const [citySuggestions, setSuggestions] = useState<ICity[]>([]);
  const [apiError, setApiError] = useState("");

  setCitiesList(cities);
  //Suggestions for searchTerm from citiesList
  const suggestCities = (searchTerm: string, topFifty: ICity[] = []) => {
    citiesList.filter((val) => {
      if (searchTerm === "") {
        return "";
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        topFifty.push({ id: val.id, name: val.name });
      }
      return([...topFifty].slice(0, 5));
    });
	return ([]);
  };

  const handleSearch = (searchTerm: string, response: IWeather = {}) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=34e0733052ac7efacd645cd60b0fc116&units=metric`
      )
      .then(
        (response) => {
          setSearchTerm("");
          handleSearchResultUpdate(response.data);
        },
        (error) => {
          setApiError(error.response.data.message);
          setSearchTerm("");
        }
      );
  };

  const fillSearchTerm = (selectedCity: string) => {
    setSuggestions([]);
    setSearchTerm(selectedCity);
  };

  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="search"
          className="search-bar-input"
          placeholder="Search Location"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setSuggestions(suggestCities(searchTerm));
            setApiError("");
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            handleSearch(searchTerm);
            fillSearchTerm(searchTerm);
          }}
        ></button>
      </div>
      <p className="api-error">{apiError}</p>
      <div className="tag-container">
        {searchTerm?.length && citySuggestions?.length
          ? citySuggestions?.map((city) => (
              <div className="city" key={city.id}>
                <Tag
                  label={city.name}
                  type="tag"
                  onClick={() => fillSearchTerm(city?.name)}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export { Search };

