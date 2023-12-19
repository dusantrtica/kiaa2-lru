import { type Emoji } from './types'
class ListNode {
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
}

export { LinkedList }
