import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(axios)

export const store = new Vuex.Store({
  state: {
    repositories: []
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
    }
  },
  mutations: {
    getRepositories (state, payload) {
      this.state.repositories = this.state.repositories.concat(payload)
      return this.state.repositories.concat(payload)
    }
  },
  actions: {
    getRepositories (context, page) {
      return axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`)
      .then((res) => {
        context.commit('getRepositories', res.data.items)
      })
    }
  }
})
