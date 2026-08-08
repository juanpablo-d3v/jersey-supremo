export class App {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.data = {
      gender: null,
      jersey: {
        tier: 'premier',
        textile: null,
        size: null
      },
      bottoms: {
        tier: 'elite',
        type: 'bib',
        size: null
      },
      accessories: {
        items: []
      }
    };
  }

  init() {
    this.renderStep(this.currentStep);
    this.bindEvents();
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
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGVu-pSFrqO6_72TmvAL1g2pSGekS_k9Q3eXZoUZE-zQ3QF5kMMfwjgB8PWFGTad8GmoMnLIE9_E5pHk90Cg8_mHlnzkfT5CtnTNhAjSEhiaIAIUMYSLypSPcBPSJti9922lJKDj33-htSxl6PrmeDM_NoAICJxOmUJD0SPk3OQGl493Gxpj1WGUf47y98XRAk6Gaqai85wVnt_qV8MUXcsoyFirLXhuumkIJi540Y_Zj1YTQFD9yE" 
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
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuBslpPtLUwRLTuyglj3HfO5CDKsS8tXQsqAOBRUb3BEplMJjLUcxfEDklQ60DcjSBdbLYrpZGq28rxdc23DUjg1TT48mBeebzKbSr8_-isRi-nzrtsBzAz47uzLX1sKQjZAlzTh0x20VwbkB3a4T0sOFlXtebFuAGqobQ7A7L_RFH9Tfh4ELi06A7XLGE5z15jcsobSX4hy-iVrwI5xPyXM-OphixemLFgIP84588fwO_CeT7XmG9ny" 
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

  renderJerseyStep() {
    const tiers = [
      {
        id: 'standard',
        name: 'Standard Jersey',
        price: 830,
        badge: 'STD',
        description: 'Foundation level performance with adaptable thermal regulation.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApPn1f9tzNX_tbyoWYFbiJ-cUZiO_aVdDmWyBJBCGO--SzV9gnS307eSuYg1TRZdDJG9PYaZxFqGhEdmLxYtU-pOnYO5tIgblfL31WMTK3GQ1ldXZK432sFQH5Gwyq-A9wBtX6DWO931aLBSrOipYBLI-QK40PUZN_qanPFP9-nuqgG1osZo0DycPhQT__WvBXRbL8lNSF1miAU-odYXDIlK_bK3JCM7VaJtlIEsB4pmcem9l6GTGR',
        hasTextile: true,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'elite',
        name: 'Elite Jersey',
        price: 950,
        badge: 'ELT',
        description: 'Aerodynamic ribbed construction with laser-cut precision fit for competitive racing.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkB5AJVgy4eZxRkZQUiwsrxuIEAPHyOjFrD0CdNF29vKdLQfRiY1qEGUM-np_wC7RHB9h5nynYiWz5rd0DKhPLRX6i2YPPPlQofZ9oi3ld1QtTiioyaA_QhwykTd7yqYYx0JO0D7hNY_K-9-G295-LigV1y2lLjBU7ypOPz6PRm27Yoa7f0sG6OdPUz9c2GajYcMeyn_YbSuUy8-tlrDmX06Z8wl9poiulCed1rNWg4dyl9vIJLoNt',
        hasTextile: false,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'premier',
        name: 'Premier Jersey',
        price: 1280,
        badge: 'PRM',
        description: 'The pinnacle of kinetic engineering. Ultra-lightweight matrix fabric woven with microscopic drag-reduction channels.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMfXxuGIhgK2iV2t8MECRm6gGezMpZBj6N2YJDSZ_lT49dUFrroQGN4knWbkDWfgSwTDB5yBRdBzUgvE5pLvsGrI9LZchJJTOFDCH_fQXxk36MZ-RMFW8qQWpAqPJYi0nxrbp5sWyQvgSQNvimQWjUYp7te8VkzngrYcCp-D7WVjtw78yAlUH3bu88hFhKHnv1rCMecxV4hKT7gCIxMAZ5seY8nJmdSkRrUDUWt5sPcNPQUD08pWhu',
        hasTextile: false,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      }
    ];

    const currentTier = this.data.jersey.tier;
    const currentPrice = tiers.find(t => t.id === currentTier)?.price || 1280;

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
          <div class="wizard-progress__fill" id="progress-fill" style="width: 40%"></div>
        </div>
        <div class="wizard-step-indicator" id="step-indicator">02 / 05</div>

        <!-- Main Content Canvas -->
        <main class="wizard-main">
          <div class="wizard-content">
            <h2 class="wizard-content__title">Select Performance Tier</h2>
            <div class="wizard-content__divider speed-line"></div>
          </div>

          <div class="product-grid" id="product-grid">
            ${tiers.map(tier => `
              <button class="product-card ${tier.id === currentTier ? 'active' : ''}" 
                      data-tier="${tier.id}" 
                      data-price="${tier.price}">
                <img class="product-card__image" 
                     src="${tier.image}" 
                     alt="${tier.name}">
                <div class="product-card__content">
                  <div class="product-card__header">
                    <span class="product-card__price">$${tier.price.toLocaleString()}</span>
                    <span class="product-card__tier-badge">${tier.badge}</span>
                  </div>
                  <h3 class="product-card__title">${tier.name}</h3>
                  <p class="product-card__description">${tier.description}</p>
                  
                  ${tier.hasTextile ? `
                    <div class="product-card__section">
                      <span class="product-card__section-label">TEXTILE MATRIX</span>
                      <div class="radio-group">
                        <label class="radio-option">
                          <input type="radio" name="textile-${tier.id}" value="3dx" ${this.data.jersey.textile === '3dx' ? 'checked' : ''} disabled>
                          <span class="radio-option__indicator"></span>
                          <span class="radio-option__label">3DX</span>
                        </label>
                        <label class="radio-option">
                          <input type="radio" name="textile-${tier.id}" value="redmesh" ${this.data.jersey.textile === 'redmesh' ? 'checked' : ''} disabled>
                          <span class="radio-option__indicator"></span>
                          <span class="radio-option__label">Redmesh</span>
                        </label>
                      </div>
                    </div>
                  ` : ''}

                  <div class="product-card__section">
                    <span class="product-card__section-label">Select Size</span>
                    <div class="size-group">
                      ${tier.sizes.map(size => `
                        <label class="size-option">
                          <input type="radio" name="size-${tier.id}" value="${size}" ${this.data.jersey.size === size && tier.id === currentTier ? 'checked' : ''} ${tier.id !== currentTier ? 'disabled' : ''}>
                          <span class="size-option__label">${size}</span>
                        </label>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </button>
            `).join('')}
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

  bindJerseyEvents() {
    const productCards = document.querySelectorAll('.product-card');
    const nextBtn = document.getElementById('btn-next');
    const runningTotal = document.getElementById('running-total');

    const selectTier = (selectedCard) => {
      const tierId = selectedCard.dataset.tier;
      const price = parseInt(selectedCard.dataset.price);

      // Remove active from all cards
      productCards.forEach(card => {
        card.classList.remove('active');
        
        // Disable size inputs for non-active cards
        const sizeInputs = card.querySelectorAll('input[name^="size-"]');
        sizeInputs.forEach(input => {
          input.disabled = true;
          input.checked = false;
        });
        
        // Remove checked from size labels
        const sizeLabels = card.querySelectorAll('.size-option__label');
        sizeLabels.forEach(label => {
          label.style.backgroundColor = '';
          label.style.color = '';
          label.style.borderColor = '';
        });
      });

      // Add active to selected
      selectedCard.classList.add('active');

      // Enable size inputs for active card
      const activeSizeInputs = selectedCard.querySelectorAll('input[name^="size-"]');
      activeSizeInputs.forEach(input => {
        input.disabled = false;
      });

      // Update data
      this.data.jersey.tier = tierId;
      this.data.jersey.size = null; // Reset size when tier changes

      // Update price
      if (runningTotal) {
        runningTotal.textContent = `$${price.toLocaleString()}`;
      }
    };

    productCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on radio inputs or labels
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.closest('.radio-option') || e.target.closest('.size-option')) {
          return;
        }
        selectTier(card);
      });
    });

    // Handle size selection
    document.querySelectorAll('.size-option input').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.data.jersey.size = e.target.value;
        }
      });
    });

    // Handle textile selection (only for standard tier)
    document.querySelectorAll('.radio-option input').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.data.jersey.textile = e.target.value;
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

  renderBottomsStep() {
    const tiers = [
      {
        id: 'standard',
        name: 'Core Endurance',
        price: 700,
        badge: 'STD',
        tierLabel: 'STANDARD',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpzbaerwP19Xx_sLBN2A3CB1PMkqZcadNSmoLBhVkjEFumo8kg7Q4w16Glndng-G0Rbp_HNKxfWLgZU4QnMJH-lsBrsJNuYVo1P2Y7BiQItpjsQLcqwUcjRm2MHhnXpTXQzyyk8BjKS4-N2G4SRIYodUsjJO1Pf29GRm90VicXnYpT42R_nHEirg30TR12u3w0jaU6UE0sN69u2VrlHD0QSAsKJ4hE3n94gydXQ-XiMjMv_gOGekrU',
        types: ['shorts', 'bib', 'mallas'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        tierClass: 'bottoms-card--standard'
      },
      {
        id: 'elite',
        name: 'Aero Precision',
        price: 870,
        badge: 'ELT',
        tierLabel: 'ELITE',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBvDVdtg7LGNhbz8GKhcis010_Uqr713pgkO1_MiC3GDpi76glDEl6xdM1zyxTPrP3-YFfsEfE5MS4EjYc0KOSs9wSqQZ_tEEYYtgK15CsvZLTshKR2uW0JWFrD0YYg83iZpGvHCEa68u6uS_0aghibEDvDe38D_TD2KFHNVn7qa3NR25_hIfdXgRqymuyAjf00YfPjwWQpfApt4vupUf39uBy27SRBcFLqyvqs-7kdhxG1DLeLxg9',
        types: ['shorts', 'bib', 'mallas'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        tierClass: 'bottoms-card--elite'
      },
      {
        id: 'premier',
        name: 'Kinetic Apex',
        price: 1400,
        badge: 'PRM',
        tierLabel: 'PREMIER',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVFUI3mHFrlWBNFEvqtjW5rxbIduHHUrN2ERVU1JmLqUuIR2va6MKj_5MSik3j7p1cE5wjHqPocyePW8Ua51MFP4GIwvxC6tYzqTTMgpASlCyzlYwmlLEbII4Bhy0Oig5RCZu90fjN9F4H29O6nkLfaMPnucritQzx91ZoKWvSwYh9QQs_-M0HNKVtPwprHnsmAAQCASDkMaoJCVTqh5NGMs7wlM11f7CamIP6A0-Me2wNDdG6ayVB',
        types: ['shorts', 'bib', 'mallas'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        tierClass: 'bottoms-card--premier',
        disabledTypes: ['shorts']
      }
    ];

    const currentTier = this.data.bottoms.tier;
    const currentType = this.data.bottoms.type;
    const currentSize = this.data.bottoms.size;

    // Calculate running total: jersey price + bottoms price
    const jerseyTiers = {
      standard: 830,
      elite: 950,
      premier: 1280
    };
    const jerseyPrice = jerseyTiers[this.data.jersey.tier] || 1280;
    const bottomsTier = tiers.find(t => t.id === currentTier);
    const bottomsPrice = bottomsTier?.price || 870;
    const totalPrice = jerseyPrice + bottomsPrice;

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
          <div class="wizard-progress__fill progress-bar-active" id="progress-fill" style="width: 60%"></div>
        </div>
        <div class="wizard-step-indicator" id="step-indicator">03 / 05</div>

        <main class="wizard-main" style="padding-top: calc(var(--header-height) + var(--progress-height) + var(--spacing-stack-md) + 48px);">
          <h1 class="wizard-content__title" style="color: var(--color-primary); margin-bottom: var(--spacing-stack-md);">Select Bottoms</h1>
          <div class="wizard-content__divider speed-line speed-line-wide"></div>

          <div class="product-grid" id="bottoms-grid">
            ${tiers.map(tier => `
              <button class="bottoms-card ${tier.tierClass} ${tier.id === currentTier ? 'active' : ''}" 
                      data-tier="${tier.id}" 
                      data-price="${tier.price}">
                <div class="bottoms-card__tier-badge">${tier.badge}</div>
                <img class="bottoms-card__image" 
                     src="${tier.image}" 
                     alt="${tier.name}">
                <div class="bottoms-card__price-row">
                  <span class="bottoms-card__price">$${tier.price}+</span>
                  <span class="bottoms-card__tier-label">${tier.tierLabel}</span>
                </div>
                <h3 class="bottoms-card__title">${tier.name}</h3>
                <select class="bottoms-card__size-select" data-tier="${tier.id}" ${tier.id !== currentTier ? 'disabled' : ''}>
                  <option value="">SELECT SIZE</option>
                  ${tier.sizes.map(size => `
                    <option value="${size}" ${size === currentSize && tier.id === currentTier ? 'selected' : ''}>${size}</option>
                  `).join('')}
                </select>
                <div class="bottoms-card__type-group">
                  ${tier.types.map(type => `
                    <label class="bottoms-card__type-option">
                      <input type="radio" name="type-${tier.id}" value="${type}" 
                             ${type === currentType && tier.id === currentTier ? 'checked' : ''} 
                             ${tier.id !== currentTier ? 'disabled' : ''}
                             ${tier.disabledTypes?.includes(type) ? 'disabled' : ''}>
                      <span class="bottoms-card__type-label">${type.toUpperCase()}</span>
                    </label>
                  `).join('')}
                </div>
              </button>
            `).join('')}
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

  bindBottomsEvents() {
    const bottomsCards = document.querySelectorAll('.bottoms-card');
    const nextBtn = document.getElementById('btn-next');
    const runningTotal = document.getElementById('running-total');
    const progressFill = document.getElementById('progress-fill');

    // Update progress bar to 60% for step 3
    if (progressFill) {
      progressFill.style.width = '60%';
    }

    // Update step indicator
    const stepIndicator = document.getElementById('step-indicator');
    if (stepIndicator) {
      stepIndicator.innerHTML = '<span>03 BOTTOMS</span><span>STEP 3 OF 5</span>';
    }

    const jerseyTiers = {
      standard: 830,
      elite: 950,
      premier: 1280
    };

    const selectTier = (selectedCard) => {
      const tierId = selectedCard.dataset.tier;
      const price = parseInt(selectedCard.dataset.price);

      // Remove active from all cards
      bottomsCards.forEach(card => {
        card.classList.remove('active');
        
        // Disable size select for non-active cards
        const sizeSelect = card.querySelector('.bottoms-card__size-select');
        if (sizeSelect) {
          sizeSelect.disabled = true;
          sizeSelect.value = '';
        }
        
        // Disable type inputs for non-active cards
        const typeInputs = card.querySelectorAll('input[name^="type-"]');
        typeInputs.forEach(input => {
          input.disabled = true;
          input.checked = false;
        });
      });

      // Add active to selected
      selectedCard.classList.add('active');

      // Enable size select for active card
      const activeSizeSelect = selectedCard.querySelector('.bottoms-card__size-select');
      if (activeSizeSelect) {
        activeSizeSelect.disabled = false;
      }

      // Enable type inputs for active card
      const activeTypeInputs = selectedCard.querySelectorAll('input[name^="type-"]');
      activeTypeInputs.forEach(input => {
        input.disabled = false;
      });

      // Update data
      this.data.bottoms.tier = tierId;
      this.data.bottoms.type = null;
      this.data.bottoms.size = null;

      // Update running total
      const jerseyPrice = jerseyTiers[this.data.jersey.tier] || 1280;
      const totalPrice = jerseyPrice + price;
      if (runningTotal) {
        runningTotal.textContent = `$${totalPrice.toLocaleString()}`;
      }
    };

    bottomsCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on select or radio inputs/labels
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION' || 
            e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' ||
            e.target.closest('.bottoms-card__type-option') || e.target.closest('.bottoms-card__size-select')) {
          return;
        }
        selectTier(card);
      });
    });

    // Handle size selection
    document.querySelectorAll('.bottoms-card__size-select').forEach(select => {
      select.addEventListener('change', (e) => {
        if (e.target.value) {
          this.data.bottoms.size = e.target.value;
        }
      });
    });

    // Handle type selection
    document.querySelectorAll('.bottoms-card__type-option input').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.data.bottoms.type = e.target.value;
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

  renderAccessoriesStep() {
    const accessories = [
      {
        id: 'gloves',
        name: 'AERO PRO GLOVES',
        material: 'Carbon Fiber',
        price: 275,
        tier: 'premier',
        tierLabel: 'PRM',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiPyu6Y2ljW4ri2KB4FNRQelszb6gD7mIYmNs4n2qGiLZ6cI6_6R_DTLXsKrkgvg1lufXQjJ8guW6ZgADeXuAt669M5axf21Fnqb0LZi43bmpVpPS_42pdVOcvb1clR_bWNfIRCUjjxkokcbCa4PWD_xPBCGPwT4PgQXr54allqiQ-WvCMz7scvJhvrLcrF85-WeiN5cYIBxcmKN02_Iur6xv-k-r0CKcVrOBt3u6hSBb3cp6e5qJk',
        selected: true
      },
      {
        id: 'buff',
        name: 'THERMAL BUFF',
        material: 'Merino Blend',
        price: 190,
        tier: 'elite',
        tierLabel: 'ELT',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTQdEQEziauuCtFqHR709m9DTSb2R8BhNh7fsABAxleuvJx9oMLWX95XFE3oY4neyCFVHhiMQ_3twzgXLJIRQnE5hvgW6fVUABG9j7z4S4Mbp4jUwJxr4CaIY7XhF2b6Ywpcu325_QgPFCs_3EuLqkun--2mREN4SiLOrF_gZTctfIo-tUughmCvAZR-IF-jUb_998dUd6lS6dlbNMAv-xE672W9WEVA2uICTp6eDT0bzoSE-Y4Tcy',
        selected: true
      },
      {
        id: 'socks',
        name: 'COMPRESSION SOCKS',
        material: 'Classic White',
        price: 45,
        tier: 'standard',
        tierLabel: 'STD',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlHmKSDyc4Tr_4xXICyFXDn0crqF-5UZ4HXYqU6s_u5VHbvJIPfu6fYLBcZL467IMzvWK5kxXPH1sUT7R_tRtWpEq2U9OqO5G5Y57KNlGmiLur65dzSwOUNzMzzpNe2dH4YsznDwb2f9id-VefqeDKbaI4zYAbC5AUww1Sm0hfMYDC-ED3uF7ZBw6yhmeqefR-8dL7O0YJxzcFTMAy02Bl66vxlZwQ0iOLHg7ZRXbd-WCLhhQptTbk',
        selected: false
      }
    ];

    // Calculate running total
    const jerseyTiers = { standard: 830, elite: 950, premier: 1280 };
    const bottomsTiers = { standard: 700, elite: 870, premier: 1400 };
    const jerseyPrice = jerseyTiers[this.data.jersey.tier] || 1280;
    const bottomsPrice = bottomsTiers[this.data.bottoms.tier] || 870;
    const accessoriesPrice = accessories.filter(a => a.selected).reduce((sum, a) => sum + a.price, 0);
    const totalPrice = jerseyPrice + bottomsPrice + accessoriesPrice;

    const tierBadgeClass = {
      premier: 'accessory-card__tier-badge--premier',
      elite: 'accessory-card__tier-badge--elite',
      standard: 'accessory-card__tier-badge--standard'
    };

    return `
      <div class="wizard-app">
        <!-- Main Content Canvas -->
        <main class="wizard-main">
          <!-- Top AppBar (Mobile) -->
          <header class="wizard-header md:hidden">
            <button class="wizard-header__btn" aria-label="Close">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">close</span>
            </button>
            <div class="wizard-header__title">APHESIS</div>
            <button class="wizard-header__save" aria-label="Save">SAVE</button>
          </header>

          <!-- Progress Bar -->
          <div class="wizard-progress" id="progress-bar">
            <div class="wizard-progress__fill progress-bar-active" id="progress-fill" style="width: 80%"></div>
          </div>
          <div class="wizard-step-indicator" id="step-indicator" style="top: calc(var(--header-height) + var(--progress-height) + var(--spacing-unit)); right: var(--spacing-margin-mobile);">
            04 / 05
          </div>

          <div class="max-w-[1200px] mx-auto px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] py-[var(--spacing-stack-lg)]">
            <div class="flex items-baseline justify-between mb-[var(--spacing-stack-md)]">
              <h2 class="wizard-content__title">Accessories</h2>
              <span class="font-mono text-[var(--font-size-label-caps)] leading-[var(--line-height-label-caps)] font-semibold letter-spacing-[var(--letter-spacing-label-caps)] text-primary uppercase">STEP 04/05</span>
            </div>
            <div class="wizard-content__divider speed-line mb-[var(--spacing-stack-lg)]"></div>

            <!-- Bento Grid / Multi-Select Cards -->
            <div class="accessories-grid" id="accessories-grid">
              ${accessories.map(accessory => `
                <button class="accessory-card ${accessory.selected ? 'selected' : ''}" 
                        data-id="${accessory.id}"
                        data-price="${accessory.price}"
                        data-tier="${accessory.tier}">
                  <div class="accessory-card__overlay"></div>
                  <div class="accessory-card__tier-badge ${tierBadgeClass[accessory.tier]}">${accessory.tierLabel}</div>
                  <div class="accessory-card__image-wrapper">
                    <img class="accessory-card__image" 
                         src="${accessory.image}" 
                         alt="${accessory.name}">
                  </div>
                  <div class="accessory-card__content">
                    <div class="accessory-card__info">
                      <span class="accessory-card__name">${accessory.name}</span>
                      <span class="accessory-card__material">${accessory.material}</span>
                    </div>
                    <div class="accessory-card__price">$${accessory.price}</div>
                  </div>
                  ${accessory.selected ? `
                    <div class="accessory-card__check">
                      <span class="material-symbols-outlined">check</span>
                    </div>
                  ` : ''}
                </button>
              `).join('')}
            </div>
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <button class="wizard-footer__next" id="btn-next">Review Order</button>
        </footer>
      </div>
    `;
  }

  bindAccessoriesEvents() {
    const accessoryCards = document.querySelectorAll('.accessory-card');
    const nextBtn = document.getElementById('btn-next');
    const runningTotal = document.getElementById('running-total');
    const progressFill = document.getElementById('progress-fill');

    // Update progress bar to 80% for step 4
    if (progressFill) {
      progressFill.style.width = '80%';
    }

    // Update step indicator
    const stepIndicator = document.getElementById('step-indicator');
    if (stepIndicator) {
      stepIndicator.textContent = '04 / 05';
    }

    // Calculate base price (jersey + bottoms)
    const jerseyTiers = { standard: 830, elite: 950, premier: 1280 };
    const bottomsTiers = { standard: 700, elite: 870, premier: 1400 };
    const basePrice = (jerseyTiers[this.data.jersey.tier] || 1280) + (bottomsTiers[this.data.bottoms.tier] || 870);

    const toggleAccessory = (card) => {
      const accessoryId = card.dataset.id;
      const price = parseInt(card.dataset.price);
      const isSelected = card.classList.contains('selected');

      if (isSelected) {
        card.classList.remove('selected');
        // Remove check indicator
        const check = card.querySelector('.accessory-card__check');
        if (check) check.remove();
        // Update data
        this.data.accessories.items = this.data.accessories.items.filter(id => id !== accessoryId);
      } else {
        card.classList.add('selected');
        // Add check indicator
        const checkHtml = `
          <div class="accessory-card__check">
            <span class="material-symbols-outlined">check</span>
          </div>
        `;
        card.insertAdjacentHTML('beforeend', checkHtml);
        // Update data
        this.data.accessories.items.push(accessoryId);
      }

      // Recalculate total
      const accessoriesPrice = Array.from(document.querySelectorAll('.accessory-card.selected'))
        .reduce((sum, c) => sum + parseInt(c.dataset.price), 0);
      const totalPrice = basePrice + accessoriesPrice;
      if (runningTotal) {
        runningTotal.textContent = `$${totalPrice.toLocaleString()}`;
      }
    };

    accessoryCards.forEach(card => {
      card.addEventListener('click', () => toggleAccessory(card));
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
    // Build summary data based on current selections
    const jerseyTiers = {
      standard: { name: 'Standard Jersey', price: 830, badge: 'STD' },
      elite: { name: 'Elite Jersey', price: 950, badge: 'ELT' },
      premier: { name: 'Aero-Kinetic Jersey', price: 1280, badge: 'PRM' }
    };
    const bottomsTiers = {
      standard: { name: 'Core Endurance', price: 700, badge: 'STD' },
      elite: { name: 'Compression Bib Shorts', price: 870, badge: 'ELT' },
      premier: { name: 'Kinetic Apex', price: 1400, badge: 'PRM' }
    };

    const jersey = jerseyTiers[this.data.jersey.tier] || jerseyTiers.premier;
    const bottoms = bottomsTiers[this.data.bottoms.tier] || bottomsTiers.elite;

    const accessories = {
      gloves: {
        id: 'gloves', name: 'Sprint Gloves', material: 'Carbon Fiber', price: 275,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCboeZpECvydaij-FZzZ2r3pKjKvL0qoUbK9yWk8iubdhABYpzE6gpRNXgj-dwLCXCnApz4idQkObgHQJYklSllJjpIJeq8Ty0Iv8470RcC4nyFrV0yGBTbCOHzHg8V81XVIQ7FeWErj4z_JN3oPPVl7Xr6BIY9hbJd0w9jmlrVK6YZOyw4WZbl9WtedOy1v9egP3lJnb2-vt17zCgqknL718f5ISNKv3jfu18EAvClUpiGBzNn_-8R'
      },
      buff: {
        id: 'buff', name: 'THERMAL BUFF', material: 'Merino Blend', price: 190,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTQdEQEziauuCtFqHR709m9DTSb2R8BhNh7fsABAxleuvJx9oMLWX95XFE3oY4neyCFVHhiMQ_3twzgXLJIRQnE5hvgW6fVUABG9j7z4S4Mbp4jUwJxr4CaIY7XhF2b6Ywpcu325_QgPFCs_3EuLqkun--2mREN4SiLOrF_gZTctfIo-tUughmCvAZR-IF-jUb_998dUd6lS6dlbNMAv-xE672W9WEVA2uICTp6eDT0bzoSE-Y4Tcy'
      },
      socks: {
        id: 'socks', name: 'Aero Socks', material: 'Classic White', price: 45,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCow_LaPvB4HeOEnUw8ssM7MfUS-Wd_A6jS4o2uV_g5ezox70gn38DADmMp2ojrqCcN4yMS_ExZY-GwniKBzu0LigrSVgl5uW3yVheYoTxzGn22Wn0qmC6wQLNOOVaf-cUkZbbEJc2bNh-4Wbz9746-iIw6MxXq_WWH2LeS5DDSByWEBdglzM1uR1lfyEjbQusEzlU9WNZVHpMnKnbAx42f9TuLTxJD0xwYMlUT8QSNLWSeOgOGqh2q'
      }
    };

    const selectedAccessories = this.data.accessories.items;
    const accessoryItems = selectedAccessories.map(id => accessories[id]).filter(Boolean);

    const jerseyImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO3-08vbbm1ezRz6LhDn3q_s8IsdZA95ILlOEHVl6lXed_sxoROdXRYHP0WLbh0O1QlOl7eWUPrrUjlOljSmRY5ufcauyzSG4GxktAyB2iSqK_o9Fm_fgi6ULHworCdXAVB2WlJAWyioo57ekUtMPC65doeHzW9DqWOj9pP8acnL92WF9WYOvWhM08YLDiWczPCdLYpy_5hekqKEf_AbpGy_mdBAAwMCui2mb7GEnFprynyUGQSqRt';
    const bottomsImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr3G9GaSqjZM4VRcDWpesiKjbba0kh44dd-ozm3Ef3bj7qFWWRxOuJujQRkjNl5Iuj3KdVMFFjsqPdNbCF-0yc8WYdikx1lVNuzbD5Z6xl4p8KyAOok-ocCwehDeo3B0hCUE_y9yo5eTLihOMz0sxHU9JdZCwpatGsCAiE3is20VOr3nTRlH3p-PKSpDYaqMJfYGHB6o7YeH8nCNqCQDU4UdxUt2iEIpRUyqhUnjStNlIpA9TEHnKb';

    // Calculate totals
    const subtotal = jersey.price + bottoms.price + accessoryItems.reduce((sum, a) => sum + a.price, 0);

    return `
      <div class="wizard-app">
        <!-- Mobile Top App Bar -->
        <header class="wizard-header wizard-header--summary md:hidden">
          <button class="wizard-header__btn" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="wizard-header__title">APHESIS</div>
          <button class="wizard-header__save" aria-label="Save">SAVE</button>
        </header>

        <!-- Progress Indicator -->
        <div class="wizard-progress wizard-progress--complete" id="progress-bar">
          <div class="wizard-progress__fill" id="progress-fill" style="width: 100%"></div>
        </div>

        <!-- Main Content Canvas -->
        <main class="wizard-main summary-main">
          <div class="summary-header">
            <button class="summary-header__back" id="btn-back" aria-label="Go back to kit configuration">
              <span class="material-symbols-outlined summary-header__back-icon">arrow_back</span>
              <span class="summary-header__back-label">Back to Kit</span>
            </button>
            <h2 class="summary-header__title">05. Summary</h2>
            <div class="summary-header__divider"></div>
            <p class="summary-header__description">Finalize your kinetic precision configuration. Review your selections below before proceeding to checkout.</p>
          </div>

          <div class="summary-grid">
            <!-- Left Column: Order Breakdown Bento Grid -->
            <div class="summary-grid__left">
              <div class="bento-grid">
                <!-- Bento Item: Jersey -->
                <div class="bento-card bento-card--premier">
                  <div class="bento-card__layout">
                    <div class="bento-card__image-wrapper">
                      <img class="bento-card__image" src="${jerseyImageUrl}" alt="Aero Ethics Jersey">
                      <div class="bento-card__tier-badge bento-card__tier-badge--premier">PRM</div>
                    </div>
                    <div class="bento-card__content">
                      <div class="bento-card__header">
                        <h3 class="bento-card__title">Aero-Kinetic Jersey</h3>
                        <span class="bento-card__price">$${jersey.price}</span>
                      </div>
                      <p class="bento-card__details">Men's / Size M / Obsidian Black</p>
                      <div class="bento-card__tags">
                        <span class="bento-card__tag">Ultra-weave Textile</span>
                        <span class="bento-card__tag">Aero Fit</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bento Item: Bottoms -->
                <div class="bento-card bento-card--elite">
                  <div class="bento-card__layout">
                    <div class="bento-card__image-wrapper">
                      <img class="bento-card__image" src="${bottomsImageUrl}"  alt="KOMPression"/>
                      <div class="bento-card__tier-badge bento-card__tier-badge--elite">ELT</div>
                    </div>
                    <div class="bento-card__content">
                      <div class="bento-card__header">
                        <h3 class="bento-card__title">Compression Bib Shorts</h3>
                        <span class="bento-card__price">$${bottoms.price}</span>
                      </div>
                      <p class="bento-card__details">Men's / Size M / Stealth Carbon</p>
                      <div class="bento-card__tags">
                        <span class="bento-card__tag">Endurance Chamois</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bento Item: Accessories -->
                <div class="accessories-mini-grid">
                  ${accessoryItems.map(acc => `
                    <div class="accessory-mini-card">
                      <div class="accessory-mini-card__image-wrapper">
                        <div class="accessory-mini-card__tier-badge accessory-mini-card__tier-badge--standard">STD</div>
                      </div>
                      <div class="accessory-mini-card__content">
                        <div class="accessory-mini-card__header">
                          <h4 class="accessory-mini-card__name">${acc.name}</h4>
                          <span class="accessory-mini-card__price">$${acc.price}</span>
                        </div>
                        <p class="accessory-mini-card__details">Size M / Black</p>
                      </div>
                    </div>
                  `).join('')}
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
                    <span class="checkout-row__value">$${subtotal.toFixed(2)}</span>
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
                    <span class="checkout-card__total-amount">$${subtotal.toFixed(2)}</span>
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
      </div>
    `;
  }

  bindSummaryEvents() {
    const completeBtn = document.getElementById('btn-complete-order');
    const promoBtn = document.querySelector('.promo-input__btn');
    const promoInput = document.querySelector('.promo-input');

    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        // Placeholder for order completion
        alert('Order completed! Thank you for your purchase.');
      });
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