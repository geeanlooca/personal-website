# manim-web Animation Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `animations/gmanim/` from an empty Python/uv project into a TypeScript/Vite project using `manim-web`, producing a `homepage-hero` animation that replaces the SVG on the 11ty site homepage.

**Architecture:** Each animation is a standalone TypeScript scene bundled by Vite into a self-contained HTML page in `dist/<name>/index.html`. These are copied into the 11ty output via passthrough copy and embedded with a Nunjucks `manim` shortcode.

**Tech Stack:** TypeScript, Vite, manim-web (npm), Eleventy (11ty) v3, Nunjucks

## Global Constraints

- **No Python.** Remove `pyproject.toml`, `.python-version`, and Python source files.
- **No video files.** All output is HTML/JS/Canvas.
- **Keep 11ty simple.** Use existing passthrough copy and shortcodes only.
- **One animation per HTML page.** Vite outputs `dist/<name>/index.html`.
- **Theme via URL param.** Iframe src includes `?theme=dark` or `?theme=light`.
- **Node 20** enforced by `.nvmrc` and CI.

---

### Task 1: Remove Python scaffolding from `animations/gmanim/`

**Files:**
- Delete: `animations/gmanim/pyproject.toml`
- Delete: `animations/gmanim/.python-version`
- Delete: `animations/gmanim/src/gmanim/__init__.py`
- Delete: `animations/gmanim/src/gmanim/` (empty directory)
- Delete: `animations/gmanim/src/` (empty directory)
- Delete: `animations/gmanim/README.md`

**Interfaces:**
- Consumes: Nothing
- Produces: Empty `animations/gmanim/` directory ready for npm project

- [ ] **Step 1: Delete all Python files**

```bash
rm -rf animations/gmanim/pyproject.toml
rm -rf animations/gmanim/.python-version
rm -rf animations/gmanim/src/
rm -rf animations/gmanim/README.md
```

- [ ] **Step 2: Verify directory is empty**

Run: `ls -la animations/gmanim/`
Expected: Only `.` and `..` remain.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(animations): remove python/uv scaffolding"
```

---

### Task 2: Initialize npm project and install dependencies

**Files:**
- Create: `animations/gmanim/package.json`
- Create: `animations/gmanim/.gitignore`

**Interfaces:**
- Consumes: Nothing
- Produces: npm project with `manim-web` and `vite` dependencies

- [ ] **Step 1: Create package.json**

```json
{
  "name": "gmanim",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "manim-web": "^0.3.23"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```
dist/
node_modules/
*.log
```

- [ ] **Step 3: Install dependencies**

Run: `cd animations/gmanim && npm install`
Expected: `node_modules/` created, no errors.

- [ ] **Step 4: Commit**

```bash
git add animations/gmanim/package.json animations/gmanim/.gitignore
git commit -m "chore(animations): init npm project with manim-web and vite"
```

---

### Task 3: Configure Vite and TypeScript

**Files:**
- Create: `animations/gmanim/vite.config.ts`
- Create: `animations/gmanim/tsconfig.json`

**Interfaces:**
- Consumes: `package.json` from Task 2
- Produces: Vite multi-page build config, TypeScript compiler config

- [ ] **Step 1: Create vite.config.ts**

```typescript
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'homepage-hero': resolve(__dirname, 'src/pages/homepage-hero.html'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          return `assets/[name]-[hash].js`;
        },
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash][extname]`,
      },
    },
  },
});
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 3: Verify Vite config loads**

Run: `cd animations/gmanim && npx vite --version`
Expected: Prints Vite version (e.g., `6.x.x`).

- [ ] **Step 4: Commit**

```bash
git add animations/gmanim/vite.config.ts animations/gmanim/tsconfig.json
git commit -m "chore(animations): add vite and typescript configs"
```

---

### Task 4: Write the homepage-hero scene

**Files:**
- Create: `animations/gmanim/src/scenes/homepage-hero.ts`
- Create: `animations/gmanim/src/pages/homepage-hero.html`

**Interfaces:**
- Consumes: `manim-web` library (installed in Task 2)
- Produces: Scene module `homepageHero`, HTML entry point `homepage-hero.html`

- [ ] **Step 1: Create the scene module**

```typescript
// src/scenes/homepage-hero.ts
import {
  Scene,
  Dot,
  Circle,
  Create,
  FadeOut,
  GrowFromCenter,
  AnimationGroup,
  Wait,
} from 'manim-web';

export async function homepageHero(scene: Scene) {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme') || 'dark';

  // Set background based on theme
  const bgColor = theme === 'light' ? '#ffffff' : '#0d1117';
  scene.view.style.backgroundColor = bgColor;

  const dot = new Dot({ radius: 0.08 });
  await scene.play(new Create(dot));

  const circles: Circle[] = [];
  for (let i = 0; i < 3; i++) {
    const circle = new Circle({
      radius: 0.15 + i * 0.25,
      color: theme === 'light' ? '#6b7280' : '#8b949e',
      strokeWidth: 0.01,
    });
    circles.push(circle);
  }

  // Loop the animation
  while (true) {
    const anims = circles.map((c) => new GrowFromCenter(c));
    const fadeOuts = circles.map((c) => new FadeOut(c));

    await scene.play(
      new AnimationGroup(anims, {
        lagRatio: 0.3,
        runTime: 2,
      })
    );

    await scene.play(
      new AnimationGroup(fadeOuts, {
        lagRatio: 0,
        runTime: 1,
      })
    );

    // Small pause before next cycle
    await scene.play(new Wait(0.5));
  }
}
```

- [ ] **Step 2: Create the HTML entry point**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homepage Hero Animation</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: transparent;
    }
    #container {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <div id="container"></div>
  <script type="module">
    import { Scene } from 'manim-web';
    import { homepageHero } from '../scenes/homepage-hero.ts';

    const container = document.getElementById('container');
    const options = { width: 400, height: 80 };
    const scene = new Scene(container, options);
    homepageHero(scene);
  </script>
</body>
</html>
```

- [ ] **Step 3: Verify scene compiles in dev mode**

Run: `cd animations/gmanim && npx vite build 2>&1 | head -n 30`
Expected: Build completes without TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add animations/gmanim/src/
git commit -m "feat(animations): add homepage-hero scene with manim-web"
```

---

### Task 5: Configure Vite output directory structure

**Files:**
- Modify: `animations/gmanim/vite.config.ts`

**Interfaces:**
- Consumes: `vite.config.ts` from Task 3
- Produces: Updated config that outputs each page to `dist/<name>/index.html`

The current Vite config uses `rollupOptions.input` but does not control the HTML output directory structure. We need each page to output to `dist/<page-name>/index.html` so the 11ty shortcode can reference `/animations/<name>/index.html`.

- [ ] **Step 1: Update vite.config.ts**

Replace the config with:

```typescript
import { resolve } from 'path';
import { defineConfig } from 'vite';

const pages = {
  'homepage-hero': resolve(__dirname, 'src/pages/homepage-hero.html'),
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: pages,
      output: {
        entryFileNames: (chunkInfo) => {
          const pageName = Object.keys(pages).find(key =>
            chunkInfo.name === key || chunkInfo.facadeModuleId?.includes(`/${key}.html`)
          );
          const prefix = pageName ? `${pageName}/` : '';
          return `${prefix}assets/[name]-[hash].js`;
        },
        chunkFileNames: (chunkInfo) => {
          const pageName = Object.keys(pages).find(key =>
            chunkInfo.facadeModuleId?.includes(`/${key}.html`)
          );
          const prefix = pageName ? `${pageName}/` : '';
          return `${prefix}assets/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const pageName = Object.keys(pages).find(key =>
            assetInfo.originalFileNames?.some((f: string) => f.includes(`/${key}.html`))
          );
          const prefix = pageName ? `${pageName}/` : '';
          return `${prefix}assets/[name]-[hash][extname]`;
        },
      },
    },
  },
});
```

Wait — Vite's multi-page build with `rollupOptions.input` automatically outputs each input to a file with the same name as the key. So `homepage-hero` → `dist/homepage-hero.html`. We need it at `dist/homepage-hero/index.html`.

A simpler approach: use a Vite plugin or a post-build step. Let's use a post-build step (npm script) or a simple Vite plugin.

Actually, the cleanest way without a custom plugin: configure the input to already be `homepage-hero/index.html` by creating `src/pages/homepage-hero/index.html` and pointing Vite at it.

Let me adjust Task 4 and 5:

- Move `src/pages/homepage-hero.html` to `src/pages/homepage-hero/index.html`
- Update `vite.config.ts` input to point to the new path
- Vite will then output `dist/homepage-hero/index.html` automatically

- [ ] **Step 1: Reorganize pages directory**

```bash
mkdir -p animations/gmanim/src/pages/homepage-hero
mv animations/gmanim/src/pages/homepage-hero.html animations/gmanim/src/pages/homepage-hero/index.html
```

- [ ] **Step 2: Update vite.config.ts**

```typescript
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'homepage-hero': resolve(__dirname, 'src/pages/homepage-hero/index.html'),
      },
    },
  },
});
```

- [ ] **Step 3: Build and verify directory structure**

Run: `cd animations/gmanim && npx vite build`
Expected: `dist/homepage-hero/index.html` exists.

Verify: `ls -la animations/gmanim/dist/homepage-hero/`
Expected: `index.html` and an `assets/` subdirectory.

- [ ] **Step 4: Commit**

```bash
git add animations/gmanim/vite.config.ts
rm -rf animations/gmanim/src/pages/homepage-hero.html  # already moved
# The move is tracked as rename if we add the new path
git add animations/gmanim/src/pages/homepage-hero/
git commit -m "chore(animations): restructure pages for vite multi-page output"
```

---

### Task 6: Add 11ty passthrough copy and shortcode

**Files:**
- Modify: `.eleventy.js`
- Modify: `src/index.md`

**Interfaces:**
- Consumes: `dist/homepage-hero/` from Task 5
- Produces: `manim` shortcode, passthrough copy rule

- [ ] **Step 1: Update .eleventy.js**

Read the current file first, then modify:

Add after the existing passthrough copies:

```js
eleventyConfig.addPassthroughCopy({
  "./animations/gmanim/dist": "animations"
});
```

Add the shortcode after the `cssVersion` shortcode:

```js
eleventyConfig.addShortcode("manim", function(name, width, height) {
  const theme = this.ctx?.theme || "dark";
  return `<iframe src="/animations/${name}/index.html?theme=${theme}" width="${width}" height="${height}" frameborder="0" style="display:block;margin:0 auto;" scrolling="no" allowfullscreen></iframe>`;
});
```

- [ ] **Step 2: Update src/index.md**

Replace the SVG `<div class="graphic wide">` block with:

```markdown
<div class="graphic wide">
  {% manim "homepage-hero", 400, 80 %}
</div>
```

Keep the `.graphic.wide` CSS class for consistent styling.

- [ ] **Step 3: Verify build succeeds**

Run:
```bash
cd animations/gmanim && npm run build
cd ../..
npm run build
```

Expected: `public/animations/homepage-hero/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add .eleventy.js src/index.md
git commit -m "feat(site): add manim passthrough copy and shortcode, replace svg with animation"
```

---

### Task 7: Add root-level build script and documentation

**Files:**
- Modify: `package.json` (root)
- Create: `animations/gmanim/README.md`

**Interfaces:**
- Consumes: `animations/gmanim` npm project, root 11ty project
- Produces: Unified build command, developer documentation

- [ ] **Step 1: Add build:all script to root package.json**

Read `package.json` at the root, then add:

```json
"scripts": {
  ...existing scripts...,
  "build:all": "cd animations/gmanim && npm run build && cd ../.. && npm run build"
}
```

- [ ] **Step 2: Create animations/gmanim/README.md**

```markdown
# gmanim

Mathematical animations for [gianlucamarcon.com](https://gianlucamarcon.com), built with [manim-web](https://github.com/maloyan/manim-web).

## Quick Start

```bash
cd animations/gmanim
npm install
npm run dev        # Start Vite dev server for preview
npm run build      # Build all animations to dist/
```

## Writing an Animation

1. Create a scene module in `src/scenes/<name>.ts`:

```typescript
import { Scene, Circle, Create } from 'manim-web';

export async function myScene(scene: Scene) {
  const circle = new Circle({ radius: 1 });
  await scene.play(new Create(circle));
}
```

2. Create an entry HTML page at `src/pages/<name>/index.html`:

```html
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>My Animation</title></head>
<body>
  <div id="container"></div>
  <script type="module">
    import { Scene } from 'manim-web';
    import { myScene } from '../../scenes/<name>.ts';
    const scene = new Scene(document.getElementById('container'), { width: 800, height: 450 });
    myScene(scene);
  </script>
</body>
</html>
```

3. Register the page in `vite.config.ts`:

```typescript
input: {
  'homepage-hero': resolve(__dirname, 'src/pages/homepage-hero/index.html'),
  'my-animation': resolve(__dirname, 'src/pages/my-animation/index.html'),
}
```

4. Build: `npm run build`

5. The animation is now available at `/animations/<name>/index.html` on the site.

## Embedding in the Site

Use the `manim` shortcode in any Markdown or Nunjucks file:

```markdown
{% manim "my-animation", 800, 450 %}
```

The `theme` query parameter is automatically appended (`?theme=dark` or `?theme=light`). Read it inside your scene to adapt colors:

```typescript
const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') || 'dark';
```

## Theme Support

The site passes the current theme via `?theme=` query parameter. Scenes should read this and set their background/colors accordingly. The default is `dark`.

## Building for Production

From the repository root:

```bash
npm run build:all
```

This builds the animations first, then the 11ty site, copying `dist/` into `public/animations/`.
```

- [ ] **Step 3: Verify build:all works**

Run: `npm run build:all`
Expected: Both animation build and 11ty build succeed. `public/animations/homepage-hero/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add package.json animations/gmanim/README.md
git commit -m "docs(animations): add readme and root build:all script"
```

---

## Self-Review

**1. Spec coverage:**
- Remove Python scaffolding → Task 1 ✓
- npm/Vite project setup → Tasks 2, 3, 5 ✓
- manim-web dependency → Task 2 ✓
- homepage-hero scene → Task 4 ✓
- Vite multi-page output with directory structure → Task 5 ✓
- 11ty passthrough copy → Task 6 ✓
- Nunjucks shortcode → Task 6 ✓
- Replace SVG in index.md → Task 6 ✓
- Theme support via URL param → Task 4 (scene reads param), Task 6 (shortcode appends it) ✓
- README with instructions → Task 7 ✓

**2. Placeholder scan:** No TBDs, TODOs, or vague steps. All code is provided.

**3. Type consistency:** `manim` shortcode uses `name, width, height` consistently. Scene export is `homepageHero(scene: Scene)` throughout.

---

**Plan complete and saved to `docs/superpowers/plans/2026-07-10-manim-web-animation-integration.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
