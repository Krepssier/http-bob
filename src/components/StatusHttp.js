const template = `
  <figure>
    <img alt="" />
    <hgroup>
      <h1></h1>
      <p></p>
    </hgroup>
  </figure>
`;

const HTTP_CODES = {
  100: { reason: 'Continue', image: '100.gif' },
  101: { reason: 'Switching Protocols', image: '101.gif' },
  200: { reason: 'OK', image: '200.gif' },
  201: { reason: 'Created', image: '201.gif' },
  202: { reason: 'Accepted', image: '202.gif' },
  204: { reason: 'No Content', image: '204.gif' },
  208: { reason: 'Already Reported', image: '208.gif'},
  301: { reason: 'Moved Permanently', image: '301.gif' },
  302: { reason: 'Found', image: '302.gif' },
  304: { reason: 'Not Modified', image: '304.gif' },
  400: { reason: 'Bad Request', image: '400.gif' },
  401: { reason: 'Unauthorized', image: '401.gif' },
  403: { reason: 'Forbidden', image: '403.gif' },
  404: { reason: 'Not Found', image: '404.gif' },
  405: { reason: 'Method Not Allowed', image: '405.gif' },
  408: { reason: 'Request Timeout', image: '408.gif' },
  429: { reason: 'Too Many Requests', image: '429.gif' },
  497: { reason: '497 HTTP Request Sent to HTTPS Port', image: '497.gif'},
  500: { reason: 'Internal Server Error', image: '500.gif' },
  501: { reason: 'Not Implemented', image: '501.gif' },
  502: { reason: 'Bad Gateway', image: '502.gif' },
  503: { reason: 'Service Unavailable', image: '503.gif' },
  504: { reason: 'Gateway Timeout', image: '504.gif' },
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
      window.location.href = '../coming-soon.html';
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'code' && oldValue !== newValue) {
      this.#updateDisplay();
    }
  }

  #updateDisplay() {
    const code = parseInt(this.getAttribute('code'), 10);
    const info = HTTP_CODES[code] || { reason: 'Unknown', image: 'unknown.gif' };

    const image = this.shadowRoot.querySelector('img');
    const codeEl = this.shadowRoot.querySelector('h1');
    const reasonEl = this.shadowRoot.querySelector('p');

    image.src = `./assets/${info.image}`;
    image.alt = info.reason;
    codeEl.textContent = code;
    reasonEl.textContent = info.reason;
  }
}

customElements.define('status-http', StatusHttp);

export { StatusHttp, HTTP_CODES };
