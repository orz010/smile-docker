<template>
  <div class="">
    <el-card class="asideCard">
      <el-menu
        style="text-align: left"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @select="handleSelect"
        :default-active="activeIndex"
        @close="handleClose"
      >
        <el-menu-item index="/image" @click="fetchData">
          <i class="el-icon-coin"></i>
          <span>镜像管理</span>
        </el-menu-item>
        <el-menu-item index="/docker" @click="fetchData">
          <i class="el-icon-set-up"></i>
          <span slot="title">工作负载管理</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminAsideBox",
  data() {
    return {
      username: localStorage.getItem("username"),
      activeIndex: "/",
    };
  },
  created() {
    this.handleRouteChange(this.$route.path);
    console.log("侧边栏被挂载");
  },
  mounted() {
    this.handleRouteChange(this.$route.path);
    console.log("侧边栏被挂载");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleRouteChange(path) {
      this.activeIndex = path;
    },
    handleSelect(index) {
      if (index === this.activeIndex) {
        return;
      }
      this.$router.push(index);
      this.activeIndex = index;
    },
    fetchData() {
      console.log("页面切换");
    },
  },
  watch: {
    "$route.path": function (newPath) {
      this.handleRouteChange(newPath);
      console.log("切换路由");
    },
  },
};
</script>
<style>
.asideCard .el-card__body {
  padding: 0;
}

.asideCard {
  min-height: 100vh;
}

.el-menu-item span {
  font-size: 18px;
  font-weight: 500;
}
.unread-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
.item {
  margin-top: -10px;
  margin-left: 3px;
}
</style>
