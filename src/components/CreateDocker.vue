<template>
  <div>
  <div class="register">
    <div style="margin: 50px;">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="镜像" prop="image" required show-message>
        <el-select v-model="form.image" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="容器端口" prop="port" required>
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="环境变量" prop="path">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "createDockerView",
  data() {
    return {
      selectedFile: '',
      form: {
        image: '',
        port: '',
        name: '',
        path: ''
      },
      options: [],
      rules:{
        port: [
          { required: true, message: '请选择创建类型', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        image: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this.handleSearch();
  },
  methods: {
    onSubmit() {
      let _this = this;
      let formData = new FormData();
      formData.append('name', this.form.name)
      formData.append('image', this.form.image)
      formData.append('container_port', this.form.port)
      formData.append('environment', '[]')
      axios.post(`${this.$baseUrl}deployment/create_deployment/`, formData)
      this.$message.success('正在创建，请稍候...')
      setTimeout( function() {
          _this.$router.go(-1);
      }, 500 );
    },
    cancel(){
      this.$router.go(-1);
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    handleSearch(){
      let formData = new FormData();
      formData.append("search", '');
      formData.append("user_id", localStorage.getItem('user_id'));
      axios.post(`${this.$baseUrl}image/list_images/`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              let clientList = response.data;
              this.options = []
              for (var i=0; i<clientList.length; i++){
                this.options[i] = {
                  'label': clientList[i].names + ':' + clientList[i].tag,
                  'value': clientList[i].names + ':' + clientList[i].tag
                }
              }
            }
          })
    },
  }
}
</script>

<style scoped>

.register{
  border: #2c3e5062 groove 0.5px;
  text-align: center;
  background-color: rgba(250, 249, 248, 0.137);
  border-radius: 20px;
  width: 600px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
