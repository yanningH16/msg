<template>
  <div class="wrap">
    <div class="box">
      <div class="total">
          <div class="header">
          <img src="../../assets/images/fly.png" alt="">
          <span>本月已发短信数</span>
          </div>
          <p class="numbers"><span class="number">{{this.sendCount}}</span>条</p>
      </div>
      <div class="sucess">
          <div class="header" style="background:rgba(245,166,35,1)">
          <img src="../../assets/images/sucess.png" alt="">
          <span>本月已成功发送短信数</span>
          </div>
          <p class="numbers"><span class="number">{{this.successCount}}</span>条</p>
      </div>
      <div class="yue">
          <div class="header" style="background:rgba(255,51,65,1)">
          <img src="../../assets/images/yue.png" alt="">
          <span>账户余额</span>
          </div>
          <p class="numbers"><span class="number">{{this.balance}}</span>元</p>
           <p class="warning">余额预警:  ¥<span>{{this.alarmValue===this.alarmValue?this.alarmValue:'--'}}</span><em class="change" @click="warnin=true">修改</em></p>
      </div>
      <div class="right">
        <div class="right_top">
          <p>
          短信模板: <span>{{this.templateCount}}</span><em>(可用)</em><i @click="demo(1,pageSize)">查看></i>
          </p>
          </div>
        <div class="right_bottom" style="margin-top:20px">
          <p>
          短信签名: <span>{{this.signCount}}</span><em>(可用)</em><i @click="qian(1,pageSize)">查看></i>
          </p>
          </div>
      </div>
    </div>
    <!-- 打开嵌套的表格 短信模板列表-->
    <div>
    <el-dialog title="短信模板列表" :visible.sync="dialogTableVisible" :modal-append-to-body=false>
  <el-table :data="gridData">
    <el-table-column property="date" label="模板code" width="150"></el-table-column>
    <el-table-column property="name" label="模板名称" width="200"></el-table-column>
    <el-table-column property="address" label="模板类型"></el-table-column>
  </el-table>
  <div style="text-align:right;padding:20px">
 <el-pagination
      @size-change="handleSizeChange_1"
      @current-change="handleCurrentChange_1"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals">
    </el-pagination>
    </div>
</el-dialog>
</div>
<!--打开嵌套的表格 签名模板列表  -->
<div>
  <el-dialog title="签名列表" :visible.sync="dialogTable" :modal-append-to-body=false>
  <el-table :data="grid">
    <el-table-column property="dates" label="签名名称" width="150"></el-table-column>
    <el-table-column property="names" label="签名类型" width="200"></el-table-column>
  </el-table>
  <div style="text-align:right;padding:20px">
 <el-pagination
      @size-change="handleSizeChange_2"
      @current-change="handleCurrentChange_2"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalss">
    </el-pagination>
    </div>
</el-dialog>
</div>
    <!-- 第二部分 -->
    <div class="delite">
      <div class="header">
      <span>短信类型</span>
      <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <div class="block">
    <span class="demonstration">活动时间</span>
    <el-date-picker
      v-model="value8"
      type="date"
      placeholder="选择日期"
      default-value="2010-10-01">
    </el-date-picker>
  </div>
   <el-button type="primary" style="margin-left:48px">查询</el-button>
    <el-button style="margin-left:30">下载失败日志</el-button>
</div>
    <!-- 图表部分 -->
     <!-- <div id="app">
        <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="data"
            :options="options"
        ></schart>
    </div> -->
    </div>
    <!-- 第三部分 月账单 -->
    <div class="bills">
      <h2>月账单</h2>
      <div class="line">
      <div class="block">
  <span class="demonstration">月账单查询:</span>
  <el-date-picker
    v-model="value4"
    type="month"
    value-format="yyyy-MM"
    placeholder="选择月">
  </el-date-picker>
  <el-button type="primary" icon="el-icon-search" style="margin-left:-8px" @click="search(1,pageSize, value4)"></el-button>
  <el-button style="margin-left:30px">下载账单</el-button>
</div>
<!-- 表头说明 -->
<div class="conten">
当月短信: <span class="red">{{this.totalCount}}</span>条 <span class="dang">当月费用: <i>0.033</i>元/条*<em>{{this.totalCount}}</em>-<i>0.001</i>元/条* <em>23</em>(优惠费用)=<i class="red">{{this.totalPrice}}</i>元</span>
</div>
<!-- 表格部分 -->
<div class="table">
<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column style="margin-left:10px"
      prop="date"
      label="消费时间" align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="计费类型" align="center">
    </el-table-column>
    <!-- <el-table-column
      prop="address"
      label="订单类型" align="center">
    </el-table-column> -->
    <el-table-column
      prop="payNum"
      label="消费金额" align="center">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="订单状态" align="center">
    </el-table-column>
    <el-table-column
      prop="totles"
      label="累计用量(条)" align="center">
    </el-table-column>
  </el-table>
  </div>
  <div style="text-align:right;padding:20px">
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</div>
    </div>
<!-- 余额预警值得弹框 -->
<div class="warnin">
<el-dialog title="修改提醒值" :visible.sync="warnin" :modal-append-to-body=false>
  <el-form :model="form">
    <el-form-item label="余额提醒值" :label-width="formLabelWidth">
      <el-input v-model="formName" auto-complete="off"></el-input>
    </el-form-item>
    <p style="margin-left:20%">当账户余额低于提醒值时,您会收到提醒短信.</p>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="warnin = false">取 消</el-button>
    <el-button type="primary" @click="warninSur">确 定</el-button>
  </div>
</el-dialog>

</div>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'coinApply',
  data () {
    return {
      formName: '',
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
      formLabelWidth: '120px',
      warnin: false,
      totalCount: '',
      totalDiscount: '',
      totalFee: '',
      totalPrice: '',
      totalSaleNum: '',
      currentPage4: 5,
      total: 0,
      totalss: 0,
      totals: 0,
      pageSize: 5,
      // pageNo: 1,
      // month: '',
      balance: '',
      sendCount: '',
      signCount: '',
      successCount: '',
      templateCount: '',
      alarmValue: '',
      value8: '',
      value4: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [],
      dialogTableVisible: false,
      dialogTable: false,
      gridData: [],
      grid: []
    }
  },
  created () {
    this.$ajax.post('/api/homepage/getAccountCurrentInfo', {
      userId: JSON.parse(sessionStorage.getItem('user')).userId,
      month: this.getNowFormatDate()
    }).then((data) => {
      console.log(data)
      let res = data.data.data
      if (data.data.code === '200') {
        this.balance = res.balance
        this.sendCount = res.sendCount
        this.signCount = res.signCount
        this.successCount = res.successCount
        this.templateCount = res.templateCount
        this.alarmValue = res.alarmValue
      } else {
        this.$message({
          message: data.data.message,
          type: 'warning'
        })
      }
    }).catch((error) => {
      console.log(error)
      this.$message.error('服务器错误！')
    })
    this.listNum()
  },
  methods: {
    demo (pageNo, pageSize) {
      this.dialogTableVisible = true
      this.$ajax.post('/api/homepage/getTemplateList', {
        pageNo: pageNo,
        pageSize: pageSize,
        userId: JSON.parse(sessionStorage.getItem('user')).userId
      }).then((data) => {
        console.log(data)
        let res = data.data.data
        if (data.data.code === '200') {
          this.totals = res.total
          let arr = []
          for (let word of res.datas) {
            let goods = {
              date: word.code,
              name: word.name,
              address: word.status === 1 ? '通知' : word.status === 2 ? '验证码' : '推广'
            }
            arr.push(goods)
          }
          this.gridData = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    qian (pageNo, pageSize) {
      this.dialogTable = true
      this.$ajax.post('/api/homepage/getSignList', {
        pageNo: pageNo,
        pageSize: pageSize,
        userId: JSON.parse(sessionStorage.getItem('user')).userId
      }).then((data) => {
        console.log(data)
        let res = data.data.data
        if (data.data.code === '200') {
          this.totalss = res.total
          let arr = []
          for (let word of res.datas) {
            let goods = {
              dates: word.sign,
              names: word.status === 1 ? '通知' : word.status === 2 ? '验证码' : '推广'
            }
            arr.push(goods)
          }
          this.grid = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    handleSizeChange_1 (val) {
      this.demo(1, val)
    },
    handleCurrentChange_1 (val) {
      this.demo(val, this.pageSize)
    },
    handleSizeChange_2 (val) {
      this.qian(1, val)
    },
    handleCurrentChange_2 (val) {
      this.qian(val, this.pageSize)
    },
    handleSizeChange (val) {
      this.search(1, val, this.value4)
    },
    handleCurrentChange (val) {
      this.search(val, this.pageSize, this.value4)
    },
    getNowFormatDate () {
      let date = new Date()
      let seperator1 = ''
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      // let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      // if (strDate >= 0 && strDate <= 9) {
      //   strDate = "0" + strDate;
      // }
      this.value1 = year + seperator1 + month
      return this.value1
    },
    // 列表展示
    search (pageNo, pageSize, value4) {
      if (this.value4 === '') {
        this.$message({
          message: '时间不能为空',
          type: 'warning'
        })
      } else {
        this.$ajax.post('/api/homepage/getMonthBillByMonth', {
          pageNo: pageNo,
          pageSize: pageSize,
          userId: JSON.parse(sessionStorage.getItem('user')).userId,
          month: this.value4
        }).then((data) => {
          console.log(data)
          let res = data.data.data
          if (data.data.code === '200') {
            this.total = res.totalCount
            let arr = []
            for (let word of res.datas) {
              let goods = {
                date: word.time,
                name: word.feetype === '1' ? '充值' : word.feetype === 2 ? '扣费' : '优惠',
                payNum: word.fee,
                tag: word.status === '1' ? '已结算' : '未结算',
                totles: word.count
              }
              arr.push(goods)
            }
            this.tableData = arr
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
    },
    // 列表的上方数量
    listNum () {
      this.$ajax.post('/api/homepage/getCountMonthByMonth', {
        userId: JSON.parse(sessionStorage.getItem('user')).userId,
        month: this.getNowFormatDate()
      }).then((data) => {
        console.log(data)
        let res = data.data.data
        if (data.data.code === '200') {
          this.totalCount = res.totalCount
          this.totalDiscount = res.totalDiscount
          this.totalFee = res.totalFee
          this.totalPrice = res.totalPrice
          this.totalSaleNum = res.totalSaleNum
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error('服务器错误！')
      })
    },
    warninSur () {
      this.$ajax.post('/api/homepage/setAlarmMoney', {
        userId: JSON.parse(sessionStorage.getItem('user')).userId,
        amount: this.formName
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.warnin = false
          location.reload()
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
.wrap
  background rgba(248, 248, 248, 1)
  .box
    display flex
    justify-content space-between
    margin-left 20px
    margin-top 19px
    .total, .sucess, .yue, .right
      width 25%
      height 140px
      background rgba(255, 255, 255, 1)
      border 1px solid white
      margin-right 22px
    .total .header, .sucess .header, .yue .header
      width 100%
      height 36px
      background rgba(64, 182, 255, 1)
      img
        margin-left 35px
        margin-top 12px
        display inline-block
      span
        margin-left 16px
        margin-top 13px
        display inline-block
        color rgba(255, 255, 255, 1)
        font-size 16px
        vertical-align top
    .total .numbers, .sucess .numbers, .yue .numbers
      text-align center
      line-height 104px
      color rgba(102, 102, 102, 1)
      .number
        font-size 34px
        color rgba(51, 51, 51, 1)
        margin-right 18px
    .yue .warning
      margin-top -25px
      margin-left 30%
      font-size 12px
      color rgba(102, 102, 102, 1)
      .change
        margin-left 21px
        color rgba(64, 182, 255, 1)
        cursor pointer
    .right
      background rgba(248, 248, 248, 1)
      border 1px solid rgba(248, 248, 248, 1)
      .right_top, .right_bottom
        width 100%
        height 60px
        background rgba(255, 255, 255, 1)
        border 1px solid #CCCCCC
        p
          text-align center
          line-height 60px
          font-size 14px
          color rgba(38, 38, 38, 1)
          span
            font-size 18px
            color rgba(251, 32, 58, 1)
            margin-left 10px
          em
            color rgba(83, 83, 83, 1)
            margin-left 8px
          i
            color rgba(51, 119, 255, 1)
            margin-left 15px
            cursor pointer
  .delite
    background rgba(255, 255, 255, 1)
    margin 20px
    // height 1000px
    .header
      margin 20px
      padding-top 20px
      span
        font-size 14px
        color rgba(94, 109, 130, 1)
        margin-right 12px
      .block
        display inline
        margin-left 48px
  .bills
    background rgba(255, 255, 255, 1)
    margin 20px
    height 1000px
    h2
      color rgba(51, 51, 51, 1)
      font-size 20px
      padding-top 30px
      margin-left 48px
    .line
      border-top 1px solid gray
      margin 20px
      .block
        margin-top 22px
        margin-right 0
        .demonstration
          font-size 14px
          color rgba(51, 51, 51, 1)
      .conten
        margin-top 16px
        font-size 12px
        color rgba(51, 51, 51, 1)
        letter-spacing 1px
        .red
          font-size 20px
          color rgba(251, 32, 58, 1)
        .dang
          margin-left 24.5px
      .table
        border 1px solid rgba(229, 229, 229, 1)
        margin-top 15px
        text-align center
        .el-table th>.cell
          margin-left 63px
      .listPager
        text-align right
        padding 20px
</style>