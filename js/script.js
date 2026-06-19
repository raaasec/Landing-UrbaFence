/* ============================================================
   Cercle Partenaire — Urbafence · Interactions
   - Apparition au scroll (reveal)
   - Cartes "flip" des avantages (clic / clavier)
   - Carrousel de motifs (drag, slider, flèches)
   - Pile d'étapes pilotée au scroll (process)
   ============================================================ */

/* ===== Apparition au scroll, avec repli si déjà visible ===== */
const reveals = document.querySelectorAll('.reveal');
function revealNow(el) { el.classList.add('in-view'); }
function revealVisible() {
  reveals.forEach(el => {
    if (el.classList.contains('in-view')) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) revealNow(el);
  });
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { revealNow(e.target); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));
  requestAnimationFrame(revealVisible);
  setTimeout(revealVisible, 1200);
} else {
  reveals.forEach(revealNow);
}

/* ===== Cartes "flip" : clic tactile + clavier ===== */
const supportsHover = window.matchMedia('(hover: hover)').matches;
const flipCards = document.querySelectorAll('.benefit-flip');
flipCards.forEach(card => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');

  const toggleFlip = (e) => {
    if (e.target.tagName === 'A') return;
    if (e.type === 'touchend') e.preventDefault();
    const wasFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', wasFlipped ? 'true' : 'false');
  };
  card.addEventListener('touchend', toggleFlip, { passive: false });
  card.addEventListener('click', (e) => { if (!supportsHover) toggleFlip(e); });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(e); }
  });
});

/* ===== Carrousel de motifs — contrôle manuel (drag, slider, flèches) ===== */
(function () {
  const grid     = document.getElementById('motifsGrid');
  const viewport = document.getElementById('motifsViewport');
  const track    = document.getElementById('motifsTrack');
  const slider   = document.getElementById('motifsSlider');
  const prevBtn  = document.getElementById('motifsPrev');
  const nextBtn  = document.getElementById('motifsNext');
  if (!grid || !viewport || !track || !slider) return;

  // Dès que l'utilisateur interagit, on stoppe l'animation CSS et on passe au scroll natif
  let userTookOver = false;
  function takeOver() {
    if (userTookOver) return;
    userTookOver = true;
    // On lit la position visuelle courante (matrice) et on la fige en scrollLeft
    const m = new DOMMatrixReadOnly(getComputedStyle(track).transform);
    const currentTx = -m.m41; // tx est négatif car on translate négativement
    track.classList.add('no-anim');
    grid.classList.add('is-interacted');
    viewport.scrollLeft = Math.max(0, currentTx);
    requestAnimationFrame(updateSliderFromScroll);
  }

  function updateSliderFromScroll() {
    const max = viewport.scrollWidth - viewport.clientWidth;
    if (max <= 0) return;
    const pct = (viewport.scrollLeft / max) * 100;
    slider.value = Math.max(0, Math.min(100, pct));
    slider.style.backgroundSize = `${slider.value}% 100%`;
  }

  // Le slider pilote le défilement
  slider.addEventListener('input', () => {
    takeOver();
    const max = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollLeft = (slider.value / 100) * max;
    slider.style.backgroundSize = `${slider.value}% 100%`;
  });

  // Le défilement met à jour le slider
  viewport.addEventListener('scroll', () => {
    if (!userTookOver) return;
    updateSliderFromScroll();
  }, { passive: true });

  // Boutons Précédent / Suivant
  function pageScroll(dir) {
    takeOver();
    const card = track.querySelector('.motif-card');
    const cardW = card ? card.offsetWidth + 14 : 220;
    viewport.scrollBy({ left: dir * cardW * 3, behavior: 'smooth' });
  }
  if (prevBtn) prevBtn.addEventListener('click', () => pageScroll(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => pageScroll(1));

  // Glisser (souris + tactile) sur le viewport
  let isDown = false, startX = 0, startScroll = 0;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button')) return; // pas de drag sur liens/boutons
    takeOver();
    isDown = true;
    viewport.classList.add('is-grabbing');
    startX = e.pageX;
    startScroll = viewport.scrollLeft;
    viewport.setPointerCapture?.(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - startX);
    viewport.scrollLeft = startScroll - walk;
  });
  function endDrag(e) {
    isDown = false;
    viewport.classList.remove('is-grabbing');
    try { viewport.releasePointerCapture?.(e.pointerId); } catch (_) {}
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', () => { if (isDown) endDrag({}); });

  // Molette horizontale
  viewport.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      takeOver();
      viewport.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // Remplissage initial du slider
  slider.style.backgroundSize = `0% 100%`;
})();

/* ===== Process / étapes — transitions de phase pilotées au scroll ===== */
(function () {
  const scrollEl = document.getElementById('processScroll');
  const stack    = document.getElementById('stepsStack');
  const fill     = document.getElementById('stepsProgressFill');
  const items    = document.querySelectorAll('.steps-progress-item');
  if (!scrollEl || !stack) return;

  // Sur mobile, pas d'effet "pinned" : les cartes s'affichent en pile statique
  const mql = window.matchMedia('(max-width: 760px)');

  let raf = 0;
  function update() {
    raf = 0;
    if (mql.matches) return;

    const rect = scrollEl.getBoundingClientRect();
    const total = scrollEl.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, Math.min(total, -rect.top));
    const progress = total > 0 ? scrolled / total : 0;

    // Trois phases distinctes avec une petite zone d'ease aux seuils
    let phase = 1;
    if (progress > 0.62) phase = 3;
    else if (progress > 0.30) phase = 2;
    stack.dataset.phase = phase;

    // Hauteur de la barre de progression — 0%, ~50%, 100%
    if (fill) {
      const target = phase === 3 ? 100 : phase === 2 ? 50 : 0;
      fill.style.height = target + '%';
    }

    items.forEach(it => {
      it.dataset.active = (parseInt(it.dataset.step) === phase) ? 'true' : 'false';
    });
  }
  function onScroll() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  // Cliquer sur une étape amène à la position de scroll correspondante
  items.forEach(it => {
    it.addEventListener('click', () => {
      if (mql.matches) return;
      const step = parseInt(it.dataset.step);
      const total = scrollEl.offsetHeight - window.innerHeight;
      const target = step === 1 ? 0.05 : step === 2 ? 0.45 : 0.85;
      const top = scrollEl.offsetTop + total * target;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  function applyMobileFallback() {
    if (mql.matches) {
      stack.removeAttribute('data-phase');
      items.forEach(it => it.dataset.active = 'true');
      if (fill) fill.style.height = '100%';
    } else {
      update();
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', applyMobileFallback);
  if (mql.addEventListener) mql.addEventListener('change', applyMobileFallback);
  applyMobileFallback();
})();
