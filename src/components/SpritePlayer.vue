<template>
  <div
    :style="{
      '--scaleX': flipHorizontal ? -1 : 1
    }"
    class="sprite"
  >
    <img
      class="sprite-img"
      :src="spriteSrc"
      alt="sprite"
    >
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
export default {
  props: {
    duration: {
      type: Number,
      required: true
    },
    sprites: {
      type: Array,
      required: true
    },
    alternate: {
      type: Boolean
    },
    flipHorizontal: {
      type: Boolean
    }
  },
  setup (props) {
    const currentIndex = ref(0)
    const sprites = computed(() => !props.alternate
      ? props.sprites
      : [...props.sprites, ...(props.sprites.slice(1, props.sprites.length - 1).reverse())])
    const spriteSrc = computed(() => sprites.value[currentIndex.value])
    let interval = -1

    onMounted(() => {
      interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % sprites.value.length
      }, props.duration / sprites.value.length)
    })

    onBeforeUnmount(() => {
      clearInterval(interval)
    })

    return {
      spritess: sprites,
      spriteSrc
    }
  }
}
</script>

<style lang="scss">
.sprite {
  display: inline-block;
  transform: translateX(-50%) scaleX(var(--scaleX));
}
</style>
