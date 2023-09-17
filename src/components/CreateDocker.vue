<template>
  <div>
  <div class="register">
    <div style="margin: 50px;">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username" required show-message>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNo" required>
        <el-input v-model="form.phoneNo"></el-input>
      </el-form-item >
      <el-form-item label="邮箱" prop="email" required>
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password1" required>
        <el-input type="password" v-model="form.password1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2" required>
        <el-input type="password" v-model="form.password2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="type" required>
        <el-radio-group v-model="form.type">
          <el-radio label="客户"></el-radio>
          <el-radio label="工作人员"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="(form.type === '工作人员')" prop="repair_type" label="工作类型" required>
        <el-select v-model="form.repair_type" placeholder="请选择工作人员类型">
          <el-option label="维修人员（水）" value="维修人员（水）"></el-option>
          <el-option label="维修人员（电）" value="维修人员（电）"></el-option>
          <el-option label="维修人员（机械）" value="维修人员（机械）"></el-option>
          <el-option label="清洁工" value="清洁工"></el-option>
          <el-option label="安保人员" value="安保人员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="(form.type === '客户')" label="法人名称" prop="legal_person" required>
        <el-input v-model="form.legal_person"></el-input>
      </el-form-item>
      <el-form-item v-if="(form.type === '客户')" label="公司名称" prop="company_name" required>
        <el-input v-model="form.company_name"></el-input>
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
      is_reload:0,
      form: {
        username:'',
        name: '',
        phoneNo:'',
        type: '客户',
        legal_person:'',
        company_name:'',
        repair_type:'',
        password1:'',
        password2:'',
        email:'',
        identity:''
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phoneNo: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        repair_type: [
          { required: true, message: '请选择工作类型', trigger: 'blur' }
        ],
        legal_person: [
          { required: true, message: '请输入法人名称', trigger: 'blur' }
        ],
        company_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      let _this = this;
      console.log(this.form);
      console.log('submit!');
      let formData = new FormData();
      if(this.form.type === "客户")
        formData.append("identity","user");
      else if (this.form.type === "管理员")
        formData.append("identity","admin");
      else if (this.form.type === "工作人员")
        formData.append("identity","worker");
      formData.append("username",this.form.username);
      formData.append("password_1",this.form.password1);
      formData.append("password_2",this.form.password2);
      formData.append("email",this.form.email);
      formData.append("contact_person",this.form.name);
      formData.append("contact_phone",this.form.phoneNo);
      formData.append("job_category",this.form.repair_type);
      formData.append("legal_name",this.form.legal_person);
      formData.append("company_name",this.form.company_name);
      if(this.form.username === ''){
          this.$message.error('请输入用户名');  return;
      } else if(this.form.name === ''){
          this.$message.error('请输入姓名');   return;
      } else if(this.form.phoneNo === ''){
        this.$message.error('请输入电话号码');   return;
      } else if(this.form.email === ''){
        this.$message.error('请输入邮箱');   return;
      } else if(this.form.password1 === ''){
        this.$message.error('请输入密码');   return;
      } else if(this.form.password2 === '' || this.form.password2 !== this.form.password1){
        this.$message.error('请正确输入确认密码');   return;
      } else if(this.form.type === "客户" && this.form.legal_person === ''){
        this.$message.error('请输入法人名称');   return;
      } else if(this.form.type === "客户" && this.form.company_name === ''){
        this.$message.error('请输入公司名称');   return;
      } else if(this.form.type === "工作人员" && this.form.repair_type === ''){
        this.$message.error('请选择工作类型');   return;
      }


      axios.post(`${this.$baseUrl}user/register`, formData)
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
    reload(){
      this.$router.push('/repair');
    }
  }
}
</script>

<style scoped>
.register{
  box-shadow:
      0.3px 2.3px 8.6px -15px rgba(0, 0, 0, 0.041),
      0.6px 5.2px 17.2px -15px rgba(0, 0, 0, 0.053),
      1px 8.8px 26.9px -15px rgba(0, 0, 0, 0.058),
      1.7px 14.7px 39.8px -15px rgba(0, 0, 0, 0.062),
      3.4px 28.9px 60.4px -15px rgba(0, 0, 0, 0.065),
      4.2px 36.3px 98.7px -15px rgba(0, 0, 0, 0.067),
      4.7px 40.2px 184.4px -15px rgba(0, 0, 0, 0.068),
      5px 43px 500px -15px rgba(0, 0, 0, 0.07);
  border: #2c3e50 groove 0.5px;
  text-align: center;
  background-color: rgba(250, 249, 248, 0.4);
  border-radius: 20px;
  width: 600px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s,transform .25s,filter .25s;
  backface-visibility: hidden;
}
</style>
