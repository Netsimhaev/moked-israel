---
name: brand-launch
description: שלב השקה — checklist טכני מלא, אבטחה, רגולציה/מדיניות פרסום, ו-QA לפני שקת האתר או קמפיין עבור מותג מנעולים חכמים וכספות.
---

# brand-launch

שלב 4: הכנה לשקה — אבטחה, רגולציה, QA.

## Usage
`/brand-launch [site|campaign]`

- *(ללא ארגומנט)* — checklist מלא לשקת האתר
- `campaign` — checklist ייעודי לשקת קמפיין ממומן (כולל אישור מדיניות פרסום)

---

## תהליך: שקת אתר (ללא ארגומנט)

### שלב א: אבטחה
הפעל את `security-compliance-agent` להרצת checklist האבטחה הטכני המלא (`security-checklist.md`).

### שלב ב: QA
הפעל את `qa-agent` להרצת checklist טרום-שקה מלא (תפקוד, ביצועים, סליקה, מדידה, RTL).

### שלב ג: החלטה
אם יש פריטים ❌ מ-QA או מ-security — אל תאשר שקה. הצג רשימת חסימות ולמי להפנות (agent אחראי).
אם הכל ✅/⚠️ בלבד — אשר שקה ועדכן `brand-director`.

---

## תהליך: שקת קמפיין (`campaign`)

### שלב א: אישור מדיניות פרסום ורגולציה (חובה לפני כל קמפיין שנוגע לכספות נשק)
הפעל את `security-compliance-agent`:
1. בדיקת מדיניות הפלטפורמה הרלוונטית (Meta/Google/TikTok) בתאריך נוכחי (WebSearch).
2. תיעוד ההחלטה ב-`approvals-log.md`.
3. אם יש בעיה — החזר ל-`copywriting-agent`/`design-agent` לתיקון ניסוח/קריאייטיב לפני שקה.

### שלב ב: checklist קמפיין
```
☐ קריאייטיב אושר ע"י security-compliance-agent
☐ קופי סופי אושר
☐ UTM parameters מוכנים לכל פלטפורמה
☐ Pixel/Conversion event מוגדר ונבדק (analytics-agent)
☐ דף נחיתה עבר QA
☐ תקציב יומי וקהל יעד הוגדרו
```

### שלב ג: מדריך שקה בפלטפורמה
הפעל את `growth-marketing-agent` להצגת מדריך שלב-אחר-שלב (Campaign → Ad Set → Ad) בפלטפורמה שנבחרה.

### שלב ד: עדכון Roadmap
עדכן `brand-director` עם תאריך שקה ופרטי הקמפיין.

הצג סיכום ואמור: "הקמפיין/האתר מוכן לשקה. לאחר 3–5 ימי ריצה, הרץ `/brand-report` לניתוח ראשון."
