import { Link, useParams } from "react-router-dom"
import { useCartContext } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { getProductById } from "../utils/api";
import { FiArrowLeft } from "react-icons/fi";


export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, isInCart } = useCartContext();

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      getProductById(Number(id)).then((data) => {
        setProduct(data)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 w-full flex justify-center items-center">
        <div role="status" aria-live="polite" className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-700">Loading product...</h2>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 w-full flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 font-medium text-sm sm:text-base"
        >
          <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Products
        </Link>

        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">

            <figure className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-[250px] sm:max-h-[300px] md:max-h-[400px] object-contain w-full h-auto"
              />
            </figure>

            <div className="flex flex-col">

              <span className="inline-block w-fit bg-blue-100 text-blue-800 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full uppercase mb-3 sm:mb-4">
                {product.category}
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  ₹ {product.price}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Including all taxes</p>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-2 sm:mt-1 text-xs sm:text-sm">
                  ⭐ Rating: {product.rating?.rate} ({product.rating?.count} reviews)
                </p>
              </div>

              <div className="mt-auto space-y-3 sm:space-y-4">

                {isInCart(product.id) ? (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors shadow-md cursor-not-allowed"
                  >
                    Already in cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full cursor-pointer bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>
                )}

              </div>
            </div>

          </section>
        </article>

      </div>
    </main>
  )
}
