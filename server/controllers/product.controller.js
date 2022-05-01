const axios = require("axios");

exports.getProductByID = (req, res) => {
  const { productID } = req.params;
  axios
    .get(`https://dummyjson.com/products/${productID}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(400).json({
        errors: [{ message: err.message }],
      })
    );
};

exports.getCategories = (req, res) => {
  axios
    .get("https://dummyjson.com/products/categories")
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(400).json({
        errors: [{ message: err.message }],
      })
    );
};

exports.getProducts = (req, res) => {
  const { limit, skipped } = req.body;

  axios
    .get(`https://dummyjson.com/products?limit=${limit}&skip=${skipped}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(400).json({
        errors: [{ message: err.message }],
      })
    );
};


exports.getProductsOfCategory = (req, res) => {
  const { category } = req.body;
  console.log(req.body)
  axios
    .get(`https://dummyjson.com/products/category/${category}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(400).json({
        errors: [{ message: err.message }],
      })
    );
}