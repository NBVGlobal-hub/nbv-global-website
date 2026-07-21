// NBV Global Enterprises — header, mobile menu, scroll reveal, contact form
(function () {
  var header = document.getElementById('siteHeader');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');

  function onScroll() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Certificate lightbox (Quality page)
  var lightbox = document.getElementById('certLightbox');
  if (lightbox) {
    var lbImg = document.getElementById('certLightboxImg');
    var lbClose = lightbox.querySelector('.cert-lightbox-close');
    document.querySelectorAll('.cert-card[data-cert-img]').forEach(function (card) {
      card.addEventListener('click', function () {
        lbImg.src = card.getAttribute('data-cert-img');
        lbImg.alt = card.getAttribute('data-cert-title') || 'Certificate';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  // If arriving via #certifications link, scroll there after load
  if (window.location.hash === '#certifications') {
    var certSection = document.getElementById('certifications');
    if (certSection) setTimeout(function () { certSection.scrollIntoView({ behavior: 'smooth' }); }, 60);
  }

  // Contact form (demo — shows confirmation, does not send yet)
  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var note = document.getElementById('formNote');
      note.hidden = false;
      form.querySelector('button[type="submit"]').textContent = 'Enquiry Sent';
      form.querySelectorAll('input,select,textarea,button').forEach(function (f) { f.disabled = true; });
    });
  }
})();
