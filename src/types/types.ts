export type City = {
  id: string;
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  }
  weather: {
    main: string;
    icon: string;
    description: string;
    wind_speed?: number;
    wind_deg?: number;
  };
  visibility: number;
  coord?: {
    lon: number;
    lat: number;
  };
  base?: string;
  clouds?: {
    all: number;
  };
  dt?: number;
  sys?: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  cod?: number;
};
