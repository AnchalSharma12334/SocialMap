import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDsXlldaY37KijgZc8jE-oi1LxUAQChx2Y',
  authDomain: 'socialmap-a3b94.firebaseapp.com"',
  projectId: 'socialmap-a3b94',
  storageBucket: 'socialmap-a3b94.firebasestorage.app',
  messagingSenderId: '159825649826',
  appId: '1:159825649826:web:7282da4a88a35e46dfb7fb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();