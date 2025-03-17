import React, { useState, useEffect } from 'react';

interface DateTimeWeatherProps {
  city: string;
  continent: string;
  isDark: boolean;
}

interface WeatherData {
  main?: {
    temp?: number;
  };
  timezone?: number; 
}

const DateTimeWeather: React.FC<DateTimeWeatherProps> = ({ city, continent, isDark }) => {
  const [localTime, setLocalTime] = useState<Date>(new Date());
  const [weatherData, setWeatherData] = useState<WeatherData>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3580d3c7e78513d1cccacfaf2d6ed95&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        
        // Mettre à jour l'heure locale immédiatement après la réception des données
        if (data.timezone) {
          const utcNow = Date.now() + (new Date().getTimezoneOffset() * 60000);
          const cityTime = new Date(utcNow + data.timezone * 1000);
          setLocalTime(cityTime);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    // Mettre à jour l'heure toutes les secondes
    const intervalId = setInterval(() => {
      if (weatherData.timezone) {
        const utcNow = Date.now() + (new Date().getTimezoneOffset() * 60000);
        const cityTime = new Date(utcNow + weatherData.timezone * 1000);
        setLocalTime(cityTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [city, weatherData.timezone]);

  return (
    <div
      className={`rounded-[20px] p-4 flex justify-between items-end h-full ${
        isDark ? 'bg-grayDark text-white' : 'bg-[#F3F0E6] text-black'
      }`}
    >
      <div className="flex flex-col">
        <div className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          {localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </div>
        <div className={`text-[14px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          {localTime.toLocaleDateString('en-US', {
            weekday: 'long',
          })}
        </div>
        <div className={`text-[14px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          {localTime.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long'
          })}
        </div>
        <div className={`text-[13px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          {city}
        </div>
        <div className={`text-[12px] ${isDark ? 'text-white' : 'text-black'}`}>
          {continent}
        </div>
      </div>
      {weatherData.main?.temp !== undefined && (
        <div
          className={`h-[49px] w-[49px] flex items-center justify-center rounded-full ${
            isDark ? 'bg-[#E0E0E0] text-[#707070]' : 'bg-black text-white'
          }`}
        >
          {Math.round(weatherData.main.temp)}°
        </div>
      )}
    </div>
  );
};

export default DateTimeWeather;