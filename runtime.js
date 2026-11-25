// A tiny runtime: setState re-renders the template with lit-html, and the stage fills the screen.
import { render } from './vendor/lit-html/lit-html.js';

export class DCLogic {
  constructor() { this.state = {}; }
  setState(patch) {
    this.state = Object.assign({}, this.state, patch);
    if (this._update) this._update();
  }
}

const vw = () => document.documentElement.clientWidth || window.innerWidth;
const vh = () => document.documentElement.clientHeight || window.innerHeight;
// Phones get the portrait layout (designed at 390 wide); everything else the desktop layout (designed at 1280 wide).
// screen.width keeps phones on the phone layout even if the page briefly lays out wider.
export const isMobile = () => Math.min(vw(), (window.screen && window.screen.width) || vw()) < 760;

export function mount(Component, template, container) {
  const c = new Component();
  const mobile = isMobile(), DW = mobile ? 390 : 1280, H = 832;
  c.mobile = mobile; c.mx = 0;
  container.classList.toggle('m', mobile);

  const theme = document.querySelector('meta[name="theme-color"]');
  let lastBg = '';
  const paintPage = () => {
    const bg = c.pageBg ? c.pageBg() : '#F9F9F7';
    if (bg === lastBg) return; lastBg = bg;
    document.documentElement.style.background = bg; document.body.style.background = bg;
    if (theme) theme.setAttribute('content', bg);
  };

  let rendering = false, again = false;
  const update = () => {
    if (rendering) { again = true; return; }
    rendering = true;
    try { render(template(c.renderVals()), container); paintPage(); }
    finally { rendering = false; }
    if (again) { again = false; queueMicrotask(update); }
  };
  c._update = update;

  // Scale so the 832-tall design fits, then widen the stage to fill the rest of the screen.
  // On phones the content stays centered: --mx is the extra width on each side.
  const fit = () => {
    if (isMobile() !== mobile) { location.reload(); return; }
    const s = Math.min(vw() / DW, vh() / H), W = Math.max(DW, vw() / s);
    container.style.width = W + 'px';
    container.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
    c.mx = mobile ? (W - DW) / 2 : 0;
    container.style.setProperty('--mx', c.mx + 'px');
  };
  fit();
  update();
  window.addEventListener('resize', fit);
  window.addEventListener('pagehide', () => c.componentWillUnmount && c.componentWillUnmount());
  window.scentTheory = c;
  return c;
}
