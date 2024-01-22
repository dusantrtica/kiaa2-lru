<script setup lang="ts">
import type { Emoji, GroupKey } from '@/types'
import emojisData, { type AllEmojis } from '../../data/emojis'
import groups from '../../data/groups'
import { unicodeToEmoji } from '../../helpers'
import { LRUCache } from '../../LRUCache'
import { onBeforeUpdate, reactive, ref } from 'vue'
import { LinkedList } from '../../linkedList'

let params = new URLSearchParams(document.location.search)
const cacheSize = parseInt(params.get('cacheSize') || '5')

const componentKey = ref(0)
const forceRender = () => {
  componentKey.value += 1
}
const emojis = reactive(emojisData)

const recentEmojis = new LRUCache<Emoji>(cacheSize)

const platform = 'uknown'
const handleMouseEnter = (emoji: Emoji | null) => {}
const handleClick = (emoji: Emoji | null) => {
  if (emoji !== null) {
    recentEmojis.insert(emoji)
    forceRender()
  }
}

emojis.recent = recentEmojis.list as unknown as Array<Emoji>

const isSticky = true
const hasGroupNames = true

const showEmojisGroup = (emojis: AllEmojis, groupKey: GroupKey) => {
  const emojisGroup = filteredGroupsAndEmojis.get(groupKey)
  if (!emojisGroup) {
    return false
  }
  if (emojisGroup instanceof LinkedList) {
    return !emojisGroup.isEmpty() === true
  }

  return emojisGroup.length !== 0
}

const props = defineProps({
  activeGroup: String,
  searchValue: {
    type: String,
    default: ''
  }
})

const isEmojiMatchingSearch = (query: string) => (emoji: Emoji) => {
  return emoji.n.some((name: String) => name.toLocaleLowerCase().includes(query))
}

const filterGroupEmojis = (
  emojis: Emoji[] | LinkedList<Emoji>,
  searchPattern: string
): Emoji[] | LinkedList<Emoji> => {
  if (searchPattern) {
    const query = searchPattern.toLocaleLowerCase()
    return emojis.filter(isEmojiMatchingSearch(query))
  }

  return emojis
}

const filteredGroupsAndEmojis = new Map<string, Emoji[] | LinkedList<Emoji>>()

const filterAndSetAllEmojis = () => {
  for (const group of groups) {
    filteredGroupsAndEmojis.set(group.key, filterGroupEmojis(emojis[group.key], props.searchValue))
  }
}

filterAndSetAllEmojis()

onBeforeUpdate(() => {
  filterAndSetAllEmojis()
})
</script>
<template>
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
            <span v-if="group.key === 'recent'">{{ recentEmojis.size() }} / {{ cacheSize }}</span>
          </h5>
          <div v-show="showEmojisGroup(emojis, group.key)" class="v3-emojis">
            <button
              v-for="emoji in filteredGroupsAndEmojis.get(group.key)"
              :key="emoji?.u"
              type="button"
              @mouseenter="handleMouseEnter(emoji)"
              @click="handleClick(emoji)"
            >
              <!-- Native emoji -->
              <span>{{ unicodeToEmoji(emoji!.u) }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
