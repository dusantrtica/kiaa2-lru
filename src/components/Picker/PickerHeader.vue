<script setup lang="ts">
import { ref } from 'vue'

import smileys_people from '../../assets/svgs/smileys_people.svg'
import animals_nature from '../../assets/svgs/animals_nature.svg'
import food_drink from '../../assets/svgs/food_drink.svg'
import activities from '../../assets/svgs/activities.svg'
import travel_places from '../../assets/svgs/travel_places.svg'
import objects from '../../assets/svgs/objects.svg'
import symbols from '../../assets/svgs/symbols.svg'
import flags from '../../assets/svgs/flags.svg'
import recent from '../../assets/svgs/recent.svg'

import groups from '../../data/groups'

const icons = {
  smileys_people,
  animals_nature,
  food_drink,
  activities,
  travel_places,
  objects,
  symbols,
  flags,
  recent
}

defineProps({
  searchValue: String,
  activeGroupKey: String
})

const emits = defineEmits(['updateActiveGroup', 'update:searchValue'])

const handleSearchValue = (e: Event) => {
  // @ts-ignore
  const value = e.target.value
  emits('update:searchValue', value)
}

const updateActiveGroup = (groupKey: string) => {
  emits('updateActiveGroup', groupKey)
}
</script>

<template>
  <div class="v3-header">
    <div class="v3-groups">
      <button
        v-for="group of groups"
        :key="group.key"
        type="button"
        class="v3-group"
        :class="{
          'v3-is-hidden': !icons[group.key]
        }"
        @click="updateActiveGroup(group.key)"
      >
        <span :title="group.title" class="v3-icon">
          <img :src="icons[group.key]" alt="" />
        </span>
      </button>
    </div>
    <div class="v3-spacing" />
    <div class="v3-search">
      <input :value="searchValue" @input="handleSearchValue" type="text" />
    </div>
  </div>
</template>
