 import { MessageCircle, ShoppingBag } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/products";

export default function ProductCard({ product, onAddToCart }) {
  const message = `Salam! Saytdan "${product.name}" (${product.price} AZN) sifariş etmək istəyirəm.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Şəkil */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          {product.oldPrice && (
            <span className="absolute top-2.5 left-2.5 bg-black text-white text-[9px] sm:text-[10px] tracking-wider font-bold px-2 py-0.5 rounded-full uppercase">
              Endirim
            </span>
          )}
        </div>

        {/* Mətnlər */}
        <div className="p-3 sm:p-4">
          <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base mt-0.5 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-[11px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Qiymət və Düymələr */}
      <div className="p-3 sm:p-4 pt-0">
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="text-base sm:text-lg font-extrabold text-gray-900">
            {product.price} ₼
          </span>
          {product.oldPrice && (
            <span className="text-[11px] sm:text-xs text-gray-400 line-through">
              {product.oldPrice} ₼
            </span>
          )}
        </div>

        {/* Səbətə at və WhatsApp düymələri */}
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-1 bg-black hover:bg-gray-800 text-white font-medium py-2 px-2 rounded-xl transition text-xs active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Səbətə at</span>
            <span className="xs:hidden">Səbət</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp ilə sifariş"
            className="flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white p-2 rounded-xl transition active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}