import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Login = () => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")

  const history = useHistory()


  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("https://stack-overflow-backend-kohl.vercel.app/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false)
      setMessage(data.message);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("https://stack-overflow-backend-kohl.vercel.app/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setMessage(data.message);
      if(data.token){
        setLoading(false)
        history.push('/mainpg')
      }
      else{
        setLoading(false)
        setMessage(data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {register ? (
            <Container>
              <Typography
                style={{ textAlign: "center" }}
                component="h1"
                variant="h5"
              >
                Signup
              </Typography>
              <Box
                component="form"
                onSubmit={handleSignUp}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
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
                  id="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                 {message !== "" && (
          <p style={{color:"red", fontSize:"14px",textAlign:"center"}}>{message}</p>
        )}
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? "Loading..." : "Signup"} 
                </Button>
              </Box>
            </Container>
          ) : (
            <Container>
              <Typography
                style={{ textAlign: "center" }}
                component="h1"
                variant="h5"
              >
                Log in
              </Typography>
              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                 {message !== "" && (
          <p style={{color:"red", fontSize:"14px",textAlign:"center"}}>{message}</p>
        )}
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{height:"50px"}}
                >
                  {loading ? "Loading..." : "Login"} 
                </Button>{" "}
              </Box>{" "}
            </Container>
          )}

          <Grid container>
            <Grid item xs>
              <small variant="body2">Forgot password?</small>
            </Grid>
            <Grid item>
              {register ? (
                <small
                  onClick={() => setRegister(!register)}
                  style={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Already Login?"}
                  
                </small>
              ) : (
                <small
                  onClick={() => setRegister(!register)}
                  style={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </small>
              )}
            </Grid>
          </Grid>
        </Box>


        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
