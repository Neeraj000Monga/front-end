import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { MainButton } from "../../style/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const [name, setName] = useState("");
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
  });

  const handleChange = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result", result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
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
              label="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="standard"
              size="small"
              fullWidth
              label="Email"
              name="email"
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

            <MainButton
              type="submit"
              variant="contained"
              onClick={handleChange}
            >
              Register
            </MainButton>
            <Grid container sx={{ mt: 2, mb: 1 }}>
              <Grid item xs>
                <Typography>Already have an account?</Typography>
              </Grid>
              <Grid item>
                <Link href="login" variant="body2" sx={{ textDecoration: "none" }}>
                  {"login"}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};
