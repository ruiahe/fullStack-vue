let Vue;

function install(_Vue, storeName = '$store') {
    Vue = _Vue;
    // 混入：把store选项指定到vue原型上
    Vue.mixin({
        beforeCreate() {
            if(this.$options.kstore) {
                Vue.prototype[storeName] = this.$options.kstore;
            }
        }
    })
}

class Store {
    constructor(options = {}) {
      //   利用vue的数据响应式
      this.state = new Vue({
            data: options.state
      });
      // 初始化mutations  
      this.mutations = options.mutations || {};
      //   初始化actions
      this.actions = options.actions || {};
      options.getters && this.handleGetters(options.getters);
    }
    handleGetters(getters){
        this.getters = {};
        // 定义只读属性
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state);
                }
            })
        });
    }

    // 出发mutations,需要实现commit
    commit = (type, arg) => {
        // this只想Store实例
        const fn = this.mutations[type];// 获取变更函数
        fn(this.state, arg);
    }

    dispatch = (type, arg) => {
        const fn = this.actions[type];
        return fn({commit: this.commit, state: this.state}, arg) 
    }
}

export default {Store, install};