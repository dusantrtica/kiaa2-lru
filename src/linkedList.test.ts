import { describe, it, expect } from 'vitest'
import { LinkedList, ListNode } from './linkedList'
import type { Emoji } from './types'

describe('LinkedList', () => {
  it('should create empty list', () => {
    // Arrange && Act
    const list = new LinkedList()

    // Assert
    expect(list.head).toBeNull()
    expect(list.tail).toBeNull()
  })

  it('should add single element', () => {
    // Arrange
    const list = new LinkedList()
    const emoji: Emoji = { u: '123', n: ['name'] }

    // Act
    list.addNode(emoji)

    // Assert
    expect(list.head).toEqual({ nextNode: null, prevNode: null, emoji })
    expect(list.tail).toEqual({ nextNode: null, prevNode: null, emoji })
  })

  it('should add two elements', () => {
    // Arrange
    const list = new LinkedList()
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    list.addNode(e1)
    list.addNode(e2)

    // Assert
    expect(list.head!.emoji).toEqual(e1)
    expect(list.tail!.emoji).toEqual(e2)

    expect(list.head?.nextNode).toEqual(list.tail)
    expect(list.tail?.prevNode).toEqual(list.head)
  })

  it('should be able to iterate over list of elements', () => {
    const list = new LinkedList()
    list.addNode({ u: '123', n: ['name1'] })
    list.addNode({ u: '456', n: ['name2'] })
    list.addNode({ u: '789', n: ['name3'] })

    const resultedArray = []
    for (const elem of list) {
      resultedArray.push(elem)
    }
    expect(resultedArray).toEqual([
      { u: '123', n: ['name1'] },
      { u: '456', n: ['name2'] },
      { u: '789', n: ['name3'] }
    ])
  })

  it('should remove last node when list has one element', () => {
    const list = new LinkedList()
    list.addNode({ u: '123', n: ['name1'] })

    // Act
    list.removeLastNode()

    // Assert
    expect(list.isEmpty()).toBe(true)
  })

  it('should remove last node when there are 2 elements in the list', () => {
    // Arrange
    const list = new LinkedList()
    list.addNode({ u: '123', n: ['name1'] })
    list.addNode({ u: '456', n: ['name2'] })

    // Act
    list.removeLastNode()

    // Assert
    expect(list.isEmpty()).toBe(false)
    expect(list.head).toEqual({ prevNode: null, nextNode: null, emoji: { u: '123', n: ['name1'] } })
    expect(list.head).toEqual(list.tail)
  })

  it('shoud work when the list is empty', () => {
    // Arrange
    const list = new LinkedList()

    // Act
    list.removeLastNode()

    // Assert
    expect(list).toEqual(new LinkedList())
  })

  it('prepends node in the empty list', () => {
    // Arrange
    const list = new LinkedList()
    const emoji: Emoji = { u: '123', n: ['name1'] }

    // Act
    list.prepend(emoji)

    // Assert
    expect(list.head).toEqual({ prevNode: null, nextNode: null, emoji })
  })

  it('prepends 2 nodes in the list', () => {
    // Arrange
    const list = new LinkedList()
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    list.prepend(e1)
    list.prepend(e2)

    // Assert
    const node1 = new ListNode(e1)
    const node2 = new ListNode(e2)

    node2.nextNode = node1
    node1.prevNode = node2

    expect(list.head).toEqual(node2)
    expect(list.tail).toEqual(node1)
  })
})
