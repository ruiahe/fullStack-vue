<template>
    <div>
        <p>这里测试自定义kvuex的代码</p>
        <hr style='margin: 8px 0;'>
        <h5>count数据：{{$kstore.state.count}}</h5>
        <hr style='margin: 8px 0;'>
        <button @click="add">增加</button>
        <hr style='margin: 8px 0;'>
        <button @click="asyncAdd">异步增加</button>
        <hr style='margin: 8px 0;'>
        <h5>getters获取的数据：{{$kstore.getters.score}}</h5>
    </div>
</template>
<script>
export default {
    mounted() {
    },
    methods: {
        add() {
            this.$kstore.commit('add', 2);
        },
        asyncAdd() {
            const result = this.$kstore.dispatch('asyncAdd');
            if (result.ok == 1) {
                alert('操作成功！')
            }
        }
    }
}
</script>