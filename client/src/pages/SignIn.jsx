
  import Grid from '@mui/material/Grid';
  import Container from '@mui/material/Container';
  import SignIn from '../components/SignInComponent'; // Import your SignIn component
  import Logo from '../images/signin.svg'; // Import your logo image
  
  export default function Layout({onLogin}) {
    return (
      
      <Container component="main" maxWidth="lg" style={{ margin: '60px auto' }}>
        
        <Grid container>
        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
            <img src={Logo} alt="Logo" style={{ maxWidth: '400px', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
          <SignIn onLogin={onLogin}/>
          </Grid>
          
        </Grid>
      </Container>
    );
  }
