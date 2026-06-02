import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Table as TableIcon, LayoutDashboard } from "lucide-react";
import geoDataRaw from "../assets/data/data_pariwisata.json";
import statsDataRaw from "../../public/tourism_stats.json";
import type { GeoJSONData } from "../types";

const CATEGORY_COLORS: { [key: string]: string } = {
  "Morpho-geographic": "#10b981", // Hijau
  "Admin-commemorative": "#3b82f6", // Biru
  "Ethno-cultural": "#ec4899", // Merah Muda
  "Descriptive-natural": "#b45309", // Cokelat/Oranye
};

const Statistik: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "table">(
    "dashboard",
  );

  // 1. Olah data untuk Stacked Bar Chart (per Kecamatan)
  const chartData = useMemo(() => {
    const geoData = geoDataRaw as unknown as GeoJSONData;
    const districtMap: { [key: string]: any } = {};

    geoData.features.forEach((feature) => {
      const location = feature.properties.Lokasi_Detail || "";
      const district = location.split(",").pop()?.trim() || "Lainnya";
      const category = feature.properties.Kategori || "Lainnya";

      if (!districtMap[district]) {
        districtMap[district] = {
          name: district,
          "Morpho-geographic": 0,
          "Admin-commemorative": 0,
          "Ethno-cultural": 0,
          "Descriptive-natural": 0,
          total: 0,
        };
      }
      if (CATEGORY_COLORS[category]) {
        districtMap[district][category]++;
        districtMap[district].total++;
      }
    });

    return Object.values(districtMap).sort((a, b) => b.total - a.total);
  }, []);

  // 2. Data untuk Tabel Tabulasi (Asal Bahasa)
  const tableData = useMemo(() => {
    return statsDataRaw.categoryLanguageBreakdown;
  }, []);

  const languageGroups = [
    "Sasak",
    "Sasak/Indonesian",
    "Indonesian",
    "Sanskrit",
    "Lainnya",
  ];

  const getTabulationData = () => {
    const categories = Object.keys(CATEGORY_COLORS);
    return categories.map((cat) => {
      const row: any = { category: cat, total: 0 };
      languageGroups.forEach((lang) => (row[lang] = 0));

      tableData.forEach((item) => {
        if (item.category.toLowerCase() === cat.toLowerCase()) {
          const lang = item.language;
          if (languageGroups.includes(lang)) {
            row[lang] += item.total;
          } else {
            row["Lainnya"] += item.total;
          }
          row.total += item.total;
        }
      });
      return row;
    });
  };

  const tabulation = getTabulationData();

  return (
    <div className="h-full overflow-y-auto bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200">
                <TrendingUp size={28} />
              </div>
              Analisis Toponim
            </h1>
            <p className="mt-2 text-slate-500 font-medium">
              Distribusi Spasial & Linguistik Nama Geografis Lombok Barat
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "dashboard"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "table"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <TableIcon size={16} />
              Tabel
            </button>
          </div>
        </div>

        {activeTab === "dashboard" ? (
          <div className="space-y-8">
            {/* Legend */}
            <div className="flex flex-wrap gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              {Object.entries(CATEGORY_COLORS).map(([name, color]) => (
                <div key={name} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Main Chart */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-10">
                Toponym Distribution by Sub-District
              </h2>
              <div className="h-[600px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ left: 40, right: 40 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={120}
                      tick={{ fontSize: 11, fontWeight: 800, fill: "#1e293b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                      }}
                    />
                    {Object.entries(CATEGORY_COLORS).map(([name, color]) => (
                      <Bar
                        key={name}
                        dataKey={name}
                        stackId="a"
                        fill={color}
                        radius={0}
                        barSize={32}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                Tabulation of Toponym Category by Language Origin
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">
                      Category
                    </th>
                    {languageGroups.map((lang) => (
                      <th
                        key={lang}
                        className="px-8 py-5 text-[10px] font-black uppercase tracking-widest"
                      >
                        {lang}
                      </th>
                    ))}
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-emerald-400 text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tabulation.map((row) => (
                    <tr
                      key={row.category}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: CATEGORY_COLORS[row.category],
                            }}
                          />
                          <span className="text-[11px] font-bold text-slate-900">
                            {row.category}
                          </span>
                        </div>
                      </td>
                      {languageGroups.map((lang) => (
                        <td
                          key={lang}
                          className="px-8 py-5 text-[11px] font-medium text-slate-500"
                        >
                          {row[lang]}
                        </td>
                      ))}
                      <td className="px-8 py-5 text-right font-black text-slate-900 text-xs">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-black">
                    <td className="px-8 py-5 text-[10px] uppercase tracking-widest">
                      Total Overall
                    </td>
                    {languageGroups.map((lang) => (
                      <td key={lang} className="px-8 py-5 text-xs">
                        {tabulation.reduce((acc, curr) => acc + curr[lang], 0)}
                      </td>
                    ))}
                    <td className="px-8 py-5 text-right text-emerald-600 text-sm">
                      {tabulation.reduce((acc, curr) => acc + curr.total, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistik;
