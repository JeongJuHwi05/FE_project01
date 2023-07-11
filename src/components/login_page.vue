<template>
    <v-container flow>
        <v-row>
            <v-col cols="12" class="text-center" style="margin-top: 120px;">
                <h1 class="font-weight-black text-h4">로그인</h1>
            </v-col>
        </v-row>

        <v-container style="border-top: 1px solid black; border-bottom: 1px solid black; margin-top: 40px; width: 1100px; height: 370px;">
            <v-row>
                <v-col class="text-center" cols="auto" offset="1" sm="7" style="margin: auto; margin-top: 65px;">
                    <form @submit.prevent="fnDoLogin">
                        <v-text-field style="width: 600px;" name="Email" label="아이디(이메일)" type="email" v-model="sEmail" required></v-text-field>
                        <v-text-field style="width: 600px;" name="Password" label="비밀번호" type="password" v-model="sPassword" required></v-text-field>
                        
                        <div class="btnCenter" style="margin-top: 60px;">
                            <!-- 시간지연상태인 경우 버튼은 사라지게 함 -->
                            <v-btn large class="font-weight-bold text-subtitle-2 mr-4" type="submit" v-if="!fnGetLoading" color="black" dark>로그인</v-btn>

                            <router-link to="/join">
                                <v-btn large class="font-weight-bold text-subtitle-2 mr-4" type="submit" v-if="!fnGetLoading" outlined>회원가입</v-btn>
                            </router-link>
                            <v-btn large class="font-weight-bold text-subtitle-2" type="submit" v-if="!fnGetLoading" color="#757575" dark>비밀번호 찾기</v-btn>
                        </div>

                        <!-- 시간지연의 경우 회전 프로그레스 원 표시 -->
                        <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="grey lighten-1"></v-progress-circular>

                        <!-- 오류 메시지가 있을 경우 표시 -->
                        <v-alert class="mt-5" type="error" dismissible v-model="bAlert">
                            {{ fnGetErrMsg }}
                        </v-alert>
                    </form>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default{
        data(){
            return{
                bAlert: false, // 오류 메시지 표시 여부
                sEmail: '', // 이메일 입력값 임시 저장
                sPassword: '' // 비밀번호 입력값 임시 저장
            }
        },
        computed:{
            // 오류 메시지 스토어에서 읽어서 반환
            fnGetErrMsg(){
                return this.$store.getters.fnGetErrorMessage
            },
            // 시간지연상태 스토어에서 읽어서 반환
            fnGetLoading(){
                return this.$store.getters.fnGetLoading
            }
        },
        methods:{
            // 스토어에 이메일 로그인 처리 요청
            fnDoLogin(){    // 위에서 호출한 fnDoLogin 함수
                this.$store.dispatch('fnDoLogin',{  // store에 있는 fnDoLogin 함수
                    pEmail: this.sEmail,
                    pPassword: this.sPassword
                })
            }
        },
        watch:{
            // fnGetErrMsg 함수가 오류메시지를 반환하면 오류 메시지 표시
            fnGetErrMsg(pMsg){
                if(pMsg) this.bAlert = true
            },
            // bAlert 값이 false로 바뀌면 에러메시지 초기화
            bAlert(pValue){
                if(pValue == false) this.$store.commit('fnSetErrorMEssage','')
            }
        }
    }
</script>

<style>
    .btnCenter{
        display: block;
        margin: auto;
    }
</style>