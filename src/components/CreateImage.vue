<template>
  <div>
  <div class="register">
    <div style="margin: 50px;">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="创建类型" prop="create_type" required show-message>
        <el-select v-model="form.create_type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="(form.create_type === 1)" prop="image_type" label="镜像类型" required>
        <el-select v-model="form.image_type" placeholder="请选择镜像类型">
          <el-option label="Nginx" value="nginx"></el-option>
          <el-option label="MySQL" value="mysql"></el-option>
          <el-option label="Redis" value="redis"></el-option>
          <el-option label="WordPress" value="wordpress"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="(form.create_type === 2)" label="Dockerfile文件" required>
        <input type="file" @change="handleFileUpload">
      </el-form-item>
      <el-form-item v-if="(form.create_type === 3)" label="仓库地址" prop="repo" required>
        <el-input v-model="form.repo"></el-input>
      </el-form-item>
      
      <el-form-item label="Tag" prop="tag" required>
        <el-input v-model="form.tag"></el-input>
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
  name: "createUserView",
  data() {
    return {
      selectedFile: '',
      form: {
        create_type: '',
        image_type: '',
        repo: '',
        tag: '',
      },
      options: [{
        value: 1,
        label: '从库创建'
      }, {
        value: 2,
        label: '上传Dockerfile'
      }],
      rules:{
        create_type: [
          { required: true, message: '请选择创建类型', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        tag: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      let _this = this;
      console.log(this.form);
      console.log(this.selectedFile)
      let formData = new FormData();
      if (this.form.create_type === 1){
        formData.append('name', this.form.image_type)
        formData.append('tags', this.form.tag)
        axios.post(`${this.$baseUrl}image/pull_image/`, formData)
      }else if (this.form.create_type === 2){
        formData.append('dockerfile', this.selectedFile)
        formData.append('tags', this.form.tag)        
        axios.post(`${this.$baseUrl}image/build_image/`, formData)
      }else if (this.form.create_type === 3){
        formData.append('repository', this.form.repo)
        formData.append('tags', this.form.tag)        
        axios.post(`${this.$baseUrl}image/pull_image_repository/`, formData)
      }
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
