(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="/webWizard/assets/men-Ch-EID3a.png",f="/webWizard/assets/women-BIwaP19_.png";class S{constructor(){this.currentStep=1,this.totalSteps=5,this.data={gender:null,jersey:{tier:"premier",textile:null,size:null},bottoms:{tier:"elite",type:"bib",size:null},accessories:{items:[]}}}init(){this.renderStep(this.currentStep),this.bindEvents()}renderStep(i){const a=document.getElementById("app");switch(i){case 1:a.innerHTML=this.renderGenderStep(),this.bindGenderEvents();break;case 2:a.innerHTML=this.renderJerseyStep(),this.bindJerseyEvents();break;case 3:a.innerHTML=this.renderBottomsStep(),this.bindBottomsEvents();break;case 4:a.innerHTML=this.renderAccessoriesStep(),this.bindAccessoriesEvents();break;case 5:a.innerHTML=this.renderSummaryStep(),this.bindSummaryEvents();break;default:a.innerHTML='<div class="wizard-content">Step not implemented</div>'}this.updateProgress(i)}renderGenderStep(){return`
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
                     src="${y}" 
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
                     src="${f}" 
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
    `}bindEvents(){}bindGenderEvents(){const i=document.getElementById("btn-mens"),a=document.getElementById("btn-womens"),r=document.getElementById("btn-next"),e=t=>{this.data.gender=t,t==="mens"?(i.classList.add("active"),a.classList.remove("active")):(a.classList.add("active"),i.classList.remove("active")),r.disabled=!1};i.addEventListener("click",()=>e("mens")),a.addEventListener("click",()=>e("womens")),r.addEventListener("click",()=>{r.disabled||this.nextStep()})}updateProgress(i){const a=document.getElementById("progress-fill"),r=document.getElementById("step-indicator");if(a){const e=i/this.totalSteps*100;a.style.width=`${e}%`}r&&(r.textContent=`${String(i).padStart(2,"0")} / ${String(this.totalSteps).padStart(2,"0")}`)}nextStep(){this.currentStep<this.totalSteps&&(this.currentStep++,this.renderStep(this.currentStep))}prevStep(){this.currentStep>1&&(this.currentStep--,this.renderStep(this.currentStep))}renderJerseyStep(){var r;const i=[{id:"standard",name:"Standard Jersey",price:830,badge:"STD",description:"Foundation level performance with adaptable thermal regulation.",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuApPn1f9tzNX_tbyoWYFbiJ-cUZiO_aVdDmWyBJBCGO--SzV9gnS307eSuYg1TRZdDJG9PYaZxFqGhEdmLxYtU-pOnYO5tIgblfL31WMTK3GQ1ldXZK432sFQH5Gwyq-A9wBtX6DWO931aLBSrOipYBLI-QK40PUZN_qanPFP9-nuqgG1osZo0DycPhQT__WvBXRbL8lNSF1miAU-odYXDIlK_bK3JCM7VaJtlIEsB4pmcem9l6GTGR",hasTextile:!0,sizes:["XS","S","M","L","XL","XXL"]},{id:"elite",name:"Elite Jersey",price:950,badge:"ELT",description:"Aerodynamic ribbed construction with laser-cut precision fit for competitive racing.",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuAkB5AJVgy4eZxRkZQUiwsrxuIEAPHyOjFrD0CdNF29vKdLQfRiY1qEGUM-np_wC7RHB9h5nynYiWz5rd0DKhPLRX6i2YPPPlQofZ9oi3ld1QtTiioyaA_QhwykTd7yqYYx0JO0D7hNY_K-9-G295-LigV1y2lLjBU7ypOPz6PRm27Yoa7f0sG6OdPUz9c2GajYcMeyn_YbSuUy8-tlrDmX06Z8wl9poiulCed1rNWg4dyl9vIJLoNt",hasTextile:!1,sizes:["XS","S","M","L","XL","XXL"]},{id:"premier",name:"Premier Jersey",price:1280,badge:"PRM",description:"The pinnacle of kinetic engineering. Ultra-lightweight matrix fabric woven with microscopic drag-reduction channels.",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCMfXxuGIhgK2iV2t8MECRm6gGezMpZBj6N2YJDSZ_lT49dUFrroQGN4knWbkDWfgSwTDB5yBRdBzUgvE5pLvsGrI9LZchJJTOFDCH_fQXxk36MZ-RMFW8qQWpAqPJYi0nxrbp5sWyQvgSQNvimQWjUYp7te8VkzngrYcCp-D7WVjtw78yAlUH3bu88hFhKHnv1rCMecxV4hKT7gCIxMAZ5seY8nJmdSkRrUDUWt5sPcNPQUD08pWhu",hasTextile:!1,sizes:["XS","S","M","L","XL","XXL"]}],a=this.data.jersey.tier;return(r=i.find(e=>e.id===a))!=null&&r.price,`
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
            ${i.map(e=>`
              <button class="product-card ${e.id===a?"active":""}" 
                      data-tier="${e.id}" 
                      data-price="${e.price}">
                <img class="product-card__image" 
                     src="${e.image}" 
                     alt="${e.name}">
                <div class="product-card__content">
                  <div class="product-card__header">
                    <span class="product-card__price">$${e.price.toLocaleString()}</span>
                    <span class="product-card__tier-badge">${e.badge}</span>
                  </div>
                  <h3 class="product-card__title">${e.name}</h3>
                  <p class="product-card__description">${e.description}</p>
                  
                  ${e.hasTextile?`
                    <div class="product-card__section">
                      <span class="product-card__section-label">TEXTILE MATRIX</span>
                      <div class="radio-group">
                        <label class="radio-option">
                          <input type="radio" name="textile-${e.id}" value="3dx" ${this.data.jersey.textile==="3dx"?"checked":""} disabled>
                          <span class="radio-option__indicator"></span>
                          <span class="radio-option__label">3DX</span>
                        </label>
                        <label class="radio-option">
                          <input type="radio" name="textile-${e.id}" value="redmesh" ${this.data.jersey.textile==="redmesh"?"checked":""} disabled>
                          <span class="radio-option__indicator"></span>
                          <span class="radio-option__label">Redmesh</span>
                        </label>
                      </div>
                    </div>
                  `:""}

                  <div class="product-card__section">
                    <span class="product-card__section-label">Select Size</span>
                    <div class="size-group">
                      ${e.sizes.map(t=>`
                        <label class="size-option">
                          <input type="radio" name="size-${e.id}" value="${t}" ${this.data.jersey.size===t&&e.id===a?"checked":""} ${e.id!==a?"disabled":""}>
                          <span class="size-option__label">${t}</span>
                        </label>
                      `).join("")}
                    </div>
                  </div>
                </div>
              </button>
            `).join("")}
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <button class="wizard-footer__next" id="btn-next">Next</button>
        </footer>
      </div>
    `}bindJerseyEvents(){const i=document.querySelectorAll(".product-card"),a=document.getElementById("btn-next"),r=document.getElementById("running-total"),e=c=>{const s=c.dataset.tier,d=parseInt(c.dataset.price);i.forEach(l=>{l.classList.remove("active"),l.querySelectorAll('input[name^="size-"]').forEach(m=>{m.disabled=!0,m.checked=!1}),l.querySelectorAll(".size-option__label").forEach(m=>{m.style.backgroundColor="",m.style.color="",m.style.borderColor=""})}),c.classList.add("active"),c.querySelectorAll('input[name^="size-"]').forEach(l=>{l.disabled=!1}),this.data.jersey.tier=s,this.data.jersey.size=null,r&&(r.textContent=`$${d.toLocaleString()}`)};i.forEach(c=>{c.addEventListener("click",s=>{s.target.tagName==="INPUT"||s.target.tagName==="LABEL"||s.target.closest(".radio-option")||s.target.closest(".size-option")||e(c)})}),document.querySelectorAll(".size-option input").forEach(c=>{c.addEventListener("change",s=>{s.target.checked&&(this.data.jersey.size=s.target.value)})}),document.querySelectorAll(".radio-option input").forEach(c=>{c.addEventListener("change",s=>{s.target.checked&&(this.data.jersey.textile=s.target.value)})}),a.addEventListener("click",()=>{this.nextStep()});const t=document.getElementById("btn-back");t&&t.addEventListener("click",()=>{this.prevStep()})}renderBottomsStep(){const i=[{id:"standard",name:"Core Endurance",price:700,badge:"STD",tierLabel:"STANDARD",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBpzbaerwP19Xx_sLBN2A3CB1PMkqZcadNSmoLBhVkjEFumo8kg7Q4w16Glndng-G0Rbp_HNKxfWLgZU4QnMJH-lsBrsJNuYVo1P2Y7BiQItpjsQLcqwUcjRm2MHhnXpTXQzyyk8BjKS4-N2G4SRIYodUsjJO1Pf29GRm90VicXnYpT42R_nHEirg30TR12u3w0jaU6UE0sN69u2VrlHD0QSAsKJ4hE3n94gydXQ-XiMjMv_gOGekrU",types:["shorts","bib","mallas"],sizes:["XS","S","M","L","XL","XXL"],tierClass:"bottoms-card--standard"},{id:"elite",name:"Aero Precision",price:870,badge:"ELT",tierLabel:"ELITE",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuDBvDVdtg7LGNhbz8GKhcis010_Uqr713pgkO1_MiC3GDpi76glDEl6xdM1zyxTPrP3-YFfsEfE5MS4EjYc0KOSs9wSqQZ_tEEYYtgK15CsvZLTshKR2uW0JWFrD0YYg83iZpGvHCEa68u6uS_0aghibEDvDe38D_TD2KFHNVn7qa3NR25_hIfdXgRqymuyAjf00YfPjwWQpfApt4vupUf39uBy27SRBcFLqyvqs-7kdhxG1DLeLxg9",types:["shorts","bib","mallas"],sizes:["XS","S","M","L","XL","XXL"],tierClass:"bottoms-card--elite"},{id:"premier",name:"Kinetic Apex",price:1400,badge:"PRM",tierLabel:"PREMIER",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuAVFUI3mHFrlWBNFEvqtjW5rxbIduHHUrN2ERVU1JmLqUuIR2va6MKj_5MSik3j7p1cE5wjHqPocyePW8Ua51MFP4GIwvxC6tYzqTTMgpASlCyzlYwmlLEbII4Bhy0Oig5RCZu90fjN9F4H29O6nkLfaMPnucritQzx91ZoKWvSwYh9QQs_-M0HNKVtPwprHnsmAAQCASDkMaoJCVTqh5NGMs7wlM11f7CamIP6A0-Me2wNDdG6ayVB",types:["shorts","bib","mallas"],sizes:["XS","S","M","L","XL","XXL"],tierClass:"bottoms-card--premier",disabledTypes:["shorts"]}],a=this.data.bottoms.tier,r=this.data.bottoms.type,e=this.data.bottoms.size;({standard:830,elite:950,premier:1280})[this.data.jersey.tier];const c=i.find(s=>s.id===a);return c!=null&&c.price,`
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

        <main class="wizard-main">
          <h1 class="wizard-content__title" style="color: var(--color-primary); margin-bottom: var(--spacing-stack-md);">Select Bottoms</h1>
          <div class="wizard-content__divider speed-line speed-line-wide"></div>

          <div class="product-grid" id="bottoms-grid">
            ${i.map(s=>`
              <button class="bottoms-card ${s.tierClass} ${s.id===a?"active":""}" 
                      data-tier="${s.id}" 
                      data-price="${s.price}">
                <div class="bottoms-card__tier-badge">${s.badge}</div>
                <img class="bottoms-card__image" 
                     src="${s.image}" 
                     alt="${s.name}">
                <div class="bottoms-card__price-row">
                  <span class="bottoms-card__price">$${s.price}+</span>
                  <span class="bottoms-card__tier-label">${s.tierLabel}</span>
                </div>
                <h3 class="bottoms-card__title">${s.name}</h3>
                <select class="bottoms-card__size-select" data-tier="${s.id}" ${s.id!==a?"disabled":""}>
                  <option value="">SELECT SIZE</option>
                  ${s.sizes.map(d=>`
                    <option value="${d}" ${d===e&&s.id===a?"selected":""}>${d}</option>
                  `).join("")}
                </select>
                <div class="bottoms-card__type-group">
                  ${s.types.map(d=>{var n;return`
                    <label class="bottoms-card__type-option">
                      <input type="radio" name="type-${s.id}" value="${d}" 
                             ${d===r&&s.id===a?"checked":""} 
                             ${s.id!==a?"disabled":""}
                             ${(n=s.disabledTypes)!=null&&n.includes(d)?"disabled":""}>
                      <span class="bottoms-card__type-label">${d.toUpperCase()}</span>
                    </label>
                  `}).join("")}
                </div>
              </button>
            `).join("")}
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <button class="wizard-footer__next" id="btn-next">Next</button>
        </footer>
      </div>
    `}bindBottomsEvents(){const i=document.querySelectorAll(".bottoms-card"),a=document.getElementById("btn-next"),r=document.getElementById("running-total"),e=document.getElementById("progress-fill");e&&(e.style.width="60%");const t={standard:830,elite:950,premier:1280},c=d=>{const n=d.dataset.tier,l=parseInt(d.dataset.price);i.forEach(u=>{u.classList.remove("active");const p=u.querySelector(".bottoms-card__size-select");p&&(p.disabled=!0,p.value=""),u.querySelectorAll('input[name^="type-"]').forEach(g=>{g.disabled=!0,g.checked=!1})}),d.classList.add("active");const o=d.querySelector(".bottoms-card__size-select");o&&(o.disabled=!1),d.querySelectorAll('input[name^="type-"]').forEach(u=>{u.disabled=!1}),this.data.bottoms.tier=n,this.data.bottoms.type=null,this.data.bottoms.size=null;const _=(t[this.data.jersey.tier]||1280)+l;r&&(r.textContent=`$${_.toLocaleString()}`)};i.forEach(d=>{d.addEventListener("click",n=>{n.target.tagName==="SELECT"||n.target.tagName==="OPTION"||n.target.tagName==="INPUT"||n.target.tagName==="LABEL"||n.target.closest(".bottoms-card__type-option")||n.target.closest(".bottoms-card__size-select")||c(d)})}),document.querySelectorAll(".bottoms-card__size-select").forEach(d=>{d.addEventListener("change",n=>{n.target.value&&(this.data.bottoms.size=n.target.value)})}),document.querySelectorAll(".bottoms-card__type-option input").forEach(d=>{d.addEventListener("change",n=>{n.target.checked&&(this.data.bottoms.type=n.target.value)})}),a.addEventListener("click",()=>{this.nextStep()});const s=document.getElementById("btn-back");s&&s.addEventListener("click",()=>{this.prevStep()})}renderAccessoriesStep(){const i=[{id:"gloves",name:"AERO PRO GLOVES",material:"Carbon Fiber",price:275,tier:"premier",tierLabel:"PRM",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCiPyu6Y2ljW4ri2KB4FNRQelszb6gD7mIYmNs4n2qGiLZ6cI6_6R_DTLXsKrkgvg1lufXQjJ8guW6ZgADeXuAt669M5axf21Fnqb0LZi43bmpVpPS_42pdVOcvb1clR_bWNfIRCUjjxkokcbCa4PWD_xPBCGPwT4PgQXr54allqiQ-WvCMz7scvJhvrLcrF85-WeiN5cYIBxcmKN02_Iur6xv-k-r0CKcVrOBt3u6hSBb3cp6e5qJk",selected:!0},{id:"buff",name:"THERMAL BUFF",material:"Merino Blend",price:190,tier:"elite",tierLabel:"ELT",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBTQdEQEziauuCtFqHR709m9DTSb2R8BhNh7fsABAxleuvJx9oMLWX95XFE3oY4neyCFVHhiMQ_3twzgXLJIRQnE5hvgW6fVUABG9j7z4S4Mbp4jUwJxr4CaIY7XhF2b6Ywpcu325_QgPFCs_3EuLqkun--2mREN4SiLOrF_gZTctfIo-tUughmCvAZR-IF-jUb_998dUd6lS6dlbNMAv-xE672W9WEVA2uICTp6eDT0bzoSE-Y4Tcy",selected:!0},{id:"socks",name:"COMPRESSION SOCKS",material:"Classic White",price:45,tier:"standard",tierLabel:"STD",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBlHmKSDyc4Tr_4xXICyFXDn0crqF-5UZ4HXYqU6s_u5VHbvJIPfu6fYLBcZL467IMzvWK5kxXPH1sUT7R_tRtWpEq2U9OqO5G5Y57KNlGmiLur65dzSwOUNzMzzpNe2dH4YsznDwb2f9id-VefqeDKbaI4zYAbC5AUww1Sm0hfMYDC-ED3uF7ZBw6yhmeqefR-8dL7O0YJxzcFTMAy02Bl66vxlZwQ0iOLHg7ZRXbd-WCLhhQptTbk",selected:!1}],a={standard:830,elite:950,premier:1280},r={standard:700,elite:870,premier:1400};a[this.data.jersey.tier],r[this.data.bottoms.tier],i.filter(t=>t.selected).reduce((t,c)=>t+c.price,0);const e={premier:"accessory-card__tier-badge--premier",elite:"accessory-card__tier-badge--elite",standard:"accessory-card__tier-badge--standard"};return`
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
          <div class="max-w-[1200px] mx-auto px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] py-[var(--spacing-stack-lg)]">
            <div class="flex items-baseline justify-between mb-[var(--spacing-stack-md)]">
              <h2 class="wizard-content__title">Accessories</h2>
              <span class="font-mono text-[var(--font-size-label-caps)] leading-[var(--line-height-label-caps)] font-semibold letter-spacing-[var(--letter-spacing-label-caps)] text-primary uppercase">STEP 04/05</span>
            </div>
            <div class="wizard-content__divider speed-line mb-[var(--spacing-stack-lg)]"></div>

            <!-- Bento Grid / Multi-Select Cards -->
            <div class="accessories-grid" id="accessories-grid">
              ${i.map(t=>`
                <button class="accessory-card ${t.selected?"selected":""}" 
                        data-id="${t.id}"
                        data-price="${t.price}"
                        data-tier="${t.tier}">
                  <div class="accessory-card__overlay"></div>
                  <div class="accessory-card__tier-badge ${e[t.tier]}">${t.tierLabel}</div>
                  <div class="accessory-card__image-wrapper">
                    <img class="accessory-card__image" 
                         src="${t.image}" 
                         alt="${t.name}">
                  </div>
                  <div class="accessory-card__content">
                    <div class="accessory-card__info">
                      <span class="accessory-card__name">${t.name}</span>
                      <span class="accessory-card__material">${t.material}</span>
                    </div>
                    <div class="accessory-card__price">$${t.price}</div>
                  </div>
                  ${t.selected?`
                    <div class="accessory-card__check">
                      <span class="material-symbols-outlined">check</span>
                    </div>
                  `:""}
                </button>
              `).join("")}
            </div>
          </div>
        </main>

        <!-- Bottom Action Bar -->
        <footer class="wizard-footer">
          <button class="wizard-footer__cancel" id="btn-back">BACK</button>
          <button class="wizard-footer__next" id="btn-next">Review Order</button>
        </footer>
      </div>
    `}bindAccessoriesEvents(){const i=document.querySelectorAll(".accessory-card"),a=document.getElementById("btn-next"),r=document.getElementById("running-total"),e=document.getElementById("progress-fill");e&&(e.style.width="80%");const t=document.getElementById("step-indicator");t&&(t.textContent="04 / 05");const c={standard:830,elite:950,premier:1280},s={standard:700,elite:870,premier:1400},d=(c[this.data.jersey.tier]||1280)+(s[this.data.bottoms.tier]||870),n=o=>{const b=o.dataset.id;if(parseInt(o.dataset.price),o.classList.contains("selected")){o.classList.remove("selected");const p=o.querySelector(".accessory-card__check");p&&p.remove(),this.data.accessories.items=this.data.accessories.items.filter(v=>v!==b)}else o.classList.add("selected"),o.insertAdjacentHTML("beforeend",`
          <div class="accessory-card__check">
            <span class="material-symbols-outlined">check</span>
          </div>
        `),this.data.accessories.items.push(b);const _=Array.from(document.querySelectorAll(".accessory-card.selected")).reduce((p,v)=>p+parseInt(v.dataset.price),0),u=d+_;r&&(r.textContent=`$${u.toLocaleString()}`)};i.forEach(o=>{o.addEventListener("click",()=>n(o))}),a.addEventListener("click",()=>{this.nextStep()});const l=document.getElementById("btn-back");l&&l.addEventListener("click",()=>{this.prevStep()})}renderSummaryStep(){const i={standard:{name:"Standard Jersey",price:830,badge:"STD"},elite:{name:"Elite Jersey",price:950,badge:"ELT"},premier:{name:"Aero-Kinetic Jersey",price:1280,badge:"PRM"}},a={standard:{name:"Core Endurance",price:700,badge:"STD"},elite:{name:"Compression Bib Shorts",price:870,badge:"ELT"},premier:{name:"Kinetic Apex",price:1400,badge:"PRM"}},r=i[this.data.jersey.tier]||i.premier,e=a[this.data.bottoms.tier]||a.elite,t={gloves:{id:"gloves",name:"Sprint Gloves",material:"Carbon Fiber",price:275,image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCboeZpECvydaij-FZzZ2r3pKjKvL0qoUbK9yWk8iubdhABYpzE6gpRNXgj-dwLCXCnApz4idQkObgHQJYklSllJjpIJeq8Ty0Iv8470RcC4nyFrV0yGBTbCOHzHg8V81XVIQ7FeWErj4z_JN3oPPVl7Xr6BIY9hbJd0w9jmlrVK6YZOyw4WZbl9WtedOy1v9egP3lJnb2-vt17zCgqknL718f5ISNKv3jfu18EAvClUpiGBzNn_-8R"},buff:{id:"buff",name:"THERMAL BUFF",material:"Merino Blend",price:190,image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBTQdEQEziauuCtFqHR709m9DTSb2R8BhNh7fsABAxleuvJx9oMLWX95XFE3oY4neyCFVHhiMQ_3twzgXLJIRQnE5hvgW6fVUABG9j7z4S4Mbp4jUwJxr4CaIY7XhF2b6Ywpcu325_QgPFCs_3EuLqkun--2mREN4SiLOrF_gZTctfIo-tUughmCvAZR-IF-jUb_998dUd6lS6dlbNMAv-xE672W9WEVA2uICTp6eDT0bzoSE-Y4Tcy"},socks:{id:"socks",name:"Aero Socks",material:"Classic White",price:45,image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCow_LaPvB4HeOEnUw8ssM7MfUS-Wd_A6jS4o2uV_g5ezox70gn38DADmMp2ojrqCcN4yMS_ExZY-GwniKBzu0LigrSVgl5uW3yVheYoTxzGn22Wn0qmC6wQLNOOVaf-cUkZbbEJc2bNh-4Wbz9746-iIw6MxXq_WWH2LeS5DDSByWEBdglzM1uR1lfyEjbQusEzlU9WNZVHpMnKnbAx42f9TuLTxJD0xwYMlUT8QSNLWSeOgOGqh2q"}},s=this.data.accessories.items.map(o=>t[o]).filter(Boolean),d="https://lh3.googleusercontent.com/aida-public/AB6AXuAO3-08vbbm1ezRz6LhDn3q_s8IsdZA95ILlOEHVl6lXed_sxoROdXRYHP0WLbh0O1QlOl7eWUPrrUjlOljSmRY5ufcauyzSG4GxktAyB2iSqK_o9Fm_fgi6ULHworCdXAVB2WlJAWyioo57ekUtMPC65doeHzW9DqWOj9pP8acnL92WF9WYOvWhM08YLDiWczPCdLYpy_5hekqKEf_AbpGy_mdBAAwMCui2mb7GEnFprynyUGQSqRt",n="https://lh3.googleusercontent.com/aida-public/AB6AXuBr3G9GaSqjZM4VRcDWpesiKjbba0kh44dd-ozm3Ef3bj7qFWWRxOuJujQRkjNl5Iuj3KdVMFFjsqPdNbCF-0yc8WYdikx1lVNuzbD5Z6xl4p8KyAOok-ocCwehDeo3B0hCUE_y9yo5eTLihOMz0sxHU9JdZCwpatGsCAiE3is20VOr3nTRlH3p-PKSpDYaqMJfYGHB6o7YeH8nCNqCQDU4UdxUt2iEIpRUyqhUnjStNlIpA9TEHnKb",l=r.price+e.price+s.reduce((o,b)=>o+b.price,0);return`
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
                      <img class="bento-card__image" src="${d}" alt="Aero Ethics Jersey">
                      <div class="bento-card__tier-badge bento-card__tier-badge--premier">PRM</div>
                    </div>
                    <div class="bento-card__content">
                      <div class="bento-card__header">
                        <h3 class="bento-card__title">Aero-Kinetic Jersey</h3>
                        <span class="bento-card__price">$${r.price}</span>
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
                      <img class="bento-card__image" src="${n}"  alt="KOMPression"/>
                      <div class="bento-card__tier-badge bento-card__tier-badge--elite">ELT</div>
                    </div>
                    <div class="bento-card__content">
                      <div class="bento-card__header">
                        <h3 class="bento-card__title">Compression Bib Shorts</h3>
                        <span class="bento-card__price">$${e.price}</span>
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
                  ${s.map(o=>`
                    <div class="accessory-mini-card">
                      <div class="accessory-mini-card__image-wrapper">
                        <div class="accessory-mini-card__tier-badge accessory-mini-card__tier-badge--standard">STD</div>
                      </div>
                      <div class="accessory-mini-card__content">
                        <div class="accessory-mini-card__header">
                          <h4 class="accessory-mini-card__name">${o.name}</h4>
                          <span class="accessory-mini-card__price">$${o.price}</span>
                        </div>
                        <p class="accessory-mini-card__details">Size M / Black</p>
                      </div>
                    </div>
                  `).join("")}
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
                    <span class="checkout-row__value">$${l.toFixed(2)}</span>
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
                    <span class="checkout-card__total-amount">$${l.toFixed(2)}</span>
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
    `}bindSummaryEvents(){const i=document.getElementById("btn-complete-order"),a=document.getElementById("btn-complete-order-footer"),r=document.querySelector(".promo-input__btn"),e=document.querySelector(".promo-input"),t=()=>{alert("Order completed! Thank you for your purchase.")};i&&i.addEventListener("click",t),a&&a.addEventListener("click",t),r&&e&&r.addEventListener("click",()=>{const s=e.value.trim().toUpperCase();s&&alert(`Promo code "${s}" applied!`)});const c=document.getElementById("btn-back");c&&c.addEventListener("click",()=>{this.prevStep()})}}const E=new S;E.init();
