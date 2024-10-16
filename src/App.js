import { useState } from "react";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import Login from "./components/pages/Login";
import { MainContainer } from "./style/Style";
import AddProduct from "./components/pages/AddProduct";
import { Register } from "./components/pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateComponent from "./components/pages/PrivateComponent";
import ProductList from "./components/pages/ProductList";
import UpdateProduct from "./components/pages/UpdateProduct";

function App() {
  const [mode, setMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Box sx={{ paddingTop: "70px" }}>
            <Header mode={mode} setMode={setMode} />
            <Routes>
              {/* ===== */}
              <Route element={<PrivateComponent />}>
                <Route path="/" element={<ProductList />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/update/:id" element={<UpdateProduct />} />
                <Route path="/logout" element={<h4>Logout</h4>} />
                <Route path="/profile" element={<h4>Profile</h4>} />
              </Route>
              {/* ===== */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
          <Footer />
        </MainContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
