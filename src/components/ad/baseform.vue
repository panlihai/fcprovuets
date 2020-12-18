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
              <el-upload
                v-else-if="field.inputType === 'uploadfile'"
                class="avatar-uploader"
                action=""
                :show-file-list="true"
                :auto-upload="false"
                :readonly="field.readonly||false"
                :disabled="field.readonly||false"
                :on-change="getFile"
                :on-remove="removeFile"
                >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <label v-text="mainObj[field.fieldCode]" v-else-if="field.inputType === 'label'" />
              <!-- 文本框 -->
              <el-input
                :clearable="true"
                v-else
                v-model="mainObj[field.fieldCode]"
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                :readonly="field.readonly||false"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                :placeholder="'请输入' + field.fieldName"
              />
              <!-- 提示 -->
              <template slot="label" v-if="field.inputType === 'check'">
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
    <slot name="baseform"></slot>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      width="70%"
      :before-close="dialogClose"
      append-to-body
    >
      <fcsearch :model="dialogVm" :value="searchObj" @toolbar="queryToolbar" @change="query"></fcsearch>
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
import ViewModel from './list-form';
import fctable from './table';
import fcsearch from './search';
import fctoolbar from './toolbar';

export default {
  name: 'fcbaseform',
  components: { fctable, fctoolbar, fcsearch },
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
          promiseAll.push(this.$http.get(this.data.requesturl, this.data.requestparam || {}, this.data.requestbody || {}));
          break;
        default:
      }
    });
    Promise.all(promiseAll).then((results) => {
      results.forEach((result, index) => {
        const fld = fields[index];
        if (result[fld.selectedkeymap.resultNodeCode] === fld.selectedkeymap.resultCodeValue) {
          const option = [];
          if (fld.selectedkeymap.childNodeName) {
            // 取出list的值作为列表
            result[fld.selectedkeymap.parentNodeName][fld.selectedkeymap.childNodeName].forEach((item) => {
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
    readonlyfields() {
    },
    hiddenfields() {
    },
    requiredfields() {
    },
  },
  methods: {
    // 弹窗选择其它数据
    dialogClose() {
      this.dialogVisible = !this.dialogVisible;
    },
    /**
     * 弹窗准备数据
     */
    openDialog(field) {
      console.log(field);
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
              column: 1,
            }, {
              // 字段编码
              fieldCode: 'APPNAME',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型名称',
              // 所占列数，不能跨行
              column: 1,
            }, {
              // 字段编码
              fieldCode: 'ENABLE',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '是否启用',
              // 所占列数，不能跨行
              column: 1,
            }, {
              // 字段编码
              fieldCode: 'APPID',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型编码',
              // 所占列数，不能跨行
              column: 1,
            }, {
              // 字段编码
              fieldCode: 'APPNAME',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '模型名称',
              // 所占列数，不能跨行
              column: 2,
            }, {
              // 字段编码
              fieldCode: 'ENABLE',
              // 内部样式
              style: '',
              // 属性中文名称
              fieldName: '是否启用',
              // 所占列数，不能跨行
              column: 1,
            },
          ],
          // 工具栏
          toolbar: [
            {
              btnCode: 'btnQuery',
              btnName: '查询',
              btnAct: 'query',
              bustype: 'query',
            },
            {
              btnCode: 'btnQuery',
              btnName: '重置',
              btnAct: 'reset',
              bustype: 'reset',
            },
          ],
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
              fldGroupName: '基本信息',
              // 区域编码
              fldGroupCode: 'basic',
              type: 'links',
              // 显示字段
              fields: [
                {
                  // 字段编码
                  fieldCode: 'APPNAME',
                },
                {
                  // 字段编码
                  fieldCode: 'ENABLE',
                },
              ],
            },
          ],
          trans: [
            {
              from: 'APPNAME',
              to: 'APPID',
            },
          ],
        },
      };
      this.dialogVisible = true;
    },
    // 弹窗后的数据选择
    dialogSelectionChange(event) {
      this.selectObjs = event.value;
      // 把数据内容写入到主对象
      this.dialogClose();
    },
    /**
     * 弹窗选择工具栏事件处理
     */
    dialogToolbarEvent(param) {
      if (param.eventname === 'confirm') {
        // 执行写入主对象
      }
      this.dialogClose();
    },
    /**
     * 弹窗查询
     */
    queryToolbar(param) {
      switch (param.eventname) {
        case 'showmore':
          this.height = document.body.clientHeight - 350 - 47 * this.dialogVm.searchInfo.viewRowSize;
          return;
        case 'reset':
          this.searchObj = {};
        // eslint-disable-next-line no-fallthrough
        case 'search':
          this.query();
          break;
        default:
          // 默认方法
          if (this[param.eventname]) {
            this[param.eventname](param);
          } else {
            console.log(param.eventname, '未处理方法', param);
          }
      }
    },
    query(param) {
      console.log(param);
    },
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
      return new Promise(((resolve, reject) => {
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
      }));
    },
    // 查询条件展开及收起
    searchShow() {
      if (this.vm.searchInfo.viewRowSize === 1) {
        this.vm.searchInfo.viewRowSize = this.vm.searchInfo.infoRow.length;
      } else {
        this.vm.searchInfo.viewRowSize = 1;
      }
      this.vm.initSearchModel(
        this.vm.searchInfo,
        this.vm.fields,
        this.vm.searchInfo.viewRowSize !== 1,
      );
      this.event('toolbar', {
        eventname: 'showmore',
        isshow: this.vm.searchInfo.viewRowSize,
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
    fieldClick(field) {
      if (field.inputType === 'table') {
        if (field === undefined || field.readonly === undefined) {
          this.openDialog(field);
        }
      }
      this.event('click', { field });
    },
    fieldDblclick(field) {
      this.event('dblClick', { field });
    },
    fieldBlur(field) {
      this.event('blur', { field });
    },
    fieldFocus(field) {
      this.event('focus', { field, value: this.mainObj, ref: this.$refs.form });
    },
    search($event) {
      this.event('toolbar', { eventname: 'search', event: $event });
    },
    reset($event) {
      this.$refs.form.resetFields();
      this.event('toolbar', { eventname: 'reset', event: $event });
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
<style>
.el-pagination {
  text-align: center;
}

.toolbar {
  text-align: center;
}

</style>
