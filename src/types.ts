export interface TourismData {
  Nama: string;
  Latitude: number;
  Longitude: number;
  Deskripsi_ID: string;
  Deskripsi_EN: string;
  Kategori: string;
  Gambar?: string;
}

export interface GeoJSONFeature {
  type: string;
  properties: {
    Nama?: string;
    Name?: string;
    Deskripsi?: string;
    Description?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude] in GeoJSON
  };
}

export interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}
