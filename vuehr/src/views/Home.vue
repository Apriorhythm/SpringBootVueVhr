<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">人事</div>

        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            {{ user.name }}
            <i><img :src="user.userface" alt=""/></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided
              >注销登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 增加 router 字段，el-menu会以 index 作为 path 进行跳转 -->
          <el-menu router>
            <el-submenu
              index="1"
              v-for="(item, indexi) in submenuList"
              :key="indexi"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="child.path"
                v-for="(child, indexj) in item.children"
                :key="indexj"
                >{{ child.name }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  methods: {
    commandHandler(command) {
      if (command == "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getRequest("/logout");
            window.sessionStorage.removeItem("user");
            this.$router.replace("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
  },
  computed: {
    submenuList: function() {
      let ret = {};
      const origin = this.$router.options.routes;
      for (let key in origin) {
        if (origin.hasOwnProperty(key) && !origin[key].hidden) {
          console.log(origin[key].hidden);
          ret[key] = origin[key];
        }
      }

      return ret;
    },
  },
};
</script>

<style lang="less" scoped>
.homeHeader {
  background-color: #0098ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;

  .userInfo {
    cursor: pointer;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-left: 8px;
      }
    }
  }
}

.homeHeader .title {
  font-size: 30px;
  color: white;
}
</style>
