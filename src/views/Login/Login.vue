<template>
  <div class="page">
    <vue-particles
      color="#409EFF"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#409EFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="pane">
      <h2 class="title">
        <i class="el-icon-data-analysis" style="color: #505458"></i>IOT管理系统
      </h2>
      <el-tabs type="border-card">
        <el-tab-pane label="账号登录">
          <el-form :model="form">
            <el-form-item label="账号">
              <el-input
                v-model="form.username"
                placeholder="请输入账号名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <div class="">
                <el-checkbox v-model="checked" style="color: dodgerblue"
                  >自动登录</el-checkbox
                >
                <span
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
                <el-link type="primary" href="https://org.modao.cc/"
                  >忘记密码？</el-link
                >
              </div>
              &nbsp;&nbsp;
              <el-button type="primary" @click="login" class="submit_btn"
                >登录</el-button
              >
              <div>
                <el-link type="primary" href="https://org.modao.cc/"
                  >其它登录方式</el-link
                >
                <span
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
                <el-link type="primary" href="https://org.modao.cc/"
                  >注册账户</el-link
                >
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="短信快捷登录">
          <el-form :model="form">
            <el-form-item label="手机号">
              <el-input
                v-model="form.username"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input placeholder="请输入验证码"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="login" class="submit_btn"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>



<script>
export default {
  data () {
    return {
      check: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post('api/permission/getMenu', this.form).then(res => {
        res = res.data
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'sensor' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 80%;
  margin: auto;
  padding: 45px;
  height: 350px;
  background-color: #fff;
  // color: dodgerblue;
}
.submit_btn {
  width: 80%;
  font-size: 16px;
  align: center;
}
.pane {
  width: 40%;
  height: 40%;
  position: absolute;
  top: 100px;
  left: 400px;
  // background-color: cyan;
}
.title {
  font-size: 24px;
  margin: 0 auto;
  width: 200px;
  left: 50px;
}
// .page {
//   background-color: cyan;
// }
</style>
