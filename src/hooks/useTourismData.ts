import { useState, useEffect, useMemo } from "react";
import type { TourismData, GeoJSONData } from "../types";
import geoDataRaw from "../assets/data/data_pariwisata.json";

export const useTourismData = () => {
  const [data, setData] = useState<TourismData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // geoDataRaw otomatis di-parse sebagai objek JSON oleh Vite
      const jsonData = geoDataRaw as unknown as GeoJSONData;

      const cleanedData: TourismData[] = jsonData.features
        .filter((feature) => feature.geometry.type === "Point")
        .map((feature) => {
          const { properties, geometry } = feature;
          return {
            Nama: String(
              properties.Nama_Lokasi ||
                properties.Nama ||
                properties.Name ||
                "Tanpa Nama",
            ),
            Longitude: geometry.coordinates[0],
            Latitude: geometry.coordinates[1],
            Deskripsi: String(
              properties.Deskripsi ||
                properties.Jenis_Wisata ||
                properties.Description ||
                "",
            ),
            Kategori: getKategoriBaru(
              String(
                properties.Jenis_Wisata || properties.Kategori || "Lainnya",
              ),
            ),
            Gambar: getGambar(
              String(
                properties.Nama_Lokasi ||
                  properties.Nama ||
                  properties.Name ||
                  "Tanpa Nama",
              ),
            ),
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
      "Admin-Commemorative",
      "Descriptive-Natural",
      "Ethno-Cultural",
      "Morpho-Geographic",
    ],
    [],
  );

  return { data, categories, loading, error };
};

const getKategoriBaru = (jenis: string): string => {
  const j = jenis.toLowerCase();

  if (j.includes("morpho")) return "Morpho-Geographic";
  if (j.includes("ethno")) return "Ethno-Cultural";
  if (j.includes("descriptive")) return "Descriptive-Natural";
  if (j.includes("admin")) return "Admin-Commemorative";

  if (
    j.includes("bukit") ||
    j.includes("gunung") ||
    j.includes("savana") ||
    j.includes("goa") ||
    j.includes("puncak") ||
    j.includes("batu") ||
    j.includes("panorama")
  ) {
    return "Morpho-Geographic";
  }

  if (
    j.includes("desa") ||
    j.includes("budaya") ||
    j.includes("edukasi") ||
    j.includes("kuliner") ||
    j.includes("makan") ||
    j.includes("kampung") ||
    j.includes("agro") ||
    j.includes("sejarah")
  ) {
    return "Ethno-Cultural";
  }

  if (
    j.includes("pantai") ||
    j.includes("air terjun") ||
    j.includes("danau") ||
    j.includes("telaga") ||
    j.includes("hutan") ||
    j.includes("alam") ||
    j.includes("pemandian") ||
    j.includes("kolam") ||
    j.includes("curug") ||
    j.includes("tibu")
  ) {
    return "Descriptive-Natural";
  }

  if (
    j.includes("taman") ||
    j.includes("rekreasi") ||
    j.includes("wahana") ||
    j.includes("water") ||
    j.includes("pusat") ||
    j.includes("area") ||
    j.includes("bendungan") ||
    j.includes("studio")
  ) {
    return "Admin-Commemorative";
  }

  return "Descriptive-Natural"; // Default
};

const getGambar = (nama: string) => {
  const mapping: { [key: string]: string } = {
    "Wisata Alam Aiknyet": "aik_nyet.png",
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
