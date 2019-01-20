import Vue from 'vue'
import Router from 'vue-router'
import RepositoryComponent from '@/components/RepositoriesListComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RepositoryComponent',
      component: RepositoryComponent
    }
  ]
})
