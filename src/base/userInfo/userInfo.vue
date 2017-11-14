<template>
  <div class="userInfo">
    <div class="nav">
    </div>
    <div class="info">
      <img :src="user.imgUrl" class="img">
      <span class="text">{{text}}</span>
    </div>
    <div class="logout">
      <el-dropdown trigger="click" size="small" @command="logoStatus">
        <span class="el-dropdown-link" style="color:#ffffff">
          <span class="el-icon-caret-bottom"></span>
        </span>
        <el-dropdown-menu slot="dropdown" style="text-align:center">
          <el-dropdown-item command="1" @click="loginpass">修改登录密码</el-dropdown-item>
          <el-dropdown-item command="2" @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal-append-to-body=false>
        <el-form :model="form">
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="name" auto-complete="off" placeholder="请输入原密码" type='password'></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="newpass" auto-complete="off" placeholder="请输入新密码" type='password'></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="agpass" auto-complete="off" placeholder="请再次输入新密码" type='password'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'md5'
// import { mapGetters } from "vuex"
export default {
  name: 'userInfo',
  data () {
    return {
      activeIndex2: '1',
      dialogFormVisible: false,
      agpass: '',
      newpass: '',
      name: '',
      text: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    user () {
      return {
        // phone: this.userInfo.userName || this.userInfo.telephone,
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510127020787&di=7ea47f534e3e80cb465a5e45650c433d&imgtype=0&src=http%3A%2F%2Fimg21.mtime.cn%2Fpi%2F2011%2F01%2F26%2F143007.59370061.jpg'
      }
    }
  },
  created () {
    this.text = JSON.parse(sessionStorage.getItem('user')).telephone
  },
  methods: {
    logoStatus (index) {
      if (parseInt(index) === 1) {
        this.loginpass()
      } else if (parseInt(index) === 2) {
        this.logout()
      }
    },
    logout () {
      this.$confirm('是否退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'login' })
      }).catch(() => {
        // this.$message.error('服务器错误！')
      })
    },
    loginpass () {
      this.dialogFormVisible = true
    },
    sure () {
      if (this.newpass !== this.agpass) {
        this.$message({
          message: '两次密码不一致,请重新输入',
          type: 'warning'
        })
        return false
      }

      if (!(/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,16}$/.test(this.newpass)) || !(/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,16}$/.test(this.agpass))) {
        this.$message({
          message: '密码长度为6到16位数字或字母',
          type: 'warning'
        })
        return false
      }
      if (this.newpass === '' || this.agpass === '') {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/user/changePwd', {
        telephone: JSON.parse(sessionStorage.getItem('user')).telephone,
        oldPwd: md5(this.name),
        newPwd: md5(this.newpass),
        repeatPwd: md5(this.agpass)
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.message,
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.userInfo
  flex 0 0 $normal-height
  background $bg-small
  color $color-text-white
  text-align right
  font-size 0
  border-bottom 1px solid #dedede
  height 50px
  .reportButton, .nav
    display inline-block
  .info
    display inline-block
    height $normal-height
    line-height $normal-height
    cursor pointer
    .img
      width 30px
      height 30px
      vertical-align top
      margin 15px 0
      border-radius 50%
      margin-right 10px
    .text
      font-size $font-size-normal
  .logout
    display inline-block
    height $normal-height
    line-height $normal-height
    font-size $font-size-big
    padding 0 20px
    cursor pointer
    margin-top 10px
  .el-dialog__title
    float left
</style>
<style>
.el-dialog__title {
  float: left;
}
.el-popper[x-placement^=bottom]{
  margin-top: -5px
}
</style>

