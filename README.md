# Amishka Food Service (AFS): website

Open `index.html` in a browser, or upload this whole folder to any static host (Netlify, Vercel, Cloudflare Pages, cPanel).

```
index.html            page structure and copy
css/style.css         tokens and all section styles (numbered)
css/animations.css    motion and hidden-until-revealed states
css/responsive.css    tablet and phone layouts
js/data.js            EDIT HERE: menu, prices, outlets, franchise plans, FAQ, phone/email
js/ui.js              renders menu, plans, outlets, FAQ; enquiry form; mobile menu
js/animations.js      smooth scroll, GSAP intro, reveals, counters, nav
js/main.js            store-intro video controls
js/vendor/            GSAP, ScrollTrigger, Lenis (bundled, no internet needed)
assets/images/        logo + PLACEHOLDER photos (replace with real ones, same filenames)
assets/video/         PLACEHOLDER store-intro video (replace with the outlet edit)
assets/fonts/         Bricolage Grotesque and Plus Jakarta Sans (self-hosted)
```

## Swapping in real photos and video
1. Save the real file with the same filename (for example `hero-chai.jpg`, `cat-pizza.jpg`, `founder.jpg`, `store-intro.mp4`).
2. In `index.html`, delete the `data-ph="..."` attribute on that element to remove the grey "Placeholder" label.
3. Menu photos are listed in `js/data.js` (`img:` for each category).

## To confirm with the owner
- Support, training and "100% ownership/profit" are shown for all plans; the brochure lists them only under the Rs 61,000 plan.
- "How it works" steps and the four "Why AFS" points are proposals based on the plan contents. Edit freely.
- Prices for menu items other than the Rs 10 chai, outlet addresses/map links, FSSAI number.
- WhatsApp enquiries go to 9893395419; change it in `js/data.js`.
