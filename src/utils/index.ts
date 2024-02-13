export * from './environment';
export * from './cookies';

export function stopScroll(data: boolean) {
  if (data) {
    return document.body.classList.add('no-scroll');
  }

  document.body.classList.remove('no-scroll');
}
