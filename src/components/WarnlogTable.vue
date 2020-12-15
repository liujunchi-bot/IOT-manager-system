<template>
  <div class="contract-table">
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 200"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.prop == 'warn_state'">
            <el-tag effect="dark" :type="warn_index[scope.$index % 2]">{{
              warn_list[scope.$index % 2]
            }}</el-tag>
          </span>
          <span style="margin-left: 10px" v-else>{{
            scope.row[item.prop]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
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
        '',
      ],
      warn_list: [
        "待处理",
        "已处理",
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
