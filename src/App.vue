<template>
  <v-app>
    <v-app-bar color="white" fixed>
      <router-link to="/" style="cursor: pointer; text-decoration: none; color: black;">
        <v-toolbar-title class="ml-4">Armond Market</v-toolbar-title>
      </router-link>

      <v-container fluid>
        <v-row justify="center" align="center" class="navbar_main">
          <v-toolbar-items>
              <v-col>
                <router-link to="/productList" style="cursor: pointer; text-decoration: none; color: black;">
                  <btn class="navbar_btn"><span class="navbar_btn_text yellow_line">작품 보기</span></btn>
                </router-link>
              </v-col>
              <v-col>
                <btn class="navbar_btn"><span class="navbar_btn_text pink_line">Link 2</span></btn>
              </v-col>
              <v-col>
                <btn class="navbar_btn"><span class="navbar_btn_text pink_line">Link 3</span></btn>
              </v-col>
          </v-toolbar-items>
        </v-row>
      </v-container>

      <!-- 우측에 추가메뉴 아이콘을 넣기 위해 v-spacer 엘리먼트 사용 -->
      <v-spacer></v-spacer>

      <v-card class="pa-4" flat width="300px" :style="{'display': searchYn ? '' : 'none'}">
        <v-text-field
          v-model="searchMsg"
          clearable
          hide-details
          append-icon="mdi-magnify"
          underlined
          label="검색어를 입력하세요."
          type="text"
          @click:append="fnSearch()"
        />
        </v-card>

      <nav>
        <div>
          <router-link to="/" >
              <v-icon large @click="fnSearchClick()" :style="{'display': searchYn ? 'none' : ''}">mdi-magnify</v-icon>
          </router-link>
          
          <router-link to="/login" label="로그인">
            <v-btn text v-if="!fnGetAuthStatus">
              <v-icon large>mdi-login-variant</v-icon>
            </v-btn>
          </router-link>

          <router-link to="/" >
            <v-btn text @click="fnDoLogout" v-if="fnGetAuthStatus">
              <v-icon large>mdi-logout-variant</v-icon>
            </v-btn>
          </router-link>

          <router-link to="/" >
            <v-icon large>mdi-account-circle</v-icon>
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
    data(){
      return{
        // 검색창 입력값 변수
        searchMsg: '',

        // 검색버튼 클릭값 변수
        searchYn: false  
      }
    },
    computed: {
      // 스토어에서 현재 인증 상태인지 반환
      fnGetAuthStatus() {
        return this.$store.getters.fnGetAuthStatus
      },
    },
    methods:{
      fnSearch(){
        if(this.searchMsg.length > 0){
          alert('검색창에 ' + this.searchMsg + " 입력 되었습니다.");
        }else{
          this.searchYn = false
          alert('검색어를 입력해주세요.');
        }
      },

      fnSearchClick(){
        return this.searchYn = !this.searchYn; 
      },

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

  .navbar_main{
    position: relative;
    box-sizing: border-box;
    font-size: 1.2rem;
    font-weight: normal;
    color: rgba(0,0,0,.4);
  }

  .navbar_btn{
      text-decoration: none;
      margin: 1rem;
      color: black;
      padding:0px;
      font-size: 1rem;
      width:100%;
  }
  .navbar_btn_text{
      box-sizing: border-box;
      color: black;
      margin: 0px;
  }
  .navbar_btn_text::before{
      content: "";
      box-sizing: border-box;
      border-radius: 5px;
      height: 3px;
      background: black;
      position: absolute;
      width: 100%;
      bottom: 40%;
      visibility: hidden;
      transform: scaleX(0);
      transition: 0.15s linear;
  }
  .navbar_btn_text:hover::before,
  .navbar_btn_text:focus::before{
      color: aqua;
  }

</style>