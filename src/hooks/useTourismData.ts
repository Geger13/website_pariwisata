import { useState, useEffect, useMemo } from "react";
import type { TourismData, GeoJSONData } from "../types";
import geoDataRaw from "../assets/data/data_pariwisata.json";

export const useTourismData = () => {
  const [data, setData] = useState<TourismData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const jsonData = geoDataRaw as unknown as GeoJSONData;

      const cleanedData: TourismData[] = jsonData.features
        .filter((feature) => feature.geometry.type === "Point")
        .map((feature) => {
          const { properties, geometry } = feature;
          const nama = String(
            properties.Nama_Lokasi ||
              properties.Nama ||
              properties.Name ||
              "Tanpa Nama",
          );
          const deskripsi = String(
            properties.Deskripsi ||
              properties.Jenis_Wisata ||
              properties.Description ||
              "",
          );
          const kategoriRaw = String(
            properties.Kategori || properties.Jenis_Wisata || "Lainnya",
          );

          return {
            Nama: nama,
            Longitude: geometry.coordinates[0],
            Latitude: geometry.coordinates[1],
            Deskripsi: deskripsi,
            Kategori: normalizeCategory(kategoriRaw),
            Gambar: getGambar(nama),
          };
        });
      setData(cleanedData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memuat data",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const categories = useMemo(
    () => [
      "Semua",
      "Admin-commemorative",
      "Descriptive-natural",
      "Ethno-cultural",
      "Morpho-geographic",
    ],
    [],
  );

  return { data, categories, loading, error };
};

const normalizeCategory = (kategori: string): string => {
  const k = kategori.toLowerCase();
  if (k.includes("admin")) return "Admin-commemorative";
  if (k.includes("descriptive")) return "Descriptive-natural";
  if (k.includes("ethno")) return "Ethno-cultural";
  if (k.includes("morpho")) return "Morpho-geographic";
  return "Morpho-geographic"; // Default fallback
};

const getGambar = (nama: string) => {
  const mapping: { [key: string]: string } = {
    "Wisata Alam Aiknyet": "aik_nyet.png",
    "Aik Nyet": "aik_nyet.png",
    "Air Terjun Timponan": "airterjun_timponan.png",
    "Wisata Bunut Ngengkang": "bunut_ngengkang.png",
    "Wisata Alam Batu Gendang": "bukit_batu_gendnag.png",
    "Wisata Bukit Batu Gendang": "bukit_batu_gendnag.png",
    "Taman Wisata Alam Kerandangan": "hutan_wisata_kerandangan.png",
    "TWA Suranadi": "hutan_wisata_suranadi.png",
    "Pemandian Suranadi": "hutan_wisata_suranadi.png",
    "Desa Wisata Sesaot": "sesaot.png",
    "Taman Mekarsari Narmada": "taman_narmada.png",
    "Pantai Kuranji Lombok Barat": "pantai_lembayung_kuranji.png",
    "Pantai Meninting": "bendungan_meninting.png",
    "Pantai Senggigi": "pantai_senggigi.png",
    "Pantai Batu Bolong": "pantai_batubolong.png",
    "Pantai Batu Layar": "pantai_batulayar.png",
    "Pantai Gading": "pantai_gading.png",
    "Pantai Loang Baloq": "pantai_loang_baloq.png",
    "Pantai Mapak": "pantai_mapak.png",
    "Pantai Tanjung Bias": "pantai_tanjung_bias.png",
    "Pantai Cemara": "pantai_cemara.png",
    "Pantai Duduk Batu Bolong": "pantai_duduk_batubolong.png",
    "Bukit Senggigi": "bukit_senggigi.png",
    "Bukit Cacing": "bukit_cacing.png",
    "Bukit Keteri": "bukit_keteri.png",
    "Bukit Pepe": "bukit_pepe.png",
    "Gunung Sasak": "gunung_sasak.png",
    "Bendungan Meninting": "bendungan_meninting.png",
  };

  const filename = mapping[nama];
  if (filename) {
    return `/assets/images/${filename}`;
  }
  return `https://placehold.co/400x250/f1f5f9/059669?text=FOTO+WISATA`;
};
