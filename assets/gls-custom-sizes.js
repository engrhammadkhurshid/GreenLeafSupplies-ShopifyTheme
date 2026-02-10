/**
 * GLS Custom Size — User-typed custom size handler
 *
 * When the "Custom Size" pill is selected:
 *   1. Shows a text input for the customer to type their desired size
 *   2. Intercepts "Get A Quote" and "Buy Now" button clicks
 *   3. Redirects to the quote form with product info + custom size pre-filled
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('shopify:section:load', init);

  function init() {
    var wrappers = document.querySelectorAll('.gls-custom-size-input-row');
    if (!wrappers.length) return;

    wrappers.forEach(function (inputRow) {
      if (inputRow.dataset.glsBound) return;
      inputRow.dataset.glsBound = 'true';

      var sectionId = inputRow.dataset.sectionId;
      var radio = document.getElementById('CustomSizeRadio-' + sectionId);
      var textInput = inputRow.querySelector('.gls-custom-size-text');
      var hint = inputRow.nextElementSibling;
      var fieldset = inputRow.closest('fieldset') || inputRow.closest('.product-form__input');

      if (!radio || !textInput) return;

      /* ── Show/hide input when Custom Size pill is toggled ── */
      var allRadios = fieldset ? fieldset.querySelectorAll('input[type="radio"]') : [];

      allRadios.forEach(function (r) {
        r.addEventListener('change', function () {
          if (radio.checked) {
            inputRow.classList.add('is-visible');
            if (hint) hint.classList.add('is-visible');
            textInput.focus();
          } else {
            inputRow.classList.remove('is-visible');
            if (hint) hint.classList.remove('is-visible');
            textInput.value = '';
          }
        });
      });

      /* If it's already checked on load (e.g. back navigation) */
      if (radio.checked) {
        inputRow.classList.add('is-visible');
        if (hint) hint.classList.add('is-visible');
      }
    });

    /* ── Intercept Buy Now / Get A Quote buttons ── */
    interceptButtons();
  }

  function interceptButtons() {
    /*
     * Find all "Get A Quote" and "Buy Now" links/buttons on the product page.
     * When a custom size is entered, redirect to the quote form with the custom
     * size appended to the URL.
     */
    var quoteLinks = document.querySelectorAll(
      'a[href*="/pages/request-a-quote"], a.product-form__submit[href*="request-a-quote"]'
    );

    quoteLinks.forEach(function (link) {
      if (link.dataset.glsIntercepted) return;
      link.dataset.glsIntercepted = 'true';

      link.addEventListener('click', function (e) {
        var customSizeInput = document.querySelector('.gls-custom-size-text');
        var customSizeRadio = document.querySelector('[id^="CustomSizeRadio-"]');

        if (customSizeInput && customSizeRadio && customSizeRadio.checked) {
          var customValue = customSizeInput.value.trim();
          if (customValue) {
            e.preventDefault();
            var url = new URL(link.href, window.location.origin);
            url.searchParams.set('custom_size', customValue);
            window.location.href = url.toString();
            return;
          }
        }
      });
    });

    /*
     * For "Buy Now" / Add-to-cart forms: if custom size is selected,
     * redirect to quote form instead of adding to cart.
     */
    var buyForms = document.querySelectorAll('form[action*="/cart/add"]');

    buyForms.forEach(function (form) {
      if (form.dataset.glsIntercepted) return;
      form.dataset.glsIntercepted = 'true';

      form.addEventListener('submit', function (e) {
        var customSizeInput = document.querySelector('.gls-custom-size-text');
        var customSizeRadio = document.querySelector('[id^="CustomSizeRadio-"]');

        if (customSizeInput && customSizeRadio && customSizeRadio.checked) {
          var customValue = customSizeInput.value.trim();
          if (customValue) {
            e.preventDefault();

            /* Build quote URL from product data on the page */
            var productTitle = '';
            var productHandle = '';
            var productId = '';

            var titleEl = document.querySelector('.product__title h1');
            if (titleEl) productTitle = titleEl.textContent.trim();

            /* Try to get handle from canonical URL or product URL */
            var canonicalEl = document.querySelector('link[rel="canonical"]');
            if (canonicalEl) {
              var canonical = canonicalEl.getAttribute('href') || '';
              var match = canonical.match(/\/products\/([^?#]+)/);
              if (match) productHandle = match[1];
            }

            /* Try product ID from variant JSON */
            var variantJson = document.querySelector('script[data-selected-variant]');
            if (variantJson) {
              try {
                var variantData = JSON.parse(variantJson.textContent);
                if (variantData && variantData.product_id) {
                  productId = variantData.product_id;
                }
              } catch (err) { /* ignore */ }
            }

            var quoteUrl = '/pages/request-a-quote'
              + '?product=' + encodeURIComponent(productTitle)
              + '&handle=' + encodeURIComponent(productHandle)
              + '&product_id=' + encodeURIComponent(productId)
              + '&custom_size=' + encodeURIComponent(customValue);

            window.location.href = quoteUrl;
            return;
          }
        }
      });
    });
  }
})();
