import './Search.scss';
import { useState } from 'react';
import cities from "../../assets/cities.json"
import { ICity } from '../../interfaces/interfaces';
import { Tag } from './tag/Tag';
import axios from 'axios';
import { IWeather } from '../../interfaces/interfaces';

type SearchProps = {
	handleSearchResultUpdate: (result: IWeather) => void;
}
const Search: React.FC<SearchProps> = ({handleSearchResultUpdate}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [citiesList, readCities] = useState(cities);
	const [citySuggestions, setSuggestions] = useState<ICity[]>([])
	const [cityWeather, setCityWeather] = useState<IWeather>({})
	const [apiError, setApiError] = useState("");

	//Suggestions for searchTerm from citiesList
	const suggestCities = (searchTerm: string, topFifty: ICity[] = []) => {
		citiesList.filter((val) => {
			if(searchTerm === "") {
				return "";
			} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				topFifty.push({id: val.id, name: val.name});
			}
			setSuggestions([...topFifty].slice(0, 5));
		});
	};

	const handleSearch = (searchTerm: string, response: IWeather = {}) => {
	axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=34e0733052ac7efacd645cd60b0fc116&units=metric`)
      .then(
        (response) => {
          setSearchTerm("");
		  setCityWeather(response.data);
		  handleSearchResultUpdate(response.data);
        },
        (error) => {
			setApiError(error.response.data.message);
			alert(error.response.data.message);
			setSearchTerm("");
        }
      )
	}

	const fillSearchTerm = (selectedCity: string) => {
		setSuggestions([]);
		setSearchTerm(selectedCity);
	};
	
	return(
		<div className="search">
			<div className='search-bar'>
				<input 
					type="search" 
					className="search-bar-input" 
					placeholder="Search Location"
					value={searchTerm}
					onChange={(event) => {
						setSearchTerm(event.target.value);
						suggestCities(searchTerm);
					}}
				/>
				<button className='search-btn' onClick={() => {handleSearch(searchTerm); fillSearchTerm(searchTerm)}}></button>
			</div>
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