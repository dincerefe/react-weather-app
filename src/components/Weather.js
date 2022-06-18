import { useCity } from "../context/CityContext";
import axios from "axios";
import { useEffect, useState } from "react";

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
// `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API}`
function Weather() {
  const API = "6dc83ed75396ba6c42f971f48a41dddc";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { city } = useCity();

  const getDayName = (data, index) => {
    var allDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(data.daily[index].dt * 1000); // to get the DateTime.
    var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array.
    return dayName;
  };

  useEffect(() => {
    setLoading(true);
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
    )
      .then((res) => res.data)
      .then((res) =>
        axios(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${API}&units=metric`
        )
      )
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, [city]);
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {!loading && data && (
        <ul className="weather">
          {data.daily.slice(0, data.daily.length - 1).map((day, index) => {
            return (
              <li key={index}>
                <h4>{getDayName(data, index)}</h4>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt=""
                ></img>
                <p className="description">{day.weather[0].description}</p>
                <p className="temp">
                  {day.temp.day}°C - {day.temp.night}°C
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Weather;
