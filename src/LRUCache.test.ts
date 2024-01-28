import { it, describe, expect, beforeEach } from 'vitest'
import { LRUCache } from './LRUCache'
import type { Emoji } from './types'

describe('LRUCache', () => {
  it('adds single element to 5 elements capacity cache', () => {
    // Arrange
    const cache = new LRUCache<Emoji>(5)
    const e1: Emoji = { u: '123', n: ['name1'] }

    // Act
    cache.insert(e1)

    // Assert
    const emojis = new Array<Emoji | null>()

    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e1])
  })

  it('adds 2 items to cache and outputs them in the right order', () => {
    // Arrange
    const cache = new LRUCache<Emoji>(5)
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    cache.insert(e1)
    cache.insert(e2)

    // Assert
    const emojis = new Array<Emoji | null>()

    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e2, e1])
  })

  it('accessing second item in the cache will make it be the first', () => {
    // Arrange
    const cache = new LRUCache<Emoji>(5)
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    cache.insert(e1)
    cache.insert(e2)

    cache.insert(e1)

    // Assert
    const emojis = new Array<Emoji | null>()
    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e1, e2])
  })

  it('removes the element from cache when another one is inserted', () => {
    // Arrange
    const cache = new LRUCache<Emoji>(1)
    const e1: Emoji = { u: '123', n: ['name1'] }
    const e2: Emoji = { u: '456', n: ['name2'] }

    // Act
    cache.insert(e1)
    cache.insert(e2)

    // Assert
    const emojis = new Array<Emoji | null>()

    for (const e of cache) {
      emojis.push(e)
    }

    expect(emojis).toEqual([e2])
  })
})

describe('get and put combination', () => {
  let cache: LRUCache<number>
  let result: Array<number | null>

  const arrayOfCacheValues = <T>(cache: LRUCache<T>): Array<T | null> => {
    const result = new Array<T | null>()
    for (const item of cache) {
      result.push(item)
    }
    return result
  }

  const getValues = () => arrayOfCacheValues(cache)

  beforeEach(() => {
    cache = new LRUCache<number>(3)
    result = new Array<number | null>()
    cache.put(1, 1)
    cache.put(2, 2)
    cache.put(3, 3)
  })

  it('adds numbers correctly into cache and order them correctly', () => {
    expect(getValues()).toEqual([3, 2, 1])
  })

  it('evicts element from the cache when the fourth item is added', () => {
    cache.put(4, 4)

    expect(getValues()).toEqual([4, 3, 2])
  })

  it('reorders element when it is accessed', () => {
    const item = cache.get(2)

    expect(getValues()).toEqual([2, 3, 1])
  })

  it('returns null if element is not in the cache', () => {
    const value = cache.get(10)
    expect(value).toBe(null)
    expect(getValues()).toEqual([3, 2, 1])
  })
})
