
function isValueNumber (value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');     
}

function regEmail(value) {
    return (/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/);
}

function isValuePhone(value) {
    return (/^1\d{10}$/);
}


Vue.component('input-number', {
    template: '\
        <div class="input-number">\
            <input type="text"\
                :value="currentValue"\
                @change="handleChange">\
            <button\
                @click="handleDown"\
                :disabled="currentValue <= min">-</button>\
            <button\
                @click="handleUp"\
                :disabled="currentValue >= max">+</button>\
                <button\
                @click="handleUp2"\
                :disabled="currentValue >= max">+2</button>\
        </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function(val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function(val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function(val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown: function() {
            if (this.currentValue <= this.min) return;
            this.currentValue -= 1;
            
        },
        handleUp: function() {
            if (this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleUp2: function() {
            if (this.currentValue >= this.max) return;
            this.currentValue += 2;
        },
        handleChange: function(event) {
            var val = event.target.value.trim();
            var max = this.max;
            this.min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;

                if (val > max) {
                    this.currentValue = max;
                }else if (val < min) {
                    this.currentValue = min;
                }
            }else {
                event.target.value = this.current;
            }
        }
    }
});