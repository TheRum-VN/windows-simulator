import {
  ROOT, DESKTOP, DOCUMENTS, DOWNLOADS, PICTURES, VIDEOS, RECYCLE,
  createBaseSystemNodes, makeNode, LEVELS, evaluateSimulationGoals,
  loadPracticeState, savePracticeState, resetAllPractice
} from './practice-engine.js';

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const ICON = (n, os) => `/assets/${os || state.os}/icons/${n}.svg`;
const APP_ICON = { explorer: 'explorer', notepad: 'notepad', calculator: 'calculator', settings: 'settings' };
const now = () => Date.now();
const uid = (p = 'id') => `${p}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2, 9)}`;
const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

// Load persisted simulator settings & practice state
const saved = (() => { try { return JSON.parse(localStorage.getItem('windows-sim-v2') || 'null'); } catch { return null; } })();
const initialPractice = loadPracticeState();

function getInitialNodes() {
  if (initialPractice.practiceMode) {
    const levelIndex = Math.max(0, Math.min(LEVELS.length - 1, initialPractice.currentLevel - 1));
    return LEVELS[levelIndex].seed();
  }
  if (Array.isArray(saved?.nodes) && saved.nodes.length) {
    return saved.nodes.map(n => normalizeNode(n));
  }
  return createBaseSystemNodes();
}

function normalizeNode(n) {
  const p = n.parentId || n.parent || DESKTOP;
  return {
    ...n,
    parentId: p,
    parent: p,
    inTrash: p === RECYCLE || !!n.inTrash,
    originalName: n.originalName || n.name,
    nameHistory: Array.isArray(n.nameHistory) ? n.nameHistory : [n.name],
    createdBy: n.createdBy || 'system',
    copiedFrom: n.copiedFrom || null,
    movedBy: n.movedBy || 'system',
    restored: !!n.restored,
    previousParentId: n.previousParentId || n.deletedFrom || null,
    deletedFrom: n.previousParentId || n.deletedFrom || null,
    created: n.created || now(),
    modified: n.modified || now(),
    system: !!n.system
  };
}

const state = {
  os: saved?.os || 'win11',
  wallpaper: saved?.wallpaper ?? 0,
  nodes: getInitialNodes(),
  windows: [],
  z: 100,
  activeWindow: null,
  selected: [],
  activeParent: DESKTOP,
  activeSurface: 'desktop',
  clipboard: { mode: null, ids: [] },
  context: null,
  rename: null,
  properties: null,
  startOpen: false,
  searchOpen: false,
  quickOpen: false,
  teacherOpen: false,
  firstRun: localStorage.getItem('windows-sim-v2-first') !== 'done',
  sleep: false,
  poweredOff: false,
  calcMemory: '0',
  searchQuery: '',
  practice: initialPractice,
  hudMinimized: false,
  showHint: false,
  hudPos: null,
  justCompletedLevel: false
};

const persist = () => {
  localStorage.setItem('windows-sim-v2', JSON.stringify({
    os: state.os,
    wallpaper: state.wallpaper,
    nodes: state.nodes
  }));
  savePracticeState(state.practice);
};

const node = id => state.nodes.find(n => n.id === id);
const children = id => state.nodes.filter(n => (n.parentId === id || n.parent === id) && !n.inTrash);
const trashNodes = () => state.nodes.filter(n => (n.parentId === RECYCLE || n.parent === RECYCLE || n.inTrash) && !n.system);
const formatDate = t => new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(t));

function iconFor(n) {
  if (!n) return ICON('text');
  if (n.id === RECYCLE) return ICON('recycle');
  if (n.id === ROOT) return ICON('thispc');
  if (n.type === 'folder') return ICON('folder');
  
  const name = (n.name || '').toLowerCase();
  const fileType = n.fileType || '';
  if (fileType === 'image' || /\.(png|jpe?g|gif|webp|svg)$/i.test(name)) return ICON('image');
  if (fileType === 'video' || /\.(mp4|mkv|mov|avi)$/i.test(name)) return ICON('video');
  if (fileType === 'audio' || /\.(mp3|wav|ogg|flac|m4a)$/i.test(name)) return ICON('audio');
  if (fileType === 'doc' || /\.(docx?|pdf|pptx?|xlsx?)$/i.test(name)) return ICON('doc');
  if (fileType === 'junk' || /\.(tmp|temp|log|bak)$/i.test(name)) return ICON('junk');
  return ICON('text');
}

function uniqueName(parent, desired, exclude = null) {
  const names = new Set(
    state.nodes
      .filter(n => (n.parentId === parent || n.parent === parent) && n.id !== exclude && !n.inTrash)
      .map(n => n.name.toLowerCase())
  );
  if (!names.has(desired.toLowerCase())) return desired;
  const m = desired.match(/^(.*?)(\.[^.]*)?$/);
  const base = m?.[1] || desired, ext = m?.[2] || '';
  let i = 2;
  while (names.has(`${base} (${i})${ext}`.toLowerCase())) i++;
  return `${base} (${i})${ext}`;
}

function pathIds(id) {
  const a = [];
  let n = node(id), guard = 0;
  while (n && guard++ < 30) {
    a.unshift(n.id);
    const pId = n.parentId || n.parent;
    n = pId ? node(pId) : null;
  }
  return a;
}

function descendantIds(id) {
  const out = [];
  const walk = p => children(p).forEach(c => { out.push(c.id); walk(c.id); });
  walk(id);
  return out;
}

function notify(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(notify._t);
  notify._t = setTimeout(() => t.classList.add('hidden'), 2200);
}

function onStateChange() {
  persist();
  renderMissionHUD();
  checkLevelCompletion();
}

function checkLevelCompletion() {
  if (!state.practice.practiceMode) return;
  const currentLvl = LEVELS[state.practice.currentLevel - 1];
  if (!currentLvl) return;
  
  const evalResult = evaluateSimulationGoals(state, currentLvl);
  if (evalResult.completed) {
    if (!state.practice.completedLevels.includes(currentLvl.id)) {
      state.practice.completedLevels.push(currentLvl.id);
      savePracticeState(state.practice);
      notify(`🎉 Chúc mừng! Em đã hoàn thành ${currentLvl.title}!`);
      
      if (currentLvl.id === 15) {
        showCelebrationModal();
      }
    }
  }
}

function setSelection(ids, parent = state.activeParent, surface = state.activeSurface) {
  state.selected = [...new Set(ids)];
  state.activeParent = parent;
  state.activeSurface = surface;
  renderSelectionOnly();
}

function renderSelectionOnly() {
  $$('.desktop-icon[data-node]').forEach(el => el.classList.toggle('selected', state.selected.includes(el.dataset.node)));
  $$('.file-item[data-node],.file-row[data-node]').forEach(el => el.classList.toggle('selected', state.selected.includes(el.dataset.node)));
}

function applyOS() {
  const app = $('#app');
  app.className = `os-${state.os} wallpaper-${state.wallpaper}`;
  renderStart();
  renderTaskbar();
  persist();
}

function setOS(os) {
  state.os = os;
  applyOS();
  renderWindows();
  renderMissionHUD();
  notify(os === 'win11' ? 'Đã chuyển sang giao diện Windows 11' : 'Đã chuyển sang giao diện Windows 10');
}

function setWallpaper(i) {
  state.wallpaper = i;
  applyOS();
  renderWindows();
  persist();
}

// ==========================================
// DESKTOP & ICONS
// ==========================================
function renderDesktop() {
  const host = $('#desktop-icons');
  const desktopNodes = children(DESKTOP);
  const items = [
    { id: ROOT, name: 'This PC', icon: ICON('thispc'), system: true },
    { id: RECYCLE, name: 'Recycle Bin', icon: ICON('recycle'), system: true },
    ...desktopNodes.map(n => ({ id: n.id, name: n.name, icon: iconFor(n), system: !!n.system }))
  ];

  host.innerHTML = items.map(i => `
    <div class="desktop-icon ${state.selected.includes(i.id) ? 'selected' : ''} ${state.rename?.id === i.id ? 'renaming' : ''}" title="${esc(i.name)}" data-node="${esc(i.id)}" data-system="${i.system ? '1' : '0'}" draggable="${!i.system && state.rename?.id !== i.id}">
      <img src="${i.icon}" alt="">
      <span>${renameMarkup(i)}</span>
    </div>
  `).join('');

  $$('.desktop-icon', host).forEach(el => {
    const id = el.dataset.node;
    el.addEventListener('click', e => {
      if (e.target.closest('.rename-input')) return;
      e.stopPropagation();
      setSelection(e.ctrlKey ? [...state.selected, id] : [id], DESKTOP, 'desktop');
    });
    el.addEventListener('dblclick', e => {
      if (e.target.closest('.rename-input')) return;
      e.stopPropagation();
      openNode(id);
    });
    el.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      setSelection([id], DESKTOP, 'desktop');
      showContext(e.clientX, e.clientY, 'item', id, null);
    });
    el.addEventListener('dragstart', e => {
      if (state.rename?.id === id || e.target.closest('.rename-input')) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'move';
    });
    
    const targetNode = node(id);
    if (targetNode?.type === 'folder' || id === RECYCLE) {
      el.addEventListener('dragover', e => e.preventDefault());
      el.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation();
        const draggedId = e.dataTransfer.getData('text/plain');
        if (!draggedId) return;
        if (id === RECYCLE) {
          deleteSelected([draggedId], 'drag');
        } else {
          moveNode(draggedId, id, 'drag');
        }
      });
    }
  });

  bindRenameInputs(host);
}

function openNode(id) {
  const n = node(id);
  if (id === ROOT) return openApp('explorer', { folder: ROOT });
  if (id === RECYCLE) return openApp('explorer', { folder: RECYCLE });
  if (!n) return;
  if (n.type === 'folder') {
    openApp('explorer', { folder: n.id });
  } else if (n.type === 'text' || n.type === 'file') {
    openApp('notepad', { nodeId: n.id, text: n.content || '' });
  }
}

// ==========================================
// VFS ACTIONS (WITH FRAUD-PROOF METADATA TRACKING)
// ==========================================
function createNode(type, parent = state.activeParent, extra = {}) {
  const parentNode = node(parent);
  if (!parentNode || parent === RECYCLE) return;
  
  const id = uid(type);
  const defaultName = type === 'folder' ? 'New folder' : 'New Text Document.txt';
  const name = uniqueName(parent, extra.name || defaultName);
  const t = now();
  
  const newNode = {
    id,
    name,
    originalName: name,
    nameHistory: [name],
    type,
    fileType: extra.fileType || (type === 'folder' ? 'folder' : 'text'),
    parentId: parent,
    parent: parent,
    inTrash: false,
    content: extra.content || '',
    createdBy: 'user',
    copiedFrom: null,
    movedBy: 'system',
    restored: false,
    previousParentId: null,
    deletedFrom: null,
    created: t,
    modified: t,
    system: false
  };

  state.nodes.push(newNode);
  state.rename = { id, surface: state.activeSurface, windowId: state.activeWindow };
  setSelection([id], parent, state.activeSurface);
  renderDesktop();
  renderWindows();
  setTimeout(focusRename, 10);
  onStateChange();
  return id;
}

function renameNode(id, name) {
  const n = node(id);
  if (!n || n.system) {
    state.rename = null;
    renderDesktop();
    renderWindows();
    return;
  }
  const trimmed = name ? name.trim() : '';
  if (!trimmed) {
    state.rename = null;
    renderDesktop();
    renderWindows();
    return;
  }
  const safe = uniqueName(n.parentId || n.parent, trimmed, id);
  if (safe !== n.name) {
    if (!Array.isArray(n.nameHistory)) n.nameHistory = [n.originalName || n.name];
    n.nameHistory.push(safe);
    n.name = safe;
    n.modified = now();
  }
  state.rename = null;
  renderDesktop();
  renderWindows();
  onStateChange();
}

function deleteSelected(ids = state.selected, movedBy = 'system') {
  const valid = ids.map(node).filter(n => n && !n.system && (n.parentId !== RECYCLE && n.parent !== RECYCLE));
  if (!valid.length) return;
  
  valid.forEach(n => {
    n.previousParentId = n.parentId || n.parent;
    n.deletedFrom = n.parentId || n.parent;
    n.parentId = RECYCLE;
    n.parent = RECYCLE;
    n.inTrash = true;
    n.movedBy = movedBy;
    n.modified = now();
  });
  
  state.selected = [];
  renderDesktop();
  renderWindows();
  notify(`${valid.length} mục đã chuyển vào Recycle Bin`);
  onStateChange();
}

function permanentlyDelete(ids) {
  const all = new Set();
  ids.forEach(id => {
    all.add(id);
    descendantIds(id).forEach(x => all.add(x));
  });
  state.nodes = state.nodes.filter(n => !all.has(n.id));
  state.selected = [];
  renderDesktop();
  renderWindows();
  notify('Đã xóa vĩnh viễn');
  onStateChange();
}

function restoreSelected(ids = state.selected) {
  let count = 0;
  ids.forEach(id => {
    const n = node(id);
    if (n && (n.parentId === RECYCLE || n.parent === RECYCLE || n.inTrash)) {
      const target = n.previousParentId || n.deletedFrom || DESKTOP;
      n.parentId = target;
      n.parent = target;
      n.inTrash = false;
      n.restored = true;
      n.modified = now();
      count++;
    }
  });
  renderDesktop();
  renderWindows();
  notify(count > 0 ? `Đã khôi phục ${count} mục` : 'Không có mục nào để khôi phục');
  onStateChange();
}

function emptyRecycle() {
  const inTrash = trashNodes().map(n => n.id);
  permanentlyDelete(inTrash);
  notify('Đã dọn sạch Thùng rác');
}

function copySelected(mode = 'copy') {
  const ids = state.selected.filter(id => !node(id)?.system);
  if (!ids.length) return;
  state.clipboard = { mode, ids: [...ids] };
  notify(mode === 'copy' ? 'Đã sao chép vào Clipboard (Ctrl+C)' : 'Đã cắt vào Clipboard (Ctrl+X)');
}

function cloneTree(sourceId, parent) {
  const src = node(sourceId);
  if (!src) return null;
  const id = uid(src.type);
  const cpName = uniqueName(parent, src.name);
  const cp = {
    ...src,
    id,
    name: cpName,
    originalName: cpName,
    nameHistory: [cpName],
    parentId: parent,
    parent: parent,
    inTrash: false,
    createdBy: 'user',
    copiedFrom: sourceId,
    movedBy: 'cut-paste',
    restored: false,
    previousParentId: null,
    deletedFrom: null,
    created: now(),
    modified: now()
  };
  state.nodes.push(cp);
  children(sourceId).forEach(ch => cloneTree(ch.id, id));
  return id;
}

function pasteInto(parent = state.activeParent) {
  if (parent === RECYCLE || !state.clipboard.mode || !state.clipboard.ids.length) return;
  const ids = [...state.clipboard.ids];
  
  if (state.clipboard.mode === 'copy') {
    ids.forEach(id => cloneTree(id, parent));
  } else {
    // Cut - Paste (Move)
    ids.forEach(id => {
      const n = node(id);
      if (n && !n.system && !pathIds(parent).includes(id)) {
        // Warning for Quest 8 if cut-pasting instead of drag
        if (state.practice.practiceMode && state.practice.currentLevel === 8 && id === 'seed_baitap_doc') {
          notify('⚠️ Bài tập này yêu cầu kéo thả chuột (Drag & Drop)!');
        }
        n.parentId = parent;
        n.parent = parent;
        n.movedBy = 'cut-paste';
        n.inTrash = false;
        n.modified = now();
      }
    });
    state.clipboard = { mode: null, ids: [] };
  }
  
  renderDesktop();
  renderWindows();
  notify('Đã dán');
  onStateChange();
}

function moveNode(id, parent, movedBy = 'system') {
  const n = node(id), p = node(parent);
  if (!n || !p || n.system || p.type !== 'folder' || pathIds(parent).includes(id) || parent === RECYCLE) return;
  
  // Warning for Quest 8 if cut-paste instead of drag
  if (state.practice.practiceMode && state.practice.currentLevel === 8 && id === 'seed_baitap_doc' && movedBy !== 'drag') {
    notify('⚠️ Bài tập này yêu cầu dùng thao tác Kéo & Thả chuột (Drag & Drop)!');
  }

  n.parentId = parent;
  n.parent = parent;
  n.movedBy = movedBy;
  n.inTrash = false;
  n.modified = now();
  
  renderDesktop();
  renderWindows();
  onStateChange();
}

function startRename(id = state.selected[0]) {
  const n = node(id);
  if (!n || n.system) return;
  state.rename = { id, surface: state.activeSurface, windowId: state.activeWindow };
  renderDesktop();
  renderWindows();
  setTimeout(focusRename, 10);
}

function focusRename() {
  const input = $(`.rename-input[data-node="${CSS.escape(state.rename?.id || '')}"]`);
  if (input) {
    input.focus();
    const n = node(state.rename?.id);
    const isFile = n && n.type !== 'folder';
    const dot = isFile ? input.value.lastIndexOf('.') : -1;
    input.setSelectionRange(0, dot > 0 ? dot : input.value.length);
  }
}

function renameMarkup(n) {
  return state.rename?.id === n.id
    ? `<input class="rename-input" data-node="${esc(n.id)}" value="${esc(n.name)}" draggable="false" spellcheck="false" autocomplete="off">`
    : esc(n.name);
}

function bindRenameInputs(root = document) {
  $$('.rename-input', root).forEach(inp => {
    inp.addEventListener('click', e => e.stopPropagation());
    inp.addEventListener('pointerdown', e => e.stopPropagation());
    inp.addEventListener('mousedown', e => e.stopPropagation());
    inp.addEventListener('dblclick', e => e.stopPropagation());
    inp.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        renameNode(inp.dataset.node, inp.value);
      }
      if (e.key === 'Escape') {
        state.rename = null;
        renderDesktop();
        renderWindows();
      }
    });
    inp.addEventListener('blur', () => {
      if (state.rename?.id === inp.dataset.node) renameNode(inp.dataset.node, inp.value);
    });
  });
}

// ==========================================
// WINDOW MANAGER
// ==========================================
function openApp(app, data = {}) {
  if (['calculator', 'settings'].includes(app)) {
    const existing = state.windows.find(w => w.app === app);
    if (existing) {
      existing.minimized = false;
      focusWindow(existing.id);
      return existing.id;
    }
  }
  
  const id = uid('win');
  const base = {
    explorer: [120, 70, 900, 580],
    notepad: [165, 90, 720, 500],
    calculator: [360, 80, 345, 535],
    settings: [150, 65, 850, 590]
  }[app] || [160, 80, 700, 500];

  const win = {
    id,
    app,
    title: appTitle(app, data),
    x: base[0] + (state.windows.length % 5) * 18,
    y: base[1] + (state.windows.length % 5) * 14,
    w: base[2],
    h: base[3],
    z: ++state.z,
    minimized: false,
    maximized: false,
    data: { ...data }
  };

  if (app === 'explorer') {
    win.data.folder = win.data.folder || DESKTOP;
    win.data.history = [win.data.folder];
    win.data.hi = 0;
    win.data.view = 'details';
    win.data.query = '';
  }

  state.windows.push(win);
  state.activeWindow = id;
  state.activeSurface = 'window';
  if (app === 'explorer') state.activeParent = win.data.folder;
  state.startOpen = false;
  state.searchOpen = false;

  renderWindows();
  renderStart();
  renderSearch();
  renderTaskbar();
  onStateChange();
  return id;
}

function appTitle(app, data) {
  if (app === 'explorer') return node(data.folder)?.name || 'File Explorer';
  if (app === 'notepad') return `${node(data.nodeId)?.name || 'Untitled'} - Notepad`;
  return app === 'calculator' ? 'Calculator' : app === 'settings' ? 'Settings' : app;
}

function focusWindow(id) {
  const w = state.windows.find(w => w.id === id);
  if (!w) return;
  w.z = ++state.z;
  w.minimized = false;
  state.activeWindow = id;
  state.activeSurface = 'window';
  if (w.app === 'explorer') state.activeParent = w.data.folder;
  renderWindows();
  renderTaskbar();
  onStateChange();
}

function closeWindow(id) {
  state.windows = state.windows.filter(w => w.id !== id);
  if (state.activeWindow === id) state.activeWindow = state.windows.at(-1)?.id || null;
  renderWindows();
  renderTaskbar();
  onStateChange();
}

function minimizeWindow(id) {
  const w = state.windows.find(w => w.id === id);
  if (w) w.minimized = true;
  if (state.activeWindow === id) state.activeWindow = null;
  renderWindows();
  renderTaskbar();
  onStateChange();
}

function maximizeWindow(id) {
  const w = state.windows.find(w => w.id === id);
  if (w) {
    w.maximized = !w.maximized;
    w.z = ++state.z;
    state.activeWindow = id;
  }
  renderWindows();
  renderTaskbar();
}

function showDesktop() {
  state.windows.forEach(w => (w.minimized = true));
  state.activeWindow = null;
  renderWindows();
  renderTaskbar();
  onStateChange();
}

function renderWindows() {
  const layer = $('#window-layer');
  layer.innerHTML = state.windows.map(windowMarkup).join('');
  state.windows.forEach(w => bindWindow(w));
  bindRenameInputs(layer);
  renderTaskbar();
}

function windowMarkup(w) {
  const max = w.maximized ? 'maximized' : '';
  const min = w.minimized ? 'minimized' : '';
  const inactive = state.activeWindow === w.id ? '' : 'inactive';
  const icon = APP_ICON[w.app] || 'text';
  return `
    <section class="window ${max} ${min} ${inactive}" data-win="${w.id}" style="left:${w.x}px;top:${w.y}px;width:${w.w}px;height:${w.h}px;z-index:${w.z}">
      <div class="window-titlebar" data-drag="1">
        <img class="title-app-icon" src="${ICON(icon)}">
        <div class="window-title">${esc(appTitle(w.app, w.data))}</div>
        <div class="window-controls">
          <button class="window-control min" title="Minimize"><span class="minimize-mark"></span></button>
          <button class="window-control max" title="Maximize"><span class="${w.maximized ? 'restore-mark' : 'maximize-mark'}"></span></button>
          <button class="window-control close" title="Close"><span class="close-mark">×</span></button>
        </div>
      </div>
      <div class="window-body">${appMarkup(w)}</div>
      <div class="resize-handle"></div>
    </section>
  `;
}

function appMarkup(w) {
  if (w.app === 'explorer') return explorerMarkup(w);
  if (w.app === 'notepad') return notepadMarkup(w);
  if (w.app === 'calculator') return calculatorMarkup(w);
  if (w.app === 'settings') return settingsMarkup(w);
  return '';
}

function bindWindow(w) {
  const el = $(`.window[data-win="${CSS.escape(w.id)}"]`);
  if (!el) return;
  el.addEventListener('pointerdown', () => { if (state.activeWindow !== w.id) focusWindow(w.id); });
  $('.min', el).addEventListener('click', e => { e.stopPropagation(); minimizeWindow(w.id); });
  $('.max', el).addEventListener('click', e => { e.stopPropagation(); maximizeWindow(w.id); });
  $('.close', el).addEventListener('click', e => { e.stopPropagation(); closeWindow(w.id); });
  
  const bar = $('[data-drag]', el);
  bar.addEventListener('dblclick', () => maximizeWindow(w.id));
  bar.addEventListener('pointerdown', e => startDragWindow(e, w, el));
  $('.resize-handle', el).addEventListener('pointerdown', e => startResizeWindow(e, w, el));
  
  if (w.app === 'explorer') bindExplorer(w, el);
  if (w.app === 'notepad') bindNotepad(w, el);
  if (w.app === 'calculator') bindCalculator(w, el);
  if (w.app === 'settings') bindSettings(w, el);
}

function startDragWindow(e, w, el) {
  if (e.button !== 0 || w.maximized || e.target.closest('.window-controls')) return;
  e.preventDefault();
  const sx = e.clientX, sy = e.clientY, ox = w.x, oy = w.y;
  const move = ev => {
    const x = Math.max(-w.w + 120, Math.min(innerWidth - 120, ox + ev.clientX - sx));
    const y = Math.max(0, Math.min(innerHeight - 90, oy + ev.clientY - sy));
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  };
  const up = ev => {
    w.x = Math.max(-w.w + 120, Math.min(innerWidth - 120, ox + ev.clientX - sx));
    w.y = Math.max(0, Math.min(innerHeight - 90, oy + ev.clientY - sy));
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

function startResizeWindow(e, w, el) {
  if (w.maximized) return;
  e.preventDefault();
  e.stopPropagation();
  const sx = e.clientX, sy = e.clientY, ow = w.w, oh = w.h;
  const move = ev => {
    el.style.width = `${Math.max(340, ow + ev.clientX - sx)}px`;
    el.style.height = `${Math.max(240, oh + ev.clientY - sy)}px`;
  };
  const up = ev => {
    w.w = Math.max(340, ow + ev.clientX - sx);
    w.h = Math.max(240, oh + ev.clientY - sy);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

// ==========================================
// FILE EXPLORER
// ==========================================
function explorerMarkup(w) {
  const folder = node(w.data.folder) || node(DESKTOP);
  const recycle = folder.id === RECYCLE;
  const allKids = recycle ? trashNodes() : children(folder.id);
  const kids = allKids.filter(n => !w.data.query || n.name.toLowerCase().includes(w.data.query.toLowerCase()));
  const crumbs = pathIds(folder.id).map(id => node(id)).filter(Boolean);

  const list = w.data.view === 'icons'
    ? `<div class="files icons">${kids.map(n => `
        <div class="file-item icon ${state.selected.includes(n.id) ? 'selected' : ''} ${state.rename?.id === n.id ? 'renaming' : ''}" data-node="${n.id}" draggable="${state.rename?.id !== n.id}">
          <img src="${iconFor(n)}">
          <span>${renameMarkup(n)}</span>
        </div>
      `).join('')}</div>`
    : `<div class="files details">
        <div class="details-head">
          <div>Name</div>
          <div>Date modified</div>
          <div>Type</div>
          <div>Size</div>
        </div>
        ${kids.map(n => `
          <div class="file-row ${state.selected.includes(n.id) ? 'selected' : ''} ${state.rename?.id === n.id ? 'renaming' : ''}" data-node="${n.id}" draggable="${state.rename?.id !== n.id}">
            <div class="file-name-cell">
              <img src="${iconFor(n)}">
              <span style="min-width:0;flex:1">${renameMarkup(n)}</span>
            </div>
            <div>${formatDate(n.modified)}</div>
            <div>${n.type === 'folder' ? 'File folder' : (n.fileType ? n.fileType.toUpperCase() : 'Document')}</div>
            <div>${n.type === 'folder' ? '' : `${(n.content || '').length} bytes`}</div>
          </div>
        `).join('')}
      </div>`;

  return `
    <div class="explorer">
      <div class="explorer-commandbar">
        ${recycle ? `
          <button class="cmd" data-act="restore">↶ <span>Restore</span></button>
          <button class="cmd" data-act="empty">🗑 <span>Empty Recycle Bin</span></button>
        ` : `
          <button class="cmd" data-act="new-folder"><span class="mini">＋</span><span>New</span></button>
          <span class="cmd-sep"></span>
          <button class="cmd" data-act="cut">✂ <span>Cut</span></button>
          <button class="cmd" data-act="copy">▣ <span>Copy</span></button>
          <button class="cmd" data-act="paste">▤ <span>Paste</span></button>
          <button class="cmd" data-act="rename">✎ <span>Rename</span></button>
          <button class="cmd" data-act="delete">🗑 <span>Delete</span></button>
          <span class="cmd-sep"></span>
          <button class="cmd" data-act="view">☷ <span>View</span></button>
        `}
      </div>
      <div class="explorer-navline">
        <button class="navbtn" data-nav="back">‹</button>
        <button class="navbtn" data-nav="forward">›</button>
        <button class="navbtn" data-nav="up">↑</button>
        <div class="addressbar">
          ${crumbs.map((n, i) => `
            <span class="crumb">
              <button data-crumb="${n.id}">${esc(n.name)}</button>
              ${i < crumbs.length - 1 ? '<span>›</span>' : ''}
            </span>
          `).join('')}
        </div>
        <div class="search-explorer">
          <span>⌕</span>
          <input value="${esc(w.data.query || '')}" placeholder="Search ${esc(folder.name)}">
        </div>
      </div>
      <div class="explorer-main">
        <nav class="explorer-sidebar">
          ${sideItem(ROOT, 'This PC', 'thispc', w)}
          ${sideItem(DESKTOP, 'Desktop', 'folder', w)}
          ${sideItem(DOCUMENTS, 'Tài liệu', 'folder', w)}
          ${sideItem(DOWNLOADS, 'Tải xuống', 'folder', w)}
          ${sideItem(PICTURES, 'Hình ảnh', 'folder', w)}
          ${sideItem(VIDEOS, 'Video', 'folder', w)}
          ${sideItem(RECYCLE, 'Recycle Bin', 'recycle', w)}
        </nav>
        <main class="file-area" data-folder="${folder.id}">
          ${kids.length ? list : '<div class="empty-folder">Thư mục này đang trống.</div>'}
        </main>
      </div>
      <div class="explorer-status">
        <span>${kids.length} mục</span>
        <span>${w.data.view === 'icons' ? 'Biểu tượng lớn' : 'Chi tiết'}</span>
      </div>
    </div>
  `;
}

function sideItem(id, label, icon, w) {
  return `<div class="side-item ${w.data.folder === id ? 'active' : ''}" data-side="${id}"><img src="${ICON(icon)}"><span>${label}</span></div>`;
}

function navExplorer(w, folder) {
  if (!node(folder) || node(folder).type !== 'folder') return;
  w.data.folder = folder;
  w.title = node(folder).name;
  const h = w.data.history.slice(0, w.data.hi + 1);
  if (h.at(-1) !== folder) h.push(folder);
  w.data.history = h;
  w.data.hi = h.length - 1;
  w.data.query = '';
  state.activeParent = folder;
  state.selected = [];
  renderWindows();
  onStateChange();
}

function bindExplorer(w, el) {
  $$('[data-side]', el).forEach(x => x.addEventListener('click', () => navExplorer(w, x.dataset.side)));
  $$('[data-crumb]', el).forEach(x => x.addEventListener('click', () => navExplorer(w, x.dataset.crumb)));
  
  $('[data-nav="back"]', el).addEventListener('click', () => {
    if (w.data.hi > 0) {
      w.data.hi--;
      w.data.folder = w.data.history[w.data.hi];
      state.activeParent = w.data.folder;
      state.selected = [];
      renderWindows();
      onStateChange();
    }
  });
  
  $('[data-nav="forward"]', el).addEventListener('click', () => {
    if (w.data.hi < w.data.history.length - 1) {
      w.data.hi++;
      w.data.folder = w.data.history[w.data.hi];
      state.activeParent = w.data.folder;
      state.selected = [];
      renderWindows();
      onStateChange();
    }
  });

  $('[data-nav="up"]', el).addEventListener('click', () => {
    const p = node(w.data.folder)?.parentId || node(w.data.folder)?.parent;
    if (p) navExplorer(w, p);
  });

  const search = $('.search-explorer input', el);
  search.addEventListener('input', () => {
    w.data.query = search.value;
    renderWindows();
    setTimeout(() => {
      const n = $(`.window[data-win="${w.id}"] .search-explorer input`);
      n?.focus();
      n?.setSelectionRange(n.value.length, n.value.length);
    }, 0);
  });

  $$('.file-item[data-node],.file-row[data-node]', el).forEach(item => {
    const id = item.dataset.node;
    item.addEventListener('click', e => {
      if (e.target.closest('.rename-input')) return;
      e.stopPropagation();
      state.activeWindow = w.id;
      setSelection(e.ctrlKey ? [...state.selected, id] : [id], w.data.folder, 'window');
    });
    item.addEventListener('dblclick', e => {
      if (e.target.closest('.rename-input')) return;
      e.stopPropagation();
      const n = node(id);
      if (n?.type === 'folder') navExplorer(w, n.id);
      else openNode(n.id);
    });
    item.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      setSelection([id], w.data.folder, 'window');
      showContext(e.clientX, e.clientY, 'item', id, w.id);
    });
    item.addEventListener('dragstart', e => {
      if (state.rename?.id === id || e.target.closest('.rename-input')) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'move';
    });

    const n = node(id);
    if (n?.type === 'folder') {
      item.addEventListener('dragover', e => e.preventDefault());
      item.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation();
        const draggedId = e.dataTransfer.getData('text/plain');
        if (draggedId) moveNode(draggedId, n.id, 'drag');
      });
    }
  });

  const area = $('.file-area', el);
  area.addEventListener('click', e => {
    if (e.target === area) setSelection([], w.data.folder, 'window');
  });
  area.addEventListener('contextmenu', e => {
    if (e.target.closest('[data-node]')) return;
    e.preventDefault();
    setSelection([], w.data.folder, 'window');
    showContext(e.clientX, e.clientY, 'blank', null, w.id);
  });
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', e => {
    if (e.target.closest('[data-node]')) return;
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId) moveNode(draggedId, w.data.folder, 'drag');
  });

  $$('[data-act]', el).forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.act;
    if (a === 'new-folder') createNode('folder', w.data.folder);
    if (a === 'cut') copySelected('cut');
    if (a === 'copy') copySelected('copy');
    if (a === 'paste') pasteInto(w.data.folder);
    if (a === 'rename') startRename();
    if (a === 'delete') w.data.folder === RECYCLE ? permanentlyDelete(state.selected) : deleteSelected();
    if (a === 'restore') restoreSelected();
    if (a === 'empty') emptyRecycle();
    if (a === 'view') {
      w.data.view = w.data.view === 'icons' ? 'details' : 'icons';
      renderWindows();
    }
  }));
}

// ==========================================
// NOTEPAD & SAVE AS DIALOG
// ==========================================
function notepadMarkup(w) {
  const n = node(w.data.nodeId);
  const text = w.data.text ?? n?.content ?? '';
  return `
    <div class="notepad">
      <div class="notepad-menu">
        <button data-np="file">File</button>
        <button data-np="save">Save</button>
        <button data-np="saveas">Save as</button>
        <button data-np="select">Select all</button>
      </div>
      <textarea spellcheck="false">${esc(text)}</textarea>
      <div class="notepad-status">
        <span>Ln 1, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  `;
}

function bindNotepad(w, el) {
  const ta = $('textarea', el);
  ta.addEventListener('input', () => {
    w.data.text = ta.value;
    const n = node(w.data.nodeId);
    if (n) {
      n.content = ta.value;
      n.modified = now();
      onStateChange();
    }
  });

  const save = () => {
    const n = node(w.data.nodeId);
    if (n) {
      n.content = ta.value;
      n.modified = now();
      w.data.text = ta.value;
      notify(`Đã lưu ${n.name}`);
      onStateChange();
    } else {
      showSaveAsDialog(w, ta.value);
    }
  };

  $$('[data-np]', el).forEach(b => b.addEventListener('click', () => {
    if (b.dataset.np === 'save') save();
    if (b.dataset.np === 'saveas') showSaveAsDialog(w, ta.value);
    if (b.dataset.np === 'select') { ta.focus(); ta.select(); }
    if (b.dataset.np === 'file') notify('File menu: Sử dụng nút Save hoặc Save as để lưu tệp.');
  }));

  ta.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      save();
    }
  });
}

function showSaveAsDialog(w, content) {
  const host = $('#dialog-modal');
  host.classList.remove('hidden');

  // List all available folders for user to save into
  const availableFolders = state.nodes.filter(n => n.type === 'folder' && !n.inTrash && n.id !== ROOT);
  const defaultFolder = state.activeParent || DESKTOP;

  host.innerHTML = `
    <div class="save-as-box">
      <div class="save-as-title">Save As - Notepad</div>
      <div class="save-as-body">
        <div class="save-as-row">
          <label>Lưu vào thư mục (Save in):</label>
          <select id="save-as-folder">
            ${availableFolders.map(f => `<option value="${f.id}" ${f.id === defaultFolder ? 'selected' : ''}>${esc(f.name)}</option>`).join('')}
          </select>
        </div>
        <div class="save-as-row">
          <label>Tên tệp (File name):</label>
          <input id="save-as-filename" value="${esc(node(w.data.nodeId)?.name || 'Ghi_chu.txt')}" autofocus>
        </div>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn" id="save-as-cancel">Hủy bỏ</button>
        <button class="dialog-btn primary" id="save-as-confirm">Lưu (Save)</button>
      </div>
    </div>
  `;

  const closeDialog = () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  };

  $('#save-as-cancel', host).addEventListener('click', closeDialog);
  $('#save-as-confirm', host).addEventListener('click', () => {
    const targetFolder = $('#save-as-folder', host).value;
    let fileName = $('#save-as-filename', host).value.trim();
    if (!fileName) fileName = 'Untitled.txt';
    if (!/\.[^.]+$/.test(fileName)) fileName += '.txt';

    let n = node(w.data.nodeId);
    if (n && n.parentId === targetFolder) {
      n.name = uniqueName(targetFolder, fileName, n.id);
      n.content = content;
      n.modified = now();
    } else {
      const id = uid('text');
      const safeName = uniqueName(targetFolder, fileName);
      n = {
        id,
        name: safeName,
        originalName: safeName,
        nameHistory: [safeName],
        type: 'text',
        fileType: 'text',
        parentId: targetFolder,
        parent: targetFolder,
        inTrash: false,
        content: content,
        createdBy: 'user',
        copiedFrom: null,
        movedBy: 'system',
        restored: false,
        previousParentId: null,
        deletedFrom: null,
        created: now(),
        modified: now(),
        system: false
      };
      state.nodes.push(n);
      w.data.nodeId = id;
    }

    w.title = appTitle('notepad', w.data);
    closeDialog();
    renderDesktop();
    renderWindows();
    notify(`Đã lưu tệp: ${n.name}`);
    onStateChange();
  });
}

// ==========================================
// CALCULATOR & SETTINGS
// ==========================================
const keys = ['%', 'CE', 'C', '⌫', '1/x', 'x²', '√x', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '±', '0', '.', '='];
function calculatorMarkup(w) {
  return `
    <div class="calculator">
      <div class="calc-mode">Standard</div>
      <div class="calc-display">${esc(w.data.display ?? '0')}</div>
      <div class="calc-grid">
        ${keys.map(k => `<button class="calc-key ${k === '=' ? 'eq' : (/[÷×−+%√]/.test(k) ? 'op' : '')}" data-key="${esc(k)}">${esc(k)}</button>`).join('')}
      </div>
    </div>
  `;
}
function bindCalculator(w, el) {
  if (!w.data.display) w.data.display = '0';
  if (!w.data.expr) w.data.expr = '';
  $$('[data-key]', el).forEach(b => b.addEventListener('click', () => calcPress(w, b.dataset.key)));
}
function calcPress(w, k) {
  let d = w.data.display || '0', e = w.data.expr || '';
  if (/^\d$|\.$/.test(k)) {
    d = d === '0' && k !== '.' ? k : d + k;
  } else if (['+', '−', '×', '÷'].includes(k)) {
    e = `${d}${k}`;
    d = '0';
  } else if (k === '=') {
    try {
      const op = e.slice(-1), a = parseFloat(e.slice(0, -1)), b = parseFloat(d);
      d = String(op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : op === '÷' ? a / b : b);
      e = '';
    } catch { d = 'Error'; }
  } else if (k === 'C' || k === 'CE') {
    d = '0'; e = '';
  } else if (k === '⌫') {
    d = d.length > 1 ? d.slice(0, -1) : '0';
  } else if (k === '±') {
    d = String(-parseFloat(d || '0'));
  } else if (k === '%') {
    d = String(parseFloat(d) / 100);
  } else if (k === 'x²') {
    d = String(parseFloat(d) ** 2);
  } else if (k === '√x') {
    d = String(Math.sqrt(parseFloat(d)));
  } else if (k === '1/x') {
    d = String(1 / parseFloat(d));
  }
  w.data.display = d;
  w.data.expr = e;
  renderWindows();
}

function settingsMarkup() {
  return `
    <div class="settings-app">
      <nav class="settings-nav">
        <div class="settings-user">
          <div class="avatar">HS</div>
          <div><b>Học sinh</b><div style="font-size:11px;color:#667085">Local account</div></div>
        </div>
        <div class="settings-nav-item active">🎨 Personalization</div>
        <div class="settings-nav-item">🖥 System</div>
        <div class="settings-nav-item">⌨ Accessibility</div>
        <div class="settings-nav-item">ⓘ About simulator</div>
      </nav>
      <main class="settings-page">
        <h2>Personalization</h2>
        <div class="setting-card">
          <b>Windows interface</b>
          <p style="color:#667085">Chuyển nhanh giao diện để học sinh làm quen cả Windows 10 và Windows 11.</p>
          <div class="os-choice">
            <button class="os-card ${state.os === 'win11' ? 'active' : ''}" data-os="win11">
              <b>Windows 11</b>
              <div>Centered taskbar · rounded UI</div>
            </button>
            <button class="os-card ${state.os === 'win10' ? 'active' : ''}" data-os="win10">
              <b>Windows 10</b>
              <div>Left taskbar · classic Start</div>
            </button>
          </div>
        </div>
        <div class="setting-card">
          <b>Background</b>
          <div class="wallpapers">
            ${[0, 1, 2, 3].map(i => `<button class="wallpaper-card wp${i} ${state.wallpaper === i ? 'active' : ''}" data-wallpaper="${i}"></button>`).join('')}
          </div>
        </div>
        <div class="setting-card">
          <b>Chế độ Luyện tập (Interactive Quests)</b>
          <p style="color:#667085">Hệ thống 15 bài luyện tập thực hành Tệp & Thư mục từ Cơ bản đến Nâng cao.</p>
          <button class="dialog-btn primary" data-open-practice-menu>Quản lý bài tập</button>
        </div>
        <div class="setting-card">
          <b>Educational safety</b>
          <p>Mọi tệp tin trong giả lập là ảo và được lưu cục bộ trên trình duyệt. Không làm thay đổi máy tính thật.</p>
          <button class="dialog-btn" data-reset>Khôi phục dữ liệu gốc</button>
        </div>
      </main>
    </div>
  `;
}

function bindSettings(w, el) {
  $$('[data-os]', el).forEach(b => b.addEventListener('click', () => setOS(b.dataset.os)));
  $$('[data-wallpaper]', el).forEach(b => b.addEventListener('click', () => setWallpaper(Number(b.dataset.wallpaper))));
  $('[data-open-practice-menu]', el)?.addEventListener('click', () => toggleTeacher(true));
  $('[data-reset]', el).addEventListener('click', () => {
    if (confirm('Khôi phục toàn bộ dữ liệu giả lập về ban đầu?')) resetSimulator();
  });
}

// ==========================================
// TASKBAR & START MENU
// ==========================================
function renderTaskbar() {
  const run = $('#running-apps');
  const grouped = [];
  for (const w of state.windows) {
    if (!grouped.some(x => x.app === w.app)) grouped.push(w);
  }

  run.innerHTML = grouped.map(w => `
    <button class="task-icon running ${state.windows.some(x => x.app === w.app && x.id === state.activeWindow && !x.minimized) ? 'active' : ''}" data-running="${w.app}" title="${esc(appTitle(w.app, w.data))}">
      <img src="${ICON(APP_ICON[w.app] || 'text')}">
    </button>
  `).join('');

  $$('[data-running]', run).forEach(b => b.addEventListener('click', () => {
    const wins = state.windows.filter(w => w.app === b.dataset.running);
    const active = wins.find(w => w.id === state.activeWindow);
    if (active && !active.minimized) minimizeWindow(active.id);
    else focusWindow(wins.at(-1).id);
  }));

  $('#start-btn img').src = ICON('start');
  $('#search-btn img').src = ICON('search');
  $$('.pinned-app').forEach(b => {
    const key = APP_ICON[b.dataset.app];
    const img = $('img', b);
    if (img && key) img.src = ICON(key);
  });
  
  const tray = $$('#quick-btn img');
  if (tray[0]) tray[0].src = ICON('wifi');
  if (tray[1]) tray[1].src = ICON('volume');
  
  $('#start-btn').classList.toggle('active', state.startOpen);
  $('#search-btn').classList.toggle('active', state.searchOpen);
}

function renderStart() {
  const host = $('#start-menu');
  host.classList.toggle('hidden', !state.startOpen);
  if (!state.startOpen) return;

  const win11 = `
    <div class="win11-start-body">
      <div class="start-search"><img src="${ICON('search')}"><input placeholder="Type here to search"></div>
      <div class="start-section-head"><span>Pinned</span><button>All apps ›</button></div>
      <div class="pinned-grid">
        ${startApp('explorer', 'File Explorer', 'explorer')}
        ${startApp('notepad', 'Notepad', 'notepad')}
        ${startApp('calculator', 'Calculator', 'calculator')}
        ${startApp('settings', 'Settings', 'settings')}
        ${startApp('explorer', 'Tài liệu', 'folder', DOCUMENTS)}
        ${startApp('explorer', 'Hình ảnh', 'folder', PICTURES)}
      </div>
      <div class="start-section-head"><span>Luyện tập</span><button data-teacher>Teacher Panel ›</button></div>
      <div class="recommended">
        <div class="recommended-item" data-jump-practice="${state.practice.currentLevel}">
          <img src="${ICON('folder')}">
          <div><b>Bài ${state.practice.currentLevel}: ${esc(LEVELS[state.practice.currentLevel - 1]?.title || 'Luyện tập')}</b><small>Mức độ: ${LEVELS[state.practice.currentLevel - 1]?.difficulty}</small></div>
        </div>
      </div>
      <div class="start-footer">
        <div class="user-chip"><div class="avatar">HS</div><span>Học sinh</span></div>
        ${powerWidget()}
      </div>
    </div>
  `;

  const win10 = `
    <div class="start-left-rail">
      <button class="rail-button rail-menu" data-teacher title="Teacher panel">☰</button>
      <div class="rail-bottom">
        <button class="rail-button" data-app="explorer" data-folder="${DOCUMENTS}" title="Documents"><span class="rail-glyph">▤</span></button>
        <button class="rail-button" data-app="settings" title="Settings"><img src="${ICON('settings')}"></button>
        ${powerWidget(true)}
      </div>
    </div>
    <div class="win10-app-list">
      <div class="win10-group-title">Recently added</div>
      ${win10App('explorer', 'File Explorer', 'explorer')}
      ${win10App('notepad', 'Notepad', 'notepad')}
      ${win10App('calculator', 'Calculator', 'calculator')}
      ${win10App('settings', 'Settings', 'settings')}
      <div class="win10-group-title">W</div>
      ${win10App('explorer', 'Windows System', 'folder', ROOT)}
    </div>
    <div class="win10-tiles">
      <button class="tile" data-app="explorer"><img src="${ICON('explorer')}"><span>File Explorer</span></button>
      <button class="tile" data-app="notepad"><img src="${ICON('notepad')}"><span>Notepad</span></button>
      <button class="tile" data-app="calculator"><img src="${ICON('calculator')}"><span>Calculator</span></button>
      <button class="tile" data-app="settings"><img src="${ICON('settings')}"><span>Settings</span></button>
    </div>
  `;

  host.innerHTML = state.os === 'win11' ? win11 : win10;
  bindStart(host);
}

function startApp(app, label, icon, folder) {
  return `<button class="start-app" data-app="${app}" ${folder ? `data-folder="${folder}"` : ''}><img src="${ICON(icon)}"><span>${label}</span></button>`;
}
function win10App(app, label, icon, folder) {
  return `<button class="win10-list-app" data-app="${app}" ${folder ? `data-folder="${folder}"` : ''}><img src="${ICON(icon)}"><span>${label}</span></button>`;
}
function powerWidget(compact = false) {
  return `
    <div class="power-wrap ${compact ? 'compact' : ''}">
      <button class="power-button" data-power-menu title="Power"><img src="${ICON('power')}"></button>
      <div class="power-flyout hidden">
        <button class="power-action" data-power="sleep">☾ <span>Sleep</span></button>
        <button class="power-action" data-power="restart">↻ <span>Restart</span></button>
        <button class="power-action" data-power="shutdown">⏻ <span>Shut down</span></button>
      </div>
    </div>
  `;
}
function bindStart(host) {
  $$('[data-app]', host).forEach(b => b.addEventListener('click', () => openApp(b.dataset.app, b.dataset.folder ? { folder: b.dataset.folder } : {})));
  $$('[data-open-node]', host).forEach(b => b.addEventListener('click', () => openNode(b.dataset.openNode)));
  $$('[data-power-menu]', host).forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    $('.power-flyout', b.parentElement).classList.toggle('hidden');
  }));
  $$('[data-power]', host).forEach(b => b.addEventListener('click', () => power(b.dataset.power)));
  $('[data-teacher]', host)?.addEventListener('click', () => toggleTeacher(true));
  $('[data-jump-practice]', host)?.addEventListener('click', () => {
    state.startOpen = false;
    renderStart();
    renderMissionHUD();
  });
  const si = $('.start-search input', host);
  si?.addEventListener('input', () => {
    state.startOpen = false;
    state.searchOpen = true;
    state.searchQuery = si.value;
    renderStart();
    renderSearch();
  });
}

function renderSearch() {
  const host = $('#search-panel');
  host.classList.toggle('hidden', !state.searchOpen);
  if (!state.searchOpen) return;

  const q = state.searchQuery.toLowerCase().trim();
  const apps = [
    ['explorer', 'File Explorer', 'explorer'],
    ['notepad', 'Notepad', 'notepad'],
    ['calculator', 'Calculator', 'calculator'],
    ['settings', 'Settings', 'settings']
  ].filter(a => !q || a[1].toLowerCase().includes(q));

  const files = state.nodes.filter(n => !n.system && !n.inTrash && (!q || n.name.toLowerCase().includes(q))).slice(0, 8);

  host.innerHTML = `
    <div class="search-box">
      <img src="${ICON('search')}">
      <input autofocus placeholder="Search apps, files and settings" value="${esc(state.searchQuery)}">
    </div>
    <div class="search-results">
      ${[
        ...apps.map(a => `<div class="search-hit" data-search-app="${a[0]}"><img src="${ICON(a[2])}"><div><b>${a[1]}</b><div style="font-size:11px;color:#667085">App</div></div></div>`),
        ...files.map(n => `<div class="search-hit" data-search-node="${n.id}"><img src="${iconFor(n)}"><div><b>${esc(n.name)}</b><div style="font-size:11px;color:#667085">${n.type === 'folder' ? 'Folder' : 'Document'}</div></div></div>`)
      ].join('') || '<div class="search-empty">No results found.</div>'}
    </div>
  `;

  const inp = $('input', host);
  inp.addEventListener('input', () => {
    state.searchQuery = inp.value;
    renderSearch();
    setTimeout(() => {
      const i = $('#search-panel input');
      i?.focus();
      i?.setSelectionRange(i.value.length, i.value.length);
    }, 0);
  });
  $$('[data-search-app]', host).forEach(x => x.addEventListener('click', () => openApp(x.dataset.searchApp)));
  $$('[data-search-node]', host).forEach(x => x.addEventListener('click', () => openNode(x.dataset.searchNode)));
}

function renderQuick() {
  const host = $('#quick-panel');
  host.classList.toggle('hidden', !state.quickOpen);
  if (!state.quickOpen) return;

  host.innerHTML = `
    <div class="quick-grid">
      <button class="quick-toggle on">⌁<span>Wi-Fi</span></button>
      <button class="quick-toggle on">ᛒ<span>Bluetooth</span></button>
      <button class="quick-toggle">✈<span>Airplane</span></button>
      <button class="quick-toggle">☾<span>Night light</span></button>
      <button class="quick-toggle on">♿<span>Accessibility</span></button>
      <button class="quick-toggle">▣<span>Nearby</span></button>
    </div>
    <div class="slider-line">🔊 <input type="range" min="0" max="100" value="65"></div>
    <div class="slider-line">☀ <input type="range" min="0" max="100" value="78"></div>
    <div class="quick-footer">
      <span>Battery 100%</span>
      <button data-open-settings>⚙ Settings</button>
    </div>
  `;
  $$('.quick-toggle', host).forEach(b => b.addEventListener('click', () => b.classList.toggle('on')));
  $('[data-open-settings]', host).addEventListener('click', () => openApp('settings'));
}

// ==========================================
// CONTEXT MENU & PROPERTIES
// ==========================================
function showContext(x, y, area, targetId = null, windowId = null) {
  state.context = { x, y, area, targetId, windowId };
  const host = $('#context-menu');
  const n = targetId ? node(targetId) : null;
  const recycleParent = state.activeParent === RECYCLE;

  let html = '';
  if (area === 'item') {
    html = `
      <div class="menu-item" data-menu="open"><span class="menu-icon">↗</span><b>Open</b></div>
      ${!n?.system ? `
        <div class="menu-sep"></div>
        <div class="menu-item" data-menu="cut"><span class="menu-icon">✂</span>Cut <span class="shortcut">Ctrl+X</span></div>
        <div class="menu-item" data-menu="copy"><span class="menu-icon">▣</span>Copy <span class="shortcut">Ctrl+C</span></div>
        <div class="menu-item" data-menu="rename"><span class="menu-icon">✎</span>Rename <span class="shortcut">F2</span></div>
        <div class="menu-item" data-menu="${recycleParent ? 'permadelete' : 'delete'}"><span class="menu-icon">🗑</span>${recycleParent ? 'Delete permanently' : 'Delete'} <span class="shortcut">Del</span></div>
        ${recycleParent ? '<div class="menu-item" data-menu="restore"><span class="menu-icon">↶</span>Restore</div>' : ''}
      ` : ''}
      <div class="menu-sep"></div>
      <div class="menu-item" data-menu="properties"><span class="menu-icon">ⓘ</span>Properties</div>
    `;
  } else {
    html = `
      <div class="menu-item" data-menu="view"><span class="menu-icon">▦</span>View</div>
      <div class="menu-item" data-menu="refresh"><span class="menu-icon">↻</span>Refresh</div>
      <div class="menu-sep"></div>
      <div class="menu-item" data-menu="new-folder"><span class="menu-icon">📁</span>New folder <span class="shortcut">Ctrl+Shift+N</span></div>
      <div class="menu-item" data-menu="new-text"><span class="menu-icon">▤</span>New Text Document</div>
      <div class="menu-item ${state.clipboard.mode ? '' : 'disabled'}" data-menu="paste"><span class="menu-icon">▤</span>Paste <span class="shortcut">Ctrl+V</span></div>
      <div class="menu-sep"></div>
      <div class="menu-item" data-menu="display"><span class="menu-icon">▣</span>Display settings</div>
      <div class="menu-item" data-menu="personalize"><span class="menu-icon">⚙</span>Personalize</div>
    `;
  }

  host.innerHTML = html;
  host.classList.remove('hidden');
  host.style.left = `${Math.min(x, innerWidth - 230)}px`;
  host.style.top = `${Math.min(y, innerHeight - 330)}px`;
  $$('[data-menu]', host).forEach(m => m.addEventListener('click', () => menuAction(m.dataset.menu, targetId, windowId)));
}

function hideContext() {
  state.context = null;
  $('#context-menu').classList.add('hidden');
}

function menuAction(a, targetId, windowId) {
  hideContext();
  if (targetId && !state.selected.includes(targetId)) state.selected = [targetId];
  if (a === 'open') openNode(targetId);
  if (a === 'cut') copySelected('cut');
  if (a === 'copy') copySelected('copy');
  if (a === 'rename') startRename(targetId);
  if (a === 'delete') deleteSelected();
  if (a === 'permadelete') permanentlyDelete(state.selected);
  if (a === 'restore') restoreSelected();
  if (a === 'properties') showProperties(targetId);
  if (a === 'new-folder') createNode('folder', state.activeParent);
  if (a === 'new-text') createNode('text', state.activeParent);
  if (a === 'paste') pasteInto(state.activeParent);
  if (a === 'refresh') {
    renderDesktop();
    renderWindows();
    notify('Đã làm mới');
  }
  if (a === 'display' || a === 'personalize') openApp('settings');
  if (a === 'view') {
    const w = state.windows.find(w => w.id === windowId);
    if (w?.app === 'explorer') {
      w.data.view = w.data.view === 'icons' ? 'details' : 'icons';
      renderWindows();
    }
  }
}

function showProperties(id) {
  const n = node(id);
  if (!n) return;
  state.properties = id;
  const host = $('#properties-modal');
  host.classList.remove('hidden');

  host.innerHTML = `
    <div class="properties">
      <div class="properties-title">${esc(n.name)} Properties</div>
      <div class="properties-body">
        <div class="prop-head">
          <img src="${iconFor(n)}">
          <div>
            <b>${esc(n.name)}</b>
            <div style="font-size:12px;color:#667085;margin-top:4px">${n.type === 'folder' ? 'File folder' : 'Document'}</div>
          </div>
        </div>
        <div class="prop-row"><span>Type:</span><span>${n.type === 'folder' ? 'File folder' : 'Document'}</span></div>
        <div class="prop-row"><span>Location:</span><span>${esc(pathIds(n.parentId || n.parent).map(id => node(id)?.name).filter(Boolean).join(' > '))}</span></div>
        <div class="prop-row"><span>Size:</span><span>${n.type === 'folder' ? `${descendantIds(n.id).length} item(s)` : `${(n.content || '').length} bytes`}</span></div>
        <div class="prop-row"><span>Created:</span><span>${formatDate(n.created)}</span></div>
        <div class="prop-row"><span>Modified:</span><span>${formatDate(n.modified)}</span></div>
        <div class="prop-row"><span>Attributes:</span><span>☐ Read-only &nbsp; ☐ Hidden</span></div>
      </div>
      <div class="properties-actions">
        <button class="dialog-btn" data-close-prop>Cancel</button>
        <button class="dialog-btn primary" data-close-prop>OK</button>
      </div>
    </div>
  `;
  $$('[data-close-prop]', host).forEach(b => b.addEventListener('click', () => {
    host.classList.add('hidden');
    state.properties = null;
  }));
}

// ==========================================
// MISSION HUD (REAL-TIME QUEST ENGINE)
// ==========================================
function renderMissionHUD() {
  const host = $('#mission-panel');
  if (!state.practice.practiceMode) {
    host.classList.add('hidden');
    return;
  }
  host.classList.remove('hidden');

  const currentLvl = LEVELS[state.practice.currentLevel - 1];
  if (!currentLvl) return;

  const evalResult = evaluateSimulationGoals(state, currentLvl);
  host.className = `mission-panel ${state.hudMinimized ? 'minimized' : ''} ${evalResult.completed ? 'completed' : ''}`;

  if (state.hudPos) {
    host.style.left = `${state.hudPos.x}px`;
    host.style.top = `${state.hudPos.y}px`;
    host.style.right = 'auto';
  }

  host.innerHTML = `
    <div class="mission-header" id="mission-hud-drag">
      <div class="mission-title-group">
        <span class="mission-badge ${currentLvl.badgeClass}">${currentLvl.difficulty}</span>
        <div class="mission-title-text" title="${esc(currentLvl.title)}">Bài ${currentLvl.id}/15: ${esc(currentLvl.title)}</div>
      </div>
      <div class="mission-header-tools">
        <button class="m-tool-btn" id="m-btn-hint" title="Gợi ý thao tác">💡</button>
        <button class="m-tool-btn" id="m-btn-min" title="${state.hudMinimized ? 'Mở rộng' : 'Thu nhỏ'}">${state.hudMinimized ? '🗖' : '🗕'}</button>
      </div>
    </div>

    <div class="mission-body">
      <div class="mission-desc">${esc(currentLvl.description)}</div>
      <div class="mission-progress-bar">
        <span style="width: ${evalResult.progress}%"></span>
      </div>

      <div class="mission-checklist">
        ${evalResult.goals.map(g => `
          <div class="mission-check-item ${g.passed ? 'passed' : ''}">
            <div class="check-icon">${g.passed ? '✓' : ''}</div>
            <div style="flex:1">${esc(g.text)}</div>
          </div>
        `).join('')}
      </div>

      ${state.showHint ? `
        <div class="mission-hint-box">
          <div class="mission-hint-title">💡 Gợi ý thực hành:</div>
          <div>${esc(currentLvl.hint).replace(/\n/g, '<br>')}</div>
        </div>
      ` : ''}
    </div>

    <div class="mission-footer">
      <button class="m-action-btn secondary" id="m-btn-reset-level" title="Khôi phục lại dữ liệu bài này">🔄 Làm lại bài</button>
      <button class="m-action-btn primary ${evalResult.completed ? 'enabled' : ''}" id="m-btn-next-level">
        ${currentLvl.id === 15 ? 'Hoàn thành 🎉' : 'Bài tiếp theo ➡️'}
      </button>
    </div>
  `;

  // Bind HUD Events
  $('#m-btn-hint', host)?.addEventListener('click', () => {
    state.showHint = !state.showHint;
    renderMissionHUD();
  });

  $('#m-btn-min', host)?.addEventListener('click', () => {
    state.hudMinimized = !state.hudMinimized;
    renderMissionHUD();
  });

  $('#m-btn-reset-level', host)?.addEventListener('click', () => {
    if (confirm(`Đặt lại bài số ${currentLvl.id}: ${currentLvl.title}?`)) {
      seedCurrentLevel();
    }
  });

  $('#m-btn-next-level', host)?.addEventListener('click', () => {
    if (!evalResult.completed) {
      notify('Hãy hoàn thành tất cả các mục tiêu trước khi chuyển bài!');
      return;
    }
    if (currentLvl.id === 15) {
      showCelebrationModal();
    } else {
      nextLevel();
    }
  });

  // Draggable HUD
  bindDraggableHUD(host);
}

function bindDraggableHUD(panel) {
  const handle = $('#mission-hud-drag', panel);
  if (!handle) return;
  handle.onpointerdown = e => {
    if (e.target.closest('.m-tool-btn')) return;
    e.preventDefault();
    const rect = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const ox = rect.left, oy = rect.top;

    const move = ev => {
      const nx = Math.max(10, Math.min(innerWidth - rect.width - 10, ox + ev.clientX - sx));
      const ny = Math.max(10, Math.min(innerHeight - rect.height - 50, oy + ev.clientY - sy));
      panel.style.left = `${nx}px`;
      panel.style.top = `${ny}px`;
      panel.style.right = 'auto';
      state.hudPos = { x: nx, y: ny };
    };

    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
}

function seedCurrentLevel() {
  const currentLvl = LEVELS[state.practice.currentLevel - 1];
  if (!currentLvl) return;
  
  state.nodes = currentLvl.seed();
  state.windows = [];
  state.selected = [];
  state.clipboard = { mode: null, ids: [] };
  state.showHint = false;
  persist();
  renderAll();
  notify(`Đã nạp bài ${currentLvl.id}: ${currentLvl.title}`);
}

function jumpToLevel(lvlIndex) {
  state.practice.currentLevel = Math.max(1, Math.min(15, lvlIndex));
  savePracticeState(state.practice);
  seedCurrentLevel();
}

function nextLevel() {
  if (state.practice.currentLevel < 15) {
    state.practice.currentLevel++;
    savePracticeState(state.practice);
    seedCurrentLevel();
  } else {
    showCelebrationModal();
  }
}

// ==========================================
// GRAND CELEBRATION MODAL (15/15 COMPLETED)
// ==========================================
function showCelebrationModal() {
  const host = $('#celebration-modal');
  host.classList.remove('hidden');

  host.innerHTML = `
    <div class="grand-celebrate-card">
      <div class="grand-trophy">🏆</div>
      <h2 class="grand-title">Chúc mừng em đã hoàn thành xuất sắc!</h2>
      <p class="grand-subtitle">
        Em đã chinh phục trọn vẹn <b>15/15 bài luyện tập</b> thực hành Tệp & Thư mục trên Windows Simulator.
        Kỹ năng thao tác và quản trị tệp tin của em giờ đã đạt cấp độ Chuyên gia!
      </p>

      <div class="grand-stats-grid">
        <div class="grand-stat-box">
          <div class="grand-stat-num">5/5</div>
          <div class="grand-stat-label">Cơ bản</div>
        </div>
        <div class="grand-stat-box">
          <div class="grand-stat-num">5/5</div>
          <div class="grand-stat-label">Trung bình</div>
        </div>
        <div class="grand-stat-box">
          <div class="grand-stat-num">5/5</div>
          <div class="grand-stat-label">Nâng cao</div>
        </div>
      </div>

      <div class="grand-actions">
        <button class="grand-btn-reset" id="grand-reset-all">
          <span>🔁</span> Làm lại từ đầu (Reset All Progress)
        </button>
        <button class="grand-btn-dismiss" id="grand-dismiss">Đóng và xem màn hình</button>
      </div>
    </div>
  `;

  $('#grand-reset-all', host).addEventListener('click', () => {
    state.practice = resetAllPractice();
    host.classList.add('hidden');
    seedCurrentLevel();
    notify('Đã đặt lại toàn bộ tiến độ về Bài 1!');
  });

  $('#grand-dismiss', host).addEventListener('click', () => {
    host.classList.add('hidden');
  });
}

// ==========================================
// TEACHER PANEL (CTRL + SHIFT + T)
// ==========================================
function renderTeacher() {
  const host = $('#teacher-panel');
  host.classList.toggle('hidden', !state.teacherOpen);
  if (!state.teacherOpen) return;

  const currentLvl = LEVELS[state.practice.currentLevel - 1];

  host.innerHTML = `
    <div class="teacher-head">
      <b>Teacher Panel (Ctrl + Shift + T)</b>
      <button data-close-teacher style="color:white;font-size:18px;background:none;border:none;cursor:pointer">×</button>
    </div>
    <div class="teacher-body">
      <h4>Điều khiển hệ thống giả lập</h4>
      <p>Dùng bảng này để phục vụ giảng dạy, đổi hệ điều hành, bật toàn màn hình hoặc chọn bài tập giảng trên máy chiếu.</p>
      
      <div class="teacher-actions">
        <button data-t-os="win10">Windows 10</button>
        <button data-t-os="win11">Windows 11</button>
        <button data-fullscreen>⛶ Fullscreen</button>
        <button data-reset-sim>↻ Reset Sandbox</button>
      </div>

      <div class="teacher-practice-box">
        <h5>🎯 Chế độ Luyện tập Thực hành</h5>
        <div class="teacher-practice-controls">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
            <input type="checkbox" id="teacher-toggle-practice" ${state.practice.practiceMode ? 'checked' : ''}>
            <b>Bật chế độ 15 Bài luyện tập</b>
          </label>

          <label style="margin-top:6px">Nhảy nhanh tới bài giảng:</label>
          <select id="teacher-select-level" ${!state.practice.practiceMode ? 'disabled' : ''}>
            ${LEVELS.map(lvl => `
              <option value="${lvl.id}" ${lvl.id === state.practice.currentLevel ? 'selected' : ''}>
                Bài ${lvl.id}: ${esc(lvl.title)} [${lvl.difficulty}]
              </option>
            `).join('')}
          </select>

          <div style="margin-top:8px;display:flex;gap:6px">
            <button class="dialog-btn" id="teacher-btn-reset-current" style="flex:1">Làm lại bài này</button>
            <button class="dialog-btn" id="teacher-btn-reset-all" style="flex:1;color:#b91c1c">Reset về Bài 1</button>
          </div>
        </div>
      </div>
    </div>
  `;

  $('[data-close-teacher]', host).addEventListener('click', () => toggleTeacher(false));
  $$('[data-t-os]', host).forEach(b => b.addEventListener('click', () => setOS(b.dataset.tOs)));
  $('[data-fullscreen]', host).addEventListener('click', () => document.documentElement.requestFullscreen?.());
  $('[data-reset-sim]', host).addEventListener('click', () => {
    if (confirm('Đặt lại toàn bộ dữ liệu Sandbox về ban đầu?')) resetSimulator();
  });

  $('#teacher-toggle-practice', host)?.addEventListener('change', e => {
    state.practice.practiceMode = e.target.checked;
    savePracticeState(state.practice);
    if (state.practice.practiceMode) seedCurrentLevel();
    else {
      state.nodes = createBaseSystemNodes();
      renderAll();
    }
  });

  $('#teacher-select-level', host)?.addEventListener('change', e => {
    jumpToLevel(Number(e.target.value));
  });

  $('#teacher-btn-reset-current', host)?.addEventListener('click', () => {
    seedCurrentLevel();
  });

  $('#teacher-btn-reset-all', host)?.addEventListener('click', () => {
    if (confirm('Xóa tiến độ và quay lại từ Bài 1?')) {
      state.practice = resetAllPractice();
      seedCurrentLevel();
      renderTeacher();
      notify('Đã reset toàn bộ tiến độ về Bài 1!');
    }
  });
}

function toggleTeacher(v = !state.teacherOpen) {
  state.teacherOpen = v;
  renderTeacher();
}

// ==========================================
// POWER & BOOT SCREEN
// ==========================================
function power(kind) {
  state.startOpen = false;
  renderStart();
  if (kind === 'sleep') {
    state.sleep = true;
    showBoot('sleep');
  } else if (kind === 'restart') {
    showBoot('restart');
    setTimeout(() => {
      hideBoot();
      notify('Windows đã khởi động lại');
    }, 1700);
  } else if (kind === 'shutdown') {
    state.poweredOff = true;
    showBoot('shutdown');
  }
}

function showBoot(kind) {
  const host = $('#boot-screen');
  host.classList.remove('hidden');
  if (kind === 'shutdown') {
    host.innerHTML = `<img class="boot-logo" src="${ICON('start')}" style="filter:brightness(0) invert(1)"><div style="font-size:18px">Shutting down</div>`;
    setTimeout(() => {
      if (state.poweredOff) {
        host.innerHTML = `
          <div style="font-size:13px;color:#cbd5e1;margin-bottom:18px">Máy tính giả lập đã tắt nguồn</div>
          <button data-power-on style="color:white;border:1px solid #69727d;border-radius:6px;padding:10px 16px;background:none;cursor:pointer">Bật máy (Power on)</button>
        `;
        $('#boot-screen [data-power-on]')?.addEventListener('click', () => {
          state.poweredOff = false;
          hideBoot();
        });
      }
    }, 1100);
  } else if (kind === 'sleep') {
    host.innerHTML = `<div style="font-size:13px;color:#cbd5e1">Đang ở chế độ Sleep... Nhấn bất kỳ đâu để bật lại</div>`;
    host.onclick = () => {
      state.sleep = false;
      host.onclick = null;
      hideBoot();
    };
  } else {
    host.innerHTML = `<img class="boot-logo" src="${ICON('start')}" style="filter:brightness(0) invert(1)"><div class="boot-spinner"></div><div class="boot-text">Restarting</div>`;
  }
}

function hideBoot() {
  $('#boot-screen').classList.add('hidden');
  $('#boot-screen').innerHTML = '';
}

function resetSimulator() {
  state.nodes = createBaseSystemNodes();
  state.windows = [];
  state.selected = [];
  state.clipboard = { mode: null, ids: [] };
  state.wallpaper = 0;
  state.practice = resetAllPractice();
  persist();
  seedCurrentLevel();
  notify('Đã khôi phục dữ liệu ban đầu');
}

function renderClock() {
  const d = new Date();
  $('#clock-time').textContent = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  $('#clock-date').textContent = d.toLocaleDateString('vi-VN');
}

function renderFirstRun() {
  const host = $('#first-run');
  host.classList.toggle('hidden', !state.firstRun);
  if (!state.firstRun) return;

  host.innerHTML = `
    <div class="first-card">
      <h1>Windows Simulator for Education V2.1</h1>
      <p>Chọn giao diện để bắt đầu luyện tập 15 bài thực hành Quản lý Tệp & Thư mục ảo an toàn.</p>
      <div class="first-os">
        <button data-first-os="win11"><img src="${ICON('start', 'win11')}"><span>Windows 11</span></button>
        <button data-first-os="win10"><img src="${ICON('start', 'win10')}"><span>Windows 10</span></button>
      </div>
      <div class="first-note">Phím tắt cho giáo viên: Ctrl + Shift + T mở Teacher Panel.</div>
    </div>
  `;

  $$('[data-first-os]', host).forEach(b => b.addEventListener('click', () => {
    state.os = b.dataset.firstOs;
    state.firstRun = false;
    localStorage.setItem('windows-sim-v2-first', 'done');
    applyOS();
    renderAll();
  }));
}

function renderAll() {
  applyOS();
  renderDesktop();
  renderWindows();
  renderStart();
  renderSearch();
  renderQuick();
  renderTeacher();
  renderMissionHUD();
  renderFirstRun();
  renderClock();
}

// ==========================================
// GLOBAL EVENT LISTENERS
// ==========================================
$('#desktop-icons').addEventListener('dragover', e => e.preventDefault());
$('#desktop-icons').addEventListener('drop', e => {
  if (e.target.closest('.desktop-icon')) return;
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  if (id) moveNode(id, DESKTOP, 'drag');
});

$('#desktop').addEventListener('dragover', e => e.preventDefault());
$('#desktop').addEventListener('drop', e => {
  if (e.target.closest('.desktop-icon,.window,#mission-panel')) return;
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  if (id) moveNode(id, DESKTOP, 'drag');
});

$('#desktop').addEventListener('click', e => {
  if (e.target.closest('.desktop-icon,.window,#mission-panel')) return;
  setSelection([], DESKTOP, 'desktop');
  state.activeWindow = null;
  hideContext();
  renderTaskbar();
});

$('#desktop').addEventListener('contextmenu', e => {
  if (e.target.closest('.desktop-icon,.window,#mission-panel')) return;
  e.preventDefault();
  setSelection([], DESKTOP, 'desktop');
  showContext(e.clientX, e.clientY, 'blank', null, null);
});

$('#start-btn').addEventListener('click', e => {
  e.stopPropagation();
  state.startOpen = !state.startOpen;
  state.searchOpen = false;
  state.quickOpen = false;
  hideContext();
  renderStart();
  renderSearch();
  renderQuick();
  renderTaskbar();
});

$('#search-btn').addEventListener('click', e => {
  e.stopPropagation();
  state.searchOpen = !state.searchOpen;
  state.startOpen = false;
  state.quickOpen = false;
  state.searchQuery = '';
  renderStart();
  renderSearch();
  renderQuick();
  renderTaskbar();
  setTimeout(() => $('#search-panel input')?.focus(), 0);
});

$('#quick-btn').addEventListener('click', e => {
  e.stopPropagation();
  state.quickOpen = !state.quickOpen;
  state.startOpen = false;
  state.searchOpen = false;
  renderStart();
  renderSearch();
  renderQuick();
});

$('#clock-btn').addEventListener('click', () => {
  state.quickOpen = !state.quickOpen;
  renderQuick();
});

$('#show-desktop').addEventListener('click', showDesktop);
$$('.pinned-app').forEach(b => b.addEventListener('click', () => openApp(b.dataset.app)));

document.addEventListener('pointerdown', e => {
  if (!e.target.closest('#context-menu')) hideContext();
  if (!e.target.closest('#start-menu,#start-btn')) {
    if (state.startOpen) {
      state.startOpen = false;
      renderStart();
      renderTaskbar();
    }
  }
  if (!e.target.closest('#quick-panel,#quick-btn,#clock-btn')) {
    if (state.quickOpen) {
      state.quickOpen = false;
      renderQuick();
    }
  }
  if (!e.target.closest('#search-panel,#search-btn')) {
    if (state.searchOpen) {
      state.searchOpen = false;
      renderSearch();
      renderTaskbar();
    }
  }
});

document.addEventListener('keydown', e => {
  const typing = e.target.matches('input,textarea');
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
    e.preventDefault();
    toggleTeacher();
    return;
  }
  if (e.key === 'Escape') {
    hideContext();
    state.startOpen = false;
    state.searchOpen = false;
    state.quickOpen = false;
    renderStart();
    renderSearch();
    renderQuick();
    renderTaskbar();
    return;
  }
  if (typing) return;
  if (e.key === 'F2') {
    e.preventDefault();
    startRename();
    return;
  }
  if (e.key === 'Delete') {
    e.preventDefault();
    if (state.activeParent === RECYCLE) permanentlyDelete(state.selected);
    else deleteSelected();
    return;
  }
  if (e.key === 'Enter' && state.selected.length === 1) {
    openNode(state.selected[0]);
    return;
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    createNode('folder', state.activeParent);
    return;
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    e.preventDefault();
    copySelected('copy');
    return;
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'x') {
    e.preventDefault();
    copySelected('cut');
    return;
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'v') {
    e.preventDefault();
    pasteInto(state.activeParent);
    return;
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    const ids = children(state.activeParent).map(n => n.id);
    setSelection(ids, state.activeParent, state.activeSurface);
    return;
  }
  if (e.altKey && e.key === 'F4' && state.activeWindow) {
    e.preventDefault();
    closeWindow(state.activeWindow);
    return;
  }
});

window.addEventListener('resize', () => {
  state.windows.forEach(w => {
    if (!w.maximized) {
      w.x = Math.min(w.x, Math.max(0, innerWidth - 180));
      w.y = Math.min(w.y, Math.max(0, innerHeight - 120));
    }
  });
  renderWindows();
});

setInterval(renderClock, 1000);
renderAll();
