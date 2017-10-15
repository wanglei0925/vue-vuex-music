import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import rank from 'components/rank/rank'
import singer from 'components/Singer/singer'
import singerdetail from 'components/Singer-detail/singer-detail'
import search from 'components/search/search'
import disc from 'components/disc/disc'
import user from 'components/user/user'
import wtoplist from 'components/wtoplist/wtoplist'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: wtoplist
        }
      ]
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerdetail
        }
      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: ':id',
          component: singerdetail
        }
      ]
    }
  ]
})
