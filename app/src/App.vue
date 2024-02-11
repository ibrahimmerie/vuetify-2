<template>
  <VApp>
    <VAppBar prominent shrink-on-scroll>
      <VToolbarTitle>Student Athlete Co</VToolbarTitle>
      <span v-if="isSignedIn"> Welcome, {{ azureB2CAuthStore.activeUserAccount?.name }} </span>
      <VSpacer></VSpacer>
      <template #append>
        <VBtn
          style="margin-right: 15px"
          :title="isDarkMode ? 'Turn on lights' : 'Turn off lights'"
          @click="toggleTheme"
        >
          <FontAwesomeIcon v-if="isDarkMode" size="lg" :color="iconColor" icon="fa-solid fa-moon" />
          <FontAwesomeIcon v-else size="lg" :color="iconColor" icon="fa-solid fa-sun" />
        </VBtn>

        <VBtn v-if="isSignedIn" variant="outlined" @click="signOut">Sign Out</VBtn>
        <VBtn v-else @click="signIn">Sign In</VBtn>
      </template>
    </VAppBar>

    <VNavigationDrawer permanent rail rail-width="80">
      <VList density="compact" nav>
        <VListItem>
          <RouterLink to="/home" title="Home" class="nav-link">
            <FontAwesomeIcon size="lg" :color="iconColor" icon="fa-solid fa-house" />
          </RouterLink>
        </VListItem>
        <VListItem>
          <RouterLink to="/discover" title="Discover" class="nav-link">
            <FontAwesomeIcon size="lg" :color="iconColor" icon="fa-solid fa-magnifying-glass" />
          </RouterLink>
        </VListItem>
      </VList>

      <template #append>
        <VList density="compact" nav>
          <VListItem>
            <RouterLink to="/settings" title="Settings" class="nav-link">
              <FontAwesomeIcon size="lg" :color="iconColor" icon="fa-solid fa-gear" />
            </RouterLink>
          </VListItem>
        </VList>
      </template>
    </VNavigationDrawer>
    <VMain>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <Component :is="Component" />
        </KeepAlive>
      </RouterView>
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useAzureB2CAuthStore } from './stores/azureB2CAuthStore'

const azureB2CAuthStore = useAzureB2CAuthStore()

const signIn = async () => {
  await azureB2CAuthStore.handleLogin()
}

const signOut = async () => {
  await azureB2CAuthStore.logoutActiveUser()
}

const theme = useTheme()

const isSignedIn = computed<boolean>(() => !!azureB2CAuthStore.activeUserAccount)

const isDarkMode = computed<boolean>(() => {
  return theme.global.current.value.dark
})

const iconColor = computed<string>(() => {
  return isDarkMode.value ? 'gray' : 'black'
})

const toggleTheme = () => {
  const newVal = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newVal
  localStorage.setItem('vuetifyTheme', newVal)
}
</script>

<style scoped>
.router-link-active {
  background-color: #d2d2d2;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  height: 45px;
  border-radius: 5px;
  /* border: 1px solid gray; */
}

.nav-link:hover {
  background-color: #e5e5e5;
}
</style>
