# Graphics Design Spec — gianlucamarcon.com

**Date:** 2026-07-10  
**Topic:** Minimal optics-themed SVG graphics for personal website  
**Status:** Approved by user

---

## Overview

Add subtle, tasteful, theme-aware SVG graphics to each page of gianlucamarcon.com. All graphics are inline SVG styled via CSS custom properties. No JavaScript for rendering — CSS `@keyframes` for animation only. `prefers-reduced-motion` respected.

Two visual languages coexist:
1. **"Me" pages** (Home, Résumé, Publications, Contacts, Notes): Unified wavefront / physics aesthetic.
2. **Projects page**: Project-specific literal iconography as small inline accents.

---

## Technical Rules

- **Inline SVG only** — no external image files.
- **Theme-aware** — colors use CSS custom properties (`--accent-color`, `--color-muted`, etc.).
- **No JS** for graphics rendering or animation.
- **CSS animations** via `@keyframes` where motion adds meaning.
- **`prefers-reduced-motion: reduce`** disables all animations.
- **Responsive** — wide graphics scale down gracefully; inline graphics become block elements on narrow viewports.

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.graphic` | Base wrapper: `display:block; margin:2rem auto; max-width:100%;` |
| `.graphic.wide` | Page-level graphic: `max-width:520px;` |
| `.graphic.inline-r` | Float right beside text: `float:right; margin:0 0 1rem 1.5rem; width:140px;` |
| `.graphic.inline-l` | Float left beside text: `float:left; margin:0 1.5rem 1rem 0; width:140px;` |
| `.graphic svg` | `width:100%; height:auto; display:block;` |
| `.graphic .stroke-accent` | `stroke:var(--accent-color);` |
| `.graphic .stroke-muted` | `stroke:var(--color-muted);` |
| `.graphic .fill-accent` | `fill:var(--accent-color);` |
| `.graphic-label` | Small caption below graphic (optional) |

Responsive rule (add to `style.css`):
```css
@media (max-width: 768px) {
  .graphic.inline-r, .graphic.inline-l {
    float: none;
    margin: 1.5rem auto;
    width: 180px;
  }
}
```

---

## Per-Page Graphics

### Home (`/`)

**Placement:** After `<h1>`, before welcome paragraph.  
**Size:** `.graphic.wide`

**Concept:** Point source emitting circular wavefronts. A small bright dot at center, surrounded by 3–4 expanding rings at low opacity.

**Animation:** Rings expand and fade. 4s infinite cycle, staggered delays.

**SVG structure:**
- `<circle>` center dot, `r="4"`, `.fill-accent`
- 3 `<circle>` rings around center, `stroke="var(--color-muted)"`, low opacity, expanding via CSS `animation: signal-radiate`

---

### Résumé (`/resume/`)

**Placement:** Below `<h1>`, before "Contact me" paragraph.  
**Size:** `.graphic.wide`

**Concept:** Propagating wave packet. A carrier sine wave with a Gaussian amplitude envelope. Small accent dots on the carrier mark key milestones (PhD start, industry, etc.). The envelope subtly changes width along the path to suggest career phases.

**Animation:** The packet drifts slowly to the right. Dots pulse gently with staggered delays.

**SVG structure:**
- A `<path>` for the envelope (two mirrored Gaussian curves, or a filled shape with opacity)
- A `<path>` for the carrier wave clipped to the envelope region
- 3–4 `<circle>` milestone dots along the wave

---

### Publications (`/publications/`)

**Placement:** Below `<h1>`, before Theses section.  
**Size:** `.graphic.wide`

**Concept:** Raman scattering. Incoming wave train from left impinges on a central molecule node. Outgoing: Stokes wave (wider wavelength, diverging downward-left), Anti-Stokes wave (tighter wavelength, diverging upward-left), Rayleigh component continuing straight through.

**Animation:**
- Incoming wave drifts continuously left-to-right via `transform: translateX()` or `stroke-dashoffset`.
- Outgoing waves emanate from molecule via expanding arc patterns.
- Molecule node vibrates very subtly.

**SVG structure:**
- `<path>` incoming wave train (3–4 cycles)
- `<g>` molecule: central `<circle>` + 4–6 short radial `<line>`s (spring-like)
- `<path>` Stokes wave (fewer cycles, wider amplitude envelope, diverging path)
- `<path>` Anti-Stokes wave (more cycles, tighter, diverging path)
- `<path>` Rayleigh continuation (same wavelength as incoming, straight)

---

### Contacts (`/contacts/`)

**Placement:** Before the centered email/GitHub/LinkedIn line.  
**Size:** `.graphic.wide`

**Concept:** Two point sources separated horizontally, emitting circular wavefronts that interfere. Overlap regions (constructive interference) use accent color; non-overlap regions use muted color.

**Animation:** Wavefronts expand outward. Continuous 3s cycle, staggered.

**SVG structure:**
- 2 `<circle>` source dots
- 3 `<circle>` rings from left source (`.stroke-muted`, then `.stroke-accent` where overlapping)
- 3 `<circle>` rings from right source
- Overlap regions: can be simulated by drawing accent-colored arcs only in the central overlap band, or by using opacity blending.

Simpler approach: draw all rings in muted color, then draw a central accent-colored wavefront arc where they overlap.

---

### Notes (`/notes/`)

**Placement:** After `<h1>`, before "No posts yet."  
**Size:** `.graphic.wide`

**Concept:** Single horizontal standing wave — a sine curve with fixed nodes. Very minimal.

**Animation:** None (static). Optionally antinodes pulse opacity very gently (0.5 → 0.8, 6s cycle).

**SVG structure:**
- One `<path>` sine wave, `stroke="var(--accent-color)"`, `opacity="0.6"`

---

### Projects (`/projects/`)

Each project gets an inline graphic. Placement and size per project:

#### SDM solver — `inline-r`

**Concept:** Vector field mode profile. A small grid of arrows arranged in a circular (LP-mode-like) pattern. Arrows point tangentially or radially depending on mode, and slowly rotate.

**Animation:** All arrows rotate 360° over 20s.

**SVG structure:**
- `<circle>` outer boundary (muted)
- Grid of `<line>` arrows (say 5×5) with `<polygon>` arrowheads, arranged to show a vortex or dipole pattern
- CSS `transform: rotate()` on a `<g>` wrapper

#### PyNLIN — `wide` (above project heading)

**Concept:** Pulse temporal evolution. Three Gaussian pulses in sequence showing nonlinear broadening.

**Animation:** A fourth pulse in the middle cycles through the broadening sequence (narrow → distorted), 4s infinite.

**SVG structure:**
- `<line>` baseline (muted)
- `<path>` Pulse 1: narrow symmetric Gaussian
- `<path>` Pulse 2: slightly broadened
- `<path>` Pulse 3: broad with oscillatory shoulders
- `<path>` Animated pulse (same geometry as #2, cycling)

#### LastTip — `inline-l`

**Concept:** Minimal turntable. Top-down view: circular record with tonearm.

**Animation:** Record `<g>` rotates very slowly (20s per revolution).

**SVG structure:**
- `<circle>` record base
- `<circle>` label area (inner)
- `<path>` tonearm (angled line with small headshell rectangle)
- Optional: tiny `<path>` waveform in the grooves area

#### Turbo Codes — `inline-r`

**Concept:** Satellite downlink. Small satellite body with solar panels, three dashed beams angling down to a ground station dish. Signal dashes flow down beams.

**Animation:** `stroke-dashoffset` animation on beams creates flowing signal effect.

**SVG structure:**
- `<rect>` satellite body
- `<rect>` left & right solar panels
- `<path>` 3 dashed beams to ground
- `<path>` ground station dish (arc + mast)
- `<circle>` ground station dot

#### WSN simulator — `inline-l`

**Concept:** Antenna radiation pattern. Vertical antenna element with expanding concentric rings.

**Animation:** Concentric rings expand outward from antenna top, 2.5s cycle, staggered.

**SVG structure:**
- `<line>` antenna mast (muted)
- `<path>` antenna top element (accent)
- 3 `<circle>` radiating rings from antenna tip
- `<line>` ground line (muted)

---

## Animation Definitions (CSS)

Add these `@keyframes` to `style.css`:

```css
@keyframes signal-radiate {
  0% { r: 4; opacity: 0.9; }
  100% { r: 28; opacity: 0; }
}

@keyframes wave-drift {
  0% { transform: translateX(0); }
  100% { transform: translateX(-40px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; r: 3; }
  50% { opacity: 1; r: 5; }
}

@keyframes pulse-broaden {
  0% { transform: scaleX(0.3); opacity: 0.8; }
  50% { transform: scaleX(1.5); opacity: 0.3; }
  100% { transform: scaleX(3); opacity: 0; }
}

@keyframes audio-bounce {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}

@keyframes dash-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes mode-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.9; }
}
```

And animation class utilities:
```css
.anim-pulse-dot { animation: pulse-glow 2.5s ease-in-out infinite; }
.anim-wave-drift { animation: wave-drift 6s linear infinite; }
.anim-signal-ring-1 { animation: signal-radiate 3s ease-out infinite; }
.anim-signal-ring-2 { animation: signal-radiate 3s ease-out infinite; animation-delay: 1s; }
.anim-signal-ring-3 { animation: signal-radiate 3s ease-out infinite; animation-delay: 2s; }
.anim-pulse-broaden { animation: pulse-broaden 4s ease-out infinite; transform-origin: center; }
.anim-dash-flow { animation: dash-flow 2s linear infinite; }
.anim-float { animation: float-gentle 4s ease-in-out infinite; }
.anim-spin { animation: spin-slow 20s linear infinite; }
.anim-mode-1 { animation: mode-pulse 3s ease-in-out infinite; }
.anim-mode-2 { animation: mode-pulse 3s ease-in-out infinite; animation-delay: 1s; }
.anim-mode-3 { animation: mode-pulse 3s ease-in-out infinite; animation-delay: 2s; }
```

Reduced-motion override:
```css
@media (prefers-reduced-motion: reduce) {
  .anim-pulse-dot, .anim-wave-drift, .anim-signal-ring-1, .anim-signal-ring-2, .anim-signal-ring-3,
  .anim-pulse-broaden, .anim-dash-flow, .anim-float, .anim-spin,
  .anim-mode-1, .anim-mode-2, .anim-mode-3 { animation: none !important; }
}
```

---

## Integration Plan

1. **Draft previews:** Create standalone HTML files in `/workspace/graphics-draft/` so user can preview each graphic in browser with live theming.
2. **CSS addition:** Append `.graphic` styles and `@keyframes` to `src/css/style.css`.
3. **Template/markdown updates:** Insert SVG markup into relevant `.md` files. Because Markdown allows inline HTML, SVG can be embedded directly in the `.md` front matter or body.
4. **Build verification:** Run `npm run build` and check that graphics render correctly in `public/` output.

---

## Save Location

Draft previews: `/workspace/graphics-draft/`  
Final integration: `src/` (CSS, templates, markdown pages)

---

## Notes

- The Raman scattering graphic is the most complex. It should be the centerpiece of the Publications page.
- The vector field mode profile (SDM solver) is experimental and may need refinement if the small size makes arrows illegible.
- All graphics should feel "quiet" — they are accents, not centerpieces. Opacity values should generally stay below 0.8 except for focal points.
