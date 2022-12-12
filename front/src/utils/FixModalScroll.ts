export const disableScroll = () => {
  document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
  `;
};

export const enableScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.cssText = ``;
  window.scrollTo(0, parseInt(scrollY) * -1);
};
