new Vue({
    el: '#modules',
    data: function () {
        return {
            treeData: [

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
                url: projectPath+"/modules/getModules"
            })
                .then(function (res) {
                    vm.treeData = res.data;
                    console.log(vm.treeData);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, formatterRemark: function (row, column, cellValue) {
            return cellValue == null ? "暂无" : cellValue;
        }, formatterPath: function (row, column, cellValue) {
            return cellValue == null ? "暂无" : cellValue;
        }, formatterUpdTime: function (row, column, cellValue) {
            return cellValue == null ? "暂无" : cellValue;
        }, formatterUpdMan: function (row, column, cellValue) {
            return cellValue == null ? "暂无" : cellValue;
        }
    }

})