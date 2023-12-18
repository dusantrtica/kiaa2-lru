import type { Emoji } from '@/types'
import { reactive } from 'vue'

const useRecentEmojis = () => {
  const emojis: Emoji[] = reactive([])

  const indexedEmojis = new Map<string, Emoji>()

  const add = (emoji: Emoji) => {
    if (!indexedEmojis.has(emoji.u)) {
      emojis.push(emoji)
      indexedEmojis.set(emoji.u, emoji)
    }
  }

  const isEmpty = () => emojis.length === 0

  return {
    add,
    isEmpty,
    emojis
  }
}

export default useRecentEmojis
