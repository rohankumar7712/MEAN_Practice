const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/products_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', ProductSchema);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.put('/products/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Product Updated" });
});

app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
