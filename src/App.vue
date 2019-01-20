<template>
  <div id="app">
    <header-component />
    <router-view/>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from './components/LayoutComponents/HeaderComponent'
import FooterComponent from './components/LayoutComponents/FooterComponent'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
