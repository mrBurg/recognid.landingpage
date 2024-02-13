export function smoothScroll(
  elemntIdOnAction: string,
  elemntIdScrollTo: string
) {
  const onElemnt = document.getElementById(elemntIdOnAction);
  const toElement = document.getElementById(elemntIdScrollTo);

  return toElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}
