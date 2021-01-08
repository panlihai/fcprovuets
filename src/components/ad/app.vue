<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="app">
    <div class="search">
      <fcsearch :searchInfo="model.searchInfo" :value="searchObj" @toolbar="queryToolbar" @change="queryToolbar" :select="model.select"></fcsearch>
    </div>
    <div class="toolbar">
      <fctoolbar @click="toolbar" :toolbar="model.tableInfo.toolbar"></fctoolbar>
    </div>
    <div class="table" :style="{height:tableHeight+'px'}">
      <div class="tree" v-if="false">
        <div  v-for="(field, index) of model.tableInfo.fields" :key="index">
          <template v-if="field.dicCode!==null">
            <label :text="field.fieldName"></label>
            <el-tree
              :props="props"
              :load="loadNode"
              lazy
              show-checkbox
              @check-change="handleCheckChange">
            </el-tree>
          </template>
        </div>
      </div>
      <div class="content">
        <fctable :tableInfo="model.tableInfo" :height="tableHeight" :width="tableWidth" :isloading="isLoading"
          :value="value" @toolbar="tableToolbar" @cellclick="tableCellClick" :select="model.select"
          @celldblclick="tableCellDblClick" @rowclick="tableRowClick" @rowdblclick="tableRowDblClick"
          @sortchange="tableSortChange" @headerclick="tableHeaderClick" @rowcontextmenu="tableRowContextmenu"
          @headercontextmenu="tableHeaderContextmenu" @selectionchange="tableSelectionChange" @selectall="tableSelectAll"
          @select="tableSelectOne" @pagechange="tablePageChange" @linkclick="tableLinkClick" @change="tableFieldValueChange"></fctable>
      </div>
    </div>
    <div class="footer">
      <el-pagination v-if="model.tableInfo.pagination==='out'"
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        @prev-click="prevPage"
        @next-click="nextPage"
        :current-page="model.tableInfo.pageNum"
        :page-sizes="[20, 50, 100, 200, 300, 500, 1000]"
        :page-size="model.tableInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="model.tableInfo.totalSize">
      </el-pagination>
    </div>
    <el-dialog fullscreen :title="model.tableInfo.title" v-model="model.formInfo.formShow" width="100%" height="100%" :before-close="formClose">
      <fcform v-if="model.formInfo.formShow" :formInfo="model.formInfo" :value="selectedObj" :select="model.select"
        @grouptoolbar="formGroupToolbar" @toolbar="formToolbar" @titleopenclick="formGroupToolbar"
        @labelclick="formFieldLabelClick" @click="formFieldClick" @tabletoolbar="formTableToolbar"
        @blur="formFieldBlur" @focus="formFieldFocus" @change="formFieldValueChange"
        @tablecellclick="formTableCellClick" @tablecelldblclick="formTableCellDblClick" @tablerowclick="formTableRowClick"
        @tablerowdblclick="formTableRowDblClick" @tablesortchange="formTableSortChange" @tableheaderclick="formTableHeaderClick"
        @tablerowcontextmenu="formTableRowContextmenu" @tableheadercontextmenu="formTableHeaderContextmenu"
        @tableselectionchange="formTableSelectionChange" @selectall="formTableSelectAll"
        @tableselect="formTableSelectOne" @tablepagechange="formTablePageChange"
        @tablelinkclick="formTableLinkClick" @tablefieldclick="formTableFieldClick"
        @tablefieldblur="formTableFieldBlur" @tablefieldfocus="formTableFieldFocus" @tablefieldchange="formTableFieldValueChange"
      >
        <template #formchild>
          <slot name="formchild"></slot>
        </template>
        <template #formlistchild>
          <slot name="listchild"></slot>
        </template>
      </fcform>
      <template #footer>
        <fctoolbar
          @click="formToolbar($event.btn)"
          :toolbar="model.formInfo.toolbar"
        ></fctoolbar>
      </template>
    </el-dialog>
    <el-dialog fullscreen :title="model.tableInfo.title" :visible="model.viewInfo.formShow" width="100%" :before-close="viewClose">
      <fcview v-if="model.viewInfo.formShow" :formInfo="model.viewInfo" :value="selectedObj" :select="model.select"
        @grouptoolbar="formGroupToolbar" @toolbar="viewToolbar"  @titleopenclick="formGroupToolbar"
        @labelclick="formFieldLabelClick" @click="formFieldClick" @tabletoolbar="formTableToolbar"
        @blur="formFieldBlur" @focus="formFieldFocus" @change="formFieldValueChange"
        @tablecellclick="formTableCellClick" @tablecelldblclick="formTableCellDblClick" @tablerowclick="formTableRowClick"
        @tablerowdblclick="formTableRowDblClick" @tablesortchange="formTableSortChange" @tableheaderclick="formTableHeaderClick"
        @tablerowcontextmenu="formTableRowContextmenu" @tableheadercontextmenu="formTableHeaderContextmenu"
        @tableselectionchange="formTableSelectionChange" @selectall="formTableSelectAll"
        @tableselect="formTableSelectOne" @tablepagechange="formTablePageChange"
        @tablelinkclick="formTableLinkClick" @tablefieldclick="formTableFieldClick"
        @tablefieldblur="formTableFieldBlur" @tablefieldfocus="formTableFieldFocus" @tablefieldchange="formTableFieldValueChange">
        <template #viewchild>
          <slot name="formchild"></slot>
        </template>
        <template #viewlistchild>
          <slot name="listchild"></slot>
        </template>
      </fcview>
      <template #footer>
        <fctoolbar
          @click="viewToolbar($event.btn)"
          :toolbar="model.viewInfo.toolbar"
        ></fctoolbar>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import fcform from './form'
import fctoolbar from './toolbar'
import fcview from './view'
import fcsearch from './search'
import fctable from './table'
import { mapState } from 'vuex'

const tableevent = 'tableevent'
const toolbarevent = 'toolbarevent'
const viewevent = 'viewevent'
const formevent = 'formevent'
const queryevent = 'queryevent'

export default {
  name: 'fcapp',
  components: {
    fcform,
    fcview,
    fcsearch,
    fctable,
    fctoolbar
  },
  props: {
    height: {
      type: Number,
      default: () => document.body.clientHeight - 175
    },
    width: {
      type: Number,
      default: () => document.body.clientWidth - 228
    },
    value: {
      type: Array,
      default: () => ([])
    },
    modelid: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      // 查询条件
      searchObj: {},
      // 选中的对象
      selectedObj: {},
      // 选中的分组，这里可以取出表名
      selectGrp: {},
      // 选择的所有对象
      selectedObjs: [],
      isLoading: false,
      tableHeight: this.height,
      tableWidth: this.width
    }
  },
  watch: {
    model () {
      if (this.model && this.model.formInfo && this.model.formInfo.formShow) {
        this.selectGrp = this.model.formInfo
        // this.selectedObj = this.getInnerValue(this.value[0])
      }
      if (this.model && this.model.viewInfo && this.model.viewInfo.formShow) {
        this.selectGrp = this.model.viewInfo
        // this.selectedObj = this.getInnerValue(this.value[0])
      }
    },
    height () {
      this.tableHeight = this.height
    },
    width () {
      this.tablewidth = this.width
    }
  },
  computed: {
    ...mapState('model', {
      vm: (state) => state
    }),
    model () {
      return this.vm[this.modelid]
    }
  },
  methods: {
    getInnerValue (selectedValue) {
      const v = {}
      const fields = this.selectGrp.fields
      if (selectedValue) {
        Object.keys(fields).forEach((fieldCode) => {
          v[`${fields[fieldCode].tableName}___${fieldCode}`] = selectedValue[fieldCode]
        })
      }
      return v
    },
    /**
     * 查询工具栏
     */
    queryToolbar (param) {
      switch (param.eventname) {
        case 'showmore':
          break
        case 'reset':
          this.searchObj = {}
        // eslint-disable-next-line no-fallthrough
        case 'search':
          if (this.query) {
            this.query()
          }
          break
        case 'change':
          this.searchObj = { ...this.searchObj, ...param.value }
          break
        default:
          // 默认方法
          if (this[param.btn.btnAct]) {
            this[param.btn.btnAct](param)
          }
      }
      this.event(queryevent, param.eventname, param)
    },
    /**
     * 工具栏事件
     */
    toolbar (param) {
      param.selectedObjs = this.selectedObjs
      if (param.btn) {
        this.event(toolbarevent, param.btn.btnAct, param)
      }
    },
    /**
     * 查看窗口关闭
     */
    viewClose () {
      this.event(viewevent, 'close', {})
      this.selectedObj = {}
    },
    /**
     * 编辑窗口关闭
     */
    formClose () {
      this.event(formevent, 'close', {})
      this.selectedObj = {}
    },
    /**
     * 表单内容列表的工具栏事件
     */
    formTableToolbar (param) {
      this.event(formevent, param.btn.btnAct, param)
    },
    /**
     * 表单分区或分组工具栏事件
     */
    formGroupToolbar (param) {
      this.event(formevent, param.btn.btnAct, param)
    },
    /**
     * 字段标题点击
     */
    formFieldLabelClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 视图工具栏事件
     */
    viewToolbar (param) {
      this.event(viewevent, param.btnAct, { eventname: param.btnAct, desc: '表单工具栏事件', btn: param })
    },
    /**
     * 表单工具栏事件
     * @param {*} param 按钮事件名称
     */
    formToolbar (param) {
      this.event(formevent, param.btnAct, { eventname: param.btnAct, desc: '表单工具栏事件', btn: param })
    },
    /**
     * 表单字段点击后处理事件
     */
    formFieldClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段失去焦点后处理事件
     */
    formFieldBlur (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段获得焦点后处理事件
     */
    formFieldFocus (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段修改内容后处理事件
     */
    formFieldValueChange (param) {
      this.selectGrp = param.grp
      this.selectedObj = { ...this.selectedObj, ...param.change }
      this.event(formevent, param.eventname, param)
    },
    /**
     * 列表工具栏事件
     */
    tableToolbar (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.selectedObjs = [param.value]
      switch (param.eventname) {
        case 'viewOne':
          this.innerFormShow = true
          break
        default:
      }
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.btn.btnAct, param)
    },
    /**
     * 列表行点击事件处理
     */
    tableRowClick (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 双击行时，默认选中的对象修改为当前行，并打开浏览窗口
     */
    tableRowDblClick (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表单元格点击事件处理
     */
    tableCellClick (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表单元格双击事件处理
     */
    tableCellDblClick (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 打开链接，暂时支持查看当前明细
     */
    tableLinkClick (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表排序处理
     */
    tableSortChange (param) {
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 标题点击
     */
    tableHeaderClick (param) {
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 行右键
     */
    tableRowContextmenu (param) {
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 标题右键
     */
    tableHeaderContextmenu (param) {
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 选中行修改时
     */
    tableSelectionChange (param) {
      this.selectedObjs = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 全选事件
     */
    tableSelectAll (param) {
      this.selectedObjs = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 单选一行
     */
    tableSelectOne (param) {
      this.selectGrp = param.grp
      this.selectedObj = this.getInnerValue(param.value)
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表修改值后的事件
     */
    tableFieldValueChange (param) {
      this.selectGrp = param.grp
      param.change = param.$event.change
      this.selectedObj = { ...this.selectedObj, ...param.change }
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 分页改变的时候
     */
    tablePageChange (param) {
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.model.tableInfo.pageNum = param.pageNum
      this.model.tableInfo.pageSize = param.pageSize
      if (this.query) {
        this.query()
      }
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表行点击事件处理
     */
    formTableRowClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 双击行时，默认选中的对象修改为当前行，并打开浏览窗口
     */
    formTableRowDblClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 列表单元格点击事件处理
     */
    formTableCellClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 列表单元格双击事件处理
     */
    formTableCellDblClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 打开链接，暂时支持查看当前明细
     */
    formTableLinkClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 列表排序处理
     */
    formTableSortChange (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 标题点击
     */
    formTableHeaderClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 行右键
     */
    formTableRowContextmenu (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 标题右键
     */
    formTableHeaderContextmenu (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 选中行修改时
     */
    formTableSelectionChange (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 全选事件
     */
    formTableSelectAll (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 单选一行
     */
    formTableSelectOne (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段点击后处理事件
     */
    formTableFieldClick (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段失去焦点后处理事件
     */
    formTableFieldBlur (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段获得焦点后处理事件
     */
    formTableFieldFocus (param) {
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单字段修改内容后处理事件
     */
    formTableFieldValueChange (param) {
      param.change = param.$event.change
      this.selectGrp = param.grp
      this.selectedObj = { ...this.selectedObj, ...param.change }
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单中列表分页改变的时候
     */
    formTablePageChange (param) {
      this.model.tableInfo.pageNum = param.pageNum
      this.model.tableInfo.pageSize = param.pageSize
      if (this.query) {
        this.query()
      }
      this.event(formevent, param.eventname, param)
    },
    event (parentevent, eventname, param) {
      param.tableInfo = this.model.tableInfo
      this.$emit(parentevent, {
        eventname,
        ref: this.$refs.form,
        ...param
      })
    }
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  .el-dialog__body{
    background-color: #f1f1f1;
  }
  flex-direction: column;
  .table {
    flex: 1;
    display: flex;
    margin-bottom: 0;
    .tree {
      width: 150px
    }
    .content {
      flex:1;
    }
  }
  .toolbar{
    display: flex;
    justify-content: flex-start;
  }
}
</style>
