import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { City } from '../../types/types';

interface CityCardProps {
  city: City;
  onRemove: () => void;
  onUpdate: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onRemove, onUpdate }) => {
  return (
    <Card style={{ marginBottom: '20px', backgroundColor: "#F5F5DC" }} variant="outlined">
      <img
        src={`/icons/${city.weather.icon}.png`}
        alt={city.weather.description}
      />
      <CardContent>
        <Typography variant="h5" style={{fontWeight: 600, letterSpacing: 1}} component="div">
          {city.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {city.weather.description.toUpperCase()}
        </Typography>
        <Typography variant="h3">
          {Math.round(city.main.temp)}°C
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onUpdate}
            style={{width: "200px", margin: "5px 0"}}
          >
            Оновити погоду
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={onRemove}
            style={{width: "200px", margin: "5px 0"}}
          >
            Видалити
          </Button>
          <Link to={`/city/${city.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button
              variant="contained"
              color="inherit"
              style={{width: "200px", margin: "5px 0"}}
            >
              Детально
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityCard;
