import { useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { useTourismData } from "../hooks/useTourismData";

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "Admin-Commemorative":
      return "text-blue-600 bg-blue-50";
    case "Descriptive-Natural":
      return "text-emerald-600 bg-emerald-50";
    case "Ethno-Cultural":
      return "text-amber-600 bg-amber-50";
    case "Morpho-Geographic":
      return "text-slate-700 bg-slate-100";
    default:
      return "text-slate-600 bg-slate-50";
  }
};

const DestinationCard = memo(({ item, index, getCategoryColor }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(index * 0.02, 0.3) }}
    className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
  >
    <div className="relative h-56 overflow-hidden bg-emerald-50">
      <img
        loading="lazy"
        src={item.Gambar}
        alt={item.Nama}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        decoding="async"
      />
      <span
        className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase shadow-sm ${getCategoryColor(item.Kategori)}`}
      >
        {item.Kategori}
      </span>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors uppercase italic">
        {item.Nama}
      </h3>
      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-6">
        {item.Deskripsi}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-300 font-bold text-[9px] uppercase tracking-widest">
          <MapPin size={12} className="text-emerald-50" /> Lombok Barat
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${item.Latitude},${item.Longitude}`}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-md"
        >
          <Navigation size={14} />
        </a>
      </div>
    </div>
  </motion.div>
));

const Destinasi = () => {
  const { data, categories, loading } = useTourismData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      const matchCat =
        selectedCategory === "Semua" || item.Kategori === selectedCategory;
      const matchSearch = item.Nama.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [data, selectedCategory, searchTerm]);

  if (loading)
    return (
      <div className="p-20 text-center font-black animate-pulse text-emerald-600 uppercase tracking-widest">
        Memuat Destinasi...
      </div>
    );

  return (
    <div className="h-full overflow-y-auto bg-white p-6 md:p-10 custom-scrollbar scroll-smooth">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
              Katalog Destinasi
            </h2>
            <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
              Eksplorasi Keindahan Lombok Barat
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Cari..."
              className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none w-40 md:w-60 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredData.map((item, index) => (
            <DestinationCard
              key={`${item.Nama}-${index}`}
              item={item}
              index={index}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Destinasi);
