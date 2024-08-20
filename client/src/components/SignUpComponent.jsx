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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  // State variable for all form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    otp: '',
    accountType: '',
  });

  // State variable for error messages per field
  const [errors, setErrors] = useState({});

  // State variable for the current step (1 or 2)
  const [step, setStep] = useState(1);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle send OTP API request
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.accountType) {
      setErrors({ accountType: 'Please select an account type' });
      return;
    } // Prevent the default form submission
    try {
      const response = await fetch('http://localhost:5000/api/users/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType, // Add this line
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setStep(2);
      } else {
        if (data.error === 'User already exists with this email') {
          setErrors({ email: 'User already exists with this email' });
        } else {
          setErrors(parseErrorMessages(data.error));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ global: 'An unexpected error occurred. Please try again.' });
    }
  };

  // Handle verify OTP API request
  const handleVerifyOTP = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch('http://localhost:5000/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType,
          otp: formData.otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/signin'); // Redirect to sign in page on success
      } else {
        setErrors(parseErrorMessages(data.error));
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ global: 'An unexpected error occurred. Please try again.' });
    }
  };

  // Function to parse error messages and map them to fields
  const parseErrorMessages = (errorString) => {
    const errorObject = {};
    if (errorString) {
      const errorArray = errorString.split(', ');
      errorArray.forEach((err) => {
        const [field, message] = err.split(': ');
        if (field && message) {
          errorObject[field.trim()] = message.trim();
        }
      });
    }
    return errorObject;
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('OTP resent successfully');
        alert('otp sent successfully');
      } else {
        setErrors(parseErrorMessages(data.error));
      }
    } catch (error) {
      console.error('Error:', error);
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
            Sign up
          </Typography>

          {errors.global && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errors.global}
            </Typography>
          )}

{step === 1 && (
  <Box component="form" noValidate onSubmit={handleSendOTP} sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Grid>
      <Grid item xs={12}>
  <RadioGroup
    aria-label="account-type"
    name="accountType"
    value={formData.accountType}
    onChange={handleChange}
    sx={{ flexDirection: 'row' }}
    error={!formData.accountType}
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
  {!formData.accountType && (
    <Typography variant="body2" color="error">
      Please select an account type
    </Typography>
  )}
</Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Send OTP
    </Button>
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Link onClick={() => navigate('/signin')} variant="body2">
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  </Box>
)}

          {step === 2 && (
            <Box component="form" noValidate onSubmit={handleVerifyOTP} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="otp"
                    label="OTP"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    error={!!errors.otp}
                    helperText={errors.otp}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify OTP
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
