import express from "express";
import { isAdmin, requireSignIn } from "../midlewares/authMiddlewares.js";
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProduct, productCountController, productFilterController, productPerPageController, searchProductController, similarProductController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable'

const Router = express.Router();

// creating a product
Router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// get product
Router.get('/get-product', getProductController);

// get single product
Router.get("/get-product/:slug", getSingleProduct);

// get product photo
Router.get('/product-photo/:pid', getProductPhotoController);

// delete product
Router.delete('/:pid', requireSignIn, isAdmin, deleteProductController);

// update product
Router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);


// product filter
Router.post('/product-filter', productFilterController);

// product count 
Router.get('/product-count', productCountController)


// product per page
Router.get('/product-per-page/:page', productPerPageController)

// search product
Router.get('/search/:keyword', searchProductController)

// get similar products
Router.get('/similar-product/:pid/:cid', similarProductController)


export default Router;