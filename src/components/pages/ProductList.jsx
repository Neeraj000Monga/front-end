import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TextField,
  IconButton,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { Card, TableCells, Wrapper } from "../../style/Style";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      result = await result.json();
      console.log("Fetched products:", result);

      // Ensure the result is an array
      if (Array.isArray(result)) {
        setProducts(result);
      } else if (result.products && Array.isArray(result.products)) {
        setProducts(result.products);
      } else {
        console.error("Expected array but got:", result);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      result = await result.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;

    if (key) {
      try {
        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        result = await result.json();
        if (Array.isArray(result)) {
          setProducts(result);
        } else {
          console.error("Search returned unexpected data:", result);
          setProducts([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      }
    } else {
      getProducts();
    }
  };

  const editProduct = (id) => {
    navigate("/update/" + id);
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

            <TableBody>
              {products.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCells align="center">{index + 1}</TableCells>
                  <TableCells>{item?.name}</TableCells>
                  <TableCells>${item?.price}</TableCells>
                  <TableCells>{item?.categoty}</TableCells>
                  <TableCells>{item?.company}</TableCells>
                  <TableCells>
                    <Wrapper sx={{ gap: "0px" }}>
                      <IconButton onClick={() => editProduct(item._id)}>
                        <EditIcon sx={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteProduct(item._id)}
                        sx={{ p: "6px" }}
                      >
                        <DeleteForeverIcon sx={{ color: "red", fontSize: "22px" }} />
                      </IconButton>
                    </Wrapper>
                  </TableCells>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Wrapper>
  );
};

export default ProductList;