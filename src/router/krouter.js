let Vue;
class VueRouter {
    constructor(options) {
        this.$options = options;
        // 创建path和route映射
        this.routeMap = {};
        // 将来当前路径current需要响应式
        // 利用Vue响应式原理可以做到
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }
    init() {
        // 绑定浏览器事件
        this.bindEvents();
        // 解析路由配置
        this.createRouteMap(this.$options);
        // 创建router-view和router-link
        this.initComponent();
    }
    bindEvents() {
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('load', this.onHashChange.bind(this));
    }
    onHashChange(e) {
        // localhost:8000/#/home => .slice(1)之后就得到/home
        this.app.current = window.location.hash.slice(1) || '/';
    }
    createRouteMap(options) {
        options.routes.forEach(item => {
            // routeMap的结构类似于:['/home']: {path: '/home', component: Home}
            this.routeMap[item.path] = item;
        })
    }
    initComponent() {
        // 声明两个全局组件
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                // 目标是渲染<a href="to">
                return <a href={this.to}>{this.$slots.default}</a>;
                // 或
                // return h('a', {attrs: {href: '#'+this.to}}, this.$slots.default);
            }
        })
        Vue.component('router-view', {
            // 箭头函数能够保留this指向，这里指向VueRouter实例
            render: (h) => {
                const Comp = this.routeMap[this.app.current].component;
                return h(Comp);
            }
        })
    }
}
// 把VueRouter变为插件
VueRouter.install = function(_Vue) {
    Vue = _Vue; // 这里保存，上面使用

    // 混入任务
    Vue.mixin({
        beforeCreate() {
            // 这里的代码将来会在外面初始化的时候被调用
            // 这样我们就实现了Vue的扩展
            // 这里的this指的是Vue组件实例
            // 但这里只希望Vue根组件阻性一次
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router;
                this.$router.init();
            }
        }
    })

}
export default VueRouter;