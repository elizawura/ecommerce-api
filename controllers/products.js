export const addProduct = (req, res) => {
  //upload product image
  //validate the product information
  //save product information in database
  //return response
  res.json(req.body);
};

export const getProducts = (req, res) => {
  res.send("all  products!");
};

export const countProducts = (req, res) => {
  res.send("all  products count!");
};

export const updateProduct = (req, res) => {
  res.send(`product with id ${req.params.id} updated!`);
};

export const deleteProduct = (req, res) => {
  res.send(`product with id ${req.params.id} deleted`);
};
