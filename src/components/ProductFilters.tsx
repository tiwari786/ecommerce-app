import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, type SortOption } from "../utils/api";
import { FiX, FiChevronDown, FiFilter } from "react-icons/fi";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const selectedCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const currentSort = (searchParams.get("sort") as SortOption) || "default";

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    if (newCategories.length === 0) {
      searchParams.delete("categories");
    } else {
      searchParams.set("categories", newCategories.join(","));
    }
    setSearchParams(searchParams, { replace: true });
  };

  const clearFilters = () => {
    searchParams.delete("categories");
    setSearchParams(searchParams, { replace: true });
  };

  const handleSortChange = (sortOption: SortOption) => {
    if (sortOption === "default") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", sortOption);
    }
    setSearchParams(searchParams, { replace: true });
  };

  if (loading) {
    return (
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
  
      <button
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        className="lg:hidden w-full mb-4 bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
        aria-label="Toggle filters"
        aria-expanded={isMobileFilterOpen}
      >
        <div className="flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-gray-700" />
          <span className="font-semibold text-gray-900">Filters</span>
          {selectedCategories.length > 0 && (
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>
        <FiChevronDown
          className={`w-5 h-5 text-gray-700 transition-transform ${
            isMobileFilterOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`bg-white rounded-xl shadow-sm p-4 sm:p-5 lg:p-6 sticky top-4 lg:top-16 h-fit transition-all duration-300 ${
          isMobileFilterOpen ? "block" : "hidden lg:block"
        }`}
      >
      
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg hidden lg:block font-semibold text-gray-900">Filters</h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs sm:text-sm cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 active:scale-95 transition-transform"
                aria-label="Clear all filters"
              >
                <FiX className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

   
        <div className="mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer w-full"
              aria-label="Sort products"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" />
          </div>
        </div>

        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
          <div className="flex flex-col gap-2.5">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <label
                  key={category}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded  cursor-pointer"
                    aria-label={`Filter by ${category}`}
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        
      
        {selectedCategories.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="font-medium">{selectedCategories.length}</span> categor{selectedCategories.length === 1 ? "y" : "ies"} selected
            </div>
          </div>
        )}
      </div>
    </>
  );
}

