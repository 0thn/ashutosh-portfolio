// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Set current year in footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        const navLinks = mobileMenu.querySelectorAll('a'); // Get all links in mobile menu

        // Toggle menu visibility on button click
        menuButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from immediately closing menu via document listener
            mobileMenu.classList.toggle('hidden');
            // Optional: Add ARIA attribute toggling for accessibility
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded); // Opposite of button's expanded state
        });

        // Close mobile menu when a navigation link inside it is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });

        // Close mobile menu if clicked outside of the menu or the button
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = menuButton.contains(event.target);

            // Only close if the menu is not hidden and the click was outside both elements
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        });

         // Add initial ARIA attributes for accessibility
         menuButton.setAttribute('aria-expanded', 'false');
         menuButton.setAttribute('aria-controls', 'mobile-menu'); // Link button to menu
         mobileMenu.setAttribute('aria-hidden', 'true'); // Hide menu from screen readers initially

    } else {
        console.warn("Mobile menu button or menu element not found.");
    }

    // --- Add more JavaScript functionality below if needed ---
    // Example: Smooth scroll (though html class="scroll-smooth" handles basic cases)
    // Example: Animations on scroll (using Intersection Observer API)
    // Example: Tagline typing effect

}); // End DOMContentLoaded
