<template>
    <v-container style="margin-bottom: 160px;">
        <v-container flow>
            <v-row>
                <v-col cols="12" class="text-center" style="margin-top: 120px;">
                    <h1 class="font-weight-black text-h4">문의 하기</h1>
                </v-col>
            </v-row>
        </v-container>

        <v-container class="joinSection">
            <v-row>
                <!-- 반응형에 따라 다르게 너비 조절 -->
                <v-col class="text-center mt-5" cols="12" offset="2" sm="6" offset-sm="3">
                    <!-- 양식의 입력이 제출되면 페이지를 다시 로드하지 않도록 prevent 사용 -->
                    <form v-on:submit="submit">
                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">문의 제목</v-col>
                            <v-col>
                                <v-text-field name="Title" label="문의 제목" type="title" v-model="sTitle" required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row align="center" no-gutters class="textLeft">
                            <v-col class="font-weight-bold" cols="3">문의 내용</v-col>
                            <v-col>
                                <v-text-field outline name="Content" label="문의 내용" type="content" v-model="sContent" required></v-text-field>
                            </v-col>
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
                            > 문의 제출
                        </v-btn>
                    </form>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    
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