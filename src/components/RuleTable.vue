<template>
  <div class="contract-table">
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 150"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.prop == 'warn_rank'">
            <el-tag effect="dark" :type="warn_index[scope.$index % 3]">{{
              warn_list[scope.$index % 3]
            }}</el-tag>
          </span>
          <span style="margin-left: 10px" v-else>{{
            scope.row[item.prop]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      warn_index: [
        "danger",
        "warn",
        "info"
      ],
      warn_list: [
        "高风险",
        "中风险",
        "低风险"
      ]
    }
  },
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('del', row)
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.contract-table {
  height: calc(100% - 10px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
