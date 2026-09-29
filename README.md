# وب‌سایت فرزام یمینی

این صفحه با HTML، CSS، jQuery و Bootstrap ساخته شده است. برای مشاهده، `index.html` را در مرورگر باز کنید.

## فایل‌ها

- `index.html`: ساختار و متن فعلی فارسی
- `styles.css`: چیدمان واکنش‌گرا و متغیرهای رنگ برای تم‌ها
- `translations.js`: داده‌های محتوایی و ترجمهٔ فارسی/انگلیسی
- `script.js`: منوی موبایل، ناوبری، و زیرساخت زبان و تم
- `assets/`: فونت، کتابخانه‌ها و تصاویر

تصاویر پروژه‌ها موقت هستند. مسیر آن‌ها در `index.html` قرار دارد و می‌توان آن‌ها را با فایل‌های اصلی جایگزین کرد.

## تکمیل پیوندها

پیوندهای رزومه، پروژه‌ها، GitHub، LinkedIn و ایمیل تا زمان دریافت نشانی معتبر غیرفعال هستند. برای فعال‌سازی، مقادیر `destinations` را در ابتدای `script.js` تنظیم کنید یا شیء `window.portfolioLinks` را پیش از بارگذاری `script.js` تعریف کنید. برای ایمیل از نشانی `mailto:` استفاده کنید.

## زبان و تم

متن‌ها با `data-i18n` مشخص شده‌اند و داده‌های فارسی و انگلیسی در `translations.js` قرار دارند. `setPortfolioLocale` بدون بارگذاری مجدد صفحه، متن‌ها، metadata، ویژگی‌های دسترس‌پذیری، `lang`، `dir` و فایل Bootstrap RTL/LTR را تغییر می‌دهد. زبان انتخابی در `localStorage` نگهداری می‌شود. رنگ‌ها در ابتدای `styles.css` با متغیرهای CSS تعریف شده‌اند؛ هر دو تم روشن و تیره فعال‌اند و تم پیش‌فرض Dark است.

تم با `data-theme` روی `html` اعمال می‌شود و با کلید مستقل `farzam-portfolio-theme` در `localStorage` ذخیره می‌شود (پیش‌فرض Dark). توکن‌های معنایی `--page`، `--panel`، `--panel-strong`، `--text`، `--muted`، `--line`، `--accent`، `--accent-hover` و `--shadow` در ابتدای `styles.css` قرار دارند. برای افزودن تم جدید، همین توکن‌ها را در selectorی مانند `html[data-theme="new-theme"]` مقداردهی کنید؛ `setPortfolioTheme("dark" | "light")` سوئیچ را بدون refresh انجام می‌دهد.

## اتصال محتوا به API در آینده

`translations.js` فقط دادهٔ JSON-compatible نگه می‌دارد و `script.js` مسئول رفتار و رندر است. پاسخ API هر زبان می‌تواند شکل سادهٔ زیر را داشته باشد:

```json
{
  "direction": "ltr",
  "bootstrap": "ltr",
  "meta": { "title": "Page title", "description": "Page description" },
  "text": { "hero-name": "Name", "about-copy": "About text" },
  "attributes": { "main-navigation": "Main navigation", "hero-image": "Portrait" }
}
```

بعداً می‌توان داده را با `fetch` دریافت و بدون تغییر منطق DOM به `applyPortfolioContent(locale, response)` داد. کلیدهای `text` با `data-i18n` و کلیدهای `attributes` با `data-i18n-aria-label` یا `data-i18n-alt` در HTML متناظرند. متن ساده با `textContent` اعمال می‌شود و به HTML داخل داده نیاز ندارد.

فونت وزیرمتن با مجوز موجود در `assets/fonts/OFL.txt` در پروژه نگهداری می‌شود. منبع لوگوهای فناوری و مجوز مربوط به آن‌ها در `assets/technology/SOURCES.md` و `assets/technology/LICENSE-devicon.txt` ثبت شده است.
