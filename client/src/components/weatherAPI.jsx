import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Grid } from '@mui/material';

const WeatherAPI = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState('');

  const searchCity = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=6f9ccc442817d0c523c594c0ae358cd2`
        )
        .then((res) => {
          setWeatherData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      setCityName('');
    }
  };

  return (
    <div>
      <div className='input'>
        <TextField
          type='text'
          onChange={(e) => setCityName(e.target.value)}
          placeholder='Enter City Name'
          value={cityName}
          onKeyDown={searchCity}
          sx={{margin:'15px'}}
        />
      </div>
      <Grid container sx={{ margin: '0 auto', justifyContent: 'center', fontSize:'25px' }}>
        <div className='content'>
          <Grid item>
            {weatherData.main ? <p>{weatherData.name}</p> : null}
          </Grid>
          <Grid item>
            {' '}
            {weatherData.main ? (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt='weather icon'
              />
            ) : null}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div style={{paddingRight:'3px'}}>Conditions:{''} </div>
            {weatherData.main ? (
              <p>{weatherData.weather[0].main}</p>
            ) : null}{' '}
          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{paddingRight:'3px'}}> Temp:</div>
            {weatherData.main ? (
              <p>{weatherData.main.temp.toFixed()}°F </p>
            ) : null}
            
          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-between', marginBottom:'15px' }}>
            {' '}
            Feels Like:{' '}
            {weatherData.main ? (
              <p>{weatherData.main.feels_like.toFixed()} °F</p>
            ) : null}{' '}
            
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default WeatherAPI;
