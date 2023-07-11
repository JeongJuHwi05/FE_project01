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
            <p class="overTextTitle">일상의 예술을 선사하는 아몬드마켓</p>
            <span class="overTextContent">일상 공간의 예술 한 스푼, 아몬드마켓에서 찾아보세요.</span>
        </div>

        <div style="margin: 70px; text-align: center;">
            <h2>아몬드마켓(Armond Market)?</h2>

            <p class="processText">
                <span class="textPoint">아몬드마켓</span>은 고객님들의 일상과 예술을 연결해주는 스토어 입니다.<br>
                예술은 다이몬드와 같은 가치(Art is Diamond)를 가지고 있다는 신념으로,<br>
                고객님 한 분 한 분 일상의 가치를 올리는 것을 목표로 하고 있습니다.<br><br>

                <span class="textPoint">아몬드마켓</span>은 고객님들의 판매의뢰 또는 마켓 자체 사입을 통해 상품을 확보합니다.<br>
                확보한 상품은 전문가의 철저한 검수를 통해 진품만 고객님들 앞에 선보이고 있습니다.<br><br>

                <span class="textPoint">아몬드마켓</span>에 찾아와주시는 고객님의 믿음에 보답하기 위해 항상 최선을 다하겠습니다.
            </p>

            <img src="../../public/image/etc/armondProcess.png" alt="아몬드마켓 프로세스" class="processImg"/>
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
                {question: '아몬드마켓 상품은 진품인가요?', answer: '네, 아몬드마켓에서 판매하는 모든 상품들은 철저한 검증을 통해 선별된 상품들만 판매되고 있습니다. 가품 존재 시 200% 보상제를 통해 보상을 해드리고 있습니다.'},
                {question: '상품을 대량으로 구매할 수 있나요?', answer: '상품은 상품 의뢰 또는 사입을 통해 들어오기 때문에 원하시는 상품에 따라 구입 갯수가 다를 수 있습니다. 대량 구매를 원하신다면 고객센터에 문의 주시기 바랍니다. (고객센터 1234-5678)'},
                {question: '상품 판매 의뢰는 어떻게 해야하나요?', answer: '아몬드마켓에 회원가입 후 [상품 판매 의뢰] 메뉴에 등록해주시기 바랍니다. 의뢰가 등록되면 전문가가 진품 검증 절차를 진행 후 판매하게 됩니다.'},
                {question: '상품 교환 및 환불은 어떻게 하나요?', answer: '교환/환불 신청 해주시면 상품 수거 후 전문가의 감정을 통해 상품의 가치가 하락하지 않았을 경우에만 교환/환불 절차가 진행됩니다. 이 점 확인하시고 구매 진행 해주시기 바랍니다.'},
                {question: '배송은 직접 해주시나요?', answer: '네, 상품 가치를 지키기위해 아몬드마켓에서 직접 배송을 해드리고 있습니다. 그래서 타 쇼핑몰과 다르게 배송일이 좀 더 걸리는 점 양해해주시기 바랍니다. 고객님께 가치 그대로 전해드리기 위한 아몬드마켓은 최선을 다하겠습니다.'}
            ]
        }),
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