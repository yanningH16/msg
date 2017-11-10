<template>
  <div class="wrap">
    <div class="delite">
      <div class="header">
        <label class="number">接受号码</label><input type="number" placeholder="填写手机号" class="input" v-model="phone">
      <span class="type">短信类型</span>
      <el-select v-model="type" placeholder="请选择">
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
      v-model="time"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd HH:mm:ss">
    </el-date-picker>
  </div>
   <el-button type="primary" style="margin-left:48px" @click="dataNum(1,pageSize,type, phone, time)">查询</el-button>
</div>
<!-- 表格部分 -->
<div class="table">
<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column style="margin-left:10px"
      prop="date"
      label="接受号码" align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="短信类型" align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="内容" align="center">
    </el-table-column>
    <el-table-column
      prop="payNum"
      label="日期" align="center">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="状态" align="center">
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
</template>
<script type="text/ecmascript-6">
// import { pageCommon } from '../../assets/js/mixin'
export default {
  name: 'coinList',
  // mixins: [pageCommon],
  data () {
    return {
      currentPage4: 5,
      pageSize: 5,
      type: '4',
      phone: '',
      input: '',
      time: '',
      total: 0,
      options: [{
        value: '1',
        label: '通知'
      }, {
        value: '2',
        label: '验证码'
      }, {
        value: '3',
        label: '推广'
      }, {
        value: '4',
        label: '全部'
      }],
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.dataNum(1, val, this.type, this.phone, this.time)
    },
    handleCurrentChange (val) {
      this.dataNum(val, this.pageSize, this.type, this.phone, this.time)
    },
    dataNum (pageNo, pageSize, type, phone, time) {
      if (this.phone === '' || this.time === '') {
        this.$message({
          message: '手机号或时间不能为空',
          type: 'warning'
        })
      } else {
        this.$ajax.post('/api/homepage/getByPhoneTypeTime', {
          pageNo: pageNo,
          pageSize: pageSize,
          type: this.type,
          phone: this.phone,
          userId: JSON.parse(sessionStorage.getItem('user')).userId,
          time: this.time
        }).then(data => {
          console.log(data)
          let res = data.data.data
          if (data.data.code === '200') {
            this.total = res.total
            let arr = []
            for (let word of res.datas) {
              let goods = {
                date: word.telephone,
                name: word.type === 1 ? '通知' : word.type === 2 ? '验证码' : word.type === 3 ? '推广' : '全部',
                address: word.content,
                payNum: word.sendTime,
                tag: word.status === 1 ? '正常' : '未知'
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
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  background rgba(248, 248, 248, 1)
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
      .input
        width 150px
        height 40px
        border-radius 4px
        border 1px solid #d8dce5
        color #5a5e66
        outline 0
        padding 0 15px
        font-size inherit
      .number
        margin-right 12px
        font-size 14px
        color rgba(94, 109, 130, 1)
      .type
        margin-left 48px
    .listPager
      text-align right
      padding 20px
</style>