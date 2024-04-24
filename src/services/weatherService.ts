import axios from 'axios';
import { City } from '../types/types';

export const WEATHER_API_KEY = '2b1732bf85f0be6a3d73f190e15333cd';
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchHourlyForecast = async (id?: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/forecast?id=${id}&exclude=current,minutely,daily,alerts&units=metric&appid=${WEATHER_API_KEY}`
    );

    return response.data.list;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    return [];
  }
};

export const fetchWeatherByCityName = async (cityName: string): Promise<City | null> => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
    );

    return transformWeatherResponse(response.data);
  } catch (error) {
    console.error('Error fetching weather by city name:', error);
    return null;
  }
};

export const fetchWeatherById = async (id: string): Promise<City | null> => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}/weather?id=${id}&units=metric&appid=${WEATHER_API_KEY}`
    );

    return transformWeatherResponse(response.data);
  } catch (error) {
    console.error('Error fetching weather by ID:', error);
    return null;
  }
};

const transformWeatherResponse = (data: any): City => {
  return {
    id: data.id.toString(),
    name: data.name,
    main: {
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      temp: data.main.temp,
    },
    weather: {
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      description: data.weather[0].description,
    },
    coord: {
      lon: data.coord.lon,
      lat: data.coord.lat,
    },
    base: data.base,
    visibility: data.visibility,
    clouds: {
      all: data.clouds.all,
    },
    dt: data.dt,
    sys: {
      country: data.sys.country,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    },
    timezone: data.timezone,
    cod: data.cod,
  };
};
