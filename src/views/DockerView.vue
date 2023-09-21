<template>
  <div>
    <HeaderBox/>
      <el-col :span="3" style="margin-left: 10px; margin-top: 10px;">
        <div style="">
          <AdminAsideBox></AdminAsideBox>
        </div>
      </el-col>
      <el-col :span="1" style="min-height: 20px"></el-col>
      <el-col :span="19" style="margin-top: 10px;">
        <el-row>
          <el-col :span="8" style="min-height: 20px"></el-col>
          <el-col :span="12" style="min-height: 20px">
            <el-input  @keyup.enter.native="handleSearch"
                       @submit.native.prevent
                       v-model="search"
                       placeholder="请输入"
                       clearable
                       @clear="handleSearch" ></el-input>
          </el-col>
          <el-col :span="2" style="min-height: 20px">
            <el-button @click="handleSearch" icon="el-icon-search" circle></el-button>
          </el-col>
          <el-col :span="2" style="min-height: 20px">
            <AddDockerButton></AddDockerButton>
          </el-col>
        </el-row>
        <el-row>
          <el-table
              class="shadow"
              :data="clientList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :row-class-name="tableRowClassName">
            <el-table-column
                prop="containerId"
                label="ID"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                >
            </el-table-column>
            <el-table-column
                prop="image"
                label="镜像"
                >
            </el-table-column>
            <el-table-column
                prop="containerPort"
                label="端口号"
                >
            </el-table-column>
            <el-table-column
                min-width="100px"
                >
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-video-play" @click="tickoff(scope.row)">启动</el-button>
                <el-button type="text" icon="el-icon-video-pause" @click="stop(scope.row)">停止</el-button>
                <el-button type="text" icon="el-icon-chat-dot-round" @click="toclient(scope.row)">详情</el-button>
                <el-button type="text" icon="el-icon-delete" slot="reference" @click="deleteClient(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align='center'
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[2,5,7,10]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="clientList.length">
          </el-pagination>
        </el-row>
      </el-col><el-dialog
  title="详情"
  :visible.sync="dialogVisible"
  width="30%">
  <div style="font-size: 20px">ip: {{this.ip}}</div><br>
  <div style="font-size: 20px">port: {{this.nodePort}}</div>
</el-dialog>
    </div>
    
</template>

<script>

import axios from "axios";
import AddDockerButton from "@/components/AddDockerButton";

export default {
  name: "administrator_all_client",
  components: {AddDockerButton},
  data(){
    return {
      search:'',
      drawer: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 7, // 每页的数据条数
      direction: 'rtl',
      clientList: [],
      ip: '10.251.255.167',
      nodePort: '',
      dialogVisible: false,
    }
  },
  created() {
    this.handleSearch();
  },
  methods:{
    deleteClient(client){
      let formData = new FormData();
      formData.append("name",client.name);
      formData.append("namespace",client.namespace);
      console.log(client.name + client.namespace)
      axios.post(`${this.$baseUrl}deployment/delete_deployment/`, formData)
        .then(response => {
          this.$message.success('删除成功')
          this.handleSearch()
        })
    },
    Message_notification(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    toclient(client){
      for(var i=0; i<this.clientList.length; i++){
        if(this.clientList[i].name === client.name){
          this.nodePort = this.clientList[i].nodePort
          break
        }
      }
      this.dialogVisible = true
    },
    tickoff(client){
      let formData = new FormData()
      formData.append('name', client.name)
      axios.post(`${this.$baseUrl}deployment/run_deployment/`, formData)
        .then(response => {
          if (response.data) {
            console.log(response.data);
            this.$message.success('启动成功')
          }
        })  
    },
    stop(client){
      let formData = new FormData()
      formData.append('name', client.name)
      axios.post(`${this.$baseUrl}deployment/stop_deployment/`, formData)
        .then(response => {
          if (response.data) {
            console.log(response.data);
            this.$message.success('停止成功')
          }
        })  
    },
    handleSearch(){
      console.log(this.search);
      let _this = this;
      console.log("search!");
      let formData = new FormData();
      formData.append("search",this.search);
      axios.post(`${this.$baseUrl}deployment/list_deployments/`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              _this.clientList=response.data;
            }
          })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  watch:{
    search:{
      immediate:true,
          handler: function (newVal){
        if(newVal === ''){
          // this.handleSearch();
        }
      }
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.shadow{
  box-shadow:
      0px 0px 11.5px -45px rgba(0, 0, 0, 0.04),
      0px 0px 23.4px -45px rgba(0, 0, 0, 0.052),
      0px 0px 39.8px -45px rgba(0, 0, 0, 0.058),
      0px 0px 70.4px -45px rgba(0, 0, 0, 0.062),
      0px 0px 146.6px -45px rgba(0, 0, 0, 0.066),
      0px 0px 500px -45px rgba(0, 0, 0, 0.07);
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
