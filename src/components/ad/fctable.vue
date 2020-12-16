/* eslint-disable vue/valid-v-for */
<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="ystable">
    <el-table :data="value"
      :style="{height:height + 'px', width: '100%', overflowY:'auto', }"
      :size="vm.tableInfo.size||'mini'"
      current-row-key="ID"
      :height="height"
      :border="true"
      :highlight-current-row="true"
      :default-sort="vm.tableInfo.sort||{}"
      :show-summary="vm.tableInfo.showsummary" :stripe="true" row-key="ID"
      v-loading.fullscreen.lock="isloading"
      element-loading-text="正在加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @cell-click="cellclick"
      @cell-dblclick="celldblclick"
      @row-click="rowclick"
      @row-dblclick="rowdblclick"
      @sort-change="sortChange"
      @header-click="headerClick"
      @row-contextmenu="rowContextmenu"
      @header-contextmenu="headerContextmenu"
      @selection-change="selectionChange"
      @select-all="selectAll"
      @select="selectOne">
      <el-table-column
        type="selection" v-if="vm.tableInfo.selection"
        width="39">
      </el-table-column>
      <el-table-column
          prop="rownum"
          label="序号"
          :show-summary="false"
          width="45">
      </el-table-column>
      <el-table-column v-for="(field, index) of vm.tableInfo.infoRow"
          :key="index"
          label-class-name="header"
          :class-name="field.className||(index===0?'links':'')"
          :show-overflow-tooltip="true"
          :prop="field.fieldCode"
          :label="field.fieldName"
          :align="field.dicCode?'center':((field.inputType==='long' || field.inputType ==='double')?'right':'left')"
          :sortable="true"
          >
      </el-table-column>
      <el-table-column
        v-if="vm.tableInfo.hasaction === true && vm.tableInfo.lineToolbar"
        class-name="operate-temp"
        prop="action"
        :label="$t('操作')"
        width="100">
        <template v-slot="{row, $index, column}">
          <el-button
            v-for="(btn, btnindex) of vm.tableInfo.lineToolbar" :key="btnindex"
            :size="vm.tableInfo.size"
            type="text"
            :disabled="!!(vm.tableInfo.editDisabled && vm.tableInfo.editDisabled(row))"
            @click.native.stop="toolbar(row, $index, column, btn)">
            {{$t(btn.btnName)}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="vm.tableInfo.pagination==='in'"
      @size-change="sizeChange"
      @current-change="pageChange"
      @prev-click="prevPage"
      @next-click="nextPage"
      :current-page="vm.tableInfo.pageNum"
      :page-sizes="[20, 50, 100, 200, 300, 500, 1000]"
      :page-size="vm.tableInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="vm.tableInfo.totalSize">
    </el-pagination>
  </div>
</template>
<script>
import ViewModel from '../../config/list-form'

export default {
  name: 'fcTable',
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Array,
      default: () => []
    },
    isloading: {
      type: Boolean,
      default: () => false
    },
    height: {
      type: Number,
      default: () => document.body.clientHeight - 169 - 47
    }
  },
  data () {
    return {
      searchObj: {},
      vm: { ...ViewModel, ...this.model },
      select: { ...ViewModel.select }
    }
  },
  created () {
    this.vm.initTableModel(this.vm.tableInfo, this.vm.fields, true, false)
  },
  computed: { },
  watch: {
    model () {
    },
    value () {
    }
  },
  methods: {
    toolbar (value, $index, column, btn) {
      this.event('toolbar', {
        eventname: btn.btnAct, index: $index, btn, value
      })
    },
    rowclick (value, row, event) {
      this.event('rowclick', {
        value, row, event, field: this.vm.fields[row.property]
      })
    },
    rowdblclick (value, row, event) {
      this.event('rowdblclick', {
        value, row, event, field: this.vm.fields[row.property]
      })
    },
    /**
     * 点击cell时触发，当点击链接时，触发另外一个事件
     */
    cellclick (value, row, cell, event) {
      this.event('cellclick', {
        value, row, cell, event, field: this.vm.fields[row.property]
      })
      if (row.className === 'links') {
        this.event('linkclick', {
          value, row, cell, event, field: this.vm.fields[row.property]
        })
      }
    },
    celldblclick (value, row, cell, event) {
      this.event('celldblclick', {
        value, row, cell, event, field: this.vm.fields[row.property]
      })
    },
    sortChange (sortObj) {
      this.event('sortchange', { cell: sortObj.column, order: sortObj.order, field: this.vm.fields[sortObj.prop] })
    },
    /**
     * 标题点击
     */
    headerClick (row, event) {
      this.event('headerclick', { row, event, field: this.vm.fields[row.property] })
    },
    /**
     * 行右键
     */
    rowContextmenu (value, row, event) {
      this.event('rowcontextmenu', {
        value, row, event, field: this.vm.fields[row.property]
      })
    },
    /**
     * 标题右键
     */
    headerContextmenu (row, event) {
      this.event('headercontextmenu', { row, event, field: this.vm.fields[row.property] })
    },
    selectionChange (value) {
      this.event('selectionchange', { value })
    },
    /**
     * 全选事件
     */
    selectAll (value) {
      this.event('selectall', { value })
    },
    /**
     * 单选一行
     */
    selectOne (row, value) {
      this.event('select', { value })
    },
    /**
     * 分页大小改变时,跳转到第一页
     */
    sizeChange (pageSize) {
      this.vm.tableInfo.pageSize = pageSize
      this.event('pagechange', {
        eventname: 'pagesizeChange',
        name: '页偏移量改变',
        pageSize,
        pageNum: 1
      })
    },
    /**
     * 页数改变时
     */
    pageChange (pageNum) {
      this.vm.tableInfo.pageNum = pageNum
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize
      })
    },
    /**
     * 上一页
     */
    prevPage (pageNum) {
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize
      })
    },
    /**
     * 下一页
     */
    nextPage (pageNum) {
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize
      })
    },
    event (eventname, param) {
      this.$emit(eventname, { eventname, ...param })
    }
  }
}
</script>

<style lang="scss">
.el-pagination {
  text-align: center;
}
.ystable {
  overflow-y: auto;
  // height: calc(100% - 300px);
}
.links {
  color:#2440B3;
  cursor: pointer;
}
.header {
  color: #909399
}

::-webkit-scrollbar{
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #efefef;
}
::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #18ab8f;
}
</style>
