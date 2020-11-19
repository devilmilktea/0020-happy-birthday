<template>
  <div class="thirdpage-container">
    <div class="photo-stack">
      <div v-for="(photo, i) in photos" :key="`photo-${i}`" class="photo animate__animated animate__zoomIn">
        <img :src="photo">
      </div>
    </div>
    <p class="text text-shadow">{{ text }}</p>
  </div>
</template>

<script>
import { useSentencesTyping } from '@/utils/text-typing'
import { delay } from '@/utils'
import { onMounted, ref } from 'vue'

export default {
  setup (props, { emit }) {
    const time = 7000
    const sentences = [
      {
        text: '有時我會翻翻以前的照片，'
      },
      {
        text: '我喜歡一邊看著照片一邊回想照片的當下，'
      },
      {
        text: '偷偷說，'
      },
      {
        text: '我有的時候會看著看著在那邊傻笑哈哈！',
        keep: true
      }
    ]
    const { text, typeSentences } = useSentencesTyping()

    const photos = ref([])
    const photosSrc = (new Array(6)).fill(null)
      .map((_, i) => `/images/photos/${i + 1}.jpg`)
    const playPhotos = async () => {
      for (const src of photosSrc) {
        await delay(time / photosSrc.length)
        photos.value.push(src)
      }
    }

    onMounted(async () => {
      playPhotos()
      await delay(time + 2000)
      await typeSentences(sentences)
      await delay(2000)
      document.querySelector('.thirdpage-container').classList.add(...['animate__animated', 'animate__fadeOut'])
      await delay(1000)
      emit('next')
    })

    return {
      text,
      photos
    }
  }
}
</script>

<style lang="scss">
.thirdpage-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .photo-stack {
    position: relative;
    width: 40vmax;
    height: 40vmax;

    .photo {
      position: absolute;
      display: inline-block;
      padding: 1vmax;
      background-color: #fcfcfc;
      box-shadow: 2px 2px 5px#0003;

      img {
        display: inline-block;
        width: 40vmin;
        height: 28vmin;
        object-fit: cover;
      }

      &:nth-child(1) {
        top: 40%;
        left: 40%;
        transform: translate(-50%, -50%) rotateZ(-10deg);

        img {
          object-position: 50% 40%;
        }
      }

      &:nth-child(2) {
        top: 45%;
        left: 60%;
        transform: translate(-50%, -50%) rotateZ(8deg);

        img {
          object-position: 50% 10%;
        }
      }

      &:nth-child(3) {
        top: 60%;
        left: 30%;
        transform: translate(-50%, -50%) rotateZ(-9deg);

        img {
          object-position: 50% 20%;
        }
      }

      &:nth-child(4) {
        top: 55%;
        left: 65%;
        transform: translate(-50%, -50%) rotateZ(13deg);
      }

      &:nth-child(5) {
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(-5deg);

        img {
          object-position: 50% 100%;
        }
      }

      &:nth-child(6) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(0deg);

        img {
          object-position: 70% 100%;
        }
      }
    }
  }

  .text {
    height: 3rem;
    padding: 0 2rem;
    font-size: 2rem;
  }
}
</style>
