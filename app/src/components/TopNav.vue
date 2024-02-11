<template>
  <!-- <div class="top-nav">
    <strong>Student Athlete Co</strong>
    Welcome, {{ azureB2CAuthStore.activeUserAccount?.name }}

    <VBtn v-if="azureB2CAuthStore.activeUserAccount" size="sm" @click="signOut">Sign Out</VBtn>
    <VBtn v-else>Sign In</VBtn>
  </div> -->
  <v-app-bar>
    <strong>Student Athlete Co</strong>
    Welcome, {{ azureB2CAuthStore.activeUserAccount?.name }}

    <VBtn v-if="azureB2CAuthStore.activeUserAccount" @click="signOut">Sign Out</VBtn>
    <VBtn v-else>Sign In</VBtn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAzureB2CAuthStore } from '../stores/azureB2CAuthStore'

const azureB2CAuthStore = useAzureB2CAuthStore()

const signOut = async () => {
  await azureB2CAuthStore.logoutActiveUser()
}
</script>

<style scoped>
.top-nav {
  background-color: #242424;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid grey;
  padding: 1rem;
  color: white;
  height: 60px;
}

button {
  color: white;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
