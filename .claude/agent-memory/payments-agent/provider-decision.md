# החלטת ספק סליקה — "המוקד"

## החלטה
**Cardcom** נבחר כספק הסליקה לשלב הראשון (החלטת משתמש, 2026-07-06).

## נימוקים
- תמיכה מלאה בישראל (שקל, חשבוניות מס, עברית).
- נפוץ בעסקים קטנים-בינוניים בישראל — תמיכה טכנית זמינה בעברית.
- תומך בעסקאות חד-פעמיות ותשלומים (רלוונטי למחיר מנעול/כספת + אפשרות פריסה לתשלומים).

## מגבלות ידועות שיש להביא בחשבון בבנייה
- Cardcom לא מציע SDK/אינטגרציה מובנית ל-Next.js/Vercel כמו Stripe — נדרשת אינטגרציה מותאמת מול ה-API/iframe המאובטח שלהם (LowProfile / Page).
- **לעולם לא לשמור פרטי כרטיס בשרת עצמי** — שימוש ב-iframe/hosted page מאובטח של Cardcom בלבד (לפי security-compliance-agent + CLAUDE.md).
- דורש חשבון סוחר (merchant account) פעיל מול Cardcom בפועל + מפתחות API — **טרם קיימים בפרויקט**. עד לקבלתם, ה-checkout באתר ייבנה כ-**stub/placeholder מוכן לחיבור** (טופס "השאירו פרטים להזמנה" שמזין ליד לצוות המכירות + מבנה קוד מוכן לחיבור בפועל ל-Cardcom ברגע שיתקבלו פרטי הסוחר).

## הצעד הבא בפועל
~~כשיתקבלו פרטי חשבון הסוחר מ-Cardcom...~~ — **בוצע 2026-07-10, ראה עדכון checkout אמיתי למטה.**

## עדכון 2026-07-10 (סבב ראשון) — מחירי מנעולים חכמים סופיים, לפני חיבור Cardcom
המשתמש עדכן את `ourPrice` הסופי של 4 דגמי המנעולים החכמים ב-`lib/locks.ts` **כהכנה מפורשת לחיבור Cardcom** (בקשת המשתמש: "לפני שאני מחבר את קארדקום לאתר, שנה לי מחירים..."). מחירים חדשים: Smart ₪1,790, Smart Plus ₪2,300, Model T ₪2,590, ALFA ₪2,790 — כולם "מחיר סופי ללקוח" (כולל התקנה, הדרכה, אחריות יבואן רשמי), בדיוק המספר שאמור לעבור בפועל בסליקה כשתחובר. ראה `web-dev-agent/site-structure.md` ו-`strategy-agent/positioning.md` לתיעוד המלא של שינוי המחיר.

## עדכון 2026-07-10 (סבב שני) — checkout אמיתי נבנה, כולל אינטגרציית Cardcom LowProfile

המשתמש ביקש לחבר בפועל סליקה + checkout שיווקי per-product + cross-sell (5% הנחה על מוצר משלים באותו מסך תשלום). למשתמש **יש** פרטי סוחר אמיתיים של Cardcom, אך בחר למלא אותם בעצמו ל-`.env.local` (לא הדביק בצ'אט — שיקול אבטחה נכון, לא לבקש ממנו שוב להדביק credentials).

**מה נבנה בפועל (לא stub-בלבד יותר):**
- `site/src/lib/cardcom.ts` — לקוח API אמיתי ל-Cardcom LowProfile (`createLowProfileSession`, `getLowProfileResult`). **כל הנחה על מבנה ה-API (endpoint, שמות שדות, discriminator שדה הצלחה/כישלון) מסומנת `// TO VERIFY` בקוד** — לא אומתה מול תיעוד/דשבורד Cardcom האמיתי בפועל, כי לא היו לסוכן פרטי גישה. **קריטי: לפני עסקה אמיתית ראשונה, לעבור על כל הערות `TO VERIFY` בקובץ הזה ולוודא מול Cardcom.**
- `CARDCOM_DRY_RUN=true` (ב-`.env.local` המקומי) — עוקף קריאה אמיתית, מאפשר לבדוק את כל הזרימה (checkout מלא, cross-sell, success page) בלי כסף אמיתי. **חובה לוודא ש-`CARDCOM_DRY_RUN` לא נשאר `true` בסביבת production/Vercel.**
- `.env.local.example` — מתעד את כל משתני הסביבה הנדרשים (`CARDCOM_TERMINAL_NUMBER`, `CARDCOM_API_NAME`, `CARDCOM_API_PASSWORD`, `CARDCOM_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`, `CARDCOM_EMBED_MODE`, `CARDCOM_DRY_RUN`). `.env.local` בפועל כבר קיים מקומית עם ערכי dry-run — **המשתמש צריך למלא את פרטי הסוחר האמיתיים בעצמו ולכבות dry-run לפני שקה**.
- `/api/checkout` — מחשב מחיר **בשרת בלבד** (לעולם לא סומך על סכום מהלקוח), דוחה עם 400 אם `crossSellSlug` שנשלח לא תואם למיפוי האמיתי (`lib/crossSell.ts`) — נבדק בפועל שהתקיפה הזו נחסמת.
- `/api/checkout/callback` — מאמת webhook מול Cardcom עצמו (`getLowProfileResult`) לפני שמסמן הזמנה כמושלמת, אידמפוטנטי ל-retries. **⚠️ TO VERIFY: לא אושר אם Cardcom שולח webhook כ-POST JSON או GET query params — הקוד מניח POST JSON.**
- `lib/checkout.ts` — נקודת נורמליזציה יחידה על פני 4 מקורות דאטה שונים (מנעולים/כספות נשק/כספות בית/קורס), `getCheckoutItem(slug)`.
- `lib/crossSell.ts` — מיפוי קבוע מנעולים↔כספות (5% הנחה), **הקורס לא כלול בכלל** — הוחלט במפורש ע"י המשתמש שקוני קורס לא רואים cross-sell.
- `site/src/app/checkout/[slug]/page.tsx` + `components/checkout/CheckoutFlow.tsx` — checkout שיווקי מלא per-product: הירו לפי קטגוריה, תגי אמון, סיכום הזמנה שקוף, order-bump cross-sell (checkbox חי), טופס פרטים (כולל אימייל — שדה חדש שלא נאסף לפני כן באתר), toggle התקנה מקצועית (כספות, ברירת מחדל מסומן "מומלץ").
- `BuyNowButton.tsx` — CTA ראשי חדש בכל 11 דפי המוצר (4 מנעולים + 2 כספות נשק + 4 כספות בית + קורס), מוביל ל-`/checkout/[slug]`. **טופס הליד הקיים (`ProductOrderForm`/`LeadForm`) נשאר** כאופציה משנית ("יש לי שאלה לפני שרוכשים") — לא נמחק.

**אומת בפועל (Playwright, `CARDCOM_DRY_RUN=true`):** זרימה מלאה alfa→checkout→cross-sell toggle→טופס→תשלום מדומה→success page עובדת מקצה לקצה. checkout של כספת (`ib250`) מציג פירוק מחיר+משלוח+התקנה נכון. checkout של הקורס (`lock-installation`) **לא מציג בלוק cross-sell וללא שדה כתובת**, בדיוק לפי ההחלטה. `/checkout/not-a-real-slug` מחזיר 404. `tsc`/`eslint` נקיים.

**הצעד הבא בפועל (לא בוצע ע"י הסוכן, באחריות המשתמש):** למלא credentials אמיתיים ב-`.env.local`, לעבור על כל `// TO VERIFY` ב-`lib/cardcom.ts` מול תיעוד/דשבורד Cardcom האמיתי, לוודא מנגנון ה-webhook (POST/GET), לבדוק אם Cardcom תומך ב-iframe embedding (X-Frame-Options) או רק redirect (`CARDCOM_EMBED_MODE`), ולוודא אם נדרשת חשבונית מס אוטומטית (`Document` block ב-`lib/cardcom.ts`). ראה `security-compliance-agent/security-checklist.md` לצ'ק-ליסט המלא לפני כסף אמיתי.

## עדכון 2026-07-10 (סבב שלישי) — 3 שינויים לפני מסירת פרטי Cardcom בפועל

המשתמש ביקש שינויים אלה **לפני** שהוא מוסר את פרטי הסוחר האמיתיים (עדיין לא נמסרו נכון לעדכון זה):

1. **Cross-sell שונה מהיסוד** — `lib/crossSell.ts` נכתב מחדש. הגרסה הקודמת זיווגה מנעולים↔כספות לפי טווח מחיר (דו-כיווני). **עכשיו:** רק כספות (נשק+בית) מציעות cross-sell, ותמיד **דגם ALFA ספציפית** ("המנעול המתקדם ביותר בישראל") — לא זיווג לפי מחיר יותר. **מנעולים וקורס לא מציעים cross-sell בכלל** — הוסר לגמרי מהמפה (לא רק "לא נוסף", אלא הוסרו הערכים הקיימים של ALFA/Model T/Smart Plus/Smart כמפתחות במפה). `getCrossSellSlug("alfa")` וכו' מחזיר `undefined` כעת. אומת: checkout של `alfa` (מנעול) כבר לא מציג בלוק cross-sell כלל; checkout של `ib250`/`b600`/כל כספת מציג את ALFA.
2. **שכפול מהחלטת cross-sell #1 שכבר הייתה קיימת** — "קוני קורס לא רואים cross-sell" כבר היה מיושם נכון (`lib/crossSell.ts` המקורי מ-2026-07-10 סבב שני). ההנחיה החדשה "מי שקונה מנעול חכם או קורס לא להוסיף דברים נוספים" הרחיבה את זה גם למנעולים — בוצע כחלק מ-#1 למעלה.
3. **איסוף עצמאי (self-pickup) נוסף לכספות** — `lib/checkout.ts` קיבל `PICKUP_LOCATION = "אולם התצוגה, רחוב האורגים 34, אשדוד"` ו-`FulfillmentMethod = "shipping" | "pickup"`. ב-`CheckoutFlow.tsx`: radio group חדש (רק לכספות, `isSafe = item.shippingPrice !== undefined`) בין "משלוח עד הבית" ל"איסוף עצמאי מאולם התצוגה". **החלטת עיצוב: כשנבחר איסוף עצמאי — שדה הכתובת נעלם (לא נדרש), ותיבת "התקנה מקצועית" נעלמת גם היא** (התקנה דורשת שהטכנאי יגיע לכתובת הלקוח — לא הגיוני בשילוב עם איסוף עצמאי; לא נשאלה שאלת הבהרה על זה, זו הנחה סבירה שכדאי לוודא מול המשתמש אם מתברר לא נכון). `/api/checkout` אוכף את זה בשרת גם אם קליינט ינסה לשלוח `includeInstallation:true` יחד עם `fulfillment:"pickup"` — מתעלם מזה (נבדק בפועל ב-curl). `amount` בשרת מדלג על `shippingPrice` כש-`fulfillment==="pickup"`. `address` לא נדרש (400) כש-pickup. אומת חזותית: מעבר לרדיו "איסוף עצמאי" מסתיר כתובת+התקנה ומוריד את הסה"כ ל-מחיר הפריט בלבד.

כל 3 השינויים אומתו: `tsc`/`eslint` נקיים, נבדקו ב-curl (כולל ניסיון תקיפה: `includeInstallation:true`+`fulfillment:"pickup"` יחד, ו-cross-sell מזויף על מנעול) ו-Playwright חזותית. **פרטי Cardcom האמיתיים טרם נמסרו** — `CARDCOM_DRY_RUN=true` עדיין פעיל ב-`.env.local`.

## עדכון 2026-07-10 (סבב רביעי) — עלות המשלוח כלולה בהתקנה, לא מצטברת

תיקון נוסף לפני מסירת פרטי Cardcom: "מי שבוחר בכספות את ההתקנה — עלות המשלוח נכללת בהתקנה" (לא משולמת בנפרד). לפני התיקון: `total = price + shippingPrice + installationPrice` (שני התשלומים הצטברו). אחרי: אם נבחרה התקנה (`includeInstallation && !isPickup`), `shippingPrice` **לא** נוסף כלל — רק `installationPrice` (שכולל את המשלוח בתוכו). אם לא נבחרה התקנה (ו-fulfillment הוא "shipping", לא "pickup") — `shippingPrice` עדיין נגבה בנפרד כרגיל.

`CheckoutFlow.tsx`: משתנה חדש `shippingIncludedInInstallation` (=`installationSelected`) קובע את חישוב ה-`total` בצד לקוח, ואת תווית שורת "משלוח" בסיכום ההזמנה (מוצג "משלוח (כלול בהתקנה) — ללא עלות נפרדת" כשרלוונטי, ותווית ההתקנה עצמה שונתה ל"התקנה מקצועית (כולל משלוח)"). הטקסט מתחת לתיבת הסימון עודכן ("כולל את המשלוח — לא משולם בנפרד"). `/api/checkout`: אותה לוגיקה בדיוק שוכפלה בצד שרת (`installationSelected` מחושב שם באופן עצמאי, לא סומך על ערך מהלקוח) — **מקור האמת למחיר תמיד השרת**, החישוב בצד לקוח הוא רק לתצוגה מיידית.

## עדכון 2026-07-10 (סבב חמישי) — פרטי סוחר Cardcom אמיתיים הוזנו, `lib/cardcom.ts` אומת מול ה-API החי

המשתמש מסר את פרטי הסוחר האמיתיים (Terminal 154264 + ApiName + ApiPassword) ישירות ל-`.env.local` (לא בצ'אט — לפי ההחלטה המקורית). לפני שנגעתי בקוד, נמצא ותוקן **באג קטן ב-`.env.local` עצמו**: רווח מוביל אחרי `CARDCOM_API_NAME=` (`CARDCOM_API_NAME= xxxxx`) — היה עלול לשבור אימות מול Cardcom אם הם עושים התאמה מדויקת של המחרוזת. תוקן.

**עם אישור מפורש מהמשתמש, בוצעה קריאה אמיתית אחת (לא dry-run) ל-Cardcom** דרך סקריפט זמני מבודד (`_test-cardcom.mjs`, לא נגע ב-`CARDCOM_DRY_RUN` של האפליקציה, לא רץ דרך `/api/checkout` כדי לא ללכלך את `orderStore`/logs עם נתוני בדיקה) — יצירת LowProfile session על ₪1 (לא מחייב אף כרטיס, יצירת session בלבד). **תוצאה: כל ה"TO VERIFY" המרכזיים ב-`lib/cardcom.ts` אומתו כנכונים במדויק** מהניסיון הראשון (endpoint `https://secure.cardcom.solutions/api/v11/LowProfile/Create`, שמות שדות `TerminalNumber`/`ApiName`/`ApiPassword`, `Language:"he"`, `ISOCoinId:1` ל-₪, ותבנית תגובה `ResponseCode`/`Description`/`Url`/`LowProfileId`) — **פרט אחד היה חסר בפועל:** הטרמינל הזה דורש `Document.Products` (מערך שורות חשבונית: `Description`/`Quantity`/`UnitCost`) — בלעדיו הוחזר `ResponseCode:5047 "No InvoiceLines data was send"`. **תוקן ב-`lib/cardcom.ts`** — נוסף `Products: [{ Description: params.description, Quantity: 1, UnitCost: params.amount }]` לתוך ה-`Document` block. אחרי התיקון, קריאה שנייה החזירה `ResponseCode:0`, `Url`, ו-`LowProfileId` אמיתיים — **ה-flow המלא של יצירת session עובד live**.

נבדק גם `LowProfile/GetLpResult` על אותו `LowProfileId` (עדיין לא שולם) — `ResponseCode:5119` "עסקה ממתינה או לא הושלמה", `TranzactionInfo:null`, `ReturnValue` חזר תקין. **מאמת שהקוד הקיים ב-`getLowProfileResult` כבר נכון** (ה-optional chaining `data.TranzactionInfo?.ResponseCode === 0` כבר מטפל נכון במקרה `null`). **לא אומת:** הצורה המדויקת של `TranzactionInfo` כשעסקה **כן** מצליחה בפועל (לא הייתה עסקה משולמת לבדוק) — יש לאמת שוב אחרי התשלום האמיתי הראשון.

**נשאר פתוח, לא אומת בסבב הזה:**
- מנגנון ה-webhook בפועל (POST JSON מול GET query params) — `/api/checkout/callback` עדיין לא נבדק מול Cardcom אמיתי כי `NEXT_PUBLIC_SITE_URL` היה `localhost` (Cardcom לא יכול לקרוא ל-webhook על localhost) — ידרוש פריסה אמיתית או מנגנון tunneling (ngrok וכו') לבדיקה.
- האם `DocumentType:"Order"` (שנשלח בהצלחה) הוא באמת מה שרוצים לצורכי חשבונית מס אמיתית, או שצריך `"Invoice"`/`"Receipt"` — שאלה לרואה חשבון, לא טכנית.
- `CARDCOM_DRY_RUN` **נשאר `true`** — הבדיקה החיה בוצעה דרך סקריפט חד-פעמי מבודד, לא דרך זרימת ה-checkout באתר עצמו. עדיין לא בוצעה עסקה מלאה (מהאתר, עד עמוד תשלום Cardcom בפועל) — זה הצעד הבא כשהמשתמש מוכן.
- הסקריפטים הזמניים (`_test-cardcom.mjs`, `_test-cardcom-result.mjs`) נמחקו אחרי השימוש — לא נשארו בקוד.

`tsc`/`eslint` נקיים אחרי התיקון. שרת הפיתוח הופעל מחדש (עבר מ-4173 ל-3000 — פורט שהשתנה בין הפעלות; `NEXT_PUBLIC_SITE_URL` עודכן בהתאם ב-`.env.local`).

אומת חזותית ב-Playwright על `ib250` (מחיר ₪390, משלוח ₪42, התקנה ₪350): עם התקנה מסומנת — סה"כ ₪740 (390+350, בלי 42 בנפרד); עם התקנה לא מסומנת — סה"כ ₪432 (390+42). `tsc`/`eslint` נקיים.

## עדכון 2026-07-17 — bundle הוכלל לכל זוג מוצרים (סוכן מכירות AI), ותוקן באג תמחור אמיתי שנחשף

במסגרת שדרוג ה-chatbot לסוכן מכירות מלא (ראה `chatbot-agent/adversarial-test-log.md`), המשתמש ביקש שה-bundle (5% הנחה) יעבוד על **כל זוג מוצרים בקטלוג**, לא רק כספת→ALFA. שונה:
- `lib/crossSell.ts` — נוספה `isValidBundlePair(slugA, slugB)` (שני slugs אמיתיים ושונים, בלי הגבלת קטגוריה) לצד `crossSellMap`/`getCrossSellSlug` הקיימים, שנשארו כברירת המחדל האורגנית (מבקר שלא דרך הצ'אט עדיין רואה כספת→ALFA כרגיל).
- `api/checkout/route.ts` — הוולידציה של `crossSellSlug` עברה מ"שווה בדיוק למיפוי הקבוע" ל-`isValidBundlePair` — עדיין בשרת בלבד, עדיין דוחה 400 לכל זוג לא-תקין.
- `checkout/[slug]/page.tsx` — פרמטר URL חדש `?addon=<slug>` (מהסוכן AI, לא רק ברירת המחדל הקבועה) גובר על ה-default כשתקין.

**⚠️ באג תמחור אמיתי שנחשף בבדיקה חיה (לא רק בכוונה) ותוקן באותו סבב:** נוסחת חישוב הסכום (גם בשרת `api/checkout/route.ts` וגם בלקוח `CheckoutFlow.tsx`) הוסיפה תמיד רק `crossSellItem.price` (עם ה-5% הנחה) — **מעולם לא הוסיפה את `crossSellItem.shippingPrice`**. זה לא שיחק תפקיד קודם כי ה-addon היה תמיד ALFA (מנעול, ללא דמי משלוח) — אבל ברגע שה-addon יכול להיות **כספת** (יש לה `shippingPrice`), הלקוח היה מקבל את הכספת הנוספת עם משלוח חינם בטעות. **תוקן:** שני המקומות (שרת+לקוח) מוסיפים כעת את `crossSellItem.shippingPrice` אם קיים, ללא תלות במצב ה-pickup/התקנה של הפריט הראשי (ל-addon אין toggle התקנה משלו — checkbox יחיד, לא cart מלא). גם תווית שורה חדשה בסיכום ההזמנה (`CheckoutFlow.tsx`) מציגה את דמי המשלוח של ה-addon בנפרד כשרלוונטי.

**אומת חי (לא רק תיאורטית):** הופעל זמנית `CARDCOM_DRY_RUN=true` (הוחזר ל-`false` בסיום), נבדק bundle קורס (`lock-installation`) + כספת בית (`ib250`) — זוג שהיה נדחה קודם (400 `invalid cross-sell pairing`) — עכשיו מתקבל (200), עם סכום ששיקף נכון את דמי המשלוח (עלה ב-₪42 בדיוק אחרי התיקון, תואם למחיר המשלוח המתועד של IB250). זוגות לא-תקינים (slug מזויף, אותו slug כבסיס וכ-addon) עדיין נדחים ב-400. `tsc`/`eslint` נקיים, `next build` מלא עבר (41 routes).