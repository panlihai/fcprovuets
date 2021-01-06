<template>
  <div>
    <!-- 提示 -->
    <template v-if="field.inputType !== 'check' && showlabel === true">
      <el-tooltip
        class="field"
        effect="dark"
        :content="field.description"
        placement="left"
        v-if="field.description"
      >
        <i class="el-icon-info"></i>
      </el-tooltip>
      <label v-text="field.fieldName" :title="fieldCode"/>
    </template>
    <!-- 数值 -->
    <el-input-number
      :clearable="true"
      v-if="field.inputType === 'long'"
      v-model="mainObj[fieldCode]"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      :disabled="field.readonly || field.disabled || false"
      :readonly="field.readonly || false"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请填写' + field.fieldName):''"

    />
    <el-input-number
      :clearable="true"
      v-else-if="field.inputType === 'double'"
      precision="2"
      :disabled="field.readonly || field.disabled || false"
      :readonly="field.readonly || false"
      v-model="mainObj[fieldCode]"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请填写' + field.fieldName):''"
    />
    <el-date-picker
      :clearable="true"
      v-else-if="field.inputType === 'date'"
      v-model="mainObj[fieldCode]"
      align="right"
      type="date"
      :disabled="field.readonly || field.disabled || false"
      :readonly="field.readonly || false"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请选择' + field.fieldName):''"
    >
    </el-date-picker>
    <el-date-picker
      :clearable="true"
      v-else-if="field.inputType === 'datetime'"
      v-model="mainObj[fieldCode]"
      type="datetime"
      align="right"
      :disabled="field.readonly || field.disabled || false"
      :readonly="field.readonly || false"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请选择' + field.fieldName):''"
    >
    </el-date-picker>
    <el-time-select
      :clearable="true"
      v-else-if="field.inputType === 'time'"
      v-model="mainObj[fieldCode]"
      align="right"
      type="date"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      :disabled="field.readonly || field.disabled || false"
      :readonly="field.readonly || false"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请选择' + field.fieldName):''"
    >
    </el-time-select>
    <!-- 大文本框 -->
    <el-input
      :clearable="true"
      v-else-if="field.inputType === 'textarea'"
      rows="2"
      :disabled="field.disabled || false"
      :readonly="field.readonly || false"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      @focus="focus(field)"
      v-model="mainObj[fieldCode]"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请输入' + field.fieldName):''"
    />
    <!-- 弹出框 -->
    <el-input
      :clearable="true"
      v-else-if="field.inputType === 'table'"
      prefix-icon="el-icon-search"
      v-model="mainObj[fieldCode]"
      :disabled="field.readonly || field.disabled || false"
      readonly
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请选择' + field.fieldName):''"
    ></el-input>
    <!-- 弹出框 -->
    <el-input
      :clearable="true"
      v-else-if="field.inputType === 'city'"
      prefix-icon="el-icon-search"
      v-model="mainObj[fieldCode]"
      :disabled="field.readonly || field.disabled || false"
      readonly
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :placeholder="field.placeholder===undefined?('请选择' + field.fieldName):''"
    ></el-input>
    <!-- 选择框 -->
    <el-select
      :clearable="true"
      v-else-if="field.inputType === 'select'"
      v-model="mainObj[fieldCode]"
      :disabled="field.disabled || false"
      :readonly="field.readonly || false"
      :placeholder="field.placeholder===undefined?('请选择' + field.fieldName):''"
      @change="valueChange(field, $event)"
    >
      <template v-if="field.dicCode">
        <el-option
          v-for="opt of select[field.dicCode]"
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
      v-model="mainObj[fieldCode]"
      :disabled="field.readonly || field.disabled || false"
      :readonly="field.readonly || false"
      @change="valueChange(field, $event)"
    ></el-checkbox>
    <!-- 多选框 -->
    <el-checkbox-group
      :clearable="true"
      v-else-if="field.inputType === 'checkGroup'"
      v-model="mainObj[fieldCode]"
      :readonly="field.readonly || false"
      :disabled="field.readonly || field.disabled || false"
      @change="valueChange(field, $event)"
    >
      <template v-if="field.dicCode">
        <el-checkbox
          v-for="opt of select[field.dicCode]"
          :key="opt.value"
          :label="opt.value"
          >{{ opt.label }}</el-checkbox
        >
      </template>
    </el-checkbox-group>
    <el-upload
      v-else-if="field.inputType === 'uploadfile'"
      class="avatar-uploader"
      action=""
      :show-file-list="true"
      :auto-upload="false"
      :readonly="field.readonly || false"
      :disabled="field.readonly || field.disabled ||false"
      :on-change="getFile"
      :on-remove="removeFile"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <label
      v-text="mainObj[fieldCode]"
      v-else-if="field.inputType === 'label'"
    />
    <div v-else-if="field.inputType === 'searchBtn'">
      <i
        class="el-icon-arrow-left extend"
        @click="searchShow(true)" title="点击展开"
        v-if="viewRowSize === 1 && maxrow!==1"
      ></i>
      <i class="el-icon-arrow-up extend" @click="searchShow($event)" v-if="viewRowSize !== 1"  title="点击收起"></i>
      <el-button
        type="primary" size="mini"
        @click="search($event)"
        icon="el-icon-search"
        >查询</el-button
      ><el-button @click="reset($event)"  size="mini" icon="el-icon-refresh">重置</el-button>
    </div>
    <div v-else-if="field.inputType === 'space'"></div>
    <!-- 文本框 -->
    <el-input
      :clearable="true"
      v-else
      v-model="mainObj[fieldCode]"
      @click="click(field)"
      @dblclick="dblclick(field)"
      @blur="blur(field)"
      :disabled="field.disabled || false"
      :readonly="field.readonly || false"
      @focus="focus(field)"
      @change="valueChange(field, $event)"
      :title="field.placeholder||'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
      :placeholder="field.placeholder===undefined?('请输入' + field.fieldName):''"
    />
  </div>
</template>
<script>
export default {
  name: 'fcbasefield',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    showlabel: {
      type: Boolean,
      default: () => true
    },
    field: {
      type: Object,
      default: () => ({})
    },
    // 在查询的时候显示默认的行数
    viewRowSize: {
      type: Number,
      default: () => 1
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    // 查询时最大行数
    maxrow: {
      type: Number,
      default: () => 1
    }
  },
  data () {
    return {
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
      select: {
      },
      fieldCode: '',
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
  /**
   * 数据初始化 字典初始化
   */
  created () {
    const promiseAll = []
    this.fieldCode = this.field.tableName === undefined ? this.field.fieldCode : (`${this.field.tableName}___${this.field.fieldCode}`)
    const fields = [this.field]
    switch (this.field.inputType) {
      case 'combo':
      case 'radio':
      case 'select':
        promiseAll.push(
          this.$http.get(
            this.field.requesturl,
            this.field.requestparam || {},
            this.field.requestbody || {}
          )
        )
        break
      default:
    }
    Promise.all(promiseAll).then((results) => {
      results.forEach((result, index) => {
        const fld = fields[index]
        if (
          result[fld.selectedkeymap.resultNodeCode] ===
          fld.selectedkeymap.resultCodeValue
        ) {
          const option = []
          if (fld.selectedkeymap.childNodeName) {
            // 取出list的值作为列表
            result[fld.selectedkeymap.parentNodeName][
              fld.selectedkeymap.childNodeName
            ].forEach((item) => {
              option.push({
                label: item[fld.selectedkeymap.labelCode],
                value: item[fld.selectedkeymap.valueCode]
              })
            })
          } else {
            // 取出list的值作为列表
            result[fld.selectedkeymap.parentNodeName].forEach((item) => {
              option.push({
                label: item[fld.selectedkeymap.labelCode],
                value: item[fld.selectedkeymap.valueCode]
              })
            })
          }
          this.select[fld.dicCode] = option
        }
      })
    })
  },
  methods: {
    // 查询条件展开及收起
    searchShow ($event) {
      this.event('toolbar', '工具栏显示隐藏', { eventname: 'showmore', showonerow: this.viewRowSize === 1, ...$event })
    },
    // 查询条件展开及收起
    search ($event) {
      this.event('toolbar', '查询', { eventname: 'search', ...$event })
    },
    // 查询条件展开及收起
    reset ($event) {
      this.event('toolbar', '查询重置', { eventname: 'reset', ...$event })
    },
    /**
     * 值修改时触发
     */
    valueChange (field, value) {
      const change = {}
      change[this.fieldCode] = value
      this.event('change', `${field.fieldName}值修改`, { change, from: this.mainObj[this.field.fieldCode], to: value })
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
    /**
     * 点击标题处理
     */
    labelClick (field) {
      this.event('labelclick', '点击标题', { field })
    },
    /**
     * 单击输入框处理
     */
    click (field) {
      if (field.inputType === 'table') {
        if (field === undefined || field.readonly === undefined) {
          this.openDialog(field)
        }
      }
      this.event('click', '单击', { field })
    },
    dblclick (field) {
      this.event('dblClick', '双击', { field })
    },
    blur (field) {
      this.event('blur', '失去焦点', { field })
    },
    focus (field) {
      this.event('focus', '获得焦点', { field })
    },
    event (eventname, desc, param) {
      if (param.field === undefined || param.field.readonly === undefined) {
        this.$emit(eventname, {
          eventname,
          desc,
          ...param,
          ref: this.$refs.form
        })
      }
    }
  }
}
</script>
