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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0].name.common);
    }
  }, [filteredCountries]);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  }

  const onShowCountry = (country) => {
    setSelectedCountry(country);
  }

  return (<>
    <Filter onChange={onFilterChange} value={filter}/>
    {selectedCountry
      ? <Country name={selectedCountry}/>
      : <CountryList list={filteredCountries} onShowCountry={onShowCountry}/>
    }
  </>)
}

export default App
