import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, type SortOption } from "../utils/api";
import { FiX, FiChevronDown } from "react-icons/fi";

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
    <div className="mb-4 sm:mb-6 bg-white rounded-xl shadow-sm p-3 sm:p-4">
      <div className="flex flex-row justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div className="flex w-[60%] items-center gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filter by Category</h3>
          {selectedCategories.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs sm:text-sm cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 active:scale-95 transition-transform touch-manipulation"
              aria-label="Clear all filters"
            >
              <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Clear Filters</span>
              <span className="sm:hidden">Clear</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort:
          </label>
          <div className="relative flex-1 min-w-0">
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-2 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer w-full touch-manipulation"
              aria-label="Sort products"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer touch-manipulation active:scale-95 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
              }`}
              aria-pressed={isSelected}
              aria-label={`Filter by ${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="mt-3 text-xs sm:text-sm text-gray-600">
          {selectedCategories.length} categor{selectedCategories.length === 1 ? "y" : "ies"} selected
        </div>
      )}
    </div>
  );
}

