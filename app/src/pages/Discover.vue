<template>
  <div class="main-container">
    <h2>Discover</h2>

    <div class="flexin">
      <VTextField v-model="searchText" label="Athlete name">
        <template #append-inner>
          <VBtn variant="text" rounded="xl" @click="searchText = ''">
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </VBtn>
        </template>
      </VTextField>
    </div>

    <div>
      <VExpansionPanels>
        <VExpansionPanel v-for="(athlete, i) in athletesComputed" :key="i" hide-actions>
          <VExpansionPanelTitle>
            <VRow align="center" class="spacer" no-gutters>
              <VCol cols="4" sm="2" md="1">
                <VAvatar size="36px">
                  <VImg
                    v-if="athlete.avatar"
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  ></VImg>
                  <span v-else> {{ athlete.initials }} </span>
                </VAvatar>
              </VCol>

              <VCol class="hidden-xs-only text-left ms-2" sm="5" md="3">
                <strong> {{ athlete.name }} </strong>
              </VCol>

              <VCol class="text-no-wrap text-left" cols="5" sm="3">
                <VChip :color="`blue-lighten-1`" class="ms-0 me-2" label small> Tag </VChip>
                <strong> {{ athlete.title }} </strong>
              </VCol>

              <VCol v-if="athlete.excerpt" class="text-medium-emphasis text-truncate hidden-sm-and-down">
                &mdash;
                {{ athlete.excerpt }}
              </VCol>
            </VRow>
          </VExpansionPanelTitle>

          <VExpansionPanelText>
            <VCardText> {{ lorem }} </VCardText>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const athletes = ref([
  {
    avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    name: 'John Leider',
    initials: 'JL',
    title: 'Baseball',
    excerpt: 'Some athlete...',
  },
  {
    avatar: null,
    name: 'Lionel Messi',
    initials: 'LM',
    title: 'Basketball',
    excerpt: 'Some athlete...',
  },
  {
    avatar: null,
    name: 'Cristiano Ronaldo',
    initials: 'CR',
    title: 'Football',
    excerpt: 'Some athlete...',
  },
])

const lorem =
  'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'

const searchText = ref<string>('')

const athletesComputed = computed(() => {
  let result = JSON.parse(JSON.stringify(athletes.value))

  if (searchText.value) {
    result = result.filter((athlete: any) => {
      return athlete.name.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }

  return result
})
</script>

<style scoped></style>
