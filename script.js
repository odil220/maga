/**
 * OMK - Fashion Website
 * Fully Functional with Search, Categories, Animations & Unique Features
 */

// =====================================================
// PRODUCT DATA - Expanded with more items
// =====================================================
const products = {
    jeans: [
        { id: 1, name: "OMK CLASSIC DENIM", price: 180, category: "jeans", badge: "NEW", description: "Premium classic fit denim" },
        { id: 2, name: "SLIM FIT JEANS", price: 160, category: "jeans", badge: null, description: "Modern slim cut" },
        { id: 3, name: "RAW SELVEDGE", price: 195, category: "jeans", badge: "POPULAR", description: "Japanese selvedge denim" },
        { id: 4, name: "DISTREESSED DENIM", price: 175, category: "jeans", badge: null, description: "Vintage wash effect" },
        { id: 5, name: "BLACK DENIM", price: 185, category: "jeans", badge: null, description: "Sleek black wash" },
        { id: 6, name: "LIGHT WASH JEANS", price: 155, category: "jeans", badge: null, description: "Summer ready wash" }
    ],
    hoodies: [
        { id: 7, name: "OMK CROWN HOODIE", price: 220, category: "hoodies", badge: "NEW", description: "Signature crown graphic" },
        { id: 8, name: "PULL_OVER CREWNECK", price: 195, category: "hoodies", badge: null, description: "Classic comfort" },
        { id: 9, name: "ZIP HOODIE PRO", price: 240, category: "hoodies", badge: "BESTSELLER", description: "Full zip closure" },
        { id: 10, name: "GRAPHIC PRINT HOOD", price: 210, category: "hoodies", badge: null, description: "Art collaborative design" },
        { id: 11, name: "ESSENTIAL HOODIE", price: 175, category: "hoodies", badge: null, description: "Minimal design" },
        { id: 12, name: "TECH FLEECE HOOD", price: 225, category: "hoodies", badge: null, description: "Performance fabric" }
    ],
    baggyJeans: [
        { id: 13, name: "OMK BAGGY DENIM", price: 200, category: "baggy", badge: "NEW", description: "Relaxed wide leg" },
        { id: 14, name: "CARGO BAGGY", price: 220, category: "baggy", badge: "TRENDING", description: "Utility pockets" },
        { id: 15, name: "LOOSE FIT JEANS", price: 185, category: "baggy", badge: null, description: "Ultra relaxed" },
        { id: 16, name: "90s BAGGY", price: 190, category: "baggy", badge: null, description: "Retro inspired" },
        { id: 17, name: "JOGGER DENIM", price: 175, category: "baggy", badge: null, description: "Crossover style" },
        { id: 18, name: "OVERSIZE DENIM", price: 210, category: "baggy", badge: null, description: "Statement piece" }
    ]
};

// Get all products as flat array
function getAllProducts() {
    return [...products.jeans, ...products.hoodies, ...products.baggyJeans];
}

// =====================================================
// STATE
// =====================================================
let cart = JSON.parse(localStorage.getItem('omk_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('omk_wishlist')) || [];
let currentTheme = localStorage.getItem('omk_theme') || 'dark';
let activeCategory = 'all';
let searchQuery = '';

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLoader();
    initSmoothScroll();
    initThreeJS();
    initGSAPAnimations();
    initAnimeAnimations();
    initNavigation();
    initMobileMenuClose();
    initCart();
    initWishlist();
    initSearch(); // Fixed search
    initCategoryFilters(); // Fixed categories
    initSizeGuide();
    initExpandableSections();
    initParallax(); // Parallax effects
    init360Viewer(); // 360 view feature
    renderAllProducts();
    updateCartUI();
    updateWishlistUI();
    initCountAnimations();
    initRecommendations();
});

// =====================================================
// THEME
// =====================================================
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('omk_theme', currentTheme);
    });
}

// =====================================================
// LOADER
// =====================================================
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.loader-wrapper').classList.add('loaded');
            
            // GSAP animations on load
            gsap.from('.hero-title', { y: 80, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
            gsap.from('.hero-tagline', { y: 20, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
            gsap.from('.hero-stats', { y: 30, opacity: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' });
            
            // Animate products on load
            animateProductsIn();
        }, 1000);
    });
}

function animateProductsIn() {
    anime({
        targets: '.product-card',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(80, { start: 200 }),
        easing: 'easeOutQuad',
        complete: () => {
            initScrollAnimations();
        }
    });
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
    const lenis = new Lenis({ duration: 1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    lenis.on('scroll', () => {
        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.querySelector('.scroll-progress').style.width = `${Math.min(progress, 100)}%`;
    });
}

// =====================================================
// THREE.JS
// =====================================================
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    const geometry = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    
    for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 8;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.02, color: 0x0071e3, transparent: true, opacity: 0.4 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 3;
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.002;
        points.rotation.y = time * 0.1;
        renderer.render(scene, camera);
    }
    animate();
}

// =====================================================
// GSAP ANIMATIONS
// =====================================================
function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Product section animations
    document.querySelectorAll('.product-section').forEach((section, i) => {
        gsap.from(section.querySelector('.section-header'), {
            scrollTrigger: { trigger: section, start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
        
        gsap.from(section.querySelectorAll('.product-card'), {
            scrollTrigger: { trigger: section, start: 'top 70%' },
            y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2
        });
    });
    
    // Parallax effects
    gsap.utils.toArray('.parallax-section').forEach(section => {
        gsap.to(section, {
            scrollTrigger: { trigger: section, start: 'top bottom', scrub: true },
            y: -50, ease: 'none'
        });
    });
}

// =====================================================
// ANIME.JS
// =====================================================
function initAnimeAnimations() {
    if (typeof anime === 'undefined') return;
    
    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({ targets: card, scale: 1.02, duration: 300, easing: 'easeOutQuad' });
        });
        card.addEventListener('mouseleave', () => {
            anime({ targets: card, scale: 1, duration: 300, easing: 'easeOutQuad' });
        });
    });
    
    // Button animations
    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({ targets: btn, scale: 1.1, duration: 200, easing: 'easeOutQuad' });
        });
        btn.addEventListener('mouseleave', () => {
            anime({ targets: btn, scale: 1, duration: 200, easing: 'easeOutQuad' });
        });
    });
}

// =====================================================
// NAVIGATION
// =====================================================
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        
        if (fullscreenMenu.classList.contains('active')) {
            anime({ targets: '.menu-section', translateY: [20, 0], opacity: [0, 1], duration: 500, delay: anime.stagger(100, { start: 200 }), easing: 'easeOutQuad' });
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!fullscreenMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            fullscreenMenu.classList.remove('active');
        }
    });
}

function initMobileMenuClose() {
    const closeBtn = document.getElementById('mobile-menu-close');
    const menuToggle = document.getElementById('menu-toggle');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    
    closeBtn?.addEventListener('click', () => {
        closeBtn.classList.remove('active');
        menuToggle.classList.remove('active');
        fullscreenMenu.classList.remove('active');
    });
}

// =====================================================
// SEARCH - FIXED REAL-TIME FILTERING
// =====================================================
function initSearch() {
    const searchTrigger = document.querySelector('.search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');
    
    searchTrigger?.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput?.focus(), 100);
    });
    
    closeSearch?.addEventListener('click', () => searchOverlay.classList.remove('active'));
    searchOverlay?.addEventListener('click', (e) => { if (e.target === searchOverlay) searchOverlay.classList.remove('active'); });
    
    // Real-time search as user types
    searchInput?.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        performSearch(searchQuery);
    });
}

function performSearch(query) {
    const resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) return;
    
    if (query.length < 1) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
    }
    
    const allProducts = getAllProducts();
    const results = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    
    resultsContainer.style.display = 'block';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-no-results">No products found</div>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(p => `
        <div class="search-result-item" onclick="quickView(${p.id})">
            <div class="search-result-image"></div>
            <div class="search-result-info">
                <h4>${p.name}</h4>
                <span>$${p.price}</span>
                <small>${p.category}</small>
            </div>
        </div>
    `).join('');
    
    // Animate results
    anime({ targets: '.search-result-item', translateY: [10, 0], opacity: [0, 1], duration: 300, delay: anime.stagger(50), easing: 'easeOutQuad' });
}

// =====================================================
// CATEGORY FILTERS - FIXED
// =====================================================
function initCategoryFilters() {
    // Category links in menu
    document.querySelectorAll('.menu-section a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Close menu
            document.getElementById('menu-toggle')?.classList.remove('active');
            document.getElementById('fullscreen-menu')?.classList.remove('active');
            
            // Get category from href
            const category = href.replace('#', '');
            
            if (category === 'jeans' || category === 'hoodies' || category === 'baggy-jeans') {
                filterByCategory(category);
                
                // Scroll to products section
                const section = document.getElementById('shop');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function filterByCategory(category) {
    activeCategory = category;
    
    // Update product display
    renderFilteredProducts();
    
    // Update URL
    history.pushState(null, '', `#${category}`);
    
    // Animate transition
    anime({
        targets: '#products-container',
        opacity: [0.5, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function renderFilteredProducts() {
    const container = document.getElementById('products-container');
    if (!container) {
        // Create container if doesn't exist
        createProductsContainer();
    }
    
    let filteredProducts = [];
    
    switch(activeCategory) {
        case 'jeans':
            filteredProducts = products.jeans;
            break;
        case 'hoodies':
            filteredProducts = products.hoodies;
            break;
        case 'baggy-jeans':
            filteredProducts = products.baggyJeans;
            break;
        default:
            filteredProducts = getAllProducts();
    }
    
    // Render with animations
    renderProductsToContainer(filteredProducts);
}

function createProductsContainer() {
    // Create a unified products section after hero
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    const productsSection = document.createElement('section');
    productsSection.id = 'products-container';
    productsSection.className = 'products-section';
    productsSection.innerHTML = `
        <div class="category-tabs">
            <button class="category-tab active" data-category="all">ALL</button>
            <button class="category-tab" data-category="jeans">JEANS</button>
            <button class="category-tab" data-category="hoodies">HOODIES</button>
            <button class="category-tab" data-category="baggy-jeans">BAGGY JEANS</button>
        </div>
        <div class="products-grid" id="main-products-grid"></div>
    `;
    
    hero.parentNode.insertBefore(productsSection, hero.nextSibling);
    
    // Add category tab event listeners
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCategory = tab.dataset.category;
            renderFilteredProducts();
        });
    });
}

function renderProductsToContainer(productList) {
    const grid = document.getElementById('main-products-grid') || document.getElementById('products-grid');
    
    if (!grid) return;
    
    grid.innerHTML = productList.map(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        
        return `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image"></div>
                <div class="product-actions">
                    <button class="product-action-btn" onclick="quickView(${product.id})"><i class="fas fa-eye"></i></button>
                    <button class="product-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}" onclick="addToWishlist(${product.id})">
                        <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="product-action-btn" onclick="addToCart(${product.id})"><i class="fas fa-shopping-bag"></i></button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <span class="product-price">$${product.price}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-initialize animations
    animateProductsIn();
}

// =====================================================
// CART
// =====================================================
function initCart() {
    const cartBtn = document.querySelector('.cart-trigger');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    
    cartBtn?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
    
    closeCart?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    cartOverlay?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
}

function addToCart(productId, size = 'M') {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    if (existingItem) existingItem.quantity++;
    else cart.push({ id: product.id, name: product.name, price: product.price, size, quantity: 1 });
    
    saveCart();
    updateCartUI();
    showToast(`${product.name} ADDED TO BAG`);
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(productId, size);
        else { saveCart(); updateCartUI(); }
    }
}

function saveCart() { localStorage.setItem('omk_cart', JSON.stringify(cart)); }

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (totalPrice) totalPrice.textContent = `$${total}`;
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (cartItems) cartItems.innerHTML = '';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"></div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-price">$${item.price}</span>
                    <span class="cart-item-size">SIZE: ${item.size}</span>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.size}')"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
    }
}

// =====================================================
// WISHLIST
// =====================================================
function initWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-trigger');
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const closeWishlist = document.querySelector('.close-wishlist');
    
    wishlistBtn?.addEventListener('click', () => {
        wishlistSidebar.classList.add('active');
        wishlistOverlay.classList.add('active');
    });
    
    closeWishlist?.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
        wishlistOverlay.classList.remove('active');
    });
    wishlistOverlay?.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
        wishlistOverlay.classList.remove('active');
    });
}

function addToWishlist(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;
    
    const exists = wishlist.find(item => item.id === productId);
    if (exists) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showToast(`${product.name} REMOVED FROM WISHLIST`);
    } else {
        wishlist.push({ id: product.id, name: product.name, price: product.price });
        showToast(`${product.name} ADDED TO WISHLIST`);
    }
    
    saveWishlist();
    updateWishlistUI();
    updateWishlistButtons();
}

function saveWishlist() { localStorage.setItem('omk_wishlist', JSON.stringify(wishlist)); }

function updateWishlistUI() {
    const wishlistItems = document.getElementById('wishlist-items');
    const wishlistEmpty = document.getElementById('wishlist-empty');
    const wishlistCount = document.querySelector('.wishlist-count');
    
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
    
    if (wishlist.length === 0) {
        if (wishlistEmpty) wishlistEmpty.style.display = 'flex';
        if (wishlistItems) wishlistItems.innerHTML = '';
        return;
    }
    
    if (wishlistEmpty) wishlistEmpty.style.display = 'none';
    if (wishlistItems) {
        wishlistItems.innerHTML = wishlist.map(item => `
            <div class="wishlist-item">
                <div class="cart-item-image"></div>
                <div class="wishlist-item-info">
                    <h4 class="wishlist-item-name">${item.name}</h4>
                    <span class="cart-item-price">$${item.price}</span>
                    <button class="modal-add-btn" onclick="addToCart(${item.id})" style="margin-top:0.5rem;padding:0.5rem 1rem;font-size:0.8rem;">ADD TO BAG</button>
                </div>
                <button class="wishlist-item-remove" onclick="addToWishlist(${item.id})"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
    }
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.id);
        const isInWishlist = wishlist.some(item => item.id === productId);
        btn.classList.toggle('active', isInWishlist);
        btn.innerHTML = `<i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>`;
    });
}

// =====================================================
// SIZE GUIDE
// =====================================================
function initSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    const overlay = document.getElementById('size-guide-overlay');
    const closeBtn = modal?.querySelector('.close-size-guide');
    const calculateBtn = document.getElementById('calculate-size');
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-guide-link')) {
            e.preventDefault();
            modal?.classList.add('active');
            overlay?.classList.add('active');
        }
    });
    
    closeBtn?.addEventListener('click', () => {
        modal?.classList.remove('active');
        overlay?.classList.remove('active');
    });
    overlay?.addEventListener('click', () => {
        modal?.classList.remove('active');
        overlay?.classList.remove('active');
    });
    
    calculateBtn?.addEventListener('click', () => {
        const heightFt = parseInt(document.getElementById('height-ft')?.value) || 0;
        const heightIn = parseInt(document.getElementById('height-in')?.value) || 0;
        const weight = parseInt(document.getElementById('weight')?.value) || 0;
        const resultEl = document.getElementById('size-result');
        
        if (!heightFt || !weight) {
            if (resultEl) resultEl.textContent = 'Please enter valid measurements';
            return;
        }
        
        const heightTotalIn = (heightFt * 12) + heightIn;
        let size = 'M';
        
        if (heightTotalIn < 64 || weight < 130) size = 'S';
        else if (heightTotalIn > 72 || weight > 190) size = 'XL';
        else if (weight > 170) size = 'L';
        
        if (resultEl) {
            resultEl.textContent = `Recommended Size: ${size}`;
            anime({ targets: resultEl, scale: [0.8, 1], opacity: [0, 1], duration: 400, easing: 'easeOutQuad' });
        }
    });
}

// =====================================================
// EXPANDABLE SECTIONS
// =====================================================
function initExpandableSections() {
    document.querySelectorAll('.expand-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.getElementById(`${trigger.dataset.section}-section`);
            section?.classList.add('active');
            document.getElementById('menu-toggle')?.classList.remove('active');
            document.getElementById('fullscreen-menu')?.classList.remove('active');
        });
    });
    
    document.querySelectorAll('.close-expand').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('.expandable-section')?.classList.remove('active'));
    });
}

// =====================================================
// 360 VIEWER - UNIQUE FEATURE
// =====================================================
function init360Viewer() {
    // Add 360 view button to product modal
    const originalQuickView = window.quickView;
    window.quickView = function(productId) {
        const product = getAllProducts().find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('product-modal');
        const content = modal.querySelector('.modal-product-content');
        
        content.innerHTML = `
            <div class="modal-image" id="product-360-view">
                <div class="view-360">
                    <div class="view-360-spinner">
                        <i class="fas fa-sync-alt"></i>
                        <span>360°</span>
                    </div>
                    <p class="view-360-hint">Drag to rotate</p>
                </div>
            </div>
            <div class="modal-info">
                <h2>${product.name}</h2>
                <p class="modal-price">$${product.price}</p>
                <p class="modal-description">${product.description}</p>
                <div class="modal-sizes">
                    <label>SIZE</label>
                    <div class="size-options">
                        ${['S','M','L','XL'].map(s => `<button class="size-btn ${s==='M'?'active':''}">${s}</button>`).join('')}
                    </div>
                    <span class="size-guide-link">Size Guide</span>
                </div>
                <button class="modal-add-btn" onclick="addToCart(${product.id})">ADD TO BAG</button>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Add rotation animation
        const spinner = document.querySelector('.view-360-spinner');
        let isDragging = false;
        let startX = 0;
        
        spinner?.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX; });
        document.addEventListener('mouseup', () => { isDragging = false; });
        document.addEventListener('mousemove', (e) => {
            if (isDragging && spinner) {
                const rotate = (e.clientX - startX) / 5;
                spinner.style.transform = `rotate(${rotate}deg)`;
            }
        });
        
        // Size buttons
        content.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                content.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        content.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
    };
}

// =====================================================
// PARALLAX EDITORIAL - UNIQUE FEATURE
// =====================================================
function initParallax() {
    // Add parallax sections to the page
    const newsletter = document.querySelector('.newsletter-minimal');
    if (newsletter) {
        const parallaxSection = document.createElement('section');
        parallaxSection.className = 'parallax-editorial';
        parallaxSection.innerHTML = `
            <div class="parallax-content">
                <h2>THE ART OF STYLE</h2>
                <p>Discover our editorial journey</p>
                <div class="editorial-grid">
                    <div class="editorial-item" data-speed="0.5">
                        <div class="editorial-image"></div>
                        <h3>CRAFTSMANSHIP</h3>
                    </div>
                    <div class="editorial-item" data-speed="1">
                        <div class="editorial-image"></div>
                        <h3>HERITAGE</h3>
                    </div>
                    <div class="editorial-item" data-speed="0.7">
                        <div class="editorial-image"></div>
                        <h3>INNOVATION</h3>
                    </div>
                </div>
            </div>
        `;
        newsletter.parentNode.insertBefore(parallaxSection, newsletter);
        
        // Parallax scroll effect
        if (typeof gsap !== 'undefined') {
            gsap.utils.toArray('.editorial-item').forEach(item => {
                const speed = parseFloat(item.dataset.speed) || 0.5;
                gsap.to(item, {
                    scrollTrigger: { trigger: item, start: 'top bottom', scrub: true },
                    y: -50 * speed, ease: 'none'
                });
            });
        }
    }
}

// =====================================================
// STYLE RECOMMENDATIONS - UNIQUE FEATURE
// =====================================================
function initRecommendations() {
    // Add recommendations section
    const footer = document.querySelector('.minimal-footer');
    if (footer) {
        const recsSection = document.createElement('section');
        recsSection.className = 'recommendations-section';
        recsSection.innerHTML = `
            <div class="recs-header">
                <h3>FOR YOU</h3>
                <p>Based on your style</p>
            </div>
            <div class="recs-grid" id="recommendations-grid"></div>
        `;
        footer.parentNode.insertBefore(recsSection, footer);
        
        // Show random recommendations
        const allProducts = getAllProducts();
        const shuffled = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        const recsGrid = document.getElementById('recommendations-grid');
        
        if (recsGrid) {
            recsGrid.innerHTML = shuffled.map(p => `
                <div class="rec-card" onclick="quickView(${p.id})">
                    <div class="rec-image"></div>
                    <span>${p.name}</span>
                    <small>$${p.price}</small>
                </div>
            `).join('');
        }
    }
}

// =====================================================
// RENDER ALL PRODUCTS
// =====================================================
function renderAllProducts() {
    // Render to individual category sections
    ['jeans-grid', 'hoodies-grid', 'baggy-jeans-grid'].forEach(gridId => {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        let category = gridId.replace('-grid', '');
        if (category === 'baggy-jeans') category = 'baggy';
        
        const categoryProducts = products[category] || [];
        
        grid.innerHTML = categoryProducts.map(product => {
            const isInWishlist = wishlist.some(item => item.id === product.id);
            return `
                <div class="product-card" data-id="${product.id}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <div class="product-image"></div>
                    <div class="product-actions">
                        <button class="product-action-btn" onclick="quickView(${product.id})"><i class="fas fa-eye"></i></button>
                        <button class="product-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}" onclick="addToWishlist(${product.id})">
                            <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <button class="product-action-btn" onclick="addToCart(${product.id})"><i class="fas fa-shopping-bag"></i></button>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <span class="product-price">$${product.price}</span>
                    </div>
                </div>
            `;
        }).join('');
    });
}

// =====================================================
// COUNT ANIMATIONS
// =====================================================
function initCountAnimations() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: '.hero-stats',
            start: 'top 80%',
            onEnter: () => {
                document.querySelectorAll('.stat-number').forEach(el => {
                    const target = parseInt(el.dataset.count) || 0;
                    anime({ targets: el, innerHTML: [0, target], round: 1, duration: 1500, easing: 'easeInOutQuad' });
                });
            },
            once: true
        });
    }
}

// =====================================================
// TOAST
// =====================================================
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container?.appendChild(toast);
    
    anime({ targets: toast, translateX: [30, 0], opacity: [0, 1], duration: 300, easing: 'easeOutQuad' });
    
    setTimeout(() => {
        anime({ targets: toast, translateX: [0, 30], opacity: [1, 0], duration: 300, easing: 'easeInQuad', complete: () => toast.remove() });
    }, 2500);
}

// =====================================================
// NEWSLETTER & CHECKOUT
// =====================================================
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('THANK YOU FOR SUBSCRIBING');
    e.target.reset();
});

document.querySelector('.checkout-btn')?.addEventListener('click', () => showToast('PROCEEDING TO CHECKOUT...'));

// Global functions
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.addToWishlist = addToWishlist;
window.quickView = window.quickView;
