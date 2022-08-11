// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js';
import { getFirestore, doc, collection, query, setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCei5T1A_yfwgUK8-Z3FgT4gdwWQV263Vo",
    authDomain: "polls-family.firebaseapp.com",
    projectId: "polls-family",
    storageBucket: "polls-family.appspot.com",
    messagingSenderId: "519273609208",
    appId: "1:519273609208:web:47d4692f1b99d3da3cc80d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = {
    data() {
        return {
            topicName: '',
            topics: [],
            selectedTopic: null
        }

    },
    computed: {
        totalVotes() {
            return this.topics.reduce((a, b) => a + b)
        }
    },
    methods: {
        async addnNewTopic(e) {
            e.preventDefault();
            //this.topics.push({ name: this.topicName, votes: 0 });
            await setDoc(doc(db, "polls", new Date().toISOString()), { name: this.topicName, votes: 0 });
            this.topicName = '';
        },
        vote(e, index) {
            e.preventDefault();
            this.topics[index].votes++;
            this.selectedTopic = null;
        }
    },
    mounted() {
        const q = query(collection(db, "polls"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const topics = [];
            querySnapshot.forEach((doc) => {
                topics.push(doc.data());
            });
            this.topics = topics;

        });
    }

}
Vue.createApp(app).mount('#app')
