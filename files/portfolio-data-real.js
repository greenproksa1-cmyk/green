// ============================================================
// portfolio-data.js — بيانات حقيقية مستخرجة من بروفايل الشركة 2026
// ضع هذا الملف بدلاً من النسخة التجريبية (Placeholder) التي بناها Antigravity
// وانسخ مجلد الصور portfolio-images/ إلى: assets/images/portfolio/
// ============================================================
// ⚠️ ملاحظة: الأوصاف والفئات مبنية على ما يظهر فعلياً في الصور.
// التواريخ (year) تقريبية/افتراضية — يرجى تعديلها بالتواريخ الفعلية.
// راجع أيضاً ملاحظة "صور اختيارية" في نهاية الملف قبل اعتمادها كاملة.
// ============================================================

const portfolioData = [
  {
    title: {
      ar: "جناح جمعية المصدرين الصناعيين",
      en: "Industrial Exporters Association Pavilion"
    },
    client: {
      ar: "جمعية المصدرين الصناعيين",
      en: "Industrial Exporters Association"
    },
    category: { ar: "معارض", en: "Exhibitions" },
    categoryKey: "exhibition",
    year: "2025",
    coverImage: "assets/images/portfolio/exporters-association.jpg",
    gallery: [
      "assets/images/portfolio/exporters-association.jpg"
    ],
    description: {
      ar: "تصميم وتنفيذ جناح عرض متكامل يعكس الهوية البصرية للجمعية ضمن معرض اقتصادي متخصص، شمل التنفيذ الإنشائي والتجهيزات التفاعلية لاستقبال الزوار وعرض الخدمات.",
      en: "Full design and execution of an exhibition pavilion reflecting the association's visual identity within a specialized economic exhibition, including construction execution and interactive visitor setups."
    },
    profilePdfUrl: "#",
    externalWebsiteUrl: "#"
  },
  {
    title: {
      ar: "منصة شركة أسمنت المنطقة الجنوبية",
      en: "Saudi Cement Southern Region Company Booth"
    },
    client: {
      ar: "شركة أسمنت المنطقة الجنوبية",
      en: "Saudi Cement Southern Region Company"
    },
    category: { ar: "معارض", en: "Exhibitions" },
    categoryKey: "exhibition",
    year: "2025",
    coverImage: "assets/images/portfolio/cement-company-booth.jpg",
    gallery: [
      "assets/images/portfolio/cement-company-booth.jpg"
    ],
    description: {
      ar: "تصميم وتنفيذ منصة استقبال وجلسات أعمال (Lounge) ضمن فعالية صناعية كبرى، بهوية بصرية مؤسسية وتجهيزات راحة متكاملة للزوار والشركاء.",
      en: "Design and execution of a corporate lounge and meeting area within a major industrial event, featuring institutional branding and complete visitor comfort setups."
    },
    profilePdfUrl: "#",
    externalWebsiteUrl: "#"
  },
  {
    title: {
      ar: "إدارة وتنظيم مؤتمر AWAYIL العمراني",
      en: "AWAYIL Urban Development Conference Management"
    },
    client: {
      ar: "AWAYIL",
      en: "AWAYIL"
    },
    category: { ar: "مؤتمرات", en: "Conferences" },
    categoryKey: "conference",
    year: "2026",
    coverImage: "assets/images/portfolio/awayil-conference.jpg",
    gallery: [
      "assets/images/portfolio/awayil-conference.jpg"
    ],
    description: {
      ar: "إدارة ميدانية كاملة لمنصة العرض الرئيسية لمؤتمر تطوير عمراني، شملت إدارة الجلسات الحوارية، أنظمة العرض المرئي بشاشات LED عملاقة، وتنسيق جلوس الحضور.",
      en: "Full on-site management of the main presentation stage for an urban development conference, including panel session management, giant LED visual display systems, and audience seating coordination."
    },
    profilePdfUrl: "#",
    externalWebsiteUrl: "#"
  },
  {
    title: {
      ar: "تصميم ثلاثي الأبعاد لجناح \"ضمان\"",
      en: "\"Daman\" Pavilion — 3D Concept Design"
    },
    client: {
      ar: "ضمان",
      en: "Daman"
    },
    category: { ar: "تصميم وهندسة", en: "Design & Engineering" },
    categoryKey: "design",
    year: "2025",
    coverImage: "assets/images/portfolio/daman-3d-design.jpg",
    gallery: [
      "assets/images/portfolio/daman-3d-design.jpg"
    ],
    description: {
      ar: "تصميم هندسي ثلاثي الأبعاد متكامل لجناح عرض، يوضح توزيع المساحات التفاعلية ونقاط الاستقبال قبل مرحلة التنفيذ الإنشائي الفعلي.",
      en: "Comprehensive 3D engineering concept design for an exhibition pavilion, illustrating the layout of interactive zones and reception points prior to actual construction execution."
    },
    profilePdfUrl: "#",
    externalWebsiteUrl: "#"
  },
  {
    title: {
      ar: "جناح \"صُنع في السعودية\"",
      en: "\"Saudi Made\" Pavilion"
    },
    client: {
      ar: "صُنع في السعودية",
      en: "Saudi Made"
    },
    category: { ar: "معارض", en: "Exhibitions" },
    categoryKey: "exhibition",
    year: "2025",
    coverImage: "assets/images/portfolio/saudimade-entrance.jpg",
    gallery: [
      "assets/images/portfolio/saudimade-entrance.jpg",
      "assets/images/portfolio/saudimade-interior.png"
    ],
    description: {
      ar: "تنفيذ هندسي وإنشائي كامل لجناح ضخم بهوية بصرية خضراء مميزة، شمل بوابات دخول مضيئة، وتقسيم داخلي ذكي لعرض عشرات العلامات التجارية المحلية.",
      en: "Complete engineering and construction execution of a large-scale pavilion with a distinctive green visual identity, including illuminated entrance gates and smart internal zoning to showcase dozens of local brands."
    },
    profilePdfUrl: "#",
    externalWebsiteUrl: "#"
  },
  {
    title: {
      ar: "جناح عارض ضمن معرض صناعي متخصص",
      en: "Exhibitor Booth at a Specialized Industrial Exhibition"
    },
    client: {
      ar: "عارض صناعي",
      en: "Industrial Exhibitor"
    },
    category: { ar: "معارض", en: "Exhibitions" },
    categoryKey: "exhibition",
    year: "2025",
    coverImage: "assets/images/portfolio/industrial-booth.jpg",
    gallery: [
      "assets/images/portfolio/industrial-booth.jpg"
    ],
    description: {
      ar: "تصميم وتنفيذ جناح عرض بإضاءة خطية مبتكرة وتجهيزات تفاعلية، ضمن معرض صناعي متخصص استقطب عدداً كبيراً من الزوار والمتخصصين.",
      en: "Design and execution of an exhibition booth with innovative linear lighting and interactive setups, within a specialized industrial exhibition that attracted a large number of visitors and specialists."
    },
    profilePdfUrl: "#",
    externalWebsiteUrl: "#"
  }

  // ------------------------------------------------------------
  // 🟡 صور اختيارية (لم تُدرج تلقائياً — راجعها قبل النشر):
  //
  // 1) astra-tabuk-newsclip.jpg
  //    جناح "ASTRA" ضمن "معرض تبوك للبناء" — الصورة مأخوذة من
  //    لقطة بث إخباري مباشر (يظهر بها شعار القناة وشريط الأخبار).
  //    يُفضّل استبدالها بصورة من تصويركم الخاص إن توفرت، تجنباً
  //    لأي إشكال متعلق بحقوق المحطة الإخبارية.
  //
  // 2) optional-ribbon-ceremony.jpg
  //    حفل افتتاح بحضور مسؤولين رسميين بارزين تظهر وجوههم بوضوح.
  //    أدرجها فقط إذا كانت لديكم الموافقة الرسمية على نشرها
  //    على موقع تسويقي عام.
  //
  // 3) optional-almadinah-event.jpg
  //    فعالية "المدينة" وتظهر بها لوحة جدارية رقمية تتضمن صورة/اقتباس
  //    لأحد كبار المسؤولين. ننصح بمراجعة الجهة المنظمة قبل
  //    استخدامها في مواد تسويقية تجارية.
  // ------------------------------------------------------------
];
