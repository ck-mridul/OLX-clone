
import { initializeApp } from "firebase/app"
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
        apiKey: "AIzaSyAx8jxDYLKuZjofBf1bV99rxOIFSnYCFgE",
        authDomain: "reactolx-1ce84.firebaseapp.com",
        projectId: "reactolx-1ce84",
        storageBucket: "reactolx-1ce84.appspot.com",
        messagingSenderId: "222429629872",
        appId: "1:222429629872:web:61417c8f55fab4ed38da75",
        measurementId: "G-K6L2E8WS8M"
      };
export default initializeApp(firebaseConfig)