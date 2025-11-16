import { useSearchParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import type { SortOption } from "../utils/api";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = (searchParams.get("sort") as SortOption) || "default";

  const handleSortChange = (sortOption: SortOption) => {
    if (sortOption === "default") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", sortOption);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sort Products</h3>
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
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
    </div>
  );
}

