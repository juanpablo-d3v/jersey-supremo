import './sizes.css';

import logoImage from '../assets/images/logo_supremo.png';
import menImage from '../assets/images/men.png';
import womenImage from '../assets/images/women.png';
import { CATALOG, SIZE_CHARTS } from '../data/catalog.js';

const app = document.getElementById('sizes-app');

const CHART_META = {
  'JERSEY HOMBRE': { title: 'Jersey Hombre', icon: 'apparel' },
  'SHORT/BIB HOMBRE': { title: 'Short / Bib Hombre', icon: 'straighten' },
  'JERSEY MUJER': { title: 'Jersey Mujer', icon: 'apparel' },
  'SHORT/BIB MUJER': { title: 'Short / Bib Mujer', icon: 'straighten' }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHero() {
  return `
    <section class="sz-hero">
      <div class="sz-hero__athlete sz-hero__athlete--left">
        <img class="sz-hero__athlete-img" src="${menImage}" alt="Atleta masculino">
        <div class="sz-hero__athlete-fade sz-hero__athlete-fade--left"></div>
      </div>
      <div class="sz-hero__content">
        <img class="sz-hero__logo" src="${logoImage}" alt="${escapeHtml(CATALOG.brand)}">
        <h2 class="sz-hero__title">GUÍA DE TALLAS</h2>
        <p class="sz-hero__subtitle">Equipo Oficial</p>
      </div>
      <div class="sz-hero__athlete sz-hero__athlete--right">
        <img class="sz-hero__athlete-img" src="${womenImage}" alt="Atleta femenina">
        <div class="sz-hero__athlete-fade sz-hero__athlete-fade--right"></div>
      </div>
    </section>
  `;
}

function renderSizeTable(chart) {
  const meta = CHART_META[chart.category] || { title: chart.category, icon: 'straighten' };
  const columns = chart.headers;

  const headRow = `
    <tr>
      ${columns.map((column, index) => `
        <th class="sz-table__th ${index === 0 ? 'sz-table__th--label' : ''}">${escapeHtml(column)}</th>
      `).join('')}
    </tr>
  `;

  const bodyRows = chart.rows.map(row => `
    <tr class="sz-table__tr">
      <td class="sz-table__td sz-table__td--label">${escapeHtml(row.medida)}</td>
      ${columns.slice(1).map((column, index) => `
        <td class="sz-table__td">${escapeHtml(row[column])}</td>
      `).join('')}
    </tr>
  `).join('');

  return `
    <div class="sz-card">
      <div class="sz-card__header">
        <span class="material-symbols-outlined sz-card__icon">${meta.icon}</span>
        <h3 class="sz-card__title">${escapeHtml(meta.title)}</h3>
      </div>
      <div class="sz-table-wrap">
        <table class="sz-table">
          <thead>${headRow}</thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function render() {
  const cards = SIZE_CHARTS.map(renderSizeTable).join('');

  app.innerHTML = `
    <main class="sz-main">
      ${renderHero()}
      <div class="sz-grid">
        ${cards}
      </div>
    </main>
  `;
}

render();