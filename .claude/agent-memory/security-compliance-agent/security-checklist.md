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

## 2026-07-13 — ביקורת אבטחה מלאה (יזומה על ידי המשתמש, לא שגרתית): בדיקת קוד + בדיקות LIVE מול `localhost:3000`

> `.env.local` מכיל כעת credentials אמיתיים (terminal 154264) עם `CARDCOM_DRY_RUN=false`. כל הבדיקות בוצעו ללא הזנת פרטי כרטיס אמיתיים בפועל — עצירה מפורשת לפני מסך הסליקה של Cardcom, בהתאם להנחיה. סבב זה כלל בפעם הראשונה בדיקת **קצה-לקצה דרך קוד האפליקציה עצמו** (לא סקריפט מבודד כמו בסבב הקודם).

### ✅ אושר בטוח (קוד + LIVE)

**1. אין PAN/פרטי כרטיס שנוגעים בשרת שלנו.** `CheckoutFlow.tsx` לא כולל אף שדה כרטיס — רק שם/טלפון/אימייל/כתובת. בדיקה חיה מלאה (POST אמיתי ל-`/api/checkout` דרך קוד האפליקציה עצמו, לא סקריפט חיצוני, עם נתוני QA מזוהים בבירור כבדיקה) החזירה בפועל `url` תקין בדומיין `secure.cardcom.solutions` (Cardcom hosted page) — לא נכנסתי לעמוד עצמו ולא הוזנו פרטי תשלום. זו הפעם הראשונה שנתיב הקוד המלא (form → `/api/checkout` → `lib/cardcom.ts` → Cardcom אמיתי) אומת קצה-לקצה, לא רק קריאת API מבודדת כמו בסבב הקודם.

**2. תקינות מחיר בצד שרת — אושר.** גם קריאת קוד וגם grep מלא אישרו: `raw.amount`/כל ערך "amount" מהלקוח **אף פעם לא נקרא** בקוד — המחיר תמיד מחושב מ-`getCheckoutItem`. בדיקה חיה: שליחת `"amount":1` מהלקוח לא השפיעה על הזרימה (לא התקבלה כערך חלופי, פשוט לא נקראה כלל). ניסיון תרמית cross-sell (שליחת `crossSellSlug` שלא תואם למיפוי האמיתי) נדחה בפועל עם `400 {"error":"invalid cross-sell pairing"}`.

**3. מודל אמון ה-webhook — אושר.** `/api/checkout/callback` תמיד שולח שאילתת אימות מחדש ל-Cardcom (`getLowProfileResult`) ומתעלם לחלוטין משדות ה-payload הגולמי (`ResponseCode`/`TranzactionInfo` שנשלחו בבקשה עצמה). בדיקה חיה: POST מזויף עם `LowProfileId` בדוי + payload שטוען "הצלחה" החזיר `200` (מכוון — מונע retry storm מ-Cardcom) אבל **לא** הפעיל את נתיב המימוש (`[checkout:completed]`) כי ה-re-query האמיתי מול Cardcom נכשל עבור ID לא קיים. אימות אנטי-spoofing עובד כמתוכנן. Idempotency (`processedLowProfileIds`) נבדק **לפני** קריאת ה-re-query, כך שקריאות חוזרות לא מייצרות עומס API מיותר.

**4. Rate limiting — אושר חי.** גם `/api/checkout` (5/דקה) וגם `/api/checkout/callback` (30/דקה) וגם `/api/lead` (5/דקה) הפעילו בפועל `429` אחרי חריגה מהסף, נבדק ב-curl ישיר.

**5. ולידציית קלט — אושר חי.** `sanitizeField` דוחה בפועל: non-string (מערך/אובייקט), שדות ריקים, שדות מעל 300 תווים. Regex לטלפון/אימייל דוחה פורמטים לא תקינים. payloads של הזרקה (`<script>alert(1)</script>`, `' OR 1=1--`, `DROP TABLE`, `<img onerror=...>`) התקבלו רק כמחרוזות טקסט חופשי רגילות (בשדות שם/כתובת) — אין להם וקטור מימוש: אין `dangerouslySetInnerHTML` בכל ה-repo, אין `eval`/`new Function`, אין מסד נתונים (אין SQLi אפשרי), React מבצע escaping אוטומטי לכל תוכן מוצג. **אין וקטור XSS/SQLi מנוצל בפועל כיום.**

**6. היגיינת סודות — אושר מקיף.** grep מלא של `site/src` (תבניות `api[_-]?key|secret|password|Bearer` וכו') לא מצא אף סוד hardcoded — רק `process.env.*`. `lib/cardcom.ts` (מכיל את שלושת ה-credentials הרגישים) מיובא **אך ורק** על ידי שני קבצי `route.ts` בצד שרת — אומת ב-grep שאין שום "use client" component שמייבא אותו, כלומר אין נתיב לדליפה ל-client bundle. `NEXT_PUBLIC_SITE_URL` הוא ה-`NEXT_PUBLIC_*` היחיד בכל הקוד ואינו רגיש (כתובת בסיס פומבית). `.env.local` **אינו** tracked ב-git (`git ls-files` ריק), **אינו** מופיע בהיסטוריית git בכלל (`git log --all` על הקובץ ריק), ו-`.gitignore` מכיל `.env*` כראוי. `.env.local.example` מכיל placeholders בלבד. מספר "154264" (terminal number, לא סוד עצמו) מופיע רק בהערות תיעוד/memory, לא credential בפועל.

**7. עמוד ההצלחה (`/checkout/[slug]/success`) — אין IDOR.** נבדק קוד: העמוד לא קורא כלל את פרמטר ה-`order` מה-query string ולא שולף/מציג נתוני הזמנה/PII לפי מזהה — מציג רק מידע סטטי מה-slug של המוצר. אין סיכון חשיפת PII של לקוח אחר דרך ניחוש/שיתוף UUID.

### ⚠️ סיכונים/פערים (חלקם אושרו LIVE הסבב הזה, מחמירים סטטוס מ"תיאורטי" ל"מוכח")

**1. `getClientIp` ניתן לעקיפה טריוויאלית — הוכח LIVE, לא רק תיאורטי יותר.** הפונקציה קוראת רק את הערך הראשון ב-`x-forwarded-for` (`.split(",")[0]`) בלי שום אימות מספר hops מהימנים. בדיקה חיה הוכיחה: אחרי הפעלת ה-`429` בפועל על `/api/lead`, שינוי כותרת `X-Forwarded-For` לערך שרירותי אחר באותה בקשה הבאה איפס את המונה מיידית וקיבל `200` — עקיפה מלאה של rate limiting בעלות אפסית. בסביבת dev מקומית אין proxy כלל אז הלקוח שולט לגמרי בכותרת. **לפני production חובה לאמת את התנהגות Vercel בפועל** — אם Vercel **מוסיף** (append) את ה-IP האמיתי בסוף הרשימה במקום להחליף אותה לגמרי, אז לקיחת אינדקס `[0]` (כפי שהקוד עושה) תשאיר את אותה חולשה חיה גם ב-production. המלצה: לאמת מול תיעוד Vercel בפועל אחרי הפריסה הראשונה, ולשקול להשתמש בכותרת שה-platform מבטיח שאינה ניתנת לזיוף (אם קיימת), ולהתייחס ל-rate limiting הנוכחי כאמצעי עזר/בקרת עלויות ולא כגבול אבטחה קשיח.

**2. אין הגנת CSRF — עדיין פתוח, אושר LIVE (לא חדש).** בדיקה חיה: POST עם כותרת `Origin: https://evil-attacker.example` התקבל ועובד רגיל (`200`) — אין בדיקת Origin/Referer בשום מקום. מאחר ואין session/cookie-based auth בזרימה הזו (checkout פומבי, לא פעולה מאומתת), האימפקט הקלאסי של CSRF (פעולה "בשם" משתמש מחובר) לא רלוונטי — אבל זה עדיין מאפשר שליחת בקשות מזויפות בהמוניהן מכל מקור (לידים מזויפים, ויצירת sessions אמיתיים מול Cardcom האמיתי ללא הגבלה מלבד ה-rate limiter הניתן לעקיפה בסעיף 1).

**3. אין שום security headers מוגדרים — אושר LIVE.** `curl -I` על עמוד הבית לא הראה `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, או `Permissions-Policy`. `next.config.ts` הוא ברירת מחדל לגמרי — אין `headers()`, אין `poweredByHeader: false` (התגובה חושפת `X-Powered-By: Next.js`). **חשוב במיוחד:** עמוד ה-checkout שלנו עצמו יכול (במצב `CARDCOM_EMBED_MODE=iframe`) להטמיע iframe של Cardcom — אבל בלי `X-Frame-Options`/CSP `frame-ancestors` על העמודים **שלנו**, גם עמוד ה-checkout שלנו עצמו יכול תיאורטית להיות מוטמע ב-iframe זדוני באתר אחר (clickjacking נגד זרימת הרכישה). HSTS כנראה יסופק אוטומטית על ידי Vercel ב-production (לא ניתן לאימות מ-localhost) — זהו סעיף קיים ולא חדש, ראה למטה.

**4. PII של לקוחות נכתב בטקסט גלוי ל-console בכל checkout/ליד.** `[checkout:created]`, `[checkout:completed]`, ו-`[lead]` כותבים שם/טלפון/אימייל/כתובת מלאים ל-log. זה אותו דפוס stub-logging שתועד קודם, אבל משמעותי יותר עכשיו שיש credentials אמיתיים וזרימת תשלום אמיתית — ב-Vercel זה הופך לחלק ממערכת ה-logs של הפלטפורמה (גישה צריכה להיות מוגבלת לאנשי צוות מורשים בלבד), ורלוונטי לחוק הגנת הפרטיות (ראה `legal-notes.md`). ה-TODO הקיים להעביר ל-CRM אמיתי הופך דחוף יותר.

**5. `npm audit`: פגיעות moderate אחת** — PostCSS < 8.5.10 (GHSA-qx2v-qp2m-jg93, XSS דרך `</style>` לא escaped בפלט stringify), תלות טרנזיטיבית בתוך `node_modules/next/node_modules/postcss` (גרסת postcss הפנימית שחבויה בתוך next עצמו, לא תלות ישירה של הפרויקט). ניצול בפועל לא סביר כאן — האתר לא הופך קלט משתמש למחרוזת CSS אף פעם. Fix דורש downgrade שובר-תאימות ל-next (`npm audit fix --force`) — לא מומלץ לכפות; יש לעקוב אחרי עדכון עתידי תואם.

### ❌ חובה לתקן לפני כסף אמיתי (עדכון סטטוס)

1. **עקיפת rate limiting דרך `X-Forwarded-For` (סעיף ⚠️1 למעלה)** — מומלץ להעלות סטטוס מ"מגבלה ידועה של in-memory storage" ל**חוסם מפורש לפני production**, כי הסבב הזה הוכיח בפועל שהעקיפה לא תלויה בכלל ב-distributed-storage — היא ברמת parsing של כותרת HTTP יחידה, ותיתכן גם בפריסה אמיתית ב-Vercel אם ה-header behavior לא מאומת כמצופה.
2. הפריטים הקיימים ללא שינוי (לא נבדקו מחדש כי הם עדיין לא רלוונטיים לבדיקה מקומית): webhook קצה-לקצה מול `NEXT_PUBLIC_SITE_URL` ציבורי אמיתי; צורת `TranzactionInfo` בעסקה **שהצליחה בפועל** (עדיין רק pending + יצירת session אומתו, לא תשלום שהושלם בפועל); `pendingOrders`/`processedLowProfileIds` עדיין in-memory (לא נמצאה בעיה חמורה יותר מהמתועד — אין דרך שנבדקה "לזהם" את ה-Map מבחוץ).
3. אין CSRF protection ואין security headers (סעיפים ⚠️2, ⚠️3) — לא חוסמים מוחלטים כרגע (אין session-based auth לנצל, ואין עדיין נזק כספי ישיר אפשרי מעבר לספאם/עומס), אבל מומלץ בחום לסגור לפני חשיפה פומבית עם domain אמיתי.
