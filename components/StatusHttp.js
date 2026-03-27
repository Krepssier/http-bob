const template = `
  <figure>
    <video autoplay loop muted playsinline>
      <source src="" type="video/webm" />
      <source src="" type="video/mp4" />
    </video>
    <hgroup>
      <h1></h1>
      <p></p>
    </hgroup>
  </figure>
`;

const HTTP_CODES = {
  100: { reason: 'Continue', video: '100' },
  101: { reason: 'Switching Protocols', video: '101' },
  200: { reason: 'OK', video: '200' },
  201: { reason: 'Created', video: '201' },
  202: { reason: 'Accepted', video: '202' },
  204: { reason: 'No Content', video: '204' },
  208: { reason: 'Already Reported', video: '208' },
  301: { reason: 'Moved Permanently', video: '301' },
  302: { reason: 'Found', video: '302' },
  304: { reason: 'Not Modified', video: '304' },
  400: { reason: 'Bad Request', video: '400' },
  401: { reason: 'Unauthorized', video: '401' },
  403: { reason: 'Forbidden', video: '403' },
  404: { reason: 'Not Found', video: '404' },
  405: { reason: 'Method Not Allowed', video: '405' },
  408: { reason: 'Request Timeout', video: '408' },
  429: { reason: 'Too Many Requests', video: '429' },
  497: { reason: '497 HTTP Request Sent to HTTPS Port', video: '497' },
  500: { reason: 'Internal Server Error', video: '500' },
  501: { reason: 'Not Implemented', video: '501' },
  502: { reason: 'Bad Gateway', video: '502' },
  503: { reason: 'Service Unavailable', video: '503' },
  504: { reason: 'Gateway Timeout', video: '504' },
};

class StatusHttp extends HTMLElement {
  static get observedAttributes() {
    return ['code'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
  }

  async connectedCallback() {
    const css = await import('./StatusHttp.css', { with: { type: 'css' } });
    this.shadowRoot.adoptedStyleSheets = [css.default];
    this.#updateDisplay();

    this.addEventListener('click', () => {
      window.location.href = './coming-soon.html';
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'code' && oldValue !== newValue) {
      this.#updateDisplay();
    }
  }

  #updateDisplay() {
    const code = parseInt(this.getAttribute('code'), 10);
    const info = HTTP_CODES[code] || { reason: 'Unknown', video: 'unknown' };

    const video = this.shadowRoot.querySelector('video');
    const sources = video.querySelectorAll('source');
    const codeEl = this.shadowRoot.querySelector('h1');
    const reasonEl = this.shadowRoot.querySelector('p');

    sources[0].src = `./public/${info.video}.webm`;
    sources[1].src = `./public/${info.video}.mp4`;
    video.load();
    video.alt = info.reason;
    codeEl.textContent = code;
    reasonEl.textContent = info.reason;
  }
}

customElements.define('status-http', StatusHttp);

export { StatusHttp, HTTP_CODES };
