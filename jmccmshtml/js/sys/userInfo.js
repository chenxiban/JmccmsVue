new Vue({
    el: '#userInfo',
    data: function () {
        return {
            tableData: [

            ],
            currentPage: 1,// 分页页数
            pagesize: 5,// 分页条数
            total: 5,// 每页总数
            search: '',
            dialogFormVisible: false,
            dialogFormUpd: false,
            dialogFormSetRoleVisible: false,
            from: {
                userInfoName: '',
                userInfoSex: '',
                userInfoBirthday: '',
                userInfoEmail: '',
                userInfoPhone: '',
                userInfoAddress: '',
                userInfoRemark: ''
            },
            rules: {
                userInfoName: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                },
                {
                    pattern: /^.{2,16}$/,
                    message: '用户名格式为2到16位（字母，数字，下划线，减号）',
                    trigger: 'blur'
                }
                ],
                userInfoEmail: [{
                    required: true,
                    message: '请输入用户邮箱',
                    trigger: 'blur'
                },
                {
                    pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }
                ],
                userInfoPhone: [{
                    type: 'number',
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                },
                {
                    pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                    message: '手机号格式不正确',
                    trigger: 'blur'
                }
                ],
                userInfoAddress: [{
                    required: false,
                    message: '请输入用户地址',
                    trigger: 'blur'
                },
                {
                    min: 10,
                    max: 140,
                    message: '内容长度在 10 到 140 个字符',
                    trigger: 'blur'
                }
                ],
                userInfoRemark: [{
                    required: false,
                    message: '请输入用户简介',
                    trigger: 'blur'
                },
                {
                    min: 5,
                    message: '内容长度至少大于5字符',
                    trigger: 'blur'
                }
                ]
            },
            froms: {
                userInfoId: '',
                userInfoName: '',
                userInfoSex: '',
                userInfoBirthday: '',
                userInfoEmail: '',
                userInfoPhone: '',
                userInfoAddress: '',
                userInfoRemark: ''
            },
            rulesU: {
                userInfoName: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                },
                {
                    pattern: /^.{2,16}$/,
                    message: '用户名格式为2到16位（字母，数字，下划线，减号）',
                    trigger: 'blur'
                }
                ],
                userInfoEmail: [{
                    required: true,
                    message: '请输入用户邮箱',
                    trigger: 'blur'
                },
                {
                    pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }
                ],
                userInfoPhone: [{
                    type: 'number',
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                },
                {
                    pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                    message: '手机号格式不正确',
                    trigger: 'blur'
                }
                ],
                userInfoAddress: [{
                    required: false,
                    message: '请输入用户地址',
                    trigger: 'blur'
                },
                {
                    min: 10,
                    max: 140,
                    message: '内容长度在 10 到 140 个字符',
                    trigger: 'blur'
                }
                ],
                userInfoRemark: [{
                    required: false,
                    message: '请输入用户简介',
                    trigger: 'blur'
                },
                {
                    min: 5,
                    message: '内容长度至少大于5字符',
                    trigger: 'blur'
                }
                ]
            },
            formSearch: {
                searchUserName: '',
                searchUserPhone: '',
                searchUserEmail: '',
                searchUserAddress: '',
                searchUserSex: '',
                searchUserStatus: '',
                searchUserCreateTime: ''
            },
            dataSetRole: [

            ],
            rightC: [

            ],
            userIdss: 0,// 用于记录选择的用户id
            // 检索创建时间
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    mounted: function () {
        //this.ajax(this.formSearch);
        let vm = this;
        vm.ajax();
    },
    methods: {
        //分页方法
        handleSizeChange: function (size) {// 监听每页几条数据
            let vm = this;
            vm.pagesize = size;
            // 打印每页几条数据
            console.log(vm.pagesize);
            // 刷新表格数据
            vm.ajax();
        },
        handleCurrentChange: function (page) {// 监听页数变化
            let vm = this;
            vm.currentPage = page;
            // 打印这是第几页
            console.log(vm.currentPage);
            // 刷新表格数据
            vm.ajax();
        },
        ajax: function () {
            //console.log(this.$refs[formSearch].model.searchUserName);
            let vm = this;

            //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
            axios({
                method: "get",
                url: projectPath+"/userInfo/getAllUserInfos",
                params: {
                    userInfoName: vm.formSearch.searchUserName,
                    userInfoSex: vm.formSearch.searchUserSex,
                    userInfoBirthday: vm.formSearch.userInfoBirthday,
                    userInfoEmail: vm.formSearch.searchUserEmail,
                    userInfoPhone: vm.formSearch.searchUserPhone,
                    userInfoAddress: vm.formSearch.searchUserAddress,
                    userInfoIsLookout: vm.formSearch.searchUserStatus, 
                    birthStart: vm.formSearch.searchUserCreateTime[0],
                    birthEnd: vm.formSearch.searchUserCreateTime[1],
                    page: vm.currentPage,
                    rows: vm.pagesize
                }
            })
                .then(function (res) {
                    let obj = res.data.rows;
                    vm.tableData = res.data.rows;
                    vm.total = res.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        formatterSex: function (row, column, cellValue) {
            return cellValue == "0" ? "男" : "女";
        },
        setRole: function (index, row) {// 给用户设置角色
            let vm = this;
            vm.userIdss = row.userInfoId;
            vm.dialogFormSetRoleVisible = true;
            //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
            axios({
                method: "get",
                url: projectPath+"/role/getRoleList",
                params: {
                    userId: row.userInfoId
                }
            })
                .then(function (res) {
                    const obj = [];
                    const objs = [];
                    for (let i = 0; i < res.data.left.length; i++) {
                        /* console.log(res.data.left[i].roleId);
                        console.log(res.data.left[i].roleName); */
                        obj.push({
                            key: res.data.left[i].roleId,
                            label: res.data.left[i].roleName
                        });
                    }
                    //console.log(obj);
                    vm.dataSetRole = obj;
                    for (let i = 0; i < res.data.right.length; i++) {
                        objs.push(
                            res.data.right[i].roleId,
                        );
                    }
                    //console.log(objs);
                    vm.rightC = objs;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 监听设置角色改变(三个值分别对应 value值-移除left添加right-角色id)
        handleChange(value, direction, movedKeys) {
            let vm = this;
            const roleId = movedKeys.join(',');
            // 移除角色
            // 操作类型console.log("操作类型:"+direction);console.log("角色id:"+movedKeys);console.log("用户id:"+vm.userIdss);
            if (direction == "left") {
                axios({
                    method: "post",
                    url: projectPath+"/role/setByRole",
                    params: {
                        roleId: roleId,
                        userId: vm.userIdss,
                        p: 2
                    }
                })
                    .then(function (res) {
                        if (res.data) {
                            vm.$message({
                                type: 'success',
                                message: '为当前用户移除角色成功'
                            });
                        } else {
                            vm.$message({
                                type: 'error',
                                message: '为当前用户移除角色失败'
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                axios({
                    method: "post",
                    url: projectPath+"/role/setByRole",
                    data: {
                        roleId: roleId,
                        userId: vm.userIdss,
                        p: 1
                    }
                })
                    .then(function (res) {
                        if (res.data) {
                            vm.$message({
                                type: 'success',
                                message: '为当前用户设置角色成功'
                            });
                        } else {
                            vm.$message({
                                type: 'error',
                                message: '为当前用户设置角色失败'
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        // 打开添加用户窗体
        addOrg: function () {
            let vm = this;
            vm.dialogFormVisible = true;
        },
        // 打开修改用户窗体
        updOrg: function (index, row) {
            let vm = this;
            vm.dialogFormUpd = true;
            vm.froms = {
                userInfoId: row.userInfoId,
                userInfoName: row.userInfoName,
                userInfoSex: row.userInfoSex,
                userInfoBirthday: row.userInfoBirthday,
                userInfoEmail: row.userInfoEmail,
                userInfoPhone: parseInt(row.userInfoPhone),
                userInfoAddress: row.userInfoAddress,
                userInfoRemark: row.userInfoRemark
            }
        },
        // 提交添加用户
        onSubmit(from) {
            this.$refs[from].validate((valid) => {
                let vm = this;
                if (valid) {
                    //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
                    axios({
                        method: "post",
                        url: projectPath+"/userInfo/addUserInfos",
                        data: {
                            userInfoName: vm.$refs[from].model.userInfoName,
                            userInfoSex: vm.$refs[from].model.userInfoSex,
                            userInfoBirthday: vm.$refs[from].model.userInfoBirthday,
                            userInfoEmail: vm.$refs[from].model.userInfoEmail,
                            userInfoPhone: vm.$refs[from].model.userInfoPhone,
                            userInfoAddress: vm.$refs[from].model.userInfoAddress,
                            userInfoRemark: vm.$refs[from].model.userInfoRemark,
                            userInfoFounder: '陈小佳'// 这里需要修改成登录 loginNames
                        }
                    })
                        .then(function (res) {
                            if (res.data.success) {
                                vm.$message({
                                    type: 'success',
                                    message: res.data.message
                                });
                                vm.$refs[from].resetFields();
                                vm.dialogFormVisible = false;
                                vm.ajax();
                            } else {
                                vm.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                                vm.ajax();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    vm.$alert('添加表单验证失败', '添加失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                            vm.$message({
                                type: 'info',
                                message: '添加表单验证失败'
                            });
                        }
                    });
                    return false;
                }
            });
        },
        // 提交修改用户
        onSubmitUpd(from) {
            this.$refs[from].validate((valid) => {
                let vm = this;
                if (valid) {
                    //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
                    axios({
                        method: "put",
                        url: projectPath+"/userInfo/updUserInfo",
                        data: {
                            userInfoId: vm.$refs[from].model.userInfoId,
                            userInfoName: vm.$refs[from].model.userInfoName,
                            userInfoSex: vm.$refs[from].model.userInfoSex,
                            userInfoBirthday: vm.$refs[from].model.userInfoBirthday,
                            userInfoEmail: vm.$refs[from].model.userInfoEmail,
                            userInfoPhone: vm.$refs[from].model.userInfoPhone,
                            userInfoAddress: vm.$refs[from].model.userInfoAddress,
                            userInfoRemark: vm.$refs[from].model.userInfoRemark,
                            userInfoUpdateMan: '陈小佳'
                        }
                    })
                        .then(function (res) {
                            if (res.data) {
                                vm.$message({
                                    type: 'success',
                                    message: '修改当前用户成功'
                                });
                                vm.$refs[from].resetFields();
                                vm.dialogFormUpd = false;
                                vm.ajax();
                            } else {
                                vm.$message({
                                    type: 'error',
                                    message: '修改当前用户失败'
                                });
                                vm.ajax();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    vm.$alert('修改表单验证失败', '修改失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                            vm.$message({
                                type: 'info',
                                message: '修改表单验证失败'
                            });
                        }
                    });
                    return false;
                }
            });
        }, onSubmitFormSearch() {
            this.ajax();
        },
        // 提交删除操作
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let vm = this;
                //发送Ajax请求axios.get|post(url,param).then(回调).catch(异常);
                axios({
                    method: "delete",
                    url: projectPath+"/userInfo/delUserInfo",
                    params: {
                        userInfoId: row.userInfoId
                    }
                })
                    .then(function (res) {
                        if (res.data) {
                            vm.$message({
                                type: 'success',
                                message: '删除当前用户成功'
                            });
                            vm.ajax();
                        } else {
                            vm.$message({
                                type: 'error',
                                message: '删除当前用户失败'
                            });
                            vm.ajax();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除用户信息!'
                });
            });
        },
        // 关闭添加用户清空
        closeAddDialog() {
            this.$refs['from'].resetFields();
        },
        // 关闭修改用户清空
        closeUpdDialog() {
            this.$refs['froms'].resetFields();
        },
        // 重置from表单
        resetForm(from) {
            this.$refs[from].resetFields();
        },
        // 重置froms表单
        resetForms(from) {
            this.$refs[from].resetFields();
        },
        // 重置检索表单(条件)
        resetFormSearch(from) {
            this.$refs[from].resetFields();
        }
    }

})