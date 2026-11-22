# Design System Foundation - SimJeongBin Portfolio

This document records the design tokens extracted directly from the Figma project via the Figma MCP server.

**Source Figma File:** [portfolio-SimJeongBin (Node 25:3)](https://www.figma.com/design/4aAExvYrZOXUnc3Pc53vM0/portfolio-SimJeongBin?node-id=25-3)  
**Extraction Timestamp:** 2026-10-24  
**CSS Implementation:** [`src/styles/tokens.css`](file:///c:/portfolio-SimJeongBin/src/styles/tokens.css)

---

## 1. Verified Color Variables

These color tokens are registered as official variables in the Figma document.

| Figma Variable Name | Hex Code | RGBA Equivalent | Usage in Design |
| :--- | :--- | :--- | :--- |
| `black/0` | `#ffffff` | `rgba(255, 255, 255, 1)` | Canvas background |
| `black/200` | `#b3b3b3` | `rgba(179, 179, 179, 1)` | Index number markers (`01`, `02`, etc.) |
| `black/300` | `#8e8e8e` | `rgba(142, 142, 142, 1)` | Project names in index, metadata year labels (`2026`) |
| `black/800` | `#1a1a1a` | `rgba(26, 26, 26, 1)` | Primary typography, borders, section titles |

---

## 2. Verified Typography Tokens (Registered Variables)

These typography styles are registered as named font variables in the Figma document. All registered styles use the `Pretendard` typeface.

| Figma Style Name | Font Family | Style / Weight | Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `xsmall: Regular` | `Pretendard` | Regular (400) | `13px` | `1.4` (139.99%) | `-3%` (`-0.39px`) |
| `xsmall: Regular_M` | `Pretendard` | Medium (500) | `13px` | `1.4` (139.99%) | `-3%` (`-0.39px`) |
| `small: Regular` | `Pretendard` | Regular (400) | `16px` | `1.4` (139.99%) | `-3%` (`-0.48px`) |
| `regular: Regular_M` | `Pretendard` | Medium (500) | `20px` | `1.4` (139.99%) | `-3%` (`-0.60px`) |
| `regular: Regular_B` | `Pretendard` | SemiBold (600) | `20px` | `1.4` (139.99%) | `-3%` (`-0.60px`) |
| `large: Medium`* | `Pretendard` | Medium (500) | `39px` | `1.2` (120.00%) | `-3%` (`-1.17px`) |

*\*Note: `large: Medium` is registered in the page definitions (attached to canvas memo `38:2`), but not directly applied within frame `25:3`.*

---

## 3. Verified Layout Text Styles (Unbound / Direct Layer Styles)

The following styles appear on text elements within node `25:3`, but are applied directly to the layers rather than linked to a registered Figma typography variable.

| Element | Node ID | Font Family | Weight | Size | Line Height | Letter Spacing | Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Header Brand (`SimJeongBin`) | `28:3` | `Syne` | ExtraBold (800) | `20px` | `1.2` (120%) | `-2%` (`-0.40px`) | `black/800` (`#1a1a1a`) |
| Footer Button (`BACK TO TOP`) | `59:10` | `Syne` | ExtraBold (800) | `16px` | `1.2` (120%) | `-2%` (`-0.32px`) | `black/800` (`#1a1a1a`) |

---

## 4. Unverified / Missing Tokens

The following design attributes are present in the design node `25:3` but **have no published Figma design tokens**:

1. **Placeholder Fill (`#d9d9d9`)**: Used across card preview containers (e.g. `31:2765`), not mapped to any `black/*` variable.
2. **Spacing & Layout**: Paddings (`80px`, `20px`), gaps (`100px`, `20px`, `4px`), and position offsets are hardcoded layout values. No spacing token variables exist in the Figma file.
3. **Border Radius**: Card corner radii (`60px`) are hardcoded directly on the shapes without a token definition.
4. **Elevation / Shadow Tokens**: No shadow styles or elevation variables exist in the file.
