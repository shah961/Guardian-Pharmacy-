/**
 * GUARDIAN PHARMACY - MAIN JAVASCRIPT
 * Handles Navigation, Mobile Drawer (Explicit Click Only), Product Search & Form Logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProductFilters();
    initContactForm();
});

/* ==========================================================================
   MOBILE MENU CONTROLLER (EXPLICIT CLICK ONLY - NO SWIPE)
   ========================================================================== */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburgerBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    }

    // Explicit Click Listeners Only
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close on navigation click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Keyboard ESC Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Guard against accidental touches/swipes triggering state
    mobileMenu.addEventListener('touchmove', (e) => {
        // Prevent scroll leak inside drawer area if necessary
        if (e.target === overlay) {
            e.preventDefault();
        }
    }, { passive: false });
}

/* ==========================================================================
   PRODUCT SEARCH AND CATEGORY FILTER (products.html)
   ========================================================================== */
function initProductFilters() {
    const searchInput = document.getElementById('product-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const noProductsMsg = document.getElementById('no-products-msg');

    if (!productCards.length) return;

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function filterProducts() {
        let visibleCount = 0;

        productCards.forEach(card => {
            const cardCat = card.getAttribute('data-cat');
            const cardText = card.innerText.toLowerCase();

            const matchesCat = (currentCategory === 'all' || cardCat === currentCategory);
            const matchesSearch = cardText.includes(currentSearchTerm);

            if (matchesCat && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (noProductsMsg) {
            if (visibleCount === 0) {
                noProductsMsg.classList.remove('hidden');
            } else {
                noProductsMsg.classList.add('hidden');
            }
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            filterProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            filterProducts();
        });
    }
}

/* ==========================================================================
   CONTACT FORM VALIDATION (FRONTEND DEMO)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name Validation
        const nameInput = document.getElementById('full-name');
        const nameGroup = nameInput.parentElement;
        if (!nameInput.value.trim()) {
            nameGroup.classList.add('error');
            isValid = false;
        } else {
            nameGroup.classList.remove('error');
        }

        // Phone Validation
        const phoneInput = document.getElementById('phone-number');
        const phoneGroup = phoneInput.parentElement;
        if (!phoneInput.value.trim()) {
            phoneGroup.classList.add('error');
            isValid = false;
        } else {
            phoneGroup.classList.remove('error');
        }

        // Message Validation
        const msgInput = document.getElementById('message');
        const msgGroup = msgInput.parentElement;
        if (!msgInput.value.trim()) {
            msgGroup.classList.add('error');
            isValid = false;
        } else {
            msgGroup.classList.remove('error');
        }

        if (isValid) {
            form.reset();
            if (feedback) {
                feedback.classList.remove('hidden');
            }
        }
    });
}
