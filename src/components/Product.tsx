import { Link } from "react-router-dom";
import type { Product } from "../types";

interface productCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: productCardProps) {
    return (
        <article className="group" data-aos="fade-up" data-aos-delay={index * 50}>
            <Link
                to={`/product/${product.id}`}
                data-testid="product-card"
                className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
                aria-label={`View details for ${product.title}`}
            >
                <div className="relative bg-gray-50 p-6 h-64 flex items-center justify-center overflow-hidden">
                    <img
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        src={product.image}
                        alt={`${product.title} product image`}
                    />
                </div>

                <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                        {product.title.length > 40
                            ? product.title.slice(0, 40) + "..."
                            : product.title}
                    </h3>

                    <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-gray-900">
                            ₹ {product.price}
                        </p>

                        <span
                            aria-label={`Category: ${product.category}`}
                            className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded"
                        >
                            {product.category}
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
