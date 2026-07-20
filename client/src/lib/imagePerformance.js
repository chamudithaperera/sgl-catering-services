const staticCateringImagePattern = /^\/assets\/sgl-images\/(.+)\.jpg$/i;

export function responsiveImageProps(src, sizes) {
  if (!src) {
    return { src };
  }

  const match = src.match(staticCateringImagePattern);

  if (!match) {
    return { src, sizes };
  }

  const imageBase = `/assets/sgl-images/${match[1]}`;

  return {
    src,
    srcSet: `${imageBase}-800.jpg 800w, ${imageBase}.jpg 1600w`,
    sizes,
  };
}
