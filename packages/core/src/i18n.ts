export type SupportedLocale = "en" | "id";

export const UI_TRANSLATIONS = {
  en: {
    startAssessment: "Start Assessment",
    retakeAssessment: "Retake Assessment",
    copyReport: "Copy Report",
    reportCopied: "Cognitive Report copied to clipboard",
    exportPdf: "Export PDF",
    share: "Share",
    question: "Question",
    of: "of",
    stronglyDisagree: "Strongly Disagree",
    disagree: "Disagree",
    neutral: "Neutral",
    agree: "Agree",
    stronglyAgree: "Strongly Agree",
    verifiedProfile: "COGNITIVE PROFILE VERIFIED",
    academicMajors: "Recommended Academic Majors",
    careerTrajectories: "Aligned Career Trajectories",
    instantSearch: "Instant Trajectory Search",
  },
  id: {
    startAssessment: "Mulai Asesmen",
    retakeAssessment: "Ulangi Asesmen",
    copyReport: "Salin Laporan",
    reportCopied: "Laporan Kognitif berhasil disalin ke papan klip",
    exportPdf: "Ekspor PDF",
    share: "Bagikan",
    question: "Pertanyaan",
    of: "dari",
    stronglyDisagree: "Sangat Tidak Setuju",
    disagree: "Tidak Setuju",
    neutral: "Netral",
    agree: "Setuju",
    stronglyAgree: "Sangat Setuju",
    verifiedProfile: "PROFIL KOGNITIF TERVERIFIKASI",
    academicMajors: "Rekomendasi Program Studi / Jurusan",
    careerTrajectories: "Peluang & Jalur Karir Selaras",
    instantSearch: "Pencarian Jalur Karir Instan",
  },
} as const;

export const QUESTION_TRANSLATIONS_ID: Record<string, string> = {
  "EI-01":
    "Saya merasa berenergi dan terstimulasi saat terlibat dalam interaksi sosial yang dinamis.",
  "EI-02": "Saya cenderung mengungkapkan pikiran secara spontan saat berdiskusi dalam kelompok.",
  "EI-03":
    "Saya merasa nyaman dan menikmati menjadi pusat perhatian dalam berbagai suasana sosial.",
  "EI-04":
    "Setelah beraktivitas sosial yang intens, saya memerlukan waktu sendiri untuk memulihkan energi.",
  "EI-05":
    "Saya lebih memilih lingkaran pertemanan yang kecil dan mendalam daripada jaringan yang luas namun kasual.",
  "EI-06":
    "Saya cenderung merenungkan dan memproses ide dalam benak sendiri sebelum menyampaikannya secara lisan.",
  "SN-01":
    "Saya lebih fokus pada fakta konkret dan data nyata di hadapan saya daripada pola teoritis abstrak.",
  "SN-02": "Saya lebih menyukai petunjuk bertahap yang praktis dan terbukti efektif.",
  "SN-03":
    "Saya sangat memperhatikan detail lingkungan sekitar dan mengandalkan pengalaman masa lalu yang nyata.",
  "SN-04":
    "Saya sering membayangkan kemungkinan-kemungkinan masa depan dan makna tersirat di balik sesuatu.",
  "SN-05":
    "Saya lebih tertarik pada konsep inovatif, teori, dan ide-ide yang belum teruji daripada metode konvensional.",
  "SN-06":
    "Saya suka membaca yang tersirat dan menghubungkan hal-hal yang tampak tidak berkaitan menjadi visi holistik.",
  "TF-01":
    "Saya memprioritaskan logika objektif, konsistensi, dan prinsip keadilan saat membuat keputusan.",
  "TF-02":
    "Saya mengandalkan analisis rasional dan kritik membangun tanpa melibatkan bias emosional.",
  "TF-03":
    "Dalam memecahkan masalah, kebenaran dan efisiensi faktual lebih diutamakan daripada kenyamanan perasaan.",
  "TF-04":
    "Saya sangat mempertimbangkan perasaan orang lain dan dampak emosional sebelum mengambil keputusan.",
  "TF-05":
    "Menjaga keharmonisan hubungan dan empati antar individu lebih utama bagi saya daripada memenangkan argumen.",
  "TF-06":
    "Saya mudah merasakan getaran emosional di sekitar saya dan terdorong untuk memberikan dukungan moral.",
  "JP-01": "Saya merasa tenang ketika rencana dan jadwal harian saya terstruktur secara rapi.",
  "JP-02": "Saya selalu menyelesaikan tugas jauh sebelum tenggat waktu agar tidak terburu-buru.",
  "JP-03":
    "Saya lebih memilih kepastian, keputusan tegas, dan kejelasan arah daripada situasi yang menggantung.",
  "JP-04":
    "Saya menikmati fleksibilitas dan keterbukaan terhadap peluang baru daripada jadwal yang kaku.",
  "JP-05":
    "Saya mudah beradaptasi dengan perubahan mendadak dan menyukai spontanitas dalam bekerja.",
  "JP-06":
    "Saya lebih suka membiarkan berbagai pilihan tetap terbuka hingga menit-menit terakhir sebelum memutuskan.",
};
