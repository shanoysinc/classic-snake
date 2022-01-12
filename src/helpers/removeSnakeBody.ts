import { GRID_SIZE } from "../constants/index";
import { gridBlockElements } from "../helpers/generateGrid";

export function removeSnakeBody(index: number) {
  if (index < 0 || index > GRID_SIZE - 1) {
    return;
  }
  gridBlockElements[index].classList.remove("snakeBody");
}
