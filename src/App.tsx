import { useState, useEffect } from "react";
import { Map as MapIcon, Sun, Clock } from "lucide-react";

import TourismMap from "./components/TourismMap";
import Destinasi from "./components/Destinasi";
import Statistik from "./components/Statistik";
import TentangKami from "./components/TentangKami";

function App() {
  const [activePage, setActivePage] = useState("eksplorasi");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "eksplorasi":
        return <TourismMap />;
      case "destinasi":
        return <Destinasi />;
      case "statistik":
        return <Statistik />;
      case "tentang-kami":
        return <TentangKami />;
      default:
        return <TourismMap />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-[2000] shadow-sm">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActivePage("eksplorasi")}
          >
            <div className="bg-emerald-600 p-2 rounded-xl text-white group-hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
              <MapIcon size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
                Lombok Barat
              </h1>
              <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                Pesona Alam & Budaya NTB
              </p>
            </div>
          </div>

          {/* Widgets */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Sun size={14} className="text-amber-500" />
              <span className="text-[11px] font-black text-slate-600 tracking-tight">
                29°C
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Clock size={14} className="text-emerald-500" />
              <span className="text-[11px] font-black text-slate-600 tracking-tight">
                {currentTime.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
          {["eksplorasi", "destinasi", "statistik", "tentang-kami"].map(
            (page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`hover:text-emerald-600 transition-all relative py-1 capitalize ${
                  activePage === page
                    ? "text-emerald-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:rounded-full"
                    : ""
                }`}
              >
                {page.replace("-", " ")}
              </button>
            ),
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-hidden relative">{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between z-[2000]">
        <p className="text-[11px] text-slate-400 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} G
        </p>
      </footer>
    </div>
  );
}

export default App;
