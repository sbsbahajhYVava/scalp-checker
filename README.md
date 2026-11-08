# Scalp Ingredient Checker

A small web app that checks hair and skin products for ingredients that can feed
*Malassezia*, the yeast behind seborrhoeic dermatitis, and flags fragrance allergens
and irritants separately. It runs entirely in the browser: no account, no server,
nothing uploaded.

## What it does
- **Paste**: paste an ingredient (INCI) list and get a verdict, ingredient by ingredient.
- **Photo**: read a photo of the label on the device (Tesseract OCR), then fix misreads
  against a dictionary of common ingredient names. Always compare with the package.
- **Web page**: paste text copied from a shop's product page and it finds the
  ingredient list, or use the one-tap bookmark ("Scalp Check this page") from the
  Web page tab, which sends a product page's text to the app.
- **The 1% line**: EU/US labels list ingredients above 1% in descending order, and
  phenoxyethanol is capped at 1% in the EU, so everything after it is ≤1%.
- **Share link / Copy report** buttons for sending a result to someone.

## Put it online (free)
The app is the files in this folder. Any static host works; it needs HTTPS for
"Add to Home Screen" and offline use.

**GitHub Pages**
1. Create a new public repository on github.com and upload every file in this folder.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. After a minute it is live at `https://<your-username>.github.io/<repo-name>/`.

**Netlify Drop**: sign in at app.netlify.com/drop and drag this folder onto the page.

**Cloudflare Pages**: Workers & Pages → Create → Pages → Upload assets → this folder.

**Without hosting**: open `index.html` directly in a browser. Pasting works offline;
photo reading needs an internet connection the first time (it downloads the reader),
and Add to Home Screen and the bookmark need the hosted version.

## On your phone
Open the hosted address, then Share → Add to Home Screen (iPhone) or ⋮ → Install app
(Android). After the first photo read, the app and its reader work offline.

## Files
- `index.html`: the whole app (rules engine, text tools, interface)
- `sw.js`: offline cache
- `manifest.webmanifest`, `icon*.png`, `icon.svg`: home-screen install

## Evidence and limits
Ratings come from in-vitro studies (Dobler et al. 2019, Cosmetics 6:45; Mayser et al.
1995 and 1997; Crit Care Med 1999;27:1781), DeAngelis et al. 2005 and EU Regulation
1223/2009. Full citations and links are in the app under "How it decides". Nearly all
of this is lab-plate data; no clinical trial has tested styling products in
seborrhoeic dermatitis. Ingredients the database doesn't know are listed, not guessed.
Not medical advice.
