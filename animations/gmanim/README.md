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
