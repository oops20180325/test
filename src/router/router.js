/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// component 里可以用require直接引入文件吗 如何可以那么用import可以吗

const router = new VueRouter({
  routes: [{
    path: '/index',
    component: require('../views/index'),
    children: [
      {
        path: 'rage',
        component: require('../views/rage')
      },
      {
        path: 'songList',
        component: require('../views/songList')
      },
      {
        path: 'leaderBoard',
        component: require('../views/leaderBoard')
      },
      {
        path: 'hotSinger',
        component: require('../views/hotSinger')
      }
    ]
  }, {
    name: 'playerDetail',
    path: '/playerDetail/:id',
    component: require('../views/playerDetail')
  }, {
    path: '/playListDetail/:id',
    name: 'playListDetail',
    component: require('../views/playListDetail')
  }, {
    // *号表示任意，即第一项任意是什么都都重定向到'/index/rage
    path: '*', redirect: '/index/rage'
  }]
})

export default router
