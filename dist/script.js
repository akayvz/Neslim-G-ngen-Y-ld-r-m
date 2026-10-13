const services = {
  skin: {
    kicker: "Bakım / 01",
    title: "Cilt bakımı",
    copy: "Cilt bakımı, birden fazla rehberde bu şube için listeleniyor. Uygulama içeriği, kullanılan ürünler ve seans uygunluğu için şubeyle görüşün.",
    image: "assets/facial.jpg",
    alt: "Konsept cilt bakımı uygulaması",
  },
  hair: {
    kicker: "Saç / 02",
    title: "Kesim & renk",
    copy: "Kadın saç kesimi ile ombre ve sombre uygulamaları bir şube rehberinde yer alıyor. Güncel ekip, işlem kapsamı ve müsaitlik için teyit gereklidir.",
    image: "assets/atmosphere.jpg",
    alt: "Konsept modern salon iç mekânı",
  },
  hand: {
    kicker: "Bakım / 03",
    title: "El & ayak",
    copy: "Manikür ve pedikür seçenekleri bir bağımsız rehberde listeleniyor. Kullanılan teknikler ve güncel hizmet kapsamı şubeden doğrulanmalıdır.",
    image: "assets/products.jpg",
    alt: "Konsept bakım ürünleri ve salon alanı",
  },
  look: {
    kicker: "Detay / 04",
    title: "Kaş & kirpik",
    copy: "Kirpik lifting ve kaş laminasyonu üçüncü taraf rehberde hizmet adayı olarak yer alıyor. Randevu oluşturmadan önce uygulama detaylarını sorun.",
    image: "assets/hero.jpg",
    alt: "Konsept aydınlık bakım odası",
  },
  smooth: {
    kicker: "Bakım / 05",
    title: "Pürüzsüzlük",
    copy: "Ağda ve lazer epilasyon bir bağımsız rehberde listeleniyor. Cihaz, yöntem, uygunluk ve seans bilgileri bu sayfa tarafından doğrulanmamıştır.",
    image: "assets/facial.jpg",
    alt: "Konsept profesyonel bakım uygulaması",
  },
};

const tabs = [...document.querySelectorAll(".service-tab")];
const panel = document.querySelector(".service-panel");
const serviceImage = document.querySelector("#service-image");
const serviceKicker = document.querySelector("#service-kicker");
const serviceTitle = document.querySelector("#service-title");
const serviceCopy = document.querySelector("#service-copy");

tabs.forEach((tab, index) => { tab.tabIndex = index === 0 ? 0 : -1; });

function selectService(tab) {
  const data = services[tab.dataset.service];
  if (!data || tab.classList.contains("is-active")) return;
  tabs.forEach((item) => {
    const isSelected = item === tab;
    item.classList.toggle("is-active", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
    item.tabIndex = isSelected ? 0 : -1;
  });
  panel.classList.add("is-changing");
  window.setTimeout(() => {
    serviceKicker.textContent = data.kicker;
    serviceTitle.textContent = data.title;
    serviceCopy.textContent = data.copy;
    serviceImage.src = data.image;
    serviceImage.alt = data.alt;
    panel.setAttribute("aria-labelledby", tab.id);
    panel.classList.remove("is-changing");
  }, 180);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectService(tab));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    next.focus();
    selectService(next);
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

document.querySelector("#year").textContent = String(new Date().getFullYear());

// Synqrix için bilinçli olarak pasif entegrasyon noktası.
// Doğrulanmış endpoint ve açık onay sağlandığında true yapılabilir.
window.SynqrixChatbotMount = Object.freeze({
  enabled: false,
  branchId: "ng-yildirim-bursa",
  mount() {
    if (!this.enabled) return false;
    return false;
  },
});
