import slugify from "slugify";
import categoryModels from "../models/categoryModels.js";

// For creating Category

export const createCategoryController = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(401).send({
                message: 'Name is required'
            })
        }
        const existingCategory = await categoryModels.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists",
            })
        }

        //create new Category instance with the provided data
        const category = await new categoryModels({
            name,
            description,
            slug: slugify(name)
        }).save();
        res.status(201).send({
            success: true,
            message: 'Category successfully created',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error creating category",
            error
        })
    }
};


// For updating category

export const updateCategoryController = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const category = await categoryModels.findByIdAndUpdate(id, { name, description, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: `category ${id}` + 'successfully updated!',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Updating category",
            error,
        })
    }
}

// get All category

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModels.find({});
        return res.status(200).send({
            success: true,
            message: 'All categories list',
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error getting all categories",
            error,
        })
    }
}


// for single category 

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModels.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'category successfully fetch',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Getting Single Category ",
            error,
        })
    }
}


// delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModels.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Deleting the category.",
            error,
        })
    }
}