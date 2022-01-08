import { forEachCallback } from "../types/types";

class LinkListNode {
  value: number;
  prev: LinkListNode | null;
  next: LinkListNode | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoubleLinkList {
  head: LinkListNode | null;
  tail: LinkListNode | null;
  size: number = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtBegin(value: number) {
    const newNode = new LinkListNode(value);

    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const oldHead = this.head;
      newNode.next = oldHead;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    return value;
  }
  insertAtEnd(value: number) {
    const newNode = new LinkListNode(value);

    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        const temp = this.tail;
        this.tail = newNode;
        this.tail.prev = temp;
        this.tail.prev.next = this.tail;
      }
    }
    this.size++;
    return value;
  }

  removeEndNode() {
    if (this.tail) {
      const deletedTailValue = this.tail.value;
      let prevNode = this.tail.prev;
      prevNode?.prev && (prevNode.next = null);
      this.tail = prevNode;
      this.size--;
      return deletedTailValue;
    }
  }
  forEach(callback: forEachCallback) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      callback(currentNode.value, index);
      currentNode = currentNode.next;
      index += 1;
    }
  }
}
