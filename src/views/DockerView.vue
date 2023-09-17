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
            <AddUserButton></AddUserButton>
          </el-col>
        </el-row>
        <el-row>
          <el-table
              class="shadow"
              :data="clientList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :row-class-name="tableRowClassName">
            <el-table-column
                prop="docker_id"
                label="ID"
            >
            </el-table-column>
            <el-table-column
                prop="docker_name"
                label="名称"
                >
            </el-table-column>
            <el-table-column
                prop="image_label"
                label="镜像"
                >
            </el-table-column>
            <el-table-column
                prop="docker_port"
                label="端口号"
                >
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="tickoff(scope.row)">启动</el-button>
                &nbsp;
                <el-button type="text" icon="el-icon-edit" @click="stop(scope.row)">停止</el-button>
                &nbsp;
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
      </el-col>
    </div>
</template>

<script>

import axios from "axios";
import AddUserButton from "@/components/AddUserButton";

export default {
  name: "administrator_all_client",
  components: {AddUserButton},
  data(){
    return {
      search:'',
      drawer: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 7, // 每页的数据条数
      direction: 'rtl',
      clientList: [
          {
        identity: 1,
        user_id:'',
        company: '软过2',
        juridical_person: '一个常见的名字',
        name: '李华',
        phone: '13273329706',
      }, {
        user_id:'',
        company: '软过3',
        juridical_person: '一个常见的名字',
        name: '李华',
        phone: '13273329706',
      }, {
        user_id:'',
        company: '软过4',
        juridical_person: '一个常见的名字',
        name: '李华',
        phone: '13273329706',
      }, {
        user_id:'',
        company: '软过5',
        juridical_person: '一个常见的名字',
        name: '李华',
        phone: '13273329706',
      }
      ]

    }
  },
  created() {
    // this.getClient();
  },
  methods:{
    getClient(){
      //var i=0;
      let _this = this;
      this.clientList.length=0;
      axios.post(this.$baseUrl+'user/all_client').then(
        res => {
          _this.clientList= res.data.worker;
          /*for(i = 0; i<res.data.num; i++){
            this.clientList.push({
              user_id: res.data.clientList[i].user_id,
              company: res.data.clientList[i].company,
              juridical_person: res.data.clientList[i].juridical_person,
              name: res.data.clientList[i].name,
              phone: res.data.clientList[i].phone,
            })
          }*/
        }
      )
    },
    deleteClient(client){
      let formData = new FormData;
      console.log(client);
      formData.append("user_id", client.user_id);
      axios.post(this.$baseUrl+'user/delete_user',
          formData
      ).then(
          res =>{
            this.$message.success(res.data.msg);
            this.getClient();
          }
      )
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
      localStorage.setItem("client_company_name", client.company_name);
      localStorage.setItem("client_user_id", client.user_id);
      localStorage.setItem("client_legal_entity_name", client.legal_entity_name);
      localStorage.setItem("client_contact_person", client.contact_person);
      localStorage.setItem("client_contact_phone", client.contact_phone);
      //localStorage.setItem("client_company", client.identity);
      // this.$router.push('/clientdetail');
      let routeData = this.$router.resolve({ path: '/clientdetail'});
      window.open(routeData.href, '_blank');
    },
    modify_client(client){
      console.log(client)
    },
    handleSearch(){
      console.log(this.search);
      let _this = this;
      console.log("search!");
      let formData = new FormData();
      formData.append("contact_person",this.search);
      axios.post(`${this.$baseUrl}user/search_user`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              if(response.data.errno === 0)
              {
                if(this.search !== '')
                  _this.$message.success(response.data.msg);
                _this.clientList=response.data.worker;
                _this.currentPage = 1;
              }
              else{
                _this.$message.warning(response.data.msg);
                _this.clientList=[];
                _this.currentPage = 1;
              }
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
