export type TImageBlock = {
  imagesTitle: string;
  images: {
    alt: string;
    src: string;
    link?: string;
  }[];
  width?: number;
  height?: number;
  className?: string;
};
