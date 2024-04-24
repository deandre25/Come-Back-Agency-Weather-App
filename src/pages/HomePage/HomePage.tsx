import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { addCity, removeCity, updateWeather } from '../../redux/citySlice';
import { RootState } from '../../redux/store';
import CityCard from '../../components/CityCard';
import { City } from '../../types/types';
import { fetchWeatherByCityName, fetchWeatherById } from '../../services/weatherService';

const HomePage: React.FC = () => {
  const [newCityName, setNewCityName] = useState<string>('');

  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.city);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    savedCities.forEach((city: any) => dispatch(addCity(city)));
  }, [dispatch]);

  const handleAddCity = async (cityName: string) => {
    const newCity = await fetchWeatherByCityName(cityName);

    if (newCity) {
      dispatch(addCity(newCity));

      const savedCities: City[] = JSON.parse(localStorage.getItem('cities') || '[]');
      savedCities.push(newCity);
      localStorage.setItem('cities', JSON.stringify(savedCities));
    }
  };

  const handleRemoveCity = (id: string) => {
    dispatch(removeCity(id));
    const updatedCities = cities.filter((city) => city.id !== id);
    localStorage.setItem('cities', JSON.stringify(updatedCities));
  };

  const handleUpdateWeather = async (id: string) => {
    const updatedCity = await fetchWeatherById(id);

    if (updatedCity) {
      dispatch(updateWeather(updatedCity));

      const savedCities: City[] = JSON.parse(localStorage.getItem('cities') || '[]');
      const updatedCities = savedCities.map(city => city.id === id ? updatedCity : city);
      localStorage.setItem('cities', JSON.stringify(updatedCities));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newCityName.trim()) {
      handleAddCity(newCityName);
      setNewCityName('');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Введіть назву міста"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
          />
          <Button
            variant="contained" 
            color="primary" 
            type="submit"
            style={{ marginTop: '16px' }}
          >
            Додати
          </Button>
        </form>
      </Box>
      <Box mt={3}>
        {cities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard
              key={city.id}
              city={city}
              onRemove={() => handleRemoveCity(city.id)}
              onUpdate={() => handleUpdateWeather(city.id)}
            />
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
