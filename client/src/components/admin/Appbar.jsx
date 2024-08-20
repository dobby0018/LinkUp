import  { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const CustomTab = styled(Tab)({
  position: 'relative',
  marginLeft: '20px', // Added spacing between the tabs
  marginRight: '20px',
  color: 'white', // Text color for the tabs
  transition: 'color 0.3s ease',

  '&:hover': {
    color: '#1E90FF',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '2px',
    backgroundColor: '#1E90FF',
    transition: 'transform 0.3s ease',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
  '&.Mui-selected': {
    color: '#1E90FF', // Color when selected
  },
  '&.Mui-selected::after': {
    transform: 'scaleX(1)', // Keep the line under the selected tab
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus::after': {
    transform: 'scaleX(0)',
  },
});

const AdminAppBar = ({ value, setValue, handleLogout }) => {
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            centered 
            TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }} // Hide default tab indicator
          >
            <CustomTab label="Home" />
            <CustomTab label="Contact" />
            <CustomTab label="Dashboard" />
            <CustomTab label="Settings" />
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default AdminAppBar;