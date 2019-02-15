import Vue from 'vue'
import Router from 'vue-router'

import ComicsList from '@components/ComicsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GetComics',
      component: ComicsList
    },
  ]
})
