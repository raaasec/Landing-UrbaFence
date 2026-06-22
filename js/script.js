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

  // Palette d'exemples (6 finitions, nom + valeur)
  const COLORS = [
    { id: 'anthracite', name: 'Anthracite',     hex: '#2F3436' },
    { id: 'noir',       name: 'Noir sablé',      hex: '#1F2324' },
    { id: 'quartz',     name: 'Gris quartz',     hex: '#6A6F6B' },
    { id: 'blanc',      name: 'Blanc cassé',     hex: '#E8E3D7' },
    { id: 'vert',       name: 'Vert Urbafence',  hex: '#35823F' },
    { id: 'bronze',     name: 'Bronze',          hex: '#8A6A43' }
  ];
  // Choix prédéfinis (label + valeur affichée) plutôt que des sliders
  const LENGTHS = {
    court:    { label: 'Court',    cote: '≈ 3 m',  w: 58 },
    standard: { label: 'Standard', cote: '≈ 6 m',  w: 78 },
    long:     { label: 'Long',     cote: '≈ 10 m', w: 100 }
  };
  const HEIGHTS = {
    bas:      { label: 'Bas',      mm: 1000, h: 100 },
    standard: { label: 'Standard', mm: 1500, h: 138 },
    haut:     { label: 'Haut',     mm: 1800, h: 168 }
  };
  const IMPL = { muret: 'Sur muret', beton: 'Sur longrine béton', platines: 'Sur platines' };
  // 3 motifs = 3 niveaux d'occultation réels (le niveau dépend du dessin, pas d'un slider)
  const PATTERNS = {
    privacy:  { name: 'Privacy',  level: 'Très occultant' },
    balanced: { name: 'Équilibre', level: 'Intermédiaire' },
    open:     { name: 'Ajouré',   level: 'Plus ouvert' }
  };

  const fence    = root.querySelector('#ufFence');
  const swatches = root.querySelector('#ufSwatches');
  const angleBtn = root.querySelector('#ufAngle');

  const state = {
    length:       root.dataset.length || 'standard',
    height:       root.dataset.height || 'standard',
    implantation: root.dataset.implantation || 'muret',
    pattern:      root.dataset.pattern || 'privacy',
    color:        root.dataset.color || 'anthracite',
    angle:        root.dataset.angle === 'true'
  };

  const set = (sel, txt) => { const el = root.querySelector(sel); if (el) el.textContent = txt; };
  const colorById = (id) => COLORS.find(c => c.id === id) || COLORS[0];
  const luminance = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  };

  // Génère les pastilles couleur
  if (swatches) COLORS.forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'uf-cfg-swatch';
    btn.style.setProperty('--sw', c.hex);
    btn.dataset.value = c.id;
    btn.title = c.name;
    btn.setAttribute('aria-label', 'Couleur ' + c.name);
    btn.setAttribute('aria-pressed', String(c.id === state.color));
    swatches.appendChild(btn);
  });

  // Aperçu à largeur STABLE : toujours 3 panneaux lisibles (la longueur passe par la cote)
  function buildFence() {
    if (!fence) return;
    const PANELS = 3;
    let html = '<span class="uf-cfg-post"></span>';
    for (let i = 0; i < PANELS; i++) html += '<div class="uf-cfg-panel"></div><span class="uf-cfg-post"></span>';
    fence.innerHTML = html;
  }

  // Applique l'état à l'aperçu (variables CSS) + au résumé court
  function render() {
    const len = LENGTHS[state.length] || LENGTHS.standard;
    const hgt = HEIGHTS[state.height] || HEIGHTS.standard;
    const col = colorById(state.color);
    const pat = PATTERNS[state.pattern] || PATTERNS.privacy;

    root.dataset.implantation = state.implantation;
    root.dataset.pattern = state.pattern;
    root.dataset.angle = String(state.angle);

    // Hauteur visuelle (panneaux jamais minuscules) + longueur via la cote
    root.style.setProperty('--uf-panel-h', hgt.h + 'px');
    root.style.setProperty('--uf-len-w', len.w + '%');

    root.style.setProperty('--uf-panel-color', col.hex);
    // Trous lisibles selon la teinte (simple contraste, aucune opacité réglable)
    root.style.setProperty('--uf-hole',
      luminance(col.hex) > 0.6 ? 'rgba(28,31,33,0.55)' : 'rgba(245,242,236,0.82)');

    // Couleur affichée + cote
    set('#ufColorOut', col.name);
    set('#ufCoteVal', len.cote);

    // Résumé compact en chips
    set('#ufChipLen', len.label);
    set('#ufChipImpl', (IMPL[state.implantation] || 'Sur muret') + (state.angle ? ' + angle' : ''));
    set('#ufChipPattern', pat.name);
    set('#ufChipColor', col.name);
  }

  // Boutons segmentés (longueur, hauteur, pose)
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

  // Retour d'angle (option secondaire)
  if (angleBtn) angleBtn.addEventListener('click', () => {
    state.angle = !state.angle;
    angleBtn.setAttribute('aria-pressed', String(state.angle));
    render();
  });

  // Motifs (cartes) — chaque motif change réellement le dessin de perforation
  const motifGroup = root.querySelector('.uf-cfg-motifs');
  if (motifGroup) motifGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.uf-cfg-motif');
    if (!btn) return;
    motifGroup.querySelectorAll('.uf-cfg-motif').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    state.pattern = btn.dataset.value;
    render();
  });

  // Pastilles couleur
  if (swatches) swatches.addEventListener('click', (e) => {
    const btn = e.target.closest('.uf-cfg-swatch');
    if (!btn) return;
    swatches.querySelectorAll('.uf-cfg-swatch').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    state.color = btn.dataset.value;
    render();
  });

  buildFence();
  render();
}

if (document.readyState !== 'loading') initUfConfigurator();
else document.addEventListener('DOMContentLoaded', initUfConfigurator);
