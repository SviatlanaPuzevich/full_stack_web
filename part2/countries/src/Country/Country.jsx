import {useEffect, useState} from "react";
import axios from "axios";
import {CapitalWeather} from "../CapitalWeather/CapitalWeather.jsx";

export const Country = ({name}) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => setCountry(res.data))
      .catch(console.error)
  }, [name]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return <div>
    <h1>{country.name.official}</h1>
    <p>{`Capital ${country.capital.join(',')}`}</p>
    <p>{`Area ${country.area}`}</p>
    <h1>Languages</h1>
    <ul>
      {Object.values(country.languages).map((item, i) => <li key={i}>{item}</li>)}
    </ul>
    <img src={country.flags.svg} alt={country.flags.alt} width="200px" />
    <CapitalWeather city={country.capital[0]}/>
  </div>
}