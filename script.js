/* ═══════════════════════════════════════════
   Samsung One UI Redesign — Prototype Script
   Dahlia James · Pratt M.S. IXD 2025

   INTERACTIONS:
   ✓ Screen transitions (slide in/out)
   ✓ Live search with real-time filtering
   ✓ Filter tabs (All / Apps / Settings / Contacts / Files)
   ✓ App Library with full scrollable A-Z list
   ✓ A-Z rail — tap any letter, jumps to that section
   ✓ Edit Pinned — tap + to add, tap – to remove, Done saves
   ✓ Quick Settings toggles — tap to turn on/off
   ✓ Draggable brightness & volume sliders
   ✓ Emergency slide-to-call gesture
   ✓ Location toggle switch
   ✓ Emergency tool activation
   ✓ Edit QS — move tiles between active/available
   ✓ Toast notifications
   ✓ Keyboard arrow key navigation
   ✓ Info panel updates per screen
═══════════════════════════════════════════ */

/* ─────────────────────────────
   DATA
───────────────────────────── */
const ALL_APPS = [
  {name:'Adobe Acrobat',  letter:'A', color:'#e53e3e'},
  {name:'Adobe Express',  letter:'A', color:'#ed8936'},
  {name:'Adobe Photoshop',letter:'A', color:'#3182ce'},
  {name:'Airtel',         letter:'A', color:'#e53e3e'},
  {name:'Amazon Shopping',letter:'A', color:'#f59e0b'},
  {name:'Apple Podcasts', letter:'A', color:'#a855f7'},
  {name:'AR Zone',        letter:'A', color:'#0891b2'},
  {name:'Authenticator',  letter:'A', color:'#0284c7'},
  {name:'Bixby',          letter:'B', color:'#6b46c1'},
  {name:'Bixby Vision',   letter:'B', color:'#2d3748'},
  {name:'Bolt',           letter:'B', color:'#38a169'},
  {name:'Calculator',     letter:'C', color:'#38a169'},
  {name:'Calendar',       letter:'C', color:'#e53e3e'},
  {name:'Camera',         letter:'C', color:'#718096'},
  {name:'Chrome',         letter:'C', color:'#4285f4'},
  {name:'Clock',          letter:'C', color:'#2563eb'},
  {name:'Contacts',       letter:'C', color:'#0284c7'},
  {name:'Drive',          letter:'D', color:'#f59e0b'},
  {name:'Dropbox',        letter:'D', color:'#3b82f6'},
  {name:'Email',          letter:'E', color:'#7c5cfc'},
  {name:'Facebook',       letter:'F', color:'#1877f2'},
  {name:'Files',          letter:'F', color:'#64748b'},
  {name:'Flashlight',     letter:'F', color:'#fbbf24'},
  {name:'Gallery',        letter:'G', color:'#ec4899'},
  {name:'Gmail',          letter:'G', color:'#ea4335'},
  {name:'Google',         letter:'G', color:'#4285f4'},
  {name:'Google Maps',    letter:'G', color:'#4285f4'},
  {name:'Health',         letter:'H', color:'#ef4444'},
  {name:'Instagram',      letter:'I', color:'#e1306c'},
  {name:'Internet',       letter:'I', color:'#3b82f6'},
  {name:'LinkedIn',       letter:'L', color:'#0077b5'},
  {name:'Messages',       letter:'M', color:'#7c5cfc'},
  {name:'Microsoft Teams',letter:'M', color:'#6264a7'},
  {name:'Miro',           letter:'M', color:'#f59e0b'},
  {name:'Netflix',        letter:'N', color:'#e50914'},
  {name:'Notes',          letter:'N', color:'#f59e0b'},
  {name:'Phone',          letter:'P', color:'#34d399'},
  {name:'Photos',         letter:'P', color:'#f97316'},
  {name:'Reddit',         letter:'R', color:'#ff4500'},
  {name:'Reminders',      letter:'R', color:'#ef4444'},
  {name:'Samsung Health', letter:'S', color:'#34d399'},
  {name:'Samsung Internet',letter:'S',color:'#1d4ed8'},
  {name:'Samsung Notes',  letter:'S', color:'#f59e0b'},
  {name:'Samsung Pay',    letter:'S', color:'#0ea5e9'},
  {name:'Settings',       letter:'S', color:'#6b7280'},
  {name:'Slack',          letter:'S', color:'#4a154b'},
  {name:'Snapchat',       letter:'S', color:'#ffcc00'},
  {name:'Spotify',        letter:'S', color:'#1db954'},
  {name:'TikTok',         letter:'T', color:'#010101'},
  {name:'Twitter/X',      letter:'T', color:'#1da1f2'},
  {name:'Uber',           letter:'U', color:'#000000'},
  {name:'WhatsApp',       letter:'W', color:'#25d366'},
  {name:'YouTube',        letter:'Y', color:'#ff0000'},
  {name:'Zoom',           letter:'Z', color:'#2d8cff'},
];

const SEARCH_DATA = [
  {type:'apps',     name:'Spotify',         sub:'App',              color:'#1db954', icon:'🎵'},
  {type:'apps',     name:'Gmail',           sub:'App',              color:'#ea4335', icon:'G'},
  {type:'apps',     name:'Samsung Internet',sub:'App',              color:'#1d4ed8', icon:'S'},
  {type:'apps',     name:'WhatsApp',        sub:'App',              color:'#25d366', icon:'💬'},
  {type:'apps',     name:'Camera',          sub:'App',              color:'#718096', icon:'📷'},
  {type:'apps',     name:'Snapchat',        sub:'App',              color:'#ffcc00', icon:'👻'},
  {type:'apps',     name:'Slack',           sub:'App',              color:'#4a154b', icon:'S'},
  {type:'apps',     name:'Settings',        sub:'System App',       color:'#6b7280', icon:'⚙'},
  {type:'settings', name:'Wi-Fi',           sub:'Connectivity',     color:'#34d399', icon:'📶'},
  {type:'settings', name:'Bluetooth',       sub:'Connectivity',     color:'#3b82f6', icon:'⎋'},
  {type:'settings', name:'Display',         sub:'Settings › Display',color:'#f59e0b',icon:'☀'},
  {type:'settings', name:'Sound & Vibration',sub:'Settings',        color:'#7c5cfc', icon:'🔊'},
  {type:'settings', name:'Battery',         sub:'Settings › Device',color:'#34d399', icon:'🔋'},
  {type:'settings', name:'Privacy',         sub:'Settings',         color:'#ef4444', icon:'🔒'},
  {type:'settings', name:'Location',        sub:'Settings › Privacy',color:'#f59e0b',icon:'📍'},
  {type:'contacts', name:'Mom',             sub:'Mobile · +1 555-123-4567', color:'#e53e3e', icon:'M'},
  {type:'contacts', name:'Dad',             sub:'Mobile · +1 555-987-6543', color:'#3182ce', icon:'D'},
  {type:'contacts', name:'Alex',            sub:'Mobile · +1 555-456-7890', color:'#7c5cfc', icon:'A'},
  {type:'contacts', name:'Sarah Johnson',   sub:'Work · +1 555-234-5678',   color:'#ec4899', icon:'S'},
  {type:'files',    name:'Portfolio_v3.pdf',sub:'Downloads · 4.2 MB',       color:'#ef4444', icon:'📄'},
  {type:'files',    name:'Resume_2025.docx',sub:'Documents · 890 KB',       color:'#3b82f6', icon:'📝'},
  {type:'files',    name:'Screenshot_042.png',sub:'Screenshots · 1.1 MB',   color:'#8b5cf6', icon:'🖼'},
];

const QS_TILES = [
  {icon:'📶', name:'Wi-Fi'},
  {icon:'⎋',  name:'Bluetooth'},
  {icon:'🔊', name:'Sound'},
  {icon:'🔄', name:'Auto rotate'},
  {icon:'✈',  name:'Airplane'},
  {icon:'🔦', name:'Flashlight'},
  {icon:'↕',  name:'Mobile data'},
  {icon:'🔋', name:'Power saving'},
];
const AVAIL_TILES = [
  {icon:'🎤', name:'Microphone'},
  {icon:'N',  name:'NFC'},
  {icon:'🔁', name:'Sync'},
  {icon:'📸', name:'Screenshot'},
  {icon:'☀', name:'Extra dim'},
  {icon:'📡', name:'Smart View'},
  {icon:'🔗', name:'Nearby Share'},
  {icon:'🎵', name:'Dolby Atmos'},
];

/* screen info for right panel */
const SCREEN_INFO = {
  home:          {label:'Home Screen',        sub:'Tap search · App Library · Emergency',
                  title:'Home Screen',
                  desc:'Centralized hub — universal search, frequent apps, core actions, and emergency access.',
                  links:[['App Library','app_library'],['Quick Settings','qs_expanded'],['Emergency','emergency'],['Search','search']]},
  search:        {label:'Search',             sub:'Type to filter live results',
                  title:'Predictive Search',
                  desc:'Type anything — results filter live across apps, settings, contacts & files.',
                  links:[['App Library','app_library'],['← Back','__back']]},
  app_library:   {label:'App Library',        sub:'A–Z jump · Pinned · Edit',
                  title:'App Library',
                  desc:'Tap any letter on the A–Z rail to jump directly to that section. Tap Edit to manage pins.',
                  links:[['Edit Pinned','edit_pinned'],['Search','search'],['← Back','__back']]},
  edit_pinned:   {label:'Edit Pinned Apps',   sub:'Tap + to add · Tap – to remove',
                  title:'Edit Pinned Apps',
                  desc:'Tap + to add an app to your pinned section. Tap – to remove. Tap Done to save.',
                  links:[['Done → App Library','app_library'],['← Back','__back']]},
  quick_settings:{label:'Quick Settings',     sub:'Tap toggles · Slide emergency bar',
                  title:'Quick Settings',
                  desc:'Tap any toggle to turn it on/off. Slide the emergency bar to the right for emergency screen.',
                  links:[['QS Expanded','qs_expanded'],['Emergency','emergency'],['← Back','__back']]},
  qs_expanded:   {label:'QS Expanded',        sub:'Drag sliders · Tap toggles · Edit',
                  title:'QS Expanded',
                  desc:'Drag brightness & volume sliders. Tap any tile to toggle. Tap Edit to customise tiles.',
                  links:[['Edit QS','edit_qs'],['← Back','__back']]},
  edit_qs:       {label:'Edit Quick Settings',sub:'Tap – remove · Tap + add · Done',
                  title:'Edit Quick Settings',
                  desc:'Tap – on active tiles to remove them. Tap + on available tiles to add. Tap Done to save.',
                  links:[['Done → QS Expanded','qs_expanded'],['← Back','__back']]},
  emergency:     {label:'Emergency',          sub:'Drag thumb → to call · Tap tools',
                  title:'Emergency Screen',
                  desc:'Drag the red thumb all the way right to "call". Toggle location sharing. Tap any tool to activate.',
                  links:[['← Back / Cancel','__back']]},
};

/* ─────────────────────────────
   STATE
───────────────────────────── */
let current   = 'home';
let navHistory = [];
let transitioning = false;
let pinnedApps = ['WhatsApp','Gmail','Chrome','LinkedIn','Camera'];
let activeQS   = [...QS_TILES];
let availQS    = [...AVAIL_TILES];
let currentFilter = 'all';

/* ─────────────────────────────
   NAVIGATION
───────────────────────────── */
function goTo(id) {
  if (transitioning || id === current) return;
  if (id === '__back') { goBack(); return; }
  transitioning = true;

  const prev = document.getElementById('s-' + current);
  const next = document.getElementById('s-' + id);

  prev.style.transition = 'opacity .24s ease, transform .24s ease';
  next.style.transition = 'opacity .24s ease, transform .24s ease';

  prev.style.opacity    = '0';
  prev.style.transform  = 'translateX(-16px)';
  next.style.opacity    = '0';
  next.style.transform  = 'translateX(18px)';
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
    onScreenEnter(id);
    updateUI();
    transitioning = false;
  }, 260);
}

function goBack() {
  if (!navHistory.length) return;
  const prev = navHistory.pop();
  const currEl = document.getElementById('s-' + current);
  const prevEl = document.getElementById('s-' + prev);
  transitioning = true;

  currEl.style.transition = 'opacity .24s ease, transform .24s ease';
  prevEl.style.transition = 'opacity .24s ease, transform .24s ease';
  currEl.style.opacity    = '0';
  currEl.style.transform  = 'translateX(18px)';
  prevEl.style.opacity    = '0';
  prevEl.style.transform  = 'translateX(-16px)';
  prevEl.classList.add('active');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    prevEl.style.opacity   = '1';
    prevEl.style.transform = 'translateX(0)';
  }));

  setTimeout(() => {
    currEl.classList.remove('active');
    currEl.style.cssText = '';
    prevEl.style.cssText = '';
    current = prev;
    updateUI();
    transitioning = false;
  }, 260);
}

/* called when we arrive on a screen */
function onScreenEnter(id) {
  if (id === 'search')       { initSearch(); }
  if (id === 'app_library')  { buildAppLibrary(); }
  if (id === 'edit_pinned')  { buildEditPinned(); }
  if (id === 'edit_qs')      { buildEditQS(); }
}

/* ─────────────────────────────
   UI UPDATER (flow + info panel)
───────────────────────────── */
function updateUI() {
  const info = SCREEN_INFO[current];
  if (!info) return;

  document.getElementById('scr-lbl').textContent  = info.label;
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

  document.querySelectorAll('.flow-item').forEach((el, i) => {
    const screenIds = ['home','search','app_library','edit_pinned','quick_settings','qs_expanded','edit_qs','emergency'];
    el.classList.toggle('active', screenIds[i] === current);
  });
}

/* ─────────────────────────────
   SCREEN 2 — LIVE SEARCH
───────────────────────────── */
function initSearch() {
  const inp = document.getElementById('live-search');
  if (inp) { inp.value = ''; inp.focus(); }
  document.getElementById('clr').style.display = 'none';
  renderSearch('', 'all');
}

function liveSearch(val) {
  document.getElementById('clr').style.display = val ? 'inline' : 'none';
  renderSearch(val, currentFilter);
}

function clearSearch() {
  const inp = document.getElementById('live-search');
  inp.value = '';
  inp.focus();
  liveSearch('');
}

function setFilter(el) {
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  currentFilter = el.dataset.f;
  const val = document.getElementById('live-search')?.value || '';
  renderSearch(val, currentFilter);
}

function renderSearch(query, filter) {
  const body = document.getElementById('search-body');
  if (!body) return;
  const q = query.toLowerCase().trim();

  let results = SEARCH_DATA.filter(item => {
    const matchFilter = filter === 'all' || item.type === filter;
    const matchQuery  = !q || item.name.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q);
    return matchFilter && matchQuery;
  });

  if (!results.length) {
    body.innerHTML = `<div class="empty-state">No results for "${query}"</div>`;
    return;
  }

  /* group by type */
  const groups = {};
  results.forEach(r => {
    if (!groups[r.type]) groups[r.type] = [];
    groups[r.type].push(r);
  });

  const typeLabels = {apps:'Apps', settings:'Settings', contacts:'Contacts', files:'Files'};
  let html = '';

  /* Top results — first 3 if no filter */
  if (filter === 'all' && results.length > 0) {
    html += `<div class="res-section-lbl">Top Results</div><div class="res-list">`;
    results.slice(0, 3).forEach(r => {
      html += resultItemHTML(r, q);
    });
    html += `</div>`;
  }

  Object.entries(groups).forEach(([type, items]) => {
    if (filter !== 'all' || type !== 'apps') {
      html += `<div class="res-section-lbl">${typeLabels[type] || type}</div><div class="res-list">`;
      items.forEach(r => { html += resultItemHTML(r, q); });
      html += `</div>`;
    } else if (filter === 'all') {
      html += `<div class="res-section-lbl">Apps</div><div class="res-list">`;
      items.forEach(r => { html += resultItemHTML(r, q); });
      html += `</div>`;
    }
  });

  body.innerHTML = html;
}

function resultItemHTML(r, q) {
  /* highlight matching chars */
  let name = r.name;
  if (q) {
    const idx = name.toLowerCase().indexOf(q);
    if (idx >= 0) {
      name = name.slice(0,idx)
           + `<span style="color:var(--p2);font-weight:700">${name.slice(idx,idx+q.length)}</span>`
           + name.slice(idx+q.length);
    }
  }
  const ico = r.icon.length === 1 ? r.icon : r.icon;
  return `<div class="res-item">
    <div class="res-ico" style="background:${r.color}">${ico}</div>
    <div style="flex:1"><div class="res-name">${name}</div><div class="res-sub">${r.sub}</div></div>
    <span class="res-arrow">↗</span>
  </div>`;
}

/* ─────────────────────────────
   SCREEN 3 — APP LIBRARY
───────────────────────────── */
function buildAppLibrary() {
  buildPinRow();
  buildAlphaList();
  buildAZRail();
}

function buildPinRow() {
  const row = document.getElementById('pin-display');
  if (!row) return;
  row.innerHTML = pinnedApps.map(name => {
    const app = ALL_APPS.find(a => a.name === name) || {color:'#666'};
    return `<div class="papp">
      <div class="aico" style="background:${app.color}">${name[0]}</div>
      <span>${name.split(' ')[0]}</span>
    </div>`;
  }).join('');
}

function buildAlphaList() {
  const list = document.getElementById('al-list');
  if (!list) return;

  /* group apps by letter */
  const groups = {};
  ALL_APPS.forEach(app => {
    if (!groups[app.letter]) groups[app.letter] = [];
    groups[app.letter].push(app);
  });

  list.innerHTML = Object.entries(groups).map(([letter, apps]) => `
    <div class="alpha-section" id="section-${letter}">
      <div class="alpha-ltr">${letter}</div>
      ${apps.map(app => `
        <div class="al-app-item">
          <div class="al-ico" style="background:${app.color}">${app.name[0]}</div>
          <span>${app.name}</span>
        </div>`).join('')}
    </div>`).join('');
}

function buildAZRail() {
  const rail = document.getElementById('az-rail');
  if (!rail) return;
  const letters = [...new Set(ALL_APPS.map(a => a.letter))].sort();
  rail.innerHTML = letters.map(l =>
    `<div class="az-ltr" onclick="jumpToLetter('${l}')" id="az-${l}">${l}</div>`
  ).join('');
}

function jumpToLetter(letter) {
  /* highlight active letter */
  document.querySelectorAll('.az-ltr').forEach(el => el.classList.remove('az-active'));
  const ltrEl = document.getElementById('az-' + letter);
  if (ltrEl) ltrEl.classList.add('az-active');

  /* scroll the list to that section */
  const section = document.getElementById('section-' + letter);
  const list    = document.getElementById('al-list');
  if (section && list) {
    list.scrollTo({ top: section.offsetTop - 4, behavior: 'smooth' });
  }

  showToast(`Jumped to "${letter}"`);
}

/* ─────────────────────────────
   SCREEN 4 — EDIT PINNED
───────────────────────────── */
function buildEditPinned() {
  renderPinnedRow();
  renderAllApps();
}

function renderPinnedRow() {
  const row = document.getElementById('ep-row');
  if (!row) return;
  row.innerHTML = pinnedApps.map(name => {
    const app = ALL_APPS.find(a => a.name === name) || {color:'#666'};
    return `<div class="ep-app" id="ep-${name.replace(/ /g,'_')}">
      <div class="ep-remove" onclick="removePin('${name}')">–</div>
      <div class="aico" style="background:${app.color};width:36px;height:36px;font-size:.8rem">${name[0]}</div>
      <span>${name.split(' ')[0]}</span>
    </div>`;
  }).join('');
}

function renderAllApps() {
  const list = document.getElementById('ep-all');
  if (!list) return;
  list.innerHTML = ALL_APPS.map(app => {
    const isPinned = pinnedApps.includes(app.name);
    return `<div class="ep-all-item" id="epa-${app.name.replace(/ /g,'_')}">
      <div class="al-ico" style="background:${app.color}">${app.name[0]}</div>
      <span style="flex:1">${app.name}</span>
      <div class="ep-add ${isPinned ? 'added' : ''}"
           onclick="togglePin('${app.name}',this)">
        ${isPinned ? '✓' : '+'}
      </div>
    </div>`;
  }).join('');
}

function togglePin(name, btn) {
  if (pinnedApps.includes(name)) {
    removePin(name);
    btn.classList.remove('added');
    btn.textContent = '+';
  } else {
    addPin(name);
    btn.classList.add('added');
    btn.textContent = '✓';
  }
}

function addPin(name) {
  if (!pinnedApps.includes(name) && pinnedApps.length < 8) {
    pinnedApps.push(name);
    renderPinnedRow();
    showToast(`Added ${name.split(' ')[0]} to pinned`);
  } else if (pinnedApps.length >= 8) {
    showToast('Maximum 8 pinned apps');
  }
}

function removePin(name) {
  pinnedApps = pinnedApps.filter(p => p !== name);
  renderPinnedRow();
  /* update the + button in all apps list */
  const id = 'epa-' + name.replace(/ /g,'_');
  const item = document.getElementById(id);
  if (item) {
    const btn = item.querySelector('.ep-add');
    if (btn) { btn.classList.remove('added'); btn.textContent = '+'; }
  }
  showToast(`Removed ${name.split(' ')[0]}`);
}

function savePinned() {
  buildPinRow(); /* update app library pin row */
  goTo('app_library');
  showToast('Pinned apps saved ✓');
}

/* ─────────────────────────────
   SCREEN 5 & 6 — TOGGLES
───────────────────────────── */
function tapToggle(el) {
  el.classList.toggle('on');
  /* carry colour class for qs tiles */
  if (el.classList.contains('g-on') && !el.classList.contains('on')) el.classList.remove('g-on');
  if (el.classList.contains('y-on') && !el.classList.contains('on')) el.classList.remove('y-on');
  const name = el.querySelector('.tn')?.textContent?.split('\n')[0] || '';
  if (name) showToast(`${name} ${el.classList.contains('on') ? 'ON' : 'OFF'}`);
}

/* ─────────────────────────────
   EMERGENCY BAR — slide gesture
───────────────────────────── */
(function initEmgBar() {
  document.addEventListener('DOMContentLoaded', () => {
    const bar   = document.getElementById('emg-bar');
    const thumb = document.getElementById('emg-thumb');
    if (!bar || !thumb) return;

    let dragging = false, startX = 0, curX = 0;
    const MAX = 180;

    function startDrag(x) { dragging = true; startX = x; }
    function moveDrag(x) {
      if (!dragging) return;
      curX = Math.min(Math.max(0, x - startX), MAX);
      thumb.style.transform = `translateX(${curX}px)`;
      if (curX > MAX * 0.85) {
        bar.style.background = 'rgba(255,59,85,.35)';
      }
    }
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      if (curX > MAX * 0.75) {
        thumb.style.transform = '';
        bar.style.background = '';
        goTo('emergency');
      } else {
        thumb.style.transition = 'transform .25s ease';
        thumb.style.transform  = '';
        setTimeout(() => { thumb.style.transition = ''; }, 260);
        bar.style.background = '';
      }
      curX = 0;
    }

    bar.addEventListener('mousedown',  e => startDrag(e.clientX));
    bar.addEventListener('touchstart', e => startDrag(e.touches[0].clientX), {passive:true});
    document.addEventListener('mousemove',  e => moveDrag(e.clientX));
    document.addEventListener('touchmove',  e => moveDrag(e.touches[0].clientX), {passive:true});
    document.addEventListener('mouseup',  endDrag);
    document.addEventListener('touchend', endDrag);
  });
})();

/* ─────────────────────────────
   DRAGGABLE SLIDERS
───────────────────────────── */
function initSlider(trackId, fillId, thumbId, initPct) {
  const track = document.getElementById(trackId);
  const fill  = document.getElementById(fillId);
  const thumb = document.getElementById(thumbId);
  if (!track || !fill || !thumb) return;

  fill.style.width  = initPct + '%';
  thumb.style.left  = `calc(${initPct}% - 8px)`;

  let dragging = false;

  function setPct(clientX) {
    const rect = track.getBoundingClientRect();
    const pct  = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    fill.style.width = pct + '%';
    thumb.style.left = `calc(${pct}% - 8px)`;
  }

  track.addEventListener('mousedown',  e => { dragging = true; setPct(e.clientX); });
  track.addEventListener('touchstart', e => { dragging = true; setPct(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('mousemove',  e => { if (dragging) setPct(e.clientX); });
  document.addEventListener('touchmove',  e => { if (dragging) setPct(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('mouseup',  () => { dragging = false; });
  document.addEventListener('touchend', () => { dragging = false; });
}

/* ─────────────────────────────
   SCREEN 8 — EMERGENCY INTERACTIONS
───────────────────────────── */
function initSlideToCall() {
  const track = document.getElementById('slide-track');
  const thumb = document.getElementById('slide-thumb');
  const lbl   = document.getElementById('slide-lbl');
  const msg   = document.getElementById('calling-msg');
  if (!track || !thumb) return;

  let dragging = false, startX = 0, cur = 0;

  function start(x) { dragging = true; startX = x - cur; }
  function move(x) {
    if (!dragging) return;
    const MAX = track.clientWidth - 44;
    cur = Math.min(Math.max(0, x - startX), MAX);
    thumb.style.left = cur + 'px';
    const pct = cur / MAX;
    lbl.style.opacity  = 1 - pct;
    track.style.background = `rgba(255,${Math.round(59 - 59*pct)},${Math.round(85 - 85*pct)},${0.12 + pct*.25})`;
    if (pct > 0.85) {
      track.style.background = 'rgba(255,59,85,.4)';
    }
  }
  function end() {
    if (!dragging) return;
    dragging = false;
    const MAX = track.clientWidth - 44;
    if (cur > MAX * 0.75) {
      /* CONFIRMED */
      thumb.style.display   = 'none';
      lbl.style.display     = 'none';
      if (msg) { msg.style.display = 'block'; }
      track.style.background = 'rgba(255,59,85,.3)';
      showToast('Emergency call initiated 📞');
      /* reset after 3s */
      setTimeout(() => {
        thumb.style.display = '';
        lbl.style.display   = '';
        lbl.style.opacity   = '1';
        if (msg) msg.style.display = 'none';
        thumb.style.left    = '4px';
        track.style.background = '';
        cur = 0;
      }, 3000);
    } else {
      /* snap back */
      thumb.style.transition = 'left .25s ease';
      thumb.style.left = '4px';
      lbl.style.opacity = '1';
      track.style.background = '';
      cur = 0;
      setTimeout(() => { thumb.style.transition = ''; }, 260);
    }
  }

  track.addEventListener('mousedown',  e => start(e.clientX));
  track.addEventListener('touchstart', e => start(e.touches[0].clientX), {passive:true});
  document.addEventListener('mousemove',  e => move(e.clientX));
  document.addEventListener('touchmove',  e => move(e.touches[0].clientX), {passive:true});
  document.addEventListener('mouseup',  end);
  document.addEventListener('touchend', end);
}

function flipSwitch(el) {
  el.classList.toggle('on');
  showToast('Location sharing ' + (el.classList.contains('on') ? 'ON' : 'OFF'));
}

function activateTool(el) {
  el.classList.toggle('active');
  const name = el.querySelector('span:last-child')?.textContent || '';
  showToast(el.classList.contains('active') ? `${name} activated` : `${name} deactivated`);
}

/* ─────────────────────────────
   SCREEN 7 — EDIT QS
───────────────────────────── */
function buildEditQS() {
  renderActiveGrid();
  renderAvailGrid();
}

function renderActiveGrid() {
  const grid = document.getElementById('active-grid');
  if (!grid) return;
  grid.innerHTML = activeQS.map((t, i) => `
    <div class="eqs-btn ripple" data-i="${i}" data-src="active">
      <div class="eqs-minus" onclick="moveToAvail(${i},event)">–</div>
      <span class="ti">${t.icon}</span>
      <span class="tn" style="font-size:.55rem">${t.name}</span>
    </div>`).join('');
}

function renderAvailGrid() {
  const grid = document.getElementById('avail-grid');
  if (!grid) return;
  grid.innerHTML = availQS.map((t, i) => `
    <div class="eqs-btn avail ripple" data-i="${i}">
      <div class="eqs-plus" onclick="moveToActive(${i},event)">+</div>
      <span class="ti">${t.icon}</span>
      <span class="tn" style="font-size:.55rem">${t.name}</span>
    </div>`).join('');
}

function moveToAvail(i, e) {
  e.stopPropagation();
  const tile = activeQS.splice(i, 1)[0];
  availQS.push(tile);
  renderActiveGrid();
  renderAvailGrid();
  showToast(`${tile.name} removed`);
}

function moveToActive(i, e) {
  e.stopPropagation();
  const tile = availQS.splice(i, 1)[0];
  activeQS.push(tile);
  renderActiveGrid();
  renderAvailGrid();
  showToast(`${tile.name} added`);
}

function resetQS() {
  activeQS = [...QS_TILES];
  availQS  = [...AVAIL_TILES];
  renderActiveGrid();
  renderAvailGrid();
  showToast('Reset to defaults');
}

/* ─────────────────────────────
   TOAST
───────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

/* ─────────────────────────────
   KEYBOARD SHORTCUTS
───────────────────────────── */
const SCREEN_ORDER = ['home','search','app_library','edit_pinned','quick_settings','qs_expanded','edit_qs','emergency'];

document.addEventListener('keydown', e => {
  /* don't steal keys when typing in search */
  if (document.activeElement.tagName === 'INPUT') {
    if (e.key === 'Escape') { document.activeElement.blur(); goTo('home'); }
    return;
  }
  const idx = SCREEN_ORDER.indexOf(current);
  if (e.key === 'ArrowRight' && idx < SCREEN_ORDER.length - 1) goTo(SCREEN_ORDER[idx+1]);
  if (e.key === 'ArrowLeft')  { if (navHistory.length) goBack(); else if (idx > 0) goTo(SCREEN_ORDER[idx-1]); }
  if (e.key === 'Escape')     { navHistory = []; goTo('home'); }
});

/* ─────────────────────────────
   INIT
───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* sliders */
  initSlider('b-track','b-fill','b-thumb', 65);
  initSlider('v-track','v-fill','v-thumb', 45);

  /* slide to call */
  initSlideToCall();

  /* initial screen setup */
  updateUI();
  renderSearch('', 'all');
  buildAppLibrary();
  buildEditPinned();
  buildEditQS();

  console.log('%c Samsung One UI Prototype Ready ', 'background:#7c5cfc;color:#fff;padding:4px 10px;border-radius:4px;font-weight:bold;');
  console.log('Interactions: live search · A-Z jump · toggles · sliders · slide-to-call · edit pins · edit QS');
});
