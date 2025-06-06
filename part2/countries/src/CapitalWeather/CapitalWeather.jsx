import {useEffect, useState} from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

export const CapitalWeather = ({city}) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
      .then(res => res.data[0])
      .then(coding => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coding.lat}&lon=${coding.lon}&units=metric&appid=${api_key}`))
      .then(res => {
        setWeather(res.data);
      })
  }, [city]);
  if (!weather) {
    return <div>Loading...</div>;
  }
  return <div>
    <h1>{`Weather in ${city}`}</h1>
    <p>{`Temperature ${weather.main.temp} Celsius`}</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.description}/>
    <p>{`Wind ${weather.wind.speed} m/s`}</p>
  </div>
}