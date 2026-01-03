# 🚨 URGENT: Manual Shopify Sync Required

## Issue:
Changes have been pushed to GitHub but Shopify hasn't automatically pulled them yet.

## Solution: Manual Pull from Shopify

### **Step-by-Step Instructions:**

1. **Login to Shopify Admin**
   - Go to your Shopify admin dashboard
   - URL: `https://[your-store].myshopify.com/admin`

2. **Navigate to Themes**
   - Click **"Online Store"** in the left sidebar
   - Click **"Themes"**

3. **Find Your Theme**
   - Look for **"GreenLeafSupplies-ShopifyTheme"** or your current live theme
   - It should show "Current theme" or have a GitHub icon

4. **Pull Changes from GitHub**
   Option A: Three-dot menu
   - Click the **3 dots (⋮)** next to your theme
   - Select **"Pull from version control"** or **"Update from GitHub"**
   
   Option B: Theme actions
   - Click **"Actions"** dropdown
   - Select **"Pull changes from repository"**

5. **Confirm the Pull**
   - Shopify will show you the changes to be pulled
   - latest commit: `8a7e9c4 - fix: make description section visible by default`
   - Click **"Pull"** or **"Confirm"**

6. **Wait for Sync** (10-30 seconds)
   - Green checkmark = success!

7. **Verify Changes**
   - Open any product page on your store
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - You should see:
     ✅ Specifications in right column (below quote button)
     ✅ Description section below product grid

---

## What Changed (Commit: 8a7e9c4)

### Files Modified:
- `sections/main-product.liquid` (238 lines changed)
- `snippets/product-metadata.liquid` (created earlier)

### Changes:
1. **Specifications Location**
   - FROM: Below description (in centered section)
   - TO: Right column, below Get A Quote button

2. **Description Section**
   - Moved to centered section below product grid
   - Larger default fonts: 36px title, 18px text
  - Full customization in theme editor
   - Brand green border under title

3. **Visibility Fix**
   - Changed condition to show by default
   - Works immediately without theme editor configuration

---

## Alternative: If No GitHub Integration

If you don't see GitHub/version control options:

### Option 1: Re-connect GitHub
1. Go to **Apps and sales channels**
2. Look for **GitHub** app
3. Re-authorize if needed

### Option 2: Shopify CLI
```bash
cd /path/to/theme
shopify theme pull
shopify theme push
```

### Option 3: Manual File Upload (Last Resort)
1. Download `sections/main-product.liquid` from your GitHub repo
2. In Shopify: Online Store → Themes → Actions → Edit code
3. Find `sections/main-product.liquid`
4. Replace content with GitHub version
5. Click "Save"

---

## After Syncing Successfully:

### Customize Description Section:
1. Go to **Theme Editor**
2. Open any **Product Page**
3. Click the product section
4. Scroll to **"Product Description Section"** settings
5. Adjust:
   - Title size (currently 36px)
   - Text size (currently 18px)
   - Colors, alignment, borders
   - Spacing and layout

---

## Need Help?

If you still don't see the changes after manual pull:
1. Check commit on GitHub: https://github.com/engrhammadkhurshid/GreenLeafSupplies-ShopifyTheme/commit/8a7e9c4
2. Verify you're pulling to the CORRECT theme (live vs development)
3. Clear Shopify cache: Theme → Actions → Clear cache

---

**Last Commit:** `8a7e9c4`  
**Date:** 2026-01-04 01:37:24 +05:00  
**Status:** ✅ Pushed to GitHub, waiting for Shopify sync
