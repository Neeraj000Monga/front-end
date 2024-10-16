import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TextField,
  IconButton,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card, TableCells, Wrapper } from "../../style/Style";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const Navigate = useNavigate();
    useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  const EditProduct = (id) => {
    Navigate("/update/" + id);
  };

  return (
    <Wrapper sx={{ justifyContent: "center" }}>
      <Card sx={{ maxWidth: "600px", width: "100%", maxHeight: "400px" }}>
        <TextField
          sx={{ mb: 1 }}
          size="small"
          fullWidth
          label="Search"
          onChange={searchHandle}
        />
        <TableContainer>
          <Table sx={{ border: "1px solid #515151" }}>
            <TableHead>
              <TableRow>
                <TableCells align="center">S. No</TableCells>
                <TableCells>Name</TableCells>
                <TableCells>Price</TableCells>
                <TableCells>Category</TableCells>
                <TableCells>Company</TableCells>
                <TableCells>Operation</TableCells>
              </TableRow>
            </TableHead>
            {products.map((item, index) => (
              <TableBody key={item._id}>
                <TableRow>
                  <TableCells align="center">{index}</TableCells>
                  <TableCells>{item.name}</TableCells>
                  <TableCells>${item.price}</TableCells>
                  <TableCells>{item.categoty}</TableCells>
                  <TableCells>{item.company}</TableCells>
                  <TableCells>
                    <Wrapper sx={{ gap: "0px" }}>
                      <IconButton onClick={() => EditProduct(item._id)}>
                        <EditIcon sx={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteProduct(item._id)}
                        sx={{ p: "6px" }}
                      >
                        <DeleteForeverIcon
                          sx={{ color: "red", fontSize: "22px" }}
                        />
                      </IconButton>
                    </Wrapper>
                  </TableCells>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </Card>
    </Wrapper>
  );
};

export default ProductList;
