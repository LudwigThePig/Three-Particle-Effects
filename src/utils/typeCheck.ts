export const isBool = (input: any): boolean => typeof input === 'boolean';
export const isFloat = (num: number): boolean => num % 1 !== 0;
export const isInt = (num: number): boolean => num % 1 === 0;
