import express from "express";
import { isAdmin, requireSignIn } from "../midlewares/authMiddlewares.js";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, singleCategoryController, updateCategoryController } from "../controllers/createCategoryController.js";


const router = express.Router();

// for creating category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// for updating category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// see All category
router.get('/get-category', getAllCategoriesController);

// single category
router.get('/single-category/:slug', singleCategoryController)

// for delete category

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;