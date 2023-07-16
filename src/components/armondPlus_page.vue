<template>
    <v-container style="margin-bottom: 100px;">
        <v-container flow>
            <v-row>
                <v-col cols="12" class="text-center" style="margin-top: 120px;">
                    <h1 class="font-weight-black text-h4">Armond +</h1>
                </v-col>
            </v-row>
        </v-container>

        <div class="mainImgDiv">
            <img src="https://www.art1.com/images/art1/consulting_top_visual.jpg" class="mainImg"/>
        </div>

        <div class="imgOverText">
            <p class="overTextTitle">일상의 예술을 선사하는 아몬드</p>
            <span class="overTextContent">일상 공간의 예술 한 스푼, 아몬드에서 찾아보세요.</span>
        </div>

        <div style="margin: 70px; text-align: center;">
            <h2>아몬드(Armond)?</h2>

            <p class="processText">
                <span class="textPoint">아몬드</span>는 고객님들의 일상과 예술을 연결해주는 공간 입니다.<br>
                예술은 다이몬드와 같은 가치(Art is Diamond)를 가지고 있다는 신념으로,<br>
                고객님 한 분 한 분 일상의 가치를 올리는 것을 목표로 하고 있습니다.<br><br>

                <span class="textPoint">아몬드</span>는 고객님들의 예술적 가치를 올리기 위해 최선을 다합니다.<br>
                보다 더 좋은 예술품을 찾아 소개하고자 다양한 루트를 통해 예술의 범위를 넓히고 있습니다.<br><br>

                <span class="textPoint">아몬드</span>에 찾아와주시는 고객님의 관심에 보답하기 위해 항상 최선을 다하겠습니다.
            </p>
        </div>

        <div>
            <h2>자주 묻는 질문</h2>

            <v-card class="mx-auto mt-5" max-width="1000px" v-for="(item, index) in qnaCard" :key="index">
                <v-card-actions>
                    <v-card-title>{{ "Q. " + item.question }}</v-card-title>
                    <v-spacer></v-spacer>
                    <div class="d-flex align-center">
                    <p class="mb-0 mr-2">Answer</p>
                    <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="cardShow(index)">
                        <v-icon>{{ show === index ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                    </div>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show === index">
                    <v-divider></v-divider>
                    <v-card-text>{{ item.answer }}</v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </div>

    </v-container>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
            show: false,
            qnaCard:[
                {question: '왜 이름이 아몬드 인가요?', answer: 'Art is Diamond의 줄임말로 문화예술을 다이아몬드와 같은 가치를 가졌다고 생각하는 아몬드의 신념이 담겨있습니다.'},
                {question: '아몬드의 예술품은 구매 할 수 있나요?', answer: '아니요. 아몬드에서 소개해드리는 예술품들은 직접 구매 하실 수는 없습니다.'},
                {question: '예술품은 정기적으로 업데이트 되나요?', answer: '네. 정기적이지는 않지만 고객분들에게 더 많고 다양한 예술품을 소개해드리고자 새로운 예술품을 계속 업데이트 하고 있습니다.'},
                {question: '아몬드에 올라온 예술품을 개인적으로 사용하고 싶어요.', answer: '아몬드에 올라온 예술품은 저작권이 있어서 개인적인 용도로 사용하실 수 없습니다.'},
                {question: '아몬드에 그림을 올리고 싶어요.', answer: '현재까지는 개인작품을 받고 있지 않습니다. 아몬드와 제휴 or 협약을 맺은 작가님들과 함께 하고 있습니다. 해당 내용은 고객 센터로 문의해주시기 바랍니다. (고객센터 1234-5678)'}
            ]
        }),
        mounted() {
            // 화면 전환 시 스크롤 맨 위로
            window.scrollTo(0, 0);
            window.addEventListener('scroll', this.handleScroll);
        },
        methods:{
            cardShow(index) {
                this.show = this.show === index ? null : index;
            }
        }
    }
</script>

<style>
    p{
        font-size: 18px;
    }

    .mainImg{
        height: 800px;
        width: 100%;
        object-fit: cover;
    }
    .mainImgDiv{
        position: relative;
        margin: 20px 10px 0;
    }

    .imgOverText{
        position: absolute;
        top: 470px;
        left: 250px;
    }

    .overTextTitle{
        font-weight: 600;
        font-size: 36px;
        text-shadow: 2px 2px 6px rgb(182, 182, 182);
    }

    .overTextContent{
        font-weight: 550;
        font-size: 20px;
        margin: 5px;
    }

    div > h2{
        font-weight: 600;
        font-size: 26px;
        text-align: center;
    }

    .processText{
        margin: 30px;
    }
    
    .textPoint{
        color: brown;
        font-weight: 550;
    }

    .processImg{
        height: auto;
        width: 1000px;
        object-fit: cover;
        margin: 50px 0;
    }
    
</style>