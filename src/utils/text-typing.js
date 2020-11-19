import { ref } from 'vue'
import { delay } from '@/utils'

export const useTextTyping = () => {
  let locked = false
  const text = ref('')
  const typeText = async (str, typeFreq = 100) => {
    if (locked) return
    locked = true
    for (const c of str) {
      text.value = `${text.value}${c}`
      await delay(typeFreq)
    }
    locked = false
  }
  const clearText = async (backFreq = 80) => {
    if (locked) return
    locked = true
    for (let i = text.value.length; i > 0; i--) {
      text.value = text.value.substring(0, i - 1)
      await delay(backFreq)
    }
    locked = false
  }

  return {
    text,
    typeText,
    clearText
  }
}

/*
interface Sentence {
  text: string;
  typeFreq?: number;
  backFreq?: number;
  startDelay?: number;
  stopDelay?: number;
  keep?: boolean;
}
*/

export const useSentencesTyping = () => {
  const { text, typeText, clearText } = useTextTyping()

  const typeSentences = async (sentences) => {
    for (const sentence of sentences) {
      const { text: str, typeFreq, backFreq, startDelay = 200, stopDelay = 1000, keep = false } = sentence
      if (startDelay > 0) await delay(startDelay)
      await typeText(str, typeFreq)
      if (stopDelay > 0) await delay(stopDelay)
      if (!keep) await clearText(backFreq)
    }
  }

  return {
    text,
    typeSentences
  }
}
