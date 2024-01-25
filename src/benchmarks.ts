import { LRUCache } from './LRUCache'

const cache = new LRUCache<number>(3)

cache.put(3, 3)

import { Bench } from 'tinybench'

const bench = new Bench({ time: 100 })

bench
  .add('Inserting 1000 random values into cache', () => {
    const cache = new LRUCache<number>(10)
    for (let i = 0; i < 1000; i++) {
      cache.put(i, i)
    }
  })
  .add('Inserting 10000 random values into cache', () => {
    const cache = new LRUCache<number>(10)
    for (let i = 0; i < 10000; i++) {
      cache.put(i, i)
    }
  })
  .add('Inserting 100000 random values into cache', () => {
    const cache = new LRUCache<number>(10)
    for (let i = 0; i < 100000; i++) {
      cache.put(i, i)
    }
  })
  .add('Inserting 1000000 random values into cache', () => {
    const cache = new LRUCache<number>(10)
    for (let i = 0; i < 1000000; i++) {
      cache.put(i, i)
    }
  })
  .add('Inserting 10000000 random values into cache', () => {
    const cache = new LRUCache<number>(10)
    for (let i = 0; i < 10000000; i++) {
      cache.put(i, i)
    }
  })

await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run()

console.table(bench.table())
