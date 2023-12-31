import { it, describe, expect } from 'vitest'
import useRecentEmojis from './useRecentEmojis'
import type { Emoji } from './types'

describe('useRecentEmojis', () => {
  it('should not be able to add the same emoji twice', () => {
    const recentEmojis = useRecentEmojis()
    const emoji: Emoji = {
      n: ['grinning face', 'grinning'],
      u: '1f600'
    }
    recentEmojis.add(emoji)
    recentEmojis.add(emoji)

    const emojisArray: Emoji[] = []
    for (const emoji of recentEmojis.emojisList) {
      emojisArray.push(emoji)
    }

    // Assert
    expect(emojisArray).toEqual([emoji])
  })
})
