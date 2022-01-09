import { SnakeBodyType } from "../types/types";

// using the class as the type
import { SnakeBodyCache } from "../utils/snakeBodyCache";

import { Snake } from "../utils/snake";
import { addSnakeBody } from "./addSnakeBody";
import { removeSnakeBody } from "./removeSnakeBody";

export function moveSnake(
  snake: Snake,
  snakeBody: SnakeBodyType,
  snakeBodyCache: SnakeBodyCache
) {
  // adding the previous head to cache

  snakeBodyCache.addBodyIndx(snake);
  if (snakeBody?.oldTailIndx) {
    snakeBodyCache.removeBodyIndx(snakeBody.oldTailIndx);
    removeSnakeBody(snakeBody.oldTailIndx);
  }
  if (snakeBody?.newHeadIndx) {
    addSnakeBody(snakeBody.newHeadIndx);
  }
}
