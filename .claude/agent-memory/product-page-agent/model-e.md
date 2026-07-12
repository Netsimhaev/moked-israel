# בריף דף מוצר — כספת נשק מודל E

> נבנה על ידי product-page-agent, 2026-07-09. מבוסס על `product-marketing-strategy-agent/model-e.md`, ומקור המוצר: דף המוצר הרשמי של Techom, נקרא 2026-07-09. עובר באותו route דינמי כמו מודל F — **ראה `product-page-agent/model-f.md` למבנה הדף המלא ולפירוט השינוי מ-route סטטי לדינמי, לא כפול כאן.**

## מה ייחודי למודל E בדאטה (`lib/safes.ts`)
- `features`: `fingerprint: true, digitalCode: true, mechanicalKey: true, batteryPowered: true` — היחיד מבין שני הדגמים עם ביומטריה/קוד; המפתח המכני הוא גיבוי, לא השיטה היחידה (בניגוד למודל F).
- **אין סתירת סוללות כאן** — בשונה ממודל F, שם דף המקור סתר את עצמו (מפתח מכני בלבד + סוללות), דף מודל E עקבי: יש טביעת אצבע + קודן דיגיטלי (טכנולוגיה אמיתית) ולכן סוללות הגיוניות ומאושרות בקוד ללא צורך בבירור נוסף מול המשתמש.
- `specs`: זהה בגוף/משקל/עובי/בריחים/עיגון למודל F (סביר שאותה שילדה עם מנגנון פתיחה שונה) — אך שורת "פתיחה" ונוסף "מקור הפעלה: 4 סוללות AA רגילות" שלא קיים במודל F.
- `bestFor` ו-FAQ "מה ההבדל בין מודל E למודל F" — מנוסחים כך שמודל E לא נטען כ"יותר בטוח", רק כ"יותר נוח/מהיר" (ראה `product-marketing-strategy-agent/model-e.md` סעיף 2 להנמקה — חשוב לא לרמוז superiority באבטחה בין הדגמים כשאין לזה בסיס).

## `SafeComparisonTable` — נוסף עם הדגם הזה
בסבב מודל F לבדו לא היה טעם בטבלת השוואה (מוצר יחיד). עם מודל E נוספה `src/components/SafeComparisonTable.tsx`, מקבילה ל-`ModelComparisonTable` של המנעולים אך עם `SafeFeatures` נפרד (טביעת אצבע/קודן דיגיטלי/מפתח מכני/פועלת על סוללות) — לא נעשה שימוש חוזר ב-`ModelComparisonTable` הקיים כי סוג ה-features שונה מבנית (`LockFeatures` לא כולל `digitalCode`/`batteryPowered`, ו-`SafeFeatures` לא כולל `camera`/`shabbatMode` וכו').

## דגלים לפני שקה בפועל
זהים למודל F (ראה `product-page-agent/model-f.md`): אימות עו"ד לטענת תקן/רישוי, ~~תמונת מוצר אמיתית~~ (נפתר 2026-07-10, ראה למטה), אישור אחריות, עדות לקוח אמיתית. אין דגלים נוספים ספציפיים למודל E.

---

## עדכון 2026-07-10 — תמונות מוצר אמיתיות

מקור: תיקיית Google Drive `MODEL E` — 4 קבצי תמונה (ללא PDF): `CT2037A-3__5_-removebg-preview.png` (רקע שקוף, חזית סגורה — נבחר כ-hero), `Model-E-.webp` (חזית סגורה, רקע גרדיאנט כחול שיווקי), `Model-E-2.webp` ו-`Model-E-7.webp` (שתי זוויות דלת פתוחה, מציגות את המדף הפנימי והבריחים). **בשונה ממנעולים חכמים: אין וריאציית צבע (גוון אפור יחיד) ואין תמונות "התקנה על דלת" (כספת עומדת/תלויה בקיר, לא מנעול דלת) — לכן זו גלריית זוויות סטודיו, לא "תמונה ראשית לפי צבע" + "תמונות התקנה".**

נשמר תחת `site/public/images/safes/guns/model-e/` בשמות `hero.png`, `angle-2.webp`, `angle-3.webp`, `angle-4.webp`. `lib/safes.ts` קיבל שדה חדש `images?: string[]` על `GunSafeProduct` (מערך מסודר — `images[0]` הוא ה-hero, השאר גלריית thumbnails). **קומפוננטה חדשה `SafeImageGallery.tsx`** (client) בנתה במיוחד לכספות — hero לחיץ + רצועת thumbnails לחיצה, עם lightbox משותף. ה-lightbox עצמו חולץ ממנעולים לקובץ משותף `ImageLightbox.tsx` (היה שם `InstallPhotoLightbox` בתוך `ProductHeroGallery.tsx`) כדי לא לשכפל קוד בין מנעולים לכספות. `safes/guns/page.tsx` (קטלוג) עודכן להציג `p.images?.[0]` אם קיים, אחרת גרדיאנט — אותה תבנית כמו `locks/page.tsx`. אומת חזותית ב-Playwright: קטלוג מציג תמונה אמיתית, עמוד המוצר מציג hero+3 thumbnails, קליק על thumbnail פותח lightbox עם ניווט.