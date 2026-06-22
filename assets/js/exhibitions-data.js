// ============================================================
// exhibitions-data.js — أرشيف معارض قرين بروجكتس
// Exhibition Archive Data — Green Projects
// ============================================================

// لإضافة معرض جديد:
// 1. ضع صورة الغلاف في: assets/images/exhibitions/
// 2. ضع ملف PDF في: assets/pdfs/
// 3. أضف عنصراً جديداً لمصفوفة exhibitionsArchive في هذا الملف
// 4. احفظ الملف — يظهر المعرض تلقائياً في الصفحة
//
// To add a new exhibition:
// 1. Place the cover image in: assets/images/exhibitions/
// 2. Place the PDF file in: assets/pdfs/
// 3. Add a new entry to the exhibitionsArchive array in this file
// 4. Save the file — the exhibition will appear automatically on the page

const exhibitionsArchive = [
  {
    id: 1,
    title: {
      ar: "معرض تبوك الدولي للبناء والتطوير — جناح ASTRA",
      en: "Tabuk International Construction Expo — ASTRA Pavilion"
    },
    organizer: {
      ar: "مجموعة أسترا الصناعية / أسمنت المنطقة الجنوبية",
      en: "ASTRA Industrial Group / Southern Province Cement Co."
    },
    year: "2025",
    location: {
      ar: "تبوك، المملكة العربية السعودية",
      en: "Tabuk, Saudi Arabia"
    },
    coverImage: "assets/images/portfolio/astra-tabuk-newsclip.jpg",
    description: {
      ar: "تنفيذ جناح عرض مخصص لمجموعة أسترا الصناعية وأسمنت المنطقة الجنوبية، يجمع بين الهوية المؤسسية الراقية وتقنيات العرض الحديثة. شمل التنفيذ الإنشائي الكامل وتجهيزات الاستقبال التفاعلية لاستعراض منتجات الشركة أمام الزوار والمستثمرين.",
      en: "Full execution of a bespoke exhibition booth for ASTRA Industrial Group & Southern Province Cement Co. at the Tabuk International Construction & Development Expo. The project covered complete structural build-out and interactive visitor reception zones."
    },
    websiteUrl: "",           // اتركه "" إن لم يكن متوفراً — Leave empty if not available
    profilePdfUrl: ""         // اتركه "" إن لم يكن متوفراً — Leave empty if not available
  },
  {
    id: 2,
    title: {
      ar: "جناح صُنع في السعودية",
      en: "Saudi Made Pavilion"
    },
    organizer: {
      ar: "برنامج صُنع في السعودية",
      en: "Saudi Made Program"
    },
    year: "2025",
    location: {
      ar: "الرياض، المملكة العربية السعودية",
      en: "Riyadh, Saudi Arabia"
    },
    coverImage: "assets/images/portfolio/saudimade-entrance.jpg",
    description: {
      ar: "تنفيذ هندسي وإنشائي كامل لجناح ضخم بهوية بصرية خضراء مميزة، شمل بوابات دخول مضيئة وتقسيم داخلي ذكي لعرض عشرات العلامات التجارية المحلية ضمن مبادرة دعم المنتج الوطني.",
      en: "Complete engineering and construction execution of a large-scale pavilion with a distinctive green identity, featuring illuminated entry gates and smart internal zoning to showcase dozens of local Saudi brands under the national product support initiative."
    },
    websiteUrl: "",           // اتركه "" إن لم يكن متوفراً — Leave empty if not available
    profilePdfUrl: ""         // اتركه "" إن لم يكن متوفراً — Leave empty if not available
  },
  {
    id: 3,
    title: {
      ar: "جناح جمعية المصدرين الصناعيين",
      en: "Industrial Exporters Association Pavilion"
    },
    organizer: {
      ar: "جمعية المصدرين الصناعيين",
      en: "Industrial Exporters Association"
    },
    year: "2025",
    location: {
      ar: "الرياض، المملكة العربية السعودية",
      en: "Riyadh, Saudi Arabia"
    },
    coverImage: "assets/images/portfolio/exporters-association.jpg",
    description: {
      ar: "تصميم وتنفيذ جناح عرض متكامل يعكس الهوية البصرية للجمعية ضمن معرض اقتصادي متخصص، شمل التنفيذ الإنشائي والتجهيزات التفاعلية لاستقبال الزوار وعرض خدمات دعم الصادرات الوطنية.",
      en: "Full design and execution of an exhibition pavilion reflecting the association's visual identity within a specialized economic exhibition, including structural build-out and interactive visitor setups showcasing national export support services."
    },
    websiteUrl: "",           // اتركه "" إن لم يكن متوفراً — Leave empty if not available
    profilePdfUrl: ""         // اتركه "" إن لم يكن متوفراً — Leave empty if not available
  }
];

// تصدير البيانات للوصول العالمي
window.exhibitionsArchive = exhibitionsArchive;
