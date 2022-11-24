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
const errorText = "Topics should be at least two words"
const app = {
    data() {
        return {
            q1: '',
            q2: '',
            q3: '',
            responses: []
        }

    },
    computed: {
        totalResponses() {
            return this.responses.length;
        },
        q1c() {
            return {
                ch1: this.responses.filter(r => r.q1 === '26Dec').length,
                ch2: this.responses.filter(r => r.q1 === '27Dec').length
            }
        }, q2c() {
            return {
                ch1: this.responses.filter(r => r.q2 === 'Rye').length,
                ch2: this.responses.filter(r => r.q2 === 'Dormana').length,
                ch3: this.responses.filter(r => r.q2 === 'Rosebud').length,
            }
        },
        q3c() {
            return {
                ch1: this.responses.filter(r => r.q3 === 'Yes').length,
                ch2: this.responses.filter(r => r.q3 === 'No').length,
            }
        }
    },
    methods: {
        addResponse(e) {
            e.preventDefault();
            if (!this.q1 || !this.q2 || !this.q3) return console.log('invalid');
            this.responses.push({ q1: this.q1, q2: this.q2, q3: this.q3 })
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
