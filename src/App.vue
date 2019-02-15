<template>
  <div id="app">
    <ComicList/>
  </div>
</template>

<script>
import ComicList from './components/ComicList.vue'

export default {
  name: 'app',
  components: {
    ComicList
  }
}
</script>

<style>
#app {
  font-family: Monaco;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #96A8C8;
}
</style>
