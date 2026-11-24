// Scent Theory · the whole experience as one component.
// State lives in this.state; renderVals() turns it into the values the template below reads.
import { html } from './vendor/lit-html/lit-html.js';
import { ref } from './vendor/lit-html/directives/ref.js';
import { DCLogic, mount } from './runtime.js';

const PARA2 = 'Smell can’t travel through a screen, but it never works alone. People reliably link scents to shapes, sounds, colors, memories and even moods. Each trial uses one of those links to point you toward the scents you’re most likely to love.';
const BARS = [['#FFE033', 'Lemon', '#333331'], ['#AEF0D2', 'Mint', '#333331'], ['#FF1F8B', 'Rose', '#F9F9F7'], ['#E0123F', 'Crimson', '#F9F9F7'], ['#D1A3FF', 'Lilac', '#333331'], ['#B0652C', 'Caramel', '#F9F9F7'], ['#4A0204', 'Oxblood', '#F9F9F7'], ['#8B9B5C', 'Moss', '#F9F9F7']];
const MEMS = [
  ['A warm kitchen', 'Something baking, someone cooking.', 'memory-01-warm-kitchen', 'memory-01-warm-kitchen'],
  ['A fruit market', 'Crates of ripe things in the sun.', 'memory-03-fruit-market', 'memory-03-fruit-market'],
  ['The coast', 'Salt air, sunscreen, cold wind.', 'memory-05-coast', 'memory-05-coast'],
  ['Laundry day', 'Clean cotton, a warm dryer.', 'memory-07-laundry', 'memory-07-laundry'],
  ['Rain on hot pavement', 'The minute before a storm breaks.', 'memory-02-rain-on-pavement', 'memory-02-rain-on-pavement'],
  ['A garden after watering', 'Wet leaves, open flowers.', 'memory-04-garden', 'memory-04-garden'],
  ['An old library or chapel', 'Paper, polished wood, a little smoke.', 'memory-06-library', 'memory-06-library'],
  ['A candlelit evening', 'Late, low light, wool blankets.', 'memory-08-candlelit-evening', 'memory-08-candlelit-evening']];
const FAMS = [['Fresh citrus', '#3FC9C3', '63,201,195'], ['Soft floral', '#A290F8', '162,144,248'], ['Warm amber', '#D9963A', '217,150,58']];
const NAMES = { FL: 'Citrus Bloom', FA: 'Bright Ember', LF: 'Morning Petal', LA: 'Velvet Bloom', AF: 'Sunlit Amber', AL: 'Velvet Ember' };
const COLOR_TOP = [['Bergamot', 'Fresh citrus'], ['Spearmint', 'Fresh citrus'], ['Pink pepper', 'Soft floral'], ['Blackcurrant', 'Soft floral'], ['Lavender', 'Soft floral'], ['Cardamom', 'Warm amber'], ['Saffron', 'Warm amber'], ['Galbanum', 'Fresh citrus']];
const MEM_BASE = [['Vanilla', 'Warm amber'], ['Fig wood', 'Fresh citrus'], ['Ambrette', 'Fresh citrus'], ['White musk', 'Soft floral'], ['Vetiver', 'Fresh citrus'], ['Green musk', 'Soft floral'], ['Cedarwood', 'Warm amber'], ['Benzoin', 'Warm amber']];
const WORDS = [['citrus', 'aromatic', 'green', 'eau fraîche'], ['floral', 'powdery', 'musky', 'petal'], ['amber', 'gourmand', 'woody', 'resinous']];
const WORD = 'Scent';
export class Component extends DCLogic {
  S() { return Object.assign({ cmp: 0, cmpIn: false, cStep: -1, cBar: 0, res: 0, resIn: false, profile: null, src: false, share: 0, toast: '', hasLast: false, t5: 0, t5In: false, moved5: false, t4: 0, t4In: false, t4Ready: false, memHover: -1, memPick: -1, t3: 0, t3In: false, t3Ready: false, barHover: -1, pick: -1, cube: false, ov: 0, trIn: false, moved: false, t2: 0, t2In: false, moved2: false, playing: false, active: -1, p2: false, risen: false, tag: false, hint: false, scrolled: false }, this.state || {}); }
  renderVals() {
    const s = this.S();
    if (!this._h) {
      const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.reduce = reduce;
      this._h = {
        setRoot: (el) => { if (el && el !== this.root) { this.root = el; el.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href="#sources"]'); if (a) { e.preventDefault(); this.openSources(); return; } const hm = e.target.closest && e.target.closest('a[href="#home"]'); if (hm) { e.preventDefault(); this.goHome(); } });
          let tx = 0, ty = 0;
          el.addEventListener('touchstart', (e) => { const p = e.touches[0]; tx = p.clientX; ty = p.clientY; }, { passive: true });
          el.addEventListener('touchmove', (e) => {
            if (this.trialOpen || this.S().res || this.S().src) return;
            const p = e.touches[0], dx = tx - p.clientX, dy = ty - p.clientY; tx = p.clientX; ty = p.clientY;
            this.scrollBy((Math.abs(dx) > Math.abs(dy) ? dx : dy) * 2.2);
          }, { passive: true });
          this._esc = (e) => { if (e.key === 'Escape') { if (this.S().share) this.closeShare(); else if (this.S().src) this.closeSources(); } }; window.addEventListener('keydown', this._esc);
          setTimeout(() => { try { if (localStorage.getItem('scentTheory.lastProfile')) this.setState({ hasLast: true }); } catch (_) {} }, 0); } },
        setDot: (el) => { if (el) this.dotEl = el; },
        setLine: (el) => { if (el) this.lineEl = el; },
        setTrack: (el) => { if (el) this.track = el; },
        setWord: (el) => { if (el) this.word = el; },
        setTag: (el) => { if (el) this.tagEl = el; },
        setCanvas: (el) => { if (el && el !== this.cv) { this.cv = el; this.boot(); } },
        onWheel: (e) => this.trialOpen ? null : this.scrollBy((e.deltaX || 0) + (e.deltaY || 0)),
        advance: () => this.scrollBy(this.root ? this.root.clientWidth : 1280),
        on0: () => this.setState({ active: 0 }), on1: () => this.setState({ active: 1 }), on2: () => this.setState({ active: 2 }),
        on3: () => this.setState({ active: 3 }), on4: () => this.setState({ active: 4 }),
        off: () => this.setState({ active: -1 }),
        setBegin: (el) => { if (el) this.beginEl = el; },
        setHt: (el) => { if (el) this.htCv = el; },
        setIntro: (el) => { if (el) this.introEl = el; },
        setTr1: (el) => { if (el) this.tr1El = el; },
        setTr2: (el) => { if (el) this.tr2El = el; },
        barEnter: [0,1,2,3,4,5,6,7].map((i) => () => this.setState({ barHover: i })),
        barPick: [0,1,2,3,4,5,6,7].map((i) => () => this.setState({ pick: i })),
        setFill: (el) => { if (el) this.fillEl = el; },
        setThumb: (el) => { if (el) this.thumbEl = el; },
        setEdge: (el) => { if (el) this.edgeEl = el; },
        setSlider: (el) => { if (el && el !== this.sliderEl) { this.sliderEl = el; this.bindSlider(el); } },
        onShape: (e) => { this.shapeTarget = (+e.target.value) / 100; },
        beginTrials: () => this.openTrial(),
        backTrial: () => this.closeTrial(),
        nextTrial: () => { if (this.S().moved) this.openTrial2(); },
        back2: () => this.closeTrial2(),
        next2: () => { if (this.S().moved2) this.openTrial3(); },
        back3: () => this.closeTrial3(),
        next3: () => { if (this.S().pick >= 0) this.openTrial4(); },
        back4: () => this.closeTrial4(),
        next4: () => { if (this.S().memPick >= 0) this.openTrial5(); },
        back5: () => this.closeTrial5(),
        next5: () => { if (this.S().moved5) this.openCompose(); },
        setCmp: (el) => { if (el) this.cmpEl = el; },
        setCmpCv: (el) => { if (el) this.cmpCv = el; },
        setRes: (el) => { if (el) this.resEl = el; },
        setResCv: (el) => { if (el) this.resCv = el; },
        setResScroll: (el) => { if (el) this.resScroll = el; },
        setShCv: (el) => { if (el) this.shCv = el; },
        setMemName: (el) => { if (el) this.memNameEl = el; },
        retake: () => this.retake(),
        copyProfile: () => this.copyProfile(),
        openShare: () => this.openShare(),
        closeShare: () => this.closeShare(),
        shBackdrop: (e) => { if (e && e.target === e.currentTarget) this.closeShare(); },
        downloadShare: () => this.downloadShare(),
        closeSources: () => this.closeSources(),
        seeLast: () => this.seeLast(),
        setTr5: (el) => { if (el) this.tr5El = el; },
        setCrowd: (el) => { if (el) this.crowdCv = el; },
        setFill5: (el) => { if (el) this.fill5El = el; },
        setThumb5: (el) => { if (el) this.thumb5El = el; },
        setSlider5: (el) => { if (el && el !== this.slider5El) { this.slider5El = el; this.bindSocial(el); } },
        setBf: [0,1,2].map((i) => (el) => { if (el) { this.bfEl = this.bfEl || []; this.bfEl[i] = el; } }),
        setBp: [0,1,2].map((i) => (el) => { if (el) { this.bpEl = this.bpEl || []; this.bpEl[i] = el; } }),
        memOut: () => { this.memH = -1; this.setState({ memHover: -1 }); },
        memEnter: [0,1,2,3,4,5,6,7].map((i) => () => { this.memH = i; this.setState({ memHover: i }); }),
        memPickH: [0,1,2,3,4,5,6,7].map((i) => () => { this.memP = i; this.setState({ memPick: i }); }),
        setTr4: (el) => { if (el) this.tr4El = el; },
        memCv: [0,1,2,3,4,5,6,7].map((i) => (el) => { if (el) { this.memCvs = this.memCvs || []; this.memCvs[i] = el; } }),
        barsOut: () => this.setState({ barHover: -1 }),
        setTr3: (el) => { if (el) this.tr3El = el; },
        togglePlay: () => this.togglePlay(),
        setWv: (el) => { if (el) this.wvCv = el; },
        setHz: (el) => { if (el) this.hzEl = el; },
        setNote: (el) => { if (el) this.noteEl = el; },
        setFill2: (el) => { if (el) this.fill2El = el; },
        setThumb2: (el) => { if (el) this.thumb2El = el; },
        setSlider2: (el) => { if (el && el !== this.slider2El) { this.slider2El = el; this.bindPitch(el); } },
      };
      this.ticks = Array.from({ length: 41 }, (_, i) => ({ x: (i / 40 * 100).toFixed(3), h: i % 20 === 0 ? 9 : i % 5 === 0 ? 6 : 3 }));
    }
    const h = this._h;
    return {
      setRoot: h.setRoot, setDot: h.setDot, setLine: h.setLine, setTrack: h.setTrack, setWord: h.setWord, setTag: h.setTag,
      setCanvas: h.setCanvas, onWheel: h.onWheel, advance: h.advance, ticks: this.ticks,
      cursor: this.reduce ? 'auto' : 'none',
      letters: WORD.split('').map((ch, i) => ({ ch: ch, y: s.risen ? 0 : 104, delay: (i * 0.065).toFixed(3) })),
      tagOp: s.tag ? 1 : 0, tagY: s.tag ? 0 : 10,
      hintOp: s.hint && !s.scrolled ? 1 : 0,
      next5: h.next5, setCmp: h.setCmp, setCmpCv: h.setCmpCv, setRes: h.setRes, setResCv: h.setResCv, setResScroll: h.setResScroll, setShCv: h.setShCv, setMemName: h.setMemName,
      retake: h.retake, copyProfile: h.copyProfile, openShare: h.openShare, closeShare: h.closeShare, shBackdrop: h.shBackdrop, downloadShare: h.downloadShare, closeSources: h.closeSources, seeLast: h.seeLast,
      lastDisp: s.hasLast ? 'inline-block' : 'none',
      cmpVis: s.cmp && s.res !== 2 ? 'visible' : 'hidden', cmpPE: s.cmp === 2 ? 'auto' : 'none', cmpHidden: s.cmp === 2 ? 'false' : 'true',
      cmpOp: s.cmpIn ? 1 : 0, cmpTy: s.cmpIn ? 0 : 14, cBar: s.cBar, cBarDur: s.cBar ? 3.4 : 0,
      cA: 'Reading your'.split('').map((ch, i) => ({ ch: ch === ' ' ? ' ' : ch, y: s.cmpIn ? 0 : 104, delay: (0.1 + i * 0.03).toFixed(3) })),
      cB: 'senses.'.split('').map((ch, i) => ({ ch: ch, y: s.cmpIn ? 0 : 104, delay: (0.3 + i * 0.03).toFixed(3) })),
      cRowOp0: s.cmpIn ? 1 : 0, cRowY0: s.cmpIn ? 0 : 10, cSt0: s.cStep > 0 ? 'DONE \u2713' : s.cStep === 0 ? 'READING\u2026' : 'WAITING', cStC0: s.cStep > 0 ? '#F9F9F7' : s.cStep === 0 ? '#FDFF71' : '#6B6B67',
      cRowOp1: s.cmpIn ? 1 : 0, cRowY1: s.cmpIn ? 0 : 10, cSt1: s.cStep > 1 ? 'DONE \u2713' : s.cStep === 1 ? 'READING\u2026' : 'WAITING', cStC1: s.cStep > 1 ? '#F9F9F7' : s.cStep === 1 ? '#FDFF71' : '#6B6B67',
      cRowOp2: s.cmpIn ? 1 : 0, cRowY2: s.cmpIn ? 0 : 10, cSt2: s.cStep > 2 ? 'DONE \u2713' : s.cStep === 2 ? 'READING\u2026' : 'WAITING', cStC2: s.cStep > 2 ? '#F9F9F7' : s.cStep === 2 ? '#FDFF71' : '#6B6B67',
      cRowOp3: s.cmpIn ? 1 : 0, cRowY3: s.cmpIn ? 0 : 10, cSt3: s.cStep > 3 ? 'DONE \u2713' : s.cStep === 3 ? 'READING\u2026' : 'WAITING', cStC3: s.cStep > 3 ? '#F9F9F7' : s.cStep === 3 ? '#FDFF71' : '#6B6B67',
      cRowOp4: s.cmpIn ? 1 : 0, cRowY4: s.cmpIn ? 0 : 10, cSt4: s.cStep > 4 ? 'DONE \u2713' : s.cStep === 4 ? 'READING\u2026' : 'WAITING', cStC4: s.cStep > 4 ? '#F9F9F7' : s.cStep === 4 ? '#FDFF71' : '#6B6B67',
      resVis: s.res ? 'visible' : 'hidden', resPE: s.res === 2 ? 'auto' : 'none', resHidden: s.res === 2 ? 'false' : 'true',
      resOp: s.resIn ? 1 : 0, resTy: s.resIn ? 0 : 14,
      pName: s.profile ? s.profile.name : '', pDesc: s.profile ? s.profile.desc : '', pMem: s.profile ? s.profile.memory : '', pQuote: s.profile ? s.profile.quote : '',
      pA: (s.profile ? s.profile.name.split(' ')[0] : '').split('').map((ch, i) => ({ ch, y: s.resIn ? 0 : 104, delay: (0.1 + i * 0.04).toFixed(3) })),
      pB: (s.profile ? s.profile.name.split(' ').slice(1).join(' ') : '').split('').map((ch, i) => ({ ch: ch === ' ' ? ' ' : ch, y: s.resIn ? 0 : 104, delay: (0.3 + i * 0.04).toFixed(3) })),
      pBlend: (s.profile ? s.profile.blend : []).map((f, i) => ({ name: f[0], c: f[1], pct: f[2], w: s.resIn ? f[2] : 0, d: (0.6 + i * 0.12).toFixed(2) })),
      pNotes: s.profile ? s.profile.notes.map((n) => ({ tier: n[0], note: n[1], fam: n[2] })) : [],
      pWords: s.profile ? s.profile.words.map((x) => ({ t: x })) : [],
      pWhy: (s.profile ? s.profile.why : []).map((y, i) => ({ label: y[0], answer: y[1], reason: y[2], d: (0.2 + i * 0.07).toFixed(2) })),
      copyLabel: s.toast === 'Copied to clipboard' ? 'Copied' : 'Copy my profile',
      toastMsg: s.toast, toastOp: s.toast ? 1 : 0, toastY: s.toast ? 0 : 12,
      srcVis: s.src ? 'visible' : 'hidden', srcOp: s.src ? 1 : 0, srcHidden: s.src ? 'false' : 'true',
      shVis: s.share ? 'visible' : 'hidden', shOp: s.share === 2 ? 1 : 0, shHidden: s.share === 2 ? 'false' : 'true', shY: s.share === 2 ? 0 : 30, shS: s.share === 2 ? 1 : 0.96,
      back5: h.back5, next5: h.next5, setTr5: h.setTr5, setCrowd: h.setCrowd, setFill5: h.setFill5, setThumb5: h.setThumb5, setSlider5: h.setSlider5,
      setBf0: h.setBf[0], setBf1: h.setBf[1], setBf2: h.setBf[2], setBp0: h.setBp[0], setBp1: h.setBp[1], setBp2: h.setBp[2],
      t5Vis: s.t5 && s.cmp !== 2 ? 'visible' : 'hidden', t5PE: s.t5 === 2 ? 'auto' : 'none', t5Hidden: s.t5 === 2 ? 'false' : 'true',
      t5Op: s.t5In ? 1 : 0, t5Ty: s.t5In ? 0 : 14, prog5W: s.t5In ? 90 : 70, sc5: s.t5In ? '#333331' : '#A3A39E',
      next5Dis: s.moved5 ? 'false' : 'true', next5Tip: s.moved5 ? '' : 'Slide toward your evening first',
      t5A: 'It’s Saturday night.'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t5In ? 0 : 104, delay: (0.1 + i * 0.03).toFixed(3) })),
      t5B: 'Where are you?'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t5In ? 0 : 104, delay: (0.22 + i * 0.03).toFixed(3) })),
      back4: h.back4, next4: h.next4, memOut: h.memOut, setTr4: h.setTr4,
      t4Vis: s.t4 && s.t5 !== 2 ? 'visible' : 'hidden', t4PE: s.t4 === 2 ? 'auto' : 'none', t4Hidden: s.t4 === 2 ? 'false' : 'true',
      t4Op: s.t4In ? 1 : 0, t4Ty: s.t4In ? 0 : 14, prog4W: s.t4In ? 70 : 50,
      next4Dis: s.memPick >= 0 ? 'false' : 'true', next4Tip: s.memPick >= 0 ? '' : 'Pick a place first',
      mc0: s.t4In ? '#F9F9F7' : '#7A7A76',
      mc1: s.t4In ? '#F9F9F7' : '#7A7A76',
      mc2: s.t4In ? '#F9F9F7' : '#7A7A76',
      mc3: s.t4In ? '#F9F9F7' : '#7A7A76',
      mc4: false ? '#F9F9F7' : '#7A7A76',
      t4A: 'Go back to before'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t4In ? 0 : 104, delay: (0.1 + i * 0.03).toFixed(3) })),
      t4B: 'you were ten.'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t4In ? 0 : 104, delay: (0.22 + i * 0.03).toFixed(3) })),
      mems: MEMS.map((m, i) => {
        return { n: String(i + 1).padStart(2, '0'), title: m[0], desc: m[1], setCv: h.memCv[i], on: s.memPick === i ? 'true' : 'false',
          dot: s.memPick === i ? '#F9F9F7' : 'transparent', border: s.memPick === i ? 'rgba(255,255,255,0.95)' : '',
          op: s.t4In ? 1 : 0, y: s.t4In ? 0 : 22, delay: s.t4Ready ? 0 : (s.t4In ? 0.3 + i * 0.07 : 0).toFixed(2),
          enter: h.memEnter[i], pick: h.memPickH[i] };
      }),
      back3: h.back3, next3: h.next3, barsOut: h.barsOut, setTr3: h.setTr3,
      t3Vis: s.t3 && s.t4 !== 2 ? 'visible' : 'hidden', t3PE: s.t3 === 2 ? 'auto' : 'none', t3Hidden: s.t3 === 2 ? 'false' : 'true',
      t3Op: s.t3In ? 1 : 0, t3Ty: s.t3In ? 0 : 14, prog3W: s.t3In ? 50 : 30,
      next3Dis: s.pick >= 0 ? 'false' : 'true', next3Tip: s.pick >= 0 ? '' : 'Pick a color first',
      rc0: s.t3In ? '#333331' : '#A3A39E',
      rc1: s.t3In ? '#333331' : '#A3A39E',
      rc2: s.t3In ? '#333331' : '#A3A39E',
      rc3: false ? '#333331' : '#A3A39E',
      rc4: false ? '#333331' : '#A3A39E',
      t3A: 'Pick the color that'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t3In ? 0 : 104, delay: (0.1 + i * 0.03).toFixed(3) })),
      t3B: 'smells right.'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t3In ? 0 : 104, delay: (0.22 + i * 0.03).toFixed(3) })),
      bars: BARS.map((b, i) => {
        const hv = s.barHover, near = hv >= 0 ? Math.abs(hv - i) : 9;
        let hgt = !s.t3In ? 0 : near === 0 ? 362 : near === 1 ? 236 : near === 2 ? 186 : 150;
        if (s.t3In && s.pick === i) hgt = Math.max(hgt, 300);
        return { c: b[0], name: b[1], ink: b[2], nameOp: hv === i || s.pick === i ? 1 : 0, on: s.pick === i ? 'true' : 'false', h: hgt, delay: s.t3Ready ? 0 : (s.t3In ? 0.35 + i * 0.06 : 0).toFixed(2),
          ring: s.pick === i ? 'inset 0 0 0 2px rgba(249,249,247,0.9), 0 14px 26px -14px rgba(51,51,49,0.55)' : 'none', enter: h.barEnter[i], pick: h.barPick[i] };
      }),
      back2: h.back2, next2: h.next2, togglePlay: h.togglePlay, setWv: h.setWv, setHz: h.setHz, setNote: h.setNote, setFill2: h.setFill2, setThumb2: h.setThumb2, setSlider2: h.setSlider2,
      t2Vis: s.t2 && s.t3 !== 2 ? 'visible' : 'hidden', t2PE: s.t2 === 2 ? 'auto' : 'none', t2Hidden: s.t2 === 2 ? 'false' : 'true', 
      t2Op: s.t2In ? 1 : 0, t2Ty: s.t2In ? 0 : 14, prog2W: s.t2In ? 30 : 10,
      next2Dis: s.moved2 ? 'false' : 'true', next2Tip: s.moved2 ? '' : 'Slide the pitch first',
      playPressed: s.playing ? 'true' : 'false', playLabel: s.playing ? 'Pause the tone' : 'Play the tone', playPath: s.playing ? 'M3 2h3v10H3zM8 2h3v10H8z' : 'M3.5 1.5l9 5.5-9 5.5z', playFill: s.playing ? '#F9F9F7' : '#333331',
      qc0: s.t2In ? '#333331' : '#A3A39E',
      qc1: s.t2In ? '#333331' : '#A3A39E',
      qc2: false ? '#333331' : '#A3A39E',
      qc3: false ? '#333331' : '#A3A39E',
      qc4: false ? '#333331' : '#A3A39E',
      t2A: 'Tune the note'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t2In ? 0 : 104, delay: (0.1 + i * 0.035).toFixed(3) })),
      t2B: 'you’d live inside.'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.t2In ? 0 : 104, delay: (0.22 + i * 0.035).toFixed(3) })),
      backTrial: h.backTrial, nextTrial: h.nextTrial, nextDis: s.moved ? 'false' : 'true', nextTip: s.moved ? '' : 'Drag the slider first', progW: s.trIn ? 10 : 0,
      pc0: s.trIn ? '#F9F9F7' : '#7A7A76',
      pc1: false ? '#F9F9F7' : '#7A7A76',
      pc2: false ? '#F9F9F7' : '#7A7A76',
      pc3: false ? '#F9F9F7' : '#7A7A76',
      pc4: false ? '#F9F9F7' : '#7A7A76',
      setBegin: h.setBegin, setHt: h.setHt, setIntro: h.setIntro, setFill: h.setFill, setThumb: h.setThumb, setEdge: h.setEdge, setSlider: h.setSlider, onShape: h.onShape, beginTrials: h.beginTrials,
      ovVis: s.ov && s.t2 !== 2 ? 'visible' : 'hidden', introVis: s.ov === 2 ? 'hidden' : 'visible', stageBg: s.cube ? '#DCDCD7' : '#F9F9F7', setTr1: h.setTr1, setTr2: h.setTr2, ovPE: s.ov ? 'auto' : 'none', ovHidden: s.ov ? 'false' : 'true', 
      trOp: s.trIn ? 1 : 0, trY: s.trIn ? 0 : 14, nextX: s.trIn ? 0 : 100,
      trD0: 0.05, trD1: 0.55, trD2: 0.7, trD3: 0.35, trD4: 0.2,
      trA: 'Which shape'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.trIn ? 0 : 104, delay: (0.1 + i * 0.035).toFixed(3) })),
      trB: 'would you wear?'.split('').map((ch, i) => ({ ch: ch === ' ' ? '\u00A0' : ch, y: s.trIn ? 0 : 104, delay: (0.22 + i * 0.035).toFixed(3) })),
      on0: h.on0, on1: h.on1, on2: h.on2, on3: h.on3, on4: h.on4, off: h.off,
      iconOp0: s.active === 0 ? 0 : 1, iconScale0: s.active === 0 ? 0.9 : 1, cardOp0: s.active === 0 ? 1 : 0, cardY0: s.active === 0 ? 0 : 14, open0: s.active === 0 ? 'true' : 'false',
      iconOp1: s.active === 1 ? 0 : 1, iconScale1: s.active === 1 ? 0.9 : 1, cardOp1: s.active === 1 ? 1 : 0, cardY1: s.active === 1 ? 0 : 14, open1: s.active === 1 ? 'true' : 'false',
      iconOp2: s.active === 2 ? 0 : 1, iconScale2: s.active === 2 ? 0.9 : 1, cardOp2: s.active === 2 ? 1 : 0, cardY2: s.active === 2 ? 0 : 14, open2: s.active === 2 ? 'true' : 'false',
      iconOp3: s.active === 3 ? 0 : 1, iconScale3: s.active === 3 ? 0.9 : 1, cardOp3: s.active === 3 ? 1 : 0, cardY3: s.active === 3 ? 0 : 14, open3: s.active === 3 ? 'true' : 'false',
      iconOp4: s.active === 4 ? 0 : 1, iconScale4: s.active === 4 ? 0.9 : 1, cardOp4: s.active === 4 ? 1 : 0, cardY4: s.active === 4 ? 0 : 14, open4: s.active === 4 ? 'true' : 'false',
      h2a: 'Smell'.split('').map((ch, i) => ({ ch: ch, y: s.p2 ? 0 : 104, delay: s.p2 ? (i * 0.05).toFixed(3) : 0 })),
      h2b: 'translated'.split('').map((ch, i) => ({ ch: ch, y: s.p2 ? 0 : 104, delay: s.p2 ? (0.12 + i * 0.05).toFixed(3) : 0 })),
      paraWords: PARA2.split(' ').map((w, i) => ({ w: w, y: s.p2 ? 0 : 110, delay: s.p2 ? (0.45 + i * 0.012).toFixed(3) : 0 })),
    };
  }
  scrollBy(d) {
    if (!this.ready || !this.root) return;
    const W = this.root.clientWidth;
    if (!this.fall) { this.fall = true; this.setState({ scrolled: true }); }
    this.target = Math.max(0, Math.min(W, (this.target || 0) + d));
  }
  componentWillUnmount() { this.dead = true; if (this._esc) window.removeEventListener('keydown', this._esc); if (this.dropRaf) Object.values(this.dropRaf).forEach(cancelAnimationFrame); cancelAnimationFrame(this.raf); cancelAnimationFrame(this.htRaf); cancelAnimationFrame(this.wvRaf); cancelAnimationFrame(this.cubeRaf); cancelAnimationFrame(this.memRaf); cancelAnimationFrame(this.crowdRaf); this.stopTone && this.osc && this.stopTone(); (this.timers || []).forEach(clearTimeout); }
  // 3D cube turn: the page pulls back into a cube, rolls a quarter turn, and the next face grows to fill the screen
  cubeTurn(fromEl, toEl, dir, done, midway) {
    if (!fromEl || !toEl) { done && done(); return; }
    // dir: 'left' | 'right' | 'up' | 'down' — the side the current face rolls away to
    const root = this.root, vert = dir === 'up' || dir === 'down', d = (vert ? root.clientHeight : root.clientWidth) / 2, DUR = 2300;
    const sgn = dir === 'left' || dir === 'up' ? -1 : 1, R = vert ? 'rotateX(' : 'rotateY(', vs = vert ? -1 : 1;
    const eio = (u) => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, cl = (u) => Math.max(0, Math.min(1, u));
    this.setState({ cube: true });
    root.style.perspective = '2200px'; root.style.perspectiveOrigin = '50% 50%';
    for (const el of [fromEl, toEl]) { el.style.transition = 'none'; el.style.backfaceVisibility = 'hidden'; el.style.transformOrigin = '50% 50%'; el.style.boxShadow = '0 40px 80px -30px rgba(0,0,0,0.45)'; }
    const t0 = performance.now(); let fired = false;
    const step = (now) => {
      if (this.dead) return;
      const t = cl((now - t0) / DUR);
      const s = 1 - 0.34 * eio(cl(t / 0.32)) + 0.34 * eio(cl((t - 0.68) / 0.32));
      const rot = eio(cl((t - 0.22) / 0.56)) * 90 * sgn;
      const shadeA = 1 - 0.35 * Math.abs(rot) / 90, shadeB = 0.65 + 0.35 * Math.abs(rot) / 90;
      fromEl.style.transform = 'scale(' + s.toFixed(4) + ') translateZ(' + (-d) + 'px) ' + R + (rot * vs).toFixed(3) + 'deg) translateZ(' + d + 'px)';
      toEl.style.transform = 'scale(' + s.toFixed(4) + ') translateZ(' + (-d) + 'px) ' + R + ((rot - 90 * sgn) * vs).toFixed(3) + 'deg) translateZ(' + d + 'px)';
      fromEl.style.filter = 'brightness(' + shadeA.toFixed(3) + ')'; toEl.style.filter = 'brightness(' + shadeB.toFixed(3) + ')';
      if (!fired && t > 0.74) { fired = true; midway && midway(); }
      if (t < 1) { this.cubeRaf = requestAnimationFrame(step); return; }
      for (const el of [fromEl, toEl]) { el.style.transform = ''; el.style.filter = ''; el.style.boxShadow = ''; }
      root.style.perspective = ''; this.setState({ cube: false });
      done && done();
    };
    this.cubeRaf = requestAnimationFrame(step);
  }
  openTrial() {
    if (this.trialOpen || !this.root) return;
    this.trialOpen = true;
    if (this.beginEl) this.beginEl.classList.add('is-down');
    if (this.reduce) { this.setState({ ov: 2, trIn: true }); this.startHalftone(); return; }
    this.setState({ ov: 1 });
    requestAnimationFrame(() => this.cubeTurn(this.introEl, this.tr1El, 'left',
      () => this.setState({ ov: 2 }),
      () => { this.setState({ trIn: true }); this.startHalftone(); }));
  }

  openTrial2() {
    if (this.t2Open) return; this.t2Open = true;
    if (this.reduce) { this.setState({ t2: 2, t2In: true }); cancelAnimationFrame(this.htRaf); this.startWaves(); return; }
    this.setState({ t2: 1 });
    requestAnimationFrame(() => this.cubeTurn(this.tr1El, this.tr2El, 'up',
      () => { this.setState({ t2: 2 }); cancelAnimationFrame(this.htRaf); },
      () => { this.setState({ t2In: true }); this.startWaves(); }));
  }

  startMemArt() {
    if (this._memStarted) { this.memT0 = performance.now(); return; }
    this._memStarted = true; this.memT0 = performance.now();
    const reduce = this.reduce;
    let seed = 41; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const sets = MEMS.map(() => null);
    MEMS.forEach((m, i) => {
      fetch('assets/memories/' + m[3] + '.svg').then((res) => res.text()).then((svg) => {
        const pts = [], re = /<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" fill="#([0-9A-Fa-f]{6})"/g; let mm, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        while ((mm = re.exec(svg))) { const x = +mm[1], y = +mm[2]; pts.push([x, y, +mm[3], mm[4]]); x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
        const sc = this.mobile ? Math.min(66 / (x1 - x0 || 1), 40 / (y1 - y0 || 1)) : Math.min(110 / (x1 - x0 || 1), 80 / (y1 - y0 || 1)), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
        sets[i] = pts.map((q) => { const hx = (q[0] - cx) * sc, hy = (q[1] - cy) * sc, a = r() * 6.2832, d = 6 + r() * 24, hex = q[3];
          return { hx, hy, r: Math.max(0.45, q[2] * sc * 1.05), c: parseInt(hex.slice(0, 2), 16) + ',' + parseInt(hex.slice(2, 4), 16) + ',' + parseInt(hex.slice(4, 6), 16),
            dx: Math.cos(a) * d, dy: Math.sin(a) * d * 0.7, ph: r() * 6.28, f: 0.5 + r() * 0.9, sx: -260 - r() * 260, sy: (r() - 0.5) * 160, arc: (r() - 0.5) * 70, delay: r() * 700 + i * 90 }; });
      }).catch(() => {});
    });
    const form = MEMS.map(() => 0), ease = (u) => 1 - Math.pow(1 - u, 3);
    let last = performance.now();
    const loop = (now) => {
      if (this.dead) return;
      this.memRaf = requestAnimationFrame(loop);
      if (!this.S().t4) return;
      const dt = Math.min(40, now - last) / 1000; last = now;
      const el = now - this.memT0, ts = now / 1000, dpr = Math.min(2, window.devicePixelRatio || 1);
      for (let i = 0; i < MEMS.length; i++) {
        const cv = this.memCvs && this.memCvs[i], P = sets[i]; if (!cv || !P) continue;
        const W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
        if (W < 2) continue; if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
        const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
        const want = this.memH === i || this.memP === i ? 1 : 0; form[i] += (want - form[i]) * Math.min(1, dt * (want ? 3.2 : 1.8));
        const k = reduce ? want : ease(form[i]), ox = cv.clientWidth / 2, oy = cv.clientHeight / 2;
        for (const p of P) {
          // loose: drifting in a cloud around the shape · formed: settled on the drawing, barely breathing
          const sway = (1 - k) * 7 + 0.5;
          let x = p.hx + p.dx * (1 - k) + Math.sin(ts * p.f + p.ph) * sway, y = p.hy + p.dy * (1 - k) + Math.cos(ts * p.f * 0.8 + p.ph) * sway - (1 - k) * Math.sin(ts * 0.6 + p.ph) * 3;
          const q = reduce || !this.S().t4In ? (this.S().t4In ? 1 : 0) : Math.max(0, Math.min(1, (el - p.delay) / 1300));
          if (q <= 0) continue;
          if (q < 1) { const e = ease(q); x = p.sx + (x - p.sx) * e; y = p.sy + (y - p.sy) * e + Math.sin(q * Math.PI) * p.arc; }
          const al = (0.36 + 0.64 * k) * (q < 1 ? q : 1), rad = p.r * (0.62 + 0.38 * k);
          ctx.fillStyle = 'rgba(' + p.c + ',' + al.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(ox + x, oy + y, rad, 0, 6.2832); ctx.fill();
        }
      }
    };
    this.memRaf = requestAnimationFrame(loop);
  }
  // fresh / floral / amber, from everything chosen so far (social energy counts least)
  blendValues() {
    const sh = this.shapeTarget === undefined ? 0.5 : this.shapeTarget, pi = this.pitch === undefined ? 0.417 : this.pitch, so = this.social === undefined ? 0.5 : this.social;
    const s = this.S(); let F = 1, L = 1, A = 1;
    F += sh * 1.2; A += (1 - sh) * 0.8; L += (1 - sh) * 0.5;
    F += pi * 0.9; L += pi * 0.6; A += (1 - pi) * 1.2;
    const colorMap = [[1.6, 0.2, 0], [1.6, 0.4, 0], [0.2, 1.6, 0.2], [0.2, 1.2, 0.8], [0.2, 1.8, 0.2], [0, 0.2, 1.8], [0, 0.4, 1.8], [1.2, 0.3, 0.6]];
    const memMap = [[0.1, 0.3, 1.6], [1.5, 0.4, 0.1], [1.7, 0.2, 0.1], [1, 0.9, 0.1], [1.5, 0.3, 0.2], [0.4, 1.6, 0.1], [0.1, 0.3, 1.7], [0.1, 0.6, 1.4]];
    if (s.pick >= 0) { const c = colorMap[s.pick]; F += c[0]; L += c[1]; A += c[2]; }
    if (s.memPick >= 0) { const c = memMap[s.memPick]; F += c[0]; L += c[1]; A += c[2]; }
    F += so * 0.5; A += (1 - so) * 0.5;
    const tot = F + L + A, raw = [F / tot, L / tot, A / tot].map((v) => Math.round(v * 100));
    raw[0] += 100 - raw[0] - raw[1] - raw[2];
    return raw;
  }
  updateBlend() {
    const raw = this.blendValues();
    raw.forEach((v, i) => { if (this.bfEl && this.bfEl[i]) this.bfEl[i].style.width = v + '%'; if (this.bpEl && this.bpEl[i]) this.bpEl[i].textContent = v + '%'; });
  }
  bindSocial(el) {
    const set = (v, user) => {
      v = Math.max(0, Math.min(1, v)); this.social = v;
      if (user && !this.S().moved5) this.setState({ moved5: true });
      if (this.thumb5El) this.thumb5El.style.left = (v * 100).toFixed(2) + '%';
      if (this.fill5El) this.fill5El.style.width = (v * 100).toFixed(2) + '%';
      el.setAttribute('aria-valuenow', Math.round(v * 100)); el.setAttribute('aria-valuetext', v < 0.34 ? 'One friend, a long dinner' : v > 0.66 ? 'A crowded room' : 'Somewhere in between');
      if (this.S().t5In) this.updateBlend();
    };
    const fromX = (x) => { const b = el.getBoundingClientRect(); return (x - b.left) / b.width; };
    let drag = false;
    el.addEventListener('pointerdown', (e) => { drag = true; el.classList.add('is-drag'); try { el.setPointerCapture(e.pointerId); } catch (_) {} set(fromX(e.clientX), true); e.preventDefault(); });
    el.addEventListener('pointermove', (e) => { if (drag) set(fromX(e.clientX), true); });
    const up = () => { drag = false; el.classList.remove('is-drag'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', (e) => {
      const v = this.social === undefined ? 0.5 : this.social, st = e.shiftKey ? 0.2 : 0.05;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(v + st, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(v - st, true); e.preventDefault(); }
      else if (e.key === 'Home') { set(0, true); e.preventDefault(); } else if (e.key === 'End') { set(1, true); e.preventDefault(); }
    });
    set(this.social === undefined ? 0.5 : this.social);
  }
  startCrowd() {
    const cv = this.crowdCv; if (!cv) return;
    cancelAnimationFrame(this.crowdRaf);
    const ctx = cv.getContext('2d'), reduce = this.reduce;
    let seed = 57; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const NG = 40, groups = [];
    for (let g = 0; g < NG; g++) { const a = r() * 6.2832, rr = Math.sqrt(r()); groups.push({ x: Math.cos(a) * rr * (this.mobile ? 140 : 250), y: Math.sin(a) * rr * (this.mobile ? 90 : 140), ph: r() * 6.28, f: 0.25 + r() * 0.45, side: g % 2 }); }
    const WARM = [[217, 150, 58], [162, 144, 248]], FRESH = [[63, 201, 195], [232, 214, 40]];
    const P = [];
    for (let n = 0; n < 640; n++) {
      const g = n % NG, a = r() * 6.2832, rr = Math.sqrt(r()), ink = r() < 0.42, ci = r() < 0.5 ? 0 : 1;
      P.push({ g, th: 0.15 + r() * 0.7, ox: Math.cos(a) * rr, oy: Math.sin(a) * rr, ink, w: WARM[ci], fr: FRESH[ci], s: ink ? 1.6 + r() * 0.9 : 1.7 + r() * 1.2, ph: r() * 6.28, f: 0.6 + r() * 1.2,
        sx: -1000 - r() * 400, sy: (r() - 0.5) * 420, arc: (r() - 0.5) * 200, delay: r() * 600 + g * 12, px: 0, py: 0, vx: 0, vy: 0 });
    }
    if (!this._crMouse) {
      this._crMouse = true;
      this.root.addEventListener('pointermove', (ev) => { const b = cv.getBoundingClientRect(), sc = b.width / cv.clientWidth; this.crM = { x: (ev.clientX - b.left) / sc, y: (ev.clientY - b.top) / sc }; });
      this.root.addEventListener('pointerleave', () => { this.crM = null; });
    }
    const ease = (u) => 1 - Math.pow(1 - u, 3), eio = (u) => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    let v = this.social === undefined ? 0.5 : this.social, last = performance.now();
    const t0 = performance.now(), FLY = 1500, draw = [];
    const loop = (now) => {
      if (this.dead) return;
      const dt = Math.min(40, now - last) / 1000; last = now;
      v += ((this.social === undefined ? 0.5 : this.social) - v) * Math.min(1, dt * 2.5);
      const dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      const el = now - t0, ts = reduce ? 0 : el / 1000, cx = cv.clientWidth * (this.mobile ? 0.5 : 0.74), cy = cv.clientHeight * (this.mobile ? 0.565 : 0.53), k = eio(v);
      const gIn = reduce ? 1 : Math.min(1, el / 1600);
      const glows = [[-0.3, -0.1, k > 0.5 ? '163,252,250' : '217,150,58', 0.2], [0.35, 0.15, k > 0.5 ? '253,255,113' : '162,144,248', 0.2]];
      for (const g of glows) {
        const gx = cx + g[0] * 300, gy = cy + g[1] * 200, rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, 260 + 80 * k);
        rg.addColorStop(0, 'rgba(' + g[2] + ',' + (g[3] * gIn).toFixed(3) + ')'); rg.addColorStop(1, 'rgba(' + g[2] + ',0)');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
      }
      // introvert: two companions orbiting each other · extravert: a room full of drifting little groups
      const orb = ts * 0.35, sep = this.mobile ? 30 : 46;
      const cA = [Math.cos(orb) * sep, Math.sin(orb) * sep * 0.55], cB = [-cA[0], -cA[1]];
      const gR = (this.mobile ? 0.62 : 1) * (54 * (1 - k) + 13 * k), energy = 1 + 2.2 * k, m = this.crM;
      draw.length = 0;
      for (const p of P) {
        const G = groups[p.g], home = G.side ? cB : cA;
        const wx = G.x + Math.sin(ts * G.f + G.ph) * 34 * k, wy = G.y + Math.cos(ts * G.f * 0.8 + G.ph) * 22 * k;
        const gx = home[0] + (wx - home[0]) * k, gy = home[1] + (wy - home[1]) * k;
        const jig = 2 + 3 * k;
        let x = gx + p.ox * gR + Math.sin(ts * p.f * energy + p.ph) * jig, y = gy + p.oy * gR * 0.9 + Math.cos(ts * p.f * energy * 0.9 + p.ph) * jig;
        const q = reduce ? 1 : Math.max(0, Math.min(1, (el - p.delay) / FLY));
        if (q < 1) { const e = ease(q); x = p.sx + (x - p.sx) * e; y = p.sy + (y - p.sy) * e + Math.sin(q * Math.PI) * p.arc; }
        else if (!reduce) {
          if (m) { const ax = cx + x + p.px - m.x, ay = cy + y + p.py - m.y, dd = Math.hypot(ax, ay) || 0.01; if (dd < 70) { const fo = (70 - dd) / 70 * 2.4; p.vx += ax / dd * fo; p.vy += ay / dd * fo; } }
          p.vx += -p.px * 0.08; p.vy += -p.py * 0.08; p.vx *= 0.82; p.vy *= 0.82; p.px += p.vx; p.py += p.vy; x += p.px; y += p.py;
        }
        const cc = k > p.th ? p.fr : p.w, col = p.ink ? '51,51,49' : cc[0] + ',' + cc[1] + ',' + cc[2];
        const depth = 0.5 + 0.5 * Math.sin(ts * p.f + p.ph);
        draw.push([depth, cx + x, cy + y, p.s * (0.75 + 0.4 * depth), (p.ink ? 0.45 + 0.45 * depth : 0.55 + 0.45 * depth) * (q < 1 ? 0.3 + 0.7 * q : 1), col, !p.ink]);
      }
      draw.sort((a, b) => a[0] - b[0]);
      for (const d of draw) {
        ctx.fillStyle = 'rgba(' + d[5] + ',' + d[4].toFixed(3) + ')';
        if (d[6]) { ctx.beginPath(); ctx.arc(d[1], d[2], d[3], 0, 6.2832); ctx.fill(); } else ctx.fillRect(d[1] - d[3] * 0.8, d[2] - d[3] * 0.8, d[3] * 1.6, d[3] * 1.6);
      }
      this.crowdRaf = requestAnimationFrame(loop);
    };
    this.crowdRaf = requestAnimationFrame(loop);
  }
  openTrial5() {
    if (this.t5Open || this.S().cube) return; this.t5Open = true;
    const go = () => { this.setState({ t5In: true }); this.startCrowd(); this.later(500, () => this.updateBlend()); };
    if (this.reduce) { this.setState({ t5: 2 }); go(); return; }
    this.setState({ t5: 1 });
    requestAnimationFrame(() => this.cubeTurn(this.tr4El, this.tr5El, 'left', () => this.setState({ t5: 2 }), go));
  }
  closeTrial5() {
    if (!this.t5Open || this.S().cube) return;
    this.setState({ t5In: false, t5: 1 });
    (this.bfEl || []).forEach((e) => { e.style.width = '0%'; });
    const fin = () => { cancelAnimationFrame(this.crowdRaf); this.setState({ t5: 0 }); this.t5Open = false; };
    if (this.reduce) { fin(); return; }
    requestAnimationFrame(() => this.cubeTurn(this.tr5El, this.tr4El, 'right', fin));
  }
  // after the profile: a calm cross-fade with a small rise, no cube
  fadeSwap(fromEl, toEl, done, midway) {
    if (!fromEl || !toEl || this.reduce) { midway && midway(); done && done(); return; }
    const DUR = 900, t0 = performance.now(), eio = (u) => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    this.setState({ cube: true }); let fired = false;
    toEl.style.opacity = '0'; toEl.style.transition = 'none';
    const step = (now) => {
      if (this.dead) return;
      const u = Math.min(1, (now - t0) / DUR), e = eio(u);
      fromEl.style.opacity = String(1 - e); fromEl.style.transform = 'scale(' + (1 - 0.02 * e).toFixed(4) + ')';
      toEl.style.opacity = String(e); toEl.style.transform = 'translateY(' + ((1 - e) * 24).toFixed(2) + 'px)';
      if (!fired && u > 0.35) { fired = true; midway && midway(); }
      if (u < 1) { this.cubeRaf = requestAnimationFrame(step); return; }
      for (const el of [fromEl, toEl]) { el.style.opacity = ''; el.style.transform = ''; }
      this.setState({ cube: false }); done && done();
    };
    this.cubeRaf = requestAnimationFrame(step);
  }
  goHome() {
    if (this.S().cube) return;
    if (this.S().share) this.closeShare(); if (this.S().src) this.closeSources();
    const atIntro = !this.trialOpen && !this.S().res;
    this.target = 0;
    if (atIntro) return;
    const from = [this.resEl, this.cmpEl, this.tr5El, this.tr4El, this.tr3El, this.tr2El, this.tr1El].find((el, i) => {
      const s = this.S(); return [s.res, s.cmp, s.t5, s.t4, s.t3, s.t2, s.ov][i] === 2; });
    this.resetFlow();
    if (from && this.introEl) { from.style.visibility = 'visible'; this.fadeSwap(from, this.introEl, () => { from.style.visibility = ''; this.setState({ res: 0 }); }); }
    else this.setState({ res: 0 });
  }
  resetFlow() {
    ['cmp', 'res', 'sh'].forEach((k) => this.stopDrop(k)); cancelAnimationFrame(this.htRaf); cancelAnimationFrame(this.wvRaf); cancelAnimationFrame(this.crowdRaf); this.stopTone();
    this.trialOpen = this.t2Open = this.t3Open = this.t4Open = this.t5Open = this.cmpOpen = false;
    if (this.beginEl) this.beginEl.classList.remove('is-down');
    if (this.memNameEl) this.memNameEl.value = '';
    this.memH = this.memP = -1;
    this.setState({ ov: 0, trIn: false, moved: false, t2: 0, t2In: false, moved2: false, playing: false, t3: 0, t3In: false, t3Ready: false, pick: -1, barHover: -1,
      t4: 0, t4In: false, t4Ready: false, memHover: -1, memPick: -1, t5: 0, t5In: false, moved5: false, cmp: 0, cmpIn: false, cStep: -1, cBar: 0, resIn: false });
  }
  computeProfile() {
    const s = this.S(), b = this.blendValues(), order = [0, 1, 2].sort((x, y) => b[y] - b[x]), L = ['F', 'L', 'A'];
    const sh = this.shapeTarget === undefined ? 0.5 : this.shapeTarget, pi = this.pitch === undefined ? 0.417 : this.pitch, so = this.social === undefined ? 0.5 : this.social;
    const hz = Math.round(this.freq()), shapeW = sh < 0.34 ? 'soft' : sh > 0.66 ? 'sharp' : 'balanced', pitchW = pi < 0.34 ? 'low' : pi > 0.66 ? 'high' : 'in the middle';
    const top = COLOR_TOP[s.pick >= 0 ? s.pick : 0], heart = pi > 0.66 ? ['Iris', 'Soft floral'] : pi > 0.33 ? ['Orange blossom', 'Soft floral'] : ['Coffee absolute', 'Warm amber'];
    const base = MEM_BASE[s.memPick >= 0 ? s.memPick : 0], mem = MEMS[s.memPick >= 0 ? s.memPick : 0], named = this.memNameEl && this.memNameEl.value.trim();
    const mood = order[0] === 0 ? 'sparkles more than it smolders' : order[0] === 1 ? 'stays soft and close to the skin' : 'glows warm and slow';
    const socialW = so < 0.34 ? 'One friend, a long dinner' : so > 0.66 ? 'A crowded room' : 'Somewhere in between';
    const colorName = s.pick >= 0 ? BARS[s.pick][1] : 'Lemon';
    return {
      name: NAMES[L[order[0]] + L[order[1]]],
      desc: 'Your shape ran ' + shapeW + ' and your pitch sat ' + pitchW + ', so this blend ' + mood + '. It opens with ' + top[0].toLowerCase() + ', settles into ' + heart[0].toLowerCase() + ' and lingers as ' + base[0].toLowerCase() + '.',
      blend: order.map((i) => [FAMS[i][0], FAMS[i][1], b[i]]), rgb: order.map((i) => [FAMS[i][2], b[i]]),
      notes: [['TOP', top[0], top[1]], ['HEART', heart[0], heart[1]], ['BASE', base[0], base[1]]],
      words: WORDS[order[0]].slice(0, 3).concat(WORDS[order[1]].slice(0, 2), WORDS[order[2]].slice(0, 1)),
      memory: named ? '“' + named + '”' : mem[0] + ' · ' + mem[1].replace(/\.$/, ''),
      quote: named ? '“' + named + '”' : mem[0],
      why: [
        ['01 · SHAPE', shapeW[0].toUpperCase() + shapeW.slice(1) + ' · edge ' + sh.toFixed(2), sh > 0.66 ? 'Angular forms pair with lemon and pepper, so your top leans bright.' : sh < 0.34 ? 'Round forms pair with raspberry and vanilla, so your blend leans soft.' : 'A middle edge keeps bright and soft notes both in play.'],
        ['02 · SOUND', hz + ' Hz · ' + (pi < 0.34 ? 'low' : pi > 0.66 ? 'high' : 'middle'), pi > 0.66 ? 'Higher pitches pair with candied orange and iris.' : pi < 0.34 ? 'Lower pitches pair with musk and roasted coffee.' : 'A middle register sits between bright and deep notes.'],
        ['03 · COLOR', colorName, 'People link ' + colorName.toLowerCase() + ' with ' + top[0].toLowerCase() + '-like smells, so it opens your blend.'],
        ['04 · MEMORY', mem[0], 'Smell-cued memories run older and warmer. This one sets your base: ' + base[0].toLowerCase() + '.'],
        ['05 · SOCIAL ENERGY', socialW, so > 0.66 ? 'Extraverts leaned fresh, so it added a little lift.' : so < 0.34 ? 'Introverts leaned amber, so it added a little warmth.' : 'Balanced, so it nudged your blend only lightly.']]
    };
  }
  // one particle drop, used for composing, the profile and the share card
  startDrop(key, cv, mode) {
    if (!cv) return;
    this.dropRaf = this.dropRaf || {}; cancelAnimationFrame(this.dropRaf[key]);
    const ctx = cv.getContext('2d'), reduce = this.reduce, prof = this.S().profile;
    let seed = 77; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const R = 0.5, CY = 0.25, TOP = -0.95, width = (y) => y >= CY ? Math.sqrt(Math.max(0, R * R - (y - CY) * (y - CY))) : R * Math.pow((y - TOP) / (CY - TOP), 1.5);
    const dark = mode !== 'result', SENSE = ['249,249,247', '162,144,248', '253,255,113', '163,252,250', '217,150,58'];
    const pickFam = () => { if (!prof) return SENSE[1 + Math.floor(r() * 3)]; let x = r() * 100; for (const f of prof.rgb) { if ((x -= f[1]) <= 0) return f[0]; } return prof.rgb[0][0]; };
    const P = [];
    while (P.length < 1200) {
      const y = TOP + r() * (CY + R - TOP), w = width(y); if (r() > (w / R) * (w / R)) continue;
      const k = P.length % 5, colored = r() < 0.45, a = r() * 6.2832, d = 0.08 + r() * 0.22;
      P.push({ hy: y, rad: r() < 0.7 ? 0.62 + 0.38 * Math.sqrt(r()) : Math.sqrt(r()), th: r() * 6.2832, k, col: colored,
        c: colored ? (mode === 'compose' ? SENSE[k] : pickFam()) : (dark ? '249,249,247' : '51,51,49'), s: colored ? 1.1 + r() * 0.8 : 0.7 + r() * 0.7,
        ox: Math.cos(a) * d, oy: Math.sin(a) * d, sx: -2.8 - r() * 1.6, sy: y + (r() - 0.5) * 1.6, arc: (r() - 0.5) * 0.7, delay: mode === 'compose' ? k * 620 + r() * 500 : r() * 700 + (y - TOP) * 160 });
    }
    const ease = (u) => 1 - Math.pow(1 - u, 3), t0 = performance.now(), FLY = mode === 'compose' ? 1250 : 1500, draw = [];
    const loop = (now) => {
      if (this.dead) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
      if (W > 1 && (cv.width !== W || cv.height !== H)) { cv.width = W; cv.height = H; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      const el = now - t0, cw = cv.clientWidth, ch = cv.clientHeight;
      const mob = this.mobile && mode !== 'share';
      const cx = mob ? cw / 2 : mode === 'compose' ? cw * 0.3 : mode === 'result' ? 957 : cw / 2, cy = mob ? (mode === 'compose' ? 360 : ch * 0.55) : mode === 'compose' ? ch * 0.5 : mode === 'result' ? 340 : ch * 0.56;
      const S = mob ? (mode === 'compose' ? 92 : ch * 0.34) : mode === 'compose' ? ch * 0.25 : mode === 'result' ? 175 : 92, spin = 0.6 + el * 0.00028, gIn = reduce ? 1 : Math.min(1, el / 1600);
      const glow = prof && mode !== 'compose' ? prof.rgb.map((f, i) => [[-0.42, -0.5], [0.55, -0.15], [-0.35, 0.55]][i].concat([f[0], (dark ? 0.35 : 0.42) * f[1] / 60])) : [[-0.42, -0.5, '253,255,113', 0.4], [0.55, -0.15, '163,252,250', 0.36], [-0.35, 0.55, '162,144,248', 0.3]];
      for (const g of glow) {
        const gx = cx + g[0] * S * 1.6, gy = cy + g[1] * S * 1.6, rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, S * 1.8);
        rg.addColorStop(0, 'rgba(' + g[2] + ',' + (Math.min(0.6, g[3]) * gIn).toFixed(3) + ')'); rg.addColorStop(1, 'rgba(' + g[2] + ',0)');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, cw, ch);
      }
      draw.length = 0;
      for (const p of P) {
        const rr = p.rad * width(p.hy), ang = p.th + spin, z = rr * Math.sin(ang);
        let x = rr * Math.cos(ang) * (1 + z * 0.35), y = p.hy;
        const q = reduce ? 1 : Math.max(0, Math.min(1, (el - p.delay) / FLY));
        if (mode === 'compose') {
          // waiting in its sense's little cloud, then flying into the drop
          const ca = -Math.PI / 2 + p.k * 1.2566 + el * 0.00015, sx = Math.cos(ca) * 1.3 + p.ox + Math.sin(el * 0.002 + p.th) * 0.03, sy = Math.sin(ca) * 1.1 + p.oy;
          if (q < 1) { const e = ease(q); x = sx + (x - sx) * e; y = sy + (y - sy) * e + Math.sin(q * Math.PI) * p.arc * 0.5; }
        } else if (q < 1) { if (q <= 0) continue; const e = ease(q); x = p.sx + (x - p.sx) * e; y = p.sy + (y - p.sy) * e + Math.sin(q * Math.PI) * p.arc; }
        const depth = Math.max(0, Math.min(1, (z / R + 1) / 2));
        const a = (p.col ? 0.5 + 0.45 * depth : (0.12 + 0.5 * p.rad) * (0.4 + 0.6 * depth) * (dark ? 1 : 1.3)) * (mode !== 'compose' && q < 1 ? 0.3 + 0.7 * q : 1);
        draw.push([z, cx + x * S, cy + y * S, p.s * (S / 225) * 2.2 * (0.8 + 0.4 * depth), a, p.c, p.col]);
      }
      draw.sort((u, v) => u[0] - v[0]);
      for (const d of draw) {
        ctx.fillStyle = 'rgba(' + d[5] + ',' + Math.min(1, d[4]).toFixed(3) + ')';
        if (d[6]) { ctx.beginPath(); ctx.arc(d[1], d[2], d[3], 0, 6.2832); ctx.fill(); } else ctx.fillRect(d[1] - d[3] / 2, d[2] - d[3] / 2, d[3], d[3]);
      }
      this.dropRaf[key] = requestAnimationFrame(loop);
    };
    this.dropRaf[key] = requestAnimationFrame(loop);
  }
  stopDrop(key) { if (this.dropRaf) cancelAnimationFrame(this.dropRaf[key]); }
  openCompose() {
    if (this.cmpOpen || this.S().cube) return; this.cmpOpen = true;
    const run = () => {
      this.setState({ cmpIn: true, cStep: 0, cBar: 100 }); this.startDrop('cmp', this.cmpCv, 'compose');
      [1, 2, 3, 4, 5].forEach((n) => this.later(n * 640, () => this.setState({ cStep: n })));
      this.later(3900, () => { const pr = this.computeProfile(); try { localStorage.setItem('scentTheory.lastProfile', JSON.stringify(pr)); } catch (_) {} this.showResult(pr, this.cmpEl, 'right'); });
    };
    if (this.reduce) { this.setState({ cmp: 2 }); run(); return; }
    this.setState({ cmp: 1 });
    requestAnimationFrame(() => this.cubeTurn(this.tr5El, this.cmpEl, 'down', () => { this.setState({ cmp: 2 }); cancelAnimationFrame(this.crowdRaf); }, run));
  }
  showResult(pr, fromEl, dir) {
    this.setState({ profile: pr, res: 1, hasLast: true });
    if (this.resScroll) this.resScroll.scrollTop = 0;
    const done = () => { this.setState({ res: 2 }); this.stopDrop('cmp'); };
    const go = () => { this.setState({ resIn: true }); this.startDrop('res', this.resCv, 'result'); };
    if (this.reduce || !fromEl) { done(); go(); return; }
    requestAnimationFrame(() => this.fadeSwap(fromEl, this.resEl, done, go));
  }
  seeLast() {
    if (this.S().cube || this.trialOpen) return;
    let pr = null; try { pr = JSON.parse(localStorage.getItem('scentTheory.lastProfile') || 'null'); } catch (_) {}
    if (pr) this.showResult(pr, this.introEl, 'left');
  }
  retake() {
    if (this.S().cube) return;
    this.resetFlow();
    requestAnimationFrame(() => this.fadeSwap(this.resEl, this.introEl, () => this.setState({ res: 0 })));
  }

  toast(msg) { this.setState({ toast: msg }); clearTimeout(this._toastT); this._toastT = setTimeout(() => this.setState({ toast: '' }), 1800); }
  profileText() {
    const p = this.S().profile; if (!p) return '';
    return 'My scent profile: ' + p.name + '\n' + p.desc + '\nTop: ' + p.notes[0][1] + ' · Heart: ' + p.notes[1][1] + ' · Base: ' + p.notes[2][1] + '\nBlend: ' + p.blend.map((f) => f[0] + ' ' + f[2] + '%').join(', ') + '\nLook for: ' + p.words.join(', ') + '\nscenttheory.app';
  }
  copyProfile() {
    const text = this.profileText(), ok = () => this.toast('Copied to clipboard'), fallback = () => {
      try { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); ok(); } catch (_) { this.toast('Couldn’t copy here'); } };
    try { navigator.clipboard.writeText(text).then(ok, fallback); } catch (_) { fallback(); }
  }
  openShare() {
    this.setState({ share: 1 });
    requestAnimationFrame(() => requestAnimationFrame(() => { this.setState({ share: 2 }); this.startDrop('sh', this.shCv, 'share'); }));
  }
  closeShare() { this.setState({ share: 1 }); this.later(400, () => { this.setState({ share: 0 }); this.stopDrop('sh'); }); }
  downloadShare() {
    const p = this.S().profile; if (!p) return;
    try {
      const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
      g.fillStyle = '#333331'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#F9F9F7'; g.font = '300 34px "Geist Mono", monospace'; g.fillText('SCENT', 80, 110); g.font = '700 34px "Geist Mono", monospace'; g.fillText('THEORY', 220, 110);
      g.font = '400 26px "Geist Mono", monospace'; g.fillStyle = '#BDBDB8'; g.textAlign = 'right'; g.fillText('MY SCENT PROFILE', W - 80, 110); g.textAlign = 'left';
      if (this.shCv) g.drawImage(this.shCv, 60, 150, W - 120, (W - 120) * this.shCv.height / this.shCv.width);
      g.fillStyle = '#F9F9F7'; g.font = '700 118px "Geist", "Inter Tight", sans-serif'; g.fillText(p.name, 72, 1010);
      p.notes.forEach((n, i) => { const x = 80 + i * 320; g.fillRect(x, 1060, 290, 3); g.font = '400 24px "Geist Mono", monospace'; g.fillStyle = '#BDBDB8'; g.fillText(n[0], x, 1105); g.font = '400 40px "Inter Tight", sans-serif'; g.fillStyle = '#F9F9F7'; g.fillText(n[1], x, 1158); });
      g.font = '400 30px "Inter Tight", sans-serif'; g.fillStyle = '#BDBDB8'; g.fillText(p.quote, 80, 1260); g.textAlign = 'right'; g.font = '400 26px "Geist Mono", monospace'; g.fillText('scenttheory.app', W - 80, 1260);
      const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'scent-profile-' + p.name.toLowerCase().replace(/\s+/g, '-') + '.png'; document.body.appendChild(a); a.click(); a.remove();
      this.toast('Image saved');
    } catch (_) { this.toast('Couldn’t save here; try a screenshot'); }
  }
  openSources() { this.setState({ src: true }); }
  closeSources() { this.setState({ src: false }); }
  openTrial4() {
    if (this.t4Open || this.S().cube) return; this.t4Open = true;
    const settle = () => this.later(1700, () => this.setState({ t4Ready: true }));
    if (this.reduce) { this.setState({ t4: 2, t4In: true, t4Ready: true }); this.startMemArt(); return; }
    this.setState({ t4: 1 });
    requestAnimationFrame(() => this.cubeTurn(this.tr3El, this.tr4El, 'down',
      () => this.setState({ t4: 2 }),
      () => { this.setState({ t4In: true }); this.startMemArt(); settle(); }));
  }
  closeTrial4() {
    if (!this.t4Open || this.S().cube) return;
    this.setState({ t4In: false, t4Ready: false, t4: 1, memHover: -1 });
    const fin = () => { this.setState({ t4: 0 }); this.t4Open = false; };
    if (this.reduce) { fin(); return; }
    requestAnimationFrame(() => this.cubeTurn(this.tr4El, this.tr3El, 'up', fin));
  }
  openTrial3() {
    if (this.t3Open || this.S().cube) return; this.t3Open = true;
    this.stopTone(); this.setState({ playing: false });
    const settle = () => this.later(1200, () => this.setState({ t3Ready: true }));
    if (this.reduce) { this.setState({ t3: 2, t3In: true, t3Ready: true }); cancelAnimationFrame(this.wvRaf); return; }
    this.setState({ t3: 1 });
    requestAnimationFrame(() => this.cubeTurn(this.tr2El, this.tr3El, 'right',
      () => { this.setState({ t3: 2 }); cancelAnimationFrame(this.wvRaf); },
      () => { this.setState({ t3In: true }); settle(); }));
  }
  closeTrial3() {
    if (!this.t3Open || this.S().cube) return;
    this.setState({ t3In: false, t3Ready: false, t3: 1, barHover: -1 });
    this.startWaves();
    const fin = () => { this.setState({ t3: 0 }); this.t3Open = false; };
    if (this.reduce) { fin(); return; }
    requestAnimationFrame(() => this.cubeTurn(this.tr3El, this.tr2El, 'left', fin));
  }
  closeTrial2() {
    if (!this.t2Open || this.S().cube) return;
    this.stopTone();
    this.setState({ t2In: false, t2: 1, playing: false });
    this.startHalftone();
    const fin = () => { cancelAnimationFrame(this.wvRaf); this.setState({ t2: 0 }); this.t2Open = false; };
    if (this.reduce) { fin(); return; }
    requestAnimationFrame(() => this.cubeTurn(this.tr2El, this.tr1El, 'down', fin));
  }

  freq() { return 110 * Math.pow(2, 3 * (this.pitch === undefined ? 0.417 : this.pitch)); }
  bindPitch(el) {
    const NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    const set = (v, user) => {
      v = Math.max(0, Math.min(1, v)); this.pitch = v;
      if (user && !this.S().moved2) this.setState({ moved2: true });
      const f = this.freq(), midi = Math.round(69 + 12 * Math.log2(f / 440)), name = NOTES[((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
      const reg = f < 200 ? 'low' : f < 500 ? 'middle' : 'high';
      if (this.thumb2El) this.thumb2El.style.left = (v * 100).toFixed(2) + '%';
      if (this.fill2El) this.fill2El.style.width = (v * 100).toFixed(2) + '%';
      if (this.hzEl) this.hzEl.textContent = Math.round(f) + ' Hz';
      if (this.noteEl) this.noteEl.textContent = name + ' ' + reg + ' register';
      el.setAttribute('aria-valuenow', Math.round(f)); el.setAttribute('aria-valuetext', Math.round(f) + ' hertz, ' + name + ', ' + reg + ' register');
      if (this.osc) { const tt = this.ac.currentTime; this.osc.frequency.setTargetAtTime(f, tt, 0.03); this.osc2.frequency.setTargetAtTime(f * 2, tt, 0.03); }
    };
    const fromX = (x) => { const b = el.getBoundingClientRect(); return (x - b.left) / b.width; };
    let drag = false;
    el.addEventListener('pointerdown', (e) => { drag = true; el.classList.add('is-drag'); try { el.setPointerCapture(e.pointerId); } catch (_) {} set(fromX(e.clientX), true); e.preventDefault(); });
    el.addEventListener('pointermove', (e) => { if (drag) set(fromX(e.clientX), true); });
    const up = () => { drag = false; el.classList.remove('is-drag'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', (e) => {
      const v = this.pitch === undefined ? 0.417 : this.pitch, st = e.shiftKey ? 0.2 : 0.04;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(v + st, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(v - st, true); e.preventDefault(); }
      else if (e.key === 'Home') { set(0, true); e.preventDefault(); } else if (e.key === 'End') { set(1, true); e.preventDefault(); }
    });
    set(this.pitch === undefined ? 0.417 : this.pitch);
  }
  togglePlay() {
    if (this.S().playing) { this.stopTone(); this.setState({ playing: false }); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      this.ac = this.ac || new AC(); if (this.ac.state === 'suspended') this.ac.resume();
      const ac = this.ac, f = this.freq(), tt = ac.currentTime;
      const g = ac.createGain(); g.gain.setValueAtTime(0, tt); g.gain.linearRampToValueAtTime(0.12, tt + 0.2);
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
      const o1 = ac.createOscillator(); o1.type = 'sine'; o1.frequency.value = f;
      const o2 = ac.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2; const g2 = ac.createGain(); g2.gain.value = 0.12;
      o1.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g); g.connect(ac.destination); o1.start(); o2.start();
      this.osc = o1; this.osc2 = o2; this.gain = g;
      this.setState({ playing: true });
    } catch (_) {}
  }
  stopTone() {
    if (!this.osc) return;
    const ac = this.ac, tt = ac.currentTime, o1 = this.osc, o2 = this.osc2, g = this.gain;
    g.gain.cancelScheduledValues(tt); g.gain.setValueAtTime(g.gain.value, tt); g.gain.linearRampToValueAtTime(0, tt + 0.18);
    setTimeout(() => { try { o1.stop(); o2.stop(); } catch (_) {} }, 260);
    this.osc = this.osc2 = this.gain = null;
  }
  startWaves() {
    const cv = this.wvCv; if (!cv) return;
    cancelAnimationFrame(this.wvRaf);
    const ctx = cv.getContext('2d'), reduce = this.reduce;
    let seed = 23; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const NSTR = 6, PER = 150, P = [], SA = [], SC = [];
    const FM = [], FP = [], XF = [];
    for (let s = 0; s < NSTR; s++) { SA.push(0.7 + r() * 0.5); SC.push((r() - 0.5) * 0.5); FM.push(0.85 + (s / (NSTR - 1)) * 1.1 + (r() - 0.5) * 0.12); FP.push(r() * 6.2832); XF.push({ L: new Float32Array(261), x: new Float32Array(PER) }); }
    for (let s = 0; s < NSTR; s++) for (let j = 0; j < PER; j++) {
      const x = -1 + 2 * (j + r() * 0.6) / PER, lil = s % 2 === 1, spark = r() < 0.07;
      const hr = r(), c2 = hr < 0.5 ? [51, 51, 49] : hr < 0.75 ? [253, 255, 113] : [163, 252, 250];
      P.push({ s, j, x, c2, ph: s / NSTR * 6.2832, col: lil || spark, c: spark ? (r() < 0.5 ? '163,252,250' : '253,255,113') : lil ? '162,144,248' : '51,51,49',
        sz: lil || spark ? 1.6 + r() * 0.9 : 1.5 + r() * 0.9, sx: -1000 - r() * 400, sy: (r() - 0.5) * 420, arc: (r() - 0.5) * 200,
        delay: r() * 450 + (x + 1) * 380, ox: 0, oy: 0, vx: 0, vy: 0 });
    }
    if (!this._wvMouse) {
      this._wvMouse = true;
      this.root.addEventListener('pointermove', (ev) => { const b = cv.getBoundingClientRect(), sc = b.width / cv.clientWidth; this.wvM = { x: (ev.clientX - b.left) / sc, y: (ev.clientY - b.top) / sc }; });
      this.root.addEventListener('pointerleave', () => { this.wvM = null; });
    }
    const ease = (u) => 1 - Math.pow(1 - u, 3);
    let pv = this.pitch === undefined ? 0.417 : this.pitch, amp = 0, phase = 0, last = performance.now();
    const t0 = performance.now(), FLY = 1500, draw = [];
    const loop = (now) => {
      if (this.dead) return;
      const dt = Math.min(40, now - last) / 1000; last = now;
      const target = this.pitch === undefined ? 0.417 : this.pitch; pv += (target - pv) * Math.min(1, dt * 6);
      const playing = this.S().playing; amp += ((playing ? 1 : 0.72) - amp) * Math.min(1, dt * 3);
      phase += dt * (reduce ? 0 : (playing ? 1.6 + 4 * pv : 0.7));
      const dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      const el = now - t0, ts = reduce ? 0 : el / 1000, cx = cv.clientWidth * (this.mobile ? 0.5 : 0.72), cy = cv.clientHeight * (this.mobile ? 0.565 : 0.55), HW = this.mobile ? 165 : 270;
      const gIn = reduce ? 1 : Math.min(1, el / 1600);
      for (const g of [[-0.55, -0.35, '253,255,113', 0.22], [0.5, -0.25, '163,252,250', 0.22], [0, 0.45, '162,144,248', 0.2]]) {
        const gx = cx + g[0] * HW, gy = cy + g[1] * 160, rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, 260);
        rg.addColorStop(0, 'rgba(' + g[2] + ',' + (g[3] * gIn).toFixed(3) + ')'); rg.addColorStop(1, 'rgba(' + g[2] + ',0)');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
      }
      const k = 6.2832 * (1.1 + pv * 3.2), A = (this.mobile ? 66 : 112) * amp * (1.12 - 0.3 * pv) * (1 + (playing ? 0.06 * Math.sin(ts * 9) : 0));
      const hw = Math.max(0, Math.min(1, (pv - 0.62) / 0.3)), hws = hw * hw * (3 - 2 * hw);
      const tilt = 0.42 + 0.06 * Math.sin(ts * 0.4), ct = Math.cos(tilt), st = Math.sin(tilt), m = this.wvM;
      const kF = 6.2832 * (2.2 + 1.2 * pv), AF = (this.mobile ? 90 : 150) * amp;
      const yFn = (s, x) => AF * Math.exp(-x * x * 3.2) * Math.pow(FM[s], -1.35) * Math.sin(kF * FM[s] * x - phase * 1.2 + FP[s]);
      if (hws > 0) {
        const M = 260;
        for (let s = 0; s < NSTR; s++) {
          const L = XF[s].L; L[0] = 0; let px = -HW, py = yFn(s, -1);
          for (let i = 1; i <= M; i++) { const xx = -1 + 2 * i / M, nx = xx * HW, ny = yFn(s, xx); L[i] = L[i - 1] + Math.hypot(nx - px, ny - py); px = nx; py = ny; }
          let i = 0;
          for (let j = 0; j < PER; j++) { const target = (j + 0.5) / PER * L[M]; while (i < M - 1 && L[i + 1] < target) i++; const f = (target - L[i]) / ((L[i + 1] - L[i]) || 1); XF[s].x[j] = -1 + 2 * (i + f) / M; }
        }
      }
      draw.length = 0;
      for (const p of P) {
        const dx = p.x - SC[p.s] * (0.6 + 0.4 * Math.sin(ts * 0.5 + p.s)), env = Math.exp(-dx * dx * 2.6) * SA[p.s], ang = k * p.x - phase + p.ph;
        const Y = A * env * Math.sin(ang), Z = A * env * Math.cos(ang);
        let x = p.x * HW, y = Y * ct - Z * st; let z = Y * st + Z * ct;
        // high pitch: the helix relaxes into flat, overlapping halftone sine lines
        const xf = hws > 0 ? XF[p.s].x[p.j] : p.x, envF = Math.exp(-xf * xf * 3.2), yF = hws > 0 ? yFn(p.s, xf) : 0;
        if (hws > 0) { x = x + (xf * HW - x) * hws; y = y + (yF - y) * hws; z = z * (1 - hws); }
        const pz = 1 + z / 520; x *= pz; y *= pz;
        const q = reduce ? 1 : Math.max(0, Math.min(1, (el - p.delay) / FLY));
        if (q < 1) { const e = ease(q); x = p.sx + (x - p.sx) * e; y = p.sy + (y - p.sy) * e + Math.sin(q * Math.PI) * p.arc; }
        else if (!reduce) {
          if (m) { const ax = cx + x + p.ox - m.x, ay = cy + y + p.oy - m.y, dd = Math.hypot(ax, ay) || 0.01; if (dd < 70) { const fo = (70 - dd) / 70 * 2.4; p.vx += ax / dd * fo; p.vy += ay / dd * fo; } }
          p.vx += -p.ox * 0.08; p.vy += -p.oy * 0.08; p.vx *= 0.82; p.vy *= 0.82; p.ox += p.vx; p.oy += p.vy; x += p.ox; y += p.oy;
        }
        const depth = Math.max(0, Math.min(1, (z / (A + 1) + 1) / 2)), tail = 0.35 + 0.65 * Math.min(1, env * 1.6 / SA[p.s]);
        let al = (p.col ? 0.5 + 0.5 * depth : 0.45 + 0.55 * depth) * tail, sz = p.sz * (0.6 + 0.6 * depth) * (0.55 + 0.45 * tail), col = p.c, round = p.col;
        if (hws > 0) {
          const hw = hws; al += (0.95 - al) * hw; sz += (0.9 + 2.3 * envF - sz) * hw;
          if (!p.cRGB) p.cRGB = p.c.split(',').map(Number);
          col = Math.round(p.cRGB[0] + (p.c2[0] - p.cRGB[0]) * hw) + ',' + Math.round(p.cRGB[1] + (p.c2[1] - p.cRGB[1]) * hw) + ',' + Math.round(p.cRGB[2] + (p.c2[2] - p.cRGB[2]) * hw);
          if (hw > 0.5) round = true;
        }
        al *= (q < 1 ? 0.3 + 0.7 * q : 1);
        draw.push([z, cx + x, cy + y, sz, al, col, round]);
      }
      draw.sort((u, v) => u[0] - v[0]);
      for (const d of draw) {
        ctx.fillStyle = 'rgba(' + d[5] + ',' + d[4].toFixed(3) + ')';
        if (d[6]) { ctx.beginPath(); ctx.arc(d[1], d[2], d[3], 0, 6.2832); ctx.fill(); } else ctx.fillRect(d[1] - d[3] * 0.8, d[2] - d[3] * 0.8, d[3] * 1.6, d[3] * 1.6);
      }
      this.wvRaf = requestAnimationFrame(loop);
    };
    this.wvRaf = requestAnimationFrame(loop);
  }
  closeTrial() {
    if (!this.trialOpen || this.S().cube) return;
    this.setState({ trIn: false, ov: 1 });
    const fin = () => { cancelAnimationFrame(this.htRaf); if (this.beginEl) this.beginEl.classList.remove('is-down'); this.setState({ ov: 0 }); this.trialOpen = false; };
    if (this.reduce) { fin(); return; }
    requestAnimationFrame(() => this.cubeTurn(this.tr1El, this.introEl, 'right', fin));
  }

  bindSlider(el) {
    const set = (v, user) => {
      v = Math.max(0, Math.min(1, v)); this.shapeTarget = v;
      if (user && !this.S().moved) this.setState({ moved: true });
      if (this.thumbEl) this.thumbEl.style.left = (v * 100).toFixed(2) + '%';
      if (this.fillEl) this.fillEl.style.width = (v * 100).toFixed(2) + '%';
      if (this.edgeEl) this.edgeEl.textContent = v.toFixed(2);
      el.setAttribute('aria-valuenow', Math.round(v * 100)); el.setAttribute('aria-valuetext', v < 0.34 ? 'Round' : v > 0.66 ? 'Angular' : 'In between');
    };
    const fromX = (x) => { const b = el.getBoundingClientRect(); return (x - b.left) / b.width; };
    let drag = false;
    el.addEventListener('pointerdown', (e) => { drag = true; el.classList.add('is-drag'); try { el.setPointerCapture(e.pointerId); } catch (_) {} set(fromX(e.clientX), true); e.preventDefault(); });
    el.addEventListener('pointermove', (e) => { if (drag) set(fromX(e.clientX), true); });
    const up = () => { drag = false; el.classList.remove('is-drag'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', (e) => {
      const v = this.shapeTarget === undefined ? 0.5 : this.shapeTarget, st = e.shiftKey ? 0.2 : 0.05;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(v + st, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(v - st, true); e.preventDefault(); }
      else if (e.key === 'Home') { set(0, true); e.preventDefault(); } else if (e.key === 'End') { set(1, true); e.preventDefault(); }
    });
    set(this.shapeTarget === undefined ? 0.5 : this.shapeTarget);
  }
  startHalftone() {
    const cv = this.htCv; if (!cv) return;
    cancelAnimationFrame(this.htRaf);
    const ctx = cv.getContext('2d'), reduce = this.reduce;
    let seed = 11; const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const COL = ['253,255,113', '163,252,250', '162,144,248'];
    const norm = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
    const rndDir = () => { const z = r() * 2 - 1, a = r() * 6.2832, q = Math.sqrt(1 - z * z); return [q * Math.cos(a), z, q * Math.sin(a)]; };
    // spikes for the angular end: spread over the sphere, each a different length
    const NS = 9, SP = [];
    for (let i = 0; i < NS; i++) { const y = 1 - (i + 0.5) / NS * 2, q = Math.sqrt(1 - y * y), a = i * 2.39996 + (r() - 0.5) * 0.3; SP.push({ d: [q * Math.cos(a), y, q * Math.sin(a)], k: 1.85 + r() * 0.45, ph: r() * 6.28 }); }
    const P = [];
    for (let n = 0; n < 1800; n++) {
      let u, onSpike = false;
      if (r() < 0.42 && (onSpike = true)) { const s = SP[Math.floor(r() * NS)].d, j = 0.16 + r() * 0.2; u = norm([s[0] + (r() - 0.5) * j, s[1] + (r() - 0.5) * j, s[2] + (r() - 0.5) * j]); } else u = rndDir();
      const f = onSpike ? 0.3 + 0.7 * Math.pow(r(), 0.7) : r() < 0.72 ? 0.86 + 0.14 * r() : Math.cbrt(r()) * 0.86, colored = r() < 0.42;
      P.push({ u, f, c: colored ? COL[Math.floor(r() * 3)] : '249,249,247', col: colored, s: colored ? 1.5 + r() * 1.1 : 1 + r() * 0.9,
        sx: -900 - r() * 500, sy: (r() - 0.5) * 520, arc: (r() - 0.5) * 220, delay: r() * 700 + (u[1] + 1) * 260, ox: 0, oy: 0, vx: 0, vy: 0 });
    }
    // star radius for a direction: a narrow peak along each spike
    const starR = (u, ts) => { let best = 0.5;
      for (const s of SP) { const d = u[0] * s.d[0] + u[1] * s.d[1] + u[2] * s.d[2]; if (d <= 0.9) continue;
        const g = Math.pow((d - 0.9) / 0.1, 1.6), v = 0.5 + (s.k * (1 + 0.07 * Math.sin(ts * 2.1 + s.ph)) - 0.5) * g; if (v > best) best = v; }
      return best; };
    const mouse = { x: -9999, y: -9999, on: false };
    if (!this._htMouse) {
      this._htMouse = true;
      this.root.addEventListener('pointermove', (ev) => { const b = cv.getBoundingClientRect(), sc = b.width / cv.clientWidth; this.htM = { x: (ev.clientX - b.left) / sc, y: (ev.clientY - b.top) / sc }; });
      this.root.addEventListener('pointerleave', () => { this.htM = null; });
    }
    const ease = (u) => 1 - Math.pow(1 - u, 3);
    if (this.shapeTarget === undefined) this.shapeTarget = 0.5;
    let st = this.shapeTarget, sv = 0, last = performance.now();
    const t0 = performance.now(), FLY = 1500, RB = this.mobile ? 72 : 125, draw = [];
    const loop = (now) => {
      if (this.dead) return;
      const dt = Math.min(40, now - last) / 1000; last = now;
      if (reduce) st = this.shapeTarget; else { sv += (this.shapeTarget - st) * 90 * dt; sv *= Math.pow(0.0009, dt); st += sv * dt; }
      const dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      const el = now - t0, ts = reduce ? 0 : el / 1000, cx = cv.clientWidth * (this.mobile ? 0.5 : 0.742), cy = cv.clientHeight * (this.mobile ? 0.58 : 0.53);
      const a = Math.max(-0.1, Math.min(1.1, st)), ab = Math.sign(a) * Math.pow(Math.abs(a), 1.4);
      // soft colour glows behind, like the drop
      const gIn = reduce ? 1 : Math.min(1, el / 1600);
      for (const g of [[-0.45, -0.45, '253,255,113', 0.12], [0.55, -0.1, '163,252,250', 0.1], [-0.3, 0.55, '162,144,248', 0.12]]) {
        const gx = cx + g[0] * RB * 1.5, gy = cy + g[1] * RB * 1.5, rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, RB * 1.8);
        rg.addColorStop(0, 'rgba(' + g[2] + ',' + (g[3] * gIn).toFixed(3) + ')'); rg.addColorStop(1, 'rgba(' + g[2] + ',0)');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
      }
      const yaw = 0.6 + ts * (0.32 + 0.35 * Math.max(0, a)), tilt = 0.32 + 0.12 * Math.sin(ts * 0.45);
      const cyw = Math.cos(yaw), syw = Math.sin(yaw), ct = Math.cos(tilt), stt = Math.sin(tilt), breathe = 1 + 0.035 * Math.sin(ts * 1.6);
      const m = this.htM; draw.length = 0;
      for (const p of P) {
        const u = p.u, lon = Math.atan2(u[2], u[0]);
        const rr = 1 + 0.06 * Math.sin(3 * lon + ts * 1.3) + 0.05 * Math.sin(4 * u[1] * 3 - ts * 1.1);
        const R = (rr * (1 - ab) + starR(u, ts) * ab) * breathe * p.f * RB;
        let x = u[0] * R, y = u[1] * R, z = u[2] * R;
        let x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw; const y1 = y * ct - z1 * stt; z1 = y * stt + z1 * ct; x = x1; y = y1; z = z1;
        const pz = 1 + (z / RB) * 0.22; x *= pz; y *= pz;
        const q = reduce ? 1 : Math.max(0, Math.min(1, (el - p.delay) / FLY));
        if (q < 1) { const e = ease(q); x = p.sx + (x - p.sx) * e; y = p.sy + (y - p.sy) * e + Math.sin(q * Math.PI) * p.arc; }
        else if (!reduce) {
          if (m) { const ax = cx + x + p.ox - m.x, ay = cy + y + p.oy - m.y, dd = Math.hypot(ax, ay) || 0.01; if (dd < 70) { const fo = (70 - dd) / 70 * 2.4; p.vx += ax / dd * fo; p.vy += ay / dd * fo; } }
          p.vx += -p.ox * 0.08; p.vy += -p.oy * 0.08; p.vx *= 0.82; p.vy *= 0.82; p.ox += p.vx; p.oy += p.vy; x += p.ox; y += p.oy;
        }
        const depth = Math.max(0, Math.min(1, (z / (RB * 1.4) + 1) / 2));
        const al = (p.col ? 0.5 + 0.48 * depth : (0.2 + 0.6 * p.f) * (0.35 + 0.65 * depth)) * (q < 1 ? 0.3 + 0.7 * q : 1);
        draw.push([z, cx + x, cy + y, p.s * (0.75 + 0.5 * depth), al, p.c, p.col]);
      }
      draw.sort((u, v) => u[0] - v[0]);
      for (const d of draw) {
        ctx.fillStyle = 'rgba(' + d[5] + ',' + d[4].toFixed(3) + ')';
        if (d[6]) { ctx.beginPath(); ctx.arc(d[1], d[2], d[3], 0, 6.2832); ctx.fill(); } else ctx.fillRect(d[1] - d[3] / 2, d[2] - d[3] / 2, d[3], d[3]);
      }
      this.htRaf = requestAnimationFrame(loop);
    };
    this.htRaf = requestAnimationFrame(loop);
  }
  later(ms, fn) { this.timers = this.timers || []; this.timers.push(setTimeout(fn, ms)); }
  boot() {
    const cv = this.cv, ctx = cv.getContext('2d'), reduce = this.reduce;
    let seed = 11; const r = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const R = 0.5, CY = 0.25, TOP = -0.95;
    const width = (y) => y >= CY ? Math.sqrt(Math.max(0, R * R - (y - CY) * (y - CY))) : R * Math.pow((y - TOP) / (CY - TOP), 1.5);
    const COL = ['162,144,248', '84,196,206', '222,200,52'];
    const P = [];
    while (P.length < 1100) {
      const y = TOP + r() * (CY + R - TOP), w = width(y);
      if (r() > (w / R) * (w / R)) continue;
      const colored = r() < 0.42;
      P.push({ hy: y, rad: r() < 0.7 ? 0.62 + 0.38 * Math.sqrt(r()) : Math.sqrt(r()), th: r() * 6.2832, ox: 0, oy: 0, vx: 0, vy: 0,
        sx: -2.8 - r() * 1.6, sy: y + (r() - 0.5) * 1.6, arc: (r() - 0.5) * 0.7, delay: r() * 700 + (y - TOP) * 160, mdelay: 0, mvx: 0, mvy: 0,
        c: colored ? COL[Math.floor(r() * 3)] : '51,51,49', col: colored, s: colored ? 1.1 + r() * 0.8 : 0.7 + r() * 0.7 });
    }
    // particle cursor: an emitter, particles burst out, drift up like scent and fade
    const SPARK = [], PAL = ['162,144,248', '84,196,206', '222,200,52', '51,51,49'];
    const spawn = (x, y, n, speed, ring) => {
      for (let i = 0; i < n && SPARK.length < 420; i++) {
        const a = r() * 6.2832, v = speed * (0.35 + r() * 0.9);
        const sx = ring ? x + Math.cos(a) * ring : x + (r() - 0.5) * 4, sy = ring ? y + Math.sin(a) * ring : y + (r() - 0.5) * 4;
        SPARK.push({ x: sx, y: sy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: 0.9 + r() * 0.9, s: 0.9 + r() * 1.7, c: PAL[Math.floor(r() * 4)] });
      }
    };
    const mouse = { x: -100, y: -100, px: -100, py: -100, on: false, hot: false };
    const local = (ev) => { const b = this.root.getBoundingClientRect(), sc = b.width / this.root.clientWidth; return [(ev.clientX - b.left) / sc, (ev.clientY - b.top) / sc]; };
    this.root.addEventListener('pointermove', (ev) => { const p = local(ev); mouse.x = p[0]; mouse.y = p[1]; mouse.on = true; mouse.hot = !!(ev.target.closest && ev.target.closest('a,button,input')); });
    this.root.addEventListener('pointerleave', () => { mouse.on = false; });
    // timeline
    for (const p of P) {
      const a = Math.atan2(p.hy, p.th === undefined ? 1 : Math.cos(p.th)) + (r() - 0.5) * 2.2, f = 0.35 + r() * 0.95;
      p.mvx = Math.cos(a) * f; p.mvy = Math.sin(a) * f - 0.25; p.mdelay = r() * 520 + (p.hy + 1) * 140; p.mswirl = (r() - 0.5) * 0.9;
    }
    const FLY = 1500, MOVE_AT = reduce ? 0 : 3000, MOVE_DUR = reduce ? 1 : 2000, MFLY = 1250, RISE_AT = reduce ? 0 : 4300;
    if (reduce) { this.setState({ risen: true, tag: true, hint: true, p2: true }); this.p2on = true; this.dotShown = true; this.ready = true; }
    else {
      this.later(RISE_AT, () => this.setState({ risen: true }));
      const end = RISE_AT + 5 * 65 + 650;
      this.later(end, () => { this.dotShown = true; this.dotPop = performance.now(); });
      this.later(end + 250, () => this.setState({ tag: true }));
      this.later(end + 800, () => { this.ready = true; this.setState({ hint: true }); });
    }
    const ease = (u) => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    const t0 = performance.now();
    let dot = null, lastT = t0, cur = 0;
    this.target = 0;
    const frame = (now) => {
      if (this.dead) return;
      const el = now - t0, dt = Math.min(40, now - lastT) / 1000; lastT = now;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = Math.round(cv.clientWidth * dpr), H = Math.round(cv.clientHeight * dpr);
      if (W < 2 || H < 2) { this.raf = requestAnimationFrame(frame); return; }
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      const cw = cv.clientWidth, ch = cv.clientHeight, k = W / cw;
      // smooth horizontal scroll
      cur += (this.target - cur) * (reduce ? 1 : Math.min(1, dt * 6));
      if (Math.abs(this.target - cur) < 0.1) cur = this.target;
      const prog = cur / cw;
      if (!reduce) {
        if (!this.p2on && cur > cw * 0.3) { this.p2on = true; this.setState({ p2: true }); }
        else if (this.p2on && cur < cw * 0.06) { this.p2on = false; this.setState({ p2: false }); }
      }
      if (this.track) this.track.style.transform = 'translate3d(' + (-cur).toFixed(2) + 'px,0,0)';
      if (this.word) this.word.style.transform = 'translate3d(' + (-cur * 0.45).toFixed(2) + 'px,0,0) scale(' + (1 + 0.4 * Math.min(1, prog)).toFixed(4) + ')';
      if (this.tagEl && this.S().tag) this.tagEl.style.opacity = Math.max(0, 1 - prog * 4).toFixed(3);
      ctx.clearRect(0, 0, W, H);
      // drop: centre → top-left, then leaves with the first screen
      const m = reduce ? 1 : ease(Math.max(0, Math.min(1, (el - MOVE_AT) / MOVE_DUR)));
      const mb = this.mobile, cx0 = cw / 2, cy0 = ch * 0.46, s0 = ch * (mb ? 0.2 : 0.27), cx1 = mb ? 64 : 222, cy1 = mb ? 318 : 272, s1 = ch * (mb ? 0.07 : 0.085);
      const dS = (s0 + (s1 - s0) * m), dx = cx0 + (cx1 - cx0) * m - cur * 1.15, dy = cy0 + (cy1 - cy0) * m;
      const ox = dx * k, oy = dy * k, S = dS * k;
      const glow = [[-0.42, -0.5, '253,255,113', 0.55], [0.55, -0.15, '163,252,250', 0.5], [-0.35, 0.55, '162,144,248', 0.32]];
      const gIn = reduce ? 1 : Math.min(1, el / 1600);
      for (const g of glow) {
        const gx = ox + g[0] * S * 1.6, gy = oy + g[1] * S * 1.6;
        const rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, S * 1.7);
        rg.addColorStop(0, 'rgba(' + g[2] + ',' + (g[3] * gIn).toFixed(3) + ')'); rg.addColorStop(1, 'rgba(' + g[2] + ',0)');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
      }
      const spin = 0.6 + el * 0.00028, sizeK = Math.max(0.55, dS / (ch * 0.27)) * dpr;
      const mx = (mouse.x - dx) / dS, my = (mouse.y - dy) / dS;
      const draw = [];
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const rr = p.rad * width(p.hy), ang = p.th + spin, z = rr * Math.sin(ang);
        let x = rr * Math.cos(ang) * (1 + z * 0.35), y = p.hy;
        if (!reduce && el < p.delay + FLY) {
          const q = Math.max(0, (el - p.delay) / FLY), e = 1 - Math.pow(1 - q, 3);
          x = p.sx + (x - p.sx) * e; y = p.sy + (y - p.sy) * e + Math.sin(q * Math.PI) * p.arc;
        } else if (!reduce) {
          // the cursor pushes particles aside
          if (mouse.on) { const ax = x + p.ox - mx, ay = y + p.oy - my, dist = Math.hypot(ax, ay) || 0.001; if (dist < 0.32) { const f = (0.32 - dist) / 0.32 * 0.035; p.vx += ax / dist * f; p.vy += ay / dist * f; } }
          p.vx += -p.ox * 0.08; p.vy += -p.oy * 0.08; p.vx *= 0.82; p.vy *= 0.82; p.ox += p.vx; p.oy += p.vy;
          x += p.ox; y += p.oy;
        }
        const depth = Math.max(0, Math.min(1, (z / R + 1) / 2));
        const a = p.col ? 0.5 + 0.45 * depth : (0.12 + 0.5 * p.rad) * (0.4 + 0.6 * depth);
        // move: each particle breaks away, flies its own arc, and re-forms the small drop
        const q2 = reduce ? 1 : Math.max(0, Math.min(1, (el - MOVE_AT - p.mdelay) / MFLY)), e2 = ease(q2), lift = Math.sin(q2 * Math.PI);
        const sc2 = s0 + (s1 - s0) * e2, bx = cx0 + (cx1 - cx0) * e2 - cur * 1.15, by = cy0 + (cy1 - cy0) * e2;
        const sw = p.mswirl * lift, cs = Math.cos(sw), sn = Math.sin(sw);
        const px = (x * cs - y * sn) * sc2 + p.mvx * s0 * 0.9 * lift, py = (x * sn + y * cs) * sc2 + p.mvy * s0 * 0.9 * lift;
        const szK = Math.max(0.55, sc2 / s0) * dpr * (1 + 0.35 * lift);
        draw.push([z, (bx + px) * k, (by + py) * k, p.s * szK * (0.8 + 0.4 * depth), a, p.c, p.col]);
      }
      draw.sort((u, v) => u[0] - v[0]);
      for (const d of draw) {
        ctx.fillStyle = 'rgba(' + d[5] + ',' + d[4].toFixed(3) + ')';
        if (d[6]) { ctx.beginPath(); ctx.arc(d[1], d[2], d[3], 0, 6.2832); ctx.fill(); } else ctx.fillRect(d[1] - d[3] / 2, d[2] - d[3] / 2, d[3], d[3]);
      }
      // the full stop: sits after "Scent", falls to the line on first scroll, then rolls along it as progress
      if (this.dotShown && this.dotEl && this.lineEl && this.root) {
        const rb = this.root.getBoundingClientRect(), sc = rb.width / cw;
        const db = this.dotEl.getBoundingClientRect(), lb = this.lineEl.getBoundingClientRect();
        const lineY = (lb.top + lb.height / 2 - rb.top) / sc, lineL = (lb.left - rb.left) / sc, lineR = (lb.right - rb.left) / sc;
        if (!dot) dot = { x: 0, y: 0, vy: 0, landed: false, r: 0 };
        const homeR = db.width / sc / 2, homeX = (db.left - rb.left) / sc + homeR, homeY = (db.top - rb.top) / sc + homeR;
        if (!this.fall) { dot.x = homeX; dot.y = homeY; dot.r = homeR; }
        else {
          const restR = 6;
          dot.r += (restR - dot.r) * Math.min(1, dt * 3);
          if (!dot.landed) {
            dot.vy += 2600 * dt; dot.y += dot.vy * dt;
            if (dot.y >= lineY) { dot.y = lineY; dot.vy = -dot.vy * 0.36; if (Math.abs(dot.vy) < 70) { dot.vy = 0; dot.landed = true; } }
          } else dot.y = lineY;
          if (dot.landed) { const tx = lineL + restR + prog * (lineR - lineL - 2 * restR); dot.x += (tx - dot.x) * Math.min(1, dt * 4); }
        }
        const pop = this.dotPop ? Math.min(1, (now - this.dotPop) / 380) : 1;
        const sz = dot.r * (pop < 1 ? 1 + 0.25 * Math.sin(pop * Math.PI) : 1) * Math.min(1, pop * 2.5);
        ctx.fillStyle = '#333331'; ctx.beginPath(); ctx.arc(dot.x * k, dot.y * k, Math.max(0, sz * k), 0, 6.2832); ctx.fill();
      }
      // particle cursor
      if (!reduce) {
        const vx = mouse.x - mouse.px, vy = mouse.y - mouse.py, sp = Math.min(60, Math.hypot(vx, vy)); mouse.px = mouse.x; mouse.py = mouse.y;
        if (mouse.on) {
          if (mouse.hot) spawn(mouse.x, mouse.y, 2, 6, 15);
          else if (sp > 0.5) spawn(mouse.x, mouse.y, Math.min(7, 1 + Math.floor(sp * 0.35)), 18 + sp * 2.2, 0);
          else if (r() < 0.35) spawn(mouse.x, mouse.y, 1, 10, 0);
        }
        for (let i = SPARK.length - 1; i >= 0; i--) {
          const q = SPARK[i];
          q.vx *= 0.93; q.vy = q.vy * 0.93 - 28 * dt;           // drag, then a slow rise like vapour
          q.vx += Math.sin((q.y + el * 0.05) * 0.05) * 3 * dt;    // a little sideways wobble
          q.x += q.vx * dt; q.y += q.vy * dt; q.life -= q.decay * dt;
          if (q.life <= 0) { SPARK.splice(i, 1); continue; }
          ctx.fillStyle = 'rgba(' + q.c + ',' + (q.life * (q.c === '51,51,49' ? 0.7 : 0.95)).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(q.x * k, q.y * k, Math.max(0, q.s * (0.4 + 0.6 * q.life) * k), 0, 6.2832); ctx.fill();
        }
        if (mouse.on) { ctx.fillStyle = '#333331'; ctx.beginPath(); ctx.arc(mouse.x * k, mouse.y * k, (mouse.hot ? 3.2 : 2.4) * k, 0, 6.2832); ctx.fill(); }
      }
      this.raf = requestAnimationFrame(frame);
    };
    this.raf = requestAnimationFrame(frame);
  }
}

// The markup: one root with the intro, five trials, composing, profile, sources and share card.
const template = (v) => html`<div ${ref(v.setRoot)} @wheel=${v.onWheel} style="position: relative; box-sizing: border-box; height: 832px; cursor: ${v.cursor}; background: ${v.stageBg}; color: #333331; font-family: 'Inter Tight', 'Helvetica Neue', Arial, sans-serif; overflow: hidden">
<div ${ref(v.setIntro)} data-m="intro" style="position: absolute; inset: 0; overflow: hidden; background: #F9F9F7; visibility: ${v.introVis}">

  <div ${ref(v.setTrack)} style="position: absolute; top: 0; left: 0; height: 100%; width: 200%; display: flex; will-change: transform">

    <!-- Panel 1 · Scent. -->
    <section aria-label="Intro" style="position: relative; flex: 0 0 50%; height: 100%">
      <p ${ref(v.setTag)} class="im-fade" data-m="itag" style="position: absolute; left: 90px; top: 446px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 12px; font-weight: 400; line-height: 1.3; color: #4A4A47; opacity: ${v.tagOp}; transform: translateY(${v.tagY}px)">You can&#8217;t smell through a screen.<br>So we ask your other senses.</p>
      <h1 ${ref(v.setWord)} aria-label="Scent." data-m="iword" style="position: absolute; left: 80px; top: 488px; transform-origin: 0% 100%; will-change: transform; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 300px; font-weight: 700; line-height: 0.86; letter-spacing: -0.075em; color: #333331; white-space: nowrap">
        ${(v.letters || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}<span ${ref(v.setDot)} aria-hidden="true" style="display: inline-block; width: 0.155em; height: 0.155em; margin-left: 0.07em; vertical-align: baseline; opacity: 0"></span>
      </h1>
      <button type="button" @click=${v.advance} class="im-fade" style="position: absolute; right: 70px; bottom: 74px; border: 0; background: none; font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #6B6B67; cursor: pointer; opacity: ${v.hintOp}; min-height: 44px">SCROLL &#8594;</button>
    </section>

    <!-- Panel 2 · Smell translated -->
    <section aria-label="Smell translated" style="position: relative; flex: 0 0 50%; height: 100%">
      <button type="button" @click=${v.seeLast} class="st-glass" data-m="ilast" style="position: absolute; right: 265px; top: 98px; height: 58px; padding: 0 28px; border-radius: 999px; font-family: 'Inter Tight', sans-serif; font-size: 16.5px; font-weight: 400; color: #333331; cursor: pointer; display: ${v.lastDisp}">See my last profile</button>
      <button type="button" ${ref(v.setBegin)} @click=${v.beginTrials} class="st-glass" data-m="ibegin" style="position: absolute; right: 57px; top: 98px; height: 58px; padding: 0 34px; border-radius: 999px; font-family: 'Inter Tight', sans-serif; font-size: 16.5px; font-weight: 400; color: #333331; cursor: pointer">Begin the trials</button>
      <span data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #D6D6D2; width: 132px">THE FIVE SENSES</span>
      <div data-m="irow" style="position: absolute; left: 71px; right: 69px; top: 259px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px"><div @mouseenter=${v.on0} @mouseleave=${v.off} style="position: relative; height: 222px; min-width: 0">
          <button type="button" class="sv-btn sv-icons" aria-label="Shape, show details" aria-expanded="${v.open0}" @focus=${v.on0} @blur=${v.off} style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: ${v.iconOp0}; transform: scale(${v.iconScale0})"><svg aria-hidden="true" width="92" height="92" viewBox="-6 -6 104 104" fill="none" stroke="#333331" stroke-width="1" overflow="visible"><path d="M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z"><animate attributeName="d" dur="8s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.17;0.25;0.42;0.5;0.67;0.75;0.92;1" keySplines="0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1" values="M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z;M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z;M46.00 -4.60 L49.79 2.63 L52.68 8.12 L54.98 12.50 L56.88 16.12 L58.50 19.20 L59.91 21.90 L61.18 24.32 L62.34 26.53 L63.42 28.58 L64.44 30.53 L65.42 32.40 L66.39 34.23 L67.34 36.05 L68.30 37.88 L69.29 39.76 L70.31 41.71 L71.40 43.78 L72.56 46.00 L73.84 48.44 L75.28 51.16 L76.91 54.28 L78.84 57.95 L81.18 62.40 L84.12 68.01 L88.01 75.41 L90.57 83.40 L83.40 83.40 L77.38 83.40 L72.19 83.40 L67.59 83.40 L63.44 83.40 L59.61 83.40 L56.02 83.40 L52.59 83.40 L49.27 83.40 L46.00 83.40 L42.73 83.40 L39.41 83.40 L35.98 83.40 L32.39 83.40 L28.56 83.40 L24.41 83.40 L19.81 83.40 L14.62 83.40 L8.60 83.40 L1.43 83.40 L3.99 75.41 L7.88 68.01 L10.82 62.40 L13.16 57.95 L15.09 54.28 L16.72 51.16 L18.16 48.44 L19.43 46.00 L20.60 43.78 L21.69 41.71 L22.71 39.76 L23.70 37.88 L24.66 36.05 L25.61 34.23 L26.58 32.40 L27.56 30.53 L28.58 28.58 L29.66 26.53 L30.82 24.32 L32.09 21.90 L33.50 19.20 L35.12 16.12 L37.02 12.50 L39.32 8.12 L42.21 2.63 Z;M46.00 -4.60 L49.79 2.63 L52.68 8.12 L54.98 12.50 L56.88 16.12 L58.50 19.20 L59.91 21.90 L61.18 24.32 L62.34 26.53 L63.42 28.58 L64.44 30.53 L65.42 32.40 L66.39 34.23 L67.34 36.05 L68.30 37.88 L69.29 39.76 L70.31 41.71 L71.40 43.78 L72.56 46.00 L73.84 48.44 L75.28 51.16 L76.91 54.28 L78.84 57.95 L81.18 62.40 L84.12 68.01 L88.01 75.41 L90.57 83.40 L83.40 83.40 L77.38 83.40 L72.19 83.40 L67.59 83.40 L63.44 83.40 L59.61 83.40 L56.02 83.40 L52.59 83.40 L49.27 83.40 L46.00 83.40 L42.73 83.40 L39.41 83.40 L35.98 83.40 L32.39 83.40 L28.56 83.40 L24.41 83.40 L19.81 83.40 L14.62 83.40 L8.60 83.40 L1.43 83.40 L3.99 75.41 L7.88 68.01 L10.82 62.40 L13.16 57.95 L15.09 54.28 L16.72 51.16 L18.16 48.44 L19.43 46.00 L20.60 43.78 L21.69 41.71 L22.71 39.76 L23.70 37.88 L24.66 36.05 L25.61 34.23 L26.58 32.40 L27.56 30.53 L28.58 28.58 L29.66 26.53 L30.82 24.32 L32.09 21.90 L33.50 19.20 L35.12 16.12 L37.02 12.50 L39.32 8.12 L42.21 2.63 Z;M46.00 -0.20 L50.03 -0.02 L54.02 0.50 L57.96 1.37 L61.80 2.59 L65.52 4.13 L69.10 5.99 L72.50 8.16 L75.70 10.61 L78.67 13.33 L81.39 16.30 L83.84 19.50 L86.01 22.90 L87.87 26.48 L89.41 30.20 L90.63 34.04 L91.50 37.98 L92.02 41.97 L92.20 46.00 L92.02 50.03 L91.50 54.02 L90.63 57.96 L89.41 61.80 L87.87 65.52 L86.01 69.10 L83.84 72.50 L81.39 75.70 L78.67 78.67 L75.70 81.39 L72.50 83.84 L69.10 86.01 L65.52 87.87 L61.80 89.41 L57.96 90.63 L54.02 91.50 L50.03 92.02 L46.00 92.20 L41.97 92.02 L37.98 91.50 L34.04 90.63 L30.20 89.41 L26.48 87.87 L22.90 86.01 L19.50 83.84 L16.30 81.39 L13.33 78.67 L10.61 75.70 L8.16 72.50 L5.99 69.10 L4.13 65.52 L2.59 61.80 L1.37 57.96 L0.50 54.02 L-0.02 50.03 L-0.20 46.00 L-0.02 41.97 L0.50 37.98 L1.37 34.04 L2.59 30.20 L4.13 26.48 L5.99 22.90 L8.16 19.50 L10.61 16.30 L13.33 13.33 L16.30 10.61 L19.50 8.16 L22.90 5.99 L26.48 4.13 L30.20 2.59 L34.04 1.37 L37.98 0.50 L41.97 -0.02 Z;M46.00 -0.20 L50.03 -0.02 L54.02 0.50 L57.96 1.37 L61.80 2.59 L65.52 4.13 L69.10 5.99 L72.50 8.16 L75.70 10.61 L78.67 13.33 L81.39 16.30 L83.84 19.50 L86.01 22.90 L87.87 26.48 L89.41 30.20 L90.63 34.04 L91.50 37.98 L92.02 41.97 L92.20 46.00 L92.02 50.03 L91.50 54.02 L90.63 57.96 L89.41 61.80 L87.87 65.52 L86.01 69.10 L83.84 72.50 L81.39 75.70 L78.67 78.67 L75.70 81.39 L72.50 83.84 L69.10 86.01 L65.52 87.87 L61.80 89.41 L57.96 90.63 L54.02 91.50 L50.03 92.02 L46.00 92.20 L41.97 92.02 L37.98 91.50 L34.04 90.63 L30.20 89.41 L26.48 87.87 L22.90 86.01 L19.50 83.84 L16.30 81.39 L13.33 78.67 L10.61 75.70 L8.16 72.50 L5.99 69.10 L4.13 65.52 L2.59 61.80 L1.37 57.96 L0.50 54.02 L-0.02 50.03 L-0.20 46.00 L-0.02 41.97 L0.50 37.98 L1.37 34.04 L2.59 30.20 L4.13 26.48 L5.99 22.90 L8.16 19.50 L10.61 16.30 L13.33 13.33 L16.30 10.61 L19.50 8.16 L22.90 5.99 L26.48 4.13 L30.20 2.59 L34.04 1.37 L37.98 0.50 L41.97 -0.02 Z;M46.00 -4.60 L49.62 4.59 L52.16 11.04 L54.07 15.88 L55.58 19.69 L56.81 22.82 L57.85 25.47 L58.76 27.77 L60.84 28.32 L63.52 28.48 L66.65 28.68 L70.41 28.91 L75.11 29.20 L81.23 29.57 L89.71 30.09 L89.20 34.42 L83.10 39.46 L78.63 43.15 L75.17 46.00 L72.37 48.31 L70.03 50.24 L68.01 51.90 L67.16 53.70 L67.79 56.16 L68.53 59.01 L69.40 62.38 L70.47 66.53 L71.84 71.84 L73.69 79.00 L73.80 85.70 L66.08 80.79 L60.59 77.29 L56.42 74.64 L53.11 72.53 L50.37 70.78 L48.04 69.30 L46.00 68.00 L43.96 69.30 L41.63 70.78 L38.89 72.53 L35.58 74.64 L31.41 77.29 L25.92 80.79 L18.20 85.70 L18.31 79.00 L20.16 71.84 L21.53 66.53 L22.60 62.38 L23.47 59.01 L24.21 56.16 L24.84 53.70 L23.99 51.90 L21.97 50.24 L19.63 48.31 L16.83 46.00 L13.37 43.15 L8.90 39.46 L2.80 34.42 L2.29 30.09 L10.77 29.57 L16.89 29.20 L21.59 28.91 L25.35 28.68 L28.48 28.48 L31.16 28.32 L33.24 27.77 L34.15 25.47 L35.19 22.82 L36.42 19.69 L37.93 15.88 L39.84 11.04 L42.38 4.59 Z;M46.00 -4.60 L49.62 4.59 L52.16 11.04 L54.07 15.88 L55.58 19.69 L56.81 22.82 L57.85 25.47 L58.76 27.77 L60.84 28.32 L63.52 28.48 L66.65 28.68 L70.41 28.91 L75.11 29.20 L81.23 29.57 L89.71 30.09 L89.20 34.42 L83.10 39.46 L78.63 43.15 L75.17 46.00 L72.37 48.31 L70.03 50.24 L68.01 51.90 L67.16 53.70 L67.79 56.16 L68.53 59.01 L69.40 62.38 L70.47 66.53 L71.84 71.84 L73.69 79.00 L73.80 85.70 L66.08 80.79 L60.59 77.29 L56.42 74.64 L53.11 72.53 L50.37 70.78 L48.04 69.30 L46.00 68.00 L43.96 69.30 L41.63 70.78 L38.89 72.53 L35.58 74.64 L31.41 77.29 L25.92 80.79 L18.20 85.70 L18.31 79.00 L20.16 71.84 L21.53 66.53 L22.60 62.38 L23.47 59.01 L24.21 56.16 L24.84 53.70 L23.99 51.90 L21.97 50.24 L19.63 48.31 L16.83 46.00 L13.37 43.15 L8.90 39.46 L2.80 34.42 L2.29 30.09 L10.77 29.57 L16.89 29.20 L21.59 28.91 L25.35 28.68 L28.48 28.48 L31.16 28.32 L33.24 27.77 L34.15 25.47 L35.19 22.82 L36.42 19.69 L37.93 15.88 L39.84 11.04 L42.38 4.59 Z;M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z"></animate></path></svg></button>
          <article class="sv-card" style="position: absolute; left: 0; right: 0; top: 0; pointer-events: none; opacity: ${v.cardOp0}; transform: translateY(${v.cardY0}px); background: #FCFCFC; border-radius: 4px; box-shadow: 0 8px 22px -14px rgba(0,0,0,0.28); padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
          <div style="height: 44px; display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="38" height="38" viewBox="-6 -6 104 104" fill="none" stroke="#333331" stroke-width="1" overflow="visible"><path d="M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z"><animate attributeName="d" dur="8s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.17;0.25;0.42;0.5;0.67;0.75;0.92;1" keySplines="0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1" values="M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z;M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z;M46.00 -4.60 L49.79 2.63 L52.68 8.12 L54.98 12.50 L56.88 16.12 L58.50 19.20 L59.91 21.90 L61.18 24.32 L62.34 26.53 L63.42 28.58 L64.44 30.53 L65.42 32.40 L66.39 34.23 L67.34 36.05 L68.30 37.88 L69.29 39.76 L70.31 41.71 L71.40 43.78 L72.56 46.00 L73.84 48.44 L75.28 51.16 L76.91 54.28 L78.84 57.95 L81.18 62.40 L84.12 68.01 L88.01 75.41 L90.57 83.40 L83.40 83.40 L77.38 83.40 L72.19 83.40 L67.59 83.40 L63.44 83.40 L59.61 83.40 L56.02 83.40 L52.59 83.40 L49.27 83.40 L46.00 83.40 L42.73 83.40 L39.41 83.40 L35.98 83.40 L32.39 83.40 L28.56 83.40 L24.41 83.40 L19.81 83.40 L14.62 83.40 L8.60 83.40 L1.43 83.40 L3.99 75.41 L7.88 68.01 L10.82 62.40 L13.16 57.95 L15.09 54.28 L16.72 51.16 L18.16 48.44 L19.43 46.00 L20.60 43.78 L21.69 41.71 L22.71 39.76 L23.70 37.88 L24.66 36.05 L25.61 34.23 L26.58 32.40 L27.56 30.53 L28.58 28.58 L29.66 26.53 L30.82 24.32 L32.09 21.90 L33.50 19.20 L35.12 16.12 L37.02 12.50 L39.32 8.12 L42.21 2.63 Z;M46.00 -4.60 L49.79 2.63 L52.68 8.12 L54.98 12.50 L56.88 16.12 L58.50 19.20 L59.91 21.90 L61.18 24.32 L62.34 26.53 L63.42 28.58 L64.44 30.53 L65.42 32.40 L66.39 34.23 L67.34 36.05 L68.30 37.88 L69.29 39.76 L70.31 41.71 L71.40 43.78 L72.56 46.00 L73.84 48.44 L75.28 51.16 L76.91 54.28 L78.84 57.95 L81.18 62.40 L84.12 68.01 L88.01 75.41 L90.57 83.40 L83.40 83.40 L77.38 83.40 L72.19 83.40 L67.59 83.40 L63.44 83.40 L59.61 83.40 L56.02 83.40 L52.59 83.40 L49.27 83.40 L46.00 83.40 L42.73 83.40 L39.41 83.40 L35.98 83.40 L32.39 83.40 L28.56 83.40 L24.41 83.40 L19.81 83.40 L14.62 83.40 L8.60 83.40 L1.43 83.40 L3.99 75.41 L7.88 68.01 L10.82 62.40 L13.16 57.95 L15.09 54.28 L16.72 51.16 L18.16 48.44 L19.43 46.00 L20.60 43.78 L21.69 41.71 L22.71 39.76 L23.70 37.88 L24.66 36.05 L25.61 34.23 L26.58 32.40 L27.56 30.53 L28.58 28.58 L29.66 26.53 L30.82 24.32 L32.09 21.90 L33.50 19.20 L35.12 16.12 L37.02 12.50 L39.32 8.12 L42.21 2.63 Z;M46.00 -0.20 L50.03 -0.02 L54.02 0.50 L57.96 1.37 L61.80 2.59 L65.52 4.13 L69.10 5.99 L72.50 8.16 L75.70 10.61 L78.67 13.33 L81.39 16.30 L83.84 19.50 L86.01 22.90 L87.87 26.48 L89.41 30.20 L90.63 34.04 L91.50 37.98 L92.02 41.97 L92.20 46.00 L92.02 50.03 L91.50 54.02 L90.63 57.96 L89.41 61.80 L87.87 65.52 L86.01 69.10 L83.84 72.50 L81.39 75.70 L78.67 78.67 L75.70 81.39 L72.50 83.84 L69.10 86.01 L65.52 87.87 L61.80 89.41 L57.96 90.63 L54.02 91.50 L50.03 92.02 L46.00 92.20 L41.97 92.02 L37.98 91.50 L34.04 90.63 L30.20 89.41 L26.48 87.87 L22.90 86.01 L19.50 83.84 L16.30 81.39 L13.33 78.67 L10.61 75.70 L8.16 72.50 L5.99 69.10 L4.13 65.52 L2.59 61.80 L1.37 57.96 L0.50 54.02 L-0.02 50.03 L-0.20 46.00 L-0.02 41.97 L0.50 37.98 L1.37 34.04 L2.59 30.20 L4.13 26.48 L5.99 22.90 L8.16 19.50 L10.61 16.30 L13.33 13.33 L16.30 10.61 L19.50 8.16 L22.90 5.99 L26.48 4.13 L30.20 2.59 L34.04 1.37 L37.98 0.50 L41.97 -0.02 Z;M46.00 -0.20 L50.03 -0.02 L54.02 0.50 L57.96 1.37 L61.80 2.59 L65.52 4.13 L69.10 5.99 L72.50 8.16 L75.70 10.61 L78.67 13.33 L81.39 16.30 L83.84 19.50 L86.01 22.90 L87.87 26.48 L89.41 30.20 L90.63 34.04 L91.50 37.98 L92.02 41.97 L92.20 46.00 L92.02 50.03 L91.50 54.02 L90.63 57.96 L89.41 61.80 L87.87 65.52 L86.01 69.10 L83.84 72.50 L81.39 75.70 L78.67 78.67 L75.70 81.39 L72.50 83.84 L69.10 86.01 L65.52 87.87 L61.80 89.41 L57.96 90.63 L54.02 91.50 L50.03 92.02 L46.00 92.20 L41.97 92.02 L37.98 91.50 L34.04 90.63 L30.20 89.41 L26.48 87.87 L22.90 86.01 L19.50 83.84 L16.30 81.39 L13.33 78.67 L10.61 75.70 L8.16 72.50 L5.99 69.10 L4.13 65.52 L2.59 61.80 L1.37 57.96 L0.50 54.02 L-0.02 50.03 L-0.20 46.00 L-0.02 41.97 L0.50 37.98 L1.37 34.04 L2.59 30.20 L4.13 26.48 L5.99 22.90 L8.16 19.50 L10.61 16.30 L13.33 13.33 L16.30 10.61 L19.50 8.16 L22.90 5.99 L26.48 4.13 L30.20 2.59 L34.04 1.37 L37.98 0.50 L41.97 -0.02 Z;M46.00 -4.60 L49.62 4.59 L52.16 11.04 L54.07 15.88 L55.58 19.69 L56.81 22.82 L57.85 25.47 L58.76 27.77 L60.84 28.32 L63.52 28.48 L66.65 28.68 L70.41 28.91 L75.11 29.20 L81.23 29.57 L89.71 30.09 L89.20 34.42 L83.10 39.46 L78.63 43.15 L75.17 46.00 L72.37 48.31 L70.03 50.24 L68.01 51.90 L67.16 53.70 L67.79 56.16 L68.53 59.01 L69.40 62.38 L70.47 66.53 L71.84 71.84 L73.69 79.00 L73.80 85.70 L66.08 80.79 L60.59 77.29 L56.42 74.64 L53.11 72.53 L50.37 70.78 L48.04 69.30 L46.00 68.00 L43.96 69.30 L41.63 70.78 L38.89 72.53 L35.58 74.64 L31.41 77.29 L25.92 80.79 L18.20 85.70 L18.31 79.00 L20.16 71.84 L21.53 66.53 L22.60 62.38 L23.47 59.01 L24.21 56.16 L24.84 53.70 L23.99 51.90 L21.97 50.24 L19.63 48.31 L16.83 46.00 L13.37 43.15 L8.90 39.46 L2.80 34.42 L2.29 30.09 L10.77 29.57 L16.89 29.20 L21.59 28.91 L25.35 28.68 L28.48 28.48 L31.16 28.32 L33.24 27.77 L34.15 25.47 L35.19 22.82 L36.42 19.69 L37.93 15.88 L39.84 11.04 L42.38 4.59 Z;M46.00 -4.60 L49.62 4.59 L52.16 11.04 L54.07 15.88 L55.58 19.69 L56.81 22.82 L57.85 25.47 L58.76 27.77 L60.84 28.32 L63.52 28.48 L66.65 28.68 L70.41 28.91 L75.11 29.20 L81.23 29.57 L89.71 30.09 L89.20 34.42 L83.10 39.46 L78.63 43.15 L75.17 46.00 L72.37 48.31 L70.03 50.24 L68.01 51.90 L67.16 53.70 L67.79 56.16 L68.53 59.01 L69.40 62.38 L70.47 66.53 L71.84 71.84 L73.69 79.00 L73.80 85.70 L66.08 80.79 L60.59 77.29 L56.42 74.64 L53.11 72.53 L50.37 70.78 L48.04 69.30 L46.00 68.00 L43.96 69.30 L41.63 70.78 L38.89 72.53 L35.58 74.64 L31.41 77.29 L25.92 80.79 L18.20 85.70 L18.31 79.00 L20.16 71.84 L21.53 66.53 L22.60 62.38 L23.47 59.01 L24.21 56.16 L24.84 53.70 L23.99 51.90 L21.97 50.24 L19.63 48.31 L16.83 46.00 L13.37 43.15 L8.90 39.46 L2.80 34.42 L2.29 30.09 L10.77 29.57 L16.89 29.20 L21.59 28.91 L25.35 28.68 L28.48 28.48 L31.16 28.32 L33.24 27.77 L34.15 25.47 L35.19 22.82 L36.42 19.69 L37.93 15.88 L39.84 11.04 L42.38 4.59 Z;M46.00 2.00 L49.85 2.00 L53.76 2.00 L57.79 2.00 L62.01 2.00 L66.52 2.00 L71.40 2.00 L76.81 2.00 L82.92 2.00 L90.00 2.00 L90.00 9.08 L90.00 15.19 L90.00 20.60 L90.00 25.48 L90.00 29.99 L90.00 34.21 L90.00 38.24 L90.00 42.15 L90.00 46.00 L90.00 49.85 L90.00 53.76 L90.00 57.79 L90.00 62.01 L90.00 66.52 L90.00 71.40 L90.00 76.81 L90.00 82.92 L90.00 90.00 L82.92 90.00 L76.81 90.00 L71.40 90.00 L66.52 90.00 L62.01 90.00 L57.79 90.00 L53.76 90.00 L49.85 90.00 L46.00 90.00 L42.15 90.00 L38.24 90.00 L34.21 90.00 L29.99 90.00 L25.48 90.00 L20.60 90.00 L15.19 90.00 L9.08 90.00 L2.00 90.00 L2.00 82.92 L2.00 76.81 L2.00 71.40 L2.00 66.52 L2.00 62.01 L2.00 57.79 L2.00 53.76 L2.00 49.85 L2.00 46.00 L2.00 42.15 L2.00 38.24 L2.00 34.21 L2.00 29.99 L2.00 25.48 L2.00 20.60 L2.00 15.19 L2.00 9.08 L2.00 2.00 L9.08 2.00 L15.19 2.00 L20.60 2.00 L25.48 2.00 L29.99 2.00 L34.21 2.00 L38.24 2.00 L42.15 2.00 Z"></animate></path></svg></div>
          <span style="font-family: 'Geist Mono', monospace; font-size: 24px; color: #111111; margin-top: 8px">01.</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #232321">Shape</h3>
          <p style="margin: 0; font-size: 12px; line-height: 1.38; color: #3A3A37">Sharp or round, smells have a shape. Lemon feels spiky; vanilla feels soft.</p>
        </article>
        </div><div @mouseenter=${v.on1} @mouseleave=${v.off} style="position: relative; height: 222px; min-width: 0">
          <button type="button" class="sv-btn sv-icons" aria-label="Sound, show details" aria-expanded="${v.open1}" @focus=${v.on1} @blur=${v.off} style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: ${v.iconOp1}; transform: scale(${v.iconScale1})"><svg aria-hidden="true" width="148" height="70" viewBox="0 0 148 70" stroke="#333331" stroke-width="1.2" stroke-linecap="round"><line class="sv-bar" style="animation-delay: 0.00s; animation-duration: 0.90s" x1="2" y1="29.0" x2="2" y2="41.0"></line><line class="sv-bar" style="animation-delay: 1.13s; animation-duration: 1.27s" x1="14" y1="22.0" x2="14" y2="48.0"></line><line class="sv-bar" style="animation-delay: 0.96s; animation-duration: 1.64s" x1="26" y1="10.0" x2="26" y2="60.0"></line><line class="sv-bar" style="animation-delay: 0.79s; animation-duration: 1.21s" x1="38" y1="18.0" x2="38" y2="52.0"></line><line class="sv-bar" style="animation-delay: 0.62s; animation-duration: 1.58s" x1="50" y1="2.0" x2="50" y2="68.0"></line><line class="sv-bar" style="animation-delay: 0.45s; animation-duration: 1.15s" x1="62" y1="25.0" x2="62" y2="45.0"></line><line class="sv-bar" style="animation-delay: 0.28s; animation-duration: 1.52s" x1="74" y1="15.0" x2="74" y2="55.0"></line><line class="sv-bar" style="animation-delay: 0.11s; animation-duration: 1.09s" x1="86" y1="20.0" x2="86" y2="50.0"></line><line class="sv-bar" style="animation-delay: 1.24s; animation-duration: 1.46s" x1="98" y1="12.0" x2="98" y2="58.0"></line><line class="sv-bar" style="animation-delay: 1.07s; animation-duration: 1.03s" x1="110" y1="2.0" x2="110" y2="68.0"></line><line class="sv-bar" style="animation-delay: 0.90s; animation-duration: 1.40s" x1="122" y1="17.0" x2="122" y2="53.0"></line><line class="sv-bar" style="animation-delay: 0.73s; animation-duration: 0.97s" x1="134" y1="20.0" x2="134" y2="50.0"></line><line class="sv-bar" style="animation-delay: 0.56s; animation-duration: 1.34s" x1="146" y1="29.0" x2="146" y2="41.0"></line></svg></button>
          <article class="sv-card" style="position: absolute; left: 0; right: 0; top: 0; pointer-events: none; opacity: ${v.cardOp1}; transform: translateY(${v.cardY1}px); background: #FCFCFC; border-radius: 4px; box-shadow: 0 8px 22px -14px rgba(0,0,0,0.28); padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
          <div style="height: 44px; display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="60" height="28" viewBox="0 0 148 70" stroke="#333331" stroke-width="1.2" stroke-linecap="round"><line class="sv-bar" style="animation-delay: 0.00s; animation-duration: 0.90s" x1="2" y1="29.0" x2="2" y2="41.0"></line><line class="sv-bar" style="animation-delay: 1.13s; animation-duration: 1.27s" x1="14" y1="22.0" x2="14" y2="48.0"></line><line class="sv-bar" style="animation-delay: 0.96s; animation-duration: 1.64s" x1="26" y1="10.0" x2="26" y2="60.0"></line><line class="sv-bar" style="animation-delay: 0.79s; animation-duration: 1.21s" x1="38" y1="18.0" x2="38" y2="52.0"></line><line class="sv-bar" style="animation-delay: 0.62s; animation-duration: 1.58s" x1="50" y1="2.0" x2="50" y2="68.0"></line><line class="sv-bar" style="animation-delay: 0.45s; animation-duration: 1.15s" x1="62" y1="25.0" x2="62" y2="45.0"></line><line class="sv-bar" style="animation-delay: 0.28s; animation-duration: 1.52s" x1="74" y1="15.0" x2="74" y2="55.0"></line><line class="sv-bar" style="animation-delay: 0.11s; animation-duration: 1.09s" x1="86" y1="20.0" x2="86" y2="50.0"></line><line class="sv-bar" style="animation-delay: 1.24s; animation-duration: 1.46s" x1="98" y1="12.0" x2="98" y2="58.0"></line><line class="sv-bar" style="animation-delay: 1.07s; animation-duration: 1.03s" x1="110" y1="2.0" x2="110" y2="68.0"></line><line class="sv-bar" style="animation-delay: 0.90s; animation-duration: 1.40s" x1="122" y1="17.0" x2="122" y2="53.0"></line><line class="sv-bar" style="animation-delay: 0.73s; animation-duration: 0.97s" x1="134" y1="20.0" x2="134" y2="50.0"></line><line class="sv-bar" style="animation-delay: 0.56s; animation-duration: 1.34s" x1="146" y1="29.0" x2="146" y2="41.0"></line></svg></div>
          <span style="font-family: 'Geist Mono', monospace; font-size: 24px; color: #111111; margin-top: 8px">02.</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #232321">Sound</h3>
          <p style="margin: 0; font-size: 12px; line-height: 1.38; color: #3A3A37">Smells have a pitch. Orange and iris sound high; musk and coffee sound low.</p>
        </article>
        </div><div @mouseenter=${v.on2} @mouseleave=${v.off} style="position: relative; height: 222px; min-width: 0">
          <button type="button" class="sv-btn sv-icons" aria-label="Color, show details" aria-expanded="${v.open2}" @focus=${v.on2} @blur=${v.off} style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: ${v.iconOp2}; transform: scale(${v.iconScale2})"><svg aria-hidden="true" width="96" height="86" viewBox="0 0 96 86" overflow="visible"><g class="sv-orbit"><circle class="sv-bob" cx="48" cy="22" r="21" fill="#FDFF71"></circle><circle class="sv-bob" style="animation-delay: -0.8s" cx="22" cy="62" r="21" fill="#A290F8"></circle><circle class="sv-bob" style="animation-delay: -1.6s" cx="73" cy="62" r="21" fill="#A3FCFA"></circle></g></svg></button>
          <article class="sv-card" style="position: absolute; left: 0; right: 0; top: 0; pointer-events: none; opacity: ${v.cardOp2}; transform: translateY(${v.cardY2}px); background: #FCFCFC; border-radius: 4px; box-shadow: 0 8px 22px -14px rgba(0,0,0,0.28); padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
          <div style="height: 44px; display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="38" height="34" viewBox="0 0 96 86" overflow="visible"><g class="sv-orbit"><circle class="sv-bob" cx="48" cy="22" r="21" fill="#FDFF71"></circle><circle class="sv-bob" style="animation-delay: -0.8s" cx="22" cy="62" r="21" fill="#A290F8"></circle><circle class="sv-bob" style="animation-delay: -1.6s" cx="73" cy="62" r="21" fill="#A3FCFA"></circle></g></svg></div>
          <span style="font-family: 'Geist Mono', monospace; font-size: 24px; color: #111111; margin-top: 8px">03.</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #232321">Color</h3>
          <p style="margin: 0; font-size: 12px; line-height: 1.38; color: #3A3A37">We agree on what a smell looks like. Bergamot reads yellow; spearmint reads green.</p>
        </article>
        </div><div @mouseenter=${v.on3} @mouseleave=${v.off} style="position: relative; height: 222px; min-width: 0">
          <button type="button" class="sv-btn sv-icons" aria-label="Memory, show details" aria-expanded="${v.open3}" @focus=${v.on3} @blur=${v.off} style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: ${v.iconOp3}; transform: scale(${v.iconScale3})"><svg aria-hidden="true" width="136" height="71" viewBox="0 0 290 150" fill="none" stroke="#333331" stroke-width="2" stroke-linejoin="round"><path d="M30 30 L130.0 30.0 L130.0 61.0 L134.0 61.0 A13 13 0 1 1 134.0 79.0 L130.0 79.0 L130.0 110.0 L89.0 110.0 L89.0 106.0 A13 13 0 1 0 71.0 106.0 L71.0 110.0 L30.0 110.0 L30.0 79.0 L26.0 79.0 A13 13 0 1 1 26.0 61.0 L30.0 61.0 L30.0 30.0 Z"></path><path class="sv-snap" d="M156 30 L197.0 30.0 L197.0 26.0 A13 13 0 1 1 215.0 26.0 L215.0 30.0 L256.0 30.0 L256.0 110.0 L156.0 110.0 L156.0 79.0 L160.0 79.0 A13 13 0 1 0 160.0 61.0 L156.0 61.0 L156.0 30.0 Z"></path></svg></button>
          <article class="sv-card" style="position: absolute; left: 0; right: 0; top: 0; pointer-events: none; opacity: ${v.cardOp3}; transform: translateY(${v.cardY3}px); background: #FCFCFC; border-radius: 4px; box-shadow: 0 8px 22px -14px rgba(0,0,0,0.28); padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
          <div style="height: 44px; display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="64" height="33" viewBox="0 0 290 150" fill="none" stroke="#333331" stroke-width="2" stroke-linejoin="round"><path d="M30 30 L130.0 30.0 L130.0 61.0 L134.0 61.0 A13 13 0 1 1 134.0 79.0 L130.0 79.0 L130.0 110.0 L89.0 110.0 L89.0 106.0 A13 13 0 1 0 71.0 106.0 L71.0 110.0 L30.0 110.0 L30.0 79.0 L26.0 79.0 A13 13 0 1 1 26.0 61.0 L30.0 61.0 L30.0 30.0 Z"></path><path class="sv-snap" d="M156 30 L197.0 30.0 L197.0 26.0 A13 13 0 1 1 215.0 26.0 L215.0 30.0 L256.0 30.0 L256.0 110.0 L156.0 110.0 L156.0 79.0 L160.0 79.0 A13 13 0 1 0 160.0 61.0 L156.0 61.0 L156.0 30.0 Z"></path></svg></div>
          <span style="font-family: 'Geist Mono', monospace; font-size: 24px; color: #111111; margin-top: 8px">04.</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #232321">Memory</h3>
          <p style="margin: 0; font-size: 12px; line-height: 1.38; color: #3A3A37">Smell is tied more closely to childhood memories than any other sense.</p>
        </article>
        </div><div @mouseenter=${v.on4} @mouseleave=${v.off} style="position: relative; height: 222px; min-width: 0">
          <button type="button" class="sv-btn sv-icons" aria-label="Social energy, show details" aria-expanded="${v.open4}" @focus=${v.on4} @blur=${v.off} style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: ${v.iconOp4}; transform: scale(${v.iconScale4})"><svg aria-hidden="true" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#333331" stroke-width="1" stroke-dasharray="1.5 2.5" overflow="visible"><circle class="sv-spin" cx="32" cy="32" r="30"></circle><circle class="sv-spin-r sv-pulse" cx="32" cy="32" r="22"></circle><g class="sv-orbit-s"><circle cx="34" cy="31" r="13"></circle></g></svg></button>
          <article class="sv-card" style="position: absolute; left: 0; right: 0; top: 0; pointer-events: none; opacity: ${v.cardOp4}; transform: translateY(${v.cardY4}px); background: #FCFCFC; border-radius: 4px; box-shadow: 0 8px 22px -14px rgba(0,0,0,0.28); padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
          <div style="height: 44px; display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="34" height="34" viewBox="0 0 64 64" fill="none" stroke="#333331" stroke-width="1" stroke-dasharray="1.5 2.5" overflow="visible"><circle class="sv-spin" cx="32" cy="32" r="30"></circle><circle class="sv-spin-r sv-pulse" cx="32" cy="32" r="22"></circle><g class="sv-orbit-s"><circle cx="34" cy="31" r="13"></circle></g></svg></div>
          <span style="font-family: 'Geist Mono', monospace; font-size: 24px; color: #111111; margin-top: 8px">05.</span>
          <h3 style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #232321">Social Energy</h3>
          <p style="margin: 0; font-size: 12px; line-height: 1.38; color: #3A3A37">How you recharge hints at what you wear. Extraverts lean fresh; introverts lean warm.</p>
        </article>
        </div></div>
      <div data-m="iwrap" style="position: absolute; left: 66px; right: 56px; top: 500px; display: flex; align-items: last baseline; justify-content: space-between">
      <h2 aria-label="Smell translated" style="margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 148px; font-weight: 700; line-height: 0.8; letter-spacing: -0.1em; color: #333331"><span style="display: block; white-space: nowrap">${(v.h2a || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: baseline"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.h2b || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: baseline"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h2>
      <p aria-label="Smell can’t travel through a screen, but it never works alone. People reliably link scents to shapes, sounds, colors, memories and even moods. Each trial uses one of those links to point you toward the scents you’re most likely to love." style="flex: 0 0 auto; width: 306px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.38; color: #3A3A37">${(v.paraWords || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.1em -0.05em 0em); vertical-align: baseline"><span class="im-wd" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.w}</span></span> `)}</p>
      </div>
    </section>
  </div>

  <!-- fixed chrome: header + line -->
  <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center; z-index: 3">
    <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #232321">
      <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#232321" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
      <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
    </a>
    <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
      
      <a href="#sources" style="text-decoration: none">Sources</a>
      
      
    </nav>
  </header>
  <div ${ref(v.setLine)} data-m="iline" style="position: absolute; left: 71px; right: 65px; top: 785px; height: 1.5px; background: #DDDDD9; z-index: 1">${(v.ticks || []).map((tk) => html`<span style="position: absolute; left: ${tk.x}%; bottom: 1.5px; width: 1px; height: ${tk.h}px; background: #C9C9C4"></span>`)}</div>

  <canvas ${ref(v.setCanvas)} role="img" aria-label="A drop made of scent particles" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2"></canvas>

</div>
  <!-- Trial 01 · slides up as the intro page lifts away -->
  <section ${ref(v.setTr1)} class="tr-dark" aria-label="Trial 01, shape" aria-hidden="${v.ovHidden}" style="position: absolute; inset: 0; overflow: hidden; z-index: 5; background: #333331; color: #F9F9F7; cursor: auto; visibility: ${v.ovVis}; pointer-events: ${v.ovPE}">
    <canvas ${ref(v.setHt)} role="img" aria-label="A particle scent form that turns rounder or sharper with the slider" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none"></canvas>
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#F9F9F7" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none">Sources</a>
      </nav>
    </header>
    <div class="tr-in" data-m="btns" style="position: absolute; right: 69px; top: 97px; display: flex; gap: 16px; opacity: ${v.trOp}; transform: translateY(${v.trY}px); transition-delay: ${v.trD3}s"><button type="button" class="st-glass-d" @click=${v.backTrial}>Back</button><button type="button" class="st-glass-d" @click=${v.nextTrial} aria-disabled="${v.nextDis}" title="${v.nextTip}">Next</button></div>
    <span class="tr-in" data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #6B6B67; width: 132px; opacity: ${v.trOp}; transform: translateY(${v.trY}px); transition-delay: ${v.trD0}s">TRIAL 01</span>
    <h1 aria-label="Which shape would you wear?" data-m="h1" style="position: absolute; left: 67px; top: 250px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.trA || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.trB || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
    <p class="tr-in" data-m="para" style="position: absolute; left: 73px; top: 426px; width: 300px; margin: 0; font-size: 15.5px; line-height: 1.38; color: #F9F9F7; opacity: ${v.trOp}; transform: translateY(${v.trY}px); transition-delay: ${v.trD1}s">Drag between soft and sharp until the form feels like you.</p>
    <div class="tr-in st-glass-p" data-m="card1" style="position: absolute; left: 72px; top: 515px; width: 356px; box-sizing: border-box; padding: 20px 20px 14px; border-radius: 8px; opacity: ${v.trOp}; transform: translateY(${v.trY}px); transition-delay: ${v.trD2}s">
      <div aria-hidden="true" style="display: flex; justify-content: space-between; font-family: 'Geist Mono', monospace; font-size: 11.5px; margin-bottom: 14px"><span>Round</span><span>Angular</span></div>
      <div ${ref(v.setSlider)} role="slider" tabindex="0" aria-label="Shape, from round to angular" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" class="tr-slider" style="position: relative; height: 26px; cursor: pointer; touch-action: none"><div style="position: absolute; left: 0; right: 0; top: 12px; height: 1.5px; background: #8C8C88"></div><div ${ref(v.setFill)} style="position: absolute; left: 0; top: 12px; height: 1.5px; width: 50%; background: #F9F9F7"></div><div ${ref(v.setThumb)} class="tr-thumb" style="position: absolute; left: 50%; top: 13px; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: #F9F9F7"></div></div>
      <div aria-hidden="true" style="margin-top: 8px; font-family: 'Geist Mono', monospace; font-size: 10.5px; letter-spacing: 0.06em; color: #BDBDB8">EDGE <span ${ref(v.setEdge)}>0.50</span></div>
    </div>
    
    <div class="tr-in" role="progressbar" aria-label="Trial progress" aria-valuemin="1" aria-valuemax="5" aria-valuenow="1" aria-valuetext="Trial 1 of 5, shape" data-m="prog" style="position: absolute; left: 71px; right: 65px; top: 785px; opacity: ${v.trOp}; transition-delay: ${v.trD4}s"><div style="position: relative; height: 1.5px; background: #5A5A57"><div class="tr-prog" style="position: absolute; left: 0; top: 0; height: 100%; width: ${v.progW}%; background: #F9F9F7"></div><div class="tr-prog-dot" style="position: absolute; top: 0.75px; left: ${v.progW}%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #F9F9F7"></div><span style="position: absolute; left: 20%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span><span style="position: absolute; left: 40%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span><span style="position: absolute; left: 60%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span><span style="position: absolute; left: 80%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span></div><div aria-hidden="true" style="display: flex; margin-top: 12px; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em"><span style="flex: 1 1 0; color: ${v.pc0}">01<span class="pl-n"> SHAPE</span></span><span style="flex: 1 1 0; color: ${v.pc1}">02<span class="pl-n"> SOUND</span></span><span style="flex: 1 1 0; color: ${v.pc2}">03<span class="pl-n"> COLOR</span></span><span style="flex: 1 1 0; color: ${v.pc3}">04<span class="pl-n"> MEMORY</span></span><span style="flex: 1 1 0; color: ${v.pc4}">05<span class="pl-n"> SOCIAL ENERGY</span></span></div></div>
    <p class="tr-in" data-m="res" style="position: absolute; left: 884px; top: 194px; width: 331px; margin: 0; font-size: 12px; line-height: 1.45; color: #BDBDB8; opacity: ${v.trOp}; transform: translateY(${v.trY}px); transition-delay: ${v.trD1}s"><span style="display: block; font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.08em; margin-bottom: 4px">THE RESEARCH</span>Lemon and pepper match angular shapes; raspberry and vanilla match round ones. <a href="https://scholar.google.com/scholar?q=Hanson-Vaux+Crisinel+Spence+2013+smelling+shapes" target="_blank" rel="noopener" style="color: #F9F9F7">Hanson-Vaux et al., 2013&#160;&#8599;</a></p>
  </section>
  <!-- Trial 02 · rises as Trial 01 lifts away -->
  <section ${ref(v.setTr2)} aria-label="Trial 02, sound" aria-hidden="${v.t2Hidden}" style="position: absolute; inset: 0; overflow: hidden; z-index: 6; background: #F9F9F7; color: #333331; cursor: auto; visibility: ${v.t2Vis}; pointer-events: ${v.t2PE}">
    <canvas ${ref(v.setWv)} role="img" aria-label="Particle sound waves that tighten as the pitch rises" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none"></canvas>
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #232321">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#232321" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none">Sources</a>
      </nav>
    </header>
    <div class="tr-in" data-m="btns" style="position: absolute; right: 69px; top: 97px; display: flex; gap: 16px; opacity: ${v.t2Op}; transform: translateY(${v.t2Ty}px); transition-delay: ${v.trD3}s"><button type="button" class="st-glass-l" @click=${v.back2}>Back</button><button type="button" class="st-glass-l" @click=${v.next2} aria-disabled="${v.next2Dis}" title="${v.next2Tip}">Next</button></div>
    <span class="tr-in" data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #D6D6D2; width: 132px; opacity: ${v.t2Op}; transform: translateY(${v.t2Ty}px); transition-delay: ${v.trD0}s">TRIAL 02</span>
    <h1 aria-label="Tune the note you’d live inside." data-m="h1" style="position: absolute; left: 66px; top: 250px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.t2A || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.t2B || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
    <p class="tr-in" data-m="para" style="position: absolute; left: 73px; top: 426px; width: 300px; margin: 0; font-size: 15.5px; line-height: 1.38; opacity: ${v.t2Op}; transform: translateY(${v.t2Ty}px); transition-delay: ${v.trD1}s">Press play, then slide until the sound feels like a scent you would want all day.</p>
    <div class="tr-in st-glass-pl" data-m="card2" style="position: absolute; left: 72px; top: 504px; width: 356px; box-sizing: border-box; padding: 22px 20px 18px; border-radius: 8px; opacity: ${v.t2Op}; transform: translateY(${v.t2Ty}px); transition-delay: ${v.trD2}s">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px">
        <button type="button" class="tr-play" @click=${v.togglePlay} aria-pressed="${v.playPressed}" aria-label="${v.playLabel}"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="${v.playPath}" fill="${v.playFill}"></path></svg></button>
        <div aria-live="polite"><div ${ref(v.setHz)} style="font-family: 'Geist Mono', monospace; font-size: 22px; letter-spacing: 0.01em">262 Hz</div><div ${ref(v.setNote)} style="font-size: 12px; margin-top: 4px">C4 middle register</div></div>
      </div>
      <div aria-hidden="true" style="display: flex; justify-content: space-between; font-family: 'Geist Mono', monospace; font-size: 11.5px; margin-bottom: 10px"><span>Low</span><span>High</span></div>
      <div ${ref(v.setSlider2)} role="slider" tabindex="0" aria-label="Pitch, from low to high" aria-valuemin="110" aria-valuemax="880" aria-valuenow="262" class="tr-slider-l" style="position: relative; height: 26px; cursor: pointer; touch-action: none"><div style="position: absolute; left: 0; right: 0; top: 12px; height: 1.5px; background: #C9C9C4"></div><div ${ref(v.setFill2)} style="position: absolute; left: 0; top: 12px; height: 1.5px; width: 42%; background: #333331"></div><div ${ref(v.setThumb2)} class="tr-thumb" style="position: absolute; left: 42%; top: 13px; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: #333331"></div></div>
      <p style="margin: 14px 0 0; font-size: 11.5px; color: #6B6B67">No sound? Watch the waves: they tighten as the pitch rises.</p>
    </div>
    <div class="tr-in" role="progressbar" aria-label="Trial progress" aria-valuemin="1" aria-valuemax="5" aria-valuenow="2" aria-valuetext="Trial 2 of 5, sound" data-m="prog" style="position: absolute; left: 71px; right: 65px; top: 785px; opacity: ${v.t2Op}; transition-delay: ${v.trD4}s"><div style="position: relative; height: 1.5px; background: #DDDDD9"><div class="tr-prog" style="position: absolute; left: 0; top: 0; height: 100%; width: ${v.prog2W}%; background: #333331"></div><div class="tr-prog-dot" style="position: absolute; top: 0.75px; left: ${v.prog2W}%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #333331"></div><span style="position: absolute; left: 20%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 40%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 60%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 80%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span></div><div aria-hidden="true" style="display: flex; margin-top: 12px; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em"><span style="flex: 1 1 0; color: ${v.qc0}">01<span class="pl-n"> SHAPE</span></span><span style="flex: 1 1 0; color: ${v.qc1}">02<span class="pl-n"> SOUND</span></span><span style="flex: 1 1 0; color: ${v.qc2}">03<span class="pl-n"> COLOR</span></span><span style="flex: 1 1 0; color: ${v.qc3}">04<span class="pl-n"> MEMORY</span></span><span style="flex: 1 1 0; color: ${v.qc4}">05<span class="pl-n"> SOCIAL ENERGY</span></span></div></div>
    <p class="tr-in" data-m="res" style="position: absolute; left: 884px; top: 194px; width: 331px; margin: 0; font-size: 12px; line-height: 1.45; color: #6B6B67; opacity: ${v.t2Op}; transform: translateY(${v.t2Ty}px); transition-delay: ${v.trD1}s"><span style="display: block; font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.08em; margin-bottom: 4px">THE RESEARCH</span>Candied orange and iris match higher pitches than musk and roasted coffee. <a href="https://scholar.google.com/scholar?q=Crisinel+2013+odour+pitch+crossmodal" target="_blank" rel="noopener" style="color: #333331">Crisinel et al., 2013&#160;&#8599;</a></p>
  </section>
  <!-- Trial 03 · color -->
  <section ${ref(v.setTr3)} aria-label="Trial 03, color" aria-hidden="${v.t3Hidden}" style="position: absolute; inset: 0; overflow: hidden; z-index: 7; background: #F9F9F7; color: #333331; cursor: auto; visibility: ${v.t3Vis}; pointer-events: ${v.t3PE}">
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #232321">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#232321" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none">Sources</a>
      </nav>
    </header>
    <div class="tr-in" data-m="btns" style="position: absolute; right: 69px; top: 97px; display: flex; gap: 16px; opacity: ${v.t3Op}; transform: translateY(${v.t3Ty}px); transition-delay: ${v.trD3}s"><button type="button" class="st-glass-l" @click=${v.back3}>Back</button><button type="button" class="st-glass-l" @click=${v.next3} aria-disabled="${v.next3Dis}" title="${v.next3Tip}">Next</button></div>
    <span class="tr-in" data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #D6D6D2; width: 132px; opacity: ${v.t3Op}; transform: translateY(${v.t3Ty}px); transition-delay: ${v.trD0}s">TRIAL 03</span>
    <div data-m="h1w" style="position: absolute; left: 66px; right: 65px; top: 250px">
    <h1 aria-label="Pick the color that smells right." style="margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.t3A || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.t3B || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
    <p class="tr-in" style="margin: 16px 0 0 7px; font-size: 15.5px; line-height: 1.38; opacity: ${v.t3Op}; transform: translateY(${v.t3Ty}px); transition-delay: ${v.trD1}s">Choose the one your eye lands on first.</p>
    </div>
    <div role="radiogroup" aria-label="Colors" @mouseleave=${v.barsOut} data-m="bars" style="position: absolute; left: 71px; right: 65px; top: 400px; height: 362px; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 8px; align-items: end">
      ${(v.bars || []).map((b) => html`<button type="button" role="radio" class="tr-bar" aria-label="${b.name}" aria-checked="${b.on}" @mouseenter=${b.enter} @focus=${b.enter} @blur=${v.barsOut} @click=${b.pick} style="height: ${b.h}px; background: ${b.c}; transition-delay: ${b.delay}s; box-shadow: ${b.ring}"><span class="tr-bar-name" style="color: ${b.ink}; opacity: ${b.nameOp}">${b.name}</span></button>`)}
    </div>
    <div class="tr-in" role="progressbar" aria-label="Trial progress" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3" aria-valuetext="Trial 3 of 5, color" data-m="prog" style="position: absolute; left: 71px; right: 65px; top: 785px; opacity: ${v.t3Op}; transition-delay: ${v.trD4}s"><div style="position: relative; height: 1.5px; background: #DDDDD9"><div class="tr-prog" style="position: absolute; left: 0; top: 0; height: 100%; width: ${v.prog3W}%; background: #333331"></div><div class="tr-prog-dot" style="position: absolute; top: 0.75px; left: ${v.prog3W}%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #333331"></div><span style="position: absolute; left: 20%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 40%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 60%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 80%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span></div><div aria-hidden="true" style="display: flex; margin-top: 12px; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em"><span style="flex: 1 1 0; color: ${v.rc0}">01<span class="pl-n"> SHAPE</span></span><span style="flex: 1 1 0; color: ${v.rc1}">02<span class="pl-n"> SOUND</span></span><span style="flex: 1 1 0; color: ${v.rc2}">03<span class="pl-n"> COLOR</span></span><span style="flex: 1 1 0; color: ${v.rc3}">04<span class="pl-n"> MEMORY</span></span><span style="flex: 1 1 0; color: ${v.rc4}">05<span class="pl-n"> SOCIAL ENERGY</span></span></div></div>
    <p class="tr-in" data-m="res" style="position: absolute; left: 884px; top: 194px; width: 331px; margin: 0; font-size: 12px; line-height: 1.45; color: #6B6B67; opacity: ${v.t3Op}; transform: translateY(${v.t3Ty}px); transition-delay: ${v.trD1}s"><span style="display: block; font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.08em; margin-bottom: 4px">THE RESEARCH</span>People reliably pair odors with colors, such as bergamot with yellow. <a href="https://scholar.google.com/scholar?q=Spence+2020+olfactory+colour+crossmodal" target="_blank" rel="noopener" style="color: #333331">Demattè et al., 2006; Spence, 2020&#160;&#8599;</a></p>
  </section>
  <!-- Trial 04 · memory -->
  <section ${ref(v.setTr4)} class="tr-dark" aria-label="Trial 04, memory" aria-hidden="${v.t4Hidden}" style="position: absolute; inset: 0; overflow: hidden; z-index: 8; background: #333331; color: #F9F9F7; cursor: auto; visibility: ${v.t4Vis}; pointer-events: ${v.t4PE}">
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#F9F9F7" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none">Sources</a>
      </nav>
    </header>
    <div class="tr-in" data-m="btns" style="position: absolute; right: 69px; top: 97px; display: flex; gap: 16px; opacity: ${v.t4Op}; transform: translateY(${v.t4Ty}px); transition-delay: ${v.trD3}s"><button type="button" class="st-glass-d" @click=${v.back4}>Back</button><button type="button" class="st-glass-d" @click=${v.next4} aria-disabled="${v.next4Dis}" title="${v.next4Tip}">Next</button></div>
    <span class="tr-in" data-m="lab" style="position: absolute; left: 71px; top: 140px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #6B6B67; width: 132px; opacity: ${v.t4Op}; transform: translateY(${v.t4Ty}px); transition-delay: ${v.trD0}s">TRIAL 04</span>
    <div data-m="h1w" style="position: absolute; left: 66px; right: 65px; top: 192px">
    <h1 aria-label="Go back to before you were ten." style="margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.t4A || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.t4B || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
    <div class="tr-in" data-m="q4" style="margin: 16px 0 0 7px; width: 620px; opacity: ${v.t4Op}; transform: translateY(${v.t4Ty}px); transition-delay: ${v.trD1}s">
      <p style="margin: 0; font-size: 15.5px; line-height: 1.38">Which of these places comes back first, and most vividly?</p>
      <label style="display: flex; align-items: baseline; gap: 16px; margin-top: 12px; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #BDBDB8; white-space: nowrap">NAME IT · OPTIONAL<input type="text" ${ref(v.setMemName)} class="tr-name" maxlength="60" placeholder="Grandma’s kitchen in July…" aria-label="Name the memory, optional"></label>
    </div>
    </div>
    
    <div role="radiogroup" aria-label="Childhood places" data-m="mems" style="position: absolute; left: 71px; right: 65px; top: 411px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 168px; gap: 12px 16px">
      ${(v.mems || []).map((m) => html`<button type="button" role="radio" class="tr-mem st-glass-p" aria-checked="${m.on}" aria-label="${m.title}. ${m.desc}" @mouseenter=${m.enter} @mouseleave=${v.memOut} @focus=${m.enter} @blur=${v.memOut} @click=${m.pick} style="opacity: ${m.op}; transform: translateY(${m.y}px); transition-delay: ${m.delay}s; border-color: ${m.border}">
        <span aria-hidden="true" style="position: absolute; left: 20px; top: 18px; font-family: 'Geist Mono', monospace; font-size: 12px">${m.n}</span>
        <span aria-hidden="true" class="tr-radio" style="background: ${m.dot}"></span>
        <canvas aria-hidden="true" class="tr-mem-cv" ${ref(m.setCv)}></canvas>
        <span aria-hidden="true" style="position: absolute; left: 20px; right: 20px; bottom: 16px; text-align: left"><span style="display: block; font-family: 'Geist Mono', monospace; font-size: 14.5px">${m.title}</span><span style="display: block; margin-top: 7px; font-family: 'Geist Mono', monospace; font-size: 9.5px; color: #CFCFCB">${m.desc}</span></span>
      </button>`)}
    </div>
    <div class="tr-in" role="progressbar" aria-label="Trial progress" aria-valuemin="1" aria-valuemax="5" aria-valuenow="4" aria-valuetext="Trial 4 of 5, memory" data-m="prog" style="position: absolute; left: 71px; right: 65px; top: 785px; opacity: ${v.t4Op}; transition-delay: ${v.trD4}s"><div style="position: relative; height: 1.5px; background: #5A5A57"><div class="tr-prog" style="position: absolute; left: 0; top: 0; height: 100%; width: ${v.prog4W}%; background: #F9F9F7"></div><div class="tr-prog-dot" style="position: absolute; top: 0.75px; left: ${v.prog4W}%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #F9F9F7"></div><span style="position: absolute; left: 20%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span><span style="position: absolute; left: 40%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span><span style="position: absolute; left: 60%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span><span style="position: absolute; left: 80%; top: -4px; width: 1px; height: 4px; background: #6B6B67"></span></div><div aria-hidden="true" style="display: flex; margin-top: 12px; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em"><span style="flex: 1 1 0; color: ${v.mc0}">01<span class="pl-n"> SHAPE</span></span><span style="flex: 1 1 0; color: ${v.mc1}">02<span class="pl-n"> SOUND</span></span><span style="flex: 1 1 0; color: ${v.mc2}">03<span class="pl-n"> COLOR</span></span><span style="flex: 1 1 0; color: ${v.mc3}">04<span class="pl-n"> MEMORY</span></span><span style="flex: 1 1 0; color: ${v.mc4}">05<span class="pl-n"> SOCIAL ENERGY</span></span></div></div>
    <p class="tr-in" data-m="res" style="position: absolute; left: 884px; top: 194px; width: 331px; margin: 0; font-size: 12px; line-height: 1.45; color: #BDBDB8; opacity: ${v.t4Op}; transform: translateY(${v.t4Ty}px); transition-delay: ${v.trD1}s"><span style="display: block; font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.08em; margin-bottom: 4px">THE RESEARCH</span>Smell-cued memories are older and feel more emotional than other memories. <a href="https://scholar.google.com/scholar?q=Willander+Larsson+2006+smell+autobiographical+memory" target="_blank" rel="noopener" style="color: #F9F9F7">Willander &amp; Larsson, 2006&#160;&#8599;</a></p>
  </section>
  <!-- Trial 05 · social energy -->
  <section ${ref(v.setTr5)} aria-label="Trial 05, social energy" aria-hidden="${v.t5Hidden}" style="position: absolute; inset: 0; overflow: hidden; z-index: 9; background: #F9F9F7; color: #333331; cursor: auto; visibility: ${v.t5Vis}; pointer-events: ${v.t5PE}">
    <canvas ${ref(v.setCrowd)} role="img" aria-label="Particles that gather into two quiet clusters or spread into a busy crowd with the slider" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none"></canvas>
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #232321">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#232321" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none">Sources</a>
      </nav>
    </header>
    <div class="tr-in" data-m="btns" style="position: absolute; right: 69px; top: 97px; display: flex; gap: 16px; opacity: ${v.t5Op}; transform: translateY(${v.t5Ty}px); transition-delay: ${v.trD3}s"><button type="button" class="st-glass-l" @click=${v.back5}>Back</button><button type="button" class="st-glass-l" @click=${v.next5} aria-disabled="${v.next5Dis}" title="${v.next5Tip}">Reveal my profile</button></div>
    <span class="tr-in" data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #D6D6D2; width: 132px; opacity: ${v.t5Op}; transform: translateY(${v.t5Ty}px); transition-delay: ${v.trD0}s">TRIAL 05</span>
    <h1 aria-label="It’s Saturday night. Where are you?" data-m="h1" style="position: absolute; left: 66px; top: 250px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.t5A || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.t5B || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
    <p class="tr-in" data-m="para" style="position: absolute; left: 73px; top: 412px; width: 330px; margin: 0; font-size: 15.5px; line-height: 1.38; opacity: ${v.t5Op}; transform: translateY(${v.t5Ty}px); transition-delay: ${v.trD1}s">Slide toward the evening that actually recharges you.</p>
    <div class="tr-in" data-m="card5" style="position: absolute; left: 72px; top: 470px; width: 470px; box-sizing: border-box; padding: 22px 22px 16px; border-radius: 8px; opacity: ${v.t5Op}; transform: translateY(${v.t5Ty}px); transition-delay: ${v.trD2}s" class="tr-in st-glass-pl">
      <div aria-hidden="true" style="display: flex; justify-content: space-between; gap: 30px; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 15px; line-height: 1.3"><span style="flex: 1 1 0">One friend, a long dinner, home by eleven</span><span style="flex: 1 1 0; text-align: right">A crowded room that knows your name</span></div>
      <div aria-hidden="true" style="display: flex; justify-content: space-between; font-family: 'Geist Mono', monospace; font-size: 11.5px; margin: 14px 0 8px; color: #6B6B67"><span>Introvert</span><span>Extravert</span></div>
      <div ${ref(v.setSlider5)} role="slider" tabindex="0" aria-label="Saturday night, from one friend to a crowded room" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" class="tr-slider-l" style="position: relative; height: 26px; cursor: pointer; touch-action: none"><div style="position: absolute; left: 0; right: 0; top: 12px; height: 1.5px; background: #C9C9C4"></div><div ${ref(v.setFill5)} style="position: absolute; left: 0; top: 12px; height: 1.5px; width: 50%; background: #333331"></div><div ${ref(v.setThumb5)} class="tr-thumb" style="position: absolute; left: 50%; top: 13px; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: #333331"></div></div>
      <p style="margin: 12px 0 0; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #8C8C88">THIS TRIAL COUNTS LEAST IN YOUR BLEND</p>
    </div>
    <div class="tr-in" data-m="blend5" style="position: absolute; left: 760px; right: 65px; top: 618px; opacity: ${v.t5Op}; transform: translateY(${v.t5Ty}px); transition-delay: ${v.trD2}s">
      <span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em">YOUR BLEND SO FAR</span><div style="display: grid; grid-template-columns: 112px 1fr 44px; align-items: center; gap: 14px; margin-top: 10px"><span style="font-size: 13px">Fresh citrus</span><span style="position: relative; height: 3px; border-radius: 2px; background: #E4E4E0; overflow: hidden"><span ${ref(v.setBf0)} class="tr-blend" style="position: absolute; left: 0; top: 0; bottom: 0; width: 0%; border-radius: 2px; background: #3FC9C3"></span></span><span ${ref(v.setBp0)} style="font-family: 'Geist Mono', monospace; font-size: 12px; text-align: right">0%</span></div><div style="display: grid; grid-template-columns: 112px 1fr 44px; align-items: center; gap: 14px; margin-top: 10px"><span style="font-size: 13px">Soft floral</span><span style="position: relative; height: 3px; border-radius: 2px; background: #E4E4E0; overflow: hidden"><span ${ref(v.setBf1)} class="tr-blend" style="position: absolute; left: 0; top: 0; bottom: 0; width: 0%; border-radius: 2px; background: #A290F8"></span></span><span ${ref(v.setBp1)} style="font-family: 'Geist Mono', monospace; font-size: 12px; text-align: right">0%</span></div><div style="display: grid; grid-template-columns: 112px 1fr 44px; align-items: center; gap: 14px; margin-top: 10px"><span style="font-size: 13px">Warm amber</span><span style="position: relative; height: 3px; border-radius: 2px; background: #E4E4E0; overflow: hidden"><span ${ref(v.setBf2)} class="tr-blend" style="position: absolute; left: 0; top: 0; bottom: 0; width: 0%; border-radius: 2px; background: #D9963A"></span></span><span ${ref(v.setBp2)} style="font-family: 'Geist Mono', monospace; font-size: 12px; text-align: right">0%</span></div>
    </div>
    <div class="tr-in" role="progressbar" aria-label="Trial progress" aria-valuemin="1" aria-valuemax="5" aria-valuenow="5" aria-valuetext="Trial 5 of 5, social energy" data-m="prog" style="position: absolute; left: 71px; right: 65px; top: 785px; opacity: ${v.t5Op}; transition-delay: ${v.trD4}s"><div style="position: relative; height: 1.5px; background: #DDDDD9"><div class="tr-prog" style="position: absolute; left: 0; top: 0; height: 100%; width: ${v.prog5W}%; background: #333331"></div><div class="tr-prog-dot" style="position: absolute; top: 0.75px; left: ${v.prog5W}%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #333331"></div><span style="position: absolute; left: 20%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 40%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 60%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span><span style="position: absolute; left: 80%; top: -4px; width: 1px; height: 4px; background: #BDBDB8"></span></div><div aria-hidden="true" style="display: flex; margin-top: 12px; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em"><span style="flex: 1 1 0; color: ${v.sc5}">01<span class="pl-n"> SHAPE</span></span><span style="flex: 1 1 0; color: ${v.sc5}">02<span class="pl-n"> SOUND</span></span><span style="flex: 1 1 0; color: ${v.sc5}">03<span class="pl-n"> COLOR</span></span><span style="flex: 1 1 0; color: ${v.sc5}">04<span class="pl-n"> MEMORY</span></span><span style="flex: 1 1 0; color: ${v.sc5}">05<span class="pl-n"> SOCIAL ENERGY</span></span></div></div>
    <p class="tr-in" data-m="res" style="position: absolute; left: 884px; top: 194px; width: 331px; margin: 0; font-size: 12px; line-height: 1.45; color: #6B6B67; opacity: ${v.t5Op}; transform: translateY(${v.t5Ty}px); transition-delay: ${v.trD1}s"><span style="display: block; font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.08em; margin-bottom: 4px">THE RESEARCH</span>Extraverts leaned toward fresh notes, introverts toward amber ones. <a href="https://scholar.google.com/scholar?q=Mensing+Beck+1988+personality+fragrance" target="_blank" rel="noopener" style="color: #333331">Mensing &amp; Beck, 1988&#160;&#8599;</a></p>
  </section>
  <!-- Composing · the five senses fold into one drop -->
  <section ${ref(v.setCmp)} class="tr-dark" aria-label="Composing your profile" aria-hidden="${v.cmpHidden}" aria-live="polite" style="position: absolute; inset: 0; overflow: hidden; z-index: 10; background: #333331; color: #F9F9F7; cursor: auto; visibility: ${v.cmpVis}; pointer-events: ${v.cmpPE}">
    <canvas ${ref(v.setCmpCv)} role="img" aria-label="Particles from each trial gathering into a single drop" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none"></canvas>
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #F9F9F7">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#F9F9F7" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none; color: #F9F9F7">Sources</a>
      </nav>
    </header>
    <div data-m="cmpcol" style="position: absolute; left: 700px; right: 65px; top: 198px">
      <span class="tr-in" style="display: inline-block; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #6B6B67; width: 132px; opacity: ${v.cmpOp}; transform: translateY(${v.cmpTy}px); transition-delay: ${v.trD0}s">COMPOSING</span>
      <h1 aria-label="Reading your senses." style="margin: 38px 0 0 -5px; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.cA || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.cB || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
      <ol style="list-style: none; margin: 44px 0 0; padding: 0; border-bottom: 1px solid #5A5A57"><li style="display: flex; justify-content: space-between; align-items: center; height: 52px; border-top: 1px solid #5A5A57; opacity: ${v.cRowOp0}; transform: translateY(${v.cRowY0}px); transition: opacity .5s ease 0.20s, transform .6s cubic-bezier(.16,1,.3,1) 0.20s"><span style="font-size: 15px">Shape <span style="color: #8C8C88">&#8594;</span> edge</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${v.cStC0}">${v.cSt0}</span></li><li style="display: flex; justify-content: space-between; align-items: center; height: 52px; border-top: 1px solid #5A5A57; opacity: ${v.cRowOp1}; transform: translateY(${v.cRowY1}px); transition: opacity .5s ease 0.28s, transform .6s cubic-bezier(.16,1,.3,1) 0.28s"><span style="font-size: 15px">Pitch <span style="color: #8C8C88">&#8594;</span> notes</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${v.cStC1}">${v.cSt1}</span></li><li style="display: flex; justify-content: space-between; align-items: center; height: 52px; border-top: 1px solid #5A5A57; opacity: ${v.cRowOp2}; transform: translateY(${v.cRowY2}px); transition: opacity .5s ease 0.36s, transform .6s cubic-bezier(.16,1,.3,1) 0.36s"><span style="font-size: 15px">Color <span style="color: #8C8C88">&#8594;</span> families</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${v.cStC2}">${v.cSt2}</span></li><li style="display: flex; justify-content: space-between; align-items: center; height: 52px; border-top: 1px solid #5A5A57; opacity: ${v.cRowOp3}; transform: translateY(${v.cRowY3}px); transition: opacity .5s ease 0.44s, transform .6s cubic-bezier(.16,1,.3,1) 0.44s"><span style="font-size: 15px">Memory <span style="color: #8C8C88">&#8594;</span> base notes</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${v.cStC3}">${v.cSt3}</span></li><li style="display: flex; justify-content: space-between; align-items: center; height: 52px; border-top: 1px solid #5A5A57; opacity: ${v.cRowOp4}; transform: translateY(${v.cRowY4}px); transition: opacity .5s ease 0.52s, transform .6s cubic-bezier(.16,1,.3,1) 0.52s"><span style="font-size: 15px">Social energy <span style="color: #8C8C88">&#8594;</span> balance</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${v.cStC4}">${v.cSt4}</span></li></ol>
      <div style="position: relative; height: 2px; margin-top: 22px; background: #5A5A57"><div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${v.cBar}%; background: #F9F9F7; transition: width ${v.cBarDur}s linear"></div></div>
      <p style="margin: 12px 0 0; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #8C8C88">YOUR PROFILE OPENS ON ITS OWN IN A MOMENT</p>
    </div>
  </section>

  <!-- Result · your scent profile -->
  <section ${ref(v.setRes)} aria-label="Your scent profile" aria-hidden="${v.resHidden}" style="position: absolute; inset: 0; overflow: hidden; z-index: 11; background: #F9F9F7; color: #333331; cursor: auto; visibility: ${v.resVis}; pointer-events: ${v.resPE}">
    <div ${ref(v.setResScroll)} style="position: absolute; inset: 0; overflow-y: auto; overflow-x: hidden">
    <div data-m="resh" style="position: relative; height: 1330px">
    <canvas ${ref(v.setResCv)} role="img" aria-label="Your profile as a drop of particles in your blend's colors" data-m="rescv" style="position: absolute; left: 0; top: 0; width: 1280px; height: 700px; pointer-events: none"></canvas>
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #232321">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#232321" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none; color: #232321">Sources</a>
      </nav>
    </header>
    <div class="tr-in" data-m="btns" style="position: absolute; right: 69px; top: 97px; display: flex; gap: 16px; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD3}s"><button type="button" class="st-glass-l" @click=${v.retake}>Retake</button><button type="button" class="st-glass-l st-glass-strong" @click=${v.openShare}>Save share card</button></div>
    <span class="tr-in" data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #D6D6D2; width: 160px; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD0}s">YOUR SCENT PROFILE</span>
    <h1 aria-label="${v.pName}" data-m="h1" style="position: absolute; left: 66px; top: 250px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em"><span style="display: block; white-space: nowrap">${(v.pA || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span><span style="display: block; white-space: nowrap">${(v.pB || []).map((l) => html`<span aria-hidden="true" style="display: inline-block; clip-path: inset(-0.2em -0.1em 0em); vertical-align: bottom"><span class="im-ch" style="display: inline-block; transform: translateY(${l.y}%); transition-delay: ${l.delay}s">${l.ch}</span></span>`)}</span></h1>
    <p class="tr-in" data-m="rdesc" style="position: absolute; left: 73px; top: 372px; width: 520px; margin: 0; font-size: 15.5px; line-height: 1.42; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD1}s">${v.pDesc}</p>
    <div class="tr-in" data-m="rblend" style="position: absolute; left: 73px; top: 470px; width: 520px; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD2}s">
      <span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em">YOUR BLEND</span>
      ${(v.pBlend || []).map((f) => html`<div style="display: grid; grid-template-columns: 112px 1fr 44px; align-items: center; gap: 14px; margin-top: 10px"><span style="font-size: 13px">${f.name}</span><span style="position: relative; height: 3px; border-radius: 2px; background: #E4E4E0; overflow: hidden"><span class="tr-blend" style="position: absolute; left: 0; top: 0; bottom: 0; width: ${f.w}%; border-radius: 2px; background: ${f.c}; transition-delay: ${f.d}s"></span></span><span style="font-family: 'Geist Mono', monospace; font-size: 12px; text-align: right">${f.pct}%</span></div>`)}
    </div>
    <dl class="tr-in" data-m="rnotes" style="position: absolute; left: 73px; top: 590px; width: 520px; margin: 0; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD2}s">
      ${(v.pNotes || []).map((n) => html`<div style="display: grid; grid-template-columns: 80px 1fr; align-items: baseline; padding: 11px 0; border-top: 1px solid #DDDDD9"><dt style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #6B6B67">${n.tier}</dt><dd style="margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 19px; font-weight: 700; letter-spacing: -0.03em">${n.note} <span style="font-family: 'Geist Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.04em; color: #8C8C88">· ${n.fam}</span></dd></div>`)}
    </dl>
    <div class="tr-in" data-m="rwords" style="position: absolute; left: 700px; right: 65px; top: 560px; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD4}s">
      <span style="font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.06em">LOOK FOR THESE WORDS ON A LABEL</span>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px">${(v.pWords || []).map((w) => html`<span class="st-chip">${w.t}</span>`)}</div>
      <div class="st-glass-pl" style="margin-top: 22px; padding: 16px 18px; border-radius: 8px"><span style="font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #6B6B67">YOUR MEMORY</span><p style="margin: 6px 0 0; font-size: 15px; line-height: 1.35">${v.pMem}</p></div>
    </div>
    <h2 class="tr-in" data-m="rwhyh" style="position: absolute; left: 66px; top: 820px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 40px; font-weight: 700; letter-spacing: -0.06em; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${v.trD4}s">Why you got this</h2>
    <div data-m="rwhy" style="position: absolute; left: 71px; right: 65px; top: 892px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px">
      ${(v.pWhy || []).map((y) => html`<article class="st-glass-pl tr-in" style="border-radius: 8px; padding: 18px 18px 20px; min-height: 172px; box-sizing: border-box; opacity: ${v.resOp}; transform: translateY(${v.resTy}px); transition-delay: ${y.d}s"><span style="font-family: 'Geist Mono', monospace; font-size: 10.5px; letter-spacing: 0.04em; color: #6B6B67">${y.label}</span><h3 style="margin: 12px 0 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1">${y.answer}</h3><p style="margin: 10px 0 0; font-size: 12.5px; line-height: 1.4; color: #4A4A47">${y.reason}</p></article>`)}
    </div>
    <div data-m="rres" style="position: absolute; left: 71px; right: 65px; top: 1096px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px">
      <div class="st-glass-pl" style="border-radius: 8px; padding: 20px 22px"><span style="font-family: 'Geist Mono', monospace; font-size: 10.5px; letter-spacing: 0.06em; color: #6B6B67">TRUST YOUR OWN NOSE</span><p style="margin: 10px 0 0; font-size: 15px; line-height: 1.38">Personal taste explains 54% of smell preference. Use this as a starting point.</p><a href="#sources" style="display: inline-block; margin-top: 10px; font-size: 12px; color: #333331">Arshamian et al., 2022 &#8599;</a></div>
      <div class="st-glass-pl" style="border-radius: 8px; padding: 20px 22px"><span style="font-family: 'Geist Mono', monospace; font-size: 10.5px; letter-spacing: 0.06em; color: #6B6B67">CHOOSE FOR YOURSELF</span><p style="margin: 10px 0 0; font-size: 15px; line-height: 1.38">Test on your skin, and pick for you rather than for someone else.</p><a href="#sources" style="display: inline-block; margin-top: 10px; font-size: 12px; color: #333331">Milinski &amp; Wedekind, 2001 &#8599;</a></div>
    </div>
    <div data-m="rrule" style="position: absolute; left: 71px; right: 65px; top: 1262px; height: 1.5px; background: #DDDDD9"></div>
    <p data-m="rfoot" style="position: absolute; left: 71px; top: 1280px; margin: 0; font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #8C8C88">SCENT THEORY · A STARTING POINT, NOT A PRESCRIPTION</p>
    </div>
    </div>
    <div class="tr-toast" role="status" style="opacity: ${v.toastOp}; transform: translate(-50%, ${v.toastY}px)">${v.toastMsg}</div>
  </section>

  <!-- Method and sources · reachable from every screen -->
  <section role="dialog" aria-modal="true" aria-label="Method and sources" aria-hidden="${v.srcHidden}" class="src-ov" style="visibility: ${v.srcVis}; opacity: ${v.srcOp}">
    <div style="position: absolute; inset: 0; overflow-y: auto">
    <div data-m="smin" style="position: relative; min-height: 832px; padding-bottom: 60px">
    <header data-m="hdr" style="position: absolute; left: 35px; right: 42px; top: 30px; display: flex; justify-content: space-between; align-items: center">
      <a href="#home" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #232321">
        <svg aria-hidden="true" width="28" height="21" viewBox="0 0 32 24" fill="none" stroke="#232321" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg>
        <span style="font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: 0.02em"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 25px; font-size: 12.5px">
        <a href="#sources" style="text-decoration: none; color: #232321">Sources</a>
      </nav>
    </header>
    <button type="button" class="st-glass-l" @click=${v.closeSources} data-m="sclose" style="position: absolute; right: 69px; top: 97px">Close</button>
    <span data-m="lab" style="position: absolute; left: 71px; top: 198px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.04em; padding-bottom: 12px; border-bottom: 1.5px solid #D6D6D2; width: 180px">METHOD AND SOURCES</span>
    <h1 data-m="h1" style="position: absolute; left: 66px; top: 250px; margin: 0; font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 62px; font-weight: 700; line-height: 0.78; letter-spacing: -0.075em">Why your other senses<br>know what you smell.</h1>
    <p data-m="spara" style="position: absolute; left: 884px; top: 250px; width: 331px; margin: 0; font-size: 14px; line-height: 1.45; color: #4A4A47">Crossmodal correspondences are consistent links people make between a smell and a shape, pitch or color. Scent Theory runs those published links in reverse. They are group-level findings, so they suggest a starting point rather than predict one person.</p>
    <ol data-m="slist" style="list-style: none; margin: 0; padding: 0; position: absolute; left: 71px; right: 65px; top: 410px; columns: 2; column-gap: 48px"><li class="src-row" style="transition-delay: 0.12s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">01</span><span><span style="display: block; font-size: 16px">Lemon and pepper match angular shapes</span><a href="https://scholar.google.com/scholar?q=Hanson-Vaux+Crisinel+Spence+2013+smelling+shapes" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Hanson-Vaux, Crisinel &amp; Spence, 2013&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.17s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">02</span><span><span style="display: block; font-size: 16px">Orange and iris match higher pitches than musk and coffee</span><a href="https://scholar.google.com/scholar?q=Crisinel+2013+odour+pitch" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Crisinel et al., 2013&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.22s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">03</span><span><span style="display: block; font-size: 16px">Pleasantness shapes the pitch people choose</span><a href="https://scholar.google.com/scholar?q=Crisinel+Spence+2012+pleasantness+pitch+odour" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Crisinel &amp; Spence, 2012&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.27s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">04</span><span><span style="display: block; font-size: 16px">People reliably pair odors with colors</span><a href="https://scholar.google.com/scholar?q=Spence+2020+olfactory+colour+crossmodal" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Spence, 2020&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.32s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">05</span><span><span style="display: block; font-size: 16px">Familiar odors match colors of their source</span><a href="https://scholar.google.com/scholar?q=Kaeppler+2018+odor+color" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Kaeppler, 2018&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.37s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">06</span><span><span style="display: block; font-size: 16px">Smell-cued memories are older</span><a href="https://scholar.google.com/scholar?q=Willander+Larsson+2006+smell+autobiographical+memory" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Willander &amp; Larsson, 2006&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.42s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">07</span><span><span style="display: block; font-size: 16px">Odor memories are more emotional</span><a href="https://scholar.google.com/scholar?q=Herz+2016+odor+evoked+memory+emotion" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Herz, 2016&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.47s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">08</span><span><span style="display: block; font-size: 16px">Extraverts prefer fresh notes</span><a href="https://scholar.google.com/scholar?q=Mensing+Beck+1988+personality+fragrance" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Mensing &amp; Beck, 1988&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.52s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">09</span><span><span style="display: block; font-size: 16px">Personal taste explains 54% of preference</span><a href="https://scholar.google.com/scholar?q=Arshamian+2022+odor+preference+culture" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Arshamian et al., 2022&#160;&#8599;</a></span></li><li class="src-row" style="transition-delay: 0.57s"><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: #8C8C88; padding-top: 3px">10</span><span><span style="display: block; font-size: 16px">Self-chosen ingredients track immune genes</span><a href="https://scholar.google.com/scholar?q=Milinski+Wedekind+2001+perfume+MHC" target="_blank" rel="noopener" style="display: inline-block; margin-top: 4px; font-size: 12px; color: #333331">Milinski &amp; Wedekind, 2001&#160;&#8599;</a></span></li></ol>
    </div>
    </div>
  </section>

  <!-- Share card -->
  <section role="dialog" aria-modal="true" aria-label="Share card" aria-hidden="${v.shHidden}" class="sh-ov" style="visibility: ${v.shVis}; opacity: ${v.shOp}" @click=${v.shBackdrop}>
    <div class="sh-card" style="transform: translateY(${v.shY}px) scale(${v.shS})">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="display: flex; align-items: center; gap: 8px"><svg aria-hidden="true" width="24" height="18" viewBox="0 0 32 24" fill="none" stroke="#F9F9F7" stroke-width="1"><circle cx="11" cy="12" r="10"></circle><circle cx="20" cy="12" r="9"></circle><circle cx="20" cy="12" r="5.5"></circle><circle cx="4" cy="4" r="2.5"></circle></svg><span style="font-family: 'Geist Mono', monospace; font-size: 11px"><span style="font-weight: 300">SCENT</span>&#160;&#160;<span style="font-weight: 700">THEORY</span></span></span>
        <span style="font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #BDBDB8">MY SCENT PROFILE</span>
      </div>
      <canvas ${ref(v.setShCv)} aria-hidden="true" style="display: block; width: 100%; height: 250px; margin-top: 8px"></canvas>
      <div style="font-family: 'Geist', 'Inter Tight', sans-serif; font-size: 44px; font-weight: 700; line-height: 0.85; letter-spacing: -0.075em">${v.pName}</div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px">${(v.pNotes || []).map((n) => html`<div style="border-top: 1.5px solid #F9F9F7; padding-top: 8px"><span style="font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.06em; color: #BDBDB8">${n.tier}</span><div style="margin-top: 4px; font-size: 15px">${n.note}</div></div>`)}</div>
      <div style="display: flex; justify-content: space-between; margin-top: 18px; font-size: 11.5px; color: #BDBDB8"><span>${v.pQuote}</span><span style="font-family: 'Geist Mono', monospace; font-size: 10px">scenttheory.app</span></div>
    </div>
    <div class="sh-actions" style="opacity: ${v.shOp}"><button type="button" class="st-glass-l" @click=${v.closeShare}>Close</button><button type="button" class="st-glass-l st-glass-strong" @click=${v.downloadShare}>Download image</button></div>
  </section>





</div>`;

mount(Component, template, document.getElementById('app'));
