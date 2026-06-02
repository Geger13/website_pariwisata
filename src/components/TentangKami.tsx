import { motion } from "framer-motion";
import { Info, Users, ShieldCheck, Map } from "lucide-react";

const TentangKami = () => {
  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-8 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">
            Tentang Kami
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full shadow-lg shadow-emerald-200"></div>
          <p className="mt-6 text-slate-600 font-medium text-lg leading-relaxed">
            Portal Pariwisata Interaktif Lombok Barat adalah inisiatif digital
            untuk memperkenalkan keindahan alam dan kekayaan budaya kami kepada
            dunia melalui teknologi pemetaan modern.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Map size={32} />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">
              Visi
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              Menjadi pusat informasi pariwisata digital terlengkap di NTB.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">
              Misi
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              Mempermudah wisatawan mengeksplorasi destinasi unggulan.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">
              Kualitas
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              Menyajikan data koordinat dan informasi yang akurat.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black italic mb-6">Nama dinas</h3>
            <div className="space-y-4 text-slate-400 font-medium">
              <div className="flex items-center gap-4">
                <Info size={20} className="text-emerald-500" />
                <span>Alamat</span>
              </div>
              <p>
                Kami berdedikasi untuk terus memperbarui data destinasi guna
                memberikan pengalaman terbaik bagi para pelancong yang
                mengunjungi Pulau Lombok.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TentangKami;
