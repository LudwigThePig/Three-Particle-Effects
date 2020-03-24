export const randomBool = (): boolean => Math.random() > 0.5;

export const randomArrayItem = (arr: Array<any>): any => {
  const index = Math.floor((arr.length - 1) * Math.random());
  return arr[index];
};

export const randomBoundedInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomBoundedFloat = (min: number, max: number): number => Math.random() * (max - min + 1) + min;
