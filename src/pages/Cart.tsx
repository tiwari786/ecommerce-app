import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { FiTrash2} from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect } from "react";
import AOS from "aos";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCartContext();

  const totalPrice = getTotalPrice();

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  useEffect(() => {
    AOS.refresh();
  }, [cart]);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center" data-aos="fade-in">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4" data-aos="fade-up">
          Your Cart is Empty
        </h2>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <FiArrowLeft className="mr-2" />
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-6 sm:py-10" data-aos="fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 font-medium text-sm sm:text-base"
          data-aos="fade-right"
        >
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6" data-aos="fade-down">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          <section data-testid='cart-item' aria-label="cart-items" className="lg:col-span-2 space-y-3 sm:space-y-4">

            {cart.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5 flex gap-4 items-center transition-all duration-300 ease-in-out hover:shadow-md"
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                <img
                  src={item.image}
                  className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 object-contain bg-gray-50 rounded-lg p-1.5 sm:p-2"
                  alt={`${item.title} product image`}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  {/* <p className="text-xs sm:text-sm text-gray-600 font-medium">₹ {formatPrice(item.price)}</p> */}
                  {item.quantity > 1 && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        ₹ {formatPrice(item.price)} × {item.quantity}
                      </p>
                    )}
                </div>

                <div>
                  <div className="flex flex-col items-end shrink-0">
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      ₹ {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
  
                  <div className="flex items-center gap-1 mt-2 sm:gap-1 shrink-0">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.quantity === 1}
                      aria-label="Decrease quantity"
                      className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer flex items-center justify-center rounded-4xl text-sm ${item.quantity === 1 ? "opacity-30 bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}>
                      -
                    </button>

                    <span className="text-sm sm:text-base font-semibold min-w-6 sm:min-w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer flex items-center justify-center bg-gray-200 rounded-4xl hover:bg-gray-300 text-sm"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove product"
                      className="ml-2 sm:ml-4 cursor-pointer text-red-500 hover:text-red-600 transition-transform active:scale-95"
                    >
                      <FiTrash2 size={16} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>


                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-600 cursor-pointer font-semibold hover:text-red-700 mt-4 text-sm sm:text-base"
            >
              Clear Cart
            </button>
          </section>

          <aside aria-label="Order Summary" className="bg-white p-4 sm:p-6 rounded-xl shadow-sm h-fit sticky top-4" data-aos="fade-left">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-3 text-sm sm:text-base">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">₹ {formatPrice(totalPrice)}</span>
            </div>

            <div className="flex justify-between mb-3 text-sm sm:text-base">
              <span className="text-gray-700">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between text-base sm:text-lg font-bold">
              <span>Total</span>
              <span>₹ {formatPrice(totalPrice)}</span>
            </div>

            <button className="w-full mt-4 sm:mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm sm:text-base">
              Proceed to Checkout
            </button>
          </aside>

        </div>
      </div>
    </main>
  );
}
