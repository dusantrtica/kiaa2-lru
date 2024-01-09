<script setup lang="ts">
import type { Emoji, GroupKey } from '@/types'
import emojisData, { type AllEmojis } from '../../data/emojis'
import groups from '../../data/groups'
import { unicodeToEmoji } from '../../helpers'
import { LRUCache } from '../../LRUCache'
import { reactive, ref } from 'vue'
import { LinkedList } from '../../linkedList'

const componentKey = ref(0)
const forceRender = () => {
  componentKey.value += 1
}
const emojis = reactive(emojisData)

const recentEmojis = new LRUCache(5)

const platform = 'uknown'
const handleMouseEnter = (emoji: Emoji) => {}
const handleClick = (emoji: Emoji) => {
  recentEmojis.insert(emoji)
  forceRender()
}

emojis.recent = recentEmojis.list as unknown as Array<Emoji>

const handleError = () => {}
const isSticky = true
const hasGroupNames = true
const native = true

const showEmojisGroup = (emojis: AllEmojis, groupKey: GroupKey) => {
  const emojisGroup = emojis[groupKey]
  if (!emojisGroup) {
    return false
  }
  if (emojisGroup instanceof LinkedList) {
    if (emojisGroup.isEmpty() === true) {
      return false
    }
  }

  return true
}

const props = defineProps({
  activeGroup: String,
  searchValue: String
})

const isEmojiMatchingSearch = (query: string) => (emoji: Emoji) => {
  return emoji.n.some((name: String) => name.toLocaleLowerCase().includes(query))
}

const filterEmojis = (emojis: Emoji[], searchPattern: string): Emoji[] => {
  if (searchPattern) {
    const query = searchPattern.toLocaleLowerCase()
    return emojis.filter(isEmojiMatchingSearch(query))
  }

  return emojis
}
</script>
<template>
  {{ searchValue }}
  {{ activeGroup }}
  <div class="v3-body" :key="componentKey">
    <div ref="bodyInner" :class="platform" class="v3-body-inner">
      <template v-if="groups.length">
        <div v-for="group of groups" :id="group.key" :key="group.key" class="v3-group">
          <h5
            v-show="showEmojisGroup(emojis, group.key)"
            v-if="hasGroupNames"
            :class="isSticky ? `v3-sticky` : ``"
          >
            {{ group.title }}
          </h5>
          <div v-show="showEmojisGroup(emojis, group.key)" class="v3-emojis">
            <button
              v-for="emoji in filterEmojis(emojis[group.key], props.searchValue)"
              :key="emoji.r"
              type="button"
              @mouseenter="handleMouseEnter(emoji)"
              @click="handleClick(emoji)"
            >
              <!-- Native emoji -->
              <span v-if="native">{{ unicodeToEmoji(emoji.u) }}</span>
            </button>
          </div>
        </div>
      </template>
      <span v-else class="v3-no-result"> No emoji has been found! </span>
    </div>
  </div>
</template>
