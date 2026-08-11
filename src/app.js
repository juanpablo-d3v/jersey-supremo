import menImage from './assets/images/men.png';
import womenImage from './assets/images/women.png';
import { getJerseys, getBottoms, getAccessories, getAddOns, getProductById, getSizeOptions, formatPrice } from './data/catalog.js';

export class App {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.data = {
      gender: null,
      jersey: {
        product: null,
        size: null
      },
      bottoms: {
        product: null,
        size: null
      },
      accessories: {
        items: []
      },
      add_ons: {
        items: []
      }
    };
  }

  init() {
    this.renderStep(this.currentStep);
    this.bindEvents();
  }

  genderLabel() {
    return this.data.gender === 'womens' ? "Women's" : "Men's";
  }

  jerseySizeScope() {
    return this.data.gender === 'womens' ? 'JERSEY MUJER' : 'JERSEY HOMBRE';
  }

  bottomsSizeScope() {
    return this.data.gender === 'womens' ? 'SHORT/BIB MUJER' : 'SHORT/BIB HOMBRE';
  }

  renderStep(step) {
    const app = document.getElementById('app');

    switch (step) {
      case 1:
        app.innerHTML = this.renderGenderStep();
        this.bindGenderEvents();
        break;
      case 2:
        app.innerHTML = this.renderJerseyStep();
        this.bindJerseyEvents();
        break;
      case 3:
        app.innerHTML = this.renderBottomsStep();
        this.bindBottomsEvents();
        break;
      case 4:
        app.innerHTML = this.renderAccessoriesStep();
        this.bindAccessoriesEvents();
        break;
      case 5:
        app.innerHTML = this.renderSummaryStep();
        this.bindSummaryEvents();
        break;
      default:
        app.innerHTML = '<div class="wizard-content">Step not implemented</div>';
    }

    this.updateProgress(step);
  }

  renderGenderStep() {
    return `
      <div class="wizard-app">
        <!-- Top AppBar -->
        <header class="wizard-header">
          <button class="wizard-header__btn" aria-label="Close">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">close</span>
          </button>
          <div class="wizard-header__title">APHESIS</div>
          <button class="wizard-header__save" aria-label="Save">SAVE</button>
        </header>

        <!-- Progress Indicator -->
        <div class="wizard-progress" id="progress-bar">
          <div class="wizard-progress__fill" id="progress-fill" style="width: 20%"></div>
        </div>
        <div class="wizard-step-indicator" id="step-indicator">01 / 05</div>

        <!-- Main Content Canvas -->
        <main class="wizard-main">
          <div class="wizard-content">
            <h1 class="wizard-content__title">Who are you riding for?</h1>
            <div class="wizard-content__divider speed-line"></div>
            <p class="wizard-content__subtitle">SELECT GENDER CONFIGURATION</p>
          </div>

          <div class="wizard-cards">
            <!-- Men's Card -->
            <button class="gender-card" id="btn-mens" data-gender="mens">
              <div class="gender-card__bg">
                <img class="gender-card__image"
                     src="${menImage}"
                     alt="Male cyclist">
                <div class="gender-card__overlay"></div>
              </div>
              <div class="gender-card__content">
                <h2 class="gender-card__label">Men</h2>
                <p class="gender-card__action">SELECT KIT →</p>
              </div>
            </button>

            <!-- Women's Card -->
            <button class="gender-card" id="btn-womens" data-gender="womens">
              <div class="gender-card__bg">
                <img class="gender-card__image"
                     src="${womenImage}"
                     alt="Female cyclist">
                <div class="gender-card__overlay"></div>
              </div>
              <div class="gender-card__content">
                <h2 class="gender-card__label">Women</h2>
                <p class="gender-card__action">SELECT KIT →</p>
              </div>
            </button>
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel">Cancel</button>
          <button class="wizard-footer__next" id="btn-next" disabled>Next</button>
        </footer>
      </div>
    `;
  }

  bindEvents() {
    // Global events if needed
  }

  bindGenderEvents() {
    const mensBtn = document.getElementById('btn-mens');
    const womensBtn = document.getElementById('btn-womens');
    const nextBtn = document.getElementById('btn-next');

    const selectGender = (gender) => {
      this.data.gender = gender;

      if (gender === 'mens') {
        mensBtn.classList.add('active');
        womensBtn.classList.remove('active');
      } else {
        womensBtn.classList.add('active');
        mensBtn.classList.remove('active');
      }

      // Enable Next Button
      nextBtn.disabled = false;
    };

    mensBtn.addEventListener('click', () => selectGender('mens'));
    womensBtn.addEventListener('click', () => selectGender('womens'));

    nextBtn.addEventListener('click', () => {
      if (!nextBtn.disabled) {
        this.nextStep();
      }
    });
  }

  updateProgress(step) {
    const progressFill = document.getElementById('progress-fill');
    const stepIndicator = document.getElementById('step-indicator');

    if (progressFill) {
      const percentage = (step / this.totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    if (stepIndicator) {
      stepIndicator.textContent = `${String(step).padStart(2, '0')} / ${String(this.totalSteps).padStart(2, '0')}`;
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.renderStep(this.currentStep);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderStep(this.currentStep);
    }
  }

  renderCatalogStep({ title, items, sizeScope, currentProduct, currentSize, imageFor, step = 2 }) {
    const sizeOptions = getSizeOptions(sizeScope);
    const stepNumber = String(step).padStart(2, '0');
    const totalNumber = String(this.totalSteps).padStart(2, '0');

    return `
      <div class="wizard-app">
        <!-- Top AppBar -->
        <header class="wizard-header">
          <button class="wizard-header__btn" aria-label="Close">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">close</span>
          </button>
          <div class="wizard-header__title">APHESIS</div>
          <button class="wizard-header__save" aria-label="Save">SAVE</button>
        </header>

        <!-- Progress Indicator -->
        <div class="wizard-progress" id="progress-bar">
          <div class="wizard-progress__fill progress-bar-active" id="progress-fill" style="width: ${(step / this.totalSteps) * 100}%"></div>
        </div>
        <div class="wizard-step-indicator" id="step-indicator">${stepNumber} / ${totalNumber}</div>

        <!-- Main Content Canvas -->
        <main class="wizard-main">
          <div class="wizard-content">
            <h2 class="wizard-content__title">${title}</h2>
            <div class="wizard-content__divider speed-line"></div>
          </div>

          <div class="product-grid" id="product-grid">
            ${items.map(item => {
              const isActive = item.id === currentProduct;
              return `
                <button class="product-card ${isActive ? 'active' : ''}"
                        data-product="${item.id}"
                        data-price="${item.price}">
                  <img class="product-card__image"
                       src="${imageFor(item)}"
                       alt="${item.name}">
                  <div class="product-card__content">
                    <div class="product-card__header">
                      <span class="product-card__price">${formatPrice(item.price)}</span>
                      <span class="product-card__tier-badge">${item.tierLabel}</span>
                    </div>
                    <h3 class="product-card__title">${item.name}</h3>
                    <p class="product-card__description">${item.category.toUpperCase()} · ${item.tierName} LINE</p>

                    <div class="product-card__section">
                      <span class="product-card__section-label">Select Size</span>
                      <div class="size-group">
                        ${sizeOptions.map(size => `
                          <label class="size-option">
                            <input type="radio" name="size-${item.id}" value="${size}"
                                   ${isActive && currentSize === size ? 'checked' : ''}
                                   ${!isActive ? 'disabled' : ''}>
                            <span class="size-option__label">${size}</span>
                          </label>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <button class="wizard-footer__next" id="btn-next">Next</button>
        </footer>
      </div>
    `;
  }

  renderJerseyStep() {
    const jerseys = getJerseys();
    return this.renderCatalogStep({
      title: 'Select Jersey',
      items: jerseys,
      sizeScope: this.jerseySizeScope(),
      currentProduct: this.data.jersey.product,
      currentSize: this.data.jersey.size,
      imageFor: (item) => item.image,
      step: 2
    });
  }

  renderBottomsStep() {
    const bottoms = getBottoms();
    return this.renderCatalogStep({
      title: 'Select Bottoms',
      items: bottoms,
      sizeScope: this.bottomsSizeScope(),
      currentProduct: this.data.bottoms.product,
      currentSize: this.data.bottoms.size,
      imageFor: (item) => item.image,
      step: 3
    });
  }

  renderAccessoriesStep() {
    const accessories = getAccessories();
    const addOns = getAddOns();

    const accessoryItems = this.data.accessories.items;
    const addOnItems = this.data.add_ons.items;

    // Calculate running total
    const jersey = getProductById(this.data.jersey.product);
    const bottoms = getProductById(this.data.bottoms.product);
    const accessoriesTotal = accessories
      .filter(a => accessoryItems.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    const addOnsTotal = addOns
      .filter(a => addOnItems.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    const totalPrice = (jersey?.price || 0) + (bottoms?.price || 0) + accessoriesTotal + addOnsTotal;

    const tierBadgeClass = {
      premier: 'accessory-card__tier-badge--premier',
      elite: 'accessory-card__tier-badge--elite',
      standard: 'accessory-card__tier-badge--standard'
    };

    return `
      <div class="wizard-app">
        <!-- Top AppBar -->
        <header class="wizard-header">
          <button class="wizard-header__btn" aria-label="Close">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">close</span>
          </button>
          <div class="wizard-header__title">APHESIS</div>
          <button class="wizard-header__save" aria-label="Save">SAVE</button>
        </header>

        <!-- Progress Indicator -->
        <div class="wizard-progress" id="progress-bar">
          <div class="wizard-progress__fill progress-bar-active" id="progress-fill" style="width: 80%"></div>
        </div>
        <div class="wizard-step-indicator" id="step-indicator">04 / 05</div>

        <!-- Main Content Canvas -->
        <main class="wizard-main">
          <div class="wizard-content">
            <h2 class="wizard-content__title">Accessories</h2>
            <div class="wizard-content__divider speed-line"></div>
          </div>

          <!-- Bento Grid / Multi-Select Cards -->
          <div class="accessories-grid" id="accessories-grid">
            ${accessories.map(accessory => {
              const isSelected = accessoryItems.includes(accessory.id);
              const image = accessory.image;
              return `
                <button class="accessory-card ${isSelected ? 'selected' : ''}"
                        data-id="${accessory.id}"
                        data-price="${accessory.price}"
                        data-kind="accessory">
                  <div class="accessory-card__overlay"></div>
                  <div class="accessory-card__tier-badge ${tierBadgeClass[accessory.tier] || tierBadgeClass.standard}">${accessory.tierLabel}</div>
                  <div class="accessory-card__image-wrapper">
                    <img class="accessory-card__image"
                         src="${image}"
                         alt="${accessory.name}">
                  </div>
                  <div class="accessory-card__content">
                    <div class="accessory-card__info">
                      <span class="accessory-card__name">${accessory.name}</span>
                      <span class="accessory-card__material">${accessory.tier ? accessory.tier.toUpperCase() : 'CATALOG'}</span>
                    </div>
                    <div class="accessory-card__price">${formatPrice(accessory.price)}</div>
                  </div>
                  ${isSelected ? `
                    <div class="accessory-card__check">
                      <span class="material-symbols-outlined">check</span>
                    </div>
                  ` : ''}
                </button>
              `;
            }).join('')}
          </div>

          ${addOns.length ? `
            <h3 class="accessories-grid__subtitle">ADD-ONS</h3>
            <div class="accessories-grid" id="addons-grid">
              ${addOns.map(addOn => {
                const isSelected = addOnItems.includes(addOn.id);
                return `
                  <button class="accessory-card ${isSelected ? 'selected' : ''}"
                          data-id="${addOn.id}"
                          data-price="${addOn.price}"
                          data-kind="addon">
                    <div class="accessory-card__overlay"></div>
                    <div class="accessory-card__tier-badge ${tierBadgeClass.standard}">EXTRA</div>
                    <div class="accessory-card__image-wrapper accessory-card__image-wrapper--addon">
                      <span class="material-symbols-outlined accessories-grid__addon-icon">add_circle</span>
                    </div>
                    <div class="accessory-card__content">
                      <div class="accessory-card__info">
                        <span class="accessory-card__name">${addOn.name}</span>
                        <span class="accessory-card__material">${addOn.type.toUpperCase().replace('_', ' ')}</span>
                      </div>
                      <div class="accessory-card__price">${formatPrice(addOn.price)}</div>
                    </div>
                    ${isSelected ? `
                      <div class="accessory-card__check">
                        <span class="material-symbols-outlined">check</span>
                      </div>
                    ` : ''}
                  </button>
                `;
              }).join('')}
            </div>
          ` : ''}
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <div class="wizard-footer__total">
            <span class="wizard-footer__total-label">Running Total</span>
            <span class="wizard-footer__total-amount" id="running-total">${formatPrice(totalPrice)}</span>
          </div>
          <button class="wizard-footer__next" id="btn-next">Review Order</button>
        </footer>
      </div>
    `;
  }

  bindJerseyEvents() {
    this.bindProductGridEvents({
      key: 'jersey'
    });
  }

  bindBottomsEvents() {
    this.bindProductGridEvents({
      key: 'bottoms'
    });
  }

  bindProductGridEvents({ key }) {
    const productCards = document.querySelectorAll('.product-card');
    const nextBtn = document.getElementById('btn-next');

    const selectProduct = (selectedCard) => {
      const productId = selectedCard.dataset.product;

      productCards.forEach(card => {
        card.classList.remove('active');

        const sizeInputs = card.querySelectorAll('input[name^="size-"]');
        sizeInputs.forEach(input => {
          input.disabled = true;
          input.checked = false;
        });

        const sizeLabels = card.querySelectorAll('.size-option__label');
        sizeLabels.forEach(label => {
          label.style.backgroundColor = '';
          label.style.color = '';
          label.style.borderColor = '';
        });
      });

      selectedCard.classList.add('active');

      const activeSizeInputs = selectedCard.querySelectorAll('input[name^="size-"]');
      activeSizeInputs.forEach(input => {
        input.disabled = false;
      });

      this.data[key].product = productId;
      this.data[key].size = null;
    };

    productCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.closest('.size-option')) {
          return;
        }
        selectProduct(card);
      });
    });

    document.querySelectorAll('.size-option input').forEach(input => {
      input.addEventListener('change', (e) => {
        const productId = e.target.name.replace('size-', '');
        if (e.target.checked) {
          this.data[key].size = e.target.value;
        }
      });
    });

    nextBtn.addEventListener('click', () => {
      this.nextStep();
    });

    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.prevStep();
      });
    }
  }

  bindAccessoriesEvents() {
    const accessoryCards = document.querySelectorAll('.accessory-card');
    const nextBtn = document.getElementById('btn-next');
    const runningTotal = document.getElementById('running-total');

    const jersey = getProductById(this.data.jersey.product);
    const bottoms = getProductById(this.data.bottoms.product);
    const basePrice = (jersey?.price || 0) + (bottoms?.price || 0);

    const toggleItem = (card) => {
      const itemId = card.dataset.id;
      const price = parseInt(card.dataset.price);
      const kind = card.dataset.kind === 'addon' ? 'add_ons' : 'accessories';
      const isSelected = card.classList.contains('selected');
      const items = this.data[kind].items;

      if (isSelected) {
        card.classList.remove('selected');
        const check = card.querySelector('.accessory-card__check');
        if (check) check.remove();
        const index = items.indexOf(itemId);
        if (index !== -1) items.splice(index, 1);
      } else {
        card.classList.add('selected');
        const checkHtml = `
          <div class="accessory-card__check">
            <span class="material-symbols-outlined">check</span>
          </div>
        `;
        card.insertAdjacentHTML('beforeend', checkHtml);
        items.push(itemId);
      }

      const accessoriesPrice = Array.from(document.querySelectorAll('.accessory-card[data-kind="accessory"].selected'))
        .reduce((sum, c) => sum + parseInt(c.dataset.price), 0);
      const addOnsPrice = Array.from(document.querySelectorAll('.accessory-card[data-kind="addon"].selected'))
        .reduce((sum, c) => sum + parseInt(c.dataset.price), 0);
      const totalPrice = basePrice + accessoriesPrice + addOnsPrice;

      if (runningTotal) {
        runningTotal.textContent = formatPrice(totalPrice);
      }
    };

    accessoryCards.forEach(card => {
      card.addEventListener('click', () => toggleItem(card));
    });

    nextBtn.addEventListener('click', () => {
      this.nextStep();
    });

    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.prevStep();
      });
    }
  }

  renderSummaryStep() {
    const jersey = getProductById(this.data.jersey.product);
    const bottoms = getProductById(this.data.bottoms.product);

    const accessoryItems = this.data.accessories.items
      .map(id => getProductById(id))
      .filter(Boolean);
    const addOnItems = this.data.add_ons.items
      .map(id => getProductById(id))
      .filter(Boolean);

    const genderLabel = this.genderLabel();
    const jerseySize = this.data.jersey.size || '—';
    const bottomsSize = this.data.bottoms.size || '—';

    const subtotal = (jersey?.price || 0) + (bottoms?.price || 0)
      + accessoryItems.reduce((sum, a) => sum + a.price, 0)
      + addOnItems.reduce((sum, a) => sum + a.price, 0);

    return `
      <div class="wizard-app">
        <!-- Top AppBar -->
        <header class="wizard-header">
          <button class="wizard-header__btn" aria-label="Close">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">close</span>
          </button>
          <div class="wizard-header__title">APHESIS</div>
          <button class="wizard-header__save" aria-label="Save">SAVE</button>
        </header>

        <!-- Progress Indicator -->
        <div class="wizard-progress" id="progress-bar">
          <div class="wizard-progress__fill" id="progress-fill" style="width: 100%"></div>
        </div>
        <div class="wizard-step-indicator" id="step-indicator">05 / 05</div>

        <!-- Main Content Canvas -->
        <main class="wizard-main summary-main">
          <div class="summary-header">
            <h2 class="summary-header__title">05. Summary</h2>
            <div class="summary-header__divider"></div>
            <p class="summary-header__description">Finalize your precision configuration. Review your selections below before proceeding to checkout.</p>
          </div>

          <div class="summary-grid">
            <!-- Left Column: Order Breakdown Bento Grid -->
            <div class="summary-grid__left">
              <div class="bento-grid">
                <!-- Bento Item: Jersey -->
                <div class="bento-card ${jersey?.tier ? `bento-card--${jersey.tier}` : ''}">
                  <div class="bento-card__layout">
                    <div class="bento-card__image-wrapper">
                      <img class="bento-card__image" src="${jersey?.image || ''}" alt="${jersey?.name || 'Jersey'}">
                      <div class="bento-card__tier-badge bento-card__tier-badge--standard">${jersey?.tierLabel || '—'}</div>
                    </div>
                    <div class="bento-card__content">
                      <div class="bento-card__header">
                        <h3 class="bento-card__title">${jersey?.name || 'No jersey selected'}</h3>
                        <span class="bento-card__price">${jersey ? formatPrice(jersey.price) : '—'}</span>
                      </div>
                      <p class="bento-card__details">${genderLabel} / Size ${jerseySize}</p>
                      <div class="bento-card__tags">
                        <span class="bento-card__tag">Jersey</span>
                        <span class="bento-card__tag">${jersey?.tierName || '—'} Fit</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bento Item: Bottoms -->
                <div class="bento-card ${bottoms?.tier ? `bento-card--${bottoms.tier}` : ''}">
                  <div class="bento-card__layout">
                    <div class="bento-card__image-wrapper">
                      <img class="bento-card__image" src="${bottoms?.image || ''}"  alt="${bottoms?.name || 'Bottoms'}">
                      <div class="bento-card__tier-badge bento-card__tier-badge--standard">${bottoms?.tierLabel || '—'}</div>
                    </div>
                    <div class="bento-card__content">
                      <div class="bento-card__header">
                        <h3 class="bento-card__title">${bottoms?.name || 'No bottoms selected'}</h3>
                        <span class="bento-card__price">${bottoms ? formatPrice(bottoms.price) : '—'}</span>
                      </div>
                      <p class="bento-card__details">${genderLabel} / Size ${bottomsSize}</p>
                      <div class="bento-card__tags">
                        <span class="bento-card__tag">${bottoms?.category || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bento Item: Accessories -->
                <div class="accessories-mini-grid">
                  ${accessoryItems.map(acc => `
                    <div class="accessory-mini-card">
                      <div class="accessory-mini-card__image-wrapper">
                        <div class="accessory-mini-card__image" style="background-image: url('${acc.image || ''}')"></div>
                        <div class="accessory-mini-card__tier-badge accessory-mini-card__tier-badge--standard">STD</div>
                      </div>
                      <div class="accessory-mini-card__content">
                        <div class="accessory-mini-card__header">
                          <h4 class="accessory-mini-card__name">${acc.name}</h4>
                          <span class="accessory-mini-card__price">${formatPrice(acc.price)}</span>
                        </div>
                        <p class="accessory-mini-card__details">Accessory</p>
                      </div>
                    </div>
                  `).join('')}
                  ${addOnItems.map(addOn => `
                    <div class="accessory-mini-card">
                      <div class="accessory-mini-card__image-wrapper">
                        <div class="accessory-mini-card__tier-badge accessory-mini-card__tier-badge--standard">EXTRA</div>
                      </div>
                      <div class="accessory-mini-card__content">
                        <div class="accessory-mini-card__header">
                          <h4 class="accessory-mini-card__name">${addOn.name}</h4>
                          <span class="accessory-mini-card__price">${formatPrice(addOn.price)}</span>
                        </div>
                        <p class="accessory-mini-card__details">Add-on</p>
                      </div>
                    </div>
                  `).join('')}
                  ${!accessoryItems.length && !addOnItems.length ? `
                    <p class="accessory-mini-card__empty">No accessories selected</p>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Right Column: Checkout Total -->
            <div class="summary-grid__right checkout-panel">
              <div class="checkout-card">
                <h3 class="checkout-card__title">ORDER TOTAL</h3>
                <div class="checkout-card__rows">
                  <div class="checkout-row">
                    <span>Subtotal</span>
                    <span class="checkout-row__value">${formatPrice(subtotal)}</span>
                  </div>
                  <div class="checkout-row">
                    <span>Shipping</span>
                    <span class="checkout-row__value">Calculated next step</span>
                  </div>
                  <div class="checkout-row">
                    <span>Taxes</span>
                    <span class="checkout-row__value">Calculated next step</span>
                  </div>
                  <div class="checkout-card__divider"></div>
                  <div class="checkout-card__total">
                    <span class="checkout-card__total-label">Grand Total</span>
                    <span class="checkout-card__total-amount">${formatPrice(subtotal)}</span>
                  </div>
                </div>

                <!-- Discount Code Input -->
                <div class="promo-input-group">
                  <input class="promo-input" type="text" placeholder="PROMO CODE">
                  <button class="promo-input__btn">APPLY</button>
                </div>

                <!-- Primary Action -->
                <button class="btn-complete-order" id="btn-complete-order">
                  Complete Order
                  <span class="material-symbols-outlined btn-complete-order__icon">arrow_forward</span>
                </button>
                <p class="checkout-card__terms">By completing this order, you agree to our Terms of Service & Kinetic Return Policy.</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <button class="wizard-footer__next" id="btn-complete-order-footer">Complete Order</button>
        </footer>
      </div>
    `;
  }

  bindSummaryEvents() {
    const completeBtn = document.getElementById('btn-complete-order');
    const footerCompleteBtn = document.getElementById('btn-complete-order-footer');
    const promoBtn = document.querySelector('.promo-input__btn');
    const promoInput = document.querySelector('.promo-input');

    const completeOrder = () => {
      // Placeholder for order completion
      alert('Order completed! Thank you for your purchase.');
    };

    if (completeBtn) {
      completeBtn.addEventListener('click', completeOrder);
    }

    if (footerCompleteBtn) {
      footerCompleteBtn.addEventListener('click', completeOrder);
    }

    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code) {
          alert(`Promo code "${code}" applied!`);
        }
      });
    }

    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.prevStep();
      });
    }
  }
}