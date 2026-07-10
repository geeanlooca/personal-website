# Design: manim-web Animation Integration

**Date:** 2026-07-10
**Status:** Approved

## Goal

Replace the static SVG hero animation on the homepage with a live, resolution-independent mathematical animation rendered in the browser using `manim-web`. Scaffold `animations/gmanim/` as a TypeScript/Vite project that produces standalone HTML pages embeddable in the 11ty static site.

## Context

The existing site is an Eleventy (11ty) v3 static site built with Nunjucks and Markdown, outputting to `public/`. The `animations/gmanim/` directory currently contains an empty Python/uv project. The user wants animations to be "directly HTML" (no rendered video files), so the Python/manim/manim-slides video-based approach is discarded in favor of `manim-web`, a TypeScript reimplementation of Manim that renders natively in the browser via Canvas/WebGL.

## Architecture

### Project Structure

```
animations/gmanim/
  package.json              # npm project, depends on manim-web
  vite.config.ts            # Multi-page build (one HTML per animation)
  tsconfig.json
  .gitignore
  README.md                 # How to write, build, preview, and embed
  src/
    scenes/
      homepage-hero.ts      # Reusable scene module
    pages/
      homepage-hero.html    # Entry HTML for this animation
  dist/                     # Build output (git-ignored)
                             # Vite configured to output each page as dist/<name>/index.html
```

### Build Workflow

1. **Write** a scene in `src/scenes/*.ts` using the manim-web API.
2. **Build** with `npm run build` → Vite bundles each `src/pages/*.html` entry into `dist/`.
3. **Copy** `dist/` into the 11ty site's output. This is done via an Eleventy passthrough copy pointing `animations/gmanim/dist/` → `public/animations/`.
4. **Embed** on any page with a Nunjucks shortcode: `{% manim "homepage-hero", 400, 80 %}`.

### Why iframe?

Each animation is a self-contained HTML page. Embedding via `<iframe>` isolates the Canvas/WebGL context and manim-web's styles from the parent 11ty page, avoiding CSS conflicts. The iframe receives the current site theme via a URL query parameter (`?theme=dark`), which the scene reads to set its background color.

### Theme Support

The site has an explicit dark/light toggle that writes to `localStorage` and sets `data-theme` on `<html>`. The `manim` Nunjucks shortcode will read `data-theme` (defaulting to `dark`) and append `?theme=<value>` to the iframe `src`. The scene's entry script reads this parameter and sets the Canvas background color accordingly.

## Example Animation: `homepage-hero`

Replaces the current SVG signal-radiate animation (three expanding rings around a central dot). The manim-web version:

- Creates a central `Dot` at the origin.
- Creates three `Circle` mobjects with increasing radii.
- Animates each circle with `GrowFromCenter` while fading opacity.
- Staggers the animations so they follow each other in a continuous loop.
- Background color adapts to the passed `theme` parameter.

## 11ty Integration

### Passthrough Copy

Add to `.eleventy.js`:

```js
eleventyConfig.addPassthroughCopy({
  "./animations/gmanim/dist": "animations"
});
```

### Shortcode

Add a `manim` shortcode to `.eleventy.js`:

```js
eleventyConfig.addShortcode("manim", function(name, width, height) {
  const theme = this.ctx?.theme || "dark";
  return `<iframe src="/animations/${name}/index.html?theme=${theme}" width="${width}" height="${height}" frameborder="0" style="display:block;margin:0 auto;" allowfullscreen></iframe>`;
});
```

> Note: The actual theme value may need to be passed differently depending on how 11ty handles context. A simpler approach is to omit the theme from the shortcode and have the iframe's internal JS detect `prefers-color-scheme` plus listen for `postMessage` from the parent. For the first version, we pass `?theme=dark` as a default and let the scene JS read it.

### Build Command

The site build becomes a two-step process:

```bash
cd animations/gmanim && npm run build
cd ../..
npm run build
```

This can be wrapped in a root-level npm script, e.g., `npm run build:all`.

## Constraints & Decisions

- **No Python.** The `gmanim` package is converted from Python/uv to TypeScript/npm. The `pyproject.toml`, `.python-version`, and Python source files are removed.
- **No video files.** All output is HTML/JS/Canvas. No MP4, WebM, or GIF files.
- **Keep 11ty simple.** No new templating languages. Use Nunjucks shortcodes and passthrough copy, which already exist in the project.
- **One animation per HTML page.** This keeps bundles small and allows independent previewing.
- **Vite for bundling.** Vite is the build tool recommended by manim-web and handles ES modules and TypeScript out of the box.
- **Theme via URL param.** The simplest reliable way to communicate the current theme into an iframe without complex `postMessage` setup for the first version.

## Future Extensions

- **Theme sync via `postMessage`:** If the user toggles theme while on the page, the parent could `postMessage` to the iframe to update background color dynamically.
- **Inline embedding:** Instead of iframes, bundle manim-web as an ES module and inject the Canvas directly into the DOM. This requires more careful CSS isolation but eliminates iframe overhead.
- **Python-to-TypeScript converter:** Use manim-web's `tools/py2ts.cjs` to migrate any existing Python manim scripts.
