import { CircleGeometry } from 'THREE';
import BaseShape from '.';

export default class ConeShape extends BaseShape {
  constructor(radius: number = 100) {
    super(new CircleGeometry(radius), 0, 0, 0, 100);
  }
}
