<template>
  <nav-bar/>
  <chat/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar,
    'chat': Chat
  }
}
</script>
