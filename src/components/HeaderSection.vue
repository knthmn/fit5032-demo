<script setup>
import router from '@/router'
import { defineEmits } from 'vue'
import { RouterLink } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const emit = defineEmits(['authenticated'])

const user = useCurrentUser()

const logMeOut = () => {
  console.log('Logging out')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
  emit('authenticated', false)
  router.push('/register')
  // location.reload()
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Healthy Bytes</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/health">My Health</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/messageboard">Message Board</RouterLink>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logMeOut">Logout</a>
          </li>
          <div>
            {{ user?.email }}
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped></style>
