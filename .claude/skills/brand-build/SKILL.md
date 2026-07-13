---
name: brand-build
description: שלב בנייה — אתר, דפי נחיתה, וסליקה עבור מותג מנעולים חכמים וכספות.
---

# brand-build

שלב 3: בניית האתר, דפי הנחיתה, וסליקה.

## Usage
`/brand-build [site|landing-page|payments]`

- *(ללא ארגומנט)* — מריץ את כל השלב ברצף
- `site` — מבנה/בנייה של האתר הראשי
- `landing-page` — דף נחיתה לקמפיין ספציפי (מיקרוסייט חד-CTA כמו `campaign/michal`, לא לבלבל עם `/brand-landing-pages` — דפי עומק עשירים למוצר בודד)
- `payments` — הטמעת סליקה

---

## תהליך מלא

### שלב א: תנאי קדם
ודא ש-`design-agent` הפיק `ui-system.md` ו-`wireframes.md` (מ-`brand-design`).

### שלב ב: בניית האתר
הפעל את `web-dev-agent`:
1. הקמת פרויקט Next.js (Vercel) — השתמש בסקילס `vercel:nextjs`, `vercel:deploy` הרלוונטיים בסביבה.
2. מימוש מבנה האתר ורכיבי ה-UI מ-`design-agent`.
3. חיבור קופי מ-`copywriting-agent` (אם קיים; אם אין — בקש מהמשתמש טקסטים זמניים או הפעל את copywriting-agent ליצירת תוכן ראשוני).

### שלב ג: דף נחיתה לקמפיין (אם רלוונטי)
הפעל את `web-dev-agent` לבניית דף נחיתה ממוקד לפי מבנה ה-wireframe "דף נחיתה קמפיין".

### שלב ד: סליקה
הפעל את `payments-agent`:
1. השוואת ספקי סליקה והחלטה.
2. עיצוב checkout flow.
3. תיאום מימוש בפועל עם `web-dev-agent`.

### שלב ה: בדיקה ראשונית
הפעל את `qa-agent` לבדיקת תפקוד בסיסי (לא checklist שקה מלא — זה ב-`brand-launch`).

### שלב ו: עדכון Roadmap
עדכן `brand-director`.

הצג סיכום ואמור: "הצעד הבא: `/brand-launch` להכנת checklist השקה מלא (כולל אבטחה ורגולציה)."
