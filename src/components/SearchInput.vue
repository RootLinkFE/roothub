<template>
    <div class="search-input">
        <input type="text" :value="currentValue" 
        @input="inputHandler"
        @change="inputHandler"
        @blur="blurHandler"
        @focus="focusHandler">
        <i class="iconfont iconsearch"></i>
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
    data () {
        return {
            currentValue: ''
        };
    },
    props: {
        value: String
    },
    watch: {
        value: function(val) {
            this.currentValue = val;
        }
    },
    methods: {
        inputHandler (e) {
            this.$emit('input', e.target.value);
        },
        changeHandler (e) {
            this.$emit('change', e.target.value);
        },
        blurHandler (e) {
            this.$emit('blur', e);
        },
        focusHandler (e) {
            this.$emit('focus', e);
        }
    },
    created () {
        this.currentValue = this.value;
    }
}
</script>

<style lang="less">
.search-input {
    display: inline-block;
    position: relative;
    height: 30px;
    width: 200px;
    border-radius: 20px;
    padding: 4px 0;
    background: #1d2935;
    input {
        -webkit-appearance: none;
        border: none;
        outline: 0;
        background: transparent;
        height: 22px;
        width: 100%;
        line-height: 22px;
        padding: 0 30px 0 40px;
        color: #fff;
        font-size: 13px;
    }
    .iconfont {
        color: #829ebb;
        position: absolute;
        left: 14px;
        top: 7px;
    }
}
</style>