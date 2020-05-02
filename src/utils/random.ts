import { Vector3 } from 'three';
export const randomBool = (): boolean => Math.random() > 0.5;

export const randomArrayItem = (arr: Array<any>): any => {
  const index: number = Math.floor((arr.length - 1) * Math.random());
  return arr[index];
};

export const randomBoundedInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomBoundedFloat = (min: number, max: number, precision: number = 3): number => {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, precision);
  return Math.floor(rand * power) / power;
};

export const randomBoundedVec3 = (vecA: Vector3, vecB: Vector3): Vector3 => {
  const x = randomBoundedFloat(vecA.x, vecB.x);
  const y = randomBoundedFloat(vecA.y, vecB.y);
  const z = randomBoundedFloat(vecA.z, vecB.z);
  return new Vector3(x, y, z);
};
