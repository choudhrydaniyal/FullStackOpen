import { useEffect, useState } from "react";
import axios from "axios";
import "../src/index.css";

const api_key = import.meta.env.VITE_WEATHER_KEY;

const Countries = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.map((c) => (
        <p key={c}>
          {c} <button onClick={() => handleShow(c)}>Show</button>
        </p>
      ))}
    </div>
  );
};

const CountryData = ({ countryData }) => {
  if (countryData && Object.keys(countryData).length > 0) {
    return (
      <div>
        <h1>{countryData.name}</h1>
        <p>Capital: {countryData.capital}</p>
        <p>Area: {countryData.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(countryData.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={countryData.flag} alt={`Flag of ${countryData.name}`}></img>
        <h2>Weather in {countryData.capital}</h2>
        <p>Temperature: {countryData.temperature} Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${countryData.icon}@2x.png`}
          alt="Weather icon"
        ></img>
        <p>Wind: {countryData.wind} m/s</p>
      </div>
    );
  }
  return null;
};

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({});

  const [countryList, setCountryList] = useState([]);

  const handleChange = (event) => {
    let tempValue = event.target.value;
    console.log("Country: ", tempValue);
    setCountry(tempValue);
    setCountries(
      countryList.filter((c) =>
        c.toLowerCase().includes(tempValue.toLowerCase())
      )
    );
    setCountryData({});
  };

  const handleShow = (country) => {
    setCountry(country);
    setCountries([country]);
  };

  useEffect(() => {
    console.log("Fetching all countries....");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log("Done!");

        const tempAllCountries = response.data.map((c) => c.name.common);
        setCountryList(tempAllCountries);
        console.log("All countries: ", tempAllCountries);
      })
      .catch((err) => {
        console.log("Error fetching all countries!", err);
      });
  }, []);

  useEffect(() => {
    if (countries.length === 1) {
      console.log("Fetching country data....");
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${countries[0]}`
        )
        .then((response) => {
          console.log("Done!");
          const data = response.data;
          console.log("Response: ", data);

          return axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${api_key}&units=metric`
            )
            .then((weatherResponse) => {
              return { weatherData: weatherResponse.data, data };
            });
        })
        .then(({ weatherData, data }) => {
          setCountryData({
            name: data.name.common,
            capital: data.capital ? data.capital[0] : "N/A",
            area: data.area,
            languages: data.languages,
            flag: data.flags.png,
            temperature: weatherData.main.temp,
            icon: weatherData.weather[0].icon,
            wind: weatherData.wind.speed,
          });
        })
        .catch((err) => {
          console.log("Error fetching country data!", err);
        });
    }
  }, [countries]);

  return (
    <>
      <div>
        Find Countries: <input value={country} onChange={handleChange} />
      </div>
      {countries.length === 1 ? (
        <CountryData countryData={countryData} />
      ) : countries.length <= 10 ? (
        <>
          <Countries countries={countries} handleShow={handleShow} />
          <h3>No. of countries: {countries.length}</h3>
        </>
      ) : (
        <p>Too many matches, specify more</p>
      )}
    </>
  );
}

export default App;
