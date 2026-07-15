// Class to handle isolated scrolling sequences for any canvas and folder
class ScrollSequence {
  constructor(canvasId, folder, startFrame, frameCount, containerId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.context = this.canvas.getContext('2d');
    this.container = document.getElementById(containerId);
    this.folder = folder;
    this.startFrame = startFrame;
    this.frameCount = frameCount;
    
    this.targetFrameIndex = 0;
    this.currentRenderedFrameIndex = 0;
    this.currentFrameIndex = -1;
    this.images = [];
    
    this.preload();
    
    // Add scroll listener for this specific container
    window.addEventListener('scroll', () => this.onScroll());
  }
  
  preload() {
    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      // Files are padded to 2 digits, e.g., 01.png, 02.png
      img.src = `${this.folder}/${(i + this.startFrame).toString().padStart(2, '0')}.png`;
      this.images.push(img);
    }
    
    // Set canvas dimensions on first image load
    this.images[0].onload = () => this.renderFirstFrame();
  }
  
  renderFirstFrame() {
    this.canvas.width = this.images[0].naturalWidth;
    this.canvas.height = this.images[0].naturalHeight;
    requestAnimationFrame(() => this.renderLoop());
  }
  
  onScroll() {
    const rect = this.container.getBoundingClientRect();
    
    const containerTop = rect.top;
    const containerHeight = rect.height;
    const scrollableDistance = containerHeight - window.innerHeight;
    
    let scrollFraction = 0;
    
    if (containerTop <= 0) {
      const scrolledPastTop = -containerTop;
      scrollFraction = Math.min(1, Math.max(0, scrolledPastTop / scrollableDistance));
    }
    
    this.targetFrameIndex = scrollFraction * (this.frameCount - 1);
  }
  
  renderLoop() {
    // Cinematic lerping
    this.currentRenderedFrameIndex += (this.targetFrameIndex - this.currentRenderedFrameIndex) * 0.08;
    const frameToDraw = Math.min(this.frameCount - 1, Math.max(0, Math.round(this.currentRenderedFrameIndex)));
    
    if (frameToDraw !== this.currentFrameIndex && this.images[frameToDraw] && this.images[frameToDraw].complete) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.images[frameToDraw], 0, 0);
      this.currentFrameIndex = frameToDraw;
    }
    
    requestAnimationFrame(() => this.renderLoop());
  }
}

// Staggered Animations via Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3 // Trigger when 30% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}, observerOptions);

// Dynamic Config Injection on Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Branding
    document.getElementById('brand-logo').textContent = SITE_CONFIG.branding.brandName;
    document.getElementById('footer-logo').textContent = SITE_CONFIG.branding.brandName;
    document.getElementById('footer-copyright').textContent = SITE_CONFIG.branding.copyrightText;
    document.getElementById('editorial-img-logo').src = SITE_CONFIG.branding.logoImageSrc;

    // 2. Inject Hero Section
    document.getElementById('watermark-left').textContent = SITE_CONFIG.heroSection.watermarkLeft;
    document.getElementById('watermark-right').textContent = SITE_CONFIG.heroSection.watermarkRight;
    document.getElementById('hero-title').textContent = SITE_CONFIG.heroSection.overlayTitle;
    document.getElementById('hero-subtitle').textContent = SITE_CONFIG.heroSection.overlaySubtitle;

    // 3. Inject Editorial Section
    document.getElementById('editorial-title').innerHTML = SITE_CONFIG.editorialSection.title;
    document.getElementById('editorial-body').textContent = SITE_CONFIG.editorialSection.bodyText;
    document.getElementById('editorial-btn').textContent = SITE_CONFIG.editorialSection.buttonText;
    document.getElementById('material-title').textContent = SITE_CONFIG.editorialSection.materialTitle;
    document.getElementById('material-text').innerHTML = SITE_CONFIG.editorialSection.materialText;

    // 4. Inject Marquee
    const marqueeContainer = document.getElementById('marquee-content');
    let marqueeHtml = '';
    for(let i=0; i<6; i++) {
        marqueeHtml += `<span>${SITE_CONFIG.marquee.text} </span>`;
    }
    marqueeContainer.innerHTML = marqueeHtml;

    // 5. Inject MM Section
    document.getElementById('mm-subtitle').textContent = SITE_CONFIG.secondarySequenceSection.subtitle;
    document.getElementById('mm-title').innerHTML = SITE_CONFIG.secondarySequenceSection.title;

    // 6. Inject Collection Section
    document.getElementById('collection-title').textContent = SITE_CONFIG.collectionSection.title;
    document.getElementById('collection-subtitle').textContent = SITE_CONFIG.collectionSection.subtitle;

    // 7. Inject Products Dynamically
    const collectionGrid = document.getElementById('collection-grid');
    SITE_CONFIG.products.forEach(prod => {
        const prodHtml = `
            <div class="luxury-card animate-target" data-animate="up">
                <div class="card-image-wrapper">
                    <img src="${prod.image}" alt="${prod.title}">
                    <div class="card-overlay">
                        <div class="sizes">${prod.sizes}</div>
                        <button class="btn-gold-outline add-to-cart-btn" data-title="${prod.title}" data-price="${prod.price}" data-img="${prod.image}">ADD TO BAG</button>
                    </div>
                </div>
                <div class="card-meta">
                    <h4 class="text-green playfair-serif">${prod.title}</h4>
                    <p class="gold-text price">$${prod.price}</p>
                </div>
            </div>
        `;
        collectionGrid.innerHTML += prodHtml;
    });

    // 8. Inject Info Drawer
    document.getElementById('info-drawer-title').textContent = SITE_CONFIG.infoDrawer.title;
    document.getElementById('info-drawer-lead').textContent = SITE_CONFIG.infoDrawer.leadText;
    const infoBlocksContainer = document.getElementById('info-drawer-blocks-container');
    SITE_CONFIG.infoDrawer.blocks.forEach(block => {
        infoBlocksContainer.innerHTML += `
            <div class="info-block">
                <h5 class="gold-text-small">${block.title}</h5>
                <p class="text-white">${block.text}</p>
            </div>
        `;
    });

    // 9. Initialize Scroll Sequences from Config
    new ScrollSequence('sequence-canvas-1', SITE_CONFIG.sequences.hero.folder, SITE_CONFIG.sequences.hero.startFrame, SITE_CONFIG.sequences.hero.frameCount, 'ss-sequence');
    new ScrollSequence('sequence-canvas-2', SITE_CONFIG.sequences.secondary.folder, SITE_CONFIG.sequences.secondary.startFrame, SITE_CONFIG.sequences.secondary.frameCount, 'mm-sequence');

    // 10. Start Observers
    document.querySelectorAll('.content-overlay, .desc-block, .editorial-container, .collection-header, .luxury-card, .site-footer').forEach(el => {
      observer.observe(el);
    });

    // 11. Re-bind Add to Cart functionality to dynamically created buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const img = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const price = parseInt(this.getAttribute('data-price'));
            
            cart.push({ img, title, price, size: 'M' });
            renderCart();
            
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
        });
    });
});

// Dynamic Header Logic (Hide on scroll down, Show on scroll up)
let lastScrollY = window.scrollY;
const header = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
});

// Navigation Smooth Scrolling
document.querySelectorAll('.nav-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            if (this.parentElement.classList.contains('nav-links')) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        }
    });
});

// Shopping Cart Drawer Logic
const cartIcon = document.getElementById('cart-icon');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalEl = document.getElementById('cart-subtotal');

let cart = [];

function toggleCart() {
    cartDrawer.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

cartIcon.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg text-white">Your bag is currently empty.</div>';
        cartSubtotalEl.textContent = '$0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemHtml = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div>
                        <h4 class="cart-item-title playfair-serif">${item.title}</h4>
                        <p class="cart-item-meta">Size: ${item.size}</p>
                    </div>
                    <div>
                        <p class="cart-item-price gold-text">$${item.price}</p>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">REMOVE</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHtml;
    });

    cartSubtotalEl.textContent = '$' + total;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    renderCart();
};

// Information Drawer Logic
const infoTrigger = document.getElementById('info-trigger');
const infoDrawer = document.getElementById('info-drawer');
const closeInfoBtn = document.getElementById('close-info');

function toggleInfo() {
    infoDrawer.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

infoTrigger.addEventListener('click', toggleInfo);
closeInfoBtn.addEventListener('click', toggleInfo);

// Update overlay click to close all active drawers
cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    infoDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
});

// Global Modal Logic for Footer Links
const globalModal = document.getElementById('global-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

document.querySelectorAll('.footer-right-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.textContent.trim().toUpperCase();
        
        if (SITE_CONFIG.footerModals[type]) {
            modalTitle.textContent = type === 'TERMS' ? 'TERMS OF SERVICE' : type === 'PRIVACY' ? 'PRIVACY POLICY' : type;
            modalBody.innerHTML = SITE_CONFIG.footerModals[type];
            globalModal.classList.add('open');
        }
    });
});

function closeGlobalModal() {
    globalModal.classList.remove('open');
}

closeModalBtn.addEventListener('click', closeGlobalModal);
globalModal.addEventListener('click', function(e) {
    if (e.target === globalModal) {
        closeGlobalModal();
    }
});
