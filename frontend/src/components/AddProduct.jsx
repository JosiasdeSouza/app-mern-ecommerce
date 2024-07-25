import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    discountPercentage: "",
    image: "",
    price: "",
    rating: "",
    stock: "",
    thumbnail: "",
  });

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSave = async () => {
    console.log("Saving product:", productData);
    try {
      const response = await axios.post("http://localhost:4000/create", productData);
      console.log("Server response:", response.data);

      if (response.data === "Product saved to the database!") {
        navigate("/");
      } else {
        console.error("Unexpected server response:", response.data);
      }
    } catch (e) {
      console.error("Failed to save the product:", e);

      if (e.response) {
        console.error("Server response error:", e.response.data);
        console.error("Status code:", e.response.status);
      } else if (e.request) {
        console.error("No response received:", e.request);
      } else {
        console.error("Error:", e.message);
      }
    }
  };

  return (
    <React.Fragment>
      <Grid container alignContent="center" justifyContent="center" style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ width: 550 }}>
          <Grid container direction="column" alignItems="center" gap={3}>
            <Typography variant="h5" sx={{ marginTop: 2, color: '#64a4eb' }}>Add Product</Typography>
            {["title", "brand", "category", "description", "discountPercentage", "image", "price", "rating", "stock", "thumbnail"].map((field) => (
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
                sx={{ color: '#64a4eb' }}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default AddProduct;
