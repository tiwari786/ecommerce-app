import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCartContext } from "../context/CartContext";

export default function Navbar() {
  const { itemCount } = useCartContext()
  const count = itemCount()
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">E-Shop</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <div className="relative">
                <FiShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
                  {count}
                </span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}
