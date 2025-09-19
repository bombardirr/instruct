<script setup>
import styles from './SidebarItem.module.css'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  moreIcon: {
    type: String,
    default: 'line-md:uploading-loop'
  },
  moreText: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'moreClick'])
</script>

<template>
  <div 
    :class="[styles.item, { [styles['item--active']]: isActive }]"
    @click="emit('click')"
  >
    <div :class="styles.item__icon">
      <Icon :name="icon"/>
    </div>
    <span :class="styles.item__text">{{ text }}</span>
    <span v-if="moreText" :class="styles.item__text">{{ moreText }}</span>
    <div 
      v-if="moreText"
      :class="styles.item__more"
      @click.stop="emit('moreClick')"
    >
      <Icon :name="moreIcon"/>
    </div>
  </div>
</template>
