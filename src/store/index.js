import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(axios)

export const store = new Vuex.Store({
  state: {
    repositories: [],
    user: null,
    authError: null
  },
  getters: {
    repositories (state) {
      return state.repositories.map((x) => {
        return {
          title: x.name.substring(0, 30),
          url: x.html_url,
          description: x.description,
          stars_num: x.stargazers_count,
          issues_num: x.open_issues,
          user_name: x.owner.login,
          user_avatar: x.owner.avatar_url,
          created_at: moment().diff(moment(x.created_at), 'days')
        }
      })
    },
    user (state) {
      return state.user
    },
    authError (state) {
      return state.authError
    }
  },
  mutations: {
    getRepositories (state, payload) {
      state.repositories = state.repositories.concat(payload)
      return state.repositories.concat(payload)
    },
    setUser (state, payload) {
      return state.user = payload
    },
    setAuthError (state, payload) {
      return state.authError = payload
    }
  },
  actions: {
    getRepositories (context, page) {
      return axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`)
      .then((res) => {
        context.commit('getRepositories', res.data.items)
      })
    },

    signUp (context, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        return context.commit('setUser', user.user.uid)
      })
      .catch((err) => {
        return context.commit('setAuthError', err.message)
      })
    },

    signIn (context, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        return context.commit('setUser', user.user.uid)
      })
      .catch((err) => {
        return context.commit('setAuthError', err.message)
      })
    },

    refreshAuthState (context, payload) {
      return context.commit('setUser', payload.uid)
    },

    logout (context) {
      firebase.auth().signOut();
      context.commit('setUser', null)
    }
  }
})
