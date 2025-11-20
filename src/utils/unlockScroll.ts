/**
 * Разблокирует прокрутку страницы
 */
export const unlockScroll = (): void => {
  const preventScroll = (event: Event) => {
    event.preventDefault();
  };

  document.removeEventListener('wheel', preventScroll);
  document.removeEventListener('touchmove', preventScroll);
};
