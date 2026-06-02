import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface LanguageStat {
  language: string;
  total: number;
}

interface CategoryBreakdown {
  category: string;
  language: string;
  total: number;
}

interface StatsData {
  languageDistribution: LanguageStat[];
  categoryLanguageBreakdown: CategoryBreakdown[];
}

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

const Statistik: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/tourism_stats.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setError(err.message);
      });
  }, []);

  if (error)
    return (
      <div className="p-8 text-center text-red-600 font-bold">
        Error: {error}
      </div>
    );
  if (!stats)
    return (
      <div className="p-8 text-center font-bold text-slate-400">
        Loading statistics...
      </div>
    );

  // Simple Data Processing
  const totalDestinations = stats.languageDistribution.reduce(
    (acc, curr) => acc + curr.total,
    0,
  );
  const sortedLanguages = [...stats.languageDistribution].sort(
    (a, b) => b.total - a.total,
  );
  const categories = Array.from(
    new Set(stats.categoryLanguageBreakdown.map((d) => d.category)),
  );

  return (
    <div className="h-full overflow-y-auto bg-slate-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200">
              <TrendingUp size={28} />
            </div>
            Statistik Semiotik
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            Analisis Toponimi Destinasi Wisata Lombok Barat
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Total Destinasi
            </p>
            <p className="text-3xl font-black text-slate-900">
              {totalDestinations}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Bahasa Terbanyak
            </p>
            <p className="text-3xl font-black text-slate-900">Sasak</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Kategori Utama
            </p>
            <p className="text-xl font-black text-slate-900 leading-tight">
              Morpho-Geographic
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[400px]">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
              Sebaran Bahasa
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedLanguages.slice(0, 8)} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="language"
                    type="category"
                    width={100}
                    tick={{ fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#10b981"
                    radius={[0, 4, 4, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[400px]">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
              Proporsi Utama
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sortedLanguages.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="total"
                    nameKey="language"
                    isAnimationActive={false}
                  >
                    {sortedLanguages.slice(0, 5).map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
          Detail per Kategori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const catData = stats.categoryLanguageBreakdown.filter(
              (d) => d.category === cat,
            );
            const total = catData.reduce((acc, curr) => acc + curr.total, 0);
            return (
              <div
                key={cat}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
              >
                <h3 className="font-black text-slate-900 uppercase text-xs mb-4">
                  {cat} ({total} Lokasi)
                </h3>
                <div className="space-y-2">
                  {catData
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 4)
                    .map((item) => (
                      <div
                        key={item.language}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-grow bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full"
                            style={{ width: `${(item.total / total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 w-24 truncate">
                          {item.language}
                        </span>
                        <span className="text-[10px] font-black text-slate-900 w-8 text-right">
                          {item.total}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistik;
