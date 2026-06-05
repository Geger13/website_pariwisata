import { motion } from "framer-motion";
import { Info, Users, ShieldCheck, Map } from "lucide-react";

const TentangKami = ({ lang = "ID" }: { lang?: "ID" | "EN" }) => {
  const content = {
    ID: {
      title: "Tentang Kami",
      description:
        "Portal Pariwisata Interaktif Lombok Barat adalah inisiatif digital untuk memperkenalkan keindahan alam dan kekayaan budaya kami kepada dunia melalui teknologi pemetaan modern.",
      vision: "Visi",
      visionDesc:
        "Menjadi pusat informasi pariwisata digital terlengkap di NTB.",
      mission: "Misi",
      missionDesc: "Mempermudah wisatawan mengeksplorasi destinasi unggulan.",
      quality: "Kualitas",
      qualityDesc: "Menyajikan data koordinat dan informasi yang akurat.",
      deptName: "Dinas Pariwisata Lombok Barat",
      address: "Alamat: Kompleks Perkantoran Giri Menang, Gerung",
      footer:
        "Kami berdedikasi untuk terus memperbarui data destinasi guna memberikan pengalaman terbaik bagi para pelancong yang mengunjungi Pulau Lombok.",
    },
    EN: {
      title: "About Us",
      description:
        "The West Lombok Interactive Tourism Portal is a digital initiative to introduce our natural beauty and cultural richness to the world through modern mapping technology.",
      vision: "Vision",
      visionDesc:
        "To be the most comprehensive digital tourism information center in NTB.",
      mission: "Mission",
      missionDesc:
        "To make it easier for tourists to explore top destinations.",
      quality: "Quality",
      qualityDesc: "Providing accurate coordinate data and information.",
      deptName: "West Lombok Tourism Office",
      address: "Address: Giri Menang Office Complex, Gerung",
      footer:
        "We are dedicated to continuously updating destination data to provide the best experience for travelers visiting Lombok Island.",
    },
  };

  const t = lang === "ID" ? content.ID : content.EN;

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-8 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">
            {t.title}
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full shadow-lg shadow-emerald-200"></div>
          <p className="mt-6 text-slate-600 font-medium text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Map size={32} />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">
              {t.vision}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{t.visionDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">
              {t.mission}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {t.missionDesc}
            </p>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">
              {t.quality}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {t.qualityDesc}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black italic mb-6">{t.deptName}</h3>
            <div className="space-y-4 text-slate-400 font-medium">
              <div className="flex items-center gap-4">
                <Info size={20} className="text-emerald-500" />
                <span>{t.address}</span>
              </div>
              <p>{t.footer}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TentangKami;
