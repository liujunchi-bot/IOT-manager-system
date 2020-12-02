<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增传感器' : '更新传感器信息'"
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
        
        <span>
        
        <el-select v-model="value" multiple clearable placeholder="请输入设备类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        </span>
        <span>
        
                  <el-select v-model="value1" multiple clearable placeholder="请输入设备生产商">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        </span>
        

        <!-- <sensor-form inline :formLabel="formLabel" :form="searchFrom"> -->
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
    <terminal-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></terminal-table>
  </div>
</template>

<script>
import TerminalForm from '../../components/TerminalForm'
import TerminalTable from '../../components/TerminalTable'
export default {
  components: {
    TerminalForm,
    TerminalTable
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '有人DTU'
      }, {
        value: '选项2',
        label: '鲲鹏终端'
      }, {
        value: '选项3',
        label: '中海达终端'
      }, {
        value: '选项4',
        label: '中大终端'
      }
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
          prop: 'terminal_type',
          label: '设备名称',
        },
        {
          prop: 'terminal_produce',
          label: '生产厂商'
        },
        {
          prop: 'terminal_id',
          label: '设备id',
        },
        {
          prop: 'sensor_id',
          label: '绑定的传感器id'
        },
        {
          prop: 'terminal_state',
          label: '监控状态'
        },
        {
          prop: 'collect_frequency',
          label: '采集频率'
        },
        {
          prop: 'terminal_create_time',
          label: '创建时间',
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        terminal_type: '',
        terminal_produce: '',
        terminal_id: '',
        sensor_id: '',
        terminal_state: '',
        collect_frequency: '',
        terminal_create_time: '',
      },
      operateFormLabel: [
        {
          model: 'terminal_type',
          label: '设备名称',
          type: 'select',
          opts: [
            {
              label: '有人DTU',
              value: '有人DTU'
            },
            {
              label: '鲲鹏终端',
              value: '鲲鹏终端'
            },
            {
              label: '中海达终端',
              value: '中海达终端'
            },
            {
              label: '中大终端',
              value: '中大终端'
            },
          ]
        },
        {
          model: 'terminal_produce',
          label: '生产厂商'
        },
        {
          model: 'terminal_id',
          label: '设备id'
        },
        {
          model: 'sensor_id',
          label: '绑定传感器id'
        },
        {
          model: 'terminal_state',
          label: '检测状态',
          type: 'select',
          opts: [
            {
              label: '设备运行',
              value: '1'
            },
            {
              label: '设备关闭',
              value: '2'
            }
          ]
        },
        {
          model: 'collect_frequency',
          label: '采集频率'
        },
        {
          model: 'terminal_create_time',
          label: '创建时间'
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
