---
name: brand-promote
description: מחלקת קידום ופרסום — SEO, Google/YouTube Ads, Meta/TikTok Ads, יצירת תוכן ומשפיענים, בלוג האתר, וטאבולה/רכישת כתבות עבור מותג מנעולים חכמים וכספות.
---

# brand-promote

שלב קידום: ביצוע תפעולי רב-ערוצי (SEO, Google/YouTube, Meta/TikTok, תוכן, נייטיב/PR) בניהול `marketing-manager-agent`.

## Usage
`/brand-promote [seo|search|social|content|native|blog|status]`

- *(ללא ארגומנט)* / `status` — סטטוס קידום מרוכז מכל הערוצים (מפעיל את `marketing-manager-agent`)
- `seo` → מפעיל `seo-agent`
- `search` → מפעיל `paid-search-agent` (Google Ads + YouTube Ads)
- `social` → מפעיל `social-ads-agent` (Meta + TikTok)
- `content` → מפעיל `content-creator-agent` (תוכן אורגני סושיאל — רילס/שורטס/טיקטוק)
- `native` → מפעיל `native-pr-agent` (Taboola/Outbrain + רכישת כתבות ממומנות)
- `blog` → מפעיל `blog-agent` (כתיבת מאמרים לבלוג האתר עצמו — `/blog`, לא כתבות חיצוניות)

---

## תהליך: ללא ארגומנט / `status`

1. הפעל את `marketing-manager-agent`.
2. אם אין עדיין `.claude/agent-memory/marketing-manager-agent/channel-plan.md` — קבל תחילה מ-`growth-marketing-agent` (או מהמשתמש, אם עוד לא הוגדר) הקצאת תקציב כוללת בין 5 הערוצים, ובנה `channel-plan.md` ראשוני.
3. הצג דוח סטטוס מרוכז מכל ערוץ (spend/לידים/CPL/ROAS ככל שקיים), חסמים פתוחים, והמלצת צעד הבא הכוללת איזה agent/ארגומנט להפעיל.

## תהליך: `seo` / `search` / `social` / `content` / `native` / `blog`

1. ודא ש-`marketing-manager-agent` הגדיר עדיפות/תקציב לערוץ המבוקש (אם לא — הפעל אותו קודם). עבור `blog` — סעיף זה פחות רלוונטי (אין מדיה בתשלום), אפשר לדלג ישירות להפעלת הסוכן.
2. הפעל את agent הערוץ המתאים (`seo-agent` / `paid-search-agent` / `social-ads-agent` / `content-creator-agent` / `native-pr-agent` / `blog-agent`).
3. **חובה:** אם המשימה נוגעת לכל תוכן/קמפיין/מאמר בקטגוריית כספות נשק — עצור ובקש אישור מתועד ועדכני מ-`security-compliance-agent` (מדיניות הפלטפורמה + רגולציה) לפני יצירת קריאייטיב, פרסום מאמר, או שקה. אין לעקוף שלב זה — כולל מאמרי בלוג.
4. עדכן את `marketing-manager-agent` בתוצר/סטטוס, ואת `brand-director` אם יש שינוי מהותי ב-roadmap הכולל.

## עקרונות
- שפה: עברית בלבד.
- לעולם לא לשקה תוכן/קמפיין הקשור לנשק בשום ערוץ ללא אישור compliance מתועד.
- לאחר 3–5 ימי ריצה של קמפיין חדש, הרץ `/brand-report` לניתוח ראשוני.