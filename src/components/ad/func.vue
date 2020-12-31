<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="app">
    <div class="table" :style="{height:height+'px'}">
      <div class="content">
        <fctable :tableInfo="tableInfo" :fields="tableFields" :height="height" :isloading="isLoading"
          :value="this.value" @toolbar="tableToolbar" @cellclick="tableCellClick"
          @celldblclick="tableCellDblClick" @rowclick="tableRowClick" @rowdblclick="tableRowDblClick"
          @sortchange="tableSortChange" @headerclick="tableHeaderClick" @rowcontextmenu="tableRowContextmenu"
          @headercontextmenu="tableHeaderContextmenu" @selectionchange="tableSelectionChange" @selectall="tableSelectAll"
          @select="tableSelectOne" @pagechange="tablePageChange" @linkclick="tableLinkClick" @change="tableFieldValueChange"></fctable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ViewModel from './list-form'
import fctable from './table'
import store from '@/store'
import { useRoute } from 'vue-router'
import Model from '@/api/model'

const tableevent = 'tableevent'
const toolbarevent = 'toolbarevent'
const viewevent = 'viewevent'
const formevent = 'formevent'
const queryevent = 'queryevent'

export default {
  name: 'fcapp',
  components: {
    fctable
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
      select: { ...ViewModel.select },
      methods: { ...ViewModel.methods },
      isLoading: false,
      formShow: false,
      viewShow: false,
      appId: '',
      appModel: {},
      tableInfo: {},
      tableFields: [],
      formInfo: {},
      viewInfo: {},
      searchInfo: {}
    }
  },
  watch: {
    model () {
      this.init()
    }
  },
  computed: {
    ...mapState('model', {
      app: state => state
    }),
    ...mapState('system', {
      system: state => state
    })
  },
  created () {
    window.onresize = () => {
      // this.height = document.body.clientHeight - 169 - 47
    }
    this.appId = useRoute().params.APPID
    // store.dispatch('model/initapp', { AID: this.appId, PID: this.system.pid }).then(() => {
    //   this.appModel = this.app[this.appId]
    //   this.init()
    // })
    this.init()
  },
  methods: {
    init () {
      this.query()
    },
    /**
     * 查询方法
     * 利用查询条件（searchObj对象）及分页条件（pagination对象）拼装条件查询后端
     */
    query () {
      this.isLoading = false
      this.value = []
      if (this.tableInfo === undefined) {
        return
      }
      store.dispatch('model/query', {
        AID: this.appId,
        PAGENUM: this.tableInfo.pageNum || 1,
        PAGESIZE: this.tableInfo.pageSize || 20
      }).then((result) => {
        this.tableInfo = Model.toTable(result.MODEL)
        this.tableFields = ViewModel.initTableModel(this.tableInfo)
        result.DATA.forEach((d, index) => {
          d.rownum = index + 1
        })
        this.value = [...result.DATA]
        this.tableInfo.totalSize = result.TOTALSIZE
        // })
      }).catch((result) => {
        console.log(result)
      }).finally(() => {
        this.isLoading = false
      })
    },
    /**
     * 删除操作之前的处理，可校验是否可以删除，返回ture进行下一步，返回false则放弃
     */
    beforeDelete () {
      return new Promise((resolve) => {
        this.$http.get(`/server/api/SYSTEM/SYSMODEL/listinfo?AID=SYSAPP&PAGENUM=${this.tableInfo.pageNum}&PAGESIZE=${this.tableInfo.pageSize}`).then(() => {
          resolve(true)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        }).catch(() => {})
      })
    },
    /**
     * 删除操作
     * @param {*} delObjs 删除多个对象
     */
    delete (delObjs) {
      return new Promise((resolve) => {
        resolve(delObjs)
      })
    },
    /**
     * 删除之后执行自定义操作
     */
    afterDelete () {
      console.log()
    },
    /**
     * 点击编辑按钮后，打开弹窗前执行的操作，在此可以校验是否可以编辑，返回ture进行下一步，返回false则放弃
     * 自定义校验规则
     * 数据对象为this.selectObj
     */
    beforeEdit () {
      return new Promise((resolve) => {
        resolve({})
      })
    },
    /**
     * 点击保存之前的操作，可以做校验，调整数据内容，返回ture则可以提交保存，返回false则放弃保存
     * 数据对象为this.selectObj
     */
    beforeSave () {
      console.log()
    },
    /**
     * 保存操作，此操作执行完后将执行方法this.query()
     */
    save () {
      return new Promise((resolve) => {
        resolve({})
      })
    },
    /**
     * 保存完成后执行的操作，不论是否成功都将执行
     */
    afterSave () {
      console.log()
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])
      let hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }
      setTimeout(() => {
        let data
        if (hasChild) {
          data = [{
            name: `zone${this.count++}`
          }, {
            name: `zone${this.count++}`
          }]
        } else {
          data = []
        }
        resolve(data)
      }, 500)
      return ''
    },
    // 公共方法
    // ...this.methods,
    /**
     * 查询工具栏
     */
    queryToolbar (param) {
      switch (param.eventname) {
        case 'showmore':
          this.height = document.body.clientHeight - 169 - 47 * this.searchInfo.viewRowSize
          break
        case 'reset':
          this.searchObj = {}
        // eslint-disable-next-line no-fallthrough
        case 'search':
          this.query()
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
      if (param.btn) {
        switch (param.btn.btnAct) {
          case 'listAdd':
            this.formShow = true
            break
          default:
        }
      }
      this.event(toolbarevent, param.btn.btnAct, param)
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
      this.event(formevent, param.eventname, param)
    },
    /**
     * 列表工具栏事件
     */
    tableToolbar (param) {
      this.selectedObj = param.value
      switch (param.eventname) {
        case 'viewOne':
          this.formShow = true
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
      this.selectedObj = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 双击行时，默认选中的对象修改为当前行，并打开浏览窗口
     */
    tableRowDblClick (param) {
      this.selectedObj = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表单元格点击事件处理
     */
    tableCellClick (param) {
      this.selectedObj = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表单元格双击事件处理
     */
    tableCellDblClick (param) {
      this.selectedObj = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 打开链接，暂时支持查看当前明细
     */
    tableLinkClick (param) {
      this.selectedObj = param.value
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
      this.selectedObjs = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 全选事件
     */
    tableSelectAll (param) {
      this.selectedObjs = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 单选一行
     */
    tableSelectOne (param) {
      this.selectedObj = param.value
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 列表修改值后的事件
     */
    tableFieldValueChange (param) {
      param.change = param.$event.change
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.event(tableevent, param.eventname, param)
    },
    /**
     * 分页改变的时候
     */
    tablePageChange (param) {
      param.fldGroupCode = this.model.tableInfo.fldGroupCode
      this.tableInfo.pageNum = param.pageNum
      this.tableInfo.pageSize = param.pageSize
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
      this.event(formevent, param.eventname, param)
    },
    /**
     * 表单中列表分页改变的时候
     */
    formTablePageChange (param) {
      this.tableInfo.pageNum = param.pageNum
      this.tableInfo.pageSize = param.pageSize
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
  flex-direction: column;
  .search {
  }
  .table {
    flex: 1;
    display: flex;
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
