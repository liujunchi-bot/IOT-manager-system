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
        
       <span><el-input type="text" v-model="search_id" placeholder="请输入设备id" size="small" style="width:150px"></el-input></span>
        <!-- <sensor-form inline :formLabel="formLabel" :form="searchFrom"> -->
          <el-button type="primary" @click="search_form_id(search_id)"
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
import axios from '../../axios/ajax'
import qs from 'qs'
export default {
  components: {
    TerminalForm,
    TerminalTable
  },
  data () {
    return {
      search_id: '',
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
          prop: 'terminal_id',
          label: '设备id',
        },
        {
          prop: 'terminal_class_id',
          label: '设备类id'
        },
        {
          prop: 'terminal_type',
          label: '设备名称',
        },
        {
          prop: 'terminal_model',
          label: '设备型号'
        },
        {
          prop: 'terminal_company',
          label: '生产厂商'
        },
        {
          prop: 'terminal_long',
          label: '经度'
        },
        {
          prop: 'terminal_lot',
          label: '纬度'
        },
        {
          prop: 'terminal_communication',
          label: '通信方式'
        },
        {
          prop: 'terminal_ip',
          label: 'IP地址'
        },
        {
          prop: 'terminal_state',
          label: '监控状态'
        },
        {
          prop: 'terminal_location_describe',
          label: '地理位置描述'
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
        terminal_id: '',
        terminal_class_id: '',
        // terminal_type: '',
        terminal_model: '',
        terminal_company: '',
        terminal_create_time: '',
        terminal_long: '',
        terminal_lot: '',
        terminal_communication: '',
        terminal_ip: '',
        terminal_state: '',
        terminal_location_describe: '',


      },
      operateFormLabel: [
        {
          model: 'terminal_id',
          label: '设备id'
        },
        {
          model: 'terminal_class_id',
          label: '设备类id',
          type: 'select',
          opts: [
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
          ]
        },
        {
          model: 'terminal_type',
          label: '设备类名称',
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
          model: 'terminal_model',
          label: '设备型号'
        },
        {
          model: 'terminal_company',
          label: '生产厂商'
        },
        {
          model: 'terminal_long',
          label: '经度'
        },
        {
          model: 'terminal_lot',
          label: '纬度'
        },
        {
          model: 'terminal_communication',
          label: '通信方式',
          type: 'select',
          opts: [
            {
              label: '3G',
              value: '3G'
            },
            {
              label: '4G',
              value: '4G'
            },
            {
              label: '5G',
              value: '5G'
            },
            {
              label: '有线',
              value: '有线'
            },
            {
              label: 'WIFI',
              value: 'WIFI'
            },
            {
              label: '红外',
              value: '红外'
            },
          ]
        },
        {
          model: 'terminal_state',
          label: '检测状态',
          type: 'select',
          opts: [
            {
              label: '警报',
              value: '警报'
            },
            {
              label: '测试',
              value: '测试'
            },
            {
              label: '停运',
              value: '停运'
            },
            {
              label: '运行',
              value: '运行'
            }

          ]
        },
        {
          model: 'terminal_location_describe',
          label: '地理位置描述'
        },
        {
          model: 'terminal_create_time',
          label: '创建时间',
          type: 'date'
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
    // getList (name = '') {
    //   this.config.loading = true
    //   // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
    //   name ? (this.config.page = 1) : ''
    //   this.$http
    //     .get('/api/user/getUser', {
    //       params: {
    //         page: this.config.page,
    //         name,
    //       }
    //     })
    //     .then(res => {
    //       this.tableData = res.data.list.map(item => {
    //         item.categoryLabel = item.category === 0 ? '税审' : '年审'
    //         return item
    //       })
    //       this.config.total = res.data.count
    //       this.config.loading = false
    //     })
    // },
    search_form_id (id = '') {
      this.config.loading = true
      this.config.page = 1
      alert("id:  " + id)
      let common_table = []
      if (id == '') this.getList();
      else {

        axios._get("http://localhost:8181/terminal_info/findById/" + id).then(res => {
          this.$message.success("获取设备列表成功！")
          common_table.push(res)
          this.tableData = common_table;
          console.log("res       " + JSON.stringify(res))
          console.log("tabledata    " + JSON.stringify(this.tableData))
          this.config.loading = false;
        }, err => {
          alert("error!!!");
        })
      }
    },
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      axios._get("http://localhost:8181/terminal_info/findAll/").then(res => {
        this.$message.success("获取设备列表成功！")
        this.tableData = res;
        this.config.loading = false;
        console.log("getlist:   " + JSON.stringify(this.tableData))
      }, err => {
        alert("error!!!");
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
        alert("正在编辑！")
        console.log("put:    " + JSON.stringify(this.operateForm))
        axios._put('http://localhost:8181/terminal_info/update', JSON.stringify(this.operateForm)).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        // alert("添加成功！")
        console.log("tabel:   " + this.operateForm);
        console.log("111111" + JSON.stringify(this.operateForm));
        axios._post('http://localhost:8181/terminal_info/add/', JSON.stringify(this.operateForm)).then(res => {

          this.$message.success("创建设备成功！");
          this.isShow = false
          this.getList()
        }, err => {
          alert("error!!!")
        })
      }
    },
    // delUser (row) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       let id = row.id
    //       this.$http
    //         .get('/api/user/del', {
    //           params: {
    //             id
    //           }
    //         })
    //         .then(res => {
    //           console.log(res.data)
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           })
    //           this.getList()
    //         })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // }
    delUser (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // let project_id=row.project_id;
          //console.log("id+  "+id);
          axios
            ._remove('http://localhost:8181/terminal_info/deleteById', row.terminal_id)

            .then(res => {
              console.log("row:    " + row.terminal_id)
              console.log(qs.stringify(row))
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
