import './prices.css';

import logoImage from '../assets/images/logo_supremo.png';
import menImage from '../assets/images/men.png';
import womenImage from '../assets/images/women.png';
import { CATALOG, getLines, getAccessories, getAddOns, formatPrice } from '../data/catalog.js';

const app = document.getElementById('prices-app');

const CATEGORY_ICONS = {
  'Jerseys': 'check_circle',
  'Shorts & Bibs': 'straighten',
  'Mallas': 'check_circle'
};

const CATEGORY_LABELS = {
  'Jerseys': 'Jerseys',
  'Shorts & Bibs': 'Shorts y Bibs',
  'Mallas': 'Mallas',
  'Accessories': 'Accesorios'
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
    <section class="ps-hero">
      <div class="ps-hero__athlete ps-hero__athlete--left">
        <img class="ps-hero__athlete-img" src="${menImage}" alt="Atleta masculino">
        <div class="ps-hero__athlete-fade ps-hero__athlete-fade--left"></div>
      </div>
      <div class="ps-hero__content">
        <img class="ps-hero__logo" src="${logoImage}" alt="${escapeHtml(CATALOG.brand)}">
        <h2 class="ps-hero__title">${CATALOG.year} PRECIOS</h2>
        <p class="ps-hero__subtitle">Equipo Oficial</p>
      </div>
      <div class="ps-hero__athlete ps-hero__athlete--right">
        <img class="ps-hero__athlete-img" src="${womenImage}" alt="Atleta femenina">
        <div class="ps-hero__athlete-fade ps-hero__athlete-fade--right"></div>
      </div>
    </section>
  `;
}

function renderPriceRow(product, isLast) {
  return `
    <li class="ps-price-row ${isLast ? 'ps-price-row--last' : ''}">
      <span class="ps-price-row__name">${escapeHtml(product.name)}</span>
      <span class="ps-price-row__value">${formatPrice(product.price)}</span>
    </li>
  `;
}

function renderCategoryCard(category, products) {
  const rows = products.map((product, index) =>
    renderPriceRow(product, index === products.length - 1)
  ).join('');

  return `
    <div class="ps-price-card">
      <h4 class="ps-price-card__title">
        <span class="material-symbols-outlined">${CATEGORY_ICONS[category] || 'sell'}</span>
        ${escapeHtml(CATEGORY_LABELS[category] || category)}
      </h4>
      <ul class="ps-price-list">${rows}</ul>
    </div>
  `;
}

function renderLineSection(line) {
  const grouped = {};
  for (const product of line.products) {
    if (!grouped[product.category]) grouped[product.category] = [];
    grouped[product.category].push(product);
  }

  const cards = Object.entries(grouped).map(([category, products]) =>
    renderCategoryCard(category, products)
  ).join('');

  return `
    <section class="ps-price-section">
      <div class="ps-price-section__glow"></div>
      <h3 class="ps-price-section__title">
        <span class="material-symbols-outlined">check_circle</span>
        ${escapeHtml(line.name)} Línea
      </h3>
      <div class="ps-price-grid">${cards}</div>
    </section>
  `;
}

function renderAccessoriesSection() {
  const accessories = getAccessories();
  const addOns = getAddOns();

  const sections = [];
  if (accessories.length) {
    sections.push(renderCategoryCard('Accessories', accessories));
  }
  if (addOns.length) {
    const addOnRows = addOns.map((addOn, index) =>
      renderPriceRow({ name: addOn.name }, index === addOns.length - 1)
    ).join('');
    sections.push(`
      <div class="ps-price-card">
        <h4 class="ps-price-card__title">
          <span class="material-symbols-outlined">add_circle</span>
          Complementos
        </h4>
        <ul class="ps-price-list">${addOnRows}</ul>
      </div>
    `);
  }

  return `
    <section class="ps-price-section">
      <div class="ps-price-section__glow"></div>
      <h3 class="ps-price-section__title">
        <span class="material-symbols-outlined">card_travel</span>
        Extras
      </h3>
      <div class="ps-price-grid">${sections.join('')}</div>
    </section>
  `;
}

function render() {
  const lines = getLines().map(renderLineSection).join('');

  app.innerHTML = `
    <main class="ps-main">
      ${renderHero()}
      <div class="ps-content">
        ${lines}
        ${renderAccessoriesSection()}
      </div>
    </main>
  `;
}

render();