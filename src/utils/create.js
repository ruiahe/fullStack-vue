import Vue from'vue';
// 创建指定组件实例，并且挂载于body上
export default function create (Components, props) {
    // 0、先创建vue实例
    const vm = new Vue({
        render(h) {
            // rener方法提供给我们一个h函数，它可以渲染VNode
            return h(Components, {props})
        }
    }).$mount(); // 更细操作

    // 1、上面已经创建了实例
    // 2、通过$children获取该组件实例
    const comp = vm.$children[0];
    // 3、追加到body上，即手动挂载
    document.body.appendChild(vm.$el);
    // 4、清理函数
    comp.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }
    // 5、返回组件实例
    return comp;
}