import { gridBlockElements } from "../helpers/generateGrid";
import { Snake } from "../utils/snake";

export function increaseSnakeSize(snake: Snake) {
  if (snake.head && snake.tail) {
    const newTailIndx = snake.tail.value - 1;
    snake.insertAtEnd(newTailIndx);
    gridBlockElements[newTailIndx].classList.add("snakeBody");
  }
}
