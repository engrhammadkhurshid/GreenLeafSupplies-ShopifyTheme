/**
 * GLS Custom Sizes — Toggle & outside-click handler
 * Manages the "Custom Sizes" dropdown in the product variant picker.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initCustomSizesToggle);

  /* Re-init after Shopify section rendering (theme editor / AJAX) */
  document.addEventListener('shopify:section:load', initCustomSizesToggle);

  function initCustomSizesToggle() {
    var toggles = document.querySelectorAll('.gls-custom-sizes-toggle');

    toggles.forEach(function (btn) {
      /* Prevent duplicate listeners on hot-reload */
      if (btn.dataset.glsBound) return;
      btn.dataset.glsBound = 'true';

      var dropdownId = btn.getAttribute('aria-controls');
      var dropdown = document.getElementById(dropdownId);
      if (!dropdown) return;

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        if (!isOpen) {
          openDropdown(btn, dropdown);
        }
      });
    });

    /* Close dropdown when clicking outside */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.gls-custom-sizes-wrapper')) {
        closeAllDropdowns();
      }
    });

    /* Close dropdown on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });
  }

  function openDropdown(btn, dropdown) {
    btn.setAttribute('aria-expanded', 'true');
    dropdown.style.display = 'block';
  }

  function closeAllDropdowns() {
    var allToggles = document.querySelectorAll('.gls-custom-sizes-toggle[aria-expanded="true"]');
    allToggles.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      var dropdownId = btn.getAttribute('aria-controls');
      var dropdown = document.getElementById(dropdownId);
      if (dropdown) dropdown.style.display = 'none';
    });
  }
})();
