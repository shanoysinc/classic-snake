import { gridBlock, GRID_SIZE } from "../constants/index";

export function removeSnakeBody(index: number) {
  if (index < 0 || index > GRID_SIZE - 1) {
    return;
  }
  gridBlock[index].classList.remove("snakeBody");
}
