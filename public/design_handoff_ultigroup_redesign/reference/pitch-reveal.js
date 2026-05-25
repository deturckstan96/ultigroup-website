// Scroll reveal — runs on every page that includes pitch.css
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0 }
  );
  els.forEach(el => obs.observe(el));
  // Force-reveal anything already in viewport on load
  setTimeout(() => {
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('visible');
    });
  }, 50);
})();
