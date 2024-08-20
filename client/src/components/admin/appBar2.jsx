import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/system';

const CustomTab = styled(Tab)({
  position: 'relative',
  marginLeft: '20px',
  marginRight: '20px',
  color: 'white',
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
    color: '#1E90FF',
  },
  '&.Mui-selected::after': {
    transform: 'scaleX(1)',
  },
});

const AdminAppBar = ({ onLogout, userType }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const tabs = userType === 'admin' ? [
    { label: 'Home', path: '/admin/home' },
    { label: 'Contact', path: '/admin/contact' },
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Settings', path: '/admin/settings' },
  ] : [
    { label: 'Home', path: '/home' },
    { label: 'My Bookings', path: '/mybookings' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Categories', path: '/categories' },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabs[newValue].path);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/signin');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
        >
          {tabs.map((tab, index) => (
            <CustomTab key={index} label={tab.label} />
          ))}
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