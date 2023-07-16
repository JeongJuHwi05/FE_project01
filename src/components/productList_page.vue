<template>
    <v-container style="margin-bottom: 160px;">
        <v-container flow>
            <v-row>
                <v-col cols="12" class="text-center" style="margin-top: 120px;">
                    <h1 class="font-weight-black text-h4">Art 둘러보기</h1>
                </v-col>
            </v-row>
        </v-container>

        <div class="topBtn">
            <v-row justify="center">
                <template v-for="(col, index) in categoryCols">
                    <v-col :key="index" :cols="col.width" sm="12" md="4" lg="2" xl="2">
                        <v-btn x-large text block
                        class="font-weight-bold text-h6 btnStyle"
                        :class="{'active': clickCategoryBtnValue === col.value}"
                        :style="{'background-color': clickCategoryBtnValue === col.value ? '#000000' : '#FFFFFF',
                                'color': clickCategoryBtnValue === col.value ? '#FFFFFF' : '#000000'}"
                        @click="fnCategoryBtnClick(col.value)">
                        {{ col.label }}
                        </v-btn>
                    </v-col>
                </template>
            </v-row>
        </div>

        <div id="paintingBtn">
            <div v-if="clickCategoryBtnValue === 'painting'">
                <!-- 그림 추천 카테고리 버튼 -->
                <v-row justify="center">
                    <template v-for="(col, index) in paintingCols">
                        <v-col :key="index" :cols="col.width" sm="12" md="6" lg="4" xl="3">
                            <v-btn large text block rounded
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
            </div>

            <div id="potteryBtn" v-else-if="clickCategoryBtnValue === 'pottery'">
                <!-- 도자기 추천 카테고리 버튼 -->
                <v-row justify="center">
                    <template v-for="(col, index) in potteryCols">
                        <v-col :key="index" :cols="col.width" sm="12" md="6" lg="4" xl="2">
                            <v-btn large text block rounded
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
            </div>

            <div id="craftBtn" v-else-if="clickCategoryBtnValue === 'craft'">
                <!-- 공예품 추천 카테고리 버튼 -->
                <v-row justify="center">
                    <template v-for="(col, index) in craftCols">
                        <v-col :key="index" :cols="col.width" sm="12" md="6" lg="4" xl="2">
                            <v-btn large text block rounded
                            class="font-weight-bold text-h6 btnStyle"
                            :class="{'active': clickCraftBtnValue === col.value}"
                            :style="{'background-color': clickCraftBtnValue === col.value ? craftBtnBackColors[col.value] : '#FFFFFF', 'color': clickCraftBtnValue === col.value ? '#FFFFFF' : ''}"
                            @click="fnCraftBtnClick(col.value)">
                            {{ col.label }}
                            </v-btn>
                        </v-col>
                    </template>
                </v-row>
            </div>
        </div>
        <!-- 이미지 -->
        <template>
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="4" xl="3" v-for="image in images" :key="image" class="d-flex child-flex imageShadow">
                    <v-img :src="image" aspect-ratio="1" cover
                        @mouseover="setImgMouse(image, true)"
                        @mouseout="setImgMouse(image, false)"
                        :loading="isLoading"
                        @load="handleImageLoad"
                        style="object-fit: contain;"
                        :style="{'filter': !isLoading && getImgMouse(image) ? 'opacity(0.7)' : '', 'cursor': !isLoading && getImgMouse(image) ? 'pointer' : ''}"
                        @click="openImagePopup(image)"
                    >
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="black"></v-progress-circular>
                            </v-row>
                        </template>

                        <div v-if="!isLoading && getImgMouse(image)" class="overlayDiv" color="primary">
                            <v-btn class="font-weight-regular text-h5" tonal dark text>자세히 보기</v-btn>
                        </div>
                    </v-img>
                </v-col>
            </v-row>

            <v-dialog v-model="showImagePopup" hide-overlay max-width="800px" max-height="830px" @click="closePopup">
                <v-img cover :src="selectedImage" style="width: auto; max-height: 800px; object-fit: contain;"/>
                <v-btn block color="black" dark @click="closePopup">닫기</v-btn>
            </v-dialog>
        </template>
    </v-container>
</template>

<script>
    import { oFirebaseStorage } from '../datasources/firebase.js';
    import 'firebase/compat/storage';

    export default {
        data() {
            return {
                folderSt: '/',
                // storage에서 불러올 이미지 담을 객체
                images: [],

                // image dialog 관련 변수
                showImagePopup: false,
                selectedImage: '',

                // 로딩 상태
                isLoading: true,
                
                // 이미지별 마우스 상태를 저장하는 객체
                imgMouse: {},

                // 그림 추천 카테고리 버튼
                categoryCols: [
                    { label: '전체', width: 1, value: 'all' },
                    { label: '그림', width: 1, value: 'painting' },
                    { label: '도자기', width: 1, value: 'pottery' },
                    { label: '공예품', width: 1, value: 'craft' }
                ],
                
                // 버튼 클릭 값 변수(초기에 유화 그림 버튼이 활성화 되도록 값 지정)
                clickCategoryBtnValue: 'craft',

                // 버튼 value별 색상
                categoryBtnBackColors: {
                    all: 'black', // black
                    paint: '#616161', // grey-darken-2
                    pottery: '#616161',   // grey-darken-2
                    craft: '#616161'  // grey-darken-2
                },

                // 그림 추천 카테고리 버튼
                paintingCols: [
                    { label: '전체', width: 1, value: 'all' },
                    { label: '유화 그림', width: 3, value: 'paint' },
                    { label: '식물 그림', width: 3, value: 'plant' },
                    { label: '팝아트', width: 2, value: 'pop' },
                    { label: '인물화', width: 2, value: 'per' },
                    { label: '북유럽 감성', width: 4, value: 'sens' },
                    { label: '아이방', width: 3, value: 'kids' }
                ],
                // 버튼 클릭 값 변수(초기에 유화 그림 버튼이 활성화 되도록 값 지정)
                clickPaintingBtnValue: 'all',

                // 버튼 value별 색상
                paintingBtnBackColors: {
                    all: '#000000', // black
                    paint: '#FF6F00', // amber-darken-4
                    plant: '#1B5E20', // green-darken-4
                    pop: '#6A1B9A',   // purple-darken-3
                    per: '#D50000',  // red-accent-4
                    sens: '#263238',  // blue-grey-darken-4
                    kids: '#0091EA'   // light-blue-accent-4
                },
                // 도자기 추천 카테고리 버튼
                potteryCols: [
                    { label: '전체', width: 1, value: 'all' },
                    { label: '찻잔', width: 2, value: 'teacup' },
                    { label: '백자 · 청자', width: 2, value: 'whitePorcelain' },
                    { label: '화병', width: 2, value: 'vase' },
                    { label: '다기세트', width: 2, value: 'teaSet' },
                    { label: '인테리어 소품', width: 4, value: 'interior' }
                ],
                // 버튼 클릭 값 변수(초기에 찻잔 버튼이 활성화 되도록 값 지정)
                clickPotteryBtnValue: 'all',

                // 버튼 value별 색상
                    potteryBtnBackColors: {
                    all: '#000000', // black
                    teacup: '#78909C', // blue-grey-lighten-1
                    whitePorcelain: '#757575', // grey-darken-1
                    vase: '#00838F',   // cyan-darken-3
                    teaSet: '#283593',  // indigo-darken-3
                    interior: '#6A1B9A'  // purple-darken-3
                },

                // 공예품 추천 카테고리 버튼
                craftCols: [
                    { label: '전체', width: 1, value: 'all' },
                    { label: '나전칠기', width: 2, value: 'lacquerware' },
                    { label: '유리 공예', width: 2, value: 'glass' },
                    { label: '레진 공예', width: 2, value: 'resin' },
                    { label: '석고 공예', width: 2, value: 'plaster' },
                    { label: '종이 공예', width: 4, value: 'paper' }
                ],
                // 버튼 클릭 값 변수(초기에 나전칠기 버튼이 활성화 되도록 값 지정)
                clickCraftBtnValue: 'all',

                // 버튼 value별 색상
                craftBtnBackColors: {
                    all: '#000000', // black
                    lacquerware: '#212121', // grey-darken-4
                    glass: '#A1887F', // brown-lighten-2
                    resin: '#FF6E40',   // deep-orange-accent-2
                    plaster: '#26A69A',  // teal-lighten-1
                    paper: '#689F38'  // light-green-darken-2
                },
            };
        },
        mounted() {
            // 화면 전환 시 스크롤 맨 위로
            window.scrollTo(0, 0);
            window.addEventListener('scroll', this.handleScroll);
            
            const storageRef = oFirebaseStorage.ref();
            const rootRef = storageRef.child(this.folderSt); // 루트 폴더

            this.getAllImagesFromFolder(rootRef);
        },

        methods:{
            // 카테고리 1레벨 클릭
            fnCategoryingBtnClick(value) {
                this.clickCategoryingBtnValue = value;
            },

            // firebase 루트 하위 폴더 다 가져오기
            getAllImagesFromFolder(folderRef) {
                folderRef.listAll().then((res) => {
                    res.items.forEach((itemRef) => {
                        itemRef.getDownloadURL().then((url) => {
                            this.images.push(url);
                        });
                    });

                    res.prefixes.forEach((folder) => {
                        // 하위 폴더에서 이미지 가져오기
                        this.getAllImagesFromFolder(folder);
                    });
                });
            },

            // 이미지 로딩 완료 후 호출될 콜백 함수
            handleImageLoad() {
                this.isLoading = false; // 로딩 상태 변경
            },

            fnCategoryBtnClick(value) {
                this.clickCategoryBtnValue = value;

                this.storageRef = oFirebaseStorage.ref();
                if (value === 'all') {
                    this.rootRef = this.storageRef.child('/');
                } else {
                    this.rootRef = this.storageRef.child('/'+ value);
                }

                // 이미지 배열 초기화
                this.images = [];
                this.getAllImagesFromFolder(this.rootRef);
            },

            fnPaintingBtnClick(value) {
                this.clickPaintingBtnValue = value;
                this.storageRef = oFirebaseStorage.ref();

                if (value === 'all') {
                    this.rootRef = this.storageRef.child('/painting/');
                } else {
                    this.rootRef = this.storageRef.child('/painting/' + value);
                }

                // 이미지 배열 초기화
                this.images = [];
                this.getAllImagesFromFolder(this.rootRef);
            },

            fnPotteryBtnClick(value){
                this.clickPotteryBtnValue = value;
                this.storageRef = oFirebaseStorage.ref();

                if (value === 'all') {
                    this.rootRef = this.storageRef.child('/pottery/');
                } else {
                    this.rootRef = this.storageRef.child('/pottery/' + value);
                }

                // 이미지 배열 초기화
                this.images = [];
                this.getAllImagesFromFolder(this.rootRef);
            },

            fnCraftBtnClick(value){
                this.clickCraftBtnValue = value;
                this.storageRef = oFirebaseStorage.ref();

                if (value === 'all') {
                    this.rootRef = this.storageRef.child('/craft/');
                } else {
                    this.rootRef = this.storageRef.child('/craft/' + value);
                }

                // 이미지 배열 초기화
                this.images = [];
                this.getAllImagesFromFolder(this.rootRef);
            },

            setImgMouse(image, value) {
                // 이미지별 마우스 상태 업데이트
                this.$set(this.imgMouse, image, value);
            },
            getImgMouse(image) {
                // 이미지별 마우스 상태 반환
                return this.imgMouse[image] || false;
            },

            openImagePopup(image) {
                this.selectedImage = image;
                this.showImagePopup = true;
            },

            closePopup(){
                this.showImagePopup = false;
            }
        }
    }
</script>

<style>
    .topBtn{
        margin-top: 30px;
    }

    #paintingBtn{
        margin-top: 20px;
        margin-bottom: 30px;
        padding: 30px 70px;
    }

    #potteryBtn{
        margin-bottom: 30px;
        padding: 30px 70px;
    }

    #craftBtn{
        margin-bottom: 30px;
        padding: 30px 70px;

    }
  
  .btnStyle{
    border: 1px solid rgba(114, 114, 114, 0.685);
    color: white;
  }

  .imageShadow{
    filter: drop-shadow(0px 4px 5px #8a8989);
  }

  .overlayDiv {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        background-color: black;
        color: white;
        padding: 10px 10px;
    }
</style>