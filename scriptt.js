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
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
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

            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        });

         menuButton.setAttribute('aria-expanded', 'false');
         menuButton.setAttribute('aria-controls', 'mobile-menu');
         mobileMenu.setAttribute('aria-hidden', 'true');

    } else {
        console.warn("Mobile menu button or menu element not found.");
    }

    // --- Attempt to disable right-click and common view-source shortcuts ---
    // --- WARNING: This is easily bypassed and can be bad for UX. ---
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        // console.log("Right-click disabled (attempted)."); // For testing
        // You could show a custom message here, but it's generally not recommended.
    });

    // Disable common keyboard shortcuts for viewing source/developer tools
    document.addEventListener('keydown', function(event) {
        // Disable F12 (developer tools)
        if (event.key === "F12" || event.keyCode === 123) {
            event.preventDefault();
            // console.log("F12 disabled (attempted)."); // For testing
        }
        // Disable Ctrl+Shift+I (developer tools)
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            event.preventDefault();
            // console.log("Ctrl+Shift+I disabled (attempted)."); // For testing
        }
        // Disable Ctrl+Shift+J (developer tools)
        if (event.ctrlKey && event.shiftKey && event.key === 'J') {
            event.preventDefault();
            // console.log("Ctrl+Shift+J disabled (attempted)."); // For testing
        }
        // Disable Ctrl+U (view source)
        if (event.ctrlKey && event.key === 'U') {
            event.preventDefault();
            // console.log("Ctrl+U disabled (attempted)."); // For testing
        }
        // Disable Ctrl+S (save page) - can sometimes be used to get source
        if (event.ctrlKey && event.key === 'S') {
            event.preventDefault();
            // console.log("Ctrl+S disabled (attempted)."); // For testing
        }
    });

    // You could also add a message to the console to discourage casual snooping,
    // though serious users will ignore it or not see it.
    // console.log('%cHold Up!', 'color: red; font-size: 24px; font-weight: bold;');
    // console.log('%cThis browser feature is intended for developers. If someone told you to copy/paste something here, it might be a scam.', 'font-size: 16px;');


}); // End DOMContentLoaded
