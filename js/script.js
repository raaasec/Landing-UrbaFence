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

/* ===== Mini-configurateur Urbafence (démonstratif) =====
   Pilote l'aperçu via des variables CSS et met à jour le résumé.
   Sort proprement si la section n'est pas présente. */
function initUfConfigurator() {
  const root = document.getElementById('ufConfigurator');
  if (!root) return;

  // Palette premium (nom + valeur)
  const COLORS = [
    { id: 'noir',       name: 'Noir sablé',      hex: '#1F2324' },
    { id: 'anthracite', name: 'Gris anthracite', hex: '#2F3436' },
    { id: 'quartz',     name: 'Gris quartz',     hex: '#5E6361' },
    { id: 'gris-clair', name: 'Gris clair',      hex: '#B7B8B2' },
    { id: 'blanc',      name: 'Blanc cassé',     hex: '#E8E3D7' },
    { id: 'vert',       name: 'Vert Urbafence',  hex: '#35823F' },
    { id: 'sauge',      name: 'Vert sauge',      hex: '#7E9278' },
    { id: 'bronze',     name: 'Bronze',          hex: '#8A6A43' },
    { id: 'corten',     name: 'Brun corten',     hex: '#9A4F2B' },
    { id: 'beige',      name: 'Beige pierre',    hex: '#C7B89D' },
    { id: 'bleu',       name: 'Bleu nuit',       hex: '#1E3445' },
    { id: 'rouge',      name: 'Rouge brun',      hex: '#6F2F24' }
  ];
  const IMPL = { muret: 'Sur muret', beton: 'Sur longrine béton', platines: 'Sur platines', angle: "Avec retour d'angle" };
  const PATTERN = { regulier: 'Régulier', graphique: 'Graphique', vegetal: 'Végétal', aleatoire: 'Aléatoire' };

  const fence       = root.querySelector('#ufFence');
  const heightInput = root.querySelector('#ufHeight');
  const lengthInput = root.querySelector('#ufLength');
  const occInput    = root.querySelector('#ufOcc');
  const swatches    = root.querySelector('#ufSwatches');

  const state = {
    height: +root.dataset.height || 1600,
    length: +root.dataset.length || 8,
    implantation: root.dataset.implantation || 'muret',
    pattern: root.dataset.pattern || 'regulier',
    occultation: +root.dataset.occultation || 60,
    color: root.dataset.color || 'anthracite'
  };

  const set = (sel, txt) => { const el = root.querySelector(sel); if (el) el.textContent = txt; };
  const fmtMm = (v) => v.toLocaleString('fr-FR') + ' mm';
  const colorById = (id) => COLORS.find(c => c.id === id) || COLORS[1];
  const luminance = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  };
  const occLabel = (v) => {
    if (v >= 70) return v + ' % — privacy renforcée';
    if (v >= 45) return v + ' % — bon équilibre';
    return v + ' % — rendu plus ajouré';
  };
  const rangeFill = (input) => {
    if (!input) return;
    const pct = (input.value - input.min) / (input.max - input.min) * 100;
    input.style.setProperty('--uf-fill', pct + '%');
  };

  // Génère les pastilles couleur
  COLORS.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'uf-cfg-swatch';
    btn.style.setProperty('--sw', c.hex);
    btn.dataset.value = c.id;
    btn.title = c.name;
    btn.setAttribute('aria-label', 'Couleur ' + c.name);
    btn.setAttribute('aria-pressed', String(c.id === state.color));
    swatches && swatches.appendChild(btn);
  });

  // (Re)construit poteaux + panneaux selon la longueur
  function buildFence() {
    if (!fence) return;
    const panels = Math.max(1, Math.min(6, Math.round(state.length / 2)));
    let html = '<span class="uf-cfg-post"></span>';
    for (let i = 0; i < panels; i++) html += '<div class="uf-cfg-panel"></div><span class="uf-cfg-post"></span>';
    fence.innerHTML = html;
  }

  // Applique l'état à l'aperçu (variables CSS) + au résumé
  function render() {
    root.dataset.implantation = state.implantation;
    root.dataset.pattern = state.pattern;

    // Hauteur visuelle : 1000→1800 mm => 96→168 px
    const h = 96 + (state.height - 1000) / 800 * 72;
    root.style.setProperty('--uf-panel-h', h.toFixed(0) + 'px');

    const col = colorById(state.color);
    root.style.setProperty('--uf-panel-color', col.hex);

    // Occultation : plus la valeur monte, plus les trous rétrécissent et se referment
    const t = (state.occultation - 10) / 80;            // 0 ajouré → 1 occultant
    const size = (3.4 - t * 2.5).toFixed(2);            // 3.4 → 0.9 px
    const gap  = (12 - t * 4).toFixed(2);               // 12 → 8 px
    const alpha = (0.95 - t * 0.5).toFixed(2);          // 0.95 → 0.45
    const hole = luminance(col.hex) > 0.6
      ? 'rgba(28,31,33,' + (alpha * 0.7).toFixed(2) + ')'   // trous sombres sur tôle claire
      : 'rgba(245,242,236,' + alpha + ')';                 // trous clairs sur tôle foncée
    root.style.setProperty('--uf-perf-size', size + 'px');
    root.style.setProperty('--uf-perf-gap', gap + 'px');
    root.style.setProperty('--uf-hole', hole);

    set('#ufHeightOut', fmtMm(state.height));
    set('#ufLengthOut', state.length + ' m');
    set('#ufOccOut', occLabel(state.occultation));
    set('#ufColorOut', col.name);
    set('#ufSumHeight', fmtMm(state.height));
    set('#ufSumLength', state.length + ' m');
    set('#ufSumImpl', IMPL[state.implantation] || '—');
    set('#ufSumPattern', PATTERN[state.pattern] || '—');
    set('#ufSumOcc', occLabel(state.occultation));
    set('#ufSumColor', col.name);
  }

  if (heightInput) heightInput.addEventListener('input', () => { state.height = +heightInput.value; rangeFill(heightInput); render(); });
  if (lengthInput) lengthInput.addEventListener('input', () => { state.length = +lengthInput.value; rangeFill(lengthInput); buildFence(); render(); });
  if (occInput)    occInput.addEventListener('input', () => { state.occultation = +occInput.value; rangeFill(occInput); render(); });

  // Boutons segmentés (implantation + motif)
  root.querySelectorAll('.uf-cfg-segment').forEach(group => {
    const key = group.dataset.control;
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.uf-cfg-seg-btn');
      if (!btn || !key) return;
      group.querySelectorAll('.uf-cfg-seg-btn').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      state[key] = btn.dataset.value;
      render();
    });
  });

  // Pastilles couleur
  if (swatches) swatches.addEventListener('click', (e) => {
    const btn = e.target.closest('.uf-cfg-swatch');
    if (!btn) return;
    swatches.querySelectorAll('.uf-cfg-swatch').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    state.color = btn.dataset.value;
    render();
  });

  rangeFill(heightInput);
  rangeFill(lengthInput);
  rangeFill(occInput);
  buildFence();
  render();
}

if (document.readyState !== 'loading') initUfConfigurator();
else document.addEventListener('DOMContentLoaded', initUfConfigurator);
