import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';

Vue.use(Viewer);

// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'
import '@/datasources/firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created(){
    // 사용자가 로그아웃, 비밀번호 변경 등의 변경을 했을 때 처리
    firebase.auth().onAuthStateChanged(pUserInfo => {
      if(pUserInfo !== null){
        // 이미 로그인 되어있었는지 등의 상태를 파악하여 처리함
        store.dispatch('fnDoLoginAuto',pUserInfo)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')