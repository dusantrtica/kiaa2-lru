import { EMOJI_NAME_KEY } from './constant'
import { LinkedList, type ListNode } from './linkedList'
import type { Emoji } from './types'

const EmptyEmoji: Emoji = {
  [EMOJI_NAME_KEY]: [''],
  u: '',
  r: ''
}

export class LRUCache<T> {
  constructor(capacity: number) {
    this.capacity = capacity
    this.list = new LinkedList()
  }
  capacity: number
  nodesMap: Map<T, ListNode<T> | null> = new Map<T, ListNode<T> | null>()
  list: LinkedList<T>

  evictLeastRecentlyUsed() {
    const value = this.list.tail?.val
    if (value) {
      this.nodesMap.delete(value)
      this.list.removeLastNode()
    }
  }

  addToCache(value: T) {
    this.list.prepend(value)
    this.nodesMap.set(value, this.list.head)
  }

  insert(elem: T) {
    if (this.nodesMap.has(elem)) {
      const node = this.nodesMap.get(elem)
      if (node) {
        this.list.moveNodeToHead(node)
      }
    } else {
      if (this.nodesMap.size === this.capacity) {
        this.evictLeastRecentlyUsed()
      }
      this.addToCache(elem)
    }
  }

  isEmpty(): Boolean {
    return this.list.isEmpty()
  }

  [Symbol.iterator]() {
    let currentNode = this.list.head

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
}
