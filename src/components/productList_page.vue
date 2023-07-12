<template>
    <v-container style="margin-bottom: 160px;">
        <v-container flow>
            <v-row>
                <v-col cols="12" class="text-center" style="margin-top: 120px;">
                    <h1 class="font-weight-black text-h4">상품보기</h1>
                </v-col>
            </v-row>
        </v-container>

        <div class="divSection">
            <v-row justify="center" class="mb-5 mt-2">
                <template v-for="(col, index) in categoryCols">
                    <v-col :key="index" :cols="col.width" sm="12" md="4" lg="2" xl="2">
                        <v-btn x-large text block rounded
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

        <div class="divSecondSection">
            <v-row justify="center" class="mb-5 mt-2">
                <template v-for="(col, index) in categoryCols">
                    <v-col :key="index" :cols="col.width" sm="12" md="4" lg="2" xl="2">
                        <v-btn x-large text block rounded
                        class="font-weight-bold text-h6 btnStyle"
                        :class="{'active': clickCategoryBtnValue === col.value}"
                        :style="{'background-color': clickCategoryBtnValue === col.value ? categoryBtnBackColors[col.value] : '#FFFFFF',
                                'color': clickCategoryBtnValue === col.value ? '#FFFFFF' : ''}"
                        @click="fnCategoryBtnClick(col.value)">
                        {{ col.label }}
                        </v-btn>
                    </v-col>
                </template>
            </v-row>
        </div>

        <template>
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="4" xl="3" v-for="image in images" :key="image" class="d-flex child-flex imageShadow">
                    <v-img :src="image" aspect-ratio="1" cover
                        @mouseover="setImgMouse(image, true)"
                        @mouseout="setImgMouse(image, false)"
                        :loading="isLoading"
                        @load="handleImageLoad"
                        :style="{'filter': !isLoading && getImgMouse(image) ? 'opacity(0.7)' : '', 'cursor': !isLoading && getImgMouse(image) ? 'pointer' : ''}"
                        @click="imgButtonClick(image)"
                    >
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="black"></v-progress-circular>
                            </v-row>
                        </template>

                        <div v-if="!isLoading && getImgMouse(image)" class="overlayDiv" color="primary" @click="imgButtonClick(image)">
                            자세히 보기
                        </div>
                    </v-img>
                </v-col>
            </v-row>
        </template>

    </v-container>
</template>

<script>
    import { oFirebaseStorage } from '../datasources/firebase.js';
    import 'firebase/compat/storage';

    export default {
        data() {
            return {
                // storage에서 불러올 이미지 담을 객체
                images: [],

                // 로딩 상태
                isLoading: true,
                
                // 이미지별 마우스 상태를 저장하는 객체
                imgMouse: {},

                // 그림 추천 카테고리 버튼
                categoryCols: [
                    { label: '전체', width: 1, value: 'all' },
                    { label: '그림', width: 1, value: 'paint' },
                    { label: '도자기', width: 1, value: 'pottery' },
                    { label: '공예품', width: 1, value: 'craft' }
                ],
                
                // 버튼 클릭 값 변수(초기에 유화 그림 버튼이 활성화 되도록 값 지정)
                clickCategoryBtnValue: 'all',

                // 버튼 value별 색상
                categoryBtnBackColors: {
                    all: 'black', // black
                    paint: '#616161', // grey-darken-2
                    pottery: '#616161',   // grey-darken-2
                    craft: '#616161'  // grey-darken-2
                },
            };
        },
        mounted() {
            
            // 화면 전환 시 스크롤 맨 위로
            window.scrollTo(0, 0);
            window.addEventListener('scroll', this.handleScroll);
            
            const storageRef = oFirebaseStorage.ref();
            const rootRef = storageRef.child('/'); // 루트 폴더

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

            setImgMouse(image, value) {
                // 이미지별 마우스 상태 업데이트
                this.$set(this.imgMouse, image, value);
            },
            getImgMouse(image) {
                // 이미지별 마우스 상태 반환
                return this.imgMouse[image] || false;
            },
            imgButtonClick(image) {
                // 버튼 클릭 이벤트 처리
                console.log('Button clicked for image:', image);
            },
        }
    }
</script>

<style>
  .divSection{
    /* margin: 10px 0; */
    padding: 30px 70px;
  }
  .divSecondSection{
    padding: 0px 70px;
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