import {
  Fab,
  Box,
  Link,
  Grid,
  Stack,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { MainButton } from "../../style/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log("email, password", email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      // Show success toast
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          backgroundColor: "#defbde",
        },
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      // Show error toast
      toast.error("Please enter valid details", {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          backgroundColor: "#ffcccc",
        },
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ justifyContent: "space-evenly", padding: "0px 20px" }}
    >
      <CssBaseline />
      <Grid item xs={12} sm={4} md={4}>
        <img
          src="Images/Screen.png"
          alt="Screen"
          style={{
            maxWidth: "450px",
            width: "100%",
            height: "490px",
            color: "#fff",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} elevation={6} square>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: { sm: "0px 20px", md: "0px" },
          }}
        >
          <Fab
            sx={{ background: "#00aeae" }}
            size="medium"
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <Typography
            sx={{ fontWeight: 700, marginBottom: "10px" }}
            variant="h5"
          >
            APP NAME
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              textAlign: "center",
            }}
            variant="h5"
          >
            Lorem ipsum dolor, sit amet adipisicing qui rerum natus
          </Typography>
          <Stack
            sx={{
              width: "100%",
              gap: "8px",
            }}
          >
            <TextField
              variant="standard"
              size="small"
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="standard"
              size="small"
              fullWidth
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {!showPassword ? (
                        <VisibilityOff sx={{ color: "#00aeae" }} />
                      ) : (
                        <Visibility sx={{ color: "#00aeae" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ paddingTop: "10px", color: "gray" }}
            />
            <MainButton type="submit" variant="contained" onClick={handleLogin}>
              Login
            </MainButton>
            <Grid container sx={{ mt: 2, mb: 1 }}>
              <Grid item xs>
                <Typography>Already have an account?</Typography>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2" sx={{textDecoration: "none"}}>
                  {"register"}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Login;
