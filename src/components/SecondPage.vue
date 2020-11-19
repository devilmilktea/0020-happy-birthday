<template>
  <div class="secondpage-container">
    <div class="flip-card" :class="{ flipped }">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="/images/photos/1.jpg">
        </div>
        <div ref="card" class="flip-card-back no-scrollbar">
          <p v-for="(section, i) in sections" :key="`section-${i}`" class="text text-shadow">{{ section.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue'
import { useSentencesTyping } from '@/utils/text-typing'
import { delay } from '@/utils'

export default {
  setup (props, { emit }) {
    const card = ref(null)

    const paragraph = '還記得剛認識的時候你總是說著自己可能會讓我失望、發現你不夠好啊什麼的這種沒有自信的話 🥺\n現在雖然就我看來離充滿自信還有一段路程要走 🤔\n但是相信你回頭看看過去與現在的自己，\n你會跟我一樣很開心發現到你已經進步了許多 😆\n聽到我說跟你聊天很開心的你，我真的覺得好可愛，\n跟你聊天總是能非常自然不顧慮太多，\n你的撒嬌也都讓我覺得好想把妳抱緊好好疼愛 ❤️'

    const sections = reactive(paragraph.split('\n')
      .map((text) => ({
        text,
        keep: true
      }))
      .map((sentence) => {
        const { text, typeSentences } = useSentencesTyping()

        return {
          text,
          startTyping: () => typeSentences([sentence])
        }
      }))

    const flipped = ref(false)

    onMounted(async () => {
      document.querySelector('.secondpage-container').classList.add(...['animate__animated', 'animate__fadeIn'])
      await delay(2000)
      document.querySelector('.secondpage-container').classList.remove(...['animate__animated', 'animate__fadeIn'])
      flipped.value = true
      await delay(1000)
      for (const section of sections) {
        await section.startTyping()
      }
      await delay(2000)
      document.querySelector('.secondpage-container').classList.add(...['animate__animated', 'animate__fadeOut'])
      await delay(1000)
      emit('next')
    })

    watch(() => sections.map(({ text }) => text), () => {
      const el = card.value
      el.scrollTo({
        top: el.scrollHeight
      })
    })

    return {
      card,
      flipped,
      sections
    }
  }
}
</script>

<style lang="scss">
.secondpage-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .flip-card {
    background-color: transparent;
    width: min(90%, 30rem);
    height: 80vh;
    perspective: 60rem;

    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      border-radius: 1.25rem;
    }

    &.flipped .flip-card-inner {
      transform: rotateY(-180deg);
    }

    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      backface-visibility: hidden;
      overflow: hidden;
    }

    .flip-card-front {
      color: black;

      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .flip-card-back {
      padding: 1.5rem;
      background-color: #ffe7e7;
      color: white;
      transform: rotateY(180deg);
      overflow: auto;

      .text {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        line-height: 1.5;
      }
    }
  }
}
</style>
