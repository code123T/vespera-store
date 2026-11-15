 "use client";
import { useState } from "react";
import {
  ShoppingBag,
  MessageCircle,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Heart,
  ShieldCheck,
  Truck,
  CreditCard,
  Sparkles,
  Clock,
  Star,
  Quote,
} from "lucide-react";
import { products, WHATSAPP_NUMBER } from "../app/data/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");
  const [selectedScent, setSelectedScent] = useState("Hamısı");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ITEMS_PER_PAGE = 8;

  const categories = ["Hamısı", ...new Set(products.map((p) => p.category))];
  const scentTypes = ["Hamısı", "Odunsu", "Şirin", "Ədviyyatlı", "Çiçəkli"];

  // Müştəri rəyləri data bazası
  const testimonials = [
    {
      id: 1,
      name: "Elvin Məmmədov",
      comment: "Afnan 9 PM sifariş etdim. Qoxusu möhtəşəmdir və həqiqətən çox qalıcıdır. Çatdırılma da sürətli oldu.",
      rating: 5,
      date: "2 gün əvvəl",
    },
    {
      id: 2,
      name: "Leyla Əliyeva",
      comment: "Vurv Victorieux Femme hədiyyə üçün almışdım, qablaşdırması və qoxusu çox lüks idi. Çox razı qaldım!",
      rating: 5,
      date: "1 həftə əvvəl",
    },
    {
      id: 3,
      name: "Rəşad Qasımov",
      comment: "Lattafa Asad əsl kişi ətridir. Sifarişi WhatsApp-la etdim, çox rahat və operativ işləyirlər.",
      rating: 5,
      date: "2 həftə əvvəl",
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Hamısı" ||
      p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
    const matchesScent =
      selectedScent === "Hamısı" ||
      p.scentType?.toLowerCase().trim() === selectedScent.toLowerCase().trim();
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesWishlist = !showOnlyWishlist || wishlist.includes(p.id);

    return matchesCategory && matchesScent && matchesSearch && matchesWishlist;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetPage = () => setCurrentPage(1);

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (e, product) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const generateWhatsAppLink = () => {
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.qty} ədəd) - ${item.price * item.qty} AZN`
      )
      .join("\n");

    const message = `Salam! Saytdan sifariş etmək istəyirəm:\n\n${itemsList}\n\nÜmumi məbləğ: ${totalAmount} AZN`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const generalQuestionUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Salam! Ətirlərlə bağlı sualım var."
  )}`;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 pb-28 overflow-x-hidden">
      {/* Endirim Banneri */}
      <div className="bg-black text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>50 AZN-dən yuxarı sifarişlərdə Bakı daxili çatdırılma PULSUZDUR!</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <h1
            onClick={() => {
              setSelectedCategory("Hamısı");
              setSelectedScent("Hamısı");
              setSearchQuery("");
              setShowOnlyWishlist(false);
              resetPage();
            }}
            className="text-lg sm:text-2xl font-black tracking-wider cursor-pointer shrink-0"
          >
            VESPERA
          </h1>

          {/* Canlı Axtarış */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                resetPage();
              }}
              placeholder="Ətir adı və ya not axtar..."
              className="w-full bg-gray-100/80 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowOnlyWishlist((prev) => !prev);
                resetPage();
              }}
              title="Bəyəndiklərim"
              className={`relative p-2.5 rounded-full transition active:scale-95 cursor-pointer ${
                showOnlyWishlist
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${showOnlyWishlist ? "fill-red-500 text-red-500" : ""}`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                resetPage();
              }}
              placeholder="Ətir axtar..."
              className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-8 text-xs outline-none focus:bg-white focus:ring-1 focus:ring-gray-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-gray-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Başlıq */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
          {showOnlyWishlist ? "Sevimli Ətirlərim" : "Seçilmiş Kolleksiya"}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Orijinal keyfiyyət, birbaşa WhatsApp ilə sürətli sifariş.
        </p>
      </div>

      {/* Filtrlər */}
      <div className="max-w-6xl mx-auto px-4 py-3 space-y-2.5">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                resetPage();
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] text-gray-400 font-medium mr-1 shrink-0">
            Qoxu tipi:
          </span>
          {scentTypes.map((scent) => (
            <button
              key={scent}
              onClick={() => {
                setSelectedScent(scent);
                resetPage();
              }}
              className={`px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedScent === scent
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {scent}
            </button>
          ))}
        </div>
      </div>

      {/* Məhsul Gridi */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-2">
        {currentProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center my-6">
            <p className="text-gray-500 text-sm">Axtarışınıza uyğun ətir tapılmadı.</p>
            <button
              onClick={() => {
                setSelectedCategory("Hamısı");
                setSelectedScent("Hamısı");
                setSearchQuery("");
                setShowOnlyWishlist(false);
              }}
              className="mt-3 text-xs font-semibold underline text-black cursor-pointer"
            >
              Bütün filtrləri sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {currentProducts.map((product) => {
              const singleMessage = `Salam! Saytdan "${product.name}" (${product.price} AZN) sifariş etmək istəyirəm.`;
              const singleWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                singleMessage
              )}`;
              const isLiked = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {product.oldPrice && (
                        <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-black text-white text-[9px] sm:text-[10px] tracking-wider font-bold px-2 py-0.5 rounded-full uppercase">
                          Endirim
                        </span>
                      )}

                      <button
                        onClick={(e) => toggleWishlist(e, product.id)}
                        className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 bg-white/80 backdrop-blur-xs hover:bg-white rounded-full shadow-xs transition active:scale-90 cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-2.5 sm:p-4">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] sm:text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                          {product.category}
                        </span>
                        {product.scentType && (
                          <span className="text-[9px] sm:text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            {product.scentType}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-xs sm:text-base mt-1 line-clamp-1 group-hover:underline">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-[10px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-4 pt-0">
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                      <span className="text-sm sm:text-lg font-extrabold text-gray-900">
                        {product.price} ₼
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                          {product.oldPrice} ₼
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => addToCart(e, product)}
                        className="flex-1 flex items-center justify-center gap-1 bg-black hover:bg-gray-800 text-white font-medium py-2 px-1.5 sm:px-2 rounded-lg sm:rounded-xl transition text-[11px] sm:text-xs active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Səbətə at</span>
                      </button>

                      <a
                        href={singleWhatsappUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp ilə sifariş"
                        className="flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white p-2 rounded-lg sm:rounded-xl transition active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Səhifələmə */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition cursor-pointer ${
                  currentPage === page
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* --- 3. MÜŞTƏRİ RƏYLƏRİ BÖLMƏSİ (TESTIMONIALS) --- */}
        <div className="mt-16 pt-10 border-t border-gray-200/70">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold">Müştərilerimiz Nə Deyir?</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Alıcılarımızın real təəssüratları</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-400">{t.date}</span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-gray-900">{t.name}</span>
                  <Quote className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Etibar Nişanları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-12 pt-10 border-t border-gray-200/70">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-900">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">100% Orijinal Məhsul</h4>
              <p className="text-xs text-gray-500 mt-0.5">Yüksək qalıcılıq və zəmanətli keyfiyyət</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-900">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Sürətli Çatdırılma</h4>
              <p className="text-xs text-gray-500 mt-0.5">Bakı daxili metrolara və ünvana çatdırılma</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-900">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Rahat Ödəniş</h4>
              <p className="text-xs text-gray-500 mt-0.5">Qapıda nağd və ya kartdan-karta ödəniş</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sabit WhatsApp Düyməsi */}
      <a
        href={generalQuestionUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Bizə WhatsApp-da yazın"
        className={`fixed right-4 z-30 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-lg transition hover:scale-105 active:scale-95 flex items-center gap-2 ${
          totalItems > 0 ? "bottom-20 sm:bottom-6" : "bottom-6"
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-xs font-bold pr-1">Sualınız var?</span>
      </a>

      {/* --- 2. MƏHSUL DETAL MODALI + OXŞAR ƏTİRLƏR (RELATED PRODUCTS) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-5 sm:p-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black text-gray-900">
                      {selectedProduct.price} ₼
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {selectedProduct.oldPrice} ₼
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {selectedProduct.notes && (
                    <div className="mt-4 bg-gray-50 p-3.5 rounded-xl space-y-1.5 border border-gray-100 text-xs">
                      <div>
                        <span className="font-bold text-gray-900">Üst: </span>
                        <span className="text-gray-600">{selectedProduct.notes.top}</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Ürək: </span>
                        <span className="text-gray-600">{selectedProduct.notes.heart}</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Baza: </span>
                        <span className="text-gray-600">{selectedProduct.notes.base}</span>
                      </div>
                    </div>
                  )}

                  {selectedProduct.longevity && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-3">
                      <Clock className="w-3.5 h-3.5 text-gray-900" />
                      <span>Qalıcılıq: <strong>{selectedProduct.longevity}</strong></span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={(e) => {
                      addToCart(e, selectedProduct);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Səbətə at
                  </button>
                </div>
              </div>
            </div>

            {/* Oxşar / Digər Ətirlər (Related Products) */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-sm text-gray-900 mb-3">Digər Oxşar Ətirlər</h4>
              <div className="grid grid-cols-3 gap-3">
                {products
                  .filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category)
                  .slice(0, 3)
                  .map((related) => (
                    <div
                      key={related.id}
                      onClick={() => setSelectedProduct(related)}
                      className="bg-gray-50 p-2 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition"
                    >
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full aspect-square object-cover rounded-lg mb-1.5"
                      />
                      <p className="text-[11px] font-bold text-gray-900 line-clamp-1">{related.name}</p>
                      <p className="text-[10px] text-gray-500">{related.price} ₼</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sürətli Səbət Paneli */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 sm:hidden z-40 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[11px] text-gray-500">Səbət ({totalItems} məhsul)</p>
            <p className="text-base font-extrabold text-gray-900">{totalAmount} ₼</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-gray-100 text-gray-900 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Səbətə bax
            </button>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Sifariş et
            </a>
          </div>
        </div>
      )}

      {/* Səbət Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-bold text-base sm:text-lg">Səbətim ({totalItems})</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                  <ShoppingBag className="w-12 h-12 mb-3 stroke-1" />
                  <p className="text-sm">Səbətiniz hazırda boşdur</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-gray-50 p-2.5 sm:p-3 rounded-xl border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover bg-white"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-xs sm:text-sm">
                          {item.price * item.qty} ₼
                        </span>
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="text-gray-600 hover:text-black cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="text-gray-600 hover:text-black cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 text-sm">Ümumi məbləğ:</span>
                  <span className="text-lg sm:text-xl font-extrabold text-gray-900">
                    {totalAmount} ₼
                  </span>
                </div>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 sm:py-3.5 px-4 rounded-xl transition active:scale-95 shadow-md cursor-pointer text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Sifarişi WhatsApp-da tamamla
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}