import { orders } from './orders.js';
const app = {
    data() {
        return {
            currentOrderNumber: 0,
            orders
        }

    },
    computed: {
        currentOrder() {
            return this.orders[this.currentOrderNumber]
        }
    },
    methods: {
        incrementOrder() {
            this.currentOrderNumber++
        },
        decrementOrder() {
            this.currentOrderNumber--
        }
    },
    mounted() {

    }

}
Vue.createApp(app).mount('#app')
