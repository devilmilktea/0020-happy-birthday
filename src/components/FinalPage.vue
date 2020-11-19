<template>
  <div class="finalpage-container">
    <p class="paragraph text-shadow">
      <span v-for="(char, i) in text" :key="`char-${i}`" class="animate__animated animate__bounceIn">{{ char }}</span>
    </p>
    <div class="scene">
      <sprite-player class="char-1" alternate flipHorizontal :duration="2000" :sprites="[
        '/images/sprites/char_1/love/stand1_0.png',
        '/images/sprites/char_1/love/stand1_1.png',
        '/images/sprites/char_1/love/stand1_2.png',
      ]"></sprite-player>
      <sprite-player class="char-2" alternate :duration="2000" :sprites="[
        '/images/sprites/char_2/love/stand1_0.png',
        '/images/sprites/char_2/love/stand1_1.png',
        '/images/sprites/char_2/love/stand1_2.png',
      ]"></sprite-player>
      <sprite-player class="pet-1" alternate flipHorizontal :duration="1000" :sprites="[
        '/images/sprites/pet_1/stand1_0.png',
        '/images/sprites/pet_1/stand1_1.png',
        '/images/sprites/pet_1/stand1_2.png',
      ]"></sprite-player>
      <sprite-player class="pet-2" alternate :duration="4000" :sprites="[
        '/images/sprites/pet_2/stand0_0.png',
        '/images/sprites/pet_2/stand0_1.png',
        '/images/sprites/pet_2/stand0_2.png',
        '/images/sprites/pet_2/stand0_3.png',
        '/images/sprites/pet_2/stand0_4.png',
        '/images/sprites/pet_2/stand0_5.png',
        '/images/sprites/pet_2/stand0_6.png',
        '/images/sprites/pet_2/stand0_7.png',
        '/images/sprites/pet_2/stand0_8.png',
        '/images/sprites/pet_2/stand0_9.png',
        '/images/sprites/pet_2/stand0_10.png',
        '/images/sprites/pet_2/stand0_11.png',
      ]"></sprite-player>
    </div>
  </div>
</template>

<script>
import SpritePlayer from './SpritePlayer.vue'
import { useSentencesTyping } from '@/utils/text-typing'
import { delay } from '@/utils'
import { onMounted } from 'vue'

export default {
  components: { SpritePlayer },
  setup (props, { emit }) {
    const sentences = [
      {
        text: '最後，'
      },
      {
        text: '20 歲了，'
      },
      {
        text: '期待我們繼續一起越來越好吧！',
        keep: true
      }
    ]
    const { text, typeSentences } = useSentencesTyping()

    onMounted(async () => {
      document.querySelector('.finalpage-container').classList.add(...['animate__animated', 'animate__fadeIn'])
      await delay(1000)
      document.querySelector('.finalpage-container').classList.remove(...['animate__animated', 'animate__fadeIn'])
      await typeSentences(sentences)
    })

    return {
      text
    }
  }
}
</script>

<style lang="scss">
.finalpage-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .paragraph {
    min-height: 10rem;
    margin: 0 10vw;
    padding: 1rem;
    border-radius: 1rem;

    font-size: max(3vmin, 2rem);
    line-height: 1.5;
    text-align: center;
  }

  .scene {
    position: relative;
    width:  100%;
    height: 6rem;
    transform: scale(1.5);

    @media screen and (max-width: 400px) {
      transform: scale(1.25);
    }

    .sprite {
      position: absolute;
      bottom: 0;

      &.char-1 {
        left: calc(50% - 3rem);
      }

      &.char-2 {
        left: calc(50% + 3rem);
      }

      &.pet-1 {
        left: calc(50% - 6rem);
      }

      &.pet-2 {
        left: calc(50% + 6rem);
      }
    }
  }
}
</style>
