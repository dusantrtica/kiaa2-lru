import { LRUCache } from './LRUCache'

const cache = new LRUCache<number>(3)

cache.put(3, 3)

import { Bench } from 'tinybench'

const bench = new Bench({ time: 100 })

const numberOfItemsToAdd = [1000, 10000, 100000, 1000000, 10000000]

const createCacheAndInsertValues = (cacheSize = 10, numberOfElements = 10) => {
  const cache = new LRUCache<number>(cacheSize)
  for (let i = 0; i < numberOfElements; i++) {
    cache.put(i, i)
  }
  return cache
}

const caches = numberOfItemsToAdd.reduce((acc: Map<number, LRUCache<number>>, n) => {
  const cache = createCacheAndInsertValues(n, n)
  acc.set(n, cache)
  return acc
}, new Map<number, LRUCache<number>>())

const insertIntoCacheBench = (bench: Bench) => {
  for (const n of numberOfItemsToAdd) {
    bench.add(`Insert ${n} values into cache of size ${n}`, () => {
      const cache = caches.get(n)
      if (cache) {
        cache.put(n + 1, n + 1)
      }
    })
  }
}

const readFromCacheBench = (bench: Bench) => {
  for (const n of numberOfItemsToAdd) {
    bench.add(`Read a value from the cache of size ${n}`, () => {
      const cache = caches.get(n)
      if (cache) {
        cache.get(Math.floor(n / 2))
      }
    })
  }
}

insertIntoCacheBench(bench)
readFromCacheBench(bench)

await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run()

console.table(bench.table())
