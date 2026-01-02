# Product Metadata Implementation Guide

## Overview

This guide explains how to implement and use the custom product metadata system for Green Leaf Supplies products based on the product metadata specifications.

---

## Table of Contents

1. [Metafield Definitions](#metafield-definitions)
2. [Setting Up Metafields](#setting-up-metafields)
3. [Product Categories & Subcategories](#product-categories--subcategories)
4. [Variant Options](#variant-options)
5. [Importing Products](#importing-products)
6. [Theme Integration](#theme-integration)
7. [Examples](#examples)

---

## Metafield Definitions

### Custom Metafields Created

| Metafield | Namespace | Key | Type | Description |
|-----------|-----------|-----|------|-------------|
| Material | `custom` | `material` | Single line text | Product material composition |
| Weight (Approx.) | `custom` | `weight_approx` | Single line text | Approximate weight per unit |
| Case Count | `custom` | `case_count` | Single line text | Number of pieces per case |
| Features | `custom` | `features` | Multi-line text | Product features (one per line) |
| Product Category | `custom` | `category` | Single line text | Main category |
| Product Subcategory | `custom` | `subcategory` | Single line text | Subcategory |

---

## Setting Up Metafields

### Method 1: Via Shopify Admin (Recommended)

1. Go to **Shopify Admin → Settings → Custom data → Products**
2. Click **"Add definition"**
3. Fill in the details for each metafield:

#### Material
- **Name:** Material
- **Namespace and key:** `custom.material`
- **Type:** Single line text
- **Description:** Product material composition (e.g., 100% Sugarcane Bagasse, MFPP)

#### Weight (Approx.)
- **Name:** Weight (Approx.)
- **Namespace and key:** `custom.weight_approx`
- **Type:** Single line text
- **Description:** Approximate weight per unit (e.g., 20–35 g per unit)

#### Case Count
- **Name:** Case Count
- **Namespace and key:** `custom.case_count`
- **Type:** Single line text
- **Description:** Number of pieces per case (e.g., 200 / 400 / 500 pcs per case)

#### Features
- **Name:** Features
- **Namespace and key:** `custom.features`
- **Type:** Multi-line text
- **Description:** Product features and benefits (one per line)
- **Example:**
  ```
  Microwave safe
  Hot & cold food
  Oil & water resistant
  Compostable
  ```

#### Product Category
- **Name:** Product Category
- **Namespace and key:** `custom.category`
- **Type:** Single line text
- **Description:** Main product category

#### Product Subcategory
- **Name:** Product Subcategory
- **Namespace and key:** `custom.subcategory`
- **Type:** Single line text
- **Description:** Product subcategory

---

## Product Categories & Subcategories

### 1. Food Packaging
- **Sugarcane Bagasse Food Container**
  - Material: 100% Sugarcane Bagasse (Compostable)
  - Variants: Size, Compartments, Color
  
- **MFPP Food Container**
  - Material: Mineral-Filled Polypropylene (MFPP)
  - Variants: Size, Compartments, Color
  
- **Aluminum Foil Container**
  - Material: Food-Grade Aluminum Foil
  - Variants: Size, Shape, Color

### 2. Disposable Tableware
- **Disposable Plates**
  - Materials: Sugarcane Bagasse / Paper / PP Plastic
  - Variants: Size, Color
  
- **Disposable Bowls**
  - Materials: Bagasse / PP Plastic
  - Variants: Capacity, Color
  
- **Disposable Cups**
  - Materials: Paper + PE Coating / PP Plastic
  - Variants: Capacity, Color
  
- **Disposable Cutlery**
  - Materials: PP Plastic / Wooden / Bamboo
  - Variants: Type, Color

### 3. Napkin and Sanitary
- **Paper Napkins**
  - Material: Virgin Pulp / Recycled Paper
  - Variants: Ply, Size, Color
  
- **Wet Wipes**
  - Material: Non-Woven Fabric
  - Variants: Fragrance, Packaging
  
- **Paper Towels**
  - Material: Virgin / Recycled Paper
  - Variants: Ply, Fold

### 4. Food and Liquid
- **Paper Cups (Hot & Cold)**
  - Material: Paper + PE Coating
  - Variants: Capacity, Color
  
- **Soup Containers**
  - Materials: Bagasse / Paper / PP Plastic
  - Variants: Capacity, Color
  
- **Sauce Cups**
  - Material: PP Plastic
  - Variants: Capacity
  
- **Lids (Cup & Container)**
  - Materials: PP / PET Plastic
  - Variants: Type, Compatibility, Color

---

## Variant Options

Configure these variant options for your products:

### Size
`6×6"`, `7×5"`, `8×8"`, `9×6"`, `9×9"`, `6"`, `7"`, `9"`, `10"`

### Compartments
`1`, `2`, `3`

### Color
`Natural`, `White`, `Black`, `Clear`, `Kraft`, `Silver`, `Off-White`

### Capacity
`4 oz`, `8 oz`, `12 oz`, `16 oz`, `24 oz`, `450 ml`, `650 ml`, `750 ml`, `1000 ml`, `1 oz`, `2 oz`

### Ply
`1-Ply`, `2-Ply`, `3-Ply`

### Type
- **Cutlery:** `Fork`, `Spoon`, `Knife`
- **Lids:** `Flat Lid`, `Dome Lid`

### Shape
`Rectangle`, `Round`

### Fold (Paper Towels)
`C-Fold`, `Z-Fold`

### Packaging (Wet Wipes)
`Individual`, `Bulk Pack`

### Fragrance (Wet Wipes)
`Unscented`, `Lemon`, `Aloe`

---

## Importing Products

### Using the CSV Template

1. Open `docs/product-import-template.csv`
2. Review the example products
3. Add your products following the same format
4. Import via **Shopify Admin → Products → Import**

### Important CSV Columns for Metafields

- `Metafield: custom.material [single_line_text_field]`
- `Metafield: custom.weight_approx [single_line_text_field]`
- `Metafield: custom.case_count [single_line_text_field]`
- `Metafield: custom.features [multi_line_text_field]`
- `Metafield: custom.category [single_line_text_field]`
- `Metafield: custom.subcategory [single_line_text_field]`

### Metafield Format in CSV

- **Single line text:** Enter the value directly
- **Multi-line text:** Use line breaks within the cell (features separated by `\n` or actual line breaks in Excel)

---

## Theme Integration

### Automatic Display

The metadata is automatically displayed on product pages using the `product-metadata.liquid` snippet.

### Location

Metadata appears in the **Product Specifications** section below the product description.

### Styling

The metadata display includes:
- Icon-based labels
- Responsive grid layout
- Clean modern design matching your brand
- Mobile-optimized

### Customization

To customize the metadata display, edit:
```
snippets/product-metadata.liquid
```

---

## Examples

### Example 1: Sugarcane Bagasse Container

**Product Title:** Sugarcane Bagasse Food Container 6x6"

**Metafields:**
- Material: `100% Sugarcane Bagasse (Compostable)`
- Weight: `20–25 g per unit`
- Case Count: `200 pcs per case`
- Features:
  ```
  Microwave safe
  Hot & cold food
  Oil & water resistant
  Compostable
  ```
- Category: `Food Packaging`
- Subcategory: `Sugarcane Bagasse Food Container`

**Variants:**
- Size: 6×6"
- Compartments: 1, 2, 3
- Color: Natural

---

### Example 2: MFPP Food Container

**Product Title:** MFPP Food Container 9x6x2.36"

**Metafields:**
- Material: `Mineral-Filled Polypropylene (MFPP)`
- Weight: `35–40 g per unit`
- Case Count: `150 pcs per case`
- Features:
  ```
  Microwave safe
  Freezer safe
  Leak resistant
  ```
- Category: `Food Packaging`
- Subcategory: `MFPP Food Container`

**Variants:**
- Size: 9×6×2.36", 9×6×3", 10×8×3"
- Compartments: 1, 2
- Color: Black, White

---

### Example 3: Paper Cups

**Product Title:** Paper Cup 12oz - Kraft

**Metafields:**
- Material: `Paper + PE Coating`
- Weight: `10–12 g per cup`
- Case Count: `1000 pcs per case`
- Features:
  ```
  Hot & cold beverages
  Eco-friendly
  Leak resistant
  ```
- Category: `Food and Liquid`
- Subcategory: `Paper Cups (Hot & Cold)`

**Variants:**
- Capacity: 4 oz, 8 oz, 12 oz, 16 oz
- Color: White, Kraft

---

## Testing Checklist

- [ ] All 6 metafields created in Shopify Admin
- [ ] Test product created with all metafields filled
- [ ] Metadata displays correctly on product page
- [ ] Mobile view displays properly
- [ ] CSV import tested with sample data
- [ ] Variant options configured
- [ ] Collections created for each category

---

## Support & Maintenance

### Updating Metadata

To update metadata for existing products:
1. Go to **Products** in Shopify Admin
2. Select a product
3. Scroll to **Metafields** section
4. Update the custom fields

### Bulk Updates

For bulk updates, use:
1. **Export** your products to CSV
2. Update metafield columns
3. **Import** the updated CSV

---

## Additional Resources

- **Metafield Definitions:** `docs/metafield-definitions.json`
- **CSV Template:** `docs/product-import-template.csv`
- **Theme Snippet:** `snippets/product-metadata.liquid`
- **Shopify Metafields Guide:** https://help.shopify.com/en/manual/custom-data/metafields

---

## Questions?

If you encounter any issues:
1. Check that metafield definitions are correctly created
2. Verify metafield values are not blank
3. Clear theme cache and refresh the product page
4. Check browser console for any JavaScript errors

---

**Last Updated:** January 2, 2026
**Version:** 1.0.0
