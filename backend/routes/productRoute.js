import express from "express";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../util.js";

const router = express.Router();


router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// GET single product
router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product not found." });
    }
});

// POST create product
router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name:         req.body.name,
        price:        req.body.price,
        image:        req.body.image,
        brand:        req.body.brand,
        category:     req.body.category,
        countInStock: req.body.countInStock,
        description:  req.body.description,
        rating:       req.body.rating,
        numReviews:   req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: "New Product Created", data: newProduct });
    }
    return res.status(500).send({ message: "Error in Creating Product." });
});

// PUT update product
router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name         = req.body.name;
        product.price        = req.body.price;
        product.image        = req.body.image;
        product.brand        = req.body.brand;
        product.category     = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description  = req.body.description;
        const updatedProduct = await product.save();
        return res.status(200).send({ message: "Product Updated", data: updatedProduct });
    }
    return res.status(404).send({ message: "Product not found." });
});

// DELETE product
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.send({ message: "Product Deleted" });
    } else {
        res.status(404).send({ message: "Product not found." });
    }
});

export default router;