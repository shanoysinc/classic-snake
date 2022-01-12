import { SnakeBodyCacheType } from "../types/types";

// use the snake class as the type
import { Snake } from "./snake";

export class SnakeBodyCache {
  cache: SnakeBodyCacheType = {};
  constructor(snake: Snake) {
    snake.forEach((bdyIndx, index) => {
      if (index !== 0) {
        this.addToCache(bdyIndx);
      }
    });
  }

  hasIndex(headIndx: number) {
    if (this.cache[headIndx]) {
      return true;
    }

    return false;
  }

  addBodyIndx(snake: Snake) {
    if (snake.head?.next) {
      let snakeBodyIndx = snake.head?.next.value;

      this.addToCache(snakeBodyIndx);
    }
  }

  removeBodyIndx(oldTailIndx: number | undefined) {
    if (oldTailIndx) {
      if (this.cache[oldTailIndx]) {
        this.cache[oldTailIndx] = false;
      }
    }
  }
  private addToCache(index: number) {
    if (!this.cache[index]) {
      this.cache[index] = true;
    }
  }
}
