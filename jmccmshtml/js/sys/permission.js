new Vue({
    el: '#modules',
    data: function () {
        return {
            treeData: [

            ],
            treeChildren:[

            ]
        }
    },
    mounted: function () {
        this.treeAxios();
    },
    methods: {
        treeAxios: function () {
            const vm = this;
            //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
            axios({
                method: "get",
                url: projectPath+"/permission/queryNode"
            })
                .then(function (res) {
                    vm.treeData = res.data;
                    console.log(vm.treeData);
                    vm.treeChildren = res.data[0].children;
                    console.log(vm.treeChildren);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, formatterPath: function (row, column, cellValue) {
            return cellValue == null ? "暂无" : cellValue;
        }
    }

})