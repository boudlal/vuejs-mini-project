// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAQ5NNMxiSkyGTx77QeJybdNjvUA9ry5JA",
      authDomain: "vuejs-mini.firebaseapp.com",
      databaseURL: "https://vuejs-mini.firebaseio.com",
      projectId: "vuejs-mini",
      storageBucket: "vuejs-mini.appspot.com",
      messagingSenderId: "55064166071"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('changeLoading', true)
        this.$store.dispatch('refreshAuthState', user)
      }else {
        this.$store.dispatch('changeLoading', false)
      }
    })
  }
})
