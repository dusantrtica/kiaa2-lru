import { describe, it, expect } from 'vitest'
import { LinkedList } from './linkedList'
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
})
