new Vue({
    el: '#navhead',
    data: function () {
        return {
            userName: '',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            logoUrl: 'img/logo.jpg',
            activeName: 'second',
            treeData: [

            ]
        }
    }, mounted: function () {
        this.userName = loginNames;
        this.navAxios();
    },
    methods: {
        navAxios: function () {
            const vm = this;
            //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
            axios({
                method: "get",
                url: projectPath + "/modules/getModules"
            })
                .then(function (res) {
                    vm.treeData = res.data;
                    console.log(vm.treeData);
                    console.log(vm.treeData[0].children);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        btn: function () {
            this.$confirm('您确定要安全退出吗？', '安全退出确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let vm = this;
                //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
                axios({
                    method: "post",
                    url: projectPath + "/login/loginOut"
                })
                    .then(function (res) {
                        vm.$message({
                            type: 'success',
                            message: res.data
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消安全退出!'
                });
            });
        },
        updPass: function () {
            this.$confirm('您确定要修改密码吗？', '修改确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                /* let vm = this;
                axios({
                    method: "PUT",
                    url: projectPath+"/user/updUser",
                    data:{
                        userUpdateMan:loginNames,
                        userId:loginIds
                    }
                })
                    .then(function (res) {
                        vm.$message({
                            type: 'success',
                            message: res.data
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); */
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消安全退出!'
                });
            });
        },
        selMyInfo: function () {
            this.$confirm('您确定要查看个人信息吗？', '查看确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let vm = this;
                //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
                axios({
                    method: "post",
                    url: projectPath + "/login/loginOut"
                })
                    .then(function (res) {
                        vm.$message({
                            type: 'success',
                            message: res.data
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消安全退出!'
                });
            });
        }, insertPer: function () {
            this.$confirm('您确定要收集所有系统的权限吗？', '系统权限收集确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let vm = this;
                //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
                axios({
                    method: "post",
                    url: projectPath + "/permission/updatePermission"
                })
                    .then(function (res) {
                        vm.$message({
                            type: 'success',
                            message: res.data
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消权限收集!'
                });
            });
        }, handleClick(tab, event) {
            console.log(tab, event);
        }, handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
});