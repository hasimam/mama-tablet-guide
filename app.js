'use strict';
const key = 'mama-tablet-guide-v2';
let lang = 'ar', checked = [], storageAvailable = true;
try {
  const value = JSON.parse(localStorage.getItem(key) || '{}');
  if (value && typeof value === 'object') {
    lang = value.lang === 'de' ? 'de' : 'ar';
    checked = Array.isArray(value.checked) ? [...new Set(value.checked.filter(n => Number.isInteger(n) && n >= 0 && n < 10))] : [];
  }
} catch { storageAvailable = false; }
const el = id => document.getElementById(id);
function save() {
  try { localStorage.setItem(key, JSON.stringify({lang, checked})); storageAvailable = true; }
  catch { storageAvailable = false; }
  el('saved').textContent = content[lang][storageAvailable ? 'saved' : 'storage'];
}
function update() {
  const t = content[lang];
  el('meter').value = checked.length;
  el('count').textContent = `${checked.length} ${t.of} ${t.items.length}`;
  el('done').textContent = checked.length === t.items.length ? t.complete : '';
}
function render() {
  const t = content[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = lang === 'ar' ? 'دليل نقل بيانات ماما | Samsung إلى HONOR' : 'Mamas Tablet-Umzug | Samsung zu HONOR';
  for (const id of ['subtitle','start','footer','sources','skip','print']) el(id).textContent = t[id];
  el('heading').innerHTML = t.heading;
  el('checkLink').textContent = t.check;
  el('saved').textContent = t[storageAvailable ? 'saved' : 'storage'];
  el('language').textContent = lang === 'ar' ? 'Deutsch' : 'العربية';
  el('language').lang = lang === 'ar' ? 'de' : 'ar';
  el('language').dir = lang === 'ar' ? 'ltr' : 'rtl';
  el('nav').setAttribute('aria-label', lang === 'ar' ? 'مراحل النقل' : 'Übertragungsschritte');
  el('nav').replaceChildren(); el('guide').replaceChildren();
  t.sections.forEach((section, i) => {
    const a = document.createElement('a'); a.href = '#step-' + (i+1);
    const n = document.createElement('span'); n.textContent = String(i+1).padStart(2,'0');
    a.append(n, document.createTextNode(section.title)); el('nav').append(a);
    const card = document.createElement('section'); card.className = 'card'; card.id = 'step-' + (i+1);
    if (i === 5) {
      card.innerHTML = `<span class="tag">${t.progress}</span><h2>${t.check}</h2><div class="progress-label"><span id="count" aria-live="polite" role="status"></span><span>✓</span></div><progress id="meter" max="10" value="0" aria-label="${t.progress}"></progress><div id="checks"></div><p id="done" role="status"></p><button id="reset" type="button">${t.reset}</button>`;
    } else card.innerHTML = section.body;
    el('guide').append(card);
  });
  t.items.forEach((text, i) => {
    const label = document.createElement('label'); label.className = 'check';
    const input = document.createElement('input'); input.type = 'checkbox'; input.checked = checked.includes(i);
    input.addEventListener('change', () => {
      checked = input.checked ? [...new Set([...checked, i])] : checked.filter(n => n !== i);
      save(); update();
    });
    const span = document.createElement('span'); span.textContent = text;
    label.append(input, span); el('checks').append(label);
  });
  el('reset').onclick = () => {
    if (!confirm(t.confirm)) return;
    checked = []; el('checks').querySelectorAll('input').forEach(input => {input.checked = false;}); save(); update();
  };
  update();
}
el('language').onclick = () => {lang = lang === 'ar' ? 'de' : 'ar'; save(); render();};
el('print').onclick = () => window.print();
window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach(d => {d.dataset.wasOpen = String(d.open); d.open = true;}));
window.addEventListener('afterprint', () => document.querySelectorAll('details').forEach(d => {d.open = d.dataset.wasOpen === 'true';}));
render();
