<template>
  <v-app>
    <v-app-bar color="white" fixed>
      <router-link to="/" style="cursor: pointer; text-decoration: none; color: black;">
        <v-toolbar-title class="ml-4">Armond</v-toolbar-title>
      </router-link>

      <div class="menuBar">
        <v-toolbar-items class="text-center">
          <v-row justify="center" align="center">

            <v-col cols="3" offset="6">
              <router-link :to="fnGetButtonLink">
                <button type="button" class="menuBtn">
                  <v-icon>mdi-palette</v-icon>
                  예술품 구경하기
                </button>
              </router-link>
            </v-col>

          </v-row>
        </v-toolbar-items>
      </div>

      <!-- 우측에 추가메뉴 아이콘을 넣기 위해 v-spacer 엘리먼트 사용 -->
      <v-spacer></v-spacer>
      <nav>
        <div>          
          <router-link to="/login" label="로그인">
            <v-btn text v-if="!fnGetAuthStatus">
              <v-icon large>mdi-login-variant</v-icon>
              로그인
            </v-btn>
          </router-link>

          <router-link to="/" >
            <v-btn text @click="fnDoLogout" v-if="fnGetAuthStatus">
              <v-icon large>mdi-logout-variant</v-icon>
              로그아웃
            </v-btn>
          </router-link>
        </div>
      </nav>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer>
      <!-- 선택된 메뉴는 sSeclect 데이터를 연종시켜 바인딩 -->
      <v-bottom-navigation absolute dark>
        <v-container>
          <v-row justify="center" align="center" >
            
            <v-col cols="12" sm="6" md="4" lg="3" xl="1">
              <router-link to="/armondPlus">
                <v-btn text color="white" icon plain value="almond+">armond+</v-btn>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="3" xl="1">
              <router-link to="/terms">
                <v-btn text width="100" color="white" icon plain value="이용약관">이용약관</v-btn>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="3" xl="1">
              <router-link to="/personal">
                <v-btn text width="120" color="white" icon plain value="개인정보처리방침">개인정보처리방침</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      // 스토어에서 현재 인증 상태인지 반환
      fnGetAuthStatus() {
        return this.$store.getters.fnGetAuthStatus
      },
      fnGetButtonLink() {
        // 사용자 로그인 여부 확인
        const isLoggedIn = this.fnGetAuthStatus;

        // 로그인되어 있으면 "/productList"로 이동, 그렇지 않으면 "/login"으로 이동
        return isLoggedIn ? '/productList' : '/login';
      },
    },
    methods:{
      // 스토어의 로그아웃 기능 사용
      fnDoLogout() {
        this.$store.dispatch('fnDoLogout')
      }
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap');

  v-app {
    font-family: 'IBM Plex Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .menuBar{
    margin: 0 0 0 80px;
    width: 1000px;
  }

  .menuBtn{
    color: rgb(102, 102, 102);
    font-size: 16px;
  }

  .menuBtn:hover{
    font-weight: 600;
    font-size: 17px;
    text-shadow: 2px 2px 6px rgb(218, 218, 218);
    color: black;
  }

</style>