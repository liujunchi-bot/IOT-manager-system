<template>
  <div class="manage">
    <el-steps >

    </el-steps>
    <el-dialog
      :title="operateType === 'add' ? '新增传感器' : '更新传感器信息'"
      :visible.sync="isShow" :before-close="handleclose"
    >

       <el-steps :active="active" finish-status="success" align-center>

        <el-step title="基本信息">
         <!-- <sensor-form :formLable="operateForm_baseLable" :form="operateForm_base" ref="form"></sensor-form> -->

        </el-step>
        <el-step title="传感器属性">
                <!-- <sensor-form :formLable="operateForm_propLable" :form="operateForm_prop" ref="form"></sensor-form> -->
        </el-step>
        <el-step title="地理信息">
          <!-- <sensor-form :formLable="operateForm_geospatialLable" :form="operateForm_geospatial" ref="form"></sensor-form> -->
</el-step>
        <el-step title="绑定信息"></el-step>
          <!-- <sensor-form :formLable="operateForm_bindLable" :form="operateForm_bind" ref="form"></sensor-form> -->
       </el-steps>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
       
        <!-- <sensor-form :formLable="operateForm_baseLable" :form="operateForm_base" ref="form" v-if="active==1"></sensor-form> -->
       <!-- <sensor-form :formLable="operateForm_propLable" :form="operateForm_prop" ref="form" v-if="active==2"></sensor-form> -->
       <!-- <sensor-form :formLable="operateForm_geospatialLable" :form="operateForm_geospatial" ref="form" v-if="active==3"></sensor-form> -->
       <!-- <sensor-form :formLable="operateForm_bindLable" :form="operateForm_bind" ref="form" v-if="active==4"></sensor-form> -->
        <div>
        <sensor-form
        :formLabel="operateForm_bindLable"
        :form="operateForm_bind"
        ref="form" v-if="active==4"
      ></sensor-form>     
      <sensor-form
        :formLabel="operateForm_baseLable"
        :form="operateForm_base"
        ref="form" v-if="active==1"
      ></sensor-form>   
      <sensor-form
        :formLabel="operateForm_propLable"
        :form="operateForm_prop"
        ref="form" v-if="active==2"
      ></sensor-form>  
      <sensor-form
        :formLabel="operateForm_geospatialLable"
        :form="operateForm_geospatial"
        ref="form" v-if="active==3"
      ></sensor-form>    
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" v-if="active==4">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="active==4">确 定</el-button>
        <el-button type="primary" @click="pre" v-if="active>1">上一步</el-button>
        <el-button type="primary" @click="next" v-if="active<4">下一步</el-button>
      </div>

    </el-dialog>
    <div class="manage-header">
      <div>
        <span>
        <el-select v-model="value" multiple clearable placeholder="按类别查询">
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
        
                  <el-select v-model="value1" multiple clearable placeholder="按生产商查询">
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
      active: 1,
      shownext: true,
      showbtn: false,
      operateForm_bind: {
        terminal_name: '',
        terminal_id: ''
      },
      operateForm_bindLable: [
        {
          model: 'terminal_name',
          label: '绑定设备名称'
        },
        {
          model: 'terminal_id',
          label: '绑定设备id'
        }
      ],
      operateForm_geospatial: {
        longitude: '',
        latitude: '',
        geo_description: ''
      },
      operateForm_geospatialLable: [
        {
          model: 'longitude',
          label: '经度'
        },
        {
          model: 'latitude',
          label: '纬度'
        },
        {
          model: 'geo_description',
          label: '地理描述'
        }
      ],
      operateForm_prop: {
        measure_type: '',
        max_measure: '',
        min_measure: ''
      },
      operateForm_propLable: [
        {
          model: 'measure_type',
          label: '测量类型'
        },
        {
          model: 'max_measure',
          label: '测量上限'
        },
        {
          model: 'min_measure',
          label: '测量下限'
        }
      ],
      operateForm_base: {
        sensor_id: '',
        sensor_name: '',
        sensor_model: '',
        manufacturer: '',
        communication: ''
      },
      operateForm_baseLable: [
        {
          model: 'sensor_name',
          label: '传感器名称',
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
          model: 'sensor_model',
          label: '传感器型号',
        },
        {
          model: 'manufacturer',
          label: '生产厂商'
        },
        {
          model: 'communication',
          label: '通信方式',
          type: 'select',
          opts: [
            {
              label: '单工',
              value: '单工'
            },
            {
              label: '半双工',
              value: '半双工'
            },
            {
              label: '全双工',
              value: '全双工'
            }
          ]
        }

      ],
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
          prop: 'sensor_id',
          label: '序号',
        },
        {
          prop: 'sensor_name',
          label: '传感器名称'
        },
        {
          prop: 'sensor_model',
          label: '传感器型号',
        },
        {
          prop: 'manufacturer',
          label: '生产厂商'
        },
        {
          prop: 'terminal_name',
          label: '所属设备名称'
        },
        {
          prop: 'measure_type',
          label: '测量种类'
        },
        {
          prop: 'sensor_state',
          label: '采集状态',
        },
        {
          prop: 'max_measure',
          label: '测量上限'
        },
        {
          prop: 'min_measure',
          label: '测量下限',
        },
        {
          prop: 'sensor_create_time',
          label: '创建时间',
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        sensor_id: '',
        sensor_name: '',
        sensor_model: '',
        manufacturer: '',
        terminal_name: '',
        measure_type: '',
        sensor_state: '',
        max_measure: '',
        min_measure: '',
        sensor_create_time: '',

      },
      operateFormLabel: [
        {
          model: 'sensor_id',
          label: '传感器id'
        },
        {
          model: 'measure_type',
          label: '测量类型',
          type: 'select',
          opts: [
            {
              label: '深度',
              value: '深度'
            },
            {
              label: '长度',
              value: '长度'
            },
            {
              label: '高度',
              value: '高度'
            },
            {
              label: '力大小',
              value: '力大小'
            },
            {
              label: '角度',
              value: '角度'
            },
          ]
        },
        {
          model: 'sensor_name',
          label: '传感器名称',
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
          model: 'sensor_model',
          label: '传感器型号',
          type: 'select',
          opts: [
            {
              label: 'Z-001',
              value: 'Z-001'
            },
            {
              label: 'Z-002',
              value: 'Z-002'
            },
            {
              label: 'Z-003',
              value: 'Z-003'
            },
            {
              label: 'Z-004',
              value: 'Z-004'
            },
            {
              label: 'Z-005',
              value: 'Z-005'
            },
            {
              label: 'Z-006',
              value: 'Z-006'
            },

          ]
        },
        {
          model: 'manufacturer',
          label: '生产厂商',
          type: 'select',
          opts: [
            {
              label: '中大检测',
              value: '中大检测'
            },
            {
              label: '武汉承拓',
              value: '武汉承拓'
            },
            {
              label: '上海盛迪',
              value: '上海盛迪'
            },
            {
              label: '济南博林',
              value: '济南博林'
            },
            {
              label: '上海直川',
              value: '上海直川'
            }
          ]
        },
        {
          model: 'terminal_name',
          label: '所属设备名称',
        },
        {
          model: 'sensor_state',
          label: '采集状态',
          type: 'select',
          opts: [
            {
              label: '在线',
              value: '在线'
            },
            {
              label: '离线',
              value: '离线'
            },
            {
              label: '测试',
              value: '测试'
            },
            {
              label: '故障',
              value: '故障'
            }
          ]
        },
        {
          model: 'max_measure',
          label: '测量上限'
        },
        {
          model: 'max_measure',
          label: '测量下限'
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
    // handleclose:添加元素时，在对话框关闭后，点击叉叉，提示消息，然后关闭后步骤条初始化，对话框参数设置为不显示。
    handleclose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.active = 1;
          this.isShow = false;
          done();
        })
        .catch(_ => { });
    },
    pre () {
      if (this.active-- < 2) this.active = 1
    },
    next () {
      if (this.active++ > 3) {
        // this.shownext = false;
        // this.showbtn = true;
        this.active = 1;
      }
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
      this.activie = 0
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
        // 点击确认提交表单后情况原表单内容
      }
      this.active = 1
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
