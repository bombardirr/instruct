<script setup>
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
    class="left-bar__item"
    :class="{ 'active': isActive }"
    @click="emit('click')"
  >
    <div class="icn">
      <Icon :name="icon"/>
    </div>
    <span class="text">{{ text }}</span>
    <span v-if="moreText" class="text">{{ moreText }}</span>
    <div 
      v-if="moreText"
      class="icn-more"
      @click.stop="emit('moreClick')"
    >
      <Icon :name="moreIcon"/>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

.left-bar__item {
  @apply flex justify-start items-center gap-2;
  @apply cursor-pointer;
  @apply transition-all duration-300;
  @apply transform translate-x-0;
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
}

.left-bar__item:hover {
  @apply translate-x-2;

  .icn-more {
    @apply opacity-100;
    @apply scale-100;
  }
}

.left-bar__item.active {
  @apply bg-[var(--ag-gray-primary)];
  @apply translate-x-2;

  .icn-more {
    @apply opacity-100;
    @apply scale-100;
  }
}

.icn {
  @apply flex justify-center items-center;
  @apply w-10 h-10;
  @apply p-1;
  @apply transition-all duration-300;

  .iconify {
    @apply w-full h-full;
  }
}

.icn-more {
  @apply flex justify-center items-center;
  @apply w-6 h-6;
  @apply text-[var(--ag-white-secondary)];
  @apply p-1;
  @apply cursor-pointer;
  @apply rotate-90;
  @apply transition-all duration-300;
  @apply opacity-0;
  @apply scale-95;
  @apply transform;

  .iconify {
    @apply w-full h-full;
  }
}

.text {
  @apply text-[var(--ag-white-primary)];
}
</style>
