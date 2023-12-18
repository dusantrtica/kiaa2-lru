<script setup lang="ts">
import type { Emoji } from '@/types'
import emojisData from '../../data/emojis'
import groups from '../../data/groups'
import { unicodeToEmoji } from '../../helpers'
import useRecentEmojis from '../../useRecentEmojis'
import { EMOJI_REMOTE_SRC } from '@/constant'
import { reactive } from 'vue'

const emojis = reactive(emojisData)

const recentEmojis = useRecentEmojis()

const platform = 'uknown'
const handleMouseEnter = (emoji: Emoji) => {}
const handleClick = (emoji: Emoji) => {
  recentEmojis.add(emoji)
}
const handleError = () => {}
const isSticky = true
const hasGroupNames = true

const native = true
</script>
<template>
  <div class="v3-body">
    <div ref="bodyInner" :class="platform" class="v3-body-inner">
      <template v-if="groups.length">
        <div v-for="group of groups" :id="group.key" :key="group.key" class="v3-group">
          <h5 v-show="emojis[group.key]" v-if="hasGroupNames" :class="isSticky ? `v3-sticky` : ``">
            {{ group.title }}
          </h5>
          <div v-show="emojis[group.key]" class="v3-emojis">
            <button
              v-for="emoji in emojis[group.key]"
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
