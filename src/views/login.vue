<template>
  <div class="login_wrapper">
    <div class="login">
      <el-form :model="formLogin">
        <el-form-item>
          <h2 class="title">后台管理系统</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登 陆</el-button>
          <span v-show="this.errorInfo.isShowError" class="error">
            {{ this.errorInfo.text }}
          </span>
        </el-form-item>
      </el-form>
    </div>
    <!-- <p class="bei">京ICP备18050367号-1</p> -->
    <img ref="img" src='@/static/img/loginbg.webp' alt="">
  </div>
</template>

<script>
import apis from "@/apis/apis";
export default {
  name: "login",
  data() {
    return {
      formLogin: {
        //表单对象
        loginName: "admin",
        password: "123456",
      },
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false, //显示错误提示
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.img.src = "../static/img/loginbg.png";
    }, 1000);

    sessionStorage.setItem("token", "");
    // 回车点击回调
    document.onkeydown = (event) => {
      const e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13 && this.$route.path == "/login") {
        // enter 键
        this.login();
      }
    };
  },
  methods: {
    //调用后端登陆接口
    async login() {
      try {
        let res = await apis.shiroApi.loginIn(this.formLogin);
        res = res.data;
        console.log("success:登陆成功", res);
        if (res.code == 0) {
          // 存入 token
          sessionStorage.setItem("token", res.data.tokenHead + res.data.token);
          // 获取菜单等
          const menu = await apis.shiroApi.loginMenu();
          console.log("menu:成功", menu);
          if (menu.data.code == 0) {
            let json = menu.data.data;
            this.$router.replace({ path: "/index" });
            // 存入权限,渲染按钮
            this.$store.dispatch("add_buttons", json);
            // 存入菜单,渲染菜单
            this.$store.dispatch("add_Menus", json);
            sessionStorage.setItem("username", this.formLogin.loginName);
            //  sessionStorage.setItem("lev", json.sysRoleVoList);
          }
        }
      } catch (err) {
        console.log("error:失败", err);
        this.errorInfo.isShowError = true;
        this.errorInfo.text = "系统接口异常";
      }
    },
  },
};
</script>

<style lang="scss">
$input_width: 300px;

.login_wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-image: url("~@/static/img/loginbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login {
    position: absolute;
    right: 15%;
    top: 30%;
    width: 460px;
    height: 40%;
    // margin-top: -150px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      text-align: center;
      color: #ffffff;
    }
    .el-form-item__content {
      width: $input_width;
    }
    .el-button {
      width: $input_width;
    }
    .el-form {
      // margin: 30px 80px auto 80px;
      .error {
        display: block;
        text-align: center;
        color: red;
      }
    }
  }
}
.recover {
  position: absolute;
  bottom: 0px;
  cursor: pointer;
  color: #e6a23c;
  // display: none;
}
.bei {
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  color: #505458;
}
</style>
