export const HYDRA_WIDTH = 640;
export const HYDRA_HEIGHT = 480;

export const VIDEO_ASSETS = [
  {
    id: "jellyfish",
    videoUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW0xNDZteDhqaHM1OGd3b2g2OHI3MWZ4ZzNkdGMwaTZrcjVlMjk4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2K8GaJPVJlbzi/giphy.mp4",
    thumbUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW0xNDZteDhqaHM1OGd3b2g2OHI3MWZ4ZzNkdGMwaTZrcjVlMjk4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2K8GaJPVJlbzi/200_s.gif",
  },
  {
    id: "purple",
    videoUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDI0cGUxdWY5M2hneDJrdjNleWxoenEwenI2cHYzeDc3bHBmdjFlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5xtDarpJpIPHFGJrRrG/giphy.mp4",
    thumbUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDI0cGUxdWY5M2hneDJrdjNleWxoenEwenI2cHYzeDc3bHBmdjFlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5xtDarpJpIPHFGJrRrG/200_s.gif",
  },
  {
    id: "kermit",
    videoUrl:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmc0NzFsbXcyOWJmeDVkeWNpamhqMTdsNGliN2l1MjFkdW45ZnpqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LmBsnpDCuturMhtLfw/giphy.mp4",
    thumbUrl:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmc0NzFsbXcyOWJmeDVkeWNpamhqMTdsNGliN2l1MjFkdW45ZnpqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LmBsnpDCuturMhtLfw/200_s.gif",
  },
] as const;

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
    id: "1",
    thumbnail: await getThumbnail("./assets/effects/1.gif"),
    thumbnailStill: await getStillThumbnail("./assets/effects/1.gif"),
    code: ".mult(osc(20, -0.1, 1).rotate(Math.PI * 0.5))",
  },
  {
    id: "2",
    thumbnail: await getThumbnail("./assets/effects/2.gif"),
    thumbnailStill: await getStillThumbnail("./assets/effects/2.gif"),
    code: ".modulateKaleid(osc(3,0.5,0),5).modulateRotate(osc(0.75,0.5,0),1,0)",
  },
] as const;

export type Effect = (typeof EFFECTS)[number];
