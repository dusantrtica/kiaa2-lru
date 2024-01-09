import { type Emoji } from './types'

const EmptyEmoji: Emoji = {
  n: [''],
  u: ''
}

export class ListNode {
  emoji: Emoji
  prevNode: ListNode | null
  nextNode: ListNode | null
  constructor(emoji: Emoji) {
    this.emoji = emoji
    this.prevNode = null
    this.nextNode = null
  }
}

class LinkedList {
  head: ListNode | null
  tail: ListNode | null

  constructor() {
    this.head = null
    this.tail = null
  }

  [Symbol.iterator]() {
    let currentNode = this.head

    return {
      next() {
        if (!currentNode) return { value: EmptyEmoji, done: true }
        const returnValue = {
          value: currentNode.emoji,
          done: false
        }
        currentNode = currentNode.nextNode
        return returnValue
      }
    }
  }

  addNode(emoji: Emoji) {
    if (this.head === null) {
      this.head = new ListNode(emoji)
      this.tail = this.head
    } else {
      const prevTail = this.tail
      const node = new ListNode(emoji)
      this.tail = node
      this.tail.prevNode = prevTail
      prevTail!.nextNode = this.tail
    }
  }

  prepend(emoji: Emoji) {
    if (this.head === null) {
      this.head = new ListNode(emoji)
      this.tail = this.head
    } else {
      const newHead = new ListNode(emoji)
      newHead.nextNode = this.head
      this.head.prevNode = newHead
      this.head = newHead
    }
  }

  moveNodeToHead(node: ListNode | null) {
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

  filter(predicate: Function): Emoji[] {
    const result: Emoji[] = []
    for (const elem of this) {
      if (predicate(elem)) {
        result.push(elem)
      }
    }
    return result
  }
}

export { LinkedList }
