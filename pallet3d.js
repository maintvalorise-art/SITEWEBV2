/* Palette 3D — Three.js r128. Unités : 1 = 1 cm, mise à l'échelle dans la scène. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function woodTexture(base, seed) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = base; g.fillRect(0, 0, c.width, c.height);
    let s = seed || 1;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 46; i++) {
      const y = rnd() * 64, a = 0.05 + rnd() * 0.12, amp = 1 + rnd() * 3, f = 0.004 + rnd() * 0.02;
      g.strokeStyle = `rgba(120,70,25,${a})`;
      g.lineWidth = 0.6 + rnd() * 1.6;
      g.beginPath();
      for (let x = 0; x <= 512; x += 8) g.lineTo(x, y + Math.sin(x * f + i) * amp);
      g.stroke();
    }
    for (let k = 0; k < 3; k++) { // nœuds
      const x = rnd() * 512, y = 10 + rnd() * 44, r = 3 + rnd() * 5;
      const gr = g.createRadialGradient(x, y, 0, x, y, r * 2);
      gr.addColorStop(0, 'rgba(90,50,15,.55)'); gr.addColorStop(1, 'rgba(90,50,15,0)');
      g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, r * 2.2, r, 0, 0, Math.PI * 2); g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  function stampTexture() {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 170;
    const g = c.getContext('2d');
    g.strokeStyle = g.fillStyle = 'rgba(43,28,16,.9)';
    g.lineWidth = 8; g.strokeRect(8, 8, 240, 154);
    g.beginPath(); g.moveTo(78, 8); g.lineTo(78, 162); g.stroke();
    g.lineWidth = 4; g.beginPath(); g.moveTo(34, 26); g.lineTo(34, 150);
    for (let i = 0; i < 4; i++) { const y = 50 + i * 22; g.moveTo(34, y); g.lineTo(20, y - 12); g.moveTo(34, y); g.lineTo(48, y - 12); }
    g.stroke();
    g.font = '900 16px Archivo, Arial'; g.textAlign = 'center';
    ['I', 'P', 'P', 'C'].forEach((l, i) => g.fillText(l, 64, 44 + i * 34));
    g.textAlign = 'left'; g.font = '900 40px Archivo, Arial';
    g.fillText('MA-', 94, 58); g.fillText('3483', 94, 106); g.fillText('HT', 94, 152);
    return new THREE.CanvasTexture(c);
  }

  function Pallet3D(el) {
    this.el = el;
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) { el.classList.add('no-gl'); this.ok = false; return; }
    this.ok = true;
    const r = this.renderer;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.outputEncoding = THREE.sRGBEncoding;
    el.prepend(r.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 4 / 3, 1, 5000);
    this.scene.add(new THREE.HemisphereLight(0xfff4e0, 0x1b4631, 0.55));
    const sun = new THREE.DirectionalLight(0xfff1dc, 0.75);
    sun.position.set(120, 260, 160); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -150, right: 150, top: 150, bottom: -150, near: 10, far: 700 });
    this.scene.add(sun);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), new THREE.ShadowMaterial({ opacity: 0.28 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
    this.scene.add(ground);

    this.group = new THREE.Group(); this.scene.add(this.group);
    this.rotY = -0.65; this.autoRotate = !reduce; this.parts = [];
    this.stampTex = stampTexture();

    this._bindDrag();
    this._resize();
    new ResizeObserver(() => this._resize()).observe(el);
    this._last = performance.now();
    const loop = (t) => { this._tick(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }

  Pallet3D.prototype._resize = function () {
    const w = this.el.clientWidth, h = this.el.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this._frame();
  };

  Pallet3D.prototype._frame = function () {
    const span = Math.max(this.L || 120, this.W || 100);
    const d = span * (this.camera.aspect < 1 ? 3.0 : 2.2);
    this.camera.position.set(0, d * 0.40, d * 0.92);
    this.camera.lookAt(0, 14, 0);
  };

  Pallet3D.prototype._bindDrag = function () {
    let down = false, x0 = 0, r0 = 0;
    const el = this.el;
    el.addEventListener('pointerdown', (e) => { down = true; x0 = e.clientX; r0 = this.rotY; this.autoRotate = false; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e) => { if (down) this.rotY = r0 + (e.clientX - x0) * 0.01; });
    const up = () => { down = false; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.tabIndex = 0;
    el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { this.rotY -= 0.2; this.autoRotate = false; }
      if (e.key === 'ArrowRight') { this.rotY += 0.2; this.autoRotate = false; }
    });
  };

  /* cfg : { L, W, deck:'closed'|'open', kind:'new'|'recycled' } — retourne le nombre de planches de dessus */
  Pallet3D.prototype.build = function (cfg, opts) {
    const first = !this.parts.length;
    this.parts.forEach(p => { this.group.remove(p.mesh); p.mesh.geometry.dispose(); });
    this.parts = [];
    const L = cfg.L, W = cfg.W, T = 2.2, BH = 7.8, BK = Math.min(10, W / 6), BW = 10;
    this.L = L; this.W = W; this._frame();

    const recycled = cfg.kind === 'recycled';
    const baseNew = ['#E8CB94', '#E3C088', '#EDD3A2', '#E0BC80'];
    const baseRec = ['#CDB083', '#B89A6E', '#D8BD8E', '#A98F68', '#C7A676', '#9C8666'];
    const texCache = {};
    const matFor = (i) => {
      const pal = recycled ? baseRec : baseNew;
      const col = pal[i % pal.length];
      if (!texCache[col]) texCache[col] = new THREE.MeshStandardMaterial({ map: woodTexture(col, 7 + i * 13), roughness: 0.85, metalness: 0 });
      return texCache[col];
    };

    let k = 0;
    const add = (w, h, d, x, y, z, stage, rotTex) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, matFor(k++));

      mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.position.set(x, y, z);
      this.group.add(mesh);
      this.parts.push({ mesh, y, stage });
      return mesh;
    };

    const xs = [-L / 2 + BK / 2, 0, L / 2 - BK / 2];
    const zs = [-W / 2 + BK / 2, 0, W / 2 - BK / 2];
    // 1. semelles (sur la longueur)
    zs.forEach(z => add(L, T, BK, 0, T / 2, z, 0));
    // 2. dés
    xs.forEach(x => zs.forEach(z => add(BK, BH, BK, x, T + BH / 2, z, 1)));
    // 3. traverses (sur la largeur)
    xs.forEach(x => add(BW, T, W, x, T + BH + T / 2, 0, 2));
    // 4. planches de dessus (sur la longueur)
    const bw = 10;
    let n = cfg.deck === 'closed' ? Math.max(4, Math.round((W + 1.5) / (bw + 1.8))) : Math.max(4, Math.round(W / 21) + 1);
    n = Math.min(n, Math.floor((W + 0.5) / (bw + 0.5)));
    for (let i = 0; i < n; i++) {
      const z = n === 1 ? 0 : -W / 2 + bw / 2 + i * (W - bw) / (n - 1);
      add(L, T, bw, 0, T + BH + T + T / 2, z, 3);
    }
    // marquage NIMP 15 sur les dés centraux avant/arrière
    const sw = Math.min(BK * 0.9, 9), sh = sw * 0.66;
    [1, -1].forEach(side => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshBasicMaterial({ map: this.stampTex, transparent: true }));
      const y = T + BH / 2, z = side * (W / 2 + 0.06);
      m.position.set(0, y, z); if (side < 0) m.rotation.y = Math.PI;
      this.group.add(m); this.parts.push({ mesh: m, y, stage: 1 });
    });

    // centrage vertical
    this.group.position.y = 0;

    // animation d'assemblage
    const now = performance.now();
    const slow = first && !(opts && opts.quick);
    const stageGap = slow ? 420 : 140, itemGap = slow ? 45 : 12, lift = slow ? 60 : 25;
    let idx = 0;
    this.parts.forEach(p => {
      if (reduce) { p.start = 0; return; }
      p.start = now + p.stage * stageGap + (idx++) * itemGap;
      p.dur = slow ? 520 : 260; p.lift = lift;
      p.mesh.position.y = p.y + lift; p.mesh.visible = false;
    });
    return n;
  };

  Pallet3D.prototype._tick = function (t) {
    const dt = Math.min(0.05, (t - this._last) / 1000); this._last = t;
    if (this.autoRotate) this.rotY += dt * 0.22;
    this.group.rotation.y = this.rotY;
    this.parts.forEach(p => {
      if (!p.start) { p.mesh.visible = true; p.mesh.position.y = p.y; return; }
      const k = (t - p.start) / p.dur;
      if (k < 0) { p.mesh.visible = false; return; }
      p.mesh.visible = true;
      const e = k >= 1 ? 1 : 1 - Math.pow(1 - k, 3);
      p.mesh.position.y = p.y + p.lift * (1 - e);
      if (k >= 1) p.start = 0;
    });
    this.renderer.render(this.scene, this.camera);
  };

  window.Pallet3D = Pallet3D;
})();
