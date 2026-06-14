export function getScannerGradient() {
  const angle = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
  return `linear-gradient(${angle}deg, #0008, #0000)`;
}

export function getShadowGradient() {
  const angle = Math.random() * 360;
  return `linear-gradient(${angle}deg, #0008, #0000)`;
}

export function isFontErrory(handwritingFont: string) {
  return (
    handwritingFont === '' ||
    handwritingFont.includes('Homemade Apple')
  );
}

// These are largely legacy and might be replaced by React state/props
// but kept here for potential use in the generation hook.
export const applyPaperStylesLegacy = (
  pageEl: HTMLElement,
  overlayEl: HTMLElement,
  effect: string
) => {
  pageEl.style.border = 'none';
  pageEl.style.overflowY = 'hidden';

  if (effect === 'scanner') {
    overlayEl.classList.add('shadows');
    overlayEl.style.background = getScannerGradient();
  } else if (effect === 'shadows') {
    overlayEl.classList.add('shadows');
    overlayEl.style.background = getShadowGradient();
  } else if (effect !== 'none') {
    overlayEl.classList.add(effect);
  }
};
