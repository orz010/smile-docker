<template>
    <div class="HeaderBox">
        <div class="SystemTitle">PaaS云管理平台</div>
        <div class="userInfo">
            <el-dropdown @command="handleCommand">
                <span style="font-size:17px">
                    {{this.username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            username: localStorage.getItem("username")
        }
    },
    methods:{
        handleCommand(command){
            if(command == "logout"){
                localStorage.removeItem("username")
                localStorage.removeItem("user_id")
                localStorage.removeItem("identity")
                this.$router.push("/login")
            }else{
                this.$router.push("/message")
            }
        },
    },
}
</script>
<style>
.HeaderBox{
    position: fixed;
    top: 0;
    height: 75px;
    width: 100%;
    /* margin-bottom: -23px; */
    background-color: white;
    /* display: flex; */
    overflow-y: auto;
    z-index: 1000;
}
.SystemTitle {
  float: left;
  font-size: 30px;
  padding-left: 40px;
  padding-top: 20px;
  font-family: "MyFont";
  font-weight: 700;
  border-radius: 60px;
  cursor: pointer;
}
.userInfo{
    float: right;
    font-size: 20px;
    padding-right: 50px;
    padding-top: 20px;
}
</style>