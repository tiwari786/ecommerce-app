import axios from "axios";
import type { Product } from "../types";

const API_URL = "https://fakestoreapi.com/"

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}/products`)
        return response.data
    } catch (error) {
        return [];
    }
}

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`)
        return response.data
    } catch (error) {
        return null;
    }
}

export const getCategories = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/products/categories`)
        return response.data
    } catch (error) {
        return [];
    }
}

export const getProductsByCategories = async (category: string): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}/products/category/${category}`)
        return response.data
    } catch (error) {
        return [];
    }
}

/**
 * Fetch products for multiple categories
 * @param categories Array of category names
 * @returns Combined array of products from all categories
 */
export const getProductsByMultipleCategories = async (categories: string[]): Promise<Product[]> => {
    if (categories.length === 0) {
        return getAllProducts();
    }

    try {
        // Fetch products for each category in parallel
        const promises = categories.map(category => getProductsByCategories(category));
        const results = await Promise.all(promises);
        
        // Merge all products and remove duplicates based on product ID
        const allProducts = results.flat();
        const uniqueProducts = allProducts.filter((product, index, self) =>
            index === self.findIndex(p => p.id === product.id)
        );
        
        return uniqueProducts;
    } catch (error) {
        return [];
    }
}

/**
 * Sort products based on the sort option
 * @param products Array of products to sort
 * @param sortOption Sort option (default, price-asc, price-desc, name-asc, name-desc)
 * @returns Sorted array of products
 */
export const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
    const sorted = [...products];
    
    switch (sortOption) {
        case "default":
            return sorted; // Return products in original order
        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);
        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);
        case "name-asc":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case "name-desc":
            return sorted.sort((a, b) => b.title.localeCompare(a.title));
        default:
            return sorted;
    }
}