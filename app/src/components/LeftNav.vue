<template>
  <div class="left-nav">
    <div class="container-one">
      <RouterLink to="/home" class="nav-link"> Home </RouterLink>
      <RouterLink to="/discover" class="nav-link"> Discover </RouterLink>
    </div>
    <div class="container-two">
      <RouterLink to="/settings" class="nav-link"> Settings </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.left-nav {
  background-color: #242424;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding: 0;
  border-right: 1px solid grey;
  width: 90px;
}

.container-one {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container-two {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.nav-link {
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid grey;
  padding: 1rem;
  color: white;
}
.nav-link:hover {
  color: #aaaaaa;
}
.router-link-active {
  color: #535bf2;
}
</style>
