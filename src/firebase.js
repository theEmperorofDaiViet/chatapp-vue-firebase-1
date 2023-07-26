import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { ref, onUnmounted, computed } from 'vue'
import Filter from 'bad-words'

firebase.initializeApp({
  apiKey: "AIzaSyDEBXdrowZn15Qjn6zR_Ywl6C6zd9iEf-I",
  authDomain: "chatapp-vue-firebase-1.firebaseapp.com",
  projectId: "chatapp-vue-firebase-1",
  storageBucket: "chatapp-vue-firebase-1.appspot.com",
  messagingSenderId: "922247102896",
  appId: "1:922247102896:web:6ba0b2b95fe7a045af5675",
  measurementId: "G-CS1S7P3M9Z"
});

const auth = firebase.auth();

export function useAuth() {
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChanged(_user => user.value = _user);
    onUnmounted(unsubscribe);
    const isLogin = computed(() => user.value !== null);

    const signIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(googleProvider).catch((err) => console.log(err));
    };

    const signOut = () => {
        auth.signOut();
    }

    return { user, isLogin, signIn, signOut };
}

const firestore = firebase.firestore();
const messagesCollection = firestore.collection('message');
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100);
const filter = new Filter();

export function useChat() {
    const messages = ref([]);
    const unsubscribe = messagesQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data({ serverTimestamps: 'estimate' })}
        }).reverse()
    });
    onUnmounted(unsubscribe);

    const { user, isLogin } = useAuth();
    const sendMessage = text => {
        if(!isLogin.value) return;
        const { photoURL, uid, displayName } = user.value;
        messagesCollection.add({
            userName: displayName,
            userId: uid,
            userPhotoURL: photoURL,
            text: filter.clean(text),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return { messages, sendMessage };
}