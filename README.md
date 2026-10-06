# Sumaya Seafood website

Static website for Sumaya Seafood Trade International: plain HTML, one shared stylesheet and one shared script. There's no build step, so it runs as-is on GitHub Pages.

## Structure

```
index.html                     Home
company-profile.html           About → Company Profile
president-message.html         About → Message from the President
mission-vision-values.html     About → Mission, Vision & Values
brand-certificates.html        About → Brand & Certificates
what-we-do.html                About → What We Do
services.html
quality-policy.html
sustainability.html
products.html                  All products
products/<product>.html        One page per product (10), with specification and photo gallery
contact.html
privacy-policy.html
terms-of-use.html
assets/css/site.css            All styles
assets/js/site.js              Menu, dropdowns, photo lightbox, enquiry form
assets/img/                    Logo, photos, product images, gallery, certificates
```

## Preview locally

Open `index.html` in a browser. Every link works straight from the folder.

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `sumaya-seafood`.
2. Push this folder to it:

   ```sh
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sumaya-seafood.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then click **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/sumaya-seafood/`.

To use sumayaseafoodbd.com later, add it under **Settings → Pages → Custom domain** and point the domain's DNS at GitHub Pages. Old addresses such as `pages.php?page_id=5` won't redirect, because GitHub Pages can't run PHP.

## Editing

- **Header and footer** are repeated in every page. To change a phone number, email or menu item, use find-and-replace across all files (in VS Code: Ctrl+Shift+H).
- **Pages in `products/`** link with `../` (for example `../assets/css/site.css`). Keep that prefix when you copy markup from a top-level page.
- **Product photos** are in `assets/img/gallery/<product>/`. To add one, copy a `<li>` in that product page's gallery and change the file name and caption.
- **Enquiry form.** It doesn't need a server: it opens the visitor's email app or WhatsApp with the message already written. To receive submissions directly instead, connect a form service such as Formspree.
