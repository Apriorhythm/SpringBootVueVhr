<template>
    <div>
        <el-form ref="loginForm" class="loginContainer" :rules="rules" :model="loginForm">
            <h3 class="loginTitle">登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-checkbox class="loginRemember" v-model="checked"></el-checkbox>
            <span>Remember me</span>

            <el-button class="loginButton" type="primary" @click="submitLogin">登录</el-button>
        </el-form>
        
    </div>
</template>

<script>

import { postKeyValueRequest } from "../utils/api"
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "admin",
                password: '123'
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }]
            },
            checked: true
        }
    },

    methods: {
        submitLogin() {
            this.$refs.loginForm.validate((valid) => {
            if (valid) {
                postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                    alert(JSON.stringify(resp));
                });

            } else {
                console.log('error submit!!');
                return false;
            }
            });

        }
    }
}
</script>

<style lang="less" scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .loginTitle {
            margin: 15px auto 20px auto; 
            text-align: center;
            color: #505458;
        }

        .loginRemember {
            text-align: left;
            margin: 0px 8px 15px 0px;
        }

        .loginButton {
            width: 100%;
        }
    }
</style>
