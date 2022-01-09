import { gridBlock, GRID_SIZE } from "../constants/index";

export function addSnakeBody(index: number) {
  if (index < 0 || index > GRID_SIZE - 1) {
    return;
  }
  gridBlock[index].classList.add("snakeBody");
}
