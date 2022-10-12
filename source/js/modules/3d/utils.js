export const getHypotenuse = (width, height) => Math.hypot(width, height);
export const getConeRadius = (side) => getHypotenuse(side, side) / 2;
