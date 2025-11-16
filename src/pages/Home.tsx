import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Product } from "../types"
import { getProductsByMultipleCategories, sortProducts, type SortOption } from "../utils/api"
import ProductCard from "../components/Product"
import ProductFilters from "../components/ProductFilters"
import AOS from "aos"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()


  const categories = searchParams.get("categories")?.split(",").filter(Boolean) || []
  const sortOption = (searchParams.get("sort") as SortOption) || "default"

  useEffect(() => {
    setLoading(true)

    getProductsByMultipleCategories(categories).then((data) => {
      const sortedData = sortProducts(data, sortOption)
      setProducts(sortedData)
      setLoading(false)
    })
  }, [categories.join(","), sortOption])

  useEffect(() => {
    AOS.refresh()
  }, [products])

  return (
    <main className="min-h-screen bg-gray-50" data-aos="fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover Amazing Deals on Fashion, Electronics & More!</p>
        </div>
        
        <aside aria-label="Product filters" data-aos="fade-down" data-aos-delay="100">
          <ProductFilters />
        </aside>

        {loading ? (
          <div className="min-h-[400px] w-full flex justify-center items-center">
            <div className="text-center" role="status">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <h2 className="text-lg font-semibold text-gray-700">Loading products...</h2>
            </div>
          </div>
        ) : (
          <section
            aria-label="Product list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((prod, index) => (
              <ProductCard key={prod.id} product={prod} index={index} />
            ))}
          </section>
        )
        }
      </div>
    </main>
  )
}
