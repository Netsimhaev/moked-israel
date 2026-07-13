---
name: brand
description: אורקסטרטור מערך בניית המותג הדיגיטלי למנעולים חכמים וכספות בישראל — מהאינטייק ועד הסקייל. תפריט ראשי וסטטוס.
---

# brand

תפריט ראשי + סטטוס למערך בניית המותג הדיגיטלי.

## Usage
`/brand [status|research|design|build|launch|report|promote|landing-pages]`

- *(ללא ארגומנט)* — תפריט ראשי + סטטוס נוכחי (מפעיל את `brand-director`)
- `status` — דוח סטטוס מלא
- `research` → `/brand-research`
- `design` → `/brand-design`
- `build` → `/brand-build`
- `launch` → `/brand-launch`
- `report` → `/brand-report`
- `promote` → `/brand-promote`
- `landing-pages` → `/brand-landing-pages`

---

## ללא ארגומנט / `status`

1. הפעל את agent `brand-director`.
2. אם אין `.claude/agent-memory/brand-director/roadmap.md` — הרץ אינטייק (ראה `brand-director.md`, סעיף 1) לפני כל דבר אחר. אל תמשיך לשלבים אחרים לפני שהאינטייק הבסיסי (שם עסק, קטלוג, קהל יעד, תקציב) נאסף.
3. הצג כותרת:
```
מערך בניית מותג — [שם המותג]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
4. הצג סטטוס נוכחי מה-roadmap (שלב, מחלקות פעילות, אבני דרך שהושלמו).
5. הצג תפריט:
```
/brand-research  → מחקר שוק, מתחרים, אסטרטגיה ומיצוב
/brand-design    → זהות ויזואלית ו-UI/UX
/brand-build     → אתר, דפי נחיתה, סליקה
/brand-launch    → checklist שקה, אבטחה/רגולציה, QA
/brand-report    → דוח ביצועים ואופטימיזציה
/brand-promote   → קידום ופרסום ממומן/אורגני (SEO, גוגל/יוטיוב, מטא/טיקטוק, תוכן, נייטיב/PR)
/brand-landing-pages → דפי נחיתה עשירים למוצר בודד + AI chatbot ממוקד-מוצר
```
6. המלץ על הצעד הבא הקונקרטי לפי מצב ה-roadmap (למשל: "האינטייק הושלם, הצעד הבא: `brand-research` למיצוב ולמחקר מתחרים").

## עקרונות
- שפה: עברית בלבד.
- כל שינוי סטטוס נשמר ע"י `brand-director` ל-`.claude/agent-memory/brand-director/roadmap.md`.
