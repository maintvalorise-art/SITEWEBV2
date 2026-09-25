/* Valorise Maroc — logique du site */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Traductions (FR = texte du HTML, EN ci-dessous) ---------- */
  const EN = {
    'menu': 'Menu',
    'nav.range': 'Range', 'nav.process': 'Manufacturing', 'nav.nimp': 'ISPM 15', 'nav.unit': 'Our plant', 'nav.delivery': 'Delivery',
    'cta.quote': 'Request a quote', 'cta.this': 'Request a quote for this pallet',
    'hero.title': 'Industrial wood pallets, built and heat-treated in Tangier.',
    'hero.lead': 'New pallets in first-grade imported red pine, or reconditioned from your used ones. ISPM 15 heat-treated, stamped MA‑3483 and delivered by our own fleet.',
    'hero.range': 'See the range',
    'f1.b': 'Since 2014', 'f1.s': 'in Tanger Free Zone', 'f2.s': 'certified ISPM 15 / NIMP 15 producer', 'f3.s': 'of workshop dedicated to pallets', 'f4.b': '7 formats', 'f4.s': 'standard, plus custom designs',
    'lbl.deck': 'Deck', 'lbl.kind': 'Wood', 'lbl.boards': 'Top boards', 'lbl.area': 'Surface', 'lbl.mark': 'Stamp',
    'stage.hint': 'Drag to turn the pallet',
    'ctrl.format': 'Format', 'ctrl.custom': 'Custom', 'ctrl.len': 'Length', 'ctrl.wid': 'Width', 'ctrl.deck': 'Deck', 'ctrl.kind': 'Wood',
    'deck.closed': 'Closed', 'deck.open': 'Open', 'deck.closedF': 'Closed deck', 'deck.openF': 'Open deck',
    'kind.new': 'New', 'kind.rec': 'Recycled',
    'lines.title': 'Two production lines, one quality standard.',
    'lines.lead': 'The wood makes the pallet. We apply the same selection criteria to our new and our reconditioned pallets.',
    'new.title': 'New pallets in imported red pine',
    'new.p': 'Built exclusively from first-grade imported red pine, chosen for its density and strength-to-weight ratio. The same quality on every order, whatever the volume.',
    'rec.title': 'Recycled and reconditioned pallets',
    'rec.p': 'We collect your end-of-life pallets directly at your sites, sort the reusable timber and recondition it into structurally compliant pallets. You cut purchasing costs and waste at the same time.',
    'range.title': 'Standard range',
    'range.lead': 'Every format comes new or recycled, always ISPM 15 treated. Select a format to view it in 3D.',
    'range.see': 'View in 3D', 'range.std': 'Standard', 'range.customS': 'Free technical study', 'range.config': 'Configure',
    'range.note': 'Pallets from our workshop in Tanger Free Zone.',
    'proc.title': 'From the plank to your loading dock.',
    'proc.lead': 'Every pallet follows the same route, with a check at each station.',
    's1.t': 'Timber intake', 's1.p': 'Imported red pine inspected on arrival.',
    's2.t': 'Cutting', 's2.p': 'Boards, stringers and blocks cut to format.',
    's3.t': 'Assembly', 's3.p': 'Nailed to the pallet drawing.',
    's4.t': 'Quality check', 's4.p': 'Dimensions and strength: pass or reject.',
    's5.t': 'Heat treatment', 's5.p': '56 °C at the core, 30 minutes minimum.',
    's6.t': 'ISPM 15 stamp', 's6.p': 'MA-3483 HT mark burned into the wood.',
    's7.t': 'Delivery', 's7.p': 'By our own fleet, to your site.',
    'proc.rec': '<b>Recycled line:</b> used pallets collected at the client site, recoverable timber sorted, reconditioned, then the same heat treatment and stamp as new pallets.',
    'heat.title': '56 °C at the core, for 30 minutes. No exceptions.',
    'heat.lead': 'Every pallet goes through our industrial kiln. It is what ISPM 15 / NIMP 15 requires to eliminate insects, larvae and pests from wood packaging used in international trade.',
    'heat.scrub': 'Move through the cycle',
    'heat.note': 'Indicative core temperature curve. The orange band is the holding time required by the standard.',
    'heat.oven': 'Our heat treatment kiln at the Tanger Free Zone site.',
    'stamp.title': 'How to read our pallet stamp.',
    'stamp.lead': 'Burned into the wood after treatment, this mark proves the pallet can be imported into the EU, the USA and every IPPC member country. Tap any part of the stamp.',
    'd.ippc': 'Symbol of the International Plant Protection Convention: the pallet meets ISPM 15.',
    'd.ma': 'Country code for Morocco, where the pallet was treated.',
    'd.num': 'Producer number assigned to Valorise Maroc. Every pallet can be traced back to our site.',
    'd.ht': 'Heat Treatment: treated with heat, no chemicals.',
    'stamp.photo': 'The actual stamp, as it appears on our pallets.',
    'unit.area': 'Pallet plant, Tanger Free Zone',
    'unit.title': 'A plant dedicated entirely to pallets.',
    'unit.lead': 'Our Valorise 02 unit brings manufacturing, reconditioning and heat treatment together on one site.',
    'unit.l1': 'Production capacity being expanded for high-volume recurring contracts and export.',
    'unit.l2': 'Automation of the manufacturing line planned for 2027.',
    'unit.l3': 'Designed to your specification, with a free technical study.',
    'unit.l4': 'Modern industrial equipment, quality standards aligned with our Swiss group.',
    'unit.note': 'Capacity figures, schedules and volume commitments are shared as part of a quotation or a non-disclosure agreement.',
    'grp.title': 'Part of Fueltec Search Group',
    'grp.p': 'An international group under Swiss management. For our clients, that means stronger governance, supply continuity on long-term contracts and access to a commercial network across Europe and beyond.',
    'c.ch': 'Switzerland (HQ)', 'c.it': 'Italy', 'c.us': 'United States', 'c.ma': 'Morocco',
    'del.title': 'Delivered by our own fleet.',
    'del.lead': 'Our trucks leave Tangier for Morocco\'s main industrial zones, with logistics sized for recurring volumes.',
    'del.tfz': 'Our production base.', 'del.tac': 'The country\'s leading automotive hub.', 'del.afz': 'Atlantic free zone.',
    'del.all': 'All industrial zones', 'del.allp': 'Anywhere in Morocco, on request.',
    'q.title': 'Request a quote',
    'q.lead': 'Tell us what you need and we will come back with an offer. The form prepares your message: send it by WhatsApp or by email.',
    'q.company': 'Company', 'q.name': 'Name and role', 'q.phone': 'Phone', 'q.email': 'Email', 'q.pallet': 'Pallet required',
    'q.qty': 'Quantity per month', 'q.zone': 'Delivery zone', 'q.other': 'Other zone', 'q.msg': 'Details (load, use, export…)',
    'q.wa': 'Send on WhatsApp', 'q.mail': 'Send by email',
    'k.phone': 'Phone', 'k.mail': 'Email', 'k.addr': 'Address',
    'ft.grp': 'A Fueltec Search Group company'
  };
  const UI = {
    fr: { closed: 'Fermé', open: 'Ouvert', new: 'Neuf', recycled: 'Recyclé', palletLine: (c) => `Palette ${c.L}×${c.W} cm, plancher ${c.deck === 'closed' ? 'fermé' : 'ouvert'}, ${c.kind === 'new' ? 'neuve' : 'recyclée'}`,
      heatUp: 'Montée en température : le cœur du bois n\'a pas encore atteint 56 °C.',
      heatHold: (m) => `Palier à 56 °C ou plus : ${m} / 30 min`,
      heatDone: 'Cycle conforme : la palette peut recevoir le marquage HT.',
      needs: 'Indiquez votre société et un téléphone ou un e-mail pour que nous puissions vous répondre.',
      subject: 'Demande de devis palettes', greet: 'Bonjour Valorise Maroc, je souhaite un devis.',
      f: { company: 'Société', name: 'Contact', phone: 'Téléphone', email: 'E-mail', pallet: 'Palette', qty: 'Quantité / mois', zone: 'Livraison', msg: 'Précisions' },
      min: 'min' },
    en: { closed: 'Closed', open: 'Open', new: 'New', recycled: 'Recycled', palletLine: (c) => `Pallet ${c.L}×${c.W} cm, ${c.deck} deck, ${c.kind}`,
      heatUp: 'Heating up: the wood core has not reached 56 °C yet.',
      heatHold: (m) => `Holding at 56 °C or above: ${m} / 30 min`,
      heatDone: 'Cycle compliant: the pallet can receive the HT stamp.',
      needs: 'Enter your company and a phone number or email so we can reply.',
      subject: 'Pallet quotation request', greet: 'Hello Valorise Maroc, I would like a quotation.',
      f: { company: 'Company', name: 'Contact', phone: 'Phone', email: 'Email', pallet: 'Pallet', qty: 'Quantity / month', zone: 'Delivery', msg: 'Details' },
      min: 'min' }
  };

  const FR = {};
  $$('[data-i18n]').forEach(el => { FR[el.dataset.i18n] = el.innerHTML; });
  let lang = 'fr';
  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    const dict = l === 'en' ? EN : FR;
    $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    try { localStorage.setItem('vm-lang', l); } catch (e) {}
    updateLabel(); heatUpdate();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------- Menu mobile ---------- */
  const menuBtn = $('.menu-btn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  $$('#nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));

  /* ---------- Configurateur 3D ---------- */
  const cfg = { fmt: '120x100', L: 120, W: 100, deck: 'closed', kind: 'new', boards: 0 };
  const stage = $('#stage');
  const p3d = window.THREE ? new window.Pallet3D(stage) : null;
  if (!window.THREE) stage.classList.add('no-gl');

  function rebuild(quick) {
    if (p3d && p3d.ok) cfg.boards = p3d.build(cfg, { quick });
    else cfg.boards = cfg.deck === 'closed' ? Math.round((cfg.W + 1.5) / 11.8) : Math.round(cfg.W / 21) + 1;
    updateLabel();
  }
  function updateLabel() {
    const u = UI[lang];
    $('#lbl-format').textContent = `${cfg.L} × ${cfg.W}`;
    $('#lbl-deck').textContent = u[cfg.deck];
    $('#lbl-kind').textContent = u[cfg.kind];
    $('#lbl-boards').textContent = cfg.boards;
    const area = (cfg.L * cfg.W / 10000);
    $('#lbl-area').textContent = (lang === 'fr' ? area.toFixed(2).replace('.', ',') : area.toFixed(2)) + ' m²';
  }
  function press(groupSel, attr, val) {
    $$(groupSel + ' .chip').forEach(c => c.setAttribute('aria-pressed', String(c.dataset[attr] === val)));
  }
  function setFormat(fmt, deck) {
    cfg.fmt = fmt;
    if (fmt === 'custom') { cfg.L = +$('#in-l').value; cfg.W = +$('#in-w').value; }
    else { const [l, w] = fmt.split('x').map(Number); cfg.L = l; cfg.W = w; }
    if (deck) { cfg.deck = deck; press('#chips-deck', 'deck', deck); }
    $('#custom-dims').classList.toggle('on', fmt === 'custom');
    press('#chips-format', 'fmt', fmt);
    rebuild(true);
  }
  $$('#chips-format .chip').forEach(c => c.addEventListener('click', () => setFormat(c.dataset.fmt)));
  $$('#chips-deck .chip').forEach(c => c.addEventListener('click', () => { cfg.deck = c.dataset.deck; press('#chips-deck', 'deck', cfg.deck); rebuild(true); }));
  $$('#chips-kind .chip').forEach(c => c.addEventListener('click', () => { cfg.kind = c.dataset.kind; press('#chips-kind', 'kind', cfg.kind); rebuild(true); }));
  let dimTimer;
  ['in-l', 'in-w'].forEach(id => $('#' + id).addEventListener('input', () => {
    $('#out-l').textContent = $('#in-l').value + ' cm';
    $('#out-w').textContent = $('#in-w').value + ' cm';
    cfg.L = +$('#in-l').value; cfg.W = +$('#in-w').value; updateLabel();
    clearTimeout(dimTimer); dimTimer = setTimeout(() => rebuild(true), 120);
  }));
  $$('#formats .fmt').forEach(b => b.addEventListener('click', () => {
    setFormat(b.dataset.fmt, b.dataset.deck);
    $('#configurateur').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));
  $('#quote-this').addEventListener('click', () => { $('#f-pallet').value = UI[lang].palletLine(cfg); });

  /* ---------- Courbe de traitement thermique ---------- */
  const X0 = 50, X1 = 590, Y0 = 270, Y1 = 20, TMAX = 90, CMAX = 80;
  const sx = t => X0 + (t / TMAX) * (X1 - X0);
  const sy = c => Y0 - (c / CMAX) * (Y0 - Y1);
  const REACH = 34, HOLD_END = REACH + 30;
  function core(t) { // courbe indicative
    if (t <= REACH) return 20 + 36 * (1 - Math.pow(1 - t / REACH, 1.7));
    if (t <= HOLD_END + 6) return 56 + 5 * (1 - Math.exp(-(t - REACH) / 6));
    return 56 + 5 * (1 - Math.exp(-(HOLD_END + 6 - REACH) / 6)) - (t - HOLD_END - 6) * 1.05;
  }
  function pathTo(tEnd) {
    let d = ''; for (let t = 0; t <= tEnd + 0.001; t += 0.5) d += (t ? 'L' : 'M') + sx(t).toFixed(1) + ' ' + sy(core(t)).toFixed(1);
    return d;
  }
  (function drawAxes() {
    const g = $('#heat-grid-lines'); let h = '';
    [0, 20, 40, 60, 80].forEach(c => { h += `<line x1="${X0}" x2="${X1}" y1="${sy(c)}" y2="${sy(c)}" stroke="rgba(255,255,255,.08)"/><text x="${X0 - 8}" y="${sy(c) + 4}" text-anchor="end" fill="#8FA898" font-size="12">${c}</text>`; });
    [0, 15, 30, 45, 60, 75, 90].forEach(t => { h += `<text x="${sx(t)}" y="${Y0 + 22}" text-anchor="middle" fill="#8FA898" font-size="12">${t}</text>`; });
    h += `<text x="${X1}" y="${Y0 + 22}" text-anchor="end" fill="#8FA898" font-size="12" dx="0" dy="0"></text>`;
    g.innerHTML = h;
    $('#heat-56').setAttribute('y1', sy(56)); $('#heat-56').setAttribute('y2', sy(56));
    $('#heat-56-lbl').setAttribute('y', sy(56) - 8);
    $('#heat-path').setAttribute('d', pathTo(TMAX)); $('#heat-path').setAttribute('opacity', '.35');
    const z = $('#heat-zone'); z.setAttribute('x', sx(REACH)); z.setAttribute('width', sx(HOLD_END) - sx(REACH)); z.setAttribute('y', Y1); z.setAttribute('height', Y0 - Y1);
  })();
  const range = $('#heat-range');
  function heatUpdate() {
    const t = +range.value, c = core(t), u = UI[lang];
    $('#heat-path-done').setAttribute('d', pathTo(t));
    const dot = $('#heat-dot'); dot.setAttribute('cx', sx(t)); dot.setAttribute('cy', sy(c));
    $('#heat-temp').textContent = `${Math.round(c)} °C · ${t} ${u.min}`;
    const st = $('#heat-state');
    st.classList.remove('ok');
    if (t < REACH) st.textContent = u.heatUp;
    else if (t < HOLD_END) st.textContent = u.heatHold(t - REACH);
    else { st.textContent = u.heatDone; st.classList.add('ok'); }
  }
  range.addEventListener('input', heatUpdate);
  // lecture automatique du cycle quand la section devient visible (une seule fois)
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return; io.disconnect();
      if (+range.value !== 0) return;
      let t = 0; const iv = setInterval(() => { t += 1; range.value = t; heatUpdate(); if (t >= 70 || document.activeElement === range) clearInterval(iv); }, 40);
    }, { threshold: 0.5 });
    io.observe($('#heat-chart'));
  }

  /* ---------- Décodeur du marquage ---------- */
  function showPart(p) {
    $$('.stamp-part').forEach(g => g.classList.toggle('on', g.dataset.part === p));
    $$('#decode button').forEach(b => b.classList.toggle('on', b.dataset.part === p));
  }
  $$('.stamp-part').forEach(g => {
    g.addEventListener('click', () => showPart(g.dataset.part));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPart(g.dataset.part); } });
  });
  $$('#decode button').forEach(b => b.addEventListener('click', () => showPart(b.dataset.part)));
  showPart('num');

  /* ---------- Formulaire de devis ---------- */
  const WA = '212666285239', MAIL = 'info@valorise.ma';
  function collect() {
    const f = $('#quote-form'), u = UI[lang], out = [];
    const v = n => f.elements[n].value.trim();
    if (!v('company') || !(v('phone') || v('email'))) { $('#form-msg').textContent = u.needs; return null; }
    $('#form-msg').textContent = '';
    out.push(u.greet, '');
    ['company', 'name', 'phone', 'email', 'pallet', 'qty', 'zone', 'msg'].forEach(k => { if (v(k)) out.push(`${u.f[k]} : ${v(k)}`); });
    return out.join('\n');
  }
  $('#send-wa').addEventListener('click', () => { const t = collect(); if (t) window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`, '_blank', 'noopener'); });
  $('#send-mail').addEventListener('click', () => { const t = collect(); if (t) location.href = `mailto:${MAIL}?subject=${encodeURIComponent(UI[lang].subject)}&body=${encodeURIComponent(t)}`; });

  /* ---------- Init ---------- */
  $('#year').textContent = new Date().getFullYear();
  rebuild(false);
  heatUpdate();
  let saved = null; try { saved = localStorage.getItem('vm-lang'); } catch (e) {}
  if (saved === 'en') setLang('en');
})();
