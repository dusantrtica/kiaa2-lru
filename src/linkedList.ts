import { type Emoji } from './types'

export class ListNode<T> {
  val: T
  prevNode: ListNode<T> | null
  nextNode: ListNode<T> | null
  constructor(elem: T) {
    this.val = elem
    this.prevNode = null
    this.nextNode = null
  }
}

class LinkedList<T> {
  head: ListNode<T> | null
  tail: ListNode<T> | null

  constructor() {
    this.head = null
    this.tail = null
  }

  [Symbol.iterator]() {
    let currentNode = this.head

    return {
      next() {
        if (!currentNode) return { value: null, done: true }
        const returnValue = {
          value: currentNode.val,
          done: false
        }
        currentNode = currentNode.nextNode
        return returnValue
      }
    }
  }

  addNode(elem: T) {
    if (this.head === null) {
      this.head = new ListNode(elem)
      this.tail = this.head
    } else {
      const prevTail = this.tail
      const node = new ListNode(elem)
      this.tail = node
      this.tail.prevNode = prevTail
      prevTail!.nextNode = this.tail
    }
  }

  prepend(elem: T) {
    if (this.head === null) {
      this.head = new ListNode(elem)
      this.tail = this.head
    } else {
      const newHead = new ListNode(elem)
      newHead.nextNode = this.head
      this.head.prevNode = newHead
      this.head = newHead
    }
  }

  moveNodeToHead(node: ListNode<T> | null) {
    if (node === null || node === this.head) {
      return
    }

    const prev = node.prevNode
    const next = node.nextNode

    if (prev) {
      prev.nextNode = next
    }

    if (next) {
      next.prevNode = prev
    } else {
      this.tail = node.prevNode
    }

    node.nextNode = this.head
    this.head!.prevNode = node

    this.head = node
  }

  removeLastNode() {
    if (this.tail === this.head) {
      this.tail = this.head = null
    } else {
      if (this.tail) {
        this.tail = this.tail.prevNode
        this.tail!.nextNode = null
      }
    }
  }

  isEmpty() {
    return this.head === null
  }

  filter(predicate: Function): Array<T> {
    const result = new Array<T>()
    for (const elem of this) {
      if (elem && predicate(elem)) {
        result.push(elem)
      }
    }
    return result
  }
}

export { LinkedList }
