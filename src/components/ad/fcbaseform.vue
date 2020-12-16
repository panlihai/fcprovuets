<template>
  <div>
    <el-form
      size="mini"
      label-width="120px"
      label-position="right"
      ref="form"
      :model="mainObj"
      :rules="rules"
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
              :prop="field.fieldCode"
              :class="field.inputType"
              @click.native="labelClick(field)"
              :required="field.isrequired === true"
              class="form-field"
            >
              <!-- 提示 -->
              <template v-slot:label v-if="field.inputType !== 'check'">
                <el-tooltip
                  class="field"
                  effect="dark"
                  :content="field.description"
                  placement="left"
                  v-if="field.description"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
                <label v-text="field.fieldName" />
              </template>
              <!-- 数值 -->
              <el-input-number
                :clearable="true"
                v-if="field.inputType === 'long'"
                v-model="mainObj[field.fieldCode]"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请填写' + field.fieldName"
              />
              <el-input-number
                :clearable="true"
                v-else-if="field.inputType === 'double'"
                precision="2"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                v-model="mainObj[field.fieldCode]"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请填写' + field.fieldName"
              />
              <el-date-picker
                :clearable="true"
                v-else-if="field.inputType === 'date'"
                v-model="mainObj[field.fieldCode]"
                align="right"
                type="date"
                :readonly="field.readonly||false"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请选择' + field.fieldName"
              >
              </el-date-picker>
              <el-date-picker
                :clearable="true"
                v-else-if="field.inputType === 'datetime'"
                v-model="mainObj[field.fieldCode]"
                type="datetime"
                align="right"
                :readonly="field.readonly||false"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请选择' + field.fieldName"
              >
              </el-date-picker>
              <el-time-select
                :clearable="true"
                v-else-if="field.inputType === 'time'"
                v-model="mainObj[field.fieldCode]"
                align="right"
                type="date"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                :readonly="field.readonly||false"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请选择' + field.fieldName"
              >
              </el-time-select>
              <!-- 文本框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'text'"
                v-model="mainObj[field.fieldCode]"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                :readonly="field.readonly||false"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请输入' + field.fieldName"
              />
              <!-- 大文本框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'textarea'"
                rows="2"
                :readonly="field.readonly||false"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                v-model="mainObj[field.fieldCode]"
                @change="valueChange(field, $event)"
                :placeholder="'请输入' + field.fieldName"
              />
              <!-- 弹出框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'table'"
                prefix-icon="el-icon-search"
                v-model="mainObj[field.fieldCode]"
                :disabled="field.readonly||false"
                readonly
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请选择' + field.fieldName"
              ></el-input>
              <!-- 弹出框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'city'"
                prefix-icon="el-icon-search"
                v-model="mainObj[field.fieldCode]"
                :disabled="field.readonly||false"
                readonly
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请选择' + field.fieldName"
              ></el-input>
              <!-- 选择框 -->
              <el-select
                :clearable="true"
                v-else-if="field.inputType === 'select'"
                v-model="mainObj[field.fieldCode]"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                :placeholder="'请选择' + field.fieldName"
                @change="valueChange(field, $event)"
              >
                <template v-if="field.dicCode">
                  <el-option
                    v-for="opt of vm.select[field.dicCode]"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  ></el-option>
                </template>
              </el-select>
              <!-- 单选框 -->
              <el-checkbox
                :clearable="true"
                v-else-if="field.inputType === 'check'"
                v-model="mainObj[field.fieldCode]"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                @change="valueChange(field, $event)"
              ></el-checkbox>
              <!-- 多选框 -->
              <el-checkbox-group
                :clearable="true"
                v-else-if="field.inputType === 'checkGroup'"
                v-model="mainObj[field.fieldCode]"
                :readonly="field.readonly||false"
                :disabled="field.readonly||false"
                @change="valueChange(field, $event)"
              >
                <template v-if="field.dicCode">
                  <el-checkbox
                    v-for="opt of vm.select[field.dicCode]"
                    :key="opt.value"
                    :label="opt.value"
                    >{{ opt.label }}</el-checkbox
                  >
                </template>
              </el-checkbox-group>
              <label v-text="mainObj[field.fieldCode]" v-else-if="field.inputType === 'label'" />
              <!-- 提示 -->
              <template v-slot:label v-if="field.inputType === 'check'">
                <el-tooltip
                  class="field"
                  effect="dark"
                  :content="field.description"
                  placement="left"
                  v-if="field.description"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
                <label v-text="field.fieldName" />
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      width="70%"
      :before-close="dialogClose"
      append-to-body
    >
      <ys-table
        :model="dialogVm"
        :height="height"
        @selectionchange="dialogSelectionChange"
      ></ys-table>
      <div class="toolbar">
        <ys-toolbar :toolbar="dialogToolbar" @click="dialogToolbarEvent"></ys-toolbar>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ViewModel from '../../config/list-form'
import ysTable from './fctable'
import ysToolbar from './fctoolbar'

export default {
  name: 'fcBaseform',
  components: { ysTable, ysToolbar },
  props: {
    inforow: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      vm: { ...ViewModel },
      mainObj: {},
      selectObjs: [],
      selectObj: {},
      dialogVisible: false,
      dialogTitle: '',
      height: document.body.clientHeight - 250,
      dialogVm: {},
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
      ]
    }
  },
  created () {
    this.mainObj = { ...this.value }
  },
  computed: {},
  watch: {
    value () {
      this.mainObj = { ...this.value }
    },
    readonlyfields () {

    },
    hiddenfields () {
    },
    requiredfields () {
    }
  },
  methods: {
    // 弹窗选择其它数据
    dialogClose () {
      this.dialogVisible = !this.dialogVisible
    },
    openDialog () {},
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
     * 值修改时触发
     */
    valueChange (field, value) {
      const change = {}
      change[field.fieldCode] = value
      this.event('change', { change })
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
          this.dialogVm = {
            fields: [],
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
                  fldGroupName: '基本信息',
                  // 区域编码
                  fldGroupCode: 'basic',
                  type: 'links',
                  // 显示字段
                  fields: [{
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
      if (param.field === undefined || param.field.readonly === undefined) {
        this.$emit(eventname, {
          eventname,
          ...param,
          ref: this.$refs.form,
          value: this.mainObj
        })
      }
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
