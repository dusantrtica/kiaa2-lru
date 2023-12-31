import { EMOJI_NAME_KEY } from './constant'
import { EMOJI_EMOJI_KEY, type Emoji } from './types'

const EmptyEmoji: Emoji = {
  [EMOJI_NAME_KEY]: [''],
  u: '',
  r: ''
}

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

  isEmpty() {
    return this.head === null
  }
}

export { LinkedList }
