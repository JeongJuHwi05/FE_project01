<template>
  <div style="margin-bottom: 120px;">
    <!-- 슬라이드 배너 영역 -->
    <div style="margin-top: 60px; margin-bottom: 50px;">
      <v-carousel
        cycle
        height="550"
        hide-delimiter-background
        :touch="{
          left: () => swipe('Left'),
          right: () => swipe('Right'),
          up: () => swipe('Up'),
          down: () => swipe('Down')
        }"
        style="margin: 0%;"
        >
        <v-carousel-item
          v-for="(item,i) in bannerImg"
          :key="i"
          :src="item.src"
          reverse-trasition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>

    <!-- 맨 위로 올라오는 토글 버튼 -->
    <v-btn fab dark fixed bottom right v-show="showScrollTopButton" @click="scrollTop">
        <v-icon>mdi-arrow-up</v-icon>
    </v-btn>

    <!-- 본문 시작 -->
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center mt-6">
          <h1 class="display-1 font-weight-black">예술 구매의 시작, Art is Diamond</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" sm="12" md="6" lg="4" xl="4" v-for="item in miCardItems" :key="item.id" class="mt-2 mb-5">
          <v-img :src="item.url" height="400px"></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- 그림 추천 영역 -->
    <div class="divSection paintSection">
      <v-row>
        <v-col cols="12" class="text-center mt-6">
          <h1 class="display-1 font-weight-black google-font">아몬드 마켓, 그림 추천</h1>
        </v-col>
      </v-row>

      <!-- 그림 추천 카테고리 버튼 -->
      <v-row justify="center" class="mb-5 mt-2">
        <template v-for="(col, index) in paintingCols">
          <v-col :key="index" :cols="col.width" sm="12" md="4" lg="2" xl="2">
            <v-btn x-large text block rounded
            class="font-weight-bold text-h6 btnStyle"
            :class="{'active': clickPaintingBtnValue === col.value}"
            :style="{'background-color': clickPaintingBtnValue === col.value ? paintingBtnBackColors[col.value] : '#FFFFFF',
                    'color': clickPaintingBtnValue === col.value ? '#FFFFFF' : ''}"
            @click="fnPaintingBtnClick(col.value)">
              {{ col.label }}
            </v-btn>
          </v-col>
        </template>
      </v-row>

      <!-- 그림 추천 그림 영역 -->
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-col cols="3" sm="2" md="6" lg="12" xl="12" class="d-flex child-flex">
          <v-img height="400px" aspect-ratio="9/16" cover
            v-for="(name, index) in getPaintingItems"
            :key="index"
            :src="`image/painting/${clickPaintingBtnValue}/${name}`"
            class="mx-5 imgBorder"
          />
        </v-col>
      </v-row>
    </div>

    <!-- 도자기 추천 영역 -->
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center mt-6">
          <h1 class="display-1 font-weight-black google-font">아몬드 마켓, 도자기 추천</h1>
        </v-col>
      </v-row>

      <!-- 도자기 추천 카테고리 버튼 -->
      <v-row justify="center" class="mb-5 mt-2">
        <template v-for="(col, index) in potteryCols">
          <v-col :key="index" :cols="col.width" sm="12" md="4" lg="2" xl="2">
            <v-btn x-large text block rounded
            class="font-weight-bold text-h6 btnStyle"
            :class="{'active': clickPotteryBtnValue === col.value}"
            :style="{'background-color': clickPotteryBtnValue === col.value ? potteryBtnBackColors[col.value] : '#FFFFFF',
                  'color': clickPotteryBtnValue === col.value ? '#FFFFFF' : ''}"
            @click="fnPotteryBtnClick(col.value)">
              {{ col.label }}
            </v-btn>
          </v-col>
        </template>
      </v-row>

      <!-- 도자기 추천 그림 영역 -->
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-col cols="3" sm="2" md="6" lg="12" xl="12" class="d-flex child-flex">
          <v-img height="400px" aspect-ratio="9/16" cover
            v-for="(name, index) in getPotteryItems"
            :key="index"
            :src="`image/pottery/${clickPotteryBtnValue}/${name}`"
            class="mx-5 imgBorder"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- 중간 구분 -->
    <div class="middleLine">
      <v-row>
        <v-col cols="7" class="text-center">
          <span class="display-1 font-weight-black google-font">
            일상의 예술, 아몬드 마켓에서 시작 하세요.
            <router-link to="/login">
              <v-btn class="ml-5 font-weight-regular text-h5" tonal x-large rounded color="#263238" dark>START!</v-btn>
            </router-link>
          </span>
        </v-col>
      </v-row>
    </div>

    <!-- 공예품 추천 영역 -->
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center mt-6">
          <h1 class="display-1 font-weight-black google-font">아몬드 마켓, 공예품 추천</h1>
        </v-col>
      </v-row>

      <!-- 공예품 추천 카테고리 버튼 -->
      <v-row justify="center" class="mb-5 mt-2">
        <template v-for="(col, index) in craftCols">
          <v-col :key="index" :cols="col.width" sm="12" md="4" lg="2" xl="2">
            <v-btn x-large text block rounded
            class="font-weight-bold text-h6 btnStyle"
            :class="{'active': clickCraftBtnValue === col.value}"
            :style="{'background-color': clickCraftBtnValue === col.value ? craftBtnBackColors[col.value] : '#FFFFFF', 'color': clickCraftBtnValue === col.value ? '#FFFFFF' : ''}"
            @click="fnCraftBtnClick(col.value)">
              {{ col.label }}
            </v-btn>
          </v-col>
        </template>
      </v-row>

      <!-- 공예품 추천 그림 영역 -->
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-col cols="3" sm="2" md="6" lg="12" xl="12" class="d-flex child-flex">
          <v-img height="400px" aspect-ratio="9/16" cover
            v-for="(name, index) in getCraftItems"
            :key="index"
            :src="`image/craft/${clickCraftBtnValue}/${name}`"
            class="mx-5 imgBorder"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- 하단 서비스 -->
    <v-container class="bottomSection">
      <v-row align="center" justify="center">
        <v-col cols="3" class="text-center" style="border-right: 1px solid black">
          <p class="text-h5 font-weight-black google-font">예술품 문의하기</p>
          <v-btn icon text large>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="3" class="text-center">
          <p class="text-h5 font-weight-black google-font">예술품 신청하기</p>
          <v-btn icon text large>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        // 검색창 입력값 변수
        searchMsg: '',

        // 검색버튼 클릭값 변수
        searchYn: false,

        // 스크롤 상태에 따라 버튼 표시 여부
        showScrollTopButton: false,

        // 배너 이미지
        bannerImg: [
          {src:'https://www.art1.com/upload/banner/1667878391XZT3LBQM38.jpg'},
          {src:'https://www.art1.com/upload/banner/165836580877FSZTXBNS.jpg'},
          {src:'https://www.art1.com/upload/banner/1658365796S8UTVPVSGP.jpg'},
          {src:'https://www.art1.com/upload/banner/1658365788494MYGS8P8.jpg'}
        ],

        // 배너 하단 소개 이미지
        miCardItems:[
          {url : 'https://www.art1.com/upload/banner/1668652120XR7QQKM5SS.jpg'},
          {url : 'image/banner/도자기.jpg'},
          {url : 'https://img.marieclairekorea.com/2021/08/mck_6115d223b2b49.jpg'}
        ],

        // 그림 추천 카테고리 버튼
        paintingCols: [
          { label: '유화 그림', width: 1, value: 'paint' },
          { label: '식물 그림', width: 1, value: 'plant' },
          { label: '팝아트', width: 1, value: 'pop' },
          { label: '인물화', width: 1, value: 'per' },
          { label: '북유럽 감성', width: 1, value: 'sens' },
          { label: '아이방', width: 1, value: 'kids' }
        ],
        // 버튼 클릭 값 변수(초기에 유화 그림 버튼이 활성화 되도록 값 지정)
        clickPaintingBtnValue: 'paint',

        // 버튼 value별 색상
        paintingBtnBackColors: {
          paint: '#FF6F00', // amber-darken-4
          plant: '#1B5E20', // green-darken-4
          pop: '#6A1B9A',   // purple-darken-3
          per: '#D50000',  // red-accent-4
          sens: '#263238',  // blue-grey-darken-4
          kids: '#0091EA'   // light-blue-accent-4
        },
        
        // 유화 그림 파일명 배열
        paintCardItems:[
          'Below the Surface_김작가.jpg',
          'Pink Stain_김작가.jpg',
          '단지 다를뿐이야_고작가.jpg',
          '오렌지,베르가못,원더랜드_최작가.jpg'
        ],
        // 식물 그림 파일명 배열
        plantCardItems:[
          'Wind Yellow_김작가.jpg',
          '여행_강작가.jpg',
          '오래도록 시선이 머문_이작가.jpg',
          '익숙한낯섦_이작가.jpg'
        ],
        // 팝아트 파일명 배열
        popCardItems:[
          'A Dreamer_아작가.jpg',
          'Vivien Ligh_김작가.jpg',
          'Ma Monde 13_강작가.jpg',
          '아톰_강작가.jpg'
        ],
        // 인물화 파일명 배열
        perCardItems:[
          'Ruby Tears_김작가.jpg',
          '한남자_강작가.jpg',
          '삐삐_강작가.jpg',
          'Purple Queen_류작가.jpg'
        ],
        // 북유럽감성 그림 파일명 배열
        sensCardItems:[
          'Circulation_권작가.jpg',
          '남겨진 것과 남겨질 것들_홍작가.jpg',
          'Layer Space No.1_박작가.jpg',
          'Pieces of everyday life_임작가.jpg'
        ],
        // 아이방 파일명 배열
        kidsCardItems:[
          '동심키티_윤작가.jpg',
          '소음의 왕_매작가.jpg',
          '환상열차_서작가.jpg',
          '그때의 누구나였던 스타_유작가.jpg'
        ],

        // 도자기 추천 카테고리 버튼
        potteryCols: [
          { label: '찻잔', width: 2, value: 'teacup' },
          { label: '백자 · 청자', width: 2, value: 'whitePorcelain' },
          { label: '화병', width: 2, value: 'vase' },
          { label: '다기세트', width: 2, value: 'teaSet' },
          { label: '인테리어 소품', width: 4, value: 'interior' }
        ],
        // 버튼 클릭 값 변수(초기에 찻잔 버튼이 활성화 되도록 값 지정)
        clickPotteryBtnValue: 'teacup',

        // 버튼 value별 색상
        potteryBtnBackColors: {
          teacup: '#78909C', // blue-grey-lighten-1
          whitePorcelain: '#757575', // grey-darken-1
          vase: '#00838F',   // cyan-darken-3
          teaSet: '#283593',  // indigo-darken-3
          interior: '#6A1B9A'  // purple-darken-3
        },

        // 찻잔 파일명 배열
        teacupCardItems:[
          '연화문 개완_모작가.jpg',
          '분청 도라지꽃_김작가.jpg',
          '손나무 쌍화차잔_임작가.jpg',
          '청화문 개합잔 난초_이작가.jpg'
        ],
        // 백자 파일명 배열
        whitePorcelainCardItems:[
          '고백자 미니 달항아리_반작가.jpg',
          '청자 투각 목련 매병_임작가.jpg',
          '분청 패랭이꽃_김작가.jpg',
          '송월 백자상감 목단 유노문 투각매병_정작가.jpg'
        ],
        // 화병 파일명 배열
        vaseCardItems:[
          '분청 꽃잎 사각화병_임작가.jpg',
          '흑상감매화 주판알 꽃병_우작가.jpg',
          '청자 투각 상감 화병_유작가.jpg',
          '거친 장군병_김작가.jpg'
        ],
        // 다기세트 파일명 배열
        teaSetCardItems:[
          '베이지 유아용_이작가.jpg',
          '천목 호피_곽작가.jpg',
          '백자 청국화_가작가.jpg',
          '청자 3학_우작가.jpg'
        ],
        // 인테리어 소품 파일명 배열
        interiorCardItems:[
          '도자기 벽걸이_우작가.jpg',
          '청자 미니 부엉이_백작가.jpg',
          '청자 향로 삼발봉 오리_이작가.jpg',
          '향합 미니보관함_오작가.jpg'
        ],

        // 공예품 추천 카테고리 버튼
        craftCols: [
          { label: '나전칠기', width: 2, value: 'lacquerware' },
          { label: '유리 공예', width: 2, value: 'glass' },
          { label: '레진 공예', width: 2, value: 'resin' },
          { label: '석고 공예', width: 2, value: 'plaster' },
          { label: '종이 공예', width: 4, value: 'paper' }
        ],
        // 버튼 클릭 값 변수(초기에 나전칠기 버튼이 활성화 되도록 값 지정)
        clickCraftBtnValue: 'lacquerware',

        // 버튼 value별 색상
        craftBtnBackColors: {
          lacquerware: '#212121', // grey-darken-4
          glass: '#A1887F', // brown-lighten-2
          resin: '#FF6E40',   // deep-orange-accent-2
          plaster: '#26A69A',  // teal-lighten-1
          paper: '#689F38'  // light-green-darken-2
        },

        // 나전칠기 파일명 배열
        lacquerwareCardItems:[
          '송학 예단 자개보석함_송작가.jpg',
          '화이트 채색목단꽃 3단설합 보석함_김작가.jpg',
          '모던나비 스텐자개텀블러_황작가.jpg',
          '원패 벽걸이 시계_홍작가.jpg'
        ],
        // 유리공예 파일명 배열
        glassCardItems:[
          '바닷빛 스탠드_임작가.jpg',
          '유리공예 반지_김작가.jpg',
          '조약돌 와인잔_이작가.jpg',
          '빛방울 아이콘 컵_양작가.jpg'
        ],
        // 레진공예 파일명 배열
        resinCardItems:[
          '바다 속 컵받침_왕작가.jpg',
          '성운조각_공작가.jpg',
          '레진 드래곤 인형 키링_우작가.jpg',
          '자연의 빛_오작가.jpg'
        ],
        // 석고 파일명 배열
        plasterCardItems:[
          '석고 방향제_임작가.jpg',
          '육각 장식 연꽃_공작가.jpg',
          '엔젤 석고상_박작가.jpg',
          '만타 유럽 천사_오작가.jpg'
        ],
        // 종이 파일명 배열
        paperCardItems:[
          '달항아리 매화 한지등_신작가.jpg',
          '바람꽃 3봉 진분홍꽈리_김작가.jpg',
          '접시세트_이작가.jpg',
          '금강초롱 3봉등_황작가.jpg'
        ],
      }
    },
    mounted() {
      // 화면 전환 시 스크롤 맨 위로
      window.scrollTo(0, 0);
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
      getPaintingItems() {
        // 클릭된 버튼 값에 따라 해당하는 그림 파일명 배열 반환
        switch (this.clickPaintingBtnValue) {
          case 'paint':
            return this.paintCardItems;
          case 'plant':
            return this.plantCardItems;
          case 'pop':
            return this.popCardItems;
          case 'per':
            return this.perCardItems;
          case 'sens':
            return this.sensCardItems;
          case 'kids':
            return this.kidsCardItems;
          default:
            return [];
        }
      },

      getPotteryItems() {
        // 클릭된 버튼 값에 따라 해당하는 그림 파일명 배열 반환
        switch (this.clickPotteryBtnValue) {
          case 'teacup':
            return this.teacupCardItems;
          case 'whitePorcelain':
            return this.whitePorcelainCardItems;
          case 'vase':
            return this.vaseCardItems;
          case 'teaSet':
            return this.teaSetCardItems;
          case 'interior':
            return this.interiorCardItems;
          default:
            return [];
        }
      },

    getCraftItems() {
      // 클릭된 버튼 값에 따라 해당하는 그림 파일명 배열 반환
      switch (this.clickCraftBtnValue) {
        case 'lacquerware':
          return this.lacquerwareCardItems;
        case 'glass':
          return this.glassCardItems;
        case 'resin':
          return this.resinCardItems;
        case 'plaster':
          return this.plasterCardItems;
        case 'paper':
          return this.paperCardItems;
        default:
          return [];
        }
      }
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

      handleScroll() {
      // 스크롤 위치가 일정 이상일 때 버튼을 보이게 하고, 그 외에는 숨김
        this.showScrollTopButton = window.pageYOffset > 300;
      },

      scrollTop() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      },

      fnSearchClick(){
        this.searchYn = !this.searchYn;
      },

      fnPaintingBtnClick(value) {
        this.clickPaintingBtnValue = value;
      },

      fnPotteryBtnClick(value){
        this.clickPotteryBtnValue = value;
      },

      fnCraftBtnClick(value){
        this.clickCraftBtnValue = value;
      },
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

  .divSection{
    margin: 20px 0;
    padding: 30px 70px;
  }

  .middleLine{
    margin: 30px 0;
    padding: 50px 0;
    background: linear-gradient(
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.8)
      ), #546E7A;
  }

  .paintSection{
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url('https://www.art1.com/images/main/main_curator_bg.jpg');
  }

  .btnStyle{
    border: 1px solid rgba(114, 114, 114, 0.685);
    color: white;
  }

  .active {
    border: 1px solid rgba(238, 238, 238, 0.753);
  }

  .imgBorder{
    filter: drop-shadow(0px 4px 5px #8a8989);
  }
  .backgroundImg{
    width: 100%;
    display: block;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .hide-card{
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100%);
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.5s ease-in-out;
  }

  .bottomSection{
    margin: 70px 0 0;
    padding: 30px 0;
  }
</style>