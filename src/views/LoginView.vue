<template>
  <div class="background-image">
    <el-row class="login__wrapper">
      <el-col :span="24" class="SystemTitle">PaaS云管理平台</el-col>
      <el-col :span="24">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              type="password" 
              v-model="loginForm.password" 
              @keyup.enter.native="submitForm('loginForm')" 
              show-passord/>
          </el-form-item>
          <el-form-item>
            <el-button 
            type="primary"
            @click="submitForm('loginForm')"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui';

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // Perform login action here
          const loginFormData = new FormData();
          loginFormData.append('username', this.loginForm.username);
          loginFormData.append('password', this.loginForm.password);

          this.$axios.post(`${this.$baseUrl}user/login/`, loginFormData)
          .then(response => {
            if (response.data.errno === 0) {
              // TODO: 跳转到主页面
              this.$message.success('登录成功')
              localStorage.setItem('user_id', response.data.user_id);
              localStorage.setItem('username', response.data.username);
              this.$router.replace('/image');
            } else {
              MessageBox.alert(response.data.msg, '提示', {
                confirmButtonText: '确定'
              });
            }
          })
        } else {
          MessageBox.alert('请检查输入的用户名和密码', '错误', {
            confirmButtonText: '确定'
          });
          return false;
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem('user_id')){
        this.$router.replace('/image');
    }
  }
};
</script>
<style scoped>
    .el-form {
        width: 50%;
        margin: 30px auto 0;
    }
    .login__wrapper {
      margin: 0 auto;
      margin-top: 10%;
      width: 38%;
      border-radius: 10px;
      min-height: 50px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.1);
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .SystemTitle {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      font-family: Arial, sans-serif;
      font-weight: 700;
    }
</style>
