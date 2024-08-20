import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


const defaultTheme = createTheme();

export default function SignIn({onLogin}) {
  const navigate = useNavigate();

  // State for form data, errors, and success messages
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginAs: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(''); // For success messages

  // Validate fields locally
  const validateFields = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.loginAs) newErrors.loginAs = 'Please select a role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFields()) return; // Prevent submission if validation fails

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType',formData.loginAs);
        localStorage.setItem('loggedIn',true);
        setSuccess('Login was successful!');
        
       
        if (formData.loginAs === 'admin') {
          setTimeout(() => {
            onLogin(formData.loginAs);
            navigate('/admin/home'); // Redirect to home after a delay
          }, 1500);
        } else {
          setTimeout(() => {
            onLogin(formData.loginAs);
            navigate('/home'); // Redirect to home after a delay
          }, 1500);
        } 
 // Redirect after 1.5 seconds
      } else {
        setErrors({ global: data.error.message || 'Failed to sign in' });
      }
    } catch (error) {
      setErrors({ global: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || ''}
            />
            <RadioGroup
              aria-label="login-as"
              name="loginAs"
              value={formData.loginAs}
              onChange={handleChange}
              sx={{ flexDirection: 'row', mt: 2 }}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="User"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
            {errors.loginAs && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errors.loginAs}
              </Typography>
            )}
            {errors.global && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.global}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => navigate('/signup')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
