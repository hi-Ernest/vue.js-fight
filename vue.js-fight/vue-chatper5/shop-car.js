var app = new Vue({
    el: '#app',
    data: {
        index: '',
        item: '',
        list: [
            {
                id: 1,
                name: 'iphone11',
                price: 6999,
                count: 55
            },
            {
                id: 2,
                name: 'ipad',
                price: 2999,
                count: 23
            },
            {
                id: 3,
                name: 'macbook pro',
                price: 12999,
                count: 90
            }
        ]
    },
    computed: {
        totalPrice: function() {
            var total = 0;
            for(var i = 0; i < this.list.length; i++) {
                total += this.list[i].price * this.list[i].count;
            }
            //千位分隔符
            return total .toString () .replace(/\B (?= (\d{3}) +$)/g,','); 
        }
        
    },
    methods: {
        handleReduce: function(index) {
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function(index) {
            this.list[index].count++;
        },
        handleRemove: function(index) {
            this.list.splice(index, 1);
        }
    }
})
