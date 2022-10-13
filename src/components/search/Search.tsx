import React, { useEffect } from 'react';
import './Search.scss';
import { useState } from 'react';
import cities from "../../assets/cities.json"
import { ICity } from '../../interfaces/interfaces';
import { Tag } from './tag/Tag';

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [citiesList, readCities] = useState(cities);
	const [citySuggestions, setSuggestions] = useState<ICity[]>([])

	const suggestCities = (searchTerm: string, topFifty: ICity[] = []) => {
		citiesList.filter((val) => {
			if(searchTerm === "") {
				return "";
			} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				topFifty.push({id: val.id, name: val.name});
			}
			setSuggestions([...topFifty].slice(0, 50));
		});
	};

	const fillSearchTerm = (selectedCity: string) => {
		console.log('called onClick', selectedCity)
		setSuggestions([]);
		setSearchTerm(selectedCity);
	};
	
	return(
		<div className="search">
			<input 
				type="search" 
				className="search-bar" 
				placeholder="Search Location"
				value={searchTerm}
				onChange={(event) => {
					setSearchTerm(event.target.value);
					suggestCities(searchTerm);
				}}
			/>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.71 11H12.5L17.49 16L16 17.49L11 12.5V11.71L10.73 11.43C9.59 12.41 8.11 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 8.11 12.41 9.59 11.43 10.73L11.71 11ZM2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5C11 4.01 8.99 2 6.5 2C4.01 2 2 4.01 2 6.5Z" fill="#C4C4C4"/>
			</svg>

			<div className="tag-container">
				{searchTerm?.length && citySuggestions?.length
					? citySuggestions?.map((city) => (
						<div className="space" key={city.id}>
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