<template>
  <component :is="currentComponent" @next="onNext" @play-bgm="onPlayBGM"></component>
  <audio id="bgm" src="bensound-memories.mp3" loop></audio>
</template>

<script>
import { computed, ref } from 'vue'
import Cover from '@/components/Cover.vue'
import FirstPage from '@/components/FirstPage.vue'
import SecondPage from '@/components/SecondPage.vue'
import ThirdPage from '@/components/ThirdPage.vue'
import FinalPage from '@/components/FinalPage.vue'

export default {
  name: 'App',
  setup () {
    const steps = [Cover, FirstPage, SecondPage, ThirdPage, FinalPage]
    const step = ref(0)
    const currentComponent = computed(() => steps[step.value])
    const onNext = () => {
      step.value++
    }
    const onPlayBGM = () => {
      document.getElementById('bgm').play()
    }

    return {
      currentComponent,
      onNext,
      onPlayBGM
    }
  }
}
</script>

<style lang="scss">
* {
  font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

html, body {
  background-color: #ffd2d2;
  color: #fff;
}

.text-shadow {
  text-shadow: 0.1rem 0.1rem 0.2rem #0005;
}

.no-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */
  }
}
</style>
