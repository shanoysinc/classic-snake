interface SnakeBodyInt {
  newHeadIndx: number;
  oldTailIndx: number | undefined;
}

export type SnakeBodyType = SnakeBodyInt | undefined;
export type forEachCallback = (value: number, index?: number) => void;
export enum SnakeDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
}

export interface SnakeBodyCacheType {
  [props: string]: boolean;
}
