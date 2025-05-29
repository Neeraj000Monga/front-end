import Avatar from "@mui/material/Avatar";
import { Head, Wrapper, Link } from "../style/Style";
import { Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <Head sx={{ justifyContent: "space-between" }}>
      <Wrapper pr={2}>
        <NavLink to="/">
          <Typography
            style={{ background: "#00aeae", color: "#fff", padding: "10px" }}
          >
            LOGO
          </Typography>
        </NavLink>

        {auth ? (
          <Wrapper sx={{ justifyContent: "space-between" }}>
            <Wrapper sx={{ width: "fit-content" }}>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#00AEAE" : "inherit", 
                  textDecoration: "none",
                  marginRight: "10px", 
                })}
              >
                Products
              </NavLink>
              <NavLink
                to="/add"
                style={({ isActive }) => ({
                  color: isActive ? "#00AEAE" : "inherit",
                  textDecoration: "none",
                  marginRight: "10px",
                })}
              >
                Add Product
              </NavLink>
              <NavLink
                to="/profile"
                style={({ isActive }) => ({
                  color: isActive ? "#00AEAE" : "inherit",
                  textDecoration: "none",
                })}
              >
                Profile
              </NavLink>
            </Wrapper>

            <Stack flexDirection="row" gap="20px">
              <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
                {JSON.parse(auth)?.name}
              </Typography>
              <Link onClick={logout} to="/register">
                Logout
              </Link>
            </Stack>
          </Wrapper>
        ) : (
          <Wrapper sx={{ justifyContent: "flex-end" }}>
            <Link sx={{ pr: "10px" }} to="/register">
              Sign Up
            </Link>
            <Link to="/login">Login</Link>
          </Wrapper>
        )}
      </Wrapper>

      <Avatar style={{ background: "#00AEAE", cursor: "pointer" }} />
    </Head>
  );
};
