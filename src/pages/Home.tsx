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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
   
        <div className="mb-4 sm:mb-6 lg:mb-8" data-aos="fade-down">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-sm sm:text-base text-gray-600">Discover Amazing Deals on Fashion, Electronics & More!</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <aside 
            aria-label="Product filters" 
            className="w-full lg:w-64 xl:w-72 shrink-0"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <ProductFilters />
          </aside>

       
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="min-h-[400px] w-full flex justify-center items-center">
                <div className="text-center" role="status">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <h2 className="text-lg font-semibold text-gray-700">Loading products...</h2>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="min-h-[400px] w-full flex justify-center items-center">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
                  <p className="text-gray-500">Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <section
                aria-label="Product list" 
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                {products.map((prod, index) => (
                  <ProductCard key={prod.id} product={prod} index={index} />
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
