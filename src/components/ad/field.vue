<template>
  <div>
    <!-- 提示 -->
    <template slot="label" v-if="field.inputType !== 'check'">
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
      :disabled="field.readonly || false"
      :readonly="field.readonly || false"
      @focus="fieldFocus(field)"
      @change="valueChange(field, $event)"
      :placeholder="'请填写' + field.fieldName"
    />
    <el-input-number
      :clearable="true"
      v-else-if="field.inputType === 'double'"
      precision="2"
      :disabled="field.readonly || false"
      :readonly="field.readonly || false"
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
      :readonly="field.readonly || false"
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
      :readonly="field.readonly || false"
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
      :readonly="field.readonly || false"
      @focus="fieldFocus(field)"
      @change="valueChange(field, $event)"
      :placeholder="'请选择' + field.fieldName"
    >
    </el-time-select>
    <!-- 大文本框 -->
    <el-input
      :clearable="true"
      v-else-if="field.inputType === 'textarea'"
      rows="2"
      :readonly="field.readonly || false"
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
      :disabled="field.readonly || false"
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
      :disabled="field.readonly || false"
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
      :disabled="field.readonly || false"
      :readonly="field.readonly || false"
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
      :disabled="field.readonly || false"
      :readonly="field.readonly || false"
      @change="valueChange(field, $event)"
    ></el-checkbox>
    <!-- 多选框 -->
    <el-checkbox-group
      :clearable="true"
      v-else-if="field.inputType === 'checkGroup'"
      v-model="mainObj[field.fieldCode]"
      :readonly="field.readonly || false"
      :disabled="field.readonly || false"
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
    <el-upload
      v-else-if="field.inputType === 'uploadfile'"
      class="avatar-uploader"
      action=""
      :show-file-list="true"
      :auto-upload="false"
      :readonly="field.readonly || false"
      :disabled="field.readonly || false"
      :on-change="getFile"
      :on-remove="removeFile"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <label
      v-text="mainObj[field.fieldCode]"
      v-else-if="field.inputType === 'label'"
    />
    <!-- 文本框 -->
    <el-input
      :clearable="true"
      v-else
      v-model="mainObj[field.fieldCode]"
      @click.native="fieldClick(field)"
      @dblclick.native="fieldDblclick(field)"
      @blur="fieldBlur(field)"
      :readonly="field.readonly || false"
      @focus="fieldFocus(field)"
      @change="valueChange(field, $event)"
      :placeholder="'请输入' + field.fieldName"
    />
  </div>
</template>
<script>
export default {
  name: 'fcbasefield',
  props: {
    inforow: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      // 模型
      vm: { ...ViewModel },
      // 数据对象
      mainObj: {},
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
          btnAct: 'confirm',
        },
        {
          btnCode: 'btnClose',
          btnName: '关闭',
          btnAct: 'close',
        },
      ],
    };
  },
  /**
   * 数据初始化 字典初始化
   */
  created() {
    this.mainObj = { ...this.value };
    const promiseAll = [];
    const fields = [];
    this.inforow.forEach((field) => {
      switch (field.inputType) {
        case 'combo':
        case 'radio':
        case 'select':
          fields.push(field);
          promiseAll.push(
            this.$http.get(
              this.data.requesturl,
              this.data.requestparam || {},
              this.data.requestbody || {},
            ),
          );
          break;
        default:
      }
    });
    Promise.all(promiseAll).then((results) => {
      results.forEach((result, index) => {
        const fld = fields[index];
        if (
          result[fld.selectedkeymap.resultNodeCode]
          === fld.selectedkeymap.resultCodeValue
        ) {
          const option = [];
          if (fld.selectedkeymap.childNodeName) {
            // 取出list的值作为列表
            result[fld.selectedkeymap.parentNodeName][
              fld.selectedkeymap.childNodeName
            ].forEach((item) => {
              option.push({
                label: item[fld.selectedkeymap.labelCode],
                value: item[fld.selectedkeymap.valueCode],
              });
            });
          } else {
            // 取出list的值作为列表
            result[fld.selectedkeymap.parentNodeName].forEach((item) => {
              option.push({
                label: item[fld.selectedkeymap.labelCode],
                value: item[fld.selectedkeymap.valueCode],
              });
            });
          }
          this.vm.select[fld.dicCode] = option;
        }
      });
    });
  },
  computed: {},
  watch: {
    value() {
      this.mainObj = { ...this.value };
    },
  },
  methods: {
    /**
     * 值修改时触发
     */
    valueChange(field, value) {
      const change = {};
      change[field.fieldCode] = value;
      this.event('change', { change });
    },
    /**
     * 新增文件时候转换为base64，
     */
    getFile(file) {
      this.getBase64(file.raw).then((res) => {
        this.fileList[file.uid] = {
          content: res,
          ...{
            name: file.name,
            size: file.size,
            type: file.raw.type,
            uid: file.uid,
          },
        };
        this.valueChange({ fieldCode: 'fileList' }, this.filetoList());
      });
    },
    /**
     * 对象转列表
     */
    filetoList() {
      const files = [];
      Object.keys(this.fileList).forEach((key) => {
        files.push(this.fileList[key]);
      });
      return files;
    },
    /**
     * 文件删除时候调用
     */
    removeFile(file) {
      delete this.fileList[file.uid];
      this.valueChange({
        fieldCode: 'fileList',
        value: this.filetoList(),
      });
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);

        // eslint-disable-next-line func-names
        reader.onload = function () {
          imgResult = reader.result;
        };
        // eslint-disable-next-line func-names
        reader.onerror = function (error) {
          reject(error);
        };
        // eslint-disable-next-line func-names
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    /**
     * 点击标题处理
     */
    labelClick(field) {
      this.event('labelclick', { field });
    },
    /**
     * 单击输入框处理
     */
    click(field) {
      if (field.inputType === 'table') {
        if (field === undefined || field.readonly === undefined) {
          this.openDialog(field);
        }
      }
      this.event('click', { field });
    },
    dblclick(field) {
      this.event('dblClick', { field });
    },
    blur(field) {
      this.event('blur', { field });
    },
    focus(field) {
      this.event('focus', { field, value: this.mainObj, ref: this.$refs.form });
    },
    event(eventname, param) {
      if (param.field === undefined || param.field.readonly === undefined) {
        this.$emit(eventname, {
          eventname,
          ...param,
          ref: this.$refs.form,
          value: this.mainObj,
        });
      }
    },
  },
};
</script>
