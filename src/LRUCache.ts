import { LinkedList, type ListNode } from './linkedList'

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

  addToCache(key: any, value: T) {
    this.list.prepend(value)
    this.nodesMap.set(key, this.list.head)
  }

  put(key: any, value: T) {
    if (this.nodesMap.has(key)) {
      const node = this.nodesMap.get(key)
      if (node) {
        this.list.moveNodeToHead(node)
      }
    } else {
      if (this.nodesMap.size === this.capacity) {
        this.evictLeastRecentlyUsed()
      }
      this.addToCache(key, value)
    }
  }

  get(key: any): T | null {
    if (this.nodesMap.has(key)) {
      const node = this.nodesMap.get(key)
      if (node) {
        this.list.moveNodeToHead(node)
        return node.val
      }
    }
    return null
  }

  insert(elem: T) {
    return this.put(elem, elem)
  }

  isEmpty(): Boolean {
    return this.list.isEmpty()
  }

  size(): number {
    return this.nodesMap.size
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
