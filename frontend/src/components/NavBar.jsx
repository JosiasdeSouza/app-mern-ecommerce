import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = () => {
  // Using the useNavigate hook from react-router-dom to get the navigate function
  const navigate = useNavigate();

  // Function to navigate to the home page
  const goToHome = () => {
    navigate("/");
  };

  // Function to navigate to the add product page
  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  // The component returns a Box containing an AppBar, which in turn contains a Toolbar.
  // The Toolbar contains a Typography component for the title and two Button components for navigation.
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#64a4eb' }}> {/* Navbar color */}
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: '#ffe4ce  ' // Text color for "Dubaby Marketplace"
              }}
            >
              Dubaby Marketplace
            </Typography>
            <Button color="inherit" onClick={goToHome} sx={{ color: '#ffe4ce ' }}>
              Home
            </Button>
            <Button color="inherit" onClick={goToAddProduct} sx={{ color: '#ffe4ce ' }}> {/* Text color for "Add Product" */}
              Add Product
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
