import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#2196f3', marginBottom: '20px' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
            Weather App
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;