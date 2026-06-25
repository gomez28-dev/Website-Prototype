# DOYEN Group of Companies

Corporate website for **DOYEN Group of Companies** — a Philippine diversified industrial conglomerate supplying tires, batteries, fuel, tanks, dispensers, LPG, and Sinotruk heavy-duty trucks.

🔗 **Live site:** [https://doyen-prototype.netlify.app](https://doyen-prototype.netlify.app)

---

### What is this?

A full corporate website with a product catalog, company history with interactive timeline, contact form with EmailJS integration, careers portal with job applications, news/CSR articles, FAQ, and legal pages.

### How do I see it?

```sh
npm install
npm run dev        # local dev at localhost:4321
npm run build      # static production build to dist/
```

### What was it built with?

| Layer | Tech |
|---|---|
| Framework | Astro 7 (static SSG) |
| Interactive UI | React 19 islands |
| Styling | Vanilla CSS + custom properties |
| Fonts | Barlow Condensed + Verdana |
| Icons | Lucide React |
| Content | Astro Content Collections (MDX) |
| Forms | EmailJS |
| SEO | @astrojs/sitemap |
| Deployed | Netlify |

### Project structure

```
src/
├── pages/          home, about, products, contact, faq, news, careers, legal
├── components/     Header, Footer, MobileNav, ProductCatalog, ContactForm, ApplyForm
├── layouts/        BaseLayout, LegalPageLayout
├── content/        News articles (MDX)
├── data/           Products, jobs, countries (static TS data)
└── styles/         global.css, base.css
```
