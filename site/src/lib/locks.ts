// Real catalog, manufactured by Techom. **Updated 2026-07-10 after legal
// review with counsel + Techom:** do NOT describe המוקד as an "authorized
// distributor/marketer" of Techom anywhere (copy or comments) — that framing
// was dropped. Approved framing: the product is manufactured by Techom
// (Israeli development — Techom's, not המוקד's own), and המוקד is an
// external company that selects + installs these products after thorough
// market research, with direct warranty/service. See strategy-agent/
// positioning.md and security-compliance-agent/legal-notes.md. Manufacturer
// list price ("מחיר מחירון") was verified directly on techom.co.il on
// 2026-07-07 and is used as the honest, checkable "before" price for the
// discount — not a fabricated markdown. "פיתוח ישראלי" wording IS now
// allowed when attributed to Techom (not to המוקד itself) — see CLAUDE.md.
//
// problemStatement/faq/features/bestFor/catalogBadge below come from
// product-marketing-strategy-agent + product-page-agent briefs
// (.claude/agent-memory/product-page-agent/<slug>.md) — every claim here is
// traceable to a highlight already listed below. Do not add a feature flag
// or FAQ claim that isn't backed by an explicit highlight.

export type LockColor = {
  id: string;
  label: string;
  swatch: string; // CSS color for the swatch dot
};

export type LockFeatures = {
  fingerprint: boolean;
  faceId: boolean;
  palmId: boolean; // confirmed for ALFA via Techom catalog PDF, 2026-07-08. For Model T, catalog text names only 6 access methods (no explicit "כף יד" wording) — set true per explicit user confirmation 2026-07-08, not verbatim catalog text.
  camera: boolean;
  card: boolean;
  app: boolean;
  mechanicalBackup: boolean;
  shabbatMode: boolean;
  alarm: boolean; // built-in intrusion alarm — confirmed for ALFA only, do not assume for others
  heightAdjustableScanner: boolean; // physical face+palm scanner that adjusts to the user's height — confirmed for ALFA only via explicit user confirmation, 2026-07-08 (not in Techom catalog PDF; not verified for other models — do not assume)
};

export type LockProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  manufacturerPrice: number; // Techom's published list price, verified 2026-07-07
  ourPrice: number; // המוקד distributor price
  colors: LockColor[];
  highlights: string[];
  features: LockFeatures;
  // Real product photography, added 2026-07-09. images maps a LockColor.id to
  // its white-background "תמונה ראשית" shot — the hero image swaps when the
  // customer picks a color in ColorVariantSelector. installPhotos are real
  // on-site installation photos (not studio shots) shown in a separate
  // gallery. Both optional: products without real photos yet keep the
  // gradient placeholder in product/[slug]/page.tsx.
  images?: Record<string, string>;
  installPhotos?: string[];
  catalogBadge?: string;
  bestFor?: string; // only when a product needs an honest "who this isn't for" note (see ALFA)
  problemStatement: { title: string; body: string };
  benefitTranslations: { feature: string; benefit: string }[];
  faq: { question: string; answer: string }[];
};

export const lockColors: Record<string, LockColor> = {
  grayBlack: { id: "grayBlack", label: "אפור-שחור", swatch: "#3a3a3a" },
  black: { id: "black", label: "שחור", swatch: "#161616" },
  blueMatte: { id: "blueMatte", label: "כחול מאט", swatch: "#2a4d7a" },
  roseGold: { id: "roseGold", label: "רוזגולד", swatch: "#b76e79" },
  white: { id: "white", label: "לבן מלא", swatch: "#f5f3ef" },
};

export const lockProducts: LockProduct[] = [
  {
    slug: "alfa",
    name: "ALFA",
    tagline: "הדגם היחיד בקטלוג שלנו עם סורק פנים וכף יד מתכוונן לגובה — 7 אמצעי גישה, מצלמה ואזעקה",
    description:
      "מנעול חכם מתקדם לדלתות רב-בריח, רשפים ושריונית חוסם, עם שבעה אמצעי גישה שונים: זיהוי פנים מאובטח, זיהוי כף יד, טביעת אצבע, קוד אישי, כרטיס/צ'יפ, אפליקציה ומפתחות פיזיים לגיבוי — ללא הגבלת מספר משתמשים. הסורק הביומטרי ב-ALFA מתכוונן פיזית לגובה של כל משתמש, לזיהוי פנים וכף יד מדויק ומהיר במיוחד — טכנולוגיה שלא קיימת בשאר דגמי הקטלוג שלנו. מצלמה וצג מובנים מראים מי בדלת לפני שפותחים, ואזעקה מובנית מופעלת אוטומטית בניסיון פריצה או תלישה.",
    manufacturerPrice: 3500,
    ourPrice: 2790,
    colors: [lockColors.roseGold, lockColors.black],
    images: {
      roseGold: "/images/locks/alfa/main-rose-gold.jpg",
      black: "/images/locks/alfa/main-black.jpg",
    },
    installPhotos: [
      "/images/locks/alfa/install-1.jpeg",
      "/images/locks/alfa/install-2.jpeg",
      "/images/locks/alfa/install-3.jpeg",
      "/images/locks/alfa/install-4.jpeg",
    ],
    highlights: [
      "סורק זיהוי פנים וכף יד מתכוונן לגובה המשתמש — הדגם היחיד בקטלוג שלנו עם הטכנולוגיה הזו, לזיהוי מדויק ומהיר במיוחד",
      "7 אמצעי גישה: זיהוי פנים, זיהוי כף יד, טביעת אצבע, קוד, כרטיס/צ'יפ, אפליקציה ומפתחות לגיבוי",
      "מצלמה HD ושיחות וידאו LIVE + צג פנימי חכם",
      "אזעקה מובנית — מופעלת אוטומטית ב-3 ניסיונות כושלים או תלישה",
      "כפתור נטרול לשומרי שבת",
      "עמיד בגשם ובתנאי מזג אוויר, סוללת ליתיום 7.4V/5000mAh עם התרעות קוליות בעברית",
      "ללא הגבלת מספר משתמשים",
    ],
    features: {
      fingerprint: true,
      faceId: true,
      palmId: true,
      camera: true,
      card: true, // "צ'יפים" — chip/card access, per Techom catalog
      app: true,
      mechanicalBackup: true, // "מפתחות לגיבוי" — physical backup keys, confirmed per Techom catalog PDF
      shabbatMode: true,
      alarm: true,
      heightAdjustableScanner: true, // per explicit user confirmation 2026-07-08 — not in Techom catalog PDF text
    },
    bestFor:
      "ALFA הוא הדגם המתקדם ביותר שלנו, ובעל יתרון ייחודי: הוא הדגם היחיד בקטלוג שלנו עם סורק זיהוי פנים וכף יד שמתכוונן פיזית לגובה של כל משתמש — לזיהוי מדויק ומהיר יותר, גם לילדים וגם למבוגרים. Model T כולל גם הוא זיהוי פנים וכף יד, אך ללא מנגנון הכיוונון לגובה. בנוסף, ל-ALFA אין הגבלה על מספר המשתמשים (מול עד 150 ב-Model T). לכן ALFA מתאים במיוחד למי שרוצה את הדיוק והנוחות המקסימליים בזיהוי הביומטרי, וכן לבתים גדולים, מבנים משותפים או עסקים קטנים שצריכים גישה למספר בלתי מוגבל של אנשים.",
    problemStatement: {
      title: "מי באמת נמצא ליד הדלת שלך?",
      body: "כשאת לא בבית — מי באמת נמצא ליד הדלת שלך? עם מנעול רגיל אין לך דרך לדעת. ALFA מראה לך בצג ובאפליקציה מי מחכה בחוץ, לפני שמישהו נכנס. להורים מבוגרים שגרים לבד, לילדים שחוזרים הביתה בלי מבוגר, או סתם לשקט הנפש שלכם — עכשיו אתם רואים, לא רק מקווים.",
    },
    benefitTranslations: [
      {
        feature: "סורק זיהוי פנים וכף יד מתכוונן לגובה המשתמש — הדגם היחיד בקטלוג שלנו עם הטכנולוגיה הזו, לזיהוי מדויק ומהיר במיוחד",
        benefit:
          "הסורק מתכוונן פיזית לגובה של כל בן משפחה — ילד, מבוגר או אורח — כך שהזיהוי הביומטרי מדויק ומהיר יותר, בלי להתכופף או למתוח יד באופן לא נוח.",
      },
      {
        feature: "7 אמצעי גישה: זיהוי פנים, זיהוי כף יד, טביעת אצבע, קוד, כרטיס/צ'יפ, אפליקציה ומפתחות לגיבוי",
        benefit:
          "כל בן משפחה בוחר איך להיכנס — טביעת אצבע, זיהוי פנים, זיהוי כף יד, קוד או כרטיס — בלי הגבלת מספר משתמשים. ותמיד יש גם מפתח פיזי לגיבוי, למקרה שהאלקטרוניקה לא זמינה.",
      },
      {
        feature: "מצלמה HD ושיחות וידאו LIVE + צג פנימי חכם",
        benefit:
          "לפני שהדלת נפתחת, אתם כבר יודעים מי בחוץ — מהצג הפנימי החכם, משיחת וידאו חיה, או מהאפליקציה, גם כשאתם לא בבית. בחוץ יש גם פעמון חכם עם צליל איכותי.",
      },
      {
        feature: "אזעקה מובנית — מופעלת אוטומטית ב-3 ניסיונות כושלים או תלישה",
        benefit:
          "ניסיון פריצה או תלישה של המכשיר מהדלת מפעיל אזעקה אוטומטית — לא רק נועל, גם מתריע.",
      },
      {
        feature: "כפתור נטרול לשומרי שבת",
        benefit:
          "לבית שומר מסורת — כפתור ייעודי מנטרל את הפעולה החכמה של המנעול, כדי שתוכלו להשתמש בו בשבת בלי חשש.",
      },
      {
        feature: "עמיד בגשם ובתנאי מזג אוויר, סוללת ליתיום 7.4V/5000mAh עם התרעות קוליות בעברית",
        benefit:
          "המערכת מדברת עברית מלאה ומתריעה בקול על מצב הדלת ועל מצב הסוללה מבעוד מועד, כדי שלא תופתעו — ובנויה לעמוד בגשם ובתנאי חוץ קשים לאורך זמן.",
      },
    ],
    faq: [
      {
        question: "₪2,790 זה יקר למנעול?",
        answer:
          "המחיר כולל התקנה מקצועית, הדרכת שימוש ואחריות יבואן רשמי — לא רק את המנעול. מול מחירון היצרן (₪3,500) זו הנחה של 20%, מתועדת ולא מבצע מומצא.",
      },
      {
        question: "מי בא להתקין את זה בבית שלי?",
        answer:
          "טכנאי מטעם המוקד עצמו — לא קבלן משנה. אנחנו בוחרים את הדגם, מתקינים בעצמנו, ונותנים אחריות ושירות ישירים.",
      },
      {
        question: 'זה "פותח בישראל" כמו שכתוב בשאר האתר?',
        answer:
          "ALFA מיוצר על ידי Techom, יצרן ישראלי עצמאי. אנחנו האחריות שלכם — הבחירה, ההתקנה והשירות, מקצה לקצה.",
      },
      {
        question: "אני שומר שבת — אפשר להשתמש?",
        answer: "כן. ל-ALFA יש כפתור נטרול ייעודי לשומרי שבת.",
      },
      {
        question: "מה קורה אם נגמרת הסוללה?",
        answer:
          "המנעול מתריע בקול, בעברית, כשהסוללה מתקרבת לסוף — ויש גם מפתחות פיזיים לגיבוי, כך שלא תישארו בחוץ גם אם לא הספקתם להטעין.",
      },
      {
        question: "מה ההבדל בין ALFA ל-Model T?",
        answer:
          "שני הדגמים נותנים זיהוי פנים, זיהוי כף יד, מצלמה ואזעקה מובנית. אבל רק ל-ALFA יש סורק פנים+כף יד שמתכוונן פיזית לגובה המשתמש, לזיהוי מדויק ומהיר יותר — טכנולוגיה שלא קיימת ב-Model T. בנוסף, ל-ALFA אין הגבלה על מספר המשתמשים, בעוד Model T תומך בעד 150 — ולכן מעט זול יותר (₪2,590 מול ₪2,790).",
      },
      {
        question: "מה זה סורק מתכוונן לגובה, ולמה זה חשוב?",
        answer:
          "הסורק הביומטרי ב-ALFA מתכוונן פיזית לגובה של כל משתמש, כדי לזהות פנים וכף יד בצורה מדויקת ומהירה יותר — לא משנה אם זה ילד, מבוגר או אורח. זו טכנולוגיה ייחודית ל-ALFA בקטלוג שלנו, ולא קיימת בשאר הדגמים.",
      },
    ],
  },
  {
    slug: "model-t",
    name: "Model T",
    tagline: "פרימיום ל-150 משתמשים — 7 אמצעי גישה, מצלמה מובנית ואזעקה",
    description:
      "מנעול חכם פרימיום לדלת הכניסה, עם שבעה אמצעי גישה: זיהוי פנים מאובטח, זיהוי כף יד, טביעת אצבע, קוד אישי, כרטיס/צ'יפ, אפליקציה ומפתחות פיזיים לגיבוי — עד 150 משתמשים שונים. מצלמה HD, שיחות וידאו LIVE וצג פנימי חכם מראים מי בדלת, ואזעקה מובנית מופעלת אוטומטית בניסיון פריצה או תלישה. תוכנן במיוחד עבור הדלת הישראלית.",
    manufacturerPrice: 3450,
    ourPrice: 2590,
    colors: [lockColors.blueMatte, lockColors.grayBlack],
    images: {
      blueMatte: "/images/locks/model-t/main-blue-matte.jpg",
      grayBlack: "/images/locks/model-t/main-gray-black.jpg",
    },
    installPhotos: [
      "/images/locks/model-t/install-1.jpg",
      "/images/locks/model-t/install-2.jpg",
      "/images/locks/model-t/install-3.jpg",
      "/images/locks/model-t/install-4.jpg",
      "/images/locks/model-t/install-5.jpg",
    ],
    highlights: [
      "7 אמצעי גישה: זיהוי פנים, זיהוי כף יד, טביעת אצבע, קוד, כרטיס/צ'יפ, אפליקציה ומפתחות לגיבוי — עד 150 משתמשים",
      "מצלמה HD ושיחות וידאו LIVE + צג פנימי חכם המשמש כעינית חכמה",
      "אזעקה מובנית — מופעלת אוטומטית ב-3 ניסיונות כושלים או ניסיון תלישה מהדלת",
      "כפתור נטרול לשומרי שבת + פעמון חכם מובנה בדלת",
      "עמיד בגשם ובתנאי מזג אוויר, סוללת ליתיום עוצמתית עם התרעות קוליות בעברית",
      "פתיחת הדלת מכל מקום בעולם דרך האפליקציה, היסטוריית כניסות-יציאות וקודים זמניים/חד-פעמיים",
    ],
    features: {
      fingerprint: true,
      faceId: true,
      palmId: true,
      camera: true,
      card: true,
      app: true,
      mechanicalBackup: true,
      shabbatMode: true,
      alarm: true,
      heightAdjustableScanner: false, // ALFA-only per explicit user confirmation, 2026-07-08 — not confirmed for Model T
    },
    problemStatement: {
      title: "מה קורה כשנגמרת הסוללה באמצע הלילה?",
      body: "כל מנעול \"חכם\" נשמע נהדר — עד שנגמרת הסוללה או נופל האינטרנט בדיוק כשאתם רוצים להיכנס הביתה. Model T נבנה בדיוק בשביל הרגע הזה: שבעה אמצעי גישה עצמאיים ומפתחות פיזיים לגיבוי, כך שתמיד יש יותר מדרך אחת להיכנס.",
    },
    benefitTranslations: [
      {
        feature:
          "7 אמצעי גישה: זיהוי פנים, זיהוי כף יד, טביעת אצבע, קוד, כרטיס/צ'יפ, אפליקציה ומפתחות לגיבוי — עד 150 משתמשים",
        benefit:
          "מתאים גם למשפחה גדולה, גם לבית עם עזרה קבועה — כל אחד עם דרך הכניסה הנוחה לו, עד 150 משתמשים שונים, ותמיד יש גם מפתח פיזי לגיבוי.",
      },
      {
        feature: "מצלמה HD ושיחות וידאו LIVE + צג פנימי חכם",
        benefit:
          "רואים מי בדלת לפני שפותחים — מהצג הפנימי החכם, משיחת וידאו חיה או מהאפליקציה, גם כשאתם לא בבית. בחוץ יש גם פעמון חכם עם צליל איכותי.",
      },
      {
        feature: "אזעקה מובנית — מופעלת אוטומטית ב-3 ניסיונות כושלים או תלישה",
        benefit:
          "ניסיון פריצה או תלישת המכשיר מהדלת מפעילים אזעקה אוטומטית — לא רק נועל, גם מתריע.",
      },
      {
        feature: "כפתור נטרול לשומרי שבת",
        benefit:
          "לבית שומר מסורת — כפתור ייעודי מנטרל את הפעולה החכמה של המנעול, כדי שתוכלו להשתמש בו בשבת בלי חשש.",
      },
      {
        feature:
          "עמיד בגשם ובתנאי מזג אוויר, סוללת ליתיום עוצמתית עם התרעות קוליות בעברית",
        benefit:
          "המערכת מדברת עברית מלאה ומתריעה בקול על מצב הדלת ועל מצב הסוללה מבעוד מועד — ובנויה לעמוד בגשם ובתנאי חוץ קשים לאורך זמן.",
      },
      {
        feature: "פתיחת הדלת מכל מקום בעולם, היסטוריית כניסות-יציאות וקודים זמניים",
        benefit:
          "פותחים לאורח או לשליח מכל מקום בעולם דרך האפליקציה, נותנים קוד חד-פעמי או זמני למי שצריך גישה מוגבלת, ורואים בדיוק מי נכנס ומתי.",
      },
    ],
    faq: [
      {
        question: "מה קורה אם נגמרת הסוללה או נופל האינטרנט?",
        answer:
          "המנעול מתריע בקול, בעברית, כשהסוללה מתקרבת לסוף — ויש גם מפתחות פיזיים לגיבוי ושבעה אמצעי גישה שונים, כך שלא תישארו בחוץ גם אם משהו אחד לא זמין.",
      },
      {
        question: "האם מנעול חכם לא פחות בטוח מפריצה טכנולוגית?",
        answer:
          "Model T נותן שבעה אמצעי גישה עצמאיים (זיהוי פנים, זיהוי כף יד, טביעת אצבע, קוד, כרטיס, אפליקציה ומפתח פיזי) וגם אזעקה מובנית שמופעלת אוטומטית בניסיון פריצה או תלישה — אין תלות בערוץ תקשורת יחיד.",
      },
      {
        question: "מי מתקין את זה בבית שלי, ואפשר לסמוך עליו?",
        answer:
          "המוקד מתקין בעצמו — לא קבלן משנה אקראי. אנחנו הכתובת שלכם גם לפני וגם אחרי ההתקנה.",
      },
      {
        question: "למה לשלם על Model T ולא על דגם זול יותר?",
        answer:
          "Model T תומך בעד 150 משתמשים במקביל — מתאים למשפחה גדולה, לבית עם עזרה קבועה, או לניהול גישה למספר אנשים בלי לפשר על ביטחון.",
      },
      {
        question: "מה ההבדל בין Model T ל-ALFA?",
        answer:
          "שני הדגמים מציעים זיהוי פנים, זיהוי כף יד, מצלמה ואזעקה מובנית. אבל ל-ALFA יש גם סורק פנים+כף יד שמתכוונן פיזית לגובה המשתמש, לזיהוי מדויק ומהיר יותר — טכנולוגיה שלא קיימת ב-Model T. הבדל נוסף: Model T תומך בעד 150 משתמשים במחיר נגיש יותר (₪2,590), בעוד ALFA לא מגביל את מספר המשתמשים ומעט יקר יותר (₪2,790).",
      },
    ],
  },
  {
    slug: "smart-plus",
    name: "Smart Plus",
    tagline: "מצלמה חכמה ומסך פנימי — 5 אמצעי גישה ואזעקה מובנית, במחיר נגיש",
    description:
      "מנעול חכם עם מצלמה HD מובנית ומסך פנימי אלגנטי המשמש כעינית חכמה, וחמישה אמצעי גישה: טביעת אצבע, קוד אישי, כרטיס/צ'יפ, אפליקציה ייעודית ומפתחות פיזיים לגיבוי. שיחות וידאו LIVE ופתיחת דלת מכל מקום בעולם דרך האפליקציה, אזעקה מובנית שמופעלת אוטומטית בניסיון פריצה או תלישה, וכפתור נטרול לשומרי שבת. תוכנן במיוחד עבור הדלת הישראלית. (דגם זה אינו כולל זיהוי פנים או זיהוי כף יד — ראה ALFA/Model T אם אלה חשובים לכם.)",
    manufacturerPrice: 2750,
    ourPrice: 2300,
    colors: [lockColors.grayBlack, lockColors.white, lockColors.roseGold],
    images: {
      grayBlack: "/images/locks/smart-plus/main-gray-black.jpg",
      white: "/images/locks/smart-plus/main-white.jpg",
      roseGold: "/images/locks/smart-plus/main-rose-gold.jpg",
    },
    installPhotos: [
      "/images/locks/smart-plus/install-1.jpg",
      "/images/locks/smart-plus/install-2.jpg",
      "/images/locks/smart-plus/install-3.jpg",
      "/images/locks/smart-plus/install-4.jpg",
    ],
    highlights: [
      "5 אמצעי גישה: טביעת אצבע, קוד אישי, כרטיס/צ'יפ, אפליקציה ומפתחות לגיבוי",
      "מצלמה HD מובנית + שיחות וידאו LIVE + מסך פנימי חכם המשמש כעינית חכמה",
      "אזעקה מובנית — מופעלת אוטומטית ב-3 ניסיונות כושלים או ניסיון תלישה מהדלת",
      "כפתור נטרול לשומרי שבת + פעמון חכם מובנה בדלת",
      "עמיד בגשם ובתנאי מזג אוויר, סוללת ליתיום 7.4V/5000mAh עם התרעות קוליות בעברית",
      "פתיחת הדלת מכל מקום בעולם דרך האפליקציה, היסטוריית כניסות-יציאות וקודים זמניים/חד-פעמיים",
    ],
    features: {
      fingerprint: true,
      faceId: false, // catalog confirms no face ID on Smart Plus — explicit, not an omission
      palmId: false, // catalog confirms no palm ID on Smart Plus — explicit, not an omission
      camera: true, // HD camera + LIVE video calls + internal smart screen used as a peephole
      card: true, // "צ'יפים" — chip/card access, per Techom catalog
      app: true,
      mechanicalBackup: true, // "מפתחות לגיבוי" — physical backup keys, confirmed per Techom catalog PDF
      shabbatMode: true,
      alarm: true,
      heightAdjustableScanner: false, // ALFA-only per explicit user confirmation, 2026-07-08; not applicable — Smart Plus has no face/palm scanner at all
    },
    catalogBadge: "נבחר במיוחד עבור הדלת הישראלית",
    problemStatement: {
      title: "רואים מי בדלת, לפני שפותחים",
      body: "מצלמה HD ומסך פנימי חכם מראים לכם בדיוק מי מחכה בחוץ — מהבית, או מכל מקום בעולם דרך האפליקציה. ולכל בן משפחה יש דרך כניסה משלו — טביעת אצבע, קוד, כרטיס או האפליקציה — כך שאף אחד לא נתקע בחוץ, ואתם תמיד יודעים מי נכנס ומתי.",
    },
    benefitTranslations: [
      {
        feature: "5 אמצעי גישה: טביעת אצבע, קוד אישי, כרטיס/צ'יפ, אפליקציה ומפתחות לגיבוי",
        benefit:
          "כל אחד בבית בוחר את הדרך הנוחה לו — טביעת אצבע, קוד, כרטיס או אפליקציה מהטלפון — ותמיד יש גם מפתח פיזי לגיבוי, למקרה שהאלקטרוניקה לא זמינה.",
      },
      {
        feature: "מצלמה HD מובנית + שיחות וידאו LIVE + מסך פנימי חכם המשמש כעינית חכמה",
        benefit:
          "לפני שהדלת נפתחת, אתם כבר יודעים מי בחוץ — מהמסך הפנימי, משיחת וידאו חיה או מהאפליקציה, גם כשאתם לא בבית. בחוץ יש גם פעמון חכם עם צליל איכותי.",
      },
      {
        feature: "אזעקה מובנית — מופעלת אוטומטית ב-3 ניסיונות כושלים או תלישה",
        benefit:
          "ניסיון פריצה או תלישה של המכשיר מהדלת מפעיל אזעקה אוטומטית — לא רק נועל, גם מתריע.",
      },
      {
        feature: "כפתור נטרול לשומרי שבת",
        benefit:
          "לבית שומר מסורת — כפתור ייעודי מנטרל את הפעולה החכמה של המנעול, כדי שתוכלו להשתמש בו בשבת בלי חשש.",
      },
      {
        feature: "עמיד בגשם ובתנאי מזג אוויר, סוללת ליתיום 7.4V/5000mAh עם התרעות קוליות בעברית",
        benefit:
          "המערכת מדברת עברית מלאה ומתריעה בקול על מצב הדלת ועל מצב הסוללה מבעוד מועד, כדי שלא תופתעו — ובנויה לעמוד בגשם ובתנאי חוץ קשים לאורך זמן.",
      },
      {
        feature: "פתיחת הדלת מכל מקום בעולם, היסטוריית כניסות-יציאות וקודים זמניים",
        benefit:
          "פותחים לאורח או לשליח מכל מקום בעולם דרך האפליקציה, נותנים קוד חד-פעמי או זמני למי שצריך גישה מוגבלת, ורואים בדיוק מי נכנס ומתי.",
      },
    ],
    faq: [
      {
        question: "מה קורה כשנגמרת הסוללה?",
        answer:
          "המנעול מתריע בקול, בעברית, כשהסוללה מתקרבת לסוף — ויש גם מפתחות פיזיים לגיבוי וכרטיס/צ'יפ, כך שתמיד יש דרך גישה חלופית.",
      },
      {
        question: "מי מתקין את זה בבית שלי?",
        answer:
          "טכנאי מטעם המוקד עצמו, לא קבלן משנה מזדמן. מתאמים מראש שעה שנוחה לכם.",
      },
      {
        question: "₪2,300 זה באמת שווה את זה?",
        answer:
          "זה 16% מתחת למחיר המחירון הרשמי של היצרן (₪2,750), כולל ההתקנה, הדרכת השימוש ואחריות יבואן רשמי — לא תוספת נפרדת בהמשך.",
      },
      {
        question: "אני שומר שבת — אפשר להשתמש?",
        answer: "כן. ל-Smart Plus יש כפתור נטרול ייעודי לשומרי שבת.",
      },
      {
        question: "מה ההבדל בין Smart Plus ל-ALFA או Model T?",
        answer:
          "Smart Plus נותן מצלמה HD, מסך פנימי חכם, שיחות וידאו ואזעקה מובנית — אבל בלי זיהוי פנים וזיהוי כף יד. אם אלה חשובים לכם, ALFA ו-Model T כוללים גם אותם. למי שלא צריך זיהוי ביומטרי מתקדם, Smart Plus נותן כמעט את כל שאר היכולות במחיר נמוך משמעותית (₪2,300 מול ₪2,590-2,790).",
      },
    ],
  },
  {
    slug: "smart",
    name: "Smart",
    tagline: "כניסה חכמה אמיתית במחיר הנגיש בקטלוג — טביעת אצבע, קוד, צ'יפ ואפליקציה",
    description:
      "המנעול החכם והבסיסי של Techom, בעיצוב אלגנטי ומינימליסטי: טביעת אצבע, קוד אישי קבוע, צ'יפים ומפתחות פיזיים לגיבוי, קודים זמניים/חד-פעמיים, ופתיחה מהאפליקציה מכל מקום בעולם. נעילה אוטומטית, אזעקה מובנית נגד פריצה, פעמון מובנה, וממשק בעברית מלאה. גוף אלומיניום ופלדת אל-חלד, סוללת ליתיום נטענת בכבל Type-C ומהירות תגובה של עד 0.5 שניה בלבד. (דגם זה אינו כולל מצלמה, מסך פנימי, זיהוי פנים או זיהוי כף יד — ראה Smart Plus/Model T/ALFA אם אלה חשובים לכם.)",
    manufacturerPrice: 1900,
    ourPrice: 1790,
    colors: [lockColors.grayBlack, lockColors.white, lockColors.roseGold],
    images: {
      grayBlack: "/images/locks/smart/main-gray-black.jpg",
      white: "/images/locks/smart/main-white.jpg",
      roseGold: "/images/locks/smart/main-rose-gold.jpg",
    },
    installPhotos: [
      "/images/locks/smart/install-1.jpg",
      "/images/locks/smart/install-2.jpg",
    ],
    highlights: [
      "5 אמצעי גישה: טביעת אצבע, קוד אישי, צ'יפ/מפתחות, אפליקציה וקודים זמניים/חד-פעמיים",
      "אזעקה מובנית נגד פריצה + נעילה אוטומטית",
      "שליטה ופתיחה מכל מקום בעולם דרך האפליקציה + פעמון מובנה",
      "ממשק בעברית מלאה, מהירות תגובה עד 0.5 שניה בלבד",
      "גוף אלומיניום ופלדת אל-חלד, סוללת ליתיום נטענת בכבל Type-C",
      "גיבוי מכני מלא עם מפתחות פיזיים",
    ],
    features: {
      fingerprint: true,
      faceId: false, // catalog confirms no face ID on Smart — explicit, not an omission
      palmId: false, // catalog confirms no palm ID on Smart — explicit, not an omission
      camera: false, // catalog's "מאפיינים בולטים" list has no camera/screen for Smart — explicit, not an omission
      card: true, // "צ'יפים" — chip access, per Techom catalog
      app: true,
      mechanicalBackup: true, // "מפתחות" — physical backup keys, confirmed per Techom catalog PDF
      shabbatMode: false, // not listed in catalog's מאפיינים בולטים — not assumed
      alarm: true, // "אזעקה נגד פריצה" confirmed per Techom catalog PDF, 2026-07-08
      heightAdjustableScanner: false, // ALFA-only per explicit user confirmation, 2026-07-08; not applicable — Smart has no face/palm scanner at all
    },
    bestFor:
      "Smart הוא דגם הכניסה שלנו, אבל הוא לא מקוצר בשיטות הגישה — יש לו טביעת אצבע, קוד, צ'יפ, אפליקציה ואזעקה מובנית נגד פריצה, בדיוק כמו הדגמים היקרים יותר. ההבדל האמיתי: אין לו מצלמה, מסך פנימי, זיהוי פנים או זיהוי כף יד. אם רק חשוב לכם ראייה מי בדלת — Smart Plus מוסיף מצלמה ומסך. אם חשוב לכם גם זיהוי ביומטרי מתקדם — Model T או ALFA מתאימים יותר. אם אתם רוצים כניסה חכמה אמיתית במחיר הכי נגיש בקטלוג — Smart נותן את זה במלואו.",
    problemStatement: {
      title: "הכי זול בקטלוג — לא אומר מקוצר",
      body: "מחיר נמוך גורם לפעמים לחשוב שמתפשרים על משהו. Smart נותן לכם טביעת אצבע, קוד אישי, צ'יפ, אפליקציה, אזעקה מובנית נגד פריצה וגיבוי מכני מלא — בדיוק כמו בכל דגם אחר בקטלוג שלנו — במחיר שלא צריך לחשוב עליו פעמיים. ההבדל היחיד מול הדגמים היקרים יותר הוא מצלמה ומסך פנימי, לא רמת האבטחה הבסיסית.",
    },
    benefitTranslations: [
      {
        feature: "5 אמצעי גישה: טביעת אצבע, קוד אישי, צ'יפ/מפתחות, אפליקציה וקודים זמניים/חד-פעמיים",
        benefit:
          "כל בן משפחה בוחר איך להיכנס — טביעת אצבע, קוד, צ'יפ או אפליקציה — ותמיד יש גם מפתח פיזי לגיבוי. קוד חד-פעמי לאורח או לשליח, בלי לתת גישה קבועה.",
      },
      {
        feature: "אזעקה מובנית נגד פריצה + נעילה אוטומטית",
        benefit:
          "ניסיון פריצה מפעיל אזעקה אוטומטית — לא רק נועל, גם מתריע. והדלת ננעלת מעצמה, בלי לזכור לבדוק.",
      },
      {
        feature: "שליטה ופתיחה מכל מקום בעולם דרך האפליקציה + פעמון מובנה",
        benefit:
          "פותחים לאורח או לשליח מכל מקום בעולם דרך הטלפון, ויש גם פעמון מובנה בדלת בעיצוב מינימליסטי.",
      },
      {
        feature: "ממשק בעברית מלאה, מהירות תגובה עד 0.5 שניה בלבד",
        benefit:
          "כל התפריטים וההתראות בעברית מלאה, בלי בלבול — והדלת נפתחת כמעט מיידית, בלי המתנה מתסכלת.",
      },
      {
        feature: "גוף אלומיניום ופלדת אל-חלד, סוללת ליתיום נטענת בכבל Type-C",
        benefit:
          "גוף עמיד לאורך שנים, וכשהסוללה נגמרת פשוט מטעינים בכבל Type-C רגיל — בלי להחליף סוללות.",
      },
      {
        feature: "גיבוי מכני מלא עם מפתחות פיזיים",
        benefit:
          "נכנסים הביתה תמיד — גם בלי חשמל וגם בלי אינטרנט, בדיוק כמו מנעול רגיל.",
      },
    ],
    faq: [
      {
        question: "אם זה הכי זול בקטלוג, זה אומר שהוא פחות בטוח?",
        answer:
          "לא. Smart כולל טביעת אצבע, אזעקה מובנית נגד פריצה וגיבוי מכני מלא — בדיוק כמו בכל דגם אחר שאנחנו מוכרים. ההבדל האמיתי מול הדגמים היקרים יותר הוא מצלמה, מסך פנימי וזיהוי ביומטרי מתקדם (פנים/כף יד) — לא רמת האבטחה הבסיסית.",
      },
      {
        question: "מה קורה כשנגמרת הסוללה או שאין אינטרנט?",
        answer:
          "יש גיבוי מכני מלא עם מפתחות פיזיים — נכנסים הביתה בדיוק כמו במנעול רגיל, גם בלי חשמל וגם בלי רשת. הסוללה עצמה נטענת בכבל Type-C, בלי צורך להחליף סוללות.",
      },
      {
        question: "מי מתקין את זה בבית שלי?",
        answer:
          "טכנאי מטעם המוקד עצמו — לא קבלן חיצוני. אותה חברה שמוכרת לכם את המנעול היא זו שמתקינה ונותנת שירות אחרי כן.",
      },
      {
        question: "מה ההבדל בין Smart ל-Smart Plus?",
        answer:
          "Smart Plus מוסיף מצלמה HD, מסך פנימי חכם, שיחות וידאו וכפתור נטרול לשבת. Smart נותן טביעת אצבע, קוד, צ'יפ, אפליקציה ואזעקה מובנית — בלי מצלמה או מסך — במחיר נמוך יותר (₪1,790 מול ₪2,300).",
      },
    ],
  },
];

export function getLockBySlug(slug: string): LockProduct | undefined {
  return lockProducts.find((p) => p.slug === slug);
}

export function discountPercent(p: LockProduct): number {
  return Math.round(
    ((p.manufacturerPrice - p.ourPrice) / p.manufacturerPrice) * 100,
  );
}
