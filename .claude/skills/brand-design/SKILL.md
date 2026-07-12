---
name: brand-design
description: שלב עיצוב — זהות ויזואלית, מערכת UI/UX, ו-wireframes עבור מותג מנעולים חכמים וכספות.
---

# brand-design

שלב 2: זהות ויזואלית ו-UI/UX.

## Usage
`/brand-design [identity|ui-system|wireframes]`

- *(ללא ארגומנט)* — מריץ את כל השלב ברצף
- `identity` — זהות ויזואלית בלבד
- `ui-system` — מערכת UI/UX בלבד
- `wireframes` — wireframes טקסטואליים בלבד

---

## תהליך מלא

### שלב א: תנאי קדם
ודא ש-`strategy-agent` הפיק `positioning.md` (מ-`brand-research`). אם לא — הפנה לשם קודם.

### שלב ב: זהות ויזואלית
הפעל את `design-agent`:
1. פלטת צבעים + הסבר (זכור: אמון וביטחון, לא אגרסיביות)
2. טיפוגרפיה מותאמת עברית/RTL
3. קונספט לוגו (טקסטואלי)
4. שפה ויזואלית (צילום/וידאו)

### שלב ג: מערכת UI/UX
הפעל את `design-agent`:
1. Design tokens (מרווחים, radius, states)
2. רכיבי מפתח (כרטיס מוצר, השוואת דגמים, טופס ליד, באדג' אמון)
3. עקרונות נגישות

### שלב ד: Wireframes
הפעל את `design-agent` ל-wireframes טקסטואליים של: עמוד בית, עמוד מוצר, דף נחיתה קמפיין.

### שלב ה: עדכון Roadmap
עדכן `brand-director` שהמחלקה design הושלמה.

הצג סיכום ואמור: "הצעד הבא: `/brand-build` למימוש האתר בפועל."
