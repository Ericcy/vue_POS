import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import HuiYuan from '@/components/page/huiyuan'
import TongJi from '@/components/page/tongji'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/Pos',
      redirect: '/'
    },
    {
      path: '/huiyuan',
      name: 'HuiYuan',
      component: HuiYuan
    },
    {
      path: '/tongji',
      name: 'TongJi',
      component: TongJi
    }
  ]
})
