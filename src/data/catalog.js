import catalogData from './catalog.json';
import sizesData from './sizes.json';

export const CATALOG = catalogData.catalog;
export const SIZE_CHARTS = sizesData.size_charts;

const TIER_LABELS = {
  standard: 'STD',
  elite: 'ELT',
  premier: 'PRM'
};

const assetImages = import.meta.glob('../assets/images/*', { eager: true });

export function resolveImage(imagePath) {
  if (!imagePath) return '';
  const fileName = imagePath.split('/').pop();
  const key = `../assets/images/${fileName}`;
  const module = assetImages[key];
  return module ? module.default : '';
}

export function getCurrency() {
  return CATALOG.currency;
}

export function getLine(id) {
  return CATALOG.lines.find(line => line.id === id) || null;
}

export function getLines() {
  return CATALOG.lines;
}

function enrichProduct(product, line) {
  return {
    ...product,
    tier: line.id,
    tierName: line.name,
    tierLabel: TIER_LABELS[line.id] || line.name,
    image: resolveImage(product.image)
  };
}

export function getProductsByCategory(category) {
  const products = [];
  for (const line of CATALOG.lines) {
    for (const product of line.products) {
      if (product.category === category) {
        products.push(enrichProduct(product, line));
      }
    }
  }
  return products;
}

export function getJerseys() {
  return getProductsByCategory('Jerseys');
}

export function getBottoms() {
  return getProductsByCategory('Shorts & Bibs').concat(getProductsByCategory('Mallas'));
}

export function getAccessories() {
  return CATALOG.accessories.map(acc => ({
    ...acc,
    tierLabel: TIER_LABELS[acc.tier] || 'STD',
    image: resolveImage(acc.image)
  }));
}

export function getAddOns() {
  return CATALOG.add_ons;
}

export function getProductById(id) {
  for (const line of CATALOG.lines) {
    const product = line.products.find(p => p.id === id);
    if (product) {
      return enrichProduct(product, line);
    }
  }
  const accessory = CATALOG.accessories.find(a => a.id === id);
  if (accessory) {
    return { ...accessory, tierLabel: TIER_LABELS[accessory.tier] || 'STD', image: resolveImage(accessory.image) };
  }
  const addOn = CATALOG.add_ons.find(a => a.id === id);
  if (addOn) return addOn;
  return null;
}

export function formatPrice(value) {
  return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getSizeChart(category) {
  return SIZE_CHARTS.find(chart => chart.category === category) || null;
}

export function getSizeOptions(category) {
  const chart = getSizeChart(category);
  return chart ? chart.headers.slice(1) : [];
}