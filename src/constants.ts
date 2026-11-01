import type { SketchState } from "./state/sketch";

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
  {
    id: "wiki",
    videoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Bontempi_Junior.webm",
  },
] as const;

type BlendAmount = SketchState["blend"];
export const BLEND_MODES = [
  {
    id: "blend",
    fn: (amount: BlendAmount) => `.blend(o1,${amount})`,
  },
  {
    id: "add",
    fn: (amount: BlendAmount) => `.add(o1,${amount})`,
  },
  {
    id: "subtract",
    fn: (amount: BlendAmount) => `.sub(o1,${amount})`,
  },
  {
    id: "multiply",
    fn: (amount: BlendAmount) => `.mult(o1,${amount})`,
  },
] as const;

export type BlendMode = (typeof BLEND_MODES)[number];
