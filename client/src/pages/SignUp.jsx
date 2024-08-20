
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
 import SignUp from '../components/SignUpComponent';
// import SignUp from '../components/sigg'; // Import your SignIn component
import Logo from '../images/signup.svg'; // Import your logo image


export default function Layout2() {
  return (
    <Container component="main" maxWidth="lg" style={{ margin:"60px auto" }}>
      <Grid container>
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
          <img src={Logo} alt="Logo" style={{ maxWidth: '400px', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <SignUp/>
        </Grid>
        
      </Grid>
    </Container>
  );
}