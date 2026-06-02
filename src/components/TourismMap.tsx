import { useEffect, useState, useMemo, memo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { useTourismData } from "../hooks/useTourismData";
import {
  Search,
  Settings2,
  Menu,
  X,
  Info,
  Navigation,
  Map as MapIcon,
  Copy,
} from "lucide-react";

// Fix for default marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "Admin-Commemorative":
      return "#2563eb"; // Blue 600
    case "Descriptive-Natural":
      return "#059669"; // Emerald 600
    case "Ethno-Cultural":
      return "#d97706"; // Amber 600
    case "Morpho-Geographic":
      return "#334155"; // Slate 700
    default:
      return "#64748b"; // Slate 500
  }
};

const createCustomIcon = (cat: string) => {
  const color = getCategoryColor(cat);
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    tooltipAnchor: [12, -12],
  });
};

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = memo(
  ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom, { animate: true, duration: 1.5 });
    }, [center, zoom, map]);
    return null;
  },
);

const SidebarItem = memo(({ item, handleZoomTo }: any) => (
  <div
    onClick={() => handleZoomTo(item.Latitude, item.Longitude)}
    className="group relative bg-white rounded-3xl border border-slate-50 hover:border-emerald-100 hover:shadow-xl transition-all cursor-pointer overflow-hidden p-3 flex gap-4"
  >
    <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-emerald-50">
      <img
        loading="lazy"
        src={item.Gambar}
        alt={item.Nama}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        decoding="async"
      />
      <div className="absolute top-1 left-1 bg-white/90 text-[6px] font-black uppercase px-1 py-0.5 rounded-md text-emerald-600 border border-white/20">
        {item.Kategori}
      </div>
    </div>
    <div className="flex flex-col justify-center overflow-hidden">
      <h3 className="font-extrabold text-slate-900 text-[12px] group-hover:text-emerald-600 leading-tight mb-1 truncate">
        {item.Nama}
      </h3>
      <p className="text-[10px] text-slate-400 line-clamp-2 italic leading-tight">
        {item.Deskripsi}
      </p>
    </div>
  </div>
));

const TourismMap = () => {
  const { data, categories, loading } = useTourismData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showLabelsAlways, setShowLabelsAlways] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [mapConfig, setMapConfig] = useState<{
    center: [number, number];
    zoom: number;
  }>({
    center: [-8.6929, 116.1287],
    zoom: 11,
  });

  // Sidebar Resize Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < 600) setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "default";
    };
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      const matchCat =
        selectedCategory === "Semua" || item.Kategori === selectedCategory;
      const matchSearch =
        item.Nama.toLowerCase().includes(term) ||
        item.Deskripsi.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [data, selectedCategory, searchTerm]);

  const handleZoomTo = (lat: number, lng: number) => {
    setMapConfig({ center: [lat, lng], zoom: 16 });
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-emerald-950 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center z-10"
        >
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-black text-white uppercase italic text-emerald-400">
            Lombok Barat
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-white relative select-none">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{ width: `${sidebarWidth}px` }}
            className="fixed md:relative flex flex-col h-[calc(100vh-140px)] md:h-full bg-white border-r border-emerald-50 shadow-2xl z-[2001] min-w-[280px] top-[70px] md:top-0"
          >
            <div className="p-3 pb-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[10px] font-black text-slate-900 italic uppercase tracking-widest">
                  Eksplorasi
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-emerald-50 rounded-lg text-slate-400"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="relative mb-2">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Cari..."
                  className="w-full pl-9 pr-3 py-1.5 bg-emerald-50/50 border-none rounded-lg text-[11px] font-medium focus:ring-1 focus:ring-emerald-500/20 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-1 pb-1 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all flex items-center gap-2
                      ${selectedCategory === cat ? "bg-slate-900 text-white shadow-xl" : "bg-white border border-slate-100 text-slate-400 hover:border-emerald-100"}`}
                  >
                    {cat !== "Semua" && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getCategoryColor(cat) }}
                      />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 py-2 pb-20 space-y-3 custom-scrollbar select-text">
              {filteredData.map((item, index) => (
                <SidebarItem
                  key={`${item.Nama}-${index}`}
                  item={item}
                  index={index}
                  handleZoomTo={handleZoomTo}
                />
              ))}
            </div>

            {/* Resize Handle */}
            <div
              onMouseDown={() => setIsResizing(true)}
              className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors z-[2002]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow relative bg-slate-50">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-6 left-6 z-[2000] bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 active:scale-90 transition-all"
          >
            <Menu size={24} />
          </button>
        )}

        <MapContainer
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          className="w-full h-full"
          zoomControl={false}
          attributionControl={false}
        >
          <ChangeView center={mapConfig.center} zoom={mapConfig.zoom} />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Peta Berwarna">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satelit">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Peta Modern (Minimalis)">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Peta Terang (Voyager)">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
          </LayersControl>

          {filteredData.map((item, index) => (
            <Marker
              key={`${item.Nama}-${index}`}
              position={[item.Latitude, item.Longitude]}
              icon={createCustomIcon(item.Kategori)}
            >
              <Tooltip
                key={`tooltip-${index}-${showLabelsAlways}`}
                permanent={showLabelsAlways}
                direction="top"
                offset={[0, -25]}
              >
                <div className="bg-white px-2 py-1 rounded-full shadow-xl border border-emerald-100 flex items-center gap-1.5 pointer-events-none">
                  <div className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-black text-[8px] uppercase tracking-tighter">
                    {item.Nama}
                  </span>
                </div>
              </Tooltip>
              <Popup maxWidth={360}>
                <div className="w-full bg-white overflow-hidden rounded-[32px] shadow-sm select-text">
                  <div className="relative h-44 overflow-hidden bg-emerald-50">
                    <img
                      src={item.Gambar}
                      alt={item.Nama}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="bg-emerald-500 text-white text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block italic">
                        {item.Kategori}
                      </span>
                      <h3 className="text-white font-black text-xl uppercase italic leading-none m-0">
                        {item.Nama}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-8">
                      <div className="mt-1 bg-emerald-50 p-2 rounded-xl text-emerald-600 shrink-0">
                        <Info size={16} />
                      </div>
                      <p className="text-slate-500 text-[13px] leading-relaxed font-medium italic m-0">
                        {item.Deskripsi ||
                          "Keindahan alam yang mempesona menanti Anda."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${item.Latitude}, ${item.Longitude}`,
                          );
                          alert("Koordinat disalin!");
                        }}
                        className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest group shrink-0"
                      >
                        <Copy
                          size={14}
                          className="opacity-50 group-hover:opacity-100"
                        />
                        <span>Salin Koordinat</span>
                      </button>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${item.Latitude},${item.Longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 text-[11px] font-black px-5 py-3 rounded-2xl shadow-xl shadow-emerald-100/50 transition-all active:scale-95 uppercase tracking-wider whitespace-nowrap border border-emerald-100"
                      >
                        <Navigation size={14} fill="#047857" color="#047857" />
                        <span>RUTE TERCEPAT</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <div className="absolute bottom-10 right-10 z-[1000] flex flex-col gap-4">
            <div className="flex flex-col bg-white/80 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white p-2 text-emerald-600">
              <button
                onClick={() =>
                  setMapConfig((prev) => ({ ...prev, zoom: prev.zoom + 1 }))
                }
                className="w-14 h-14 hover:bg-white text-slate-900 flex items-center justify-center rounded-3xl transition-all active:scale-90"
              >
                <span className="text-3xl font-light">+</span>
              </button>
              <button
                onClick={() =>
                  setMapConfig((prev) => ({ ...prev, zoom: prev.zoom - 1 }))
                }
                className="w-14 h-14 hover:bg-white text-slate-900 flex items-center justify-center rounded-3xl transition-all active:scale-90"
              >
                <span className="text-3xl font-light">-</span>
              </button>
            </div>
            <button
              onClick={() => setShowLabelsAlways(!showLabelsAlways)}
              className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 border border-white backdrop-blur-2xl ${showLabelsAlways ? "bg-emerald-600 text-white" : "bg-white/80 text-slate-900 hover:bg-white"}`}
            >
              <Settings2 size={24} />
            </button>
          </div>

          <div className="absolute bottom-10 left-10 z-[1000] hidden lg:block pointer-events-none">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl">
              <div className="bg-emerald-900 p-1.5 rounded-xl text-white">
                <MapIcon size={16} />
              </div>
              <div>
                <h1 className="text-xs font-black text-slate-900 leading-none uppercase">
                  Lombok Barat
                </h1>
                <p className="text-emerald-700 text-[7px] font-black uppercase tracking-[0.2em] mt-0.5">
                  Nature & Culture
                </p>
              </div>
            </div>
          </div>
        </MapContainer>
      </div>
    </div>
  );
};

export default memo(TourismMap);
