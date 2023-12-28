import "./App.css";
import React, { useState } from "react";


const api = {
  key: "7300b205f64c52e1e9827771f4453b55",
  base: "https://api.openweathermap.org/data/2.5/",
};
const api2 = {
  key: "1AUaKmDnwVZyOicpsnjdFhgLqFTVS0Urm7PRnZgtCtJpunBjsP95VfOW",
  base: "https://api.pexels.com/v1/search/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [background, setBackground] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
        setSearch("");
      });

    fetch(`${api2.base}?query=${search}&per_page=1`, {
      headers: {
        Authorization: `${api2.key}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBackground(data);
      });
  };
  return (
    <div className="App">
      <div className="content-left">
        <h1>Météo city</h1>
        <header className="App-header">
          <div className="bouton">
            <input
              type="text"
              placeholder="Entrer la ville"
              onChange={(e) => setSearch(e.target.value)}
            />
            <a className="btn-epic" onClick={searchPressed}>
              <div>
                <span>Rechercher</span>
                <span>Rechercher</span>
              </div>
            </a>
          </div>
          {typeof weather.main !== "undefined" ? (
            <div className="info_weather">
              <p> {weather.name}</p>
              <div className="line"></div>
              <p> {weather.main.temp} °C</p>
            </div>
          ) : null}
        </header>
      </div>
      <div className="content-right">
        <div>
          {background &&
          background.photos &&
          Array.isArray(background.photos) &&
          background.photos.length > 0 ? (       
            <div className="myImage">
              <img
                src={background.photos[0].src.portrait}
                alt={background.photos[0].alt}
                style={{ objectFit: "cover", maxHeight: "100vh", maxWidth:"100%" }}
              />
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
