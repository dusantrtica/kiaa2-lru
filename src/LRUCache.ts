import { EMOJI_NAME_KEY } from './constant'
import { LinkedList, type ListNode } from './linkedList'
import type { Emoji } from './types'

const EmptyEmoji: Emoji = {
  [EMOJI_NAME_KEY]: [''],
  u: '',
  r: ''
}

export class LRUCache {
  constructor(capacity: number) {
    this.capacity = capacity
    this.list = new LinkedList()
  }
  capacity: number
  nodesMap: Map<Emoji, ListNode | null> = new Map<Emoji, ListNode | null>()
  list: LinkedList

  evictLeastRecentlyUsed() {
    const emoji = this.list.tail?.emoji
    if (emoji) {
      this.nodesMap.delete(emoji)
      this.list.removeLastNode()
    }
  }

  addToCache(emoji: Emoji) {
    this.list.prepend(emoji)
    this.nodesMap.set(emoji, this.list.head)
  }

  insert(emoji: Emoji) {
    if (this.nodesMap.has(emoji)) {
      const node = this.nodesMap.get(emoji)
      if (node) {
        this.list.moveNodeToHead(node)
      }
    } else {
      if (this.nodesMap.size === this.capacity) {
        this.evictLeastRecentlyUsed()
      }
      this.addToCache(emoji)
    }
  }

  isEmpty(): Boolean {
    return this.list.isEmpty()
  }

  [Symbol.iterator]() {
    let currentNode = this.list.head

    return {
      next() {
        console.log('iterating ', currentNode)
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
}
