# Raisa Global Trading website

Static website for Raisa Global Trading, Dhaka: plain HTML, one shared stylesheet and one shared script. There's no build step, so it runs as-is on GitHub Pages.

## Structure

```
index.html                     Home
about.html                     About Raisa Global Trading
produce.html                   Fruits & Vegetables (16 vegetables, 8 fruits)
services.html
quality-policy.html            Quality
products.html                  Seafood (all ten lines)
products/<product>.html        One page per product (10), with specification and photo gallery
contact.html
privacy-policy.html
terms-of-use.html
assets/css/site.css            All styles (colours are the variables at the top)
assets/js/site.js              Menu, dropdowns, photo lightbox, enquiry form
assets/img/                    Logo, photos, seafood images and galleries, produce photos (assets/img/produce/)
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

To use a company domain later, add it under **Settings → Pages → Custom domain** and point the domain's DNS at GitHub Pages.

## Placeholders to replace

Phone, WhatsApp, email and street address are placeholders until Raisa's real details are available. Replace them across all files with find-and-replace:

| Placeholder | Replace with |
|---|---|
| `+880 1XXX-XXXXXX` | Display phone number |
| `+8801XXXXXXXXX` | Phone number for `tel:` links (no spaces) |
| `8801XXXXXXXXX` | WhatsApp number (digits only) |
| `info@example.com` | Email address |
| `[Street address], Dhaka, Bangladesh` | Full address |

The enquiry form sends to the email and WhatsApp number in the `data-email` and `data-whatsapp` attributes of the form in `contact.html`, so replacing the placeholders updates it too.

## Fruits & vegetables range

The produce page lists common Bangladeshi export staples as a starting point, because the Facebook page doesn't publicly list what Raisa sells. Trim it to the real range:

- **Vegetables:** bitter gourd, pointed gourd, bottle gourd, snake gourd, teasel gourd, okra, brinjal, green chilli, taro, yardlong bean, hyacinth bean, potato, pumpkin, cauliflower, green banana, coriander leaves
- **Fruits:** mango, jackfruit, lime, pineapple, litchi, guava, papaya, coconut

Each item is one `<li class="crop">` in `produce.html`; delete the ones he doesn't sell. Four of them also appear in the "Fresh produce, too." section of `index.html`.

The produce photos come from Wikimedia Commons under CC0, public domain, CC BY or CC BY-SA licences. Their credits are listed under "Photo credits" on `produce.html`. Keep that list while those photos are used, and remove an entry when you replace its photo with Raisa's own.

## Editing

- **Header and footer** are repeated in every page. To change a phone number, email or menu item, use find-and-replace across all files (in VS Code: Ctrl+Shift+H).
- **Pages in `products/`** link with `../` (for example `../assets/css/site.css`). Keep that prefix when you copy markup from a top-level page.
- **Product photos** are in `assets/img/gallery/<product>/`. To add one, copy a `<li>` in that product page's gallery and change the file name and caption.
- **Enquiry form.** It doesn't need a server: it opens the visitor's email app or WhatsApp with the message already written. To receive submissions directly instead, connect a form service such as Formspree.
