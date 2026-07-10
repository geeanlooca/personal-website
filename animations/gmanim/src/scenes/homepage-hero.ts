import {
  Scene,
  Dot,
  Circle,
  Create,
  FadeOut,
  GrowFromCenter,
  AnimationGroup,
} from 'manim-web';

export async function homepageHero(scene: Scene) {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme') || 'dark';

  // Set background based on theme
  const bgColor = theme === 'light' ? '#ffffff' : '#0d1117';
  scene.renderer.getCanvas().style.backgroundColor = bgColor;

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
    const anims = circles.map((c) => new GrowFromCenter(c, { duration: 2 }));
    const fadeOuts = circles.map((c) => new FadeOut(c, { duration: 1 }));

    await scene.play(
      new AnimationGroup(anims, {
        lagRatio: 0.3,
      })
    );

    await scene.play(
      new AnimationGroup(fadeOuts, {
        lagRatio: 0,
      })
    );

    // Small pause before next cycle
    await scene.wait(0.5);
  }
}
