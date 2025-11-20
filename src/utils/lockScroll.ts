/**
 * Блокирует прокрутку страницы
 */
export const lockScroll = (): void => {
  const preventScroll = (event: Event) => {
    event.preventDefault();
  };

  document.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('touchmove', preventScroll, { passive: false });
};
