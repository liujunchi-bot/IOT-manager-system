<template>
  <div class="manage">
    <div class="manage-header">
      <div>
        <el-dialog
          title="处理报警"
          :visible.sync="isShow"
          :before-close="handleclose"
        >
          <el-form :model="form" label-width="80px">
            <el-form-item label="处置内容">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入处置内容"
                v-model="form.detail"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="no">取消</el-button>
          <el-button type="primary" @click="ok">确定</el-button>
        </el-dialog>
        <div>
          <el-row :gutter="20" justify>
            <el-col :span="8">
              <el-input
                placeholder="请输入设备名称"
                prefix-icon="el-icon-search"
              ></el-input
            ></el-col>
            <el-col :span="8">
              <el-input
                placeholder="请输入设备编号"
                prefix-icon="el-icon-search"
              ></el-input
            ></el-col>
            <el-col :span="8">
              <el-select
                v-model="value"
                multiple
                clearable
                placeholder="按状态查询"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>

        <!-- <sensor-form inline :formLabel="formLabel" :form="searchFrom"> -->

        <!-- </sensor-form> -->
      </div>
      <div>
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
        <el-button type="primary" @click="dowith">处置</el-button>
        <el-button type="danger" @click="addUser">批量删除</el-button>

        <el-button type="info" @click="addUser">导出</el-button>
      </div>
    </div>
    <warnmsg-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></warnmsg-table>
  </div>
</template>

<script>
import TerminalForm from '../../components/TerminalForm'
import WarnmsgTable from '../../components/WarnmsgTable'
export default {
  components: {
    TerminalForm,
    WarnmsgTable
  },
  data () {
    return {
      form: {
        detail: ''
      },
      options: [{
        value: '选项1',
        label: '待处理'
      }, {
        value: '选项2',
        label: '已处理'
      }
      ],
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'warn_id',
          label: '报警id',
        },
        {
          prop: 'terminal_id',
          label: '设备id',
        },
        {
          prop: 'sensor_id',
          label: '传感器id',
        },
        {
          prop: 'terminal_type',
          label: '设备名称'
        },
        {
          prop: 'warn_name',
          label: '报警名称',
        },
        {
          prop: 'warn_geo',
          label: '报警地点'
        },
        {
          prop: 'normal_value',
          label: "正常值"
        },
        {
          prop: 'warn_value',
          label: '报警值'
        },

        {
          prop: 'warn_time',
          label: '报警时间',
        },
        {
          prop: 'warn_state',
          label: '状态'
        },
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
    ok () {
      this.$confirm("确认提交？")
      this.isShow = false
    },
    no () {
      this.isShow = false
    },
    dowith () {
      this.isShow = true
    },
    handleclose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
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
