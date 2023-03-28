import React, {useState} from 'react';
import axios from 'axios';


const WeatherAPI = () => {

    const [weatherData, setWeatherData] = useState({});
    const [cityName, setCityName] = useState('');


    const searchCity = (event) =>{
        if(event.key === 'Enter'){
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=6f9ccc442817d0c523c594c0ae358cd2`)
                .then(res =>{
                    setWeatherData(res.data);
                    console.log(res.data)
                })
                .catch(err => console.log(err));
            setCityName('');
        }
    }



    return (
        <div>
            <div className="input">
                <input type="text" 
                onChange={e => setCityName(e.target.value)} 
                placeholder='Enter City Name'
                value={cityName}
                onKeyDown={searchCity} />
            </div>
            <div className="content">
                <p>{weatherData.name}</p>
                <p>Temp: {weatherData.main ? <p>{weatherData.main.temp.toFixed()} °F</p> :null}</p>
                <p> Feels Like: {weatherData.main ? <p>{weatherData.main.feels_like.toFixed()} °F</p> : null}</p>
            </div>
        </div>
    );
}

export default WeatherAPI;