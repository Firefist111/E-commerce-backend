const { Query } = require("mongoose");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const { sortBy } = require("lodash");

const createProduct = async (reqData) => {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  if (!topLevel) {
    topLevel = await new Category({
      name: reqData.topLevelCategory,
      level: 1,
    }).save();
  }
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = await new Category({
      parentCategory: topLevel._id,
      name: reqData.secondLevelCategory,
      level: 2,
    }).save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = await new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    }).save();
  }

  const product = new Product({
    title: reqData.title,
    description: reqData.description,
    price: reqData.price,
    discountedPrice: reqData.discountedPrice,
    color: reqData.color,
    discountedPercent: reqData.discountedPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    size: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id, // cause targeting third level as it shows parent and grandparent relationship
  });

  return await product.save();
};

const deleteProduct = async (productId) => {
  // const product = await findProductById(productId)

  await Product.findByIdAndDelete(productId);
};

const updateProduct = async (productId, reqData) => {
  await Product.findByIdAndUpdate(productId, reqData);
};

const findProductById = async (productId) => {
  const product = await Product.findById(productId).populate("category");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const findAllProduct = async (reqQuery) => {
  const {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize ? pageSize : 10; // pageSize = pageSize||10
  let product = Product.find({}).populate("category"); // simple queryObject but not executed still

  if (category) {
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
       product = product.where("category").equals(categoryExists._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    // color = ['black,blue,white']
    const colorSet = new Set(
      color.split(",").map((color) => {
        return color.trim().toLowerCase();
      })
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null; // colorRegex = /red/blue/pink/i

     product = product.where("color").regex(colorRegex);
  }

  if (size) {
    const sizeSet = new Set(size);
     product = product.where("size.name").in([...sizeSet]);
  }

  if (minPrice && maxPrice) {
     product = product.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
     product = product.where("discountPercent").gte(minDiscount);
  }

  if (stock) {
    if (stock === "in_stock") {
       product = product.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
       product = product.where("quantity").lte(0);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;

    product = product.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await product.clone().countDocuments();
  const skip = (pageNumber-1)*pageSize

  product = product.skip(skip).limit(pageSize)

  const products =await  product.exec()

  const totalPages = Math.ceil(totalProducts/pageSize)
  
  return {
    content : products,currentPage : pageNumber,totalPages
  }
};

const createMultipleProduct = async(products)=>{
  for(let product of products){
    await createProduct(product)
  }
}

module.exports = {
  createProduct,
  findAllProduct,
  findProductById,
  updateProduct,
  createMultipleProduct,
  deleteProduct
}