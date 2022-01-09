import { Snake } from "../utils/snake";

export function generateInitSnake(snake: Snake) {
  snake.head = null;
  snake.insertAtEnd(103);
  snake.insertAtEnd(102);
  snake.insertAtEnd(101);
  snake.insertAtEnd(100);
}
