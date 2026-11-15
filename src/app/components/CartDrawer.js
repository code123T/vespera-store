"use client";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/products";

export default function CartDrawer({ isOpen, onClose, cart, updateQty, removeItem }) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Bütün səbəti tək bir WhatsApp mesajına çevirir
  const generateWhatsAppLink = () => {
    const itemsList = cart
      .map((item, index) => `${index + 1}. ${item.name} (${item.qty} ədəd) - ${item.price * item.qty} AZN`)
      .join("\n");

    const message = `Salam! Saytdan sifariş etmək istəyirəm:\n\n${itemsList}\n\nÜmumi məbləğ: ${totalAmount} AZN`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Arxa qara fon */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Səbət paneli */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10">
        {/* Başlıq */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-bold text-lg">Səbətim ({cart.reduce((sum, i) => sum + i.qty, 0)})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Məhsullar */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
              <ShoppingBag className="w-12 h-12 mb-3 stroke-1" />
              <p className="text-sm">Səbətiniz hazırda boşdur</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-white"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm">{item.price * item.qty} ₼</span>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1">
                      <button onClick={() => updateQty(item.id, -1)} className="text-gray-600 hover:text-black">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-gray-600 hover:text-black">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alt hissə - Ümumi məbləğ və WhatsApp düyməsi */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm">Ümumi məbləğ:</span>
              <span className="text-xl font-extrabold text-gray-900">{totalAmount} ₼</span>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3.5 px-4 rounded-xl transition active:scale-95 shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Sifarişi WhatsApp-da tamamla
            </a>
          </div>
        )}
      </div>
    </div>
  );
}