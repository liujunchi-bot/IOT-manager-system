<template>
  <div class="manage">
    <div class="manage-header">
      <div>
        <div>
          <el-row :gutter="20" justify>
            <el-col :span="8">
              <el-input
                placeholder="请输入处置人"
                prefix-icon="el-icon-search"
              ></el-input
            ></el-col>
            <el-col :span="8">
              <el-input
                placeholder="请输入报警id"
                prefix-icon="el-icon-search"
              ></el-input
            ></el-col>
          </el-row>
        </div>

        <!-- <sensor-form inline :formLabel="formLabel" :form="searchFrom"> -->

        <!-- </sensor-form> -->
      </div>
      <div>
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >

        <el-button type="danger">批量删除</el-button>
        <el-button type="info">导出</el-button>
      </div>
    </div>
    <warnlog-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></warnlog-table>
  </div>
</template>

<script>
import TerminalForm from '../../components/TerminalForm'
import WarnlogTable from '../../components/WarnlogTable'
export default {
  components: {
    TerminalForm,
    WarnlogTable
  },
  data () {
    return {
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'warn_id',
          label: '报警id',
        },
        {
          prop: 'warn_connect',
          label: '处置人',
        },
        {
          prop: 'warn_rule',
          label: '处置内容',
        },
        {
          prop: 'warn_do_time',
          label: '处置时间'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },

      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {

    getList (name = '') {
      this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : ''
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page,
            name,
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.categoryLabel = item.category === 0 ? '税审' : '年审'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    addUser () {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser (row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm () {
      if (this.operateType === 'edit') {
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/api/user/add', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      }
    },
    delUser (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = row.id
          this.$http
            .get('/api/user/del', {
              params: {
                id
              }
            })
            .then(res => {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
