<template>
  <div class="firstpage-container">
    <p class="paragraph text-shadow">
      <span v-for="(char, i) in text" :key="`char-${i}`" class="animate__animated animate__bounceIn">{{ char }}</span>
    </p>
    <div class="scene">
      <sprite-player alternate :duration="2000" :sprites="[
        '/images/sprites/char_2/smile/stand1_0.png',
        '/images/sprites/char_2/smile/stand1_1.png',
        '/images/sprites/char_2/smile/stand1_2.png',
      ]"></sprite-player>
    </div>
  </div>
</template>

<script>
import SpritePlayer from './SpritePlayer.vue'
import { onMounted, computed } from 'vue'
import { useSentencesTyping } from '@/utils/text-typing'
import { delay } from '@/utils'

export default {
  components: { SpritePlayer },
  setup (props, { emit }) {
    const sentences = [
      {
        text: '嗨！子凌寶貝！'
      },
      {
        text: '今天是你的 20 歲生日，'
      },
      {
        text: '先跟你說聲生日快樂！'
      },
      {
        text: '我不太會寫生日的祝福所以就還是著重於我對你的感情吧！',
        keep: true
      }
    ]

    const { text, typeSentences } = useSentencesTyping()
    const outputText = computed(() => text.value.trim().length === 0
      ? '　'
      : text.value)

    onMounted(async () => {
      document.querySelector('.firstpage-container').classList.add(...['animate__animated', 'animate__fadeIn'])
      await delay(1000)
      document.querySelector('.firstpage-container').classList.remove(...['animate__animated', 'animate__fadeIn'])
      await typeSentences(sentences)
      document.querySelector('.firstpage-container').classList.add(...['animate__animated', 'animate__fadeOut'])
      await delay(1000)
      emit('next')
    })

    return {
      text: outputText
    }
  }
}
</script>

<style lang="scss">
.firstpage-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .paragraph {
    margin: 0 10vw;
    padding: 1rem;
    border-radius: 1rem;

    font-size: max(3vmin, 1.5rem);
    line-height: 1.5;
    text-align: center;

    background-color: rgba(255, 255, 255, 0.3);
    color: #fff;
  }

  .scene {
    position: relative;
    width:  100%;
    height: 6rem;

    .sprite {
      position: absolute;
      left: 50%;
      bottom: 0
    }
  }
}
</style>
