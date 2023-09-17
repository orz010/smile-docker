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
          <el-option label="Nginx" value="Nginx"></el-option>
          <el-option label="MySQL" value="MySQL"></el-option>
          <el-option label="Redis" value="Redis"></el-option>
          <el-option label="WordPress" value="WordPress"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="(form.create_type === 2)" label="Dockerfile文件" required>
        <el-upload class="upload"
                 ref="upload"
                 action="string"
                 :limit=1
                 :file-list="dockerfileList"	
                 :auto-upload="false"	
                 :http-request="uploadFile"	
                 :on-change="handleChange"	
                 :on-preview="handlePreview"
                 :on-remove="handleRemove">	
        <el-button slot="trigger"
                   size="small"
                   type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="(form.create_type === 3)" label="镜像文件" required>
        <el-upload class="upload"
                 ref="upload"
                 action="string"
                 :limit=1
                 :file-list="imagefileList"
                 :auto-upload="false"
                 :http-request="uploadFile"		
                 :on-change="handleChange"	
                 :on-preview="handlePreview"	
                 :on-remove="handleRemove">	
        <el-button slot="trigger"
                   size="small"
                   type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="(form.create_type === 4)" label="仓库地址" prop="repo" required>
        <el-input v-model="form.repo"></el-input>
      </el-form-item>
      
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="form.name"></el-input>
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
      dockerfileList:[],
      imagefileList:[],
      is_reload:0,
      formData:{},
      form: {
        create_type: '',
        image_type: '',
        repo: '',
        name: '',
        tag: '',
      },
      options: [{
        value: 1,
        label: '从库创建'
      }, {
        value: 2,
        label: '上传Dockerfile'
      }, {
        value: 3,
        label: '上传镜像'
      }, {
        value: 4,
        label: '从公共仓库拉取'
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
      console.log(this.dockerfileList)
      console.log(this.imagefileList)
      let formData = new FormData();
      formData.append('create_type', this.form.create_type)
      if (this.create_type === 1){
        formData.append('image_type', this.form.image_type)
      }else if (this.create_type === 2){
        formData.append('Dockerfile', this.dockerfileList[0].raw)
      }else if (this.create_type === 3){
        formData.append('Imagefile', this.imagefileList[0].raw)
      }else if (this.create_type === 4){
        formData.append('repo', this.form.repo)
      }

      axios.post(`${this.$baseUrl}create_image`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              if(response.data.msg === '创建用户成功'){
                _this.$message.success(response.data.msg);
                _this.is_reload = 1;
              }
              else{
                _this.$message.warning(response.data.msg);
              }
            }

          })

      setTimeout( function() {
        if(_this.is_reload === 1)
          _this.$router.go(-1);
      }, 500 );

      //this.$router.go(-1);

    },
    cancel(){
      this.$router.go(-1);
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
      // console.log(this.fileList, "sb");
    },
    //自定义上传文件
    uploadFile (file) {
      this.formData.append("file", file.file);
      // console.log(file.file, "sb2");
    },
    //删除文件
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件
    handlePreview (file) {
      console.log(file);
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
