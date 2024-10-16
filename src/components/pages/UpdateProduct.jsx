import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Card, InputWrapper } from "../../style/Style";
import { MainButton } from "../../style/Button";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to extract the id from the route

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category); 
      setCompany(result.company);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const updateProduct = async () => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "PUT", 
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Stack>
      <Grid container justifyContent="center" p={1}>
        <Grid item xs={12} sm={4}>
          <Card>
            <Typography
              sx={{ fontWeight: 700, marginBottom: "10px" }}
              variant="h6"
            >
              Update Product
            </Typography>

            <Stack
              sx={{
                gap: "8px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Update Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Update Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Update Product Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Update Product Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
              </InputWrapper>
              <MainButton
                sx={{ maxWidth: "200px" }}
                type="submit"
                variant="contained"
                onClick={updateProduct}
              >
                Update Product
              </MainButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default UpdateProduct;
