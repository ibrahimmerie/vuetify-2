<template>
  <div class="main-container">
    <h2>Hello App!</h2>

    <div class="flexin">
      <VBtn :loading="loading1" @click="refreshData">Refresh Data</VBtn>
      <span> {{ data1 || 'No data' }} </span>
    </div>

    <div class="flexin">
      <VBtn :loading="loading2" @click="getMessage">Get API Message</VBtn>
      <span> {{ homeStore.message || '-' }} </span>
    </div>

    <div class="flexin">
      <VBtn :loading="loading3" @click="getDate">Get API Date</VBtn>
      <span> {{ homeStore.date || '-' }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()

const data1 = ref<string>('')
const loading1 = ref<boolean>(false)
const loading2 = ref<boolean>(false)
const loading3 = ref<boolean>(false)

const refreshData = () => {
  loading1.value = true

  window.setTimeout(() => {
    data1.value = String(new Date(Date.now()))
    loading1.value = false
  }, 1000)
}

const getMessage = async () => {
  loading2.value = true
  await homeStore.getMessage()
  loading2.value = false
}

const getDate = async () => {
  loading3.value = true
  await homeStore.getDate()
  loading3.value = false
}

window.setTimeout(() => {
  refreshData()
}, 1500)
</script>

<style scoped></style>
