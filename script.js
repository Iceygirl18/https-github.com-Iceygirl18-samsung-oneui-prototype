// ═══════════════════════════════════════════
//  Samsung One UI Redesign — Prototype Logic
//  Dahlia James · Pratt M.S. IXD 2025
// ═══════════════════════════════════════════

// ── Screen metadata ──
const SCREENS = {
  home: {
    index: 0,
    label: 'Home Screen',
    sub: 'Tap search · App Library · Emergency',
    title: 'Home Screen',
    desc: 'Centralized hub — universal search, frequent apps, core actions grid, and emergency access.',
    links: [
      { label: 'Search bar', to: 'search' },
      { label: 'App Library', to: 'app_library' },
      { label: 'Quick Settings', to: 'quick_settings' },
      { label: 'Emergency', to: 'emergency' },
    ]
  },
  search: {
    index: 1,
    label: 'Predictive Search',
    sub: 'Category filters · AI-ranked results',
    title: 'Predictive Search',
    desc: 'AI-ranked top results across All, Apps, Settings, Contacts & Files. Voice search in one tap.',
    links: [
      { label: 'Search field → detail', to: 'search_detail' },
      { label: '← Back', to: '__back' },
    ]
  },
  search_detail: {
    index: 2,
    label: 'Search Detail',
    sub: 'Recent searches · Keyboard · Action',
    title: 'Search Detail View',
    desc: 'Recent searches visible above keyboard. Category tabs persist. Purple button for instant search.',
    links: [
      { label: '← Back', to: '__back' },
    ]
  },
  app_library: {
    index: 3,
    label: 'App Library',
    sub: 'Pinned section · A–Z rail · Zero ads',
    title: 'App Library',
    desc: 'Pinned apps at top. A–Z index rail for instant letter-jump. Alphabetical list. No ads.',
    links: [
      { label: 'Edit pinned apps', to: 'edit_pinned' },
      { label: 'Search', to: 'search' },
      { label: '← Back', to: '__back' },
    ]
  },
  edit_pinned: {
    index: 4,
    label: 'Edit Pinned Apps',
    sub: 'Red – remove · Purple + add · Done saves',
    title: 'Edit Pinned Apps',
    desc: 'Red minus removes an app from pinned. Purple plus adds from all apps. Done saves immediately.',
    links: [
      { label: 'Done → App Library', to: 'app_library' },
      { label: '← Back', to: '__back' },
    ]
  },
  quick_settings: {
    index: 5,
    label: 'Quick Settings',
    sub: '4 categories · Labeled toggles · Edit',
    title: 'Quick Settings Panel',
    desc: 'Connectivity, Device Control, Tools, System. Labeled toggles. Brightness slider. Edit always visible.',
    links: [
      { label: 'Edit → QS Expanded', to: 'qs_expanded' },
      { label: 'Slide for Emergency', to: 'emergency' },
      { label: '← Back', to: '__back' },
    ]
  },
  qs_expanded: {
    index: 6,
    label: 'QS Expanded',
    sub: 'Full toggle panel · Brightness · Edit',
    title: 'Quick Settings — Expanded',
    desc: 'Full settings panel with brightness, sound slider, suggested tiles, and Edit button.',
    links: [
      { label: 'Edit tiles', to: 'edit_qs' },
      { label: '← Back', to: '__back' },
    ]
  },
  edit_qs: {
    index: 7,
    label: 'Edit Quick Settings',
    sub: 'Drag to reorder · – remove · + add',
    title: 'Edit Quick Settings',
    desc: 'Drag to reorder. Red minus removes active tiles. Green plus adds from available. Reset or Done.',
    links: [
      { label: 'Done', to: 'qs_expanded' },
      { label: 'Reset', to: 'quick_settings' },
      { label: '← Back', to: '__back' },
    ]
  },
  emergency: {
    index: 8,
    label: 'Emergency',
    sub: 'Slide to call · Contacts · Tools',
    title: 'Emergency Screen',
    desc: 'Slide-to-call prevents accidental 911. Contacts, Medical Info, and Emergency Tools on one screen.',
    links: [
      { label: '← Back / Cancel', to: '__back' },
    ]
  },
};

// ── State ──
let current = 'home';
let history = [];
let transitioning = false;

// ── Navigate to screen ──
function goTo(screenId) {
  if (transitioning || screenId === current) return;
  if (screenId === '__back') { goBack(); return; }
  if (!SCREENS[screenId]) return;

  transitioning = true;
  const prevEl = document.getElementById('s-' + current);
  const nextEl = document.getElementById('s-' + screenId);

  // Animate out current
  prevEl.style.opacity = '0';
  prevEl.style.transform = 'translateX(-20px)';

  // Animate in next
  nextEl.style.opacity = '0';
  nextEl.style.transform = 'translateX(20px)';
  nextEl.classList.add('active');

  // Tiny delay so browser registers the starting state
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextEl.style.opacity = '1';
      nextEl.style.transform = 'translateX(0)';
    });
  });

  setTimeout(() => {
    prevEl.classList.remove('active');
    prevEl.style.opacity = '';
    prevEl.style.transform = '';
    history.push(current);
    current = screenId;
    updateUI();
    transitioning = false;
  }, 280);
}

// ── Go back ──
function goBack() {
  if (history.length === 0) return;
  const prev = history.pop();
  const currEl = document.getElementById('s-' + current);
  const prevEl = document.getElementById('s-' + prev);

  transitioning = true;

  currEl.style.opacity = '0';
  currEl.style.transform = 'translateX(20px)';

  prevEl.style.opacity = '0';
  prevEl.style.transform = 'translateX(-20px)';
  prevEl.classList.add('active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      prevEl.style.opacity = '1';
      prevEl.style.transform = 'translateX(0)';
    });
  });

  setTimeout(() => {
    currEl.classList.remove('active');
    currEl.style.opacity = '';
    currEl.style.transform = '';
    current = prev;
    updateUI();
    transitioning = false;
  }, 280);
}

// ── Update UI state ──
function updateUI() {
  const sc = SCREENS[current];

  // Screen label
  document.getElementById('screen-label').textContent = sc.label;
  document.getElementById('screen-sub').textContent = sc.sub;

  // Info panel
  document.getElementById('info-title').textContent = sc.title;
  document.getElementById('info-desc').textContent = sc.desc;

  // Nav hints
  const hintsEl = document.getElementById('nav-hints');
  hintsEl.innerHTML = '';
  sc.links.forEach(({ label, to }) => {
    const div = document.createElement('div');
    div.className = 'hint-item';
    div.innerHTML = `<div class="hint-dot"></div><span>${label}</span><span class="hint-arrow">→</span>`;
    div.onclick = () => to === '__back' ? goBack() : goTo(to);
    hintsEl.appendChild(div);
  });

  // Flow map
  document.querySelectorAll('.flow-item').forEach((el, i) => {
    el.classList.toggle('active', i === sc.index);
  });
}

// ── Wire up all .tap elements ──
function bindTaps() {
  document.querySelectorAll('.tap[data-to]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const to = el.getAttribute('data-to');
      to === '__back' ? goBack() : goTo(to);
    });
  });
}

// ── Keyboard shortcuts ──
document.addEventListener('keydown', (e) => {
  const keys = Object.keys(SCREENS);
  const idx = keys.indexOf(current);

  if (e.key === 'ArrowRight' && idx < keys.length - 1) {
    goTo(keys[idx + 1]);
  } else if (e.key === 'ArrowLeft') {
    if (history.length > 0) goBack();
    else if (idx > 0) goTo(keys[idx - 1]);
  } else if (e.key === 'Escape') {
    history = [];
    goTo('home');
  }
});

// ── A-Z rail interactivity ──
function bindAZRail() {
  document.querySelectorAll('.az-letter').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.az-letter').forEach(l => l.classList.remove('active-letter'));
      el.classList.add('active-letter');
    });
  });
}

// ── QS toggle interactivity ──
function bindToggles() {
  document.querySelectorAll('.qs-toggle, .exp-tog').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('active-toggle');
    });
  });
}

// ── Emergency slide gesture ──
function bindEmergencySlide() {
  const slideBtn = document.querySelector('.emg-slide-btn');
  if (!slideBtn) return;

  let startX = 0;
  let dragging = false;
  const circle = slideBtn.querySelector('.emg-circle');

  slideBtn.addEventListener('mousedown', (e) => { startX = e.clientX; dragging = true; });
  slideBtn.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; dragging = true; });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = Math.min(Math.max(0, e.clientX - startX), 160);
    if (circle) circle.style.transform = `translateX(${dx}px)`;
    if (dx > 130) {
      dragging = false;
      if (circle) circle.style.transform = '';
      // flash red then confirm
      slideBtn.style.background = 'rgba(255,59,85,0.4)';
      setTimeout(() => { slideBtn.style.background = ''; }, 600);
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const dx = Math.min(Math.max(0, e.touches[0].clientX - startX), 160);
    if (circle) circle.style.transform = `translateX(${dx}px)`;
    if (dx > 130) {
      dragging = false;
      if (circle) circle.style.transform = '';
      slideBtn.style.background = 'rgba(255,59,85,0.4)';
      setTimeout(() => { slideBtn.style.background = ''; }, 600);
    }
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    if (circle) circle.style.transform = '';
  });
  document.addEventListener('touchend', () => {
    dragging = false;
    if (circle) circle.style.transform = '';
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  bindTaps();
  bindAZRail();
  bindToggles();
  bindEmergencySlide();
  updateUI();

  // Add transition styles to all screens
  document.querySelectorAll('.screen').forEach(el => {
    el.style.transition = 'opacity .28s ease, transform .28s ease';
  });

  console.log('%c Samsung One UI Prototype Ready ', 'background:#7c5cfc;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;');
  console.log('→ Arrow keys to navigate | Esc to go home');
});
