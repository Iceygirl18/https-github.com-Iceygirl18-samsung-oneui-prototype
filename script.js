/* ═══════════════════════════════════════════
   Samsung One UI Redesign — Prototype JS
   Dahlia James · Pratt M.S. IXD 2025
   
   FIXED:
   ✓ All screens scroll
   ✓ Live search filters as you type
   ✓ A-Z rail jumps to CORRECT letter section
   ✓ Edit Pinned — tap any app to pin/unpin
   ✓ Edit QS — tap – removes, tap + adds, Reset works
   ✓ Sliders draggable
   ✓ Emergency slide-to-call
   ✓ All toggles clickable
═══════════════════════════════════════════ */

/* ─── DATA ─── */
const ALL_APPS = [
  {n:'Adobe Acrobat',   l:'A', c:'#e53e3e'},
  {n:'Adobe Express',   l:'A', c:'#ed8936'},
  {n:'Adobe Photoshop', l:'A', c:'#3182ce'},
  {n:'Airtel',          l:'A', c:'#e53e3e'},
  {n:'Amazon Shopping', l:'A', c:'#f59e0b'},
  {n:'Apple Podcasts',  l:'A', c:'#a855f7'},
  {n:'AR Zone',         l:'A', c:'#0891b2'},
  {n:'Authenticator',   l:'A', c:'#0284c7'},
  {n:'Bixby',           l:'B', c:'#6b46c1'},
  {n:'Bixby Vision',    l:'B', c:'#4a5568'},
  {n:'Bolt',            l:'B', c:'#38a169'},
  {n:'Calculator',      l:'C', c:'#38a169'},
  {n:'Calendar',        l:'C', c:'#e53e3e'},
  {n:'Camera',          l:'C', c:'#718096'},
  {n:'Chrome',          l:'C', c:'#4285f4'},
  {n:'Clock',           l:'C', c:'#2563eb'},
  {n:'Contacts',        l:'C', c:'#0284c7'},
  {n:'Drive',           l:'D', c:'#f59e0b'},
  {n:'Dropbox',         l:'D', c:'#3b82f6'},
  {n:'Email',           l:'E', c:'#7c5cfc'},
  {n:'Facebook',        l:'F', c:'#1877f2'},
  {n:'Files',           l:'F', c:'#64748b'},
  {n:'Flashlight',      l:'F', c:'#fbbf24'},
  {n:'Gallery',         l:'G', c:'#ec4899'},
  {n:'Gmail',           l:'G', c:'#ea4335'},
  {n:'Google',          l:'G', c:'#4285f4'},
  {n:'Google Maps',     l:'G', c:'#4285f4'},
  {n:'Health',          l:'H', c:'#ef4444'},
  {n:'Instagram',       l:'I', c:'#e1306c'},
  {n:'Internet',        l:'I', c:'#3b82f6'},
  {n:'LinkedIn',        l:'L', c:'#0077b5'},
  {n:'Messages',        l:'M', c:'#7c5cfc'},
  {n:'Microsoft Teams', l:'M', c:'#6264a7'},
  {n:'Miro',            l:'M', c:'#f59e0b'},
  {n:'Netflix',         l:'N', c:'#e50914'},
  {n:'Notes',           l:'N', c:'#f59e0b'},
  {n:'Phone',           l:'P', c:'#34d399'},
  {n:'Photos',          l:'P', c:'#f97316'},
  {n:'Reddit',          l:'R', c:'#ff4500'},
  {n:'Reminders',       l:'R', c:'#ef4444'},
  {n:'Samsung Health',  l:'S', c:'#34d399'},
  {n:'Samsung Internet',l:'S', c:'#1d4ed8'},
  {n:'Samsung Notes',   l:'S', c:'#f59e0b'},
  {n:'Samsung Pay',     l:'S', c:'#0ea5e9'},
  {n:'Settings',        l:'S', c:'#6b7280'},
  {n:'Slack',           l:'S', c:'#4a154b'},
  {n:'Snapchat',        l:'S', c:'#d4ac00'},
  {n:'Spotify',         l:'S', c:'#1db954'},
  {n:'TikTok',          l:'T', c:'#333'},
  {n:'Twitter/X',       l:'T', c:'#1da1f2'},
  {n:'Uber',            l:'U', c:'#333'},
  {n:'WhatsApp',        l:'W', c:'#25d366'},
  {n:'YouTube',         l:'Y', c:'#ff0000'},
  {n:'Zoom',            l:'Z', c:'#2d8cff'},
];

const SEARCH_DATA = [
  {type:'apps',     n:'Spotify',          sub:'App',                  c:'#1db954', i:'🎵'},
  {type:'apps',     n:'Gmail',            sub:'App',                  c:'#ea4335', i:'G'},
  {type:'apps',     n:'Samsung Internet', sub:'App',                  c:'#1d4ed8', i:'S'},
  {type:'apps',     n:'WhatsApp',         sub:'App',                  c:'#25d366', i:'💬'},
  {type:'apps',     n:'Camera',           sub:'App',                  c:'#718096', i:'📷'},
  {type:'apps',     n:'Snapchat',         sub:'App',                  c:'#d4ac00', i:'👻'},
  {type:'apps',     n:'Slack',            sub:'App',                  c:'#4a154b', i:'S'},
  {type:'apps',     n:'Settings',         sub:'System App',           c:'#6b7280', i:'⚙'},
  {type:'apps',     n:'YouTube',          sub:'App',                  c:'#ff0000', i:'▶'},
  {type:'apps',     n:'Instagram',        sub:'App',                  c:'#e1306c', i:'📸'},
  {type:'settings', n:'Wi-Fi',            sub:'Connectivity',         c:'#34d399', i:'📶'},
  {type:'settings', n:'Bluetooth',        sub:'Connectivity',         c:'#3b82f6', i:'⎋'},
  {type:'settings', n:'Display',          sub:'Settings › Display',   c:'#f59e0b', i:'☀'},
  {type:'settings', n:'Sound & Vibration',sub:'Settings',             c:'#7c5cfc', i:'🔊'},
  {type:'settings', n:'Battery',          sub:'Settings › Device',    c:'#34d399', i:'🔋'},
  {type:'settings', n:'Privacy',          sub:'Settings',             c:'#ef4444', i:'🔒'},
  {type:'settings', n:'Location',         sub:'Settings › Privacy',   c:'#f59e0b', i:'📍'},
  {type:'contacts', n:'Mom',              sub:'Mobile · +1 555-123-4567', c:'#e53e3e', i:'M'},
  {type:'contacts', n:'Dad',              sub:'Mobile · +1 555-987-6543', c:'#3182ce', i:'D'},
  {type:'contacts', n:'Alex',             sub:'Mobile · +1 555-456-7890', c:'#7c5cfc', i:'A'},
  {type:'contacts', n:'Sarah Johnson',    sub:'Work · +1 555-234-5678',   c:'#ec4899', i:'S'},
  {type:'files',    n:'Portfolio_v3.pdf', sub:'Downloads · 4.2 MB',   c:'#ef4444', i:'📄'},
  {type:'files',    n:'Resume_2025.docx', sub:'Documents · 890 KB',   c:'#3b82f6', i:'📝'},
  {type:'files',    n:'Screenshot.png',   sub:'Screenshots · 1.1 MB', c:'#8b5cf6', i:'🖼'},
];

const DEFAULT_QS = [
  {i:'📶',n:'Wi-Fi'},{i:'⎋',n:'Bluetooth'},{i:'🔊',n:'Sound'},
  {i:'🔄',n:'Auto rotate'},{i:'✈',n:'Airplane'},{i:'🔦',n:'Flashlight'},
  {i:'↕',n:'Mobile data'},{i:'🔋',n:'Power saving'},
];
const DEFAULT_AVAIL = [
  {i:'🎤',n:'Microphone'},{i:'N',n:'NFC'},{i:'🔁',n:'Sync'},
  {i:'📸',n:'Screenshot'},{i:'☀',n:'Extra dim'},{i:'📡',n:'Smart View'},
  {i:'🔗',n:'Nearby Share'},{i:'🎵',n:'Dolby Atmos'},
];

const SCREEN_INFO = {
  home:          {lbl:'Home Screen',        sub:'Scroll down · Tap search · App Library',
    title:'Home Screen', desc:'Scroll to see notifications. Tap any app, the search bar, or Emergency.',
    links:[['Search','search'],['App Library','app_library'],['Quick Settings','qs_expanded'],['Emergency','emergency']]},
  search:        {lbl:'Search',             sub:'Type to filter results live',
    title:'Predictive Search', desc:'Type anything — results filter live. Use tabs to filter by type.',
    links:[['App Library','app_library'],['← Back','__back']]},
  app_library:   {lbl:'App Library',        sub:'Tap A–Z rail · Scroll · Edit pins',
    title:'App Library', desc:'Tap any letter on the right rail to jump to that section instantly.',
    links:[['Edit Pinned','edit_pinned'],['Search','search'],['← Back','__back']]},
  edit_pinned:   {lbl:'Edit Pinned Apps',   sub:'Tap + to pin · Tap – to remove',
    title:'Edit Pinned Apps', desc:'Tap any app in the list to toggle pinned. Tap – on pinned to remove.',
    links:[['Done → App Library','app_library'],['← Back','__back']]},
  quick_settings:{lbl:'Quick Settings',     sub:'Tap toggles · Drag emergency bar',
    title:'Quick Settings', desc:'Tap any toggle to turn on/off. Drag the emergency bar right to navigate.',
    links:[['QS Expanded','qs_expanded'],['Emergency','emergency'],['← Back','__back']]},
  qs_expanded:   {lbl:'QS Expanded',        sub:'Drag sliders · Tap toggles · Edit',
    title:'QS Expanded', desc:'Drag brightness and volume sliders. Tap any tile to toggle on/off.',
    links:[['Edit QS','edit_qs'],['← Back','__back']]},
  edit_qs:       {lbl:'Edit Quick Settings',sub:'Tap – remove · Tap + add · Reset',
    title:'Edit Quick Settings', desc:'Tap – on active tiles to move them to available. Tap + to add back. Reset restores all defaults.',
    links:[['Done → QS Expanded','qs_expanded'],['← Back','__back']]},
  emergency:     {lbl:'Emergency',          sub:'Drag thumb → to call · Tap tools',
    title:'Emergency Screen', desc:'Drag the red circle all the way right to call. Toggle location. Tap any tool.',
    links:[['← Back','__back']]},
};

/* ─── STATE ─── */
let current       = 'home';
let navHistory    = [];
let transitioning = false;
let pinnedApps    = ['WhatsApp','Gmail','Chrome','LinkedIn','Camera'];
let activeQS      = [...DEFAULT_QS];
let availQS       = [...DEFAULT_AVAIL];
let currentFilter = 'all';

/* ─── NAVIGATION ─── */
function goTo(id) {
  if (transitioning || id === current) return;
  if (id === '__back') { goBack(); return; }
  transitioning = true;

  const prev = document.getElementById('s-' + current);
  const next = document.getElementById('s-' + id);

  prev.style.cssText = 'transition:opacity .24s ease,transform .24s ease;opacity:0;transform:translateX(-16px)';
  next.style.cssText = 'transition:opacity .24s ease,transform .24s ease;opacity:0;transform:translateX(18px)';
  next.classList.add('active');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    next.style.opacity   = '1';
    next.style.transform = 'translateX(0)';
  }));

  setTimeout(() => {
    prev.classList.remove('active');
    prev.style.cssText = '';
    next.style.cssText = '';
    navHistory.push(current);
    current = id;
    onEnter(id);
    updateUI();
    transitioning = false;
  }, 260);
}

function goBack() {
  if (!navHistory.length) return;
  const prev = navHistory.pop();
  const cEl = document.getElementById('s-' + current);
  const pEl = document.getElementById('s-' + prev);
  transitioning = true;

  cEl.style.cssText = 'transition:opacity .24s ease,transform .24s ease;opacity:0;transform:translateX(18px)';
  pEl.style.cssText = 'transition:opacity .24s ease,transform .24s ease;opacity:0;transform:translateX(-16px)';
  pEl.classList.add('active');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    pEl.style.opacity   = '1';
    pEl.style.transform = 'translateX(0)';
  }));

  setTimeout(() => {
    cEl.classList.remove('active');
    cEl.style.cssText = '';
    pEl.style.cssText = '';
    current = prev;
    updateUI();
    transitioning = false;
  }, 260);
}

function onEnter(id) {
  if (id === 'search')       initSearch();
  if (id === 'app_library')  buildAppLibrary();
  if (id === 'edit_pinned')  buildEditPinned();
  if (id === 'edit_qs')      buildEditQS();
}

/* ─── UI UPDATE ─── */
function updateUI() {
  const info = SCREEN_INFO[current];
  if (!info) return;
  document.getElementById('scr-lbl').textContent  = info.lbl;
  document.getElementById('scr-sub').textContent  = info.sub;
  document.getElementById('ib-title').textContent = info.title;
  document.getElementById('ib-desc').textContent  = info.desc;

  const linksEl = document.getElementById('ib-links');
  linksEl.innerHTML = '';
  info.links.forEach(([lbl, to]) => {
    const d = document.createElement('div');
    d.className = 'il-item';
    d.innerHTML = `<div class="il-dot"></div><span>${lbl}</span><span class="il-arr">→</span>`;
    d.onclick = () => to === '__back' ? goBack() : goTo(to);
    linksEl.appendChild(d);
  });

  const order = ['home','search','app_library','edit_pinned','quick_settings','qs_expanded','edit_qs','emergency'];
  document.querySelectorAll('.flow-item').forEach((el, i) => {
    el.classList.toggle('active', order[i] === current);
  });
}

/* ─── SEARCH ─── */
function initSearch() {
  const inp = document.getElementById('live-input');
  if (inp) { inp.value = ''; setTimeout(() => inp.focus(), 300); }
  document.getElementById('clr-btn').style.display = 'none';
  renderSearch('', 'all');
  document.querySelectorAll('.ftab').forEach(t => {
    t.classList.toggle('on', t.dataset.f === 'all');
  });
  currentFilter = 'all';
}

function liveSearch(val) {
  document.getElementById('clr-btn').style.display = val ? 'inline' : 'none';
  renderSearch(val, currentFilter);
}

function clearSearch() {
  const inp = document.getElementById('live-input');
  inp.value = '';
  inp.focus();
  liveSearch('');
}

function setFilter(el) {
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  currentFilter = el.dataset.f;
  const val = document.getElementById('live-input')?.value || '';
  renderSearch(val, currentFilter);
}

function renderSearch(query, filter) {
  const body = document.getElementById('search-results');
  if (!body) return;
  const q = query.toLowerCase().trim();

  let data = SEARCH_DATA.filter(item => {
    const fok = filter === 'all' || item.type === filter;
    const qok = !q || item.n.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q);
    return fok && qok;
  });

  if (!data.length) {
    body.innerHTML = `<div class="empty-msg">No results${q ? ` for "${query}"` : ''}</div>`;
    return;
  }

  const groups = {};
  data.forEach(r => { if (!groups[r.type]) groups[r.type] = []; groups[r.type].push(r); });
  const labels = {apps:'Apps', settings:'Settings', contacts:'Contacts', files:'Files'};

  let html = '';
  if (filter === 'all') {
    html += `<div class="res-sec-lbl">Top Results</div><div class="res-list">`;
    data.slice(0, 3).forEach(r => { html += resHTML(r, q); });
    html += '</div>';
  }
  Object.entries(groups).forEach(([type, items]) => {
    if (filter !== 'all' || type !== 'apps') {
      html += `<div class="res-sec-lbl">${labels[type]}</div><div class="res-list">`;
      items.forEach(r => { html += resHTML(r, q); });
      html += '</div>';
    } else {
      html += `<div class="res-sec-lbl">Apps</div><div class="res-list">`;
      items.forEach(r => { html += resHTML(r, q); });
      html += '</div>';
    }
  });
  body.innerHTML = html;
}

function resHTML(r, q) {
  let name = r.n;
  if (q) {
    const idx = name.toLowerCase().indexOf(q);
    if (idx >= 0) {
      name = name.slice(0,idx)
        + `<span style="color:var(--p2);font-weight:700">${name.slice(idx,idx+q.length)}</span>`
        + name.slice(idx+q.length);
    }
  }
  return `<div class="res-item">
    <div class="res-ico" style="background:${r.c}">${r.i}</div>
    <div style="flex:1"><div class="res-name">${name}</div><div class="res-sub">${r.sub}</div></div>
    <span class="res-arr">↗</span>
  </div>`;
}

/* ─── APP LIBRARY ─── */
function buildAppLibrary() {
  buildPinDisplay();
  buildAlphaList();
  buildAZRail();
}

function buildPinDisplay() {
  const row = document.getElementById('pin-display');
  if (!row) return;
  row.innerHTML = pinnedApps.map(name => {
    const app = ALL_APPS.find(a => a.n === name) || {c:'#555'};
    return `<div class="papp clickable">
      <div class="aico" style="background:${app.c}">${name[0]}</div>
      <span>${name.split(' ')[0]}</span>
    </div>`;
  }).join('');
}

function buildAlphaList() {
  const list = document.getElementById('al-list');
  if (!list) return;

  /* Group by letter, keep insertion order */
  const groups = {};
  ALL_APPS.forEach(app => {
    if (!groups[app.l]) groups[app.l] = [];
    groups[app.l].push(app);
  });

  /* Build HTML — each section has a stable id="sec-X" */
  list.innerHTML = Object.entries(groups).map(([letter, apps]) => `
    <div class="alpha-sec" id="sec-${letter}">
      <div class="alpha-ltr">${letter}</div>
      ${apps.map(app => `
        <div class="al-item clickable" onclick="showToast('Opening ${app.n}')">
          <div class="al-ico" style="background:${app.c}">${app.n[0]}</div>
          <span>${app.n}</span>
        </div>`).join('')}
    </div>`).join('');
}

function buildAZRail() {
  const rail = document.getElementById('az-rail');
  if (!rail) return;
  /* Only include letters that actually have apps */
  const letters = [...new Set(ALL_APPS.map(a => a.l))].sort();
  rail.innerHTML = letters.map(l =>
    `<div class="az-ltr clickable" id="az-${l}" onclick="jumpTo('${l}')">${l}</div>`
  ).join('');
}

/* KEY FIX: jump uses offsetTop of the section RELATIVE to the scrollable al-list */
function jumpTo(letter) {
  /* highlight */
  document.querySelectorAll('.az-ltr').forEach(el => el.classList.remove('az-on'));
  const lEl = document.getElementById('az-' + letter);
  if (lEl) lEl.classList.add('az-on');

  /* find section */
  const section = document.getElementById('sec-' + letter);
  const list    = document.getElementById('al-list');
  if (!section || !list) return;

  /* offsetTop gives position relative to offsetParent.
     We want position relative to al-list scroll container. */
  let top = 0;
  let el  = section;
  while (el && el !== list) {
    top += el.offsetTop;
    el   = el.offsetParent;
  }

  list.scrollTo({ top: top - 2, behavior: 'smooth' });
  showToast(`Jumped to "${letter}"`);
}

/* ─── EDIT PINNED ─── */
function buildEditPinned() {
  renderEPRow();
  renderEPAll();
}

function renderEPRow() {
  const row = document.getElementById('ep-row');
  if (!row) return;
  if (!pinnedApps.length) {
    row.innerHTML = '<div style="font-size:.7rem;color:var(--t3);padding:.5rem">No pinned apps yet — tap + below to add</div>';
    return;
  }
  row.innerHTML = pinnedApps.map(name => {
    const app = ALL_APPS.find(a => a.n === name) || {c:'#555'};
    return `<div class="ep-app" id="ep-${safeId(name)}">
      <div class="ep-minus" onclick="removePin('${name}',event)">–</div>
      <div class="aico" style="background:${app.c};width:36px;height:36px;font-size:.8rem">${name[0]}</div>
      <span>${name.split(' ')[0]}</span>
    </div>`;
  }).join('');
}

function renderEPAll() {
  const list = document.getElementById('ep-all');
  if (!list) return;
  list.innerHTML = ALL_APPS.map(app => {
    const isPinned = pinnedApps.includes(app.n);
    return `<div class="ep-all-item clickable" onclick="togglePin('${app.n}',this)">
      <div class="al-ico" style="background:${app.c}">${app.n[0]}</div>
      <span style="flex:1">${app.n}</span>
      <div class="ep-add ${isPinned?'pinned':''}" id="epadd-${safeId(app.n)}">${isPinned?'✓':'+'}</div>
    </div>`;
  }).join('');
}

function safeId(s) { return s.replace(/[^a-zA-Z0-9]/g,'_'); }

function togglePin(name, rowEl) {
  if (pinnedApps.includes(name)) {
    removePin(name);
  } else {
    addPin(name);
  }
}

function addPin(name) {
  if (pinnedApps.includes(name)) return;
  if (pinnedApps.length >= 8) { showToast('Max 8 pinned apps'); return; }
  pinnedApps.push(name);
  renderEPRow();
  /* update the + button */
  const btn = document.getElementById('epadd-' + safeId(name));
  if (btn) { btn.classList.add('pinned'); btn.textContent = '✓'; }
  showToast(`Pinned ${name.split(' ')[0]} ✓`);
}

function removePin(name, e) {
  if (e) e.stopPropagation();
  pinnedApps = pinnedApps.filter(p => p !== name);
  renderEPRow();
  const btn = document.getElementById('epadd-' + safeId(name));
  if (btn) { btn.classList.remove('pinned'); btn.textContent = '+'; }
  showToast(`Removed ${name.split(' ')[0]}`);
}

function savePinned() {
  buildPinDisplay();
  goTo('app_library');
  showToast('Pinned apps saved ✓');
}

/* ─── TOGGLES ─── */
function tapToggle(el) {
  el.classList.toggle('on');
  /* remove colour class if turning off */
  if (!el.classList.contains('on')) {
    el.classList.remove('g-on','y-on');
  }
  const name = (el.querySelector('.tn')?.textContent || '').split('\n')[0].trim();
  if (name) showToast(`${name} ${el.classList.contains('on') ? 'ON' : 'OFF'}`);
}

/* ─── EMERGENCY BAR (drag) ─── */
function initEmgBar() {
  const bar   = document.getElementById('emg-bar');
  const thumb = document.getElementById('emg-thumb');
  if (!bar || !thumb) return;

  let drag = false, sx = 0, cx = 0;
  const MAX = 190;

  function start(x) { drag = true; sx = x - cx; }
  function move(x) {
    if (!drag) return;
    cx = Math.max(0, Math.min(MAX, x - sx));
    thumb.style.transform = `translateX(${cx}px)`;
    if (cx > MAX * 0.8) bar.style.background = 'rgba(255,59,85,.28)';
    else bar.style.background = '';
  }
  function end() {
    if (!drag) return;
    drag = false;
    if (cx > MAX * 0.72) {
      thumb.style.transform = '';
      bar.style.background  = '';
      cx = 0;
      goTo('emergency');
    } else {
      thumb.style.transition = 'transform .22s ease';
      thumb.style.transform  = '';
      bar.style.background   = '';
      cx = 0;
      setTimeout(() => { thumb.style.transition = ''; }, 240);
    }
  }

  bar.addEventListener('mousedown',  e => { e.preventDefault(); start(e.clientX); });
  bar.addEventListener('touchstart', e => start(e.touches[0].clientX), {passive:true});
  document.addEventListener('mousemove',  e => move(e.clientX));
  document.addEventListener('touchmove',  e => move(e.touches[0].clientX), {passive:true});
  document.addEventListener('mouseup',  end);
  document.addEventListener('touchend', end);
}

/* ─── SLIDERS ─── */
function initSlider(trackId, fillId, thumbId, pct) {
  const track = document.getElementById(trackId);
  const fill  = document.getElementById(fillId);
  const thumb = document.getElementById(thumbId);
  if (!track || !fill || !thumb) return;

  function set(clientX) {
    const r = track.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    fill.style.width  = p + '%';
    thumb.style.left  = `calc(${p}% - 8px)`;
  }

  fill.style.width  = pct + '%';
  thumb.style.left  = `calc(${pct}% - 8px)`;

  let drag = false;
  track.addEventListener('mousedown',  e => { drag = true; set(e.clientX); });
  track.addEventListener('touchstart', e => { drag = true; set(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('mousemove',  e => { if (drag) set(e.clientX); });
  document.addEventListener('touchmove',  e => { if (drag) set(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('mouseup',  () => { drag = false; });
  document.addEventListener('touchend', () => { drag = false; });
}

/* ─── SLIDE TO CALL ─── */
function initSlideToCall() {
  const track = document.getElementById('slide-track');
  const thumb = document.getElementById('slide-thumb');
  const lbl   = document.getElementById('slide-lbl');
  const msg   = document.getElementById('calling-msg');
  if (!track || !thumb) return;

  let drag = false, sx = 0, cx = 0;

  function start(x) { drag = true; sx = x - cx; }
  function move(x) {
    if (!drag) return;
    const MAX = track.clientWidth - 46;
    cx = Math.max(0, Math.min(MAX, x - sx));
    thumb.style.left = cx + 'px';
    const pct = cx / MAX;
    if (lbl) lbl.style.opacity = String(1 - pct);
    track.style.borderColor = `rgba(255,${Math.round(59*(1-pct))},${Math.round(85*(1-pct))},${0.4+pct*.3})`;
  }
  function end() {
    if (!drag) return;
    drag = false;
    const MAX = track.clientWidth - 46;
    if (cx > MAX * 0.72) {
      thumb.style.display = 'none';
      if (lbl) lbl.style.display = 'none';
      if (msg) msg.style.display = 'block';
      track.style.borderColor = 'rgba(255,59,85,.8)';
      showToast('📞 Calling emergency services...');
      setTimeout(() => {
        thumb.style.display = '';
        if (lbl) { lbl.style.display = ''; lbl.style.opacity = '1'; }
        if (msg) msg.style.display = 'none';
        thumb.style.left = '3px';
        track.style.borderColor = '';
        cx = 0;
      }, 3000);
    } else {
      thumb.style.transition = 'left .22s ease';
      thumb.style.left = '3px';
      if (lbl) lbl.style.opacity = '1';
      track.style.borderColor = '';
      cx = 0;
      setTimeout(() => { thumb.style.transition = ''; }, 240);
    }
  }

  track.addEventListener('mousedown',  e => { e.preventDefault(); start(e.clientX); });
  track.addEventListener('touchstart', e => start(e.touches[0].clientX), {passive:true});
  document.addEventListener('mousemove',  e => move(e.clientX));
  document.addEventListener('touchmove',  e => move(e.touches[0].clientX), {passive:true});
  document.addEventListener('mouseup',  end);
  document.addEventListener('touchend', end);
}

/* ─── LOCATION TOGGLE ─── */
function flipSwitch(el) {
  el.classList.toggle('on');
  showToast('Location sharing ' + (el.classList.contains('on') ? 'ON ✓' : 'OFF'));
}

/* ─── EMERGENCY TOOLS ─── */
function activateTool(el) {
  el.classList.toggle('on');
  const name = el.querySelector('span:last-child')?.textContent || '';
  showToast(el.classList.contains('on') ? `${name} activated ✓` : `${name} deactivated`);
}

/* ─── EDIT QS ─── */
function buildEditQS() {
  renderActiveGrid();
  renderAvailGrid();
}

function renderActiveGrid() {
  const g = document.getElementById('active-grid');
  if (!g) return;
  if (!activeQS.length) {
    g.innerHTML = '<div style="grid-column:1/-1;text-align:center;font-size:.7rem;color:var(--t3);padding:.5rem">No active tiles — tap + below to add</div>';
    return;
  }
  g.innerHTML = activeQS.map((t, i) => `
    <div class="eqs-btn">
      <div class="eqs-minus" title="Remove ${t.n}" onclick="moveToAvail(${i},event)">–</div>
      <span class="ti">${t.i}</span>
      <span class="tn" style="font-size:.54rem;text-align:center">${t.n}</span>
    </div>`).join('');
}

function renderAvailGrid() {
  const g = document.getElementById('avail-grid');
  if (!g) return;
  if (!availQS.length) {
    g.innerHTML = '<div style="grid-column:1/-1;text-align:center;font-size:.7rem;color:var(--t3);padding:.5rem">All tiles are active</div>';
    return;
  }
  g.innerHTML = availQS.map((t, i) => `
    <div class="eqs-btn avail">
      <div class="eqs-plus" title="Add ${t.n}" onclick="moveToActive(${i},event)">+</div>
      <span class="ti">${t.i}</span>
      <span class="tn" style="font-size:.54rem;text-align:center">${t.n}</span>
    </div>`).join('');
}

function moveToAvail(i, e) {
  if (e) e.stopPropagation();
  const tile = activeQS.splice(i, 1)[0];
  availQS.push(tile);
  renderActiveGrid();
  renderAvailGrid();
  showToast(`${tile.n} removed from active`);
}

function moveToActive(i, e) {
  if (e) e.stopPropagation();
  const tile = availQS.splice(i, 1)[0];
  activeQS.push(tile);
  renderActiveGrid();
  renderAvailGrid();
  showToast(`${tile.n} added to active`);
}

function resetQS() {
  activeQS = [...DEFAULT_QS];
  availQS  = [...DEFAULT_AVAIL];
  renderActiveGrid();
  renderAvailGrid();
  showToast('Reset to defaults ✓');
}

/* ─── TOAST ─── */
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ─── KEYBOARD ─── */
const SCREEN_ORDER = ['home','search','app_library','edit_pinned','quick_settings','qs_expanded','edit_qs','emergency'];

document.addEventListener('keydown', e => {
  if (document.activeElement.tagName === 'INPUT') {
    if (e.key === 'Escape') { document.activeElement.blur(); goTo('home'); }
    return;
  }
  const i = SCREEN_ORDER.indexOf(current);
  if (e.key === 'ArrowRight' && i < SCREEN_ORDER.length-1) goTo(SCREEN_ORDER[i+1]);
  if (e.key === 'ArrowLeft') { navHistory.length ? goBack() : (i > 0 && goTo(SCREEN_ORDER[i-1])); }
  if (e.key === 'Escape') { navHistory = []; goTo('home'); }
});

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initSlider('b-track', 'b-fill', 'b-thumb', 65);
  initSlider('v-track', 'v-fill', 'v-thumb', 45);
  initEmgBar();
  initSlideToCall();
  updateUI();
  renderSearch('', 'all');
  buildAppLibrary();
  buildEditPinned();
  buildEditQS();

  console.log('%c Samsung One UI Prototype Ready ', 'background:#7c5cfc;color:#fff;padding:4px 10px;border-radius:4px;font-weight:bold;');
});
