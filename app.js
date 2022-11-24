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
const errorText = "Error: 1 or more questions not answered "
const successText = "Success: your vote has been added"
const app = {
    data() {
        return {
            q1: '',
            q2: '',
            q3: '',
            responses: [],
            error: '',
            success: !!localStorage.getItem('christmas-party') ? 'You have already voted' : '',
            hideSubmit: !!localStorage.getItem('christmas-party')
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
        async addResponse(e) {
            e.preventDefault();
            if (!this.validate()) return;
            await setDoc(doc(db, "christmas-party", new Date().toISOString()), { q1: this.q1, q2: this.q2, q3: this.q3 });
            localStorage.setItem('christmas-party', 'voted')
            this.error = ''
            this.success = successText
            this.hideSubmit = true
        },
        validate() {
            if (!this.q1 || !this.q2 || !this.q3) {
                this.error = errorText;
                return false
            }
            return true;
        },
    },
    mounted() {
        const q = query(collection(db, "christmas-party"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const responses = [];
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                responses.push(doc.data());
            });
            this.responses = responses;

        });
    }

}

Vue.createApp(app).mount('#app')
