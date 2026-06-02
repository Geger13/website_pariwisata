# 🌴 Website Peta & Statistik Pariwisata Lombok Barat

Website interaktif untuk eksplorasi destinasi wisata di Lombok Barat. Proyek ini menggabungkan visualisasi peta berbasis data spasial (GeoJSON) dengan analisis statistik kunjungan dan fasilitas wisata.

## ✨ Fitur Utama
- **📍 Peta Wisata Interaktif**: Visualisasi titik wisata menggunakan data GeoJSON dari ArcGIS dengan fitur zoom-to-location.
- **📊 Dashboard Statistik**: Visualisasi data kunjungan dan kategori wisata menggunakan grafik interaktif (Recharts).
- **🔎 Katalog Destinasi**: Daftar destinasi wisata yang dikelompokkan berdasarkan kategori dengan tampilan modern.
- **📱 Responsive Design**: Optimal untuk tampilan desktop maupun perangkat mobile.
- **🚀 Performa Tinggi**: Menggunakan Vite untuk build yang cepat dan kompresi aset (Gzip/Brotli).

## 🛠️ Teknologi
- **Core**: React 19 + TypeScript + Vite
- **Mapping**: Leaflet & React-Leaflet
- **Visualization**: Recharts (Statistik & Grafik)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data**: GeoJSON (Spasial) & JSON (Statistik)

## 🚀 Cara Menjalankan Secara Lokal
1. **Clone repositori**:
   ```bash
   git clone <url-repo-anda>
   cd website_pariwisata
   ```
2. **Instal dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan mode pengembangan**:
   ```bash
   npm run dev
   ```
4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

## 🌐 Deployment (Vercel)
Proyek ini dioptimalkan untuk di-deploy ke **Vercel**:
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Vercel akan otomatis mendeteksi konfigurasi Vite.
3. Klik **Deploy**.

## 📁 Struktur Data
- `public/data_pariwisata.geojson`: Data spasial titik wisata.
- `public/tourism_stats.json`: Data statistik kunjungan.
- `src/components/`: Komponen UI (Map, Statistik, Destinasi).

---

