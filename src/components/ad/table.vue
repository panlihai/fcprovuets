<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="fctable">
    <el-table :data="value"
      :style="{height:height + 'px',overflowY:'auto',overflowX:'auto', width:width +'px', }"
      :size="tableInfo.size||'mini'"
      current-row-key="ID"
      :height="height"
      :border="true"
      :highlight-current-row="true"
      :default-sort="tableInfo.sort||{}"
      :show-summary="tableInfo.showsummary" :stripe="true"
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
      <el-table-column type="selection" v-if="tableInfo.selection" width="39">
      </el-table-column>
      <el-table-column
        prop="rownum"
        label="序号"
        :show-summary="false"
        width="45">
      </el-table-column>
      <el-table-column v-for="(field, index) of infoRow"
          :key="field.fieldCode+''+index"
          label-class-name="header"
          :class-name="field.className||(index===0?'links':'')"
          :show-overflow-tooltip="true"
          :prop="field.fieldCode"
          :label="field.fieldName"
          :align="field.dicCode?'center':((field.inputType==='long' || field.inputType ==='double')?'right':'left')"
          :sortable="true"
          >
          <template v-slot="scope">
            <fcbasefield v-if="tableInfo.editable===true&&field.editable===true&&field.readonly!==true&&field.disable!==true&&index!==0" :field="field" :value="scope.row" placeholder=""
              @click="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
              @dblclick="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
              @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
              @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
              @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)">
            </fcbasefield>
            <span v-else>
              {{scope.row[field.fieldCode]}}
            </span>
          </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="tableInfo.hasaction === true && tableInfo.lineToolbar"
        class-name="operate-temp"
        prop="action"
        :label="'操作'">
        <template v-slot="{row, $index, column}">
          <el-button
            v-for="(btn, btnindex) of tableInfo.lineToolbar" :key="btnindex"
            :size="tableInfo.size"
            type="text"
            :disabled="!!(tableInfo.editDisabled && tableInfo.editDisabled(row))"
            @click.stop="toolbar(row, $index, column, btn)">
            {{btn.btnName}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="tableInfo.pagination==='in'"
      @size-change="sizeChange"
      @current-change="pageChange"
      @prev-click="prevPage"
      @next-click="nextPage"
      :current-page="tableInfo.pageNum"
      :page-sizes="[20, 50, 100, 200, 300, 500, 1000]"
      :page-size="tableInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableInfo.totalSize">
    </el-pagination>
  </div>
</template>
<script>
import ViewModel from './list-form'
import fcbasefield from './field'

export default {
  name: 'fctable',
  components: { fcbasefield },
  props: {
    tableInfo: {
      type: Object,
      default: () => ({})
    },
    select: {
      type: Object,
      default: () => ({})
    },
    isloading: {
      type: Boolean,
      default: () => false
    },
    height: {
      type: Number,
      default: () => document.body.clientHeight - 169 - 47 - (this.tableInfo.pagination === 'in' ? 40 : 0)
    },
    width: {
      type: Number,
      default: () => document.body.clientWidth - 228
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      infoRow: []
    }
  },
  watch: {
    tableInfo: {
      handler () {
        this.init()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * 初始化列表行
     */
    init () {
      this.infoRow = ViewModel.initTableModel(this.tableInfo)
    },
    toolbar (value, $index, column, btn) {
      this.event('toolbar', {
        eventname: btn.btnAct, index: $index, btn, value
      })
    },
    rowclick (value, row, event) {
      this.event('rowclick', {
        value, row, event, field: this.tableInfo.fields[row.property]
      })
    },
    rowdblclick (value, row, event) {
      this.event('rowdblclick', {
        value, row, event, field: this.tableInfo.fields[row.property]
      })
    },
    /**
     * 点击cell时触发，当点击链接时，触发另外一个事件
     */
    cellclick (value, row, cell, event) {
      const field = this.tableInfo.fields[row.property]
      this.event('cellclick', {
        value, row, cell, event, field
      })
      // 当是链接字段，同时不可编辑的时候 或者 为只读 为禁用的时候可点击打开链接
      if ((row.className === 'links' && this.tableInfo.editable !== true) || field.readonly === true || field.disabled === true) {
        this.event('linkclick', {
          value, row, cell, event, field
        })
      }
    },
    celldblclick (value, row, cell, event) {
      this.event('celldblclick', {
        value, row, cell, event, field: this.tableInfo[row.property]
      })
    },
    sortChange (sortObj) {
      this.event('sortchange', { cell: sortObj.column, order: sortObj.order, field: this.tableInfo.fields[sortObj.prop] })
    },
    /**
     * 标题点击
     */
    headerClick (row, event) {
      this.event('headerclick', { row, event, field: this.tableInfo.fields[row.property] })
    },
    /**
     * 行右键
     */
    rowContextmenu (value, row, event) {
      this.event('rowcontextmenu', {
        value, row, event, field: this.tableInfo.fields[row.property]
      })
    },
    /**
     * 标题右键
     */
    headerContextmenu (row, event) {
      this.event('headercontextmenu', { row, event, field: this.tableInfo.fields[row.property] })
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
      // eslint-disable-next-line vue/no-mutating-props
      this.tableInfo.pageSize = pageSize
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
      // eslint-disable-next-line vue/no-mutating-props
      this.tableInfo.pageNum = pageNum
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.tableInfo.pageSize
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
        pageSize: this.tableInfo.pageSize
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
        pageSize: this.tableInfo.pageSize
      })
    },
    /**
     * 新增文件时候转换为base64，
     */
    getFile (file) {
      this.getBase64(file.raw).then((res) => {
        this.fileList[file.uid] = {
          content: res,
          ...{
            name: file.name,
            size: file.size,
            type: file.raw.type,
            uid: file.uid
          }
        }
        this.valueChange({ fieldCode: 'fileList' }, this.filetoList())
      })
    },
    /**
     * 对象转列表
     */
    filetoList () {
      const files = []
      Object.keys(this.fileList).forEach((key) => {
        files.push(this.fileList[key])
      })
      return files
    },
    /**
     * 文件删除时候调用
     */
    removeFile (file) {
      delete this.fileList[file.uid]
      this.valueChange({
        fieldCode: 'fileList',
        value: this.filetoList()
      })
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)

        // eslint-disable-next-line func-names
        reader.onload = function () {
          imgResult = reader.result
        }
        // eslint-disable-next-line func-names
        reader.onerror = function (error) {
          reject(error)
        }
        // eslint-disable-next-line func-names
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    fieldClick (data, field, index, column, $event) {
      this.event('click', {
        field, data, index, column, $event
      })
    },
    fieldDblclick (data, field, index, column, $event) {
      this.event('dblClick', {
        field, data, index, column, $event
      })
    },
    fieldBlur (data, field, index, column, $event) {
      this.event('blur', {
        field, data, index, column, $event
      })
    },
    fieldFocus (data, field, index, column, $event) {
      this.event('focus', {
        field, data, index, column, $event
      })
    },
    fieldValueChange (data, field, index, column, $event) {
      data = { ...data, ...$event.change }
      const fieldCode = field.tableName === undefined ? field.fieldCode : `${field.tableName}___${field.fieldCode}`
      // eslint-disable-next-line vue/no-mutating-props
      this.value[index][fieldCode] = $event.change[fieldCode]
      this.event('change', {
        data, field, index, column, $event
      })
    },
    event (eventname, param) {
      const grp = this.tableInfo
      this.$emit(eventname, { eventname, ...param, grp })
    }
  }
}
</script>

<style lang="scss">
.el-pagination {
  text-align: center;
}
.fctable {
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
    width: 2px;
    height: 2px;
}
::-webkit-scrollbar-track{
    border-radius: 1px;
    background-color: #efefef;
}
::-webkit-scrollbar-thumb{
  border-radius: 1px;
  background-color: #18ab8f;
}
</style>
