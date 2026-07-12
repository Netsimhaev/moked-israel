# Checklist אבטחה טכני — אתר "המוקד" (site/)

> נבדק ע"י security-compliance-agent | תאריך בדיקה: 2026-07-07 | מקור: קריאת קוד בפועל תחת `site/src/`, לא תיאורטי.
> שלב הפרויקט: MVP מקומי (`npm run dev`), טרם פרוס ל-Vercel/דומיין אמיתי, checkout הוא stub ליד בלבד (Cardcom טרם מחובר).

## תוצאות

```
☐→⚠️ HTTPS מלא (כולל HSTS)
```
לא ניתן לבדוק בפועל — האתר עדיין רץ מקומית (`localhost`) ולא פרוס. Vercel מספק HTTPS+HSTS אוטומטית כברירת מחדל בפריסה, אך **חובה לוודא בפועל אחרי הפריסה הראשונה** (לא להניח). חוסם: השקה (`/brand-launch`) עד לאימות בפועל מול דומיין חי.

```
✅ אין סודות/מפתחות API בקוד קליינט
```
נבדק grep מלא על `site/src` לתבניות `API_KEY|SECRET|token|Bearer|process.env` — ההתאמה היחידה היא `process.env.NODE_ENV` ב-`NightHero.tsx` (בדיקת סביבת פיתוח, לא סוד). אין קובצי `.env*` בפרויקט כלל (לא קיימים על הדיסק) — כלומר גם אין סיכון של ערכים אמיתיים שנשכחו ב-repo. תואם ל-CLAUDE.md ול-`payments-agent/provider-decision.md` (Cardcom API keys טרם קיימים, יתווספו כ-env vars ב-Vercel כשיגיעו — יש לוודא זאת שוב באותו שלב).

```
⚠️ הרשאות מינימליות (least privilege) לכל אינטגרציה
```
אין עדיין אינטגרציות חיצוניות מחוברות בפועל (Cardcom stub, אין CRM מחובר) — אין מה לבדוק הרשאות עליו כרגע. יש לבדוק מחדש כשה-CRM/Cardcom יחוברו בפועל.

```
⚠️ הגנה מפני XSS/CSRF/SQL Injection בטפסים ובבקאנד
```
- **SQL Injection:** לא רלוונטי כרגע — אין מסד נתונים מחובר, `/api/lead` רק כותב ל-`console.log`. יש לבדוק מחדש כש-CRM/DB יחוברו.
- **XSS:** React/Next.js מבצע escaping אוטומטי של תוכן מוצג (`{value}` ב-JSX) — לא נמצא שימוש ב-`dangerouslySetInnerHTML` בקוד הנבדק, אז אין וקטור XSS ישיר כרגע. יש לוודא שגם התצוגה העתידית של לידים (בממשק פנימי/CRM) תבצע escaping.
- **CSRF:** `/api/lead/route.ts` הוא POST endpoint ללא בדיקת Origin/CSRF token וללא אימות session — כרגע זה פחות קריטי כי אין effect רגיש (רק כתיבת log), אבל **לפני חיבור לתשלום/CRM אמיתי חובה להוסיף בדיקת Origin/Referer או CSRF token**, אחרת ניתן להזרים לידים מזויפים בהמוניהם ממקור חיצוני (ראה גם Rate limiting למטה).

```
❌ ולידציה בצד שרת בטופסי הליד
```
קריאה בפועל של `site/src/app/api/lead/route.ts` (שורות 7-20):
```ts
export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, area, need, source } = body ?? {};
  if (!phone) {
    return NextResponse.json({ error: "missing phone" }, { status: 400 });
  }
  console.log("[lead]", { name, phone, area, need, source, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
```
- הבדיקה היחידה בצד שרת היא `!phone` (קיים/לא קיים) — **אין בדיקת פורמט טלפון, אין הגבלת אורך שדות, אין סניטציה של `name`/`area`/`need`/`source`, ואין type-checking שהערכים הם אכן strings ולא אובייקטים/מערכים.**
- `LeadForm.tsx` ו-`QuoteForm.tsx` (צד קליינט) מסתמכים על `required`/`type="tel"` של HTML בלבד — זו ולידציה קוסמטית שניתן לעקוף לגמרי בקריאת API ישירה (curl/Postman), כי אין שום אכיפה מקבילה בשרת.
- **סיכון בפועל:** גוף בקשה שרירותי (JSON כלשהו, כולל שדות ענקיים או non-string) יתקבל ויכתב ל-log כל עוד יש שדה `phone` כלשהו (אפילו `phone: "x"`).
- **המלצה לפני השקה:** להוסיף ולידציה מפורשת בצד שרת (regex לטלפון ישראלי, הגבלת אורך לכל שדה, `typeof === "string"` לכל קלט) לפני שהנתונים מגיעים ל-CRM אמיתי.

```
⚠️ Log injection / חוסר ניקוי קלט ב-console.log
```
השורה `console.log("[lead]", { name, phone, area, need, source, at: ... })` מעבירה אובייקט (לא string מחובר) ל-`console.log` — Node.js מדפיס אובייקטים בפורמט מובנה (util.inspect), כך שאין הזרקת שורות-log חדשות/בריחה מהקשר הפשוטה כמו בהזרקת מחרוזת גולמית. **הסיכון נמוך יחסית כרגע**, אך:
- אם בעתיד ה-log יוחלף בכתיבה למחרוזת מפורמטת ידנית (string concatenation) לפני שליחה ל-CRM/קובץ/Slack webhook וכו', אז קלט לא מסונן (למשל בשדה `need` חופשי) עלול לאפשר הזרקת תווים (CRLF, markdown injection בהתראת Slack, וכו').
- **המלצה:** לשמור על logging מבוסס-אובייקט (לא string concatenation), ולהוסיף סניטציה/הגבלת אורך לפני כל שילוב עתידי במערכת חיצונית (CRM/Slack/Email).

```
❌ Rate limiting על טפסי לידים
```
אין שום rate limiting/throttling על `/api/lead` — ניתן להציף את ה-endpoint בבקשות ללא הגבלה (spam לידים, מניעת שירות קלה, ניפוח עלויות אם יחובר לשירות חיצוני בתשלום כמו CRM/SMS). **חובה להוסיף לפני השקה בפועל** (למשל Vercel Edge Middleware + IP throttling, או שירות כמו Upstash Ratelimit).

```
✅ תשלומים: no PAN storage, hosted fields בלבד
```
אין עדיין קוד תשלום בפועל — `/api/lead` הוא stub ליד בלבד, ללא כל טיפול בפרטי אשראי. התכנון המתועד (`payments-agent/provider-decision.md`) קובע מפורשות iframe/hosted page מאובטח של Cardcom בלבד, ללא שמירת PAN בשרת עצמי — תואם למדיניות. **יש לאמת מחדש את הקוד בפועל כשה-checkout האמיתי ייבנה.**

```
⚠️ גיבויים ותכנית שחזור
```
לא רלוונטי עדיין — אין מסד נתונים/CMS מחובר בפועל. Vercel מספק git-based deployments (rollback קל לגרסה קודמת), אך אין עדיין data store שדורש אסטרטגיית גיבוי. יש להגדיר זאת כש-CRM/DB יחוברו.

## סיכום — חוסמי השקה מזוהים
1. ~~ולידציה בצד שרת חסרה ב-`/api/lead`~~ — **תוקן** (בטווח שבין 2026-07-07 ל-2026-07-10, לא תועד מתי בדיוק): הקוד בפועל כולל regex לטלפון, הגבלת אורך שדות (`MAX_FIELD_LENGTH`), ו-`sanitizeField` שבודק `typeof === "string"`. הבדיקה שהמסמך הזה מתאר (רק `!phone`) כבר לא תואמת את הקוד הנוכחי — **מסמך זה היה מיושן**, ראה עדכון למטה.
2. ~~אין Rate limiting~~ — **תוקן**. `createRateLimiter` (חולץ ל-`lib/rateLimit.ts` ב-2026-07-10) — sliding-window in-memory, עדיין per-instance/לא distributed-safe (מגבלה ידועה, מתועדת בקוד).
3. **HTTPS/HSTS טרם אומת בפועל** — עדיין רלוונטי, לאמת מיד אחרי הפריסה הראשונה ל-Vercel.
4. **אין CSRF protection** — עדיין רלוונטי, **קריטי יותר עכשיו** שיש `/api/checkout` אמיתי (לא רק ליד). להוסיף לפני שקה בפועל.

## עדכון 2026-07-10 — checkout אמיתי (`/api/checkout`, `/api/checkout/callback`) נבנה

מסמך זה תיאר מצב מ-2026-07-07 שכבר לא היה מדויק לגבי `/api/lead` (הוולידציה/rate-limiting כבר היו קיימים בפועל בקוד) — לתעד את זה כדי שבדיקה עתידית תתחיל מקריאת קוד, לא מהמסמך הזה בלבד.

**נוסף checkout אמיתי** (`site/src/app/api/checkout/route.ts`, `site/src/app/api/checkout/callback/route.ts`, `site/src/lib/cardcom.ts`) — לא סתם עוד stub ליד:
- ✅ **מחיר תמיד מחושב בשרת** מ-`getCheckoutItem`+`crossSellMap` — קוד `/api/checkout` דוחה עם 400 אם `crossSellSlug` שנשלח לא תואם למיפוי (נבדק בפועל, curl אישר חסימה).
- ✅ **Rate limiting** — אותו `createRateLimiter` המשותף, instance נפרד ל-`/api/checkout` (5/דקה) ול-`/api/checkout/callback` (30/דקה).
- ✅ **אימות שרת-לשרת ב-webhook** — `getLowProfileResult` נקרא מחדש מול Cardcom לפני שהזמנה מסומנת כמושלמת, לא סומך על ה-payload הגולמי של ה-callback.
- ✅ **אין שמירת פרטי כרטיס** — Cardcom hosted page/iframe בלבד, `/api/checkout` מעביר רק סכום+פרטי קשר, לא פרטי אשראי.
- ⚠️ **עדיין אין CSRF protection** על `/api/checkout` — אותה מגבלה כמו `/api/lead`, אך משמעותית יותר עכשיו כי זה checkout אמיתי, לא רק ליד.
- ⚠️ **`pendingOrders`/`processedLowProfileIds` (`lib/orderStore.ts`) הם in-memory** — אותה מגבלה per-instance/cold-start כמו ה-rate limiter, לא production-grade. חובה להחליף ב-store אמיתי (KV/DB) לפני עומס אמיתי.
- ⚠️ **קובץ `lib/cardcom.ts` כולו מבוסס הנחות לא-מאומתות** על מבנה ה-API של Cardcom (מסומן `// TO VERIFY` בקוד) — לא אומת מול תיעוד/דשבורד Cardcom אמיתי. **חובה לעבור על כל הערה כזו לפני עסקה אמיתית ראשונה.**
- ⚠️ **`CARDCOM_DRY_RUN`** — יש לוודא בפירוש שהמשתנה הזה **לא** מוגדר `true` בסביבת production/Vercel, אחרת תשלומים "יצליחו" בלי לחייב אף אחד בפועל.
- מנגנון ה-webhook (POST JSON מול GET query params) **לא אומת** — הקוד מניח POST JSON, לתקן אם מתברר אחרת מול הדשבורד של Cardcom.

ראה `payments-agent/provider-decision.md` עדכון 2026-07-10 (סבב שני) לפירוט המלא של הבנייה.

## עדכון 2026-07-10 (סבב שלישי) — `lib/cardcom.ts` אומת מול חשבון סוחר אמיתי (Terminal 154264)

המשתמש מסר credentials אמיתיים; עם אישורו בוצעה קריאה חד-פעמית אמיתית (לא dry-run) ל-`LowProfile/Create` (session ₪1, לא חיוב) דרך סקריפט זמני מבודד — לא דרך הקוד/ה-DRY_RUN של האפליקציה עצמה. **תוצאה: endpoint, שמות שדות auth, ותבנית תגובת ההצלחה/כישלון אומתו כנכונים.** תוקן חוסר אחד שהתגלה בפועל (`Document.Products` נדרש בטרמינל הזה) — ראה `payments-agent/provider-decision.md` עדכון 2026-07-10 (סבב חמישי) לפירוט המלא.

**עדיין לא אומת, נשאר על הרשימה לפני כסף אמיתי:**
- webhook בפועל מול `NEXT_PUBLIC_SITE_URL` אמיתי (לא localhost) — Cardcom לא הצליח לקרוא ל-callback במהלך הבדיקה הזו כי לא הייתה כתובת ציבורית.
- צורת `TranzactionInfo` בעסקה **שהצליחה בפועל** (רק "ממתין" נבדק).
- `CARDCOM_DRY_RUN` **עדיין `true`** — טרם בוצעה עסקה מלאה דרך זרימת ה-checkout באתר עצמו, רק בדיקת API מבודדת.
