import React, { useState } from "react";

import { Grid, Stack, TextField, Typography } from "@mui/material";
import { MainButton } from "../../style/Button";
import { Error } from "../../style/Typography";
import { Card, InputWrapper } from "../../style/Style";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoty, setCategoty] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {

    if (!name || !price || !company || !categoty  )
    {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, categoty, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("result", result);
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
              AddProduct
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
                  label="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
                {error && !name && <Error>Enter valid name</Error>}
              </InputWrapper>
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Enter Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
                {error && !price && <Error>Enter valid price</Error>}
              </InputWrapper>
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Enter Product Categoty"
                  value={categoty}
                  onChange={(e) => setCategoty(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
                {error && !categoty && <Error>Enter valid categoty</Error>}
              </InputWrapper>
              <InputWrapper>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  label="Enter Product Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      fontSize: "12px",
                    },
                  }}
                />
                {error && !company && <Error>Enter valid company</Error>}
              </InputWrapper>
              <MainButton
                sx={{ maxWidth: "200px" }}
                type="submit"
                variant="contained"
                onClick={addProduct}
              >
                Add Product
              </MainButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default AddProduct;

