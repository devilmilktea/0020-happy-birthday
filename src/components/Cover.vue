<template>
  <div class="cover-container">
    <h1 :class="fadeAnimation" class="date text-shadow">11／23</h1>
    <h2 :class="fadeAnimation" class="text text-shadow">Happy Birthday</h2>
    <button v-if="!clickedNext" class="btn-next animate__animated animate__heartBeat animate__infinite" @click="onClickNext">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" class="iconify iconify--mdi" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="transform: rotate(360deg);"><path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42z" fill="currentColor"></path></svg>
    </button>
    <div v-if="clickedNext" class="bubbles-container">
      <div v-for="(bubble, index) in bubbles" :key="`bubble-${index}`" :style="bubble" class="bubble-container">
        <div class="bubble"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { delay } from '@/utils'
import { computed, ref } from 'vue'

export default {
  setup (props, { emit }) {
    const bubbleAnimationTime = 6000
    const generateBubbles = () => {
      return (new Array(200))
        .fill(null)
        .map(() => {
          const bubbleX = Math.floor(Math.random() * 100) + 1
          const bubbleSize = Math.floor(20 + Math.random() * 40)
          const bubbleEndBlank = Math.floor(Math.random() * 1000)
          const bubbleDelay = Math.floor(Math.random() * 4000)
          const bubbleDuration = bubbleAnimationTime - bubbleDelay - bubbleEndBlank

          return {
            '--bubble-x': `${bubbleX}%`,
            '--bubble-size': `${bubbleSize}px`,
            '--bubble-delay': `${bubbleDelay}ms`,
            '--bubble-duration': `${bubbleDuration}ms`
          }
        })
    }
    const bubbles = ref(generateBubbles())

    const clickedNext = ref(false)
    const fadeAnimation = computed(() => {
      return clickedNext.value
        ? ['animate__animated', 'animate__fadeOut', 'animate__delay-4s', 'animate__slow']
        : null
    })
    const onClickNext = async () => {
      emit('play-bgm')

      clickedNext.value = true
      await delay(bubbleAnimationTime)
      document.querySelector('.cover-container').classList.add(...['animate__animated', 'animate__fadeOut'])
      await delay(1000)
      emit('next')
    }

    return {
      clickedNext,
      onClickNext,
      fadeAnimation,
      bubbles
    }
  }
}
</script>

<style lang="scss">
.cover-container {
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::before,&::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 100vmax;
    height: 2.5vh;
    transform: translate(-50%, -50%) rotate(-30deg);
    background-color: #fff;
  }

  &::before {
    top: 6vmax;
    left: 8vmax;
  }

  &::after {
    top: calc(100% - 6vmax);
    left: calc(100% - 8vmax);
  }

  .date {
    font-family: 'Open Sans Condensed', sans-serif;
    letter-spacing: 0.5rem;
    padding: 2rem;
    font-size: max(10vw, 4rem);
  }

  .text {
    padding: 0 0 0.6rem 0;
    border-bottom: 0.2rem solid #fff;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: max(5vw, 2rem);
  }

  .btn-next {
    position: absolute;
    bottom: 8vh;
    display: inline-block;
    background-color: transparent;
    border: none;
    outline: none;

    font-size: 4rem;
    color: #fff;
    cursor: pointer;
  }

  .bubbles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .bubble-container {
      position: absolute;
      left: var(--bubble-x);
      transform: translate(-50%, -50%);
      animation: bubble-move var(--bubble-duration) ease-in var(--bubble-delay) both;

      @keyframes bubble-move {
        0% {
          top: 120%;
        }
        100% {
          top: -20%;
        }
      }

      .bubble {
        position: relative;
        width: var(--bubble-size);
        height: var(--bubble-size);
        background:rgba(255,255,255,0.3);
        border-radius:100%;

        &::before {
          content: '';
          position: absolute;
          left: 20%;
          top: 21%;
          width: 25%;
          height: 25%;
          background:rgba(255,255,255,0.5);
          border-radius:100%;
        }
      }
    }

  }
}
</style>
