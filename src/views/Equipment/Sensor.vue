<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增传感器' : '更新传感器信息'"
      :visible.sync="isShow"
    >
      <sensor-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        ref="form"
      ></sensor-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <div>
        <el-select v-model="value" clearable placeholder="按类别查询">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="value1" clearable placeholder="按生产商查询">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <sensor-form inline :formLabel="formLabel" :form="searchFrom">
          <el-button type="primary" @click="getList(searchFrom.keyword)"
            >搜索</el-button
          >
        </sensor-form>
      </div>
      <div>
        <el-button type="primary" @click="addUser">添加</el-button>
        <el-button type="primary" @click="addUser">删除</el-button>
        <el-button type="primary" @click="addUser">导出</el-button>
      </div>
    </div>
    <sensor-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></sensor-table>
  </div>
</template>

<script>
import SensorForm from '../../components/SensorForm'
import SensorTable from '../../components/SensorTable'
export default {
  components: {
    SensorForm,
    SensorTable
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '导轮测斜仪'
      }, {
        value: '选项2',
        label: '静力水准仪'
      }, {
        value: '选项3',
        label: '拉线位移计'
      }, {
        value: '选项4',
        label: '无线倾角仪'
      }, {
        value: '选项5',
        label: '激光测距仪'
      },
      {
        value: '选项6',
        label: '盒式测斜仪'
      },
      ],
      options1: [
        {
          value: '1',
          label: '中大检测'
        }, {
          value: '2',
          label: '武汉承拓'
        }, {
          value: '3',
          label: '上海盛迪'
        }, {
          value: '4',
          label: '济南博林'
        }, {
          value: '5',
          label: '上海直川'
        }
      ],
      value1: '',
      value: '',
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'type',
          label: '审计大类类型',
        },
        {
          prop: 'project_name',
          label: '项目名称'
        },
        {
          prop: 'client',
          label: '客户名称',
        },
        {
          prop: 'reportNo',
          label: '审计报告号'
        },
        {
          prop: 'project_type',
          label: '项目类型'
        },
        {
          prop: 'partner',
          label: '项目合伙人'
        },
        {
          prop: 'number',
          label: '项目编号',
        },
        {
          prop: 'quality_control',
          label: '质控负责人'
        },
        {
          prop: 'leader',
          label: '项目负责人',
        },
        {
          prop: 'group_members',
          label: '组员',
        },
        {
          prop: 'accountant',
          label: '签字注册会计师',
        },
        {
          prop: 'cost_engineer',
          label: '签字注册造价师',
        },
        {
          prop: 'tax_accountant',
          label: '签字税务师',
        },
        {
          prop: 'suggestion',
          label: '报告意见类型',
        },
        {
          prop: 'start_time',
          label: '执行起始时间',
        },
        {
          prop: 'finish_time',
          label: '执行结束时间',
        },
        {
          prop: 'organization',
          label: '施工单位',
        },
        {
          prop: 'total_assets',
          label: '资产总额',
        },
        {
          prop: 'check_money',
          label: '审核金额',
        },
        {
          prop: 'reduction_money',
          label: '审减金额',
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        type: '',
        project_name: '',
        client: '',
        reportNo: '',
        project_type: '',
        partner: '',
        number: '',
        quality_control: '',
        leader: '',
        group_members: '',
        accountant: '',
        cost_engineer: '',
        tax_accountant: '',
        suggestion: '',
        start_time: '',
        finish_time: '',
        organization: '',
        total_assets: '',
        total_assets: '',
        check_money: '',
        reduction_money: ''
      },
      operateFormLabel: [
        {
          model: 'type',
          label: '审计大类类型',
          type: 'select',
          opts: [
            {
              label: '财务审计',
              value: '财务审计'
            },
            {
              label: '工程审计',
              value: '工程审计'
            },
            {
              label: '税务审计',
              value: '税务审计'
            },
          ]
        },
        {
          model: 'project_name',
          label: '项目名称'
        },
        {
          model: 'client',
          label: '客户名称'
        },
        {
          model: 'reportNo',
          label: '审计报告号'
        },
        {
          model: 'project_type',
          label: '项目类型'
        },
        {
          model: 'partner',
          label: '项目合伙人'
        },
        {
          model: 'number',
          label: '项目编号'
        },
        {
          model: 'quality_control',
          label: '质控负责人'
        },
        {
          model: 'leader',
          label: '项目负责人'
        },
        {
          model: 'group_members',
          label: '组员'
        },
        {
          model: 'accountant',
          label: '签字注册会计师'
        },
        {
          model: 'cost_engineer',
          label: '签字注册造价师'
        },
        {
          model: 'tax_accountant',
          label: '签字税务师'
        },
        {
          model: 'suggestion',
          label: '报告意见类型'
        },
        {
          model: 'start_time',
          label: '执行起始时间',
          type: 'date'
        },
        {
          model: 'finish_time',
          label: '执行结束时间',
          type: 'date'
        },
        {
          model: 'organization',
          label: '施工单位'
        },
        {
          model: 'total_assets',
          label: '资产总额'
        },
        {
          model: 'check_money',
          label: '审计金额'
        },
        {
          model: 'reduction_money',
          label: '审减金额'
        },
      ],
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
