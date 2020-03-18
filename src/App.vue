<template>
  <div id="app">
    <button @click="onTestNotice">测试弹框</button>
    <router-view/>
  </div>
</template>

<script>
import Notice from './components/Notice'
import create from './utils/create'
export default {
  name: 'App',
  methods: {
    onTestNotice() {
      const notice = create(Notice, {
        title: '这里是标题',
        message: '哈哈哈哈哈哈~~~~',
        duration: 1000
      });
      notice.show();
    }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
