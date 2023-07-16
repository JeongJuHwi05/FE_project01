<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center" style="margin-top: 120px;">
                <h1 class="font-weight-black text-h4">회원가입 성공!</h1>
            </v-col>

            <v-col align="center" justify="center">
                <img src="../../public/image/etc/joinSucsess.png" class="imgStyle">
            </v-col>
        </v-row>

        
        <v-row>
            <v-col justify="center">
                <div class="boxStyle">
                    <p class="loginText">아이디(이메일) : {{ userId }}</p>
                </div>
            </v-col>
        </v-row>

        <div class="homeBtn">
            <router-link to="/">
                <v-btn class="font-weight-regular text-button" tonal large rounded color="black" dark>홈으로 이동</v-btn>
            </router-link>
        </div>
    </v-container>
</template>

<script>
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';

    export default {
        data() {
            return {
                userId: null,
            };
        },
        created() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // Firebase 계정 ID를 userId 변수에 저장
                    this.userId = user.email;
                }
            });
        },
    };
</script>

<style>
    .imgStyle{
        width: 100px;
        height: 100px;
        margin-top: 20px;
    }

    .boxStyle{
        border: 3px solid rgba(114, 114, 114, 0.568);
        border-radius: 20px;
        width: 500px;
        height: 80px;
        margin: auto;
    }

    .loginText{
        font-size: 16px;
        font-weight: 500;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 30px;
    }

    .homeBtn{
        margin: 30px;
        text-align: center;
    }
</style>