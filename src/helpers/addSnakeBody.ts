import { GRID_SIZE } from "../constants/index";
import { gridBlockElements } from "../helpers/generateGrid";

export function addSnakeBody(index: number) {
  if (index < 0 || index > GRID_SIZE - 1) {
    return;
  }
  gridBlockElements[index].classList.add("snakeBody");
}
