import {useEffect, useState} from 'react'
import {Filter} from "./Filter/Filter.jsx";
import {Country} from "./Country/Country.jsx";
import {CountryList} from "./CountryList/CountryList.jsx";
import axios from "axios";

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => (setCountries(response.data)))
      .catch(error => console.error('countries', error));
  }, [])

  const searchString = filter.trim().toLowerCase();
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(searchString));
  const showSingle = (filteredCountries && filteredCountries.length === 1);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  }

  const onShowCountry = (e) => {
    setSelectedCountry(e.target.dataset.country);
  }

  return (<>
    <Filter onChange={onFilterChange} filter={filter}/>
    {(selectedCountry || showSingle)
      ? <Country name={selectedCountry ? selectedCountry : filteredCountries[0].name.common}/>
      : <CountryList list={filteredCountries} onShowCountry={onShowCountry}/>
    }
  </>)
}

export default App
