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
