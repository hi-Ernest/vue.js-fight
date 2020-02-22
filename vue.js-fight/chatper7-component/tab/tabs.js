


Vue.component('tabs', {
    template: '\
        <div class="tabs">\
            <div class="tabs-bar">\
                <!-- 标签页标题, 这里要用v-for -->\
            </div>\
            <div class="tabs-content">\
                <!-- 这里的slot嵌套的pane-->\
                <slot></slot>\
            </div>\
        </div>',
        data: function() {
            return {
                // 用于渲染 tabs 的标题
                navList: []
            }
        },
        methods: {
            getTabs () {
                // 通过遍历子组件,得到所有pane组件
                return this.$children.filter(function (item) {
                    return item.$options.name === 'pane';
                })
            },
            updateNav () {
                this.navList = [];
                // 设置对this的引用,在function回调里,this指向的并不是Vue实例
                var _this = this;
                this.getTabs().forEach(function (pane, index) {
                    _this.navList.push({
                        lable: pane.lable,
                        name: pane.name || index
                    });
                    // 如果没有给pane设置name,默认设置它的索引
                    if (!pane.name) {
                        pane.name = index;
                    }
                    // 设置当前选中的tab的索引,在后面介绍
                    if (index === 0) {
                        if (!_this.currentValue) {
                            _this.currentValue = pane.name || index;
                        }
                    }
                });
                this.updateStatus();
            },
            updateStatus () {
                var tabs = this.getTabs();
                var _this = this;
                // 显示当前选中的tab对应的pane组件,隐藏没有选中的
                tabs.forEach(function (tab) {
                    return tab.show = tab.name === _this.currentValue;
                })
            }
        }
})