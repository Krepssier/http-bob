import './components/StatusHttp.js';

const HTTP_CODES = [100, 101, 200, 201, 202, 204, 208, 301, 302, 304, 400, 401, 403, 404, 405, 408, 429, 497, 500, 501, 502, 503, 504];

const section = document.createElement('section');
const colors = ['purple', 'cyan', 'orange'];
HTTP_CODES.forEach((code, index) => {
  const statusHttp = document.createElement('status-http');
  statusHttp.setAttribute('code', code);
  statusHttp.classList.add(`color-${colors[index % 3]}`);
  section.appendChild(statusHttp);
});

document.body.innerHTML = `
  <svg viewBox="0 0 500 100" class="logo">
    <text x="250" y="75" text-anchor="middle" font-size="70" font-weight="bold" font-family="system-ui">HTTP.bob</text>
  </svg>
`;
document.body.appendChild(section);
