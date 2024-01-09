<script setup lang="ts">
import { ref } from 'vue'
import PickerBody from './Picker/PickerBody.vue'
import PickerHeader from './Picker/PickerHeader.vue'
const searchValue = ref('')
const activeGroup = ref('')

const handleSetActiveGroup = (newActiveGroup: string) => {
  activeGroup.value = newActiveGroup
}
</script>

<template>
  <div ref="picker" class="v3-emoji-picker">
    <PickerHeader v-model:searchValue="searchValue" @updateActiveGroup="handleSetActiveGroup" />
    <PickerBody :activeGroup="activeGroup" :searchValue="searchValue" />
  </div>
</template>
