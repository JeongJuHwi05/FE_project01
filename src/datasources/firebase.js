// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app';

// 파이어베이스 패키지 모듈 가져오기
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// 파이어베이스 DB를 초기화하고 연결
const oFirebase = firebase.initializeApp({
  // 파이어베이스 콘솔에서 복사하여 붙여넣기
  apiKey: "AIzaSyBMLShGxS33f6eLY2ILq_9PDfWBVOAEhR0",
  authDomain: "armond-market.firebaseapp.com",
  databaseURL: "https://armond-market-default-rtdb.firebaseio.com",
  projectId: "armond-market",
  storageBucket: "armond-market.appspot.com",
  messagingSenderId: "1052907074029",
  appId: "1:1052907074029:web:f33c377853951d5fbc77e4"
});

// 파이어베이스 인증 객체 공개
export const oFirebaseAuth = oFirebase.auth();
export const oFirebaseStorage = oFirebase.storage();