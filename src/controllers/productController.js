const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    const user = req.user;
    const createProduct = await productService.createProduct(req.body);
    return res.status(201).json({
      message: "Product created successfully",
      createProduct,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const user = req.user;
    const product = await productService.deleteProduct(req.params.id);
    return res.status(201).json({
      message: "Product deleted successfully",
      product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const updateProduct = async (req, res) => {
  try {
    const user = req.user;
    const product = await productService.updateProduct(req.params.id,req.body);
    return res.status(201).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findProductById = async (req, res) => {
  try {
    const user = req.user;
    const product = await productService.findProductById(req.params.id);
    return res.status(201).json({
      product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findAllProduct = async (req, res) => {
  try {
    const user = req.user;
    const product = await productService.getAllProducts(req.query);
    return res.status(201).json({
      product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createMultipleProduct = async (req, res) => {
  try {
    const user = req.user;
    const product = await productService.createMultipleProduct(req.body);
    return res.status(201).json({
      message : 'Product created successfully' 
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports = {
  createProduct,
  findAllProduct,
  findProductById,
  updateProduct,
  createMultipleProduct,
  deleteProduct
}
