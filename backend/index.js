import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Product from './Models/products.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const mongoDBUri = process.env.mongoDBUri;
const DBNAME = process.env.DBNAME;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Response sent to browser
app.get("/", (req, res) => {
  res.send("Hello Web Browser!");
});

// Create a new product
app.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    image: req.body.image,
  });

  await Product.create(newProduct);
  res.send("Product saved to the database!");
});

// Get all products
app.get("/read", async (req, res) => {
  try {
    console.log('Fetching products...');
    const productList = await Product.find();
    res.send(JSON.stringify(productList));
    console.log('Products fetched successfully');
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

// Get a single product by id
app.get("/get/:id", async (req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  res.send(JSON.stringify(product));
});

// Update a product based on the id
app.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    image: req.body.image,
  });

  res.send("Product updated successfully!");
});

// Delete a product based on the id
app.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DBNAME
    });
    console.log('Express app connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Express app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
}

connectToMongoDB();
