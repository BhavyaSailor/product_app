import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ error: "failed to get products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const product = await queries.getProductById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting producty By ID");
    res.status(500).json({ error: "failed to get product By ID" });
  }
};

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const products = await queries.getProductByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting User's Products");
    res.status(500).json({ error: "Failed to fetch User's products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthoriized",
      });
    }

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        message: "All fields requireed",
      });
    }
    const product = await queries.createProduct({
      userId,
      title,
      description,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product");
    res.status(500).json({ error: "Failed to create a Product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthoriized",
      });
    }

    const { id } = req.params as { id: string };
    const { title, description, imageUrl } = req.body;
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (existingProduct.userId !== userId) {
      return res.status(403).json({
        message: "You can only update your products",
      });
    }

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating Product");
    res.status(500).json({ error: "Failed to update Prodcut" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthoriized",
      });
    }

    const { id } = req.params as { id: string };
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (existingProduct.userId !== userId) {
      return res.status(403).json({
        message: "You can only delete your products",
      });
    }

    await queries.deleteProduct(id);
    res.status(200).json({
      message: "Deleted product successfully",
    });
  } catch (error) {
    console.error("Error deleteing Product");
    res.status(500).json({ error: "Failed to delete Prodcut" });
  }
};
