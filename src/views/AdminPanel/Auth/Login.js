import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, NavLink } from 'react-router-dom';
import { getToken, storeToken } from '../services/LocalStorageService';
import { useLoginUserMutation } from '../services/UserAuthApi'
import { setUserToken } from '../features/authSlice';
import { useDispatch } from 'react-redux';
// import SideBar from '../SideBar/SideBar';
    
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = ()=> {
  const navigate = useNavigate();
  const [ loginUser ] = useLoginUserMutation()

    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState({
      status: false,
      msg: "",
      type: "",
    });

    const handleChange = (e) => {
      setLogin({...login, [e.target.name]: e.target.value});
    }
 
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let data = {email:login.email, password:login.password};
        console.log(data);
       const res = await loginUser (data)
          console.log(res);
          if(res.data && res.data.status === "success"){
           storeToken(res.data.token);
            navigate('/Dashboard');
          if (res.error && res.error.data.status === "failed") {
            setError({ status: true, msg: res.error.data.message, type: 'error' })
          } 
        }
    }
    let token = getToken()
    // console.log(token);
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(setUserToken({ token: token }))
    }, [token, dispatch])

    return (
      <ThemeProvider theme={theme}>
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
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>

    );
}
export default Login;
