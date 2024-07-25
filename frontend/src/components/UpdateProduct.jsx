import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Button, CardActions, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/${id}`);
        console.log(response.data);
        setProductData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    getProduct();
  }, [id]);

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/update/${id}`, productData);
      if (response.data === "Product updated successfully!") {
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/delete/${id}`);
      if (response.data === "Product deleted!") {
        navigate("/"); // Assuming you want to navigate to the home page after deletion
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <React.Fragment>
      <Grid container alignContent="center" justifyContent="center" style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ width: 550, marginBottom: 20 }}>
          <Grid container direction="column" alignItems="center" gap={3} style={{ padding: 20 }}>
            <Typography variant="h5" sx={{ marginTop: 2, color: '#64a4eb' }}>Update Product</Typography>
            {["title", "brand", "category", "description", "discountPercentage", "image", "price", "rating", "stock", "thumbnail"].map(field => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                type={['discountPercentage', 'price', 'rating', 'stock'].includes(field) ? "number" : "text"}
                InputLabelProps={{ shrink: true }}
                value={productData[field] || ""}
                name={field}
                onChange={handleInputChanges}
                fullWidth
              />
            ))}
            <CardActions>
              <Stack direction="row" spacing={2}>
                <Button sx={{ color: '#fff', backgroundColor: '#64a4eb' }} variant="contained" onClick={handleUpdate}>Update</Button>
                <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
              </Stack>
            </CardActions>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default UpdateProduct;
