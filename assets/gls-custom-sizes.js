/**
 * GLS Custom Size — Standalone Button Handler
 *
 * Managing "Custom Size" state separately from the variant form data
 * to prevent theme JS conflicts.
 */
(function () {
  'use strict';

  /* Init on load and after Shopify section updates */
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('shopify:section:load', init);

  function init() {
    /* 1. Find all Custom Size buttons */
    var buttons = document.querySelectorAll('.gls-custom-size-btn');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      if (btn.dataset.glsBound) return;
      btn.dataset.glsBound = 'true';

      var wrapper = btn.closest('.product-form__input') || btn.closest('fieldset');
      var inputRow = wrapper.querySelector('.gls-custom-size-input-row');
      var hint = wrapper.querySelector('.gls-custom-size-hint');
      var textInput = inputRow ? inputRow.querySelector('.gls-custom-size-text') : null;

      /* Normal variant radios in this group */
      var variantRadios = wrapper.querySelectorAll('input[type="radio"], input[type="checkbox"]');

      /* Dropdown select in this group (if applicable) */
      var variantSelect = wrapper.querySelector('select');

      /* ── Click Handler for Custom Size Button ── */
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var isCurrentlySelected = btn.classList.contains('is-selected');

        if (isCurrentlySelected) {
          /* Deselect */
          deselectCustomSize(btn, inputRow, hint, textInput);
        } else {
          /* Select Custom Size */
          selectCustomSize(btn, inputRow, hint, textInput);

          /* Deselect native radio inputs visually & functionally */
          variantRadios.forEach(function (r) {
            r.checked = false;
            r.dispatchEvent(new Event('change', { bubbles: true })); // Notify theme
          });

          /* Reset dropdown if present */
          if (variantSelect) {
            variantSelect.selectedIndex = -1;
            variantSelect.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });

      /* ── Listen for Native Variant Changes ── */
      variantRadios.forEach(function (r) {
        r.addEventListener('change', function () {
          if (r.checked) {
            /* If user picks a normal size, deselect custom size */
            deselectCustomSize(btn, inputRow, hint, textInput);
          }
        });
      });

      if (variantSelect) {
        variantSelect.addEventListener('change', function () {
          if (variantSelect.value) {
            deselectCustomSize(btn, inputRow, hint, textInput);
          }
        });
      }
    });

    /* 2. Intercept Buy Now / Get A Quote */
    interceptButtons();
  }

  function selectCustomSize(btn, row, hint, input) {
    btn.classList.add('is-selected');
    if (row) {
      row.classList.add('is-visible');
      if (input) setTimeout(function () { input.focus(); }, 50);
    }
    if (hint) hint.classList.add('is-visible');
  }

  function deselectCustomSize(btn, row, hint, input) {
    btn.classList.remove('is-selected');
    if (row) row.classList.remove('is-visible');
    if (hint) hint.classList.remove('is-visible');
    if (input) input.value = '';
  }

  function interceptButtons() {
    /* 
     * Intercept clicks on Quote/Buy link. 
     * If a custom size input is VISIBLE and has VALUE, redirect to quote form.
     */
    var quoteLinks = document.querySelectorAll(
      'a[href*="/pages/request-a-quote"], a.product-form__submit[href*="request-a-quote"], button[type="submit"][name="add"]'
    );

    /* Also watch the main product form submit */
    var productForms = document.querySelectorAll('form[action*="/cart/add"]');

    function handleAction(e, sourceEl) {
      /* Check if ANY custom size input is currently active & filled */
      var activeInput = document.querySelector('.gls-custom-size-input-row.is-visible .gls-custom-size-text');

      if (activeInput && activeInput.value.trim() !== '') {
        e.preventDefault();
        e.stopImmediatePropagation();

        var customSizeVal = activeInput.value.trim();
        redirectToQuote(customSizeVal);
        return false;
      }
    }

    /* Bind to links/buttons */
    quoteLinks.forEach(function (link) {
      if (link.dataset.glsIntercepted) return;
      link.dataset.glsIntercepted = 'true';
      link.addEventListener('click', function (e) { handleAction(e, link); });
    });

    /* Bind to form submit (Buy Now / Add to Cart) */
    productForms.forEach(function (form) {
      if (form.dataset.glsIntercepted) return;
      form.dataset.glsIntercepted = 'true';
      form.addEventListener('submit', function (e) { handleAction(e, form); });
    });
  }

  function redirectToQuote(customSize) {
    /* Extract product info from page */
    var productTitle = '';
    var productHandle = '';
    var productId = '';

    var titleEl = document.querySelector('.product__title h1');
    if (titleEl) productTitle = titleEl.textContent.trim();

    var canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      var canonical = canonicalEl.getAttribute('href') || '';
      var match = canonical.match(/\/products\/([^?#]+)/);
      if (match) productHandle = match[1];
    }

    var variantJson = document.querySelector('script[data-selected-variant]');
    if (variantJson) {
      try {
        var variantData = JSON.parse(variantJson.textContent);
        if (variantData && variantData.product_id) {
          productId = variantData.product_id;
        }
      } catch (err) { }
    }

    var quoteUrl = '/pages/request-a-quote'
      + '?product=' + encodeURIComponent(productTitle)
      + '&handle=' + encodeURIComponent(productHandle)
      + '&product_id=' + encodeURIComponent(productId)
      + '&custom_size=' + encodeURIComponent(customSize);

    window.location.href = quoteUrl;
  }

})();
