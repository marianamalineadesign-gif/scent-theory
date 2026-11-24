// A tiny runtime: setState re-renders the template with lit-html.
import { render } from './vendor/lit-html/lit-html.js';

export class DCLogic {
  constructor() { this.state = {}; }
  setState(patch) {
    this.state = Object.assign({}, this.state, patch);
    if (this._update) this._update();
  }
}

// Phones get their own portrait layout (390 × 832); everything else gets the 1280 × 832 desktop stage.
// screen.width keeps phones on the phone layout even if the page briefly lays out wider
const vw = () => document.documentElement.clientWidth || window.innerWidth;
const vh = () => document.documentElement.clientHeight || window.innerHeight;
export const isMobile = () => Math.min(vw(), (window.screen && window.screen.width) || vw()) < 760;

export function mount(Component, template, container) {
  const c = new Component();
  const mobile = isMobile(), W = mobile ? 390 : 1280, H = 832;
  c.mobile = mobile;
  container.classList.toggle('m', mobile);
  container.style.width = W + 'px';
  let rendering = false, again = false;
  const update = () => {
    if (rendering) { again = true; return; }
    rendering = true;
    try { render(template(c.renderVals()), container); }
    finally { rendering = false; }
    if (again) { again = false; queueMicrotask(update); }
  };
  c._update = update;
  update();

  // Scale the stage to fit the window, centered. Crossing the phone breakpoint reloads into the other layout.
  const fit = () => {
    if (isMobile() !== mobile) { location.reload(); return; }
    const s = Math.min(vw() / W, vh() / H);
    container.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  };
  window.addEventListener('resize', fit); fit();
  window.scentTheory = c;
  window.addEventListener('pagehide', () => c.componentWillUnmount && c.componentWillUnmount());
  return c;
}
