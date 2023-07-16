import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/compat/app'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'main_page',
    component: ()=> import('../components/main_page.vue'),
    // 메인페이지는 인증과 연동
    mate:{bAuth: true}
  },
  {
    path:'/login',
    name: 'login_page',
    component: ()=> import('../components/login_page.vue')
  },
  {
    path:'/join',
    name: 'join_page',
    component: ()=> import('../components/join_page.vue')
  },
  {
    path:'/joinFinish',
    name:'joinFinish_page',
    component: ()=> import('../components/joinFinish_page.vue')
  },
  {
    path:'/productList',
    name:'productList_page',
    component: ()=> import('../components/productList_page.vue')
  },
  {
    path:'/armondPlus',
    name:'armondPlus_page',
    component: ()=> import('../components/armondPlus_page.vue')
  },
  {
    path:'/terms',
    name:'terms_page',
    component: ()=> import('../components/terms_page.vue')
  },
  {
    path:'/personal',
    name:'personal_page',
    component: ()=> import('../components/personal_page.vue')
  },
  {
    // 사용자가 라우터에 등록된 것 외에 다른 주소 입력 시 아래 에러 페이지 연결
    path: '/*',
    name: 'error_page',
    component: ()=> import('../components/error_page.vue')
  }
]

const router = new VueRouter({
  routes
})

// 라우터 이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
router.beforeEach((to, from, next)=>{
  const bNeedAuth = to.matched.some(record => record.meta.bAuth)
  const bCheckAuth = firebase.auth().currentUser
  if(bNeedAuth && !bCheckAuth){ // 인증받는 사람이 아직 확인을 안받았을 때
    next('/login')
  }else{ // 인증 받은 사람이 다음 페이지 넘어가기
    next()
  }
})

export default router
