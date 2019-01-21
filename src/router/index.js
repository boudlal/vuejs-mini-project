import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import RepositoryComponent from '@/components/RepositoriesListComponent'
import SignUpComponent from '@/components/AuthComponents/SignUpComponent'
import SignInComponent from '@/components/AuthComponents/SignInComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: RepositoryComponent,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpComponent
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInComponent
    }
  ]
})
