import { useState, useEffect } from "react";
import { Map as MapIcon, Sun, Clock, Languages } from "lucide-react";

import TourismMap from "./components/TourismMap";
import Destinasi from "./components/Destinasi";
import Statistik from "./components/Statistik";
import TentangKami from "./components/TentangKami";

function App() {
  const [activePage, setActivePage] = useState("eksplorasi");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lang, setLang] = useState<"ID" | "EN">("ID");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "eksplorasi":
        return <TourismMap lang={lang} />;
      case "destinasi":
        return <Destinasi lang={lang} />;
      case "statistik":
        return <Statistik />;
      case "tentang-kami":
        return <TentangKami />;
      default:
        return <TourismMap lang={lang} />;
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
                {lang === "ID"
                  ? "Pesona Alam & Budaya NTB"
                  : "The Charm of Nature & Culture"}
              </p>
            </div>
          </div>

          {/* Widgets */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-slate-100">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
              className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl hover:bg-emerald-600 transition-all shadow-md group"
            >
              <Languages
                size={14}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang}
              </span>
            </button>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Sun size={14} className="text-amber-500" />
              <span className="text-[11px] font-black text-slate-600 tracking-tight">
                29°C
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Clock size={14} className="text-emerald-500" />
              <span className="text-[11px] font-black text-slate-600 tracking-tight">
                {currentTime.toLocaleTimeString(
                  lang === "ID" ? "id-ID" : "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-6 md:gap-8 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 overflow-x-auto no-scrollbar whitespace-nowrap pb-1 md:pb-0">
          {["eksplorasi", "destinasi", "statistik", "tentang-kami"].map(
            (page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`hover:text-emerald-600 transition-all relative py-1 capitalize flex-shrink-0 ${
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
