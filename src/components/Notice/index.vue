<template>
    <div>
        Notice
        <div v-if='isShow'>
            <h3>{{title}}</h3>
            <div>{{message}}</div>
        </div>    
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 3000
        }
    },
    data () {
        return {
            isShow: false
        }
    },
    methods: {
        show() {
            this.isShow = true;
            setTimeout( () => {
                this.hide();
            }, this.duration);
        },
        hide() {
            this.hide = false;
            this.remove();
        }
    }
}
</script>
<style lang="css" scoped>

</style>