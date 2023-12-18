import type { Emoji } from '@/types'
import { reactive } from 'vue'

const useRecentEmojis = () => {
  const emojis: Emoji[] = reactive([])
  const add = (emoji: Emoji) => {
    emojis.push(emoji)
  }

  const isEmpty = () => emojis.length === 0

  return {
    add,
    isEmpty,
    emojis
  }
}

export default useRecentEmojis
