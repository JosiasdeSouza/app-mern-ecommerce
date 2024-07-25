import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:4000/read");
      setProductList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <NavBar />
      <h1 style={{ color: '#64a4eb' }}>Dubaby Marketplace</h1>
      {productList.length !== 0 &&
        productList.map((product) => (
          <ProductCard 
            key={product._id}
            product={product}
            getProduct={() => getProduct()} />
        ))
      }
    </>
  );
}

export default HomePage;
