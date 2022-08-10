

const app = {
    data() {
        return {
            topicName: '',
            topics: [],
            selectedTopic: null
        }

    },
    computed: {

    },
    methods: {
        addnNewTopic(e) {
            e.preventDefault();
            this.topics.push({ name: this.topicName, votes: 0 });
            this.topicName = ''
        },
        vote(e, index) {
            e.preventDefault();
            this.topics[index].votes++;
            this.selectedTopic = null;
        }
    }

}
Vue.createApp(app).mount('#app')
