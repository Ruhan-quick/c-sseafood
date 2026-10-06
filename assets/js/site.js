/* Sumaya Seafood — shared behaviour */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Header border once the page scrolls
  const header = $('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  const toggle = $('.nav-toggle');
  const setNav = open => {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  };
  if (toggle) toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));

  // Dropdown menus (hover opens them on desktop; these buttons work everywhere)
  const closeSubs = except => $$('.has-sub.open').forEach(li => {
    if (li === except) return;
    li.classList.remove('open');
    $('.sub-toggle', li).setAttribute('aria-expanded', 'false');
  });
  $$('.sub-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.has-sub');
      const open = !item.classList.contains('open');
      closeSubs(item);
      item.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs(); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeSubs();
    setNav(false);
  });
  matchMedia('(min-width: 1081px)').addEventListener('change', () => { setNav(false); closeSubs(); });

  // Product photo lightbox
  const lightbox = $('#lightbox');
  const items = $$('.g-item');
  if (lightbox && items.length) {
    const img = $('.lb-stage img', lightbox);
    const caption = $('.lb-caption', lightbox);
    const count = $('.lb-count', lightbox);
    let index = 0;

    const show = i => {
      index = (i + items.length) % items.length;
      const item = items[index];
      img.src = item.getAttribute('href');
      img.alt = item.dataset.caption;
      caption.textContent = item.dataset.caption;
      count.textContent = `${index + 1} / ${items.length}`;
    };

    items.forEach((item, i) => item.addEventListener('click', e => {
      e.preventDefault();
      show(i);
      lightbox.showModal();
    }));
    $('.lb-close', lightbox).addEventListener('click', () => lightbox.close());
    $('.lb-prev', lightbox).addEventListener('click', () => show(index - 1));
    $('.lb-next', lightbox).addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  // Enquiry form: compose an email or WhatsApp message (no server needed)
  const form = $('#enquiry');
  if (form) {
    const status = $('.form-status', form);
    const productField = $('#f-product', form);
    const requested = new URLSearchParams(location.search).get('product');
    if (requested && [...productField.options].some(o => o.value === requested)) productField.value = requested;

    const compose = () => {
      const data = Object.fromEntries(new FormData(form));
      const lines = [
        ['Name', data.name], ['Company', data.company], ['Email', data.email],
        ['Phone / WhatsApp', data.phone], ['Product', data.product],
        ['Quantity', data.quantity], ['Destination', data.destination]
      ]
        .filter(([, value]) => value && value.trim())
        .map(([label, value]) => `${label}: ${value.trim()}`);
      const message = (data.message || '').trim();
      return {
        subject: `Enquiry: ${data.product || 'Seafood'}${data.company ? ' / ' + data.company.trim() : ''}`,
        body: lines.join('\n') + (message ? `\n\n${message}` : '')
      };
    };

    const valid = () => {
      if (form.checkValidity()) return true;
      form.reportValidity();
      return false;
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!valid()) return;
      const { subject, body } = compose();
      window.location.href = `mailto:info@sumayaseafoodbd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Your email app should now open with the enquiry filled in. If nothing happens, write to info@sumayaseafoodbd.com.';
    });

    $('#send-wa', form).addEventListener('click', () => {
      if (!valid()) return;
      const { subject, body } = compose();
      window.open(`https://wa.me/8801712996456?text=${encodeURIComponent(subject + '\n\n' + body)}`, '_blank', 'noopener');
      status.textContent = 'WhatsApp should open in a new tab with your enquiry ready to send.';
    });
  }

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
