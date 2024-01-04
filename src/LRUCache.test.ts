import { it, describe, expect } from 'vitest'
import { LRUCache } from './LRUCache'
import type { Emoji } from './types'

describe('LRUCache', () => {
  it('adds single element to 5 elements capacity cache', () => {
    // Arrange
    const cache = new LRUCache(5)
    const e1: Emoji = { u: '123', n: ['name1'] }

    // Act
    cache.insert(e1)

    // Assert
    const emojis: Emoji[] = []
    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e1])
  })

  it('adds 2 items to cache and outputs them in the right order', () => {
    // Arrange
    const cache = new LRUCache(5)
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    cache.insert(e1)
    cache.insert(e2)

    // Assert
    const emojis: Emoji[] = []
    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e2, e1])
  })

  it('accessing second item in the cache will make it be the first', () => {
    // Arrange
    const cache = new LRUCache(5)
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    cache.insert(e1)
    cache.insert(e2)

    cache.insert(e1)

    // Assert
    const emojis: Emoji[] = []
    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e1, e2])
  })

  it('removes the element from cache when another one is inserted', () => {
    // Arrange
    const cache = new LRUCache(1)
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    cache.insert(e1)
    cache.insert(e2)

    // Assert
    const emojis: Emoji[] = []
    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e2])
  })
})
