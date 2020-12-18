<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="fcform">
    <template v-if="vm.formInfo.childViewType === 'list'">
      <div class="formContent">
        <div
          class="form"
          v-for="(grp, index) of vm.formInfo.fldGroup"
          :key="index"
        >
          <div class="grpTitle" :style="{backgroundColor:index!==0?'#e8e3e3':'#fff'}">
            <div :class="{'title':index!==0}">{{index!==0?grp.fldGroupName:''}}</div>
            <div class="analysis">
              <div v-if="index===0" style="font-size:16px">{{ grp.fldGroupName }}</div>
              <div v-if="grp.counteFields && grp.counteFields.length !== 0">
                <span
                  class="analysisItem"
                  v-for="(anal, indexAnal) of grp.counteFields"
                  :key="indexAnal"
                >
                  <template v-if="vm.fields[anal]">
                    {{ vm.fields[anal].fieldName }}合计：{{
                      mainObj[anal] || 0
                    }};
                  </template>
                </span>
              </div>
            </div>
            <div class="open">
              <div
                class="toolbar"
                v-if="!grp.toolbarView || grp.toolbarView === 'title'"
              >
                <span
                  class="btn"
                  v-for="(btn, btnIndex) of grp.toolbar"
                  :key="btnIndex"
                  size="mini"
                  @click="groupToolbar(grp, btn)"
                  >{{ $t(btn.btnName) }}</span
                >
              </div>
              <i
                class="el-icon-arrow-left"
                @click="showLine(grp)"
                v-if="grp.fldGroupOpen === false"
              ></i>
              <i class="el-icon-arrow-down" @click="showLine(grp)" v-else></i>
            </div>
          </div>
          <div class="grpContent" :hidden="grp.fldGroupOpen === false">
            <fcbaseform v-if="index===0" :model="vm" :value="mainObj"
            :inforow="grp.infoRow" :rules="grp.ruleInfo" :name="grp.gldGroupCode"
                @click="fieldClick(grp, mainObj, $event)"
                @dblclick="fieldDblclick(grp, mainObj, $event)"
                @blur="fieldBlur(grp, mainObj, $event)"
                @focus="fieldFocus(grp, mainObj, $event)"
                @change="fieldValueChange(grp, mainObj, $event)">
                <template #baseform>
                  <slot name="baseform"></slot>
                </template>
            </fcbaseform>
            <template v-if="index!==0">
              <fcbaseform v-for="(data,cindex) of grp.data" :key="cindex" :model="vm" :value="data"
                :inforow="grp.infoRow" :rules="grp.ruleInfo" :name="grp.gldGroupCode"
                @click="fieldClick(grp, data, $event)"
                @dblclick="fieldDblclick(grp, data, $event)"
                @blur="fieldBlur(grp, data, $event)"
                @focus="fieldFocus(grp, data, $event)"
                @change="fieldValueChange(grp, data, $event)">
                <template #baseform>
                  <slot name="baseform"></slot>
                </template>
              </fcbaseform>
            </template>
          </div>
          <div class="grpFooter" v-if="grp.fldGroupOpen">
            <div v-if="grp.toolbarView === 'blank'">
              <fctoolbar @click="groupToolbar(grp, $event.btn)" :toolbar="grp.toolbar"></fctoolbar>
            </div>
          </div>
          <div class="formContent" v-if="grp.children">
            <div
              class="form"
              v-for="(cgrp, childIndex) of grp.children"
              :key="childIndex"
            >
              <div class="grpTitle">
                <div class="title">{{ grp.fldGroupName }}{{ cgrp.fldGroupName }}</div>
                <div class="analysis">
                  <div
                    v-if="cgrp.counteFields && cgrp.counteFields.length !== 0"
                  >
                    <span
                      class="analysisItem"
                      v-for="(canal, cindexAnal) of cgrp.counteFields"
                      :key="cindexAnal"
                    >
                      <template v-if="vm.fields[canal]">
                        {{ vm.fields[canal].fieldName }}合计：{{
                          mainObj[anal] || 0
                        }};
                      </template>
                    </span>
                  </div>
                </div>
                <div class="open">
                  <div
                    class="toolbar"
                    v-if="!cgrp.toolbarView || cgrp.toolbarView === 'title'"
                  >
                    <span
                      class="btn"
                      v-for="(cbtn, cbtnIndex) of cgrp.toolbar"
                      :key="cbtnIndex"
                      size="mini"
                      @click="groupToolbar(cgrp, cbtn)"
                      >{{ $t(cbtn.btnName) }}</span
                    >
                  </div>
                  <i
                    class="el-icon-arrow-left"
                    @click="showLine(cgrp)"
                    v-if="cgrp.fldGroupOpen === false"
                  ></i>
                  <i
                    class="el-icon-arrow-down"
                    @click="showLine(cgrp)"
                    v-else
                  ></i>
                </div>
              </div>
              <div class="grpContent" :hidden="cgrp.fldGroupOpen === false">
                <fcbaseform  v-for="(data,index) of cgrp.data" :key="index"
                  :model="vm" :value="data" :inforow="cgrp.infoRow" :rules="cgrp.ruleInfo" :name="cgrp.gldGroupCode"
                  @click="fieldClick(cgrp, data, $event)"
                  @dblclick="fieldDblclick(cgrp, data, $event)"
                  @blur="fieldBlur(cgrp, data, $event)"
                  @focus="fieldFocus(cgrp, data, $event)"
                  @change="fieldValueChange(cgrp, data, $event)">
                  <template #baseform>
                    <slot name="baseform"></slot>
                  </template>
                </fcbaseform>
              </div>
              <div class="grpFooter" v-if="cgrp.fldGroupOpen">
                <div v-if="cgrp.toolbarView === 'blank'">
                  <fctoolbar @click="groupToolbar(cgrp, $event.btn)" :toolbar="cgrp.toolbar"></fctoolbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="vm.formInfo.toolbar">
        <fctoolbar @click="formToolbar($event.btn)" :toolbar="vm.formInfo.toolbar"></fctoolbar>
      </div>
    </template>
    <template v-else-if="vm.formInfo.childViewType === 'tab'">
      <el-tabs :value="vm.formInfo.fldGroup[0].fldGroupCode">
        <el-tab-pane
          v-for="(grp, index) of vm.formInfo.fldGroup"
          :key="index"
          :label="grp.fldGroupName"
          name="baseform"
        >
          <div class="form">
            <div
              class="grpToolbar"
              v-if="grp.toolbar && grp.toolbar.length !== 0"
            >
             <fctoolbar @click="groupToolbar(grp, $event.btn)" :toolbar="grp.toolbar"></fctoolbar>
            </div>
            <div class="grpContent">
              <fcbaseform v-if="index===0" :model="vm" :value="mainObj"
                :inforow="grp.infoRow" :rules="grp.ruleInfo" :name="grp.gldGroupCode"
                @click="fieldClick(grp, data, $event)"
                @dblclick="fieldDblclick(grp, data, $event)"
                @blur="fieldBlur(grp, data, $event)"
                @focus="fieldFocus(grp, data, $event)"
                @change="fieldValueChange(grp, data, $event)">
                <template #baseform>
                  <slot name="baseform"></slot>
                </template>
              </fcbaseform>
              <fcbaseform else-if v-for="(data,cindex) of grp.data" :key="cindex"
                :model="vm" :value="data" :inforow="grp.infoRow" :rules="grp.ruleInfo" :name="grp.gldGroupCode"
                @click="fieldClick(grp, data, $event)"
                @dblclick="fieldDblclick(grp, data, $event)"
                @blur="fieldBlur(grp, data, $event)"
                @focus="fieldFocus(grp, data, $event)"
                @change="fieldValueChange(grp, data, $event)">
                <template #baseform>
                  <slot name="baseform"></slot>
                </template>
              </fcbaseform>
            </div>
            <div class="formContent" v-if="grp.children">
              <div
                class="form"
                v-for="(cgrp, childIndex) of grp.children"
                :key="childIndex"
              >
                <div class="grpTitle">
                  <div class="title">{{ cgrp.fldGroupName }}</div>
                  <div class="analysis">
                    <div
                      v-if="cgrp.counteFields && cgrp.counteFields.length !== 0"
                    >
                      <span
                        class="analysisItem"
                        v-for="(canal, cindexAnal) of cgrp.counteFields"
                        :key="cindexAnal"
                      >
                        <template v-if="vm.fields[canal]">
                          {{ vm.fields[canal].fieldName }}合计：{{
                            mainObj[anal] || 0
                          }};
                        </template>
                      </span>
                    </div>
                  </div>
                  <div class="open">
                    <div
                      class="toolbar"
                      v-if="!cgrp.toolbarView || cgrp.toolbarView === 'title'"
                    >
                      <span
                        class="btn"
                        v-for="(cbtn, cbtnIndex) of cgrp.toolbar"
                        :key="cbtnIndex"
                        size="mini"
                        @click="groupToolbar(cgrp, cbtn)"
                        >{{ $t(cbtn.btnName) }}</span
                      >
                    </div>
                    <i
                      class="el-icon-arrow-left"
                      @click="showLine(cgrp)"
                      v-if="cgrp.fldGroupOpen === false"
                    ></i>
                    <i
                      class="el-icon-arrow-down"
                      @click="showLine(cgrp)"
                      v-else
                    ></i>
                  </div>
                </div>
                <div class="grpContent" :hidden="cgrp.fldGroupOpen === false">
                  <fcbaseform  v-for="(data,index) of cgrp.data" :key="index"
                    :model="vm" :value="data" :inforow="cgrp.infoRow" :rules="cgrp.ruleInfo" :name="cgrp.gldGroupCode"
                    @click="fieldClick(cgrp, data, $event)"
                    @dblclick="fieldDblclick(cgrp, data, $event)"
                    @blur="fieldBlur(cgrp, data, $event)"
                    @focus="fieldFocus(cgrp, data, $event)"
                    @change="fieldValueChange(cgrp, data, $event)">
                    <template #baseform>
                      <slot name="baseform"></slot>
                    </template>
                  </fcbaseform>
                </div>
                <div class="grpFooter" v-if="cgrp.fldGroupOpen">
                  <div v-if="cgrp.toolbarView === 'blank'">
                    <fctoolbar @click="groupToolbar(cgrp, $event.btn)" :toolbar="cgrp.toolbar"></fctoolbar>
                  </div>
                </div>
              </div>
            </div>
            <div class="grpFooter">
              <div class="analysis">
                <div v-if="grp.counteFields && grp.counteFields.length !== 0">
                  <span
                    class="analysisItem"
                    v-for="(anal, indexAnal) of grp.counteFields"
                    :key="indexAnal"
                  >
                    <template v-if="vm.fields[anal]">
                      {{ vm.fields[anal].fieldName }}合计：{{
                        mainObj[anal] || 0
                      }};
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="footer" v-if="vm.formInfo.toolbar">
            <fctoolbar @click="formToolbar($event.btn)" :toolbar="vm.formInfo.toolbar"></fctoolbar>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else-if="vm.formInfo.childViewType === 'tablist'">
      <div class="formContent">
        <div
          class="form"
          v-for="(grp, index) of vm.formInfo.fldGroup"
          :key="index"
        >
          <template v-if="index === 0">
            <div class="grpTitle" :style="{backgroundColor:index!==0?'#e8e3e3':'#fff'}">
              <div :class="{'title':index!==0}">{{index!==0?grp.fldGroupName:''}}</div>
              <div class="analysis">
                <div v-if="index===0">{{ grp.fldGroupName }}</div>
                <div v-if="grp.counteFields && grp.counteFields.length !== 0">
                  <span
                    class="analysisItem"
                    v-for="(anal, indexAnal) of grp.counteFields"
                    :key="indexAnal"
                  >
                    <template v-if="vm.fields[anal]">
                      {{ vm.fields[anal].fieldName }}合计：{{
                        mainObj[anal] || 0
                      }};
                    </template>
                  </span>
                </div>
              </div>
              <div class="open">
                <div
                  class="toolbar"
                  v-if="!grp.toolbarView || grp.toolbarView === 'title'"
                >
                  <span
                    class="btn"
                    v-for="(btn, btnIndex) of grp.toolbar"
                    :key="btnIndex"
                    size="mini"
                    @click="groupToolbar(grp, btn)"
                    >{{ $t(btn.btnName) }}</span
                  >
                </div>
                <i
                  class="el-icon-arrow-left"
                  @click="showLine(grp)"
                  v-if="grp.fldGroupOpen === false"
                ></i>
                <i class="el-icon-arrow-down" @click="showLine(grp)" v-else></i>
              </div>
            </div>
            <div class="grpContent" :hidden="grp.fldGroupOpen === false">
              <fcbaseform :model="vm" :value="mainObj"
                :inforow="grp.infoRow" :rules="grp.ruleInfo" :name="grp.gldGroupCode"
                @click="fieldClick(grp, mainObj, $event)"
                @dblclick="fieldDblclick(grp, mainObj, $event)"
                @blur="fieldBlur(grp, mainObj, $event)"
                @focus="fieldFocus(grp, mainObj, $event)"
                @change="fieldValueChange(grp, mainObj, $event)">
                <template #baseform>
                  <slot name="baseform"></slot>
                </template>
              </fcbaseform>
            </div>
            <div class="formContent" v-if="grp.children">
              <div
                class="form"
                v-for="(cgrp, childIndex) of grp.children"
                :key="childIndex"
              >
                <div class="grpTitle">
                  <div class="title">{{ cgrp.fldGroupName }}</div>
                  <div class="analysis">
                    <div
                      v-if="cgrp.counteFields && cgrp.counteFields.length !== 0"
                    >
                      <span
                        class="analysisItem"
                        v-for="(canal, cindexAnal) of cgrp.counteFields"
                        :key="cindexAnal"
                      >
                        <template v-if="vm.fields[canal]">
                          {{ vm.fields[canal].fieldName }}合计：{{
                            mainObj[anal] || 0
                          }};
                        </template>
                      </span>
                    </div>
                  </div>
                  <div class="open">
                    <div
                      class="toolbar"
                      v-if="!cgrp.toolbarView || cgrp.toolbarView === 'title'"
                    >
                      <span
                        class="btn"
                        v-for="(cbtn, cbtnIndex) of cgrp.toolbar"
                        :key="cbtnIndex"
                        size="mini"
                        @click="groupToolbar(cgrp, cbtn)"
                        >{{ $t(cbtn.btnName) }}</span
                      >
                    </div>
                    <i
                      class="el-icon-arrow-left"
                      @click="showLine(cgrp)"
                      v-if="cgrp.fldGroupOpen === false"
                    ></i>
                    <i
                      class="el-icon-arrow-down"
                      @click="showLine(cgrp)"
                      v-else
                    ></i>
                  </div>
                </div>
                <div class="grpContent" :hidden="cgrp.fldGroupOpen === false">
                  <fcbaseform  v-for="(data,cindex) of cgrp.data" :key="cindex"
                    :model="vm" :value="data" :inforow="cgrp.infoRow" :rules="cgrp.ruleInfo" :name="cgrp.gldGroupCode"
                    @click="fieldClick(cgrp, data, $event)"
                    @dblclick="fieldDblclick(cgrp, data, $event)"
                    @blur="fieldBlur(cgrp, data, $event)"
                    @focus="fieldFocus(cgrp, data, $event)"
                    @change="fieldValueChange(cgrp, data, $event)">
                    <template #baseform>
                      <slot name="baseform"></slot>
                    </template>
                  </fcbaseform>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="footer" v-if="vm.formInfo.toolbar">
        <fctoolbar @click="formToolbar($event.btn)" :toolbar="vm.formInfo.toolbar"></fctoolbar>
      </div>
      <el-tabs v-if="vm.formInfo.fldGroup.length>1" :value="vm.formInfo.fldGroup[1].fldGroupCode">
        <template v-for="(grp, index) of vm.formInfo.fldGroup">
          <el-tab-pane
            :label="grp.fldGroupName"
            name="baseform"
            v-if="index > 0"
            :key="index"
          >
            <div class="form">
              <div
                class="grpToolbar"
                v-if="grp.toolbar && grp.toolbar.length !== 0"
              >
              <fctoolbar @click="groupToolbar(grp,$event.btn)" :toolbar="grp.toolbar"></fctoolbar>
              </div>
              <div class="grpContent">
                <fcbaseform v-for="(data,cindex) of grp.data" :key="cindex"
                  :model="vm" :value="data" :inforow="grp.infoRow" :rules="grp.ruleInfo" :name="grp.gldGroupCode"
                  @click="fieldClick(grp, data, $event)"
                  @dblclick="fieldDblclick(grp, data, $event)"
                  @blur="fieldBlur(grp, data, $event)"
                  @focus="fieldFocus(grp, data, $event)"
                  @change="fieldValueChange(grp, data, $event)">
                  <template #baseform>
                    <slot name="baseform"></slot>
                  </template>
                </fcbaseform>
              </div>
              <div class="formContent" v-if="grp.children">
                <div
                  class="form"
                  v-for="(cgrp, childIndex) of grp.children"
                  :key="childIndex"
                >
                  <div class="grpTitle">
                    <div class="title">{{ cgrp.fldGroupName }}</div>
                    <div class="analysis">
                      <div
                        v-if="
                          cgrp.counteFields && cgrp.counteFields.length !== 0
                        "
                      >
                        <span
                          class="analysisItem"
                          v-for="(canal, cindexAnal) of cgrp.counteFields"
                          :key="cindexAnal"
                        >
                          <template v-if="vm.fields[canal]">
                            {{ vm.fields[canal].fieldName }}合计：{{
                              mainObj[anal] || 0
                            }};
                          </template>
                        </span>
                      </div>
                    </div>
                    <div class="open">
                      <div
                        class="toolbar"
                        v-if="!cgrp.toolbarView || cgrp.toolbarView === 'title'"
                      >
                        <span
                          class="btn"
                          v-for="(cbtn, cbtnIndex) of cgrp.toolbar"
                          :key="cbtnIndex"
                          size="mini"
                          @click="groupToolbar(cgrp, cbtn)"
                          >{{ $t(cbtn.btnName) }}</span
                        >
                      </div>
                      <i
                        class="el-icon-arrow-left"
                        @click="showLine(cgrp)"
                        v-if="cgrp.fldGroupOpen === false"
                      ></i>
                      <i
                        class="el-icon-arrow-down"
                        @click="showLine(cgrp)"
                        v-else
                      ></i>
                    </div>
                  </div>
                  <div class="grpContent" :hidden="cgrp.fldGroupOpen === false">
                    <fcbaseform  v-for="(data,index) of cgrp.data" :key="index"
                      :model="vm" :value="data" :inforow="cgrp.infoRow" :rules="cgrp.ruleInfo" :name="cgrp.gldGroupCode"
                      @click="fieldClick(cgrp, data, $event)"
                      @dblclick="fieldDblclick(cgrp, data, $event)"
                      @blur="fieldBlur(cgrp, data, $event)"
                      @focus="fieldFocus(cgrp, data, $event)"
                      @change="fieldValueChange(cgrp, data, $event)">
                      <template #baseform>
                        <slot name="baseform"></slot>
                      </template>
                    </fcbaseform>
                  </div>
                  <div class="grpFooter" v-if="cgrp.fldGroupOpen">
                    <div v-if="cgrp.toolbarView === 'blank'">
                      <fctoolbar @click="groupToolbar(cgrp,$event.btn)" :toolbar="cgrp.toolbar"></fctoolbar>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grpFooter">
                <div class="analysis">
                  <div v-if="grp.counteFields && grp.counteFields.length !== 0">
                    <span
                      class="analysisItem"
                      v-for="(anal, indexAnal) of grp.counteFields"
                      :key="indexAnal"
                    >
                      <template v-if="vm.fields[anal]">
                        {{ vm.fields[anal].fieldName }}合计：{{
                          mainObj[anal] || 0
                        }};
                      </template>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </template>
  </div>
</template>
<script>
import ViewModel from './list-form';
import fcbaseform from './baseform';
import fctable from './table';
import fctoolbar from './toolbar';

export default {
  name: 'fcview',
  components: {
    fcbaseform, fctoolbar, fctable,
  },
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
  created() {
    this.vm.initViewModel(this.vm.formInfo, this.vm.fields);
  },
  computed: {
    vm() {
      return { ...ViewModel, ...this.model };
    },
    mainObj() {
      return { ...this.value };
    },
  },
  watch: {
    vm() {
      this.vm.initViewModel(this.vm.formInfo, this.vm.fields);
    },
  },
  methods: {
    /**
     * 点击显示或隐藏分组或分区
     */
    showLine(grp) {
      grp.fldGroupOpen = !grp.fldGroupOpen;
      this.event('titleclick', { grp });
    },
    /**
     * 点击标题处理
     */
    labelClick(grp, field) {
      this.event('labelclick', { grp, field });
    },
    /**
     * 分组工具栏事件
     * @param {*} grp 分组内容
     * @param {*} btn 按钮事件名称
     */
    groupToolbar(grp, btn) {
      this.event('grouptoolbar', { grp, btn });
    },
    /**
     * 表单工具栏事件
     * @param {*} btn 按钮事件名称
     */
    formToolbar(btn) {
      this.event('toolbar', { eventname: btn.btnAct, btn });
    },
    fieldClick(grp, data, param) {
      param.data = data;
      this.event('click', { grp, ...param });
    },
    fieldDblclick(grp, data, param) {
      param.data = data;
      this.event('dblClick', { grp, ...param });
    },
    fieldBlur(grp, data, param) {
      param.data = data;
      this.event('blur', { grp, ...param });
    },
    fieldFocus(grp, data, param) {
      param.data = data;
      this.event('focus', { grp, ...param });
    },
    fieldValueChange(grp, data, param) {
      param.data = data;
      this.mainObj = { ...param.value, ...param.change };
      this.event('change', {
        grp, ...param,
      });
    },
    event(eventname, param) {
      this.$emit(eventname, {
        eventname,
        ref: this.$refs.form,
        value: this.mainObj,
        ...param,
      });
    },
  },
};
</script>

<style lang="scss">
.fcform {
  display: flex;
  flex-direction: column;
  .formContent {
    height: calc(100%);
    overflow-y: auto;
    .form {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      flex: 1;
      .clearBackColor {
        background-color: #fff;
      }
      .grpTitle {
        padding: 10px;
        margin-bottom: 10px;
        color: #606266;
        background-color: #e8e3e3;
        display: flex;
        .toolbar {
          .btn {
            padding: 0px 8px;
          }
        }
        .title {
          color: #000;
          padding-left: 4px;
          border-left: solid 2px #269bd8;
        }
        .analysis {
          flex: 1;
          display: flex;
          justify-content: center;
          .analysisItem {
            padding: 0 5px;
          }
        }
        .open {
          display: flex;
          max-height: 16px;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          -webkit-appearance: none;
          text-align: center;
          box-sizing: border-box;
          outline: 0;
          margin: 0;
          -webkit-transition: 0.1s;
          transition: 0.1s;
          font-size: 14px;
          .toolbar {
            .btn {
              padding: 0px 8px;
            }
          }
          .span {
            padding: 0px 8px;
          }
        }
      }
      .grpContent {
        min-height: 100px;
      }
      .grpFooter {
        display: flex;
        justify-content: center;
      }
      .form-items {
        display: flex;
        flex-direction: row;
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .grpFooter {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .form {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    .grpToolbar {
      padding: 10px;
      margin-bottom: 10px;
      color: #606266;
      display: flex;
    }
    .grpContent {
      min-height: 100px;
    }
    .grpFooter {
      display: flex;
      justify-content: center;
    }
    .form-items {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
