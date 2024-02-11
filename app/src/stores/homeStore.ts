import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { homeApi } from '../axios/instances/homeApi'

export const useHomeStore = defineStore('home', () => {
  const message = ref<string>('')
  const date = ref<string>('')
  const messageLength = computed<number>(() => message.value.length)

  async function getMessage(): Promise<void> {
    message.value = await homeApi.getMessage()
  }

  async function getDate(): Promise<void> {
    date.value = await homeApi.getDate()
  }

  return {
    message,
    date,
    messageLength,
    getMessage,
    getDate,
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }
