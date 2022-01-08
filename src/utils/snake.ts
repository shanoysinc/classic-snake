import { SnakeDirection } from "../types/types";
import { DoubleLinkList } from "./doubleLinklist";

export class Snake extends DoubleLinkList {
  direction: SnakeDirection = SnakeDirection.RIGHT;
  constructor() {
    super();
  }

  moveUp() {
    // because we want to minus 30 from the head value we pass the arg -30
    // -1 to move Up
    return this.moveSnake(-30);
  }
  moveRight() {
    return this.moveSnake(1);
  }
  moveDown() {
    return this.moveSnake(30);
  }
  moveLeft() {
    // because we want to minus 1 from the head value we pass the arg -1
    // -1 to move left
    return this.moveSnake(-1);
  }

  private moveSnake(directionValue: number) {
    if (this.head) {
      let newHeadValue = this.head.value + directionValue;
      const newHeadIndx = this.insertAtBegin(newHeadValue);
      const oldTailIndx = this.removeEndNode();

      return { newHeadIndx, oldTailIndx };
    }
  }
}
