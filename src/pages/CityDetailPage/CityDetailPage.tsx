import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCity } from '../../redux/citySlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchHourlyForecast } from '../../services/weatherService';

const CityDetailPage: React.FC = () => {
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);

  const { id } = useParams<{ id: string }>();
  const selectedCity = useSelector((state: RootState) => state.city.find(city => city.id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    const loadHourlyForecast = async () => {
      const data = await fetchHourlyForecast(id);
      setHourlyForecast(data);
    };
  
    loadHourlyForecast();
  }, [id]);
  
  useEffect(() => {
    const savedCities: any[] = JSON.parse(localStorage.getItem('cities') || '[]');
    const cityFromStorage = savedCities.find(city => city.id === id);
    
    if (cityFromStorage) {
      dispatch(addCity(cityFromStorage));
    }
  }, [dispatch, id]);

  if (!selectedCity) {
    return <Typography variant="h5" color="red">Місто не знайдено</Typography>;
  }

  return (
    <Box p={3}>
      <Typography 
        variant="h2" 
        gutterBottom 
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#2196f3',
          borderBottom: '4px solid #2196f3',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}
      >
        {selectedCity.name.toUpperCase()}
      </Typography>
  
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e8f5e9' }}>
            <Typography 
              variant="h6"
              style={{
                borderBottom: '2px solid #b3dab7',
                paddingBottom: '5px',
                color: '#333'
              }}
            >
              Погода
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
              <img src={`/icons/${selectedCity.weather.icon}.png`} alt={`${selectedCity.weather.icon}`} />
              <Box ml={2}>
                <Typography variant="body1" style={{ marginTop: '10px', fontStyle: 'italic', color: '#555' }}>
                  {selectedCity.weather.description}
                </Typography>
                <Typography variant="body2" style={{ marginTop: '10px', color: '#333' }}>
                  Температура: <strong>{selectedCity.main.temp}°C</strong>
                </Typography>
                <Typography variant="body2" style={{ marginTop: '10px', color: '#333' }}>
                  Відчувається як: <strong>{selectedCity.main.feels_like}°C</strong>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
  
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
            <Typography variant="h6"
              style={{
                borderBottom: '2px solid #add1d6',
                paddingBottom: '5px',
                color: '#333'
              }}
            >Інша інформація</Typography>
            <Box mt={2}>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Вологість: <strong>{selectedCity.main.humidity}%</strong>
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Тиск: <strong>{selectedCity.main.pressure} hPa</strong>
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Хмарність: <strong>{selectedCity.clouds?.all}%</strong>
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Видимість: <strong>{(selectedCity.visibility / 1000) || 'невідома'} km</strong>
              </Typography>

            </Box>
          </Paper>
        </Grid>
  
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fffde7' }}>
            <Typography variant="h6"
              style={{
                borderBottom: '2px solid #ece8b0',
                paddingBottom: '5px',
                color: '#333'
              }}
            >Координати та інше</Typography>
            <Box mt={2}>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Координати: <strong>{selectedCity.coord?.lat}, {selectedCity.coord?.lon}</strong>
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Країна: <strong>{selectedCity.sys?.country}</strong>
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#555' }}>
                Дата та час: <strong>{new Date(selectedCity.dt! * 1000).toLocaleString()}</strong>
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fafafa' }}>
            <Typography 
              variant="h6" 
              style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', color: '#333' }}
            >
              Годинний прогноз температури
            </Typography>
            <Box mt={2}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hourlyForecast}>
                  <XAxis
                    dataKey="dt" 
                    tickFormatter={(unixTime) => new Date(unixTime * 1000).getHours().toString()} 
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value * 1000).toLocaleString()} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="main.temp" 
                    name="Температура" 
                    stroke="#2196f3" 
                    fill="#2196f3" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CityDetailPage;
