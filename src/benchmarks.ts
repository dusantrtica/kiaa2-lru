import { LRUCache } from './LRUCache'

const cache = new LRUCache<number>(3)

cache.put(3, 3)

import { Bench } from 'tinybench'

const bench = new Bench({ time: 100 })

const createCacheAndInsertValues = (cacheSize = 10, numberOfElements = 10) => {
  return () => {
    const cache = new LRUCache<number>(cacheSize)
    for (let i = 0; i < numberOfElements; i++) {
      cache.put(i, i)
    }
  }
}

const insertIntoCacheBench = (bench: Bench) => {
  const cacheSize = 10
  const numberOfItemsToAdd = [1000, 10000, 100000, 1000000, 10000000]

  for (const n of numberOfItemsToAdd) {
    bench.add(
      `Insert ${n} values into cache of size ${cacheSize}`,
      createCacheAndInsertValues(cacheSize, n)
    )
  }
}

insertIntoCacheBench(bench)

await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run()

console.table(bench.table())
