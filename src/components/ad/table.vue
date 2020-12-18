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
    <el-table :data="vm.tableInfo.data"
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
          <template slot-scope="scope" v-if="vm.tableInfo.editable===true&&field.readonly!==true&&field.disable!==true">
            <!-- 数值 -->
              <span v-if="field.isrequired" style="color:red">*</span><el-input-number
                :clearable="true"
                v-if="field.inputType === 'long'"
                v-model="scope.row[field.fieldCode]"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              />
              <el-input-number
                :clearable="true"
                v-else-if="field.inputType === 'double'"
                precision="2"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                v-model="scope.row[field.fieldCode]"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              />
              <el-date-picker
                :clearable="true"
                v-else-if="field.inputType === 'date'"
                v-model="scope.row[field.fieldCode]"
                align="right"
                type="date"
                :readonly="field.readonly||false"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              >
              </el-date-picker>
              <el-date-picker
                :clearable="true"
                v-else-if="field.inputType === 'datetime'"
                v-model="scope.row[field.fieldCode]"
                type="datetime"
                align="right"
                :readonly="field.readonly||false"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              >
              </el-date-picker>
              <el-time-select
                :clearable="true"
                v-else-if="field.inputType === 'time'"
                v-model="scope.row[field.fieldCode]"
                align="right"
                type="date"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                :readonly="field.readonly||false"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              >
              </el-time-select>
              <!-- 大文本框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'textarea'"
                rows="2"
                :readonly="field.readonly||false"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                v-model="scope.row[field.fieldCode]"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              />
              <!-- 弹出框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'table'"
                prefix-icon="el-icon-search"
                v-model="scope.row[field.fieldCode]"
                :disabled="field.readonly||false"
                readonly
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              ></el-input>
              <!-- 弹出框 -->
              <el-input
                :clearable="true"
                v-else-if="field.inputType === 'city'"
                prefix-icon="el-icon-search"
                v-model="scope.row[field.fieldCode]"
                :disabled="field.readonly||false"
                readonly
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              ></el-input>
              <!-- 选择框 -->
              <el-select
                :clearable="true"
                v-else-if="field.inputType === 'select'"
                v-model="scope.row[field.fieldCode]"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
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
                v-model="scope.row[field.fieldCode]"
                :disabled="field.readonly||false"
                :readonly="field.readonly||false"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
              ></el-checkbox>
              <!-- 多选框 -->
              <el-checkbox-group
                :clearable="true"
                v-else-if="field.inputType === 'checkGroup'"
                v-model="scope.row[field.fieldCode]"
                :readonly="field.readonly||false"
                :disabled="field.readonly||false"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
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
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
                >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <label v-text="scope.row[field.fieldCode]" v-else-if="field.inputType === 'label'" />
              <!-- 文本框 -->
              <el-input
                :clearable="true"
                v-else
                :title="'请输入'+field.fieldName+' '+ (field.description||'') + ' ' + (field.help||'')"
                v-model="scope.row[field.fieldCode]"
                @click.native="fieldClick(scope.row, field, scope.$index, scope.column, $event)"
                @dblclick.native="fieldDblclick(scope.row, field, scope.$index, scope.column, $event)"
                @blur="fieldBlur(scope.row, field, scope.$index, scope.column, $event)"
                :readonly="field.readonly||false"
                @focus="fieldFocus(scope.row, field, scope.$index, scope.column, $event)"
                @change="fieldValueChange(scope.row, field, scope.$index, scope.column, $event)"
              />
          </template>
      </el-table-column>
      <el-table-column
        v-if="vm.tableInfo.hasaction === true && vm.tableInfo.lineToolbar"
        class-name="operate-temp"
        prop="action"
        :label="$t('操作')"
        width="100">
        <template slot-scope="{row, $index, column}">
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
import ViewModel from './list-form';

export default {
  name: 'fctable',
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    isloading: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: Number,
      default: () => document.body.clientHeight - 169 - 47,
    },
  },
  data() {
    return {
      vm: { ...ViewModel, ...this.model },
      select: { ...ViewModel.select },
    };
  },
  created() {
    this.vm.initTableModel(this.vm.tableInfo, this.vm.fields, true, false);
  },
  computed: { },
  watch: {
    model() {
    },
    value() {
    },
  },
  methods: {
    toolbar(value, $index, column, btn) {
      this.event('toolbar', {
        eventname: btn.btnAct, index: $index, btn, value,
      });
    },
    rowclick(value, row, event) {
      this.event('rowclick', {
        value, row, event, field: this.vm.fields[row.property],
      });
    },
    rowdblclick(value, row, event) {
      this.event('rowdblclick', {
        value, row, event, field: this.vm.fields[row.property],
      });
    },
    /**
     * 点击cell时触发，当点击链接时，触发另外一个事件
     */
    cellclick(value, row, cell, event) {
      const field = this.vm.fields[row.property];
      this.event('cellclick', {
        value, row, cell, event, field,
      });
      // 当是链接字段，同时不可编辑的时候 或者 为只读 为禁用的时候可点击打开链接
      if (row.className === 'links' && this.vm.tableInfo.editable !== true || field.readonly === true || field.disabled === true) {
        this.event('linkclick', {
          value, row, cell, event, field,
        });
      }
    },
    celldblclick(value, row, cell, event) {
      this.event('celldblclick', {
        value, row, cell, event, field: this.vm.fields[row.property],
      });
    },
    sortChange(sortObj) {
      this.event('sortchange', { cell: sortObj.column, order: sortObj.order, field: this.vm.fields[sortObj.prop] });
    },
    /**
     * 标题点击
     */
    headerClick(row, event) {
      this.event('headerclick', { row, event, field: this.vm.fields[row.property] });
    },
    /**
     * 行右键
     */
    rowContextmenu(value, row, event) {
      this.event('rowcontextmenu', {
        value, row, event, field: this.vm.fields[row.property],
      });
    },
    /**
     * 标题右键
     */
    headerContextmenu(row, event) {
      this.event('headercontextmenu', { row, event, field: this.vm.fields[row.property] });
    },
    selectionChange(value) {
      this.event('selectionchange', { value });
    },
    /**
     * 全选事件
     */
    selectAll(value) {
      this.event('selectall', { value });
    },
    /**
     * 单选一行
     */
    selectOne(row, value) {
      this.event('select', { value });
    },
    /**
     * 分页大小改变时,跳转到第一页
     */
    sizeChange(pageSize) {
      this.vm.tableInfo.pageSize = pageSize;
      this.event('pagechange', {
        eventname: 'pagesizeChange',
        name: '页偏移量改变',
        pageSize,
        pageNum: 1,
      });
    },
    /**
     * 页数改变时
     */
    pageChange(pageNum) {
      this.vm.tableInfo.pageNum = pageNum;
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize,
      });
    },
    /**
     * 上一页
     */
    prevPage(pageNum) {
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize,
      });
    },
    /**
     * 下一页
     */
    nextPage(pageNum) {
      this.event('pagechange', {
        eventname: 'pagenumChange',
        name: '页数改变',
        pageNum,
        pageSize: this.vm.tableInfo.pageSize,
      });
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
    fieldClick(data, field, index, column, $event) {
      this.event('click', {
        field, data, index, column, $event,
      });
    },
    fieldDblclick(data, field, index, column, $event) {
      this.event('dblClick', {
        field, data, index, column, $event,
      });
    },
    fieldBlur(data, field, index, column, $event) {
      this.event('blur', {
        field, data, index, column, $event,
      });
    },
    fieldFocus(data, field, index, column, $event) {
      this.event('focus', {
        field, data, index, column, $event,
      });
    },
    fieldValueChange(data, field, index, column, $event) {
      this.event('change', {
        data, field, index, column, $event,
      });
    },
    event(eventname, param) {
      this.$emit(eventname, { eventname, ...param });
    },
  },
};
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
