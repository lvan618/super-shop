<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/header3.png" alt="">
        <!-- <span>电商后台管理系统</span> -->
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!-- 侧别栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item @click="saveNavState('/'+subItem.path)" :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="youyou">
          <img src="../assets/header2.png" alt="">
        </div>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      menuList: [],
      // 菜单图标
      iconObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-3702mima',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 菜单是否折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginout() {
      window.sessionStorage.clear()
      this.$message('退出成功')
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.menuList = res.data
      // console.log(res)
    },
    // 点击按钮，切换菜单的折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
    }
    // span {
    //   margin-left: -50px;
    // }
  }
}
.el-aside {
  background-color: #333744;
  .toggle_button {
    background-color: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: .2em;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
  .youyou {
    img {
      position: absolute;
      bottom: 0;
      width: 200px;
    }
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
</style>
