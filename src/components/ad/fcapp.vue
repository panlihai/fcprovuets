<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="ysapp">
    <div class="search">
      <ys-search :model="vm" :value="searchObj" @toolbar="queryToolbar" @change="query"></ys-search>
    </div>
    <div class="toolbar">
      <ys-toolbar @click="toolbar" :toolbar="vm.tableInfo.toolbar"></ys-toolbar>
    </div>
    <div class="table" :style="{height:height+'px'}">
      <ys-table :model="vm" :height="height" :isloading="isLoading" :value="value" @toolbar="tableToolbar" @cellclick="tableCellClick"
       @celldblclick="tableCellDblClick" @rowclick="tableRowClick" @rowdblclick="tableRowDblClick"
       @sortchange="tableSortChange" @headerclick="tableHeaderClick" @rowcontextmenu="tableRowContextmenu"
       @headercontextmenu="tableHeaderContextmenu" @selectionchange="tableSelectionChange" @selectall="tableSelectAll"
       @select="tableSelectOne" @pagechange="tablePageChange" @linkclick="tableLinkClick"></ys-table>
    </div>
    <div class="footer">
      <el-pagination v-if="vm.tableInfo.pagination==='out'"
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        @prev-click="prevPage"
        @next-click="nextPage"
        :current-page="vm.tableInfo.pageNum"
        :page-sizes="[20, 50, 100, 200, 300, 500, 1000]"
        :page-size="vm.tableInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="vm.tableInfo.totalSize">
      </el-pagination>
    </div>
    <el-dialog :title="vm.formInfo.title" :visible="formShow" width="100%" :before-close="formClose">
      <ys-form :model="vm" :value="selectedObj" @labelclick="formFieldLabelClick" @grouptoolbar="formGroupToolbar"
      @toolbar="formToolbar" @click="formFieldClick" v-if="formShow"
      @blur="formFieldBlur" @focus="formFieldFocus" @change="formFieldValueChange"></ys-form>
    </el-dialog>
    <el-dialog :title="vm.viewInfo.title" :visible="viewShow" width="100%" :before-close="viewClose">
      <ys-view :model="vm" :value="selectedObj" @labelclick="formFieldLabelClick" @grouptoolbar="formGroupToolbar"
      @toolbar="viewToolbar" @click="formFieldClick" v-if="viewShow"
      @blur="formFieldBlur" @focus="formFieldFocus" @change="formFieldValueChange"></ys-view>
    </el-dialog>
  </div>
</template>

<script>
import ViewModel from '../../config/list-form'
import ysForm from './fcform'
import ysToolbar from './fctoolbar'
import ysView from './fcview'
import ysSearch from './fcsearch'
import ysTable from './fctable'

export default {
  name: 'fcApp',
  components: {
    ysForm,
    ysView,
    ysSearch,
    ysTable,
    ysToolbar
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    methods: {
      type: Object,
      default: () => ViewModel.methods
    }
  },
  data () {
    return {
      // 查询条件
      searchObj: {},
      // 选中的对象
      selectedObj: {},
      // 选择的所有对象
      selectedObjs: [],
      // 表高的设置
      height: document.body.clientHeight - 169 - 47,
      vm: { ...ViewModel },
      select: { ...ViewModel.select },
      viewShow: false,
      formShow: false,
      isLoading: false
    }
  },
  created () {
    // 初始化方法
    Object.keys(this.methods).forEach((key) => {
      this[key] = this.methods[key]
    })
    if (this.query) {
      this.query()
    } else {
      console.error('请编写查询方法')
    }
  },
  computed: {},
  watch: {
    model () {
    },
    value () {}
  },
  methods: {
    // 公共方法
    // ...this.vm.methods,
    /**
     * 查询工具栏
     */
    queryToolbar (param) {
      switch (param.eventname) {
        case 'showmore':
          this.height = document.body.clientHeight - 169 - 47 * this.vm.searchInfo.viewRowSize
          return
        case 'reset':
          this.searchObj = {}
          break
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param)
          } else {
            console.log(param.eventname, '未处理方法', param)
          }
      }
    },
    /**
     * 分页改变的时候
     */
    tablePageChange (param) {
      this.vm.tableInfo.pageNum = param.pageNum
      this.vm.tableInfo.pageSize = param.pageSize
      this.query()
    },
    /**
     * 分页大小改变时,跳转到第一页
     */
    pageSizeChange (pageSize) {
      this.vm.tableInfo.pageSize = pageSize
      this.tablePageChange({
        eventname: 'pagesizeChange',
        name: '页偏移量改变',
        pageSize,
        pageNum: 1
      })
    },
    /**
     * 页数改变时
     */
    pageNumChange (pageNum) {
      this.vm.tableInfo.pageNum = pageNum
      this.tablePageChange({
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
      this.tablePageChange({
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
      this.tablePageChange({
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize
      })
    },
    /**
     * 工具栏事件
     */
    toolbar (param) {
      const btn = param.btn
      switch (btn.btnAct) {
        case 'add':
          this.formShow = true
          this.selectedObj = {}
          break
        case 'delete':
          if (this.selectedObjs.length !== 0) {
            // 提示确认删除
            this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.delete(this.selectedObjs).then((result) => {
                if (result) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.query()
                  this.afterDelete()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else {
            this.$message({
              message: '请选中数据后再操作',
              type: 'warning'
            })
          }
          break
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param)
          } else {
            console.log(param.eventname, '未处理方法', param)
          }
      }
    },
    /**
     * 查看窗口关闭
     */
    viewClose () {
      this.viewShow = false
    },
    /**
     * 编辑窗口关闭
     */
    formClose () {
      this.formShow = false
    },
    /**
     * 表单分区或分组工具栏事件
     */
    formGroupToolbar (param) {
      switch (param.btn.btnAct) {
        case 'add':
          return
        default:
          // 默认方法
          if (this[param.grp.fldGroupCode.toLowerCase() + param.btn.btnAct]) {
            this[param.grp.fldGroupCode.toLowerCase() + param.btn.btnAct](param)
          } else {
            console.error(`未在当前组件中发现处理的逻辑方法，请在组件中编写方法${param.grp.fldGroupCode.toLowerCase()}${param.btn.btnAct}`, param)
          }
      }
    },
    /**
     * 字段标题点击
     */
    formFieldLabelClick (param) {
      console.log(param)
    },
    /**
     * 视图工具栏事件
     */
    viewToolbar (param) {
      const btn = param.btn
      switch (btn.btnAct) {
        case 'close':
          this.viewClose()
          break
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param)
          } else {
            console.error(`未在当前组件中发现处理的逻辑方法，请在组件中编写方法${param.eventname}`, param)
          }
      }
    },
    /**
     * 表单工具栏事件
     */
    formToolbar (param) {
      const btn = param.btn
      switch (btn.btnAct) {
        case 'close':
          this.formClose()
          break
        case 'save':
          this.beforeSave().then(() => {
            this.save().then((result) => {
              if (result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.query()
                this.afterSave()
              }
            })
          })
          break
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param)
          } else {
            console.error(`未在当前组件中发现处理的逻辑方法，请在组件中编写方法${param.eventname}`, param)
          }
      }
    },
    /**
     * 表单字段点击后处理事件
     */
    formFieldClick (param) {
      console.log(param)
    },
    /**
     * 表单字段获得焦点后处理事件
     */
    formFieldBlur (param) {
      console.log(param)
    },
    /**
     * 表单字段离开焦点后处理事件
     */
    formFieldFocus (param) {
      console.log(param)
    },
    /**
     * 表单字段修改内容后处理事件
     */
    formFieldValueChange (param) {
      this.selectedObj = { ...param.value }
    },
    /**
     * 列表工具栏事件
     */
    tableToolbar (param) {
      this.selectedObj = param.value
      switch (param.eventname) {
        case 'viewOne':
          this.viewShow = true
          break
        case 'edit':
          this.beforeEdit().then(() => {
            this.formShow = true
          })
          break
        case 'delete':
          // 提示确认删除
          this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delete([this.selectedObj]).then((result) => {
              if (result) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.query()
                this.afterDelete()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param)
          } else {
            console.error(`未在当前组件中发现处理的逻辑方法，请在组件中编写方法${param.eventname}`, param)
          }
      }
    },
    /**
     * 列表行点击事件处理
     */
    tableRowClick () {
    },
    /**
     * 双击行时，默认选中的对象修改为当前行，并打开浏览窗口
     */
    tableRowDblClick (param) {
      this.viewShow = true
      this.selectedObj = param.value
    },
    /**
     * 列表单元格点击事件处理
     */
    tableCellClick () {
    },
    /**
     * 列表单元格双击事件处理
     */
    tableCellDblClick () {
    },
    /**
     * 打开链接，暂时支持查看当前明细
     */
    tableLinkClick (param) {
      this.selectedObj = param.value
      this.viewShow = true
    },
    /**
     * 列表排序处理
     */
    tableSortChange (param) {
      console.log(param)
    },
    /**
     * 标题点击
     */
    tableHeaderClick (param) {
      console.log(param)
    },
    /**
     * 行右键
     */
    tableRowContextmenu (param) {
      console.log(param)
    },
    /**
     * 标题右键
     */
    tableHeaderContextmenu (param) {
      console.log(param)
    },
    /**
     * 选中行修改时
     */
    tableSelectionChange (param) {
      this.selectedObjs = param.value
    },
    /**
     * 全选事件
     */
    tableSelectAll (param) {
      this.selectedObjs = param.value
    },
    /**
     * 单选一行
     */
    tableSelectOne (param) {
      this.selectedObj = param.value
    }
  }
}
</script>

<style lang="scss">
.ysapp {
  display: flex;
  flex-direction: column;
  .search {
  }
  .table {
    flex: 1;
  }
  .toolbar{
    display: flex;
    justify-content: flex-start;
  }
}
</style>
