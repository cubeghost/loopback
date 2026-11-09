const effectThumbnails = import.meta.glob<string>("./assets/effects/*.gif", {
  query: "",
  import: "default",
});
const stillEffectThumbnails = import.meta.glob<string>(
  "./assets/effects/*.gif",
  {
    query: "?format=png",
    import: "default",
  },
);
const getThumbnail = async (path: string) => await effectThumbnails[path]();
const getStillThumbnail = async (path: string) =>
  await stillEffectThumbnails[path]();

export const EFFECTS = [
  {
    id: "0",
    thumbnail: null,
    thumbnailStill: (await import("./assets/effects/none_2.png")).default,
    code: null,
  },
  {
    id: "1",
    thumbnail: await getThumbnail("./assets/effects/1.gif"),
    thumbnailStill: await getStillThumbnail("./assets/effects/1.gif"),
    code: ".mult(osc(20, -0.1, 1)" + ".rotate(Math.PI * 0.5))",
  },
  {
    id: "2",
    thumbnail: await getThumbnail("./assets/effects/2.gif"),
    thumbnailStill: await getStillThumbnail("./assets/effects/2.gif"),
    code:
      ".modulateKaleid(osc(3,0.5,0),5)" +
      ".modulateRotate(osc(0.75,0.5,0),1,0)",
  },
  {
    id: "3",
    thumbnail: await getThumbnail("./assets/effects/3.gif"),
    thumbnailStill: await getStillThumbnail("./assets/effects/3.gif"),
    code:
      ".blend(gradient().hue(0.5), 0.25)" +
      ".modulate(noise(3,0.5).luma(0.25),1)" +
      ".diff(noise(3,0.5).luma(0.6).color(2,0,2))" +
      ".contrast(1.5)",
  },
] as const;

export type Effect = (typeof EFFECTS)[number];
