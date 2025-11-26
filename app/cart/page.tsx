"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react"; // أيقونات جميلة

const CartPage = () => {
  const { cart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity }:any = useCart();

  // ✅ الحالة لما السلة فاضية
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-500 space-y-4">
        <Image
          src="/New/empty-shopping-cart.jpg"
          alt="Empty cart"
          width={450}
          height={280}
          className="opacity-80 rounded-lg shadow-md"
        />
        <p className="text-xl font-medium mt-4">Your cart is currently empty 🛒</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  // ✅ حساب المجموع الكلي
  const total = cart.reduce(
    (sum: number, item: { price: number; quantity: any; }) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-5xl mx-auto mb-10 p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl mt-10 border border-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        🛍️ Your Shopping Cart
      </h1>

      <div className="space-y-5">
        {cart.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            {/* صورة المنتج */}
            <div className="flex items-center gap-5">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-lg object-contain bg-gray-100 p-2"
                />
              </div>

              {/* تفاصيل المنتج */}
              <div>
                <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  ${item.price.toFixed(2)} each
                </p>

                {/* تحكم الكمية */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* السعر + حذف */}
            <div className="text-right">
              <p className="font-bold text-gray-800 text-lg mb-2">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium transition"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* المجموع الكلي */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Total:{" "}
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </h2>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={clearCart}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all"
          >
            Clear Cart
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
