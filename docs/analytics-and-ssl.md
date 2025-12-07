# Analytics, GTM, SSL and Search Console — Quick Setup Guide

This short guide explains how to verify analytics, set up Google Tag Manager (optional), enable HTTPS, and submit your sitemap to Google Search Console.

## 1) Verify GA4 is active
- You added `G-1NQDSN2060` to `_config.yml` under `analytics.google.ga4_measurement_id`.
- To verify:
  1. Run the site locally: `bundle exec jekyll serve --livereload`.
  2. Open your site and in Google Analytics (Realtime) check active users.
  3. In DevTools Network tab look for requests to `www.googletagmanager.com/gtag/js?id=G-1NQDSN2060`.

## 2) Cookie consent & privacy
- The site now shows a cookie consent banner for analytics and will only load analytics when the user explicitly grants permission.
- Consent is stored in `localStorage` as `analytics_consent = granted|denied`.
- The analytics helper will not send any events unless consent is `granted`.

## 3) Event tracking implemented
- Outbound clicks: tracked as `outbound_click` with `{ destination: <href> }`.
- Form submissions: tracked as `form_submit` with `{ form_id: <id|name|action> }`.
- Dark-mode toggle: tracked as `toggle_theme` with `{ mode: 'dark'|'light' }`.

Notes: events are queued until analytics is initialized after consent.

## 4) Google Tag Manager (GTM)
- If you prefer GTM, add the GTM container ID to `_config.yml` under `analytics.google.gtm_container_id` and set `analytics.provider` to `gtm`.
- GTM will be loaded only after the user grants consent.
- Use GTM to add additional tags (GA4, Ads, Hotjar, etc.) centrally without editing site code.

## 5) Enable HTTPS (GitHub Pages)
- If you host on GitHub Pages with a custom domain (you have a `CNAME`), follow these steps:
  1. Set DNS: For apex domain, add GitHub Pages A records (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153). For `www` use a CNAME to `username.github.io`.
  2. In the repository Settings → Pages, ensure your custom domain is set and check `Enforce HTTPS` once the certificate is provisioned.
  3. Wait a few minutes to an hour for Let's Encrypt certificate provisioning.

- Alternatively use Cloudflare (recommended for CDN + SSL):
  1. Add your site to Cloudflare and update nameservers at the registrar.
  2. Keep the GitHub Pages DNS records in Cloudflare.
  3. Set SSL/TLS mode to `Full (strict)` if origin has a cert; enable `Always Use HTTPS`.

## 6) Submit sitemap to Google Search Console
1. Go to https://search.google.com/search-console
2. Add and verify your property (use the recommended DNS verification for a domain-level property, or HTML file/meta tag for a URL prefix property).
3. Open `Sitemaps` in the left menu and submit `https://your-domain/sitemap.xml` (Jekyll's `jekyll-sitemap` plugin generates `sitemap.xml` automatically).
4. Monitor coverage and performance in Search Console.

## 7) Next steps & recommendations
- If you want, I can:
  - Add an opt-in cookie banner that persists server-side and blocks analytics server-side (requires backend).
  - Configure additional event tracking for specific buttons/pages you care about.
  - Set up GTM container and demonstrate how to add tags.
  - Validate DNS records for your domain and help enable GitHub Pages HTTPS (if you share your domain and DNS provider).

If you want me to add any of the optional items above, tell me which one and I'll implement it next.
