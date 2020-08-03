<template>
  <div>
    <el-button type="info" @click="loginout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    loginout() {
      window.sessionStorage.clear()
      this.$message('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
