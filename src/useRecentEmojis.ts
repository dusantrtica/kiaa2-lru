import type { Emoji } from '@/types'
import { reactive } from 'vue'
import { LinkedList } from './linkedList'

const useRecentEmojis = () => {
  const emojisList = new LinkedList()

  const indexedEmojis = new Map<string, Emoji>()

  const add = (emoji: Emoji) => {
    if (!indexedEmojis.has(emoji.u)) {
      indexedEmojis.set(emoji.u, emoji)
      emojisList.prepend(emoji)
    }
  }

  return {
    add,
    emojisList
  }
}

export default useRecentEmojis
