<template>
    <v-container flow style="margin-bottom: 160px;">
        <v-row>
            <v-col cols="12" class="text-center" style="margin-top: 120px;">
                <h1 class="font-weight-black text-h4">회원가입</h1>
                <p class="mt-4" style="color: #3E2723;">지금 바로 아몬드 마켓의 회원이 되어 일상의 예술을 경험해보세요!</p>
            </v-col>
        </v-row>

        <v-container class="joinSection">
            <v-row>
                <!-- 반응형에 따라 다르게 너비 조절 -->
                <v-col class="text-center mt-5" cols="12" offset="2" sm="6" offset-sm="3">
                    <!-- 양식의 입력이 제출되면 페이지를 다시 로드하지 않도록 prevent 사용 -->
                    <form @submit.prevent="fnRegisterUser">
                        <v-row align="center" no-gutters class="textLeft">
                            <v-col cols="3" class="font-weight-bold">이름</v-col>
                            <v-col>
                                <v-text-field name="Name" label="이름" type="input" v-model="sName" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">아이디(이메일)</v-col>
                            <v-col>
                                <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">비밀번호</v-col>
                            <v-col>
                                <v-text-field 
                                    name="Password"
                                    label="비밀번호"
                                    :type= "pwSeeYn ? 'input' : 'password'"
                                    :append-icon="pwSeeYn ? 'mdi-eye-off' : 'mdi-eye'" 
                                    @click:append="fnPwSee"
                                    v-model="sPassword" 
                                    required
                                    :rules="fnUserPwRule"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" class="textLeft" no-gutters style=" margin-top: -10px; font-size: 12px;" :style="{'visibility': sPassword ? 'hidden' : ''}">
                            <v-col offset="3">
                                <p style="font-size: 12px;">* 6~20자, 영문+숫자+특수문자(!@#$%^&*+)만 입력 해주세요.</p>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">비밀번호 확인</v-col>
                            <v-col>
                                <!-- 비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용 -->
                                <v-text-field
                                    name="ConfirmPassword"
                                    label="비밀번호 확인"
                                    :type= "confirmPwSeeYn ? 'input' : 'password'"
                                    :append-icon="confirmPwSeeYn ? 'mdi-eye-off' : 'mdi-eye'" 
                                    @click:append="fnConfirmPwSee"
                                    v-model="sConfirmPassword"
                                    required
                                    :rules="[fnComparePassword]"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">전화번호</v-col>
                            <v-col>
                                <!-- 비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용 -->
                                <v-text-field name="PhoneNumber" label="전화번호 ( ' - ' 제외 )" type="text" v-model="sPhoneNumber" required :rules="fnUserPNRule"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="2">우편번호</v-col>
                            <v-col offset="1" cols="4">
                                <!-- 비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용 -->
                                <v-text-field name="Postcode" label="우편번호" type="text" v-model="sPostcode" disabled required></v-text-field>
                            </v-col>
                            <v-col class="ml-2">
                                <v-btn small outlined color="#01579B" @click="openPostcode">
                                    주소검색
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">주소</v-col>
                            <v-col>
                                <!-- 비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용 -->
                                <v-text-field name="Address" label="주소" type="text" v-model="sAddress" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">상세 주소</v-col>
                            <v-col>
                                <!-- 비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용 -->
                                <v-text-field name="DetailAddress" label="상세 주소" type="input" v-model="sDetailAddress"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeftMT">
                            <v-col class="font-weight-bold" cols="3">약관 동의</v-col>
                            <v-col cols="1"><v-checkbox v-model="sAllCheck" @click="fnAllCheck"/></v-col>
                            <v-col>전체동의
                                <span style="font-size: 12px; color: grey;">(선택사항 포함 모든 약관 동의)</span>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeftMT">
                            <v-col offset="3" cols="1"><v-checkbox required v-model="sTerms"/></v-col>
                            <v-col> 이용약관(필수)</v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeftMT">
                            <v-col offset="3" cols="1"><v-checkbox required v-model="sPersonal"/></v-col>
                            <v-col>개인정보수집 항목 (필수)</v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeftMT">
                            <v-col offset="3" cols="1"><v-checkbox v-model="sFreeService"/></v-col>
                            <v-col>무료서비스 전체이용 항목 (선택)</v-col>
                        </v-row>

                        <!-- 시간지연상태인 경우 버튼은 사라지게 함 -->
                        <v-btn
                            large
                            type="submit"
                            v-if="!fnGetLoading"
                            color="#DD2C00"
                            dark
                            class="text-button font-weight-bold"
                            style="margin-top: 70px;"
                            > 회원가입
                        </v-btn>

                        <!-- 시간지연의 경우 회전 프로그레스 원 표시 -->
                        <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="grey lighten-1"></v-progress-circular>

                        <!-- 오류 메시지가 있을 경우 표시 -->
                        <v-alert type="error" dismissible v-model="bAlert">
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
                sName:'',   // 이름 입력값 임시 저장
                sEmail: '', // 이메일 입력값 임시 저장
                sPassword: '', // 비밀번호 입력값 임시 저장
                sConfirmPassword: '', // 비밀번호 입력 확인값 임시 저장
                sPhoneNumber: '', // 전화번호 입력값 임시 저장
                sPostcode:'', // 우편번호 입력값 임시 저장
                sAddress: '',   // 주소 입력값 임시 저장
                sDetailAddress: '', // 상세주소 입력값 임시 저장
                sAllCheck: false, // 약관 전체동의 체크값 임시 저장
                sTerms: false, // 이용약관 체크값 임시 저장
                sPersonal: false, // 개인정보수집 항목 체크값 임시 저장
                sFreeService: false, // 무료 서비스 전체이용 항목 체크값 임시 저장

                pwSeeYn: false, // 비밀번호 보기 체크 변수
                confirmPwSeeYn: false, // 비밀번호 확인 보기 체크 변수
            }
        },
        computed:{
            // 비밀번호 조건
            fnUserPwRule() {
                return [
                    v => !v || /^[a-zA-Z0-9!@#$%^&*+]*$/.test(v) || "영문+숫자+특수문자(!@#$%^&*+)만 입력 가능합니다.",
                    v => !(v && v.length >= 20) || '패스워드는 20자 이상 입력할 수 없습니다.',
                    v => !(v && v.length <= 6) || '패스워드는 6자 이상 입력 해주세요.'
                ];
            },

            // 핸드폰번호에 입력값 숫자인지 검사
            fnUserPNRule(){
                return [
                    v => !!(v && /^[0-9]*$/.test(v)) || '숫자만 입력 해주세요.'
                ];
            },

            // 비밀번호와 비밀번화 확인 값이 일치하는지 여부 검사
            fnComparePassword(){
                if(this.sPassword == this.sConfirmPassword) return true
                else return '비밀번호가 일치하지 않습니다!'
            },
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
            // 스토어에 이메일 회원가입 처리 요청
            fnRegisterUser(){
                if(this.fnComparePassword == true){
                    this.$store.dispatch('fnRegisterUser',{
                        pName : this.sName,
                        pEmail : this.sEmail,
                        pPassword : this.sPassword,
                        pPhoneNumber : this.sPhoneNumber,
                        pPostcode : this.sPostcode,
                        pAddress : this.sAddress,
                        pDetailAddress : this.sDetailAddress,
                        pTerms : this.sTerms,
                        pPersonal : this.sPersonal,
                        pFreeServic : this.sFreeService
                    })
                }
            },
            openPostcode(){
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드
                        this.sPostcode = data.zonecode;
                        this.sAddress = data.roadAddress;
                    }
                }).open();
            },
            // 비밀번호 보기 클릭 시 이벤트 함수
            fnPwSee(){
                return this.pwSeeYn = !this.pwSeeYn;
            },

            // 비밀번호 확인 보기 클릭 시 이벤트 함수
            fnConfirmPwSee(){
                return this.confirmPwSeeYn = !this.confirmPwSeeYn;
            },

            // 약관 전체 동의 체크
            fnAllCheck(){
                this.sTerms = this.sAllCheck;
                this.sPersonal = this.sAllCheck;
                this.sFreeService = this.sAllCheck
            },
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
    .joinSection{
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        margin-top: 30px;
        width: 1100px;
        height: 900px;
    }

    .textLeft{
        text-align: left;
    }

    .textLeftMT{
        text-align: left;
        margin-top: -20px;
    }
</style>