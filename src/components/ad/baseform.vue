<template>
  <div>
    <el-form
      size="mini"
      label-width="120px"
      label-position="right"
      ref="form"
      :model="mainObj"
      :rules="rule"
    >
      <template v-if="inforow && inforow.length !== 0">
        <el-row v-for="(row, rowIndex) of inforow" :key="rowIndex">
          <el-col
            v-for="(field, colIndex) of row"
            :span="field.span"
            :key="colIndex"
          >
            <el-form-item
              :label="field.fieldName"
              :prop="field.tableName+'___'+field.fieldCode"
              :class="field.inputType"
              @click="labelClick(field)"
              :required="field.isrequired === true"
              class="form-field"
            >
              <fcbasefield :field="field" :value="mainObj"
                @click="fieldClick(field)"
                @dblclick="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :rules="rule">
              </fcbasefield>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <slot name="formchild"></slot>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      width="70%"
      :before-close="dialogClose"
      append-to-body
    >
      <fcsearch :model="dialogVm" :value="searchObj" @toolbar="queryToolbar" @change="queryToolbar"></fcsearch>
      <fctable
        :model="dialogVm"
        :height="height"
        @selectionchange="dialogSelectionChange"
      ></fctable>
      <div class="toolbar">
        <fctoolbar :toolbar="dialogToolbar" @click="dialogToolbarEvent"></fctoolbar>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ViewModel from './list-form'
import fctable from './table'
import fcsearch from './search'
import fctoolbar from './toolbar'
import fcbasefield from './field'

export default {
  name: 'fcbaseform',
  components: {
    fctable,
    fctoolbar,
    fcsearch,
    fcbasefield
  },
  props: {
    inforow: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      // 模型
      vm: { ...ViewModel },
      // 数据对象
      mainObj: this.value,
      // 查询条件
      searchObj: {},
      // 弹窗多选的
      selectObjs: [],
      // 弹窗单选的
      selectObj: {},
      // 文件列表
      fileList: {},
      // 弹窗是否显示
      dialogVisible: false,
      // 弹窗标题
      dialogTitle: '',
      // 表单高度
      height: document.body.clientHeight - 350 - 47,
      // 弹窗模型
      dialogVm: {},
      // 弹窗工具栏
      dialogToolbar: [
        {
          btnCode: 'btnConfirm',
          btnName: '确定',
          btnAct: 'confirm'
        },
        {
          btnCode: 'btnClose',
          btnName: '关闭',
          btnAct: 'close'
        }
      ],
      rule: this.rules
    }
  },
  watch: {
    rules: {
      handler () {
        this.rule = this.rules
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 弹窗选择其它数据
    dialogClose () {
      this.dialogVisible = !this.dialogVisible
    },
    /**
     * 弹窗准备数据
     */
    openDialog () {
      this.dialogVm = {
        fields: [],
        searchInfo: {
          // 标题
          title: '模型查询条件',
          // 分几列
          columnSize: 3,
          // 默认显示一行，其它的隐藏，当只有一行时则隐藏展开合起
          viewRowSize: 1,
          // 默认显示第一条
          viewMore: false,
          // 查询字段
          fields: [
            {
              // 字段编码
              fieldCode: 'APPID',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型编码',
              // 所占列数，不能跨行
              column: 1
            }, {
              // 字段编码
              fieldCode: 'APPNAME',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型名称',
              // 所占列数，不能跨行
              column: 1
            }, {
              // 字段编码
              fieldCode: 'ENABLE',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '是否启用',
              // 所占列数，不能跨行
              column: 1
            }, {
              // 字段编码
              fieldCode: 'APPID',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型编码',
              // 所占列数，不能跨行
              column: 1
            }, {
              // 字段编码
              fieldCode: 'APPNAME',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型名称',
              // 所占列数，不能跨行
              column: 2
            }, {
              // 字段编码
              fieldCode: 'ENABLE',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '是否启用',
              // 所占列数，不能跨行
              column: 1
            }
          ],
          // 工具栏
          toolbar: [
            {
              btnCode: 'btnQuery',
              btnName: '查询',
              btnAct: 'query',
              bustype: 'query'
            },
            {
              btnCode: 'btnQuery',
              btnName: '重置',
              btnAct: 'reset',
              bustype: 'reset'
            }
          ]
        },
        tableInfo: {
          // 标题
          title: '请选择数据',
          // 请求参数
          requestUrl: '',
          // 是否可多选
          selection: true,
          // 是否开启内部分页，in：table组件内部分页；out：外部分页，自定义分页
          pagination: 'in',
          // 当前页数
          pageNum: 1,
          // 页偏移量
          pageSize: 20,
          // 列表分组
          fldGroup: [
            {
              // 区域标题
              title: '基本信息',
              // 区域编码
              fldGroupCode: 'basic',
              type: 'links',
              // 显示字段
              fields: [
                {
                  // 字段编码
                  fieldCode: 'APPNAME'
                },
                {
                  // 字段编码
                  fieldCode: 'ENABLE'
                }
              ]
            }
          ],
          trans: [
            {
              from: 'APPNAME',
              to: 'APPID'
            }
          ]
        }
      }
      this.dialogVisible = true
    },
    // 弹窗后的数据选择
    dialogSelectionChange (event) {
      this.selectObjs = event.value
      // 把数据内容写入到主对象
      this.dialogClose()
    },
    /**
     * 弹窗选择工具栏事件处理
     */
    dialogToolbarEvent (param) {
      if (param.eventname === 'confirm') {
        // 执行写入主对象
      }
      this.dialogClose()
    },
    /**
     * 弹窗查询
     */
    queryToolbar (param) {
      switch (param.eventname) {
        case 'showmore':
          this.height = document.body.clientHeight - 350 - 47 * this.dialogVm.searchInfo.viewRowSize
          return
        case 'reset':
          this.searchObj = {}
        // eslint-disable-next-line no-fallthrough
        case 'search':
          break
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param)
          }
      }
      this.event(param.eventname, { ...param })
    },
    /**
     * 值修改时触发
     */
    valueChange (field, value) {
      this.mainObj = { ...this.mainObj, ...value.change }
      this.event('change', {
        field, change: value.change, data: this.mainObj, ...value
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
    // 查询条件展开及收起
    searchShow () {
      if (this.vm.searchInfo.viewRowSize === 1) {
        this.vm.searchInfo.viewRowSize = this.vm.searchInfo.infoRow.length
      } else {
        this.vm.searchInfo.viewRowSize = 1
      }
      this.vm.initSearchModel(
        this.vm.searchInfo,
        this.vm.fields,
        this.vm.searchInfo.viewRowSize !== 1
      )
      this.event('toolbar', {
        eventname: 'showmore',
        isshow: this.vm.searchInfo.viewRowSize
      })
    },
    /**
     * 点击标题处理
     */
    labelClick (field) {
      this.event('labelclick', { field })
    },
    /**
     * 单击输入框处理
     */
    fieldClick (field) {
      if (field.inputType === 'table') {
        if (field === undefined || field.readonly === undefined) {
          this.openDialog(field)
        }
      }
      this.event('click', { field })
    },
    fieldDblclick (field) {
      this.event('dblClick', { field })
    },
    fieldBlur (field) {
      this.event('blur', { field })
    },
    fieldFocus (field) {
      this.event('focus', { field, value: this.mainObj, ref: this.$refs.form })
    },
    search ($event) {
      this.event('toolbar', { eventname: 'search', event: $event })
    },
    reset ($event) {
      this.$refs.form.resetFields()
      this.event('toolbar', { eventname: 'reset', event: $event })
    },
    event (eventname, param) {
      this.$emit(eventname, {
        eventname,
        value: this.mainObj,
        ...param,
        ref: this.$refs.form
      })
    }
  }
}
</script>
<style>
.el-pagination {
  text-align: center;
}

.toolbar {
  text-align: center;
}

</style>
