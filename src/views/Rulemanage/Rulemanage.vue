<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增报警模型' : '修改报警模型'"
      :visible.sync="isShow"
    >
      <terminal-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        ref="form"
      ></terminal-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <div>
        <div>
          <el-row :gutter="20" justify>
            <el-col :span="12">
              <el-input
                placeholder="请输入报警名称"
                prefix-icon="el-icon-search"
              ></el-input
            ></el-col>

            <el-col :span="12"
              ><el-button type="primary" @click="getList(searchFrom.keyword)"
                >搜索</el-button
              ></el-col
            >
          </el-row>
        </div>

        <!-- <sensor-form inline :formLabel="formLabel" :form="searchFrom"> -->

        <!-- </sensor-form> -->
      </div>
      <div>
        <el-button type="primary" @click="addUser">添加</el-button>
        <el-button type="danger" @click="addUser">批量删除</el-button>
        <el-button type="info" @click="addUser">导出</el-button>
      </div>
    </div>
    <rule-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></rule-table>
  </div>
</template>

<script>
import TerminalForm from '../../components/TerminalForm'
import RuleTable from '../../components/RuleTable'
export default {
  components: {
    TerminalForm,
    RuleTable
  },
  data () {
    return {



      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'warn_name',
          label: '报警名称',
        },
        {
          prop: 'warn_rule',
          label: '报警规则'
        },
        {
          prop: 'warn_class1',
          label: '报警对象1/阈值1',
        },
        {
          prop: 'warn_class2',
          label: '报警对象2/阈值2',
        },
        {
          prop: 'warn_rank',
          label: '报警级别'
        },
        {
          prop: 'warn_add_time',
          label: '添加时间'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        warn_name: '',
        warn_rule: '',
        warn_rank: '',
        warn_sensor1: '',
        warn_max1: '',
        warn_min1: '',
        warn_sensor2: '',
        warn_max2: '',
        warn_min2: '',
      },
      operateFormLabel: [
        {
          model: 'warn_name',
          label: '报警名称',

        },
        {
          model: 'warn_rule',
          label: '报警规则'
        },
        {
          model: 'warn_rank',
          label: '报警级别',
          type: 'select',
          opts: [
            {
              label: '高风险',
              value: 3
            },
            {
              label: '中风险',
              value: 2
            },
            {
              label: '低风险',
              value: 1
            }
          ]
        },
        {
          model: 'warn_sensor1',
          label: '报警对象1',
          type: 'select',
          opts: [
            {
              label: '导轮测斜仪',
              value: '导轮测斜仪'
            },
            {
              label: '静力水准仪',
              value: '静力水准仪'
            },
            {
              label: '拉线位移计',
              value: '拉线位移计'
            },
            {
              label: '无线倾角仪',
              value: '无线倾角仪'
            },
            {
              label: '激光测距仪',
              value: '激光测距仪'
            },
            {
              label: '盒式测斜仪',
              value: '盒式测斜仪'
            },
          ]
        },
        {
          model: 'warn_max1',
          label: '阈值上限1'
        },
        {
          model: 'warn_min1',
          label: '阈值下限1',
        },
        {
          model: 'warn_sensor2',
          label: '报警对象2',
          type: 'select',
          opts: [
            {
              label: '导轮测斜仪',
              value: '导轮测斜仪'
            },
            {
              label: '静力水准仪',
              value: '静力水准仪'
            },
            {
              label: '拉线位移计',
              value: '拉线位移计'
            },
            {
              label: '无线倾角仪',
              value: '无线倾角仪'
            },
            {
              label: '激光测距仪',
              value: '激光测距仪'
            },
            {
              label: '盒式测斜仪',
              value: '盒式测斜仪'
            },
          ]
        },
        {
          model: 'warn_max2',
          label: '阈值上限2'
        },
        {
          model: 'warn_min2',
          label: '阈值下限2',
        }
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
