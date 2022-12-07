import * as THREE from 'three';

export const getHypotenuse = (width, height) => Math.hypot(width, height);
export const getConeRadius = (side) => getHypotenuse(side, side) / 2;
export const degreesToRadians = (deg) => deg * THREE.Math.DEG2RAD;
