---
name: brand-landing-pages
description: דפי נחיתה עשירים למוצר בודד (URL ייעודי לכל אחד מ-11 המוצרים) + AI chatbot ממוקד-מוצר — נפרד מדפי הקטלוג הקיימים, למבקרים שמגיעים מקישור ישיר (פרסום/וואטסאפ).
---

# brand-landing-pages

דפי נחיתה עשירים למוצר בודד + AI chatbot — נבדל מ"דף נחיתה לקמפיין" (`brand-build landing-page`, מיקרוסייטים חד-CTA כמו `campaign/michal`). כאן: עמוד עומק לכל מוצר בקטלוג (11 סה"כ, ב-`/lp/[slug]`), עם וידאו/גלריה, מפרט טכני מלא, קנייה, השארת פרטים, וצ'אטבוט AI ממוקד-מוצר.

## Usage
`/brand-landing-pages [slug|status|chatbot]`

- *(ללא ארגומנט)* / `status` — סטטוס rollout מול כל 11 המוצרים + המלצת צעד הבא
- `<slug>` — בונה/מעדכן דף נחיתה למוצר ספציפי (למשל `alfa`, `model-e`, `ib250`, `lock-installation`)
- `chatbot` — מריץ רק תכנון/בדיקת ה-chatbot (עדכון פרומפט קיים, ללא שאר הדף)

---

## תהליך

### שלב א: תשתית משותפת (חד-פעמי, כבר קיימת)
ודא ש-`lib/landingPage.ts`, `/lp/[slug]/page.tsx`, `/api/chat`, ו-`ANTHROPIC_API_KEY` קיימים. אם לא — הפעל `web-dev-agent` לבנייתם לפי הבריף הקיים.

### שלב ב: פר-מוצר — תוכן ומבנה
1. הפעל את `landing-page-agent` — מרחיב את בריף `product-page-agent/<slug>.md` הקיים, שומר ב-`landing-page-agent/pages/<slug>.md`.
2. אם חסר קופי (למשל specs חסרים למנעולים) — הפעל `copywriting-agent`.

### שלב ג: פר-מוצר — AI Chatbot
1. הפעל את `chatbot-agent` — בונה פרומפט מ-`lib/landingPage.ts` בלבד, מריץ checklist בדיקות אדברסריות.
2. **אם המוצר הוא כספת נשק (model-e / model-f):** אישור מפורש ומתועד של `security-compliance-agent` על הפרומפט + תוצאות הבדיקות, לפני המשך לשלב ד.

### שלב ד: מימוש טכני
הפעל את `web-dev-agent`: עדכון `/lp/[slug]` (hero וידאו/גלריה, spec sheet, chat widget), עדכון `/api/chat` אם נדרש, חיבור `BuyNowButton`/`ProductOrderForm` + checkbox עדכוני הנחות — ללא מערכת קופונים (נדחתה לשלב הבא במפורש).

### שלב ה: QA + אבטחה
1. `qa-agent` — checklist טכני (נפילה חיננית ללא וידאו, round-trip צ'אט, טריגר rate-limit, checkout עדיין עובד).
2. כספות נשק: `security-compliance-agent` מאשר גם את הדף וגם את הבוט לפני שקה — מתועד ב-`security-compliance-agent/approvals-log.md`.

### שלב ו: עדכון Roadmap
עדכן `landing-page-agent/rollout-status.md` ואת `brand-director`.

הצג סיכום: "[X מתוך 11] דפי נחיתה חיים. הצעד הבא: [מוצר הבא / `/brand-launch`]."

## עקרונות
- שפה: עברית בלבד.
- לעולם לא לשקה תוכן/צ'אטבוט הקשור לנשק ללא אישור compliance מתועד.
- אין וידאו/מפרט מלא עדיין? הדף מוצג מלא בלעדיהם — לא חוסמים שקה.
- אין מערכת קופונים בשלב הזה — רק checkbox "עדכנו אותי במבצעים".