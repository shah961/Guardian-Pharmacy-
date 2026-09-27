/**
 * GUARDIAN PHARMACY - GSAP ANIMATIONS
 * Respects prefers-reduced-motion and provides subtle scroll reveal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if Reduced Motion is enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof gsap === 'undefined') {
        return; // Skip animation initialization for accessibility/performance
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Entrance
    if (document.querySelector('.hero-content')) {
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });

        gsap.from('.visual-card', {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
        });
    }

    // Generic Scroll Reveal for Cards
    const cards = document.querySelectorAll('.card, .trust-card, .category-box');
    if (cards.length && typeof ScrollTrigger !== 'undefined') {
        cards.forEach((card) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }
});
