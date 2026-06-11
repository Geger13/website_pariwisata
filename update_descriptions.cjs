const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/assets/data/data_pariwisata.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const updates = {
  "Aik Nyet": {
    id: "Pemandian alam Aik Nyet (Air Dingin) merupakan kolam pemandian alami dengan air jernih dan segar yang bersumber langsung dari mata air pegunungan, dikelilingi oleh rimbunnya hutan mahoni Sesaot.",
    en: "Aik Nyet (Cold Water) natural bath is a clear and fresh natural swimming pool sourced directly from mountain springs, surrounded by the lush mahogany forest of Sesaot.",
  },
  "Air Terjun Timponan": {
    id: "Air terjun tersembunyi dengan ketinggian sekitar 40-50 meter di tengah hutan lindung, menawarkan suasana yang sangat alami, sejuk, dan tenang bagi para pecinta trekking.",
    en: "A hidden waterfall standing 40-50 meters high in the heart of a protected forest, offering a very natural, cool, and peaceful atmosphere for trekking enthusiasts.",
  },
  "Bunut Ngengkang": {
    id: "Destinasi pemandian alami yang ikonik dengan sebuah pohon beringin (Bunut) besar yang akarnya menjulur menyerupai kaki terbuka (Ngengkang) di atas aliran air yang jernih.",
    en: "An iconic natural bathing destination featuring a large banyan tree (Bunut) with roots stretching out like open legs (Ngengkang) over clear flowing water.",
  },
  "Bukit Batu Gendang": {
    id: "Menawarkan panorama 360 derajat dari ketinggian, bukit ini adalah lokasi favorit untuk berburu sunset dan camping dengan pemandangan Gunung Sasak serta lembah yang hijau.",
    en: "Offering 360-degree panoramas from its peak, this hill is a favorite location for sunset hunting and camping with views of Mount Sasak and green valleys.",
  },
  "Hutan Wisata Kerandangan": {
    id: "Taman Wisata Alam yang menawarkan jalur trekking menantang, air terjun Putri Kembar, serta menjadi habitat bagi berbagai spesies burung endemik Lombok.",
    en: "A Nature Tourism Park offering challenging trekking trails, the Putri Kembar waterfall, and serving as a habitat for various endemic bird species of Lombok.",
  },
  "Hutan Wisata Suranadi": {
    id: "Hutan wisata tertua di Lombok yang dikenal dengan udaranya yang sejuk, kawanan monyet yang jinak, serta keberadaan 21 mata air suci yang dikeramatkan.",
    en: "The oldest forest park in Lombok, known for its cool air, groups of friendly monkeys, and the presence of 21 sacred springs.",
  },
  "Desa Wisata Sesaot": {
    id: "Desa wisata berbasis masyarakat yang menawarkan keasrian hutan lindung, pemandian alami, jalur trekking, dan pusat rekreasi keluarga Purekmas.",
    en: "A community-based tourism village offering pristine protected forests, natural baths, trekking trails, and the Purekmas family recreation center.",
  },
  "Taman Narmada": {
    id: "Dibangun pada 1727 sebagai replika Gunung Rinjani dan Danau Segara Anak, taman bersejarah ini terkenal dengan kolam pemandian dan mata air 'Awet Muda'.",
    en: "Built in 1727 as a replica of Mount Rinjani and Segara Anak Lake, this historical park is famous for its swimming pools and the 'Youth Water' spring.",
  },
  "Pantai Kuranji": {
    id: "Pantai unik dengan pasir berwarna hitam dan putih yang bersanding, menjadi spot favorit warga untuk menikmati sunset dengan latar Gunung Agung Bali.",
    en: "A unique beach featuring side-by-side black and white sand, it is a favorite local spot to enjoy sunsets with Mount Agung in Bali as a backdrop.",
  },
  "Pantai Meninting": {
    id: "Berlokasi di muara sungai, pantai berpasir hitam ini menawarkan suasana tenang untuk memancing dan melihat aktivitas nelayan tradisional dengan perahu-perahunya.",
    en: "Located at a river estuary, this black sand beach offers a peaceful atmosphere for fishing and watching traditional fishermen activities with their boats.",
  },
  "Pantai Senggigi": {
    id: "Ikon pariwisata utama Lombok Barat dengan garis pantai yang panjang, air laut yang jernih untuk snorkeling, serta fasilitas hotel dan restoran yang sangat lengkap.",
    en: "The main tourism icon of West Lombok with a long coastline, crystal clear waters for snorkeling, and very complete hotel and restaurant facilities.",
  },
  "Pantai Batu Bolong": {
    id: "Dikenal with pura suci yang berdiri di atas batu karang berlubang menjorok ke laut, pantai ini menawarkan salah satu pemandangan sunset terbaik di Pulau Lombok.",
    en: "Known for the sacred temple standing on a hollow rock jutting into the sea, this beach offers one of the best sunset views on Lombok Island.",
  },
  "Pantai Batu Layar": {
    id: "Destinasi wisata religi dan alam yang tenang, di mana terdapat Makam Batu Layar yang dikeramatkan serta area pesisir yang nyaman untuk bersantai bersama keluarga.",
    en: "A peaceful religious and natural destination, home to the sacred Batu Layar Tomb and a coastal area comfortable for family relaxation.",
  },
  "Pantai Gading": {
    id: "Pantai yang populer di kalangan warga lokal dengan deretan lapak kuliner tradisional dan suasana sore yang sejuk di bawah pepohonan rindang.",
    en: "A popular beach among locals with rows of traditional culinary stalls and cool afternoon atmospheres under shady trees.",
  },
  "Pantai Loang Baloq": {
    id: "Kawasan wisata yang memadukan keindahan pantai, taman kota yang tertata rapi, serta wisata religi ke Makam Loang Baloq yang dikeramatkan.",
    en: "A tourism area blending beach beauty, neatly arranged city parks, and religious tourism to the sacred Loang Baloq Tomb.",
  },
  "Pantai Mapak": {
    id: "Terkenal dengan pusat konservasi dan penangkaran penyu Mapak Indah, pantai ini menawarkan wisata edukasi pelepasan tukik serta deretan kafe pesisir yang trendi.",
    en: "Famous for the Mapak Indah turtle conservation and hatchery center, this beach offers educational turtle release tourism and trendy coastal cafes.",
  },
  "Pantai Tanjung Bias": {
    id: "Pusat kuliner seafood tepi pantai yang sangat populer di Senteluk, menawarkan beragam hidangan laut segar dengan suasana yang hidup di sore hingga malam hari.",
    en: "A very popular seaside seafood culinary center in Senteluk, offering a variety of fresh seafood with a vibrant atmosphere from afternoon to night.",
  },
  "Pantai Cemare": {
    id: "Pantai yang asri dengan deretan pohon cemara udang yang rimbun, menawarkan air laut yang tenang dan pemandangan kapal-kapal besar di Pelabuhan Lembar.",
    en: "A pristine beach with rows of lush casuarina trees, offering calm waters and views of large ships at Lembar Harbor.",
  },
  "Pantai Duduk": {
    id: "Spot bersantai yang nyaman dengan garis pantai yang landai dan pemandangan laut lepas ke arah Selat Lombok serta Gunung Agung di kejauhan.",
    en: "A comfortable relaxing spot with a gentle shoreline and open sea views towards the Lombok Strait and Mount Agung in the distance.",
  },
  "Bukit Senggigi": {
    id: "Menawarkan sudut pandang terbaik untuk melihat lekukan garis pantai Senggigi dari ketinggian, menjadikannya lokasi favorit untuk fotografi pemandangan.",
    en: "Offering the best viewpoint to see the curves of the Senggigi coastline from above, making it a favorite location for landscape photography.",
  },
  "Bukit Cacing": {
    id: "Dikenal sebagai Cacing Fun Track, destinasi ini menawarkan jalur sepeda gunung yang menantang dan berkelok-kelok di tengah rimbunnya hutan bambu.",
    en: "Known as Cacing Fun Track, this destination offers challenging and winding mountain bike trails amidst a lush bamboo forest.",
  },
  "Bukit Keteri": {
    id: "Bukit dengan ketinggian sekitar 400 mdpl yang ramah bagi pendaki pemula, menawarkan panorama 360 derajat ke arah persawahan dan laut Selat Lombok.",
    en: "A hill standing around 400 meters high that is friendly for beginner hikers, offering 360-degree panoramas of rice fields and the Lombok Strait.",
  },
  "Bukit Pepe": {
    id: "Pos awal pendakian menuju Bukit Keteri yang menawarkan pemandangan lanskap pedesaan Lombok Barat yang hijau dan asri sejak langkah pertama pendakian.",
    en: "The starting point for the hike to Bukit Keteri, offering green and lush West Lombok rural landscapes from the very first steps of the climb.",
  },
  "Gunung Sasak": {
    id: "Kawasan perbukitan yang menyimpan nilai sejarah dan spiritual, menawarkan area camping dengan pemandangan Kota Mataram serta jalur hiking yang sejuk.",
    en: "A hilly area rich in historical and spiritual value, offering camping grounds with views of Mataram City and cool hiking trails.",
  },
  "Bendungan Meninting": {
    id: "Destinasi ekowisata baru di Lombok Barat yang menawarkan pemandangan air bendungan yang tenang dengan latar perbukitan hijau yang memanjakan mata.",
    en: "A new ecotourism destination in West Lombok offering views of calm reservoir waters against a backdrop of eye-soothing green hills.",
  },
  "Gili Nanggu": {
    id: "Pulau mungil yang tenang dengan pasir putih halus dan taman laut yang luar biasa indah, sangat cocok untuk snorkeling bersama ikan-ikan warna-warni.",
    en: "A quiet tiny island with fine white sand and extraordinary marine gardens, perfect for snorkeling with colorful fish.",
  },
  "Gili Sudak": {
    id: "Pulau yang menawarkan suasana santai dengan air laut yang tenang, terkenal sebagai tempat singgah makan siang seafood segar bagi para penjelajah pulau.",
    en: "An island offering a relaxing atmosphere with calm waters, famous as a lunch stop for fresh seafood for island hoppers.",
  },
  "Gili Kedis": {
    id: "Pulau tak berpenghuni terkecil di Sekotong yang berbentuk menyerupai hati, sering disebut sebagai pulau paling romantis untuk berfoto dan bersantai.",
    en: "The smallest uninhabited island in Sekotong shaped like a heart, often called the most romantic island for photography and relaxation.",
  },
  "Gili Gede": {
    id: "Pulau terbesar di gugusan gili Sekotong yang menawarkan keasrian budaya nelayan lokal dan menjadi destinasi favorit bagi kapal-kapal yacht internasional.",
    en: "The largest island in the Sekotong gili cluster offering authentic local fishing culture and serving as a favorite destination for international yachts.",
  },
  "Gili Asahan": {
    id: "Pulau eksotis yang tenang dengan konsep eco-tourism, menawarkan spot snorkeling 'Secret Garden' dengan keanekaragaman terumbu karang yang terjaga.",
    en: "A quiet exotic island with an eco-tourism concept, offering the 'Secret Garden' snorkeling spot with well-preserved coral reef biodiversity.",
  },
  "Gili Layar": {
    id: "Surga tersembunyi bagi pecinta bawah laut yang mencari ketenangan, menawarkan taman laut yang masih sangat alami dan jauh dari keramaian wisatawan.",
    en: "A hidden paradise for underwater lovers seeking tranquility, offering very pristine marine gardens far from the crowds of tourists.",
  },
  "Air Terjun Grepek": {
    id: "Air terjun yang unik dengan aliran air yang mengalir di sela-sela bebatuan besar, menciptakan pemandangan alami yang eksotis dan menyejukkan.",
    en: "A unique waterfall with water flowing between large rocks, creating an exotic and cooling natural sight.",
  },
  "Air Terjun Prabe": {
    id: "Terletak di kawasan Lingsar, air terjun ini menawarkan kejernihan air yang memikat dan suasana hutan yang masih asri, cocok untuk wisata petualangan ringan.",
    en: "Located in the Lingsar area, this waterfall offers captivating water clarity and a pristine forest atmosphere, perfect for light adventure tourism.",
  },
  "Air Terjun Segenter": {
    id: "Air terjun megah yang terletak di lembah tersembunyi Narmada, menyuguhkan debit air yang kuat dan kolam alami yang menyegarkan.",
    en: "A majestic waterfall located in a hidden valley of Narmada, featuring strong water flow and refreshing natural pools.",
  },
  "Air Terjun Tibu Atas": {
    id: "Dikenal dengan kolam alami (tibu) yang jernih di bagian atas aliran sungai, tempat ini adalah lokasi favorit untuk berenang dan bersantai di alam terbuka.",
    en: "Known for its clear natural pool (tibu) at the upper stream, this spot is a favorite location for swimming and relaxing in the open air.",
  },
  "Batu Kijuk": {
    id: "Formasi batuan unik di tepi laut Sekotong yang menyerupai bentuk tertentu, menjadi latar belakang yang menarik bagi para pecinta fotografi lanskap.",
    en: "A unique rock formation on the Sekotong seaside resembling a specific shape, serving as an attractive backdrop for landscape photography enthusiasts.",
  },
  "Centra Kerajinan Gerabah": {
    id: "Pusat kerajinan gerabah legendaris di Desa Banyumulek, di mana pengunjung dapat melihat langsung proses pembuatan tembikar tradisional yang sudah diekspor ke mancanegara.",
    en: "The legendary pottery craft center in Banyumulek Village, where visitors can directly witness the process of making traditional pottery that has been exported worldwide.",
  },
  "Desa Bengkaung": {
    id: "Desa wisata di perbukitan Batulayar yang terkenal dengan pemandangan matahari terbenam yang spektakuler dan deretan kafe modern dengan view pegunungan.",
    en: "A tourism village in the Batulayar hills famous for its spectacular sunset views and rows of modern cafes with mountain views.",
  },
  "Desa Buwun Mas": {
    id: "Wilayah pesisir di Sekotong yang memiliki bukit-bukit savana yang luas dan pantai yang masih perawan, sering disebut sebagai 'Surga Tersembunyi'.",
    en: "A coastal area in Sekotong featuring vast savanna hills and pristine beaches, often referred to as a 'Hidden Paradise'.",
  },
  "Desa Kebon Ayu": {
    id: "Desa wisata agro yang menawarkan pengalaman memetik buah melon langsung dari kebunnya, serta keindahan jembatan gantung peninggalan era kolonial.",
    en: "An agro-tourism village offering the experience of picking melons directly from the garden, along with the beauty of a colonial-era suspension bridge.",
  },
  "Elak-Elak": {
    id: "Semenanjung kecil dengan garis pantai yang indah dan air laut yang sangat tenang, menjadikannya tempat yang aman dan nyaman untuk berenang bersama keluarga.",
    en: "A small peninsula with a beautiful coastline and very calm waters, making it a safe and comfortable place for family swimming.",
  },
  "Embung Kedaro": {
    id: "Waduk atau penampungan air di ketinggian bukit Sekotong yang menawarkan panorama alam yang tenang dan udara yang sejuk.",
    en: "A reservoir or water catchment on the Sekotong hilltops offering a peaceful natural panorama and cool air.",
  },
  "Kebun Melon": {
    id: "Daya tarik wisata agro unggulan di Gerung, di mana pengunjung bisa menikmati manisnya melon segar berkualitas tinggi langsung dari area perkebunan.",
    en: "A premier agro-tourism attraction in Gerung, where visitors can enjoy the sweetness of high-quality fresh melons directly from the plantation area.",
  },
  Kerandangan: {
    id: "Kawasan wisata yang memadukan keindahan pantai dan hutan lindung, menawarkan jalur trekking yang teduh dan area piknik yang luas di bawah pohon kelapa.",
    en: "A tourism area blending beach beauty and protected forests, offering shaded trekking trails and spacious picnic areas under coconut trees.",
  },
  "Mangrove Bagek Kembar": {
    id: "Kawasan konservasi hutan bakau yang asri, menawarkan wisata edukasi menggunakan sampan tradisional menyusuri lorong-lorong mangrove yang rimbun.",
    en: "A pristine mangrove conservation area, offering educational tourism using traditional canoes through lush mangrove tunnels.",
  },
  "Mata Air Manggong": {
    id: "Mata air alami yang jernih dan melimpah, digunakan oleh warga lokal dan menjadi tempat pemandian yang menyegarkan di tengah suasana pedesaan yang tenang.",
    en: "A clear and abundant natural spring, used by locals and serving as a refreshing bathing spot amidst a peaceful rural atmosphere.",
  },
  "Pantai Mekaki": {
    id: "Pantai dengan garis pantai melengkung yang luas dan pasir putih yang bersih, dikelilingi oleh perbukitan hijau yang memukau di kawasan Sekotong.",
    en: "A beach with a wide curved coastline and clean white sand, surrounded by stunning green hills in the Sekotong area.",
  },
  "Pantai Nambung": {
    id: "Terkenal dengan fenomena 'air terjun laut' yang terjadi saat ombak besar menghantam tebing karang, menciptakan pemandangan yang sangat unik dan dramatis.",
    en: "Famous for the 'sea waterfall' phenomenon that occurs when large waves hit the coral cliffs, creating a very unique and dramatic sight.",
  },
  "Pantai Sepi": {
    id: "Sesuai namanya, pantai ini menawarkan ketenangan yang luar biasa dengan hamparan pasir putih yang luas dan ombak yang relatif tenang.",
    en: "As the name suggests, this beach offers extraordinary tranquility with wide stretches of white sand and relatively calm waves.",
  },
  "Pelabuhan Lembar": {
    id: "Gerbang utama masuknya kapal feri dari Bali ke Lombok, yang juga menawarkan pemandangan teluk yang sibuk dengan latar belakang pegunungan yang indah.",
    en: "The main gateway for ferries from Bali to Lombok, also offering views of a busy bay set against a beautiful mountain backdrop.",
  },
  Tawun: {
    id: "Titik keberangkatan utama untuk menyeberang menuju deretan gili eksotis di Sekotong, seperti Gili Nanggu, Gili Sudak, and Gili Kedis.",
    en: "The main departure point for crossing to the exotic islands of Sekotong, such as Gili Nanggu, Gili Sudak, and Gili Kedis.",
  },
  "Pasar Seni Sesela": {
    id: "Pusat kesenian dan kerajinan tangan di mana pengunjung bisa menemukan berbagai produk seni khas Lombok seperti cukli dan tenun tradisional.",
    en: "A center for arts and crafts where visitors can find various typical Lombok art products such as cukli and traditional weaving.",
  },
  "Mangrove Tanjung Batu": {
    id: "Kawasan pesisir dengan ekosistem mangrove yang terjaga, menawarkan pemandangan teluk yang tenang dan habitat berbagai biota laut.",
    en: "A coastal area with a preserved mangrove ecosystem, offering peaceful bay views and habitats for various marine life.",
  },
  "DAM Keru": {
    id: "Bendungan yang kini menjadi destinasi rekreasi lokal, menawarkan pemandangan air yang tenang dan pepohonan hijau di sekelilingnya.",
    en: "A dam that has now become a local recreation destination, offering peaceful water views and surrounding green trees.",
  },
  "Padang Golf Golong": {
    id: "Lapangan golf legendaris di Lombok Barat yang menawarkan tantangan bermain di tengah suasana alam pedesaan yang asri dan udara yang sejuk.",
    en: "A legendary golf course in West Lombok offering playing challenges amidst a pristine rural atmosphere and cool air.",
  },
};

data.features.forEach((feature) => {
  const props = feature.properties;
  const name = props.Nama_Lokasi;

  if (updates[name]) {
    const infoID = props.Deskripsi_ID.includes("[Info:")
      ? props.Deskripsi_ID.substring(props.Deskripsi_ID.indexOf("[Info:"))
      : "";
    const infoEN = props.Deskripsi_EN.includes("[Additional Info:")
      ? props.Deskripsi_EN.substring(
          props.Deskripsi_EN.indexOf("[Additional Info:"),
        )
      : "";

    props.Deskripsi_ID = `${updates[name].id}${infoID ? " " + infoID : ""}`;
    props.Deskripsi_EN = `${updates[name].en}${infoEN ? " " + infoEN : ""}`;
  } else {
    // General improvements for others
    if (props.Deskripsi_ID.startsWith("Pesona air terjun")) {
      props.Deskripsi_ID = props.Deskripsi_ID.replace(
        "Pesona air terjun Air Terjun",
        "Keindahan air terjun alami",
      ).replace(
        " yang menawarkan keasrian alam dan suasana yang menenangkan.",
        "",
      );
      props.Deskripsi_EN = props.Deskripsi_EN.replace(
        "The charm of Air Terjun",
        "The beauty of the natural",
      ).replace(
        " waterfall offering natural beauty and a tranquil atmosphere.",
        "",
      );
    } else if (props.Deskripsi_ID.startsWith("Eksplorasi Desa")) {
      props.Deskripsi_ID = props.Deskripsi_ID.replace(
        "Eksplorasi Desa",
        "Desa wisata",
      ).replace(
        " yang menyuguhkan perpaduan budaya lokal dan keindahan alam pedesaan.",
        " yang menawarkan keasrian alam dan kearifan lokal Sasak.",
      );
      props.Deskripsi_EN = props.Deskripsi_EN.replace(
        "Explore Desa",
        "The tourism village of",
      ).replace(
        " village which offers a blend of local culture and rural natural beauty.",
        " offering natural beauty and Sasak local wisdom.",
      );
    } else if (props.Deskripsi_ID.startsWith("Indahnya Pantai")) {
      props.Deskripsi_ID = props.Deskripsi_ID.replace(
        "Indahnya Pantai",
        "Pantai",
      ).replace(
        " dengan hamparan pasir dan deburan ombak, tempat ideal untuk melepas penat.",
        " yang menawarkan panorama laut biru yang indah dan suasana yang menenangkan.",
      );
      props.Deskripsi_EN = props.Deskripsi_EN.replace(
        "The beauty of Pantai",
        "The",
      ).replace(
        " beach with its stretch of sand and soothing waves, an ideal place to unwind.",
        " beach offering beautiful blue ocean panoramas and a relaxing atmosphere.",
      );
    } else if (
      props.Deskripsi_ID.startsWith("Destinasi wisata") &&
      props.Deskripsi_ID.includes(
        "yang menawarkan pesona dan keunikan tersendiri di Lombok Barat",
      )
    ) {
      props.Deskripsi_ID = props.Deskripsi_ID.replace(
        "Destinasi wisata",
        "Objek wisata",
      ).replace(
        " yang menawarkan pesona dan keunikan tersendiri di Lombok Barat.",
        " yang menyuguhkan daya tarik alam dan budaya khas Lombok Barat.",
      );
      props.Deskripsi_EN = props.Deskripsi_EN.replace("The", "The").replace(
        " tourism destination offering its own unique charm in West Lombok.",
        " tourism destination showcasing the natural and cultural charm of West Lombok.",
      );
    }
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Successfully updated descriptions for all tourism spots.");
