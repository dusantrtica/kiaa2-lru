<script setup lang="ts">
import PickerFooter from './Picker/PickerFooter.vue'
import PickerBody from './Picker/PickerBody.vue'
import PickerHeader from './Picker/PickerHeader.vue'
</script>

<template>
  <div ref="picker" class="v3-emoji-picker">
    <PickerHeader />
    <PickerBody />
    <PickerFooter />
  </div>
</template>
