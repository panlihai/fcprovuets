<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="searchModel">
    <el-form
      size="mini"
      label-width="100px"
      label-position="right"
      ref="form"
      :model="value"
    >
      <el-row v-for="(row, index) of vm.searchInfo.infoRow" :key="index">
        <template
          v-if="
            (index === 0 && vm.searchInfo.viewRowSize === 1) || vm.searchInfo.viewRowSize !== 1
          "
        >
          <el-col v-for="(field, index0) of row" :span="field.span" :key="index0">
            <el-form-item
              :label="field.fieldName"
              :prop="field.fieldCode"
              :class="field.inputType"
              @click.native="labelClick(field)"
              class="search-form-item"
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
              <!-- 提示 -->
              <template slot="label" v-else-if="field.inputType === 'check'">
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
              <!-- 选择框 -->
              <el-select
                :clearable="true"
                v-if="field.inputType === 'select'"
                v-model="mainObj[field.fieldCode]"
                @change="valueChange(field, $event)"
                :disabled="field.disabled"
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
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @change="valueChange(field, $event)"
                v-model="mainObj[field.fieldCode]"
              ></el-checkbox>
              <!-- 多选框 -->
              <el-checkbox-group
                :clearable="true"
                v-else-if="field.inputType === 'checkGroup'"
                v-model="mainObj[field.fieldCode]"
                @change="valueChange(field, $event)"
              >
                <template v-if="field.fastCode">
                  <el-checkbox
                    v-for="opt of vm.select[field.dicCode]"
                    :key="opt.value"
                    :label="opt.value"
                    @click.native="fieldClick(field)"
                    @dblclick.native="fieldDblclick(field)"
                    >{{ opt.label }}</el-checkbox
                  >
                </template>
              </el-checkbox-group>
              <div v-else-if="field.inputType === 'searchBtn'">
                <i
                  class="el-icon-arrow-left extend"
                  @click="searchShow(true)" title="点击展开"
                  v-if="vm.searchInfo.viewRowSize === 1"
                ></i>
                <i class="el-icon-arrow-up extend" @click="searchShow()" v-if="vm.searchInfo.viewRowSize !== 1"  title="点击收起"></i>
                <el-button
                  type="primary" size="mini"
                  @click.native="search"
                  icon="el-icon-search"
                  >{{ $t("查询") }}</el-button
                ><el-button @click.native="reset"  size="mini" icon="el-icon-refresh">{{
                  $t("重置")
                }}</el-button>
              </div>
              <div v-else-if="field.inputType === 'space'"></div>
              <!-- 文本框 -->
              <el-input
                :clearable="true"
                v-else
                @click.native="fieldClick(field)"
                @dblclick.native="fieldDblclick(field)"
                @blur="fieldBlur(field)"
                @focus="fieldFocus(field)"
                @change="valueChange(field, $event)"
                v-model="mainObj[field.fieldCode]"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import ViewModel from './list-form';

export default {
  name: 'fcsearch',
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      vm: { ...ViewModel, ...this.model },
      mainObj: { ...this.value },
    };
  },
  created() {
    this.vm.initSearchModel(
      this.vm.searchInfo,
      this.vm.fields,
      false,
    );
  },
  computed: {
  },
  watch: {
    model() {
    },
    value() {},
  },
  methods: {
    valueChange(field, value) {
      const change = {};
      change[field.fieldCode] = value;
      this.event('change', { change });
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
      this.event('toolbar', { eventname: 'showmore', isshow: this.vm.searchInfo.viewRowSize });
    },
    /**
     * 点击标题处理
     */
    labelClick(field) {
      this.event('labelclick', { field });
    },
    fieldClick(field) {
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
      this.$emit(eventname, {
        eventname,
        ...param,
        ref: this.$refs.form,
        value: this.mainObj,
      });
    },
  },
};
</script>

<style lang="scss">
.searchModel {
  .extend {
    padding: 0 10px;
    font-size: 13px;
  }
}
</style>
