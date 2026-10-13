export type VerificationState = "verified" | "conflicting" | "candidate" | "unknown";

export interface SourcedValue<T> {
  value: T | null;
  status: VerificationState;
  sources: readonly string[];
  note?: string;
}

export interface ServiceEntry {
  id: string;
  label: string;
  status: "candidate";
  sources: readonly string[];
  note: string;
}

export interface BranchKnowledgeBase {
  branchId: string;
  name: SourcedValue<string>;
  supplementaryTitle: SourcedValue<string>;
  address: SourcedValue<string>;
  phone: SourcedValue<string>;
  whatsapp: SourcedValue<string>;
  hours: {
    mondayToSaturday: SourcedValue<string>;
    sunday: SourcedValue<string>;
  };
  services: readonly ServiceEntry[];
  brandRelationship: SourcedValue<string>;
  designAuthorization: SourcedValue<string>;
  reviews: SourcedValue<string>;
}

const sources = {
  salonlarim: "https://www.salonlarim.com/isletme/neslim-gungen-guzellik-merkezi",
  guzellikTakip: "https://guzelliktakip.com/merkez/neslim-gungen-guzellik-merkezi-yildirim-bursa-bagiye-kose-usta-ogretici-yildirim",
  guzellikFiyatlari: "https://guzellikfiyatlari.com/bursa/yildirim/neslim-gungen-guzellik-merkezi-yildirim-bursa/",
  franchiseDirectory: "https://franchisedunyasi.com/upload/rehber23.pdf",
} as const;

export const yildirimBranch: BranchKnowledgeBase = {
  branchId: "ng-yildirim-bursa",
  name: {
    value: "Neslim Güngen Güzellik Merkezi – Yıldırım/Bursa",
    status: "verified",
    sources: [sources.salonlarim, sources.guzellikTakip, sources.guzellikFiyatlari],
  },
  supplementaryTitle: {
    value: "Bagiye Köse Usta Öğretici",
    status: "candidate",
    sources: [sources.guzellikTakip],
    note: "Rehber kaydında geçiyor; güncel ticari unvan ve marka kullanımı şubeden teyit edilmelidir.",
  },
  address: {
    value: "Millet Mahallesi, Derya Caddesi No:107/C, Yıldırım/Bursa",
    status: "verified",
    sources: [sources.salonlarim, sources.guzellikTakip, sources.guzellikFiyatlari],
  },
  phone: {
    value: "+90 530 270 51 18",
    status: "verified",
    sources: [sources.guzellikTakip, sources.guzellikFiyatlari],
  },
  whatsapp: {
    value: null,
    status: "unknown",
    sources: [],
    note: "Telefon numarasının WhatsApp hattı olduğu doğrulanmadı.",
  },
  hours: {
    mondayToSaturday: {
      value: "10:00–19:00",
      status: "verified",
      sources: [sources.salonlarim, sources.guzellikTakip, sources.guzellikFiyatlari],
    },
    sunday: {
      value: null,
      status: "conflicting",
      sources: [sources.salonlarim, sources.guzellikFiyatlari],
      note: "Salonlarım kapalı; Güzellik Fiyatları 10:00–19:00 gösteriyor. Yayından önce şubeden teyit edilmeli.",
    },
  },
  services: [
    { id: "skin-care", label: "Cilt bakımı", status: "candidate", sources: [sources.salonlarim, sources.guzellikFiyatlari], note: "Şubeden güncel kapsam teyidi gerekir." },
    { id: "hair-cut", label: "Kadın saç kesimi", status: "candidate", sources: [sources.salonlarim], note: "Tek rehber kaynağı." },
    { id: "ombre-sombre", label: "Ombre / sombre", status: "candidate", sources: [sources.salonlarim], note: "Tek rehber kaynağı." },
    { id: "manicure", label: "Manikür", status: "candidate", sources: [sources.guzellikFiyatlari], note: "Tek rehber kaynağı." },
    { id: "pedicure", label: "Pedikür", status: "candidate", sources: [sources.guzellikFiyatlari], note: "Tek rehber kaynağı." },
    { id: "lash-lift", label: "Kirpik lifting", status: "candidate", sources: [sources.guzellikFiyatlari], note: "Tek rehber kaynağı." },
    { id: "brow-lamination", label: "Kaş laminasyonu", status: "candidate", sources: [sources.guzellikFiyatlari], note: "Tek rehber kaynağı." },
    { id: "waxing", label: "Ağda", status: "candidate", sources: [sources.guzellikFiyatlari], note: "Tek rehber kaynağı." },
    { id: "laser-hair-removal", label: "Lazer epilasyon", status: "candidate", sources: [sources.guzellikFiyatlari], note: "Tek rehber kaynağı; cihaz ve yöntem doğrulanmadı." },
  ],
  brandRelationship: {
    value: "Neslim Güngen markasının franchise ağı bulunduğuna dair arşiv kayıtları mevcut.",
    status: "candidate",
    sources: [sources.franchiseDirectory],
    note: "Yıldırım şubesinin güncel sözleşmesel statüsü birincil kaynaktan doğrulanmadı.",
  },
  designAuthorization: {
    value: null,
    status: "unknown",
    sources: [],
    note: "Üst marka logosu, kurumsal kimliği veya fotoğraf varlıkları için kullanım izni doğrulanmadı.",
  },
  reviews: {
    value: null,
    status: "conflicting",
    sources: [sources.salonlarim, sources.guzellikTakip, sources.guzellikFiyatlari],
    note: "Puan ve yorum sayıları kaynaklara göre değişiyor; izinli metin bulunmuyor.",
  },
};

export const synqrixConfig = {
  enabled: false as const,
  branchId: yildirimBranch.branchId,
  unknownFieldPolicy: "hide" as const,
  appointmentChannel: "tel" as const,
};
