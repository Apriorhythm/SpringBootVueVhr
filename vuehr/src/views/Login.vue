<template>
    <div>
        <el-form :rules="rules">

        </el-form>
        
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            rules: {
                username: {
                    require: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>>
