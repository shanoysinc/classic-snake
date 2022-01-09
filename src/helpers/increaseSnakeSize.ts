import { gridBlock } from "../constants/index";
import { Snake } from "../utils/snake";

export function increaseSnakeSize(snake: Snake) {
  if (snake.head && snake.tail) {
    const newTailIndx = snake.tail.value - 1;
    snake.insertAtEnd(newTailIndx);
    gridBlock[newTailIndx].classList.add("snakeBody");
  }
}
