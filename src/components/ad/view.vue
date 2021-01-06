<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="fcform">
    <template v-if="model.childViewType === 'list'">
      <div class="formContent">
        <div class="form">
          <div
            class="grpTitle"
            :style="{ backgroundColor: '#fff' }"
          >
            <div class="analysis">
              <div class="titlecenter">
                {{ model.title }}
              </div>
              <div v-if="model.counteFields && model.counteFields.length !== 0">
                <span
                  class="analysisItem"
                  v-for="(anal, indexAnal) of model.counteFields"
                  :key="indexAnal"
                >
                  <template v-if="model.fields[anal]">
                    {{ model.fields[anal].fieldName }}合计：{{
                      mainObj[anal] || 0
                    }};
                  </template>
                </span>
              </div>
            </div>
            <div class="open">
              <div
                class="toolbar"
                v-if="!model.toolbarView || model.toolbarView === 'topRight'"
              >
                <span
                  class="btn"
                  v-for="(btn, btnIndex) of model.toolbar"
                  :key="btnIndex"
                  size="mini"
                  @click="groupToolbar(model, btn)"
                  >{{ $t(btn.btnName) }}</span
                >
              </div>
              <i
                class="el-icon-arrow-left"
                @click="showLine(formInfo)"
                v-if="formInfo.fldGroupOpen === false"
              ></i>
              <i class="el-icon-arrow-down" @click="showLine(formInfo)" v-else></i>
            </div>
          </div>
          <div class="grpContent" :hidden="formInfo.fldGroupOpen === false">
            <fcbaseform
              :value="mainObj"
              :inforow="model.infoRow"
              :rules="model.ruleInfo"
              :name="model.gldGroupCode"
              @labelclick="fieldLabelClick(model, mainObj, $event)"
              @click="fieldClick(model, mainObj, $event)"
              @dblclick="fieldDblclick(model, mainObj, $event)"
              @blur="fieldBlur(model, mainObj, $event)"
              @focus="fieldFocus(model, mainObj, $event)"
              @change="fieldValueChange(model, mainObj, $event)"
            >
              <template #formchild>
                <slot name="formchild"></slot>
              </template>
            </fcbaseform>
          </div>
          <div class="grpFooter" v-if="formInfo.fldGroupOpen===true">
            <div v-if="model.toolbarView === 'bottomRight'">
              <fctoolbar
                @click="groupToolbar(model, $event.btn)"
                :toolbar="model.lineToolbar"
              ></fctoolbar>
            </div>
          </div>
          <div class="formContent" v-if="model.children">
            <div
              class="form"
              v-for="(cmodel, childIndex) of model.children"
              :key="childIndex"
            >
              <div class="grpTitle">
                <div class="title">
                  {{ cmodel.title }}
                </div>
                <div class="analysis">
                  <div
                    v-if="cmodel.counteFields && cmodel.counteFields.length !== 0"
                  >
                    <span
                      class="analysisItem"
                      v-for="(canal, cindexAnal) of cmodel.counteFields"
                      :key="cindexAnal"
                    >
                      <template v-if="cmodel.fields[canal]">
                        {{ cmodel.fields[canal].fieldName }}合计：{{
                          mainObj[anal] || 0
                        }};
                      </template>
                    </span>
                  </div>
                </div>
                <div class="open">
                  <div
                    class="toolbar"
                    v-if="!cmodel.toolbarView || cmodel.toolbarView === 'topRight'"
                  >
                    <span
                      class="btn"
                      v-for="(cbtn, cbtnIndex) of cmodel.toolbar"
                      :key="cbtnIndex"
                      size="mini"
                      @click="groupToolbar(cmodel, cbtn)"
                      >{{ $t(cbtn.btnName) }}</span
                    >
                  </div>
                  <i
                    class="el-icon-arrow-left"
                    @click="showLine(cmodel)"
                    v-if="cmodel.fldGroupOpen === false"
                  ></i>
                  <i
                    class="el-icon-arrow-down"
                    @click="showLine(cmodel)"
                    v-else
                  ></i>
                </div>
              </div>
              <div class="grpContent" :hidden="cmodel.fldGroupOpen === false">
                <template
                  v-if="
                    cmodel.viewType === 'form' ||
                    (cmodel.viewType === 'links' && cmodel.editType === 'listFormEdit')
                  "
                >
                  <fcbaseform
                    v-for="(data, cindex) of cmodel.data"
                    :key="cindex"
                    :value="data"
                    :inforow="cmodel.infoRow"
                    :rules="cmodel.ruleInfo"
                    :name="cmodel.gldGroupCode"
                    @labelclick="fieldLabelClick(cmodel, mainObj, $event)"
                    @click="fieldClick(cmodel, data, $event)"
                    @dblclick="fieldDblclick(cmodel, data, $event)"
                    @blur="fieldBlur(cmodel, data, $event)"
                    @focus="fieldFocus(cmodel, data, $event)"
                    @change="fieldValueChange(cmodel, data, $event)"
                  >
                  </fcbaseform>
                </template>
                <template v-else-if="cmodel.viewType === 'links'">
                  <template v-if="cmodel.editType === 'listEdit'">
                    <fctable
                      :tableInfo="cmodel"
                      :height="200"
                      :isloading="isLoading"
                      :value="cmodel.data"
                      @toolbar="tableToolbar(cmodel, $event)"
                      @cellclick="tableCellClick(cmodel, $event)"
                      @celldblclick="tableCellDblClick(cmodel, $event)"
                      @rowclick="tableRowClick(cmodel, $event)"
                      @rowdblclick="tableRowDblClick(cmodel, $event)"
                      @sortchange="tableSortChange(cmodel, $event)"
                      @headerclick="tableHeaderClick(cmodel, $event)"
                      @rowcontextmenu="tableRowContextmenu(cmodel, $event)"
                      @headercontextmenu="tableHeaderContextmenu(cmodel, $event)"
                      @selectionchange="tableSelectionChange(cmodel, $event)"
                      @selectall="tableSelectAll(cmodel, $event)"
                      @select="tableSelectOne(cmodel, $event)"
                      @pagechange="tablePageChange(cmodel, $event)"
                      @linkclick="tableLinkClick(cmodel, $event)"
                      @click="tableFieldClick(cmodel, cmodel.data, $event)"
                      @dblclick="tableFieldDblclick(cmodel, cmodel.data, $event)"
                      @blur="tableFieldBlur(cmodel, cmodel.data, $event)"
                      @focus="tableFieldFocus(cmodel, cmodel.data, $event)"
                      @change="tableFieldValueChange(cmodel, cmodel.data, $event)"
                    ></fctable>
                  </template>
                  <template v-else-if="cmodel.editType === 'dialogEdit'">
                    <el-dialog
                      :title="cmodel.title"
                      :visible="cmodel.formShow === true"
                      width="70%"
                      v-dialogDrag
                      :before-close="formClose"
                      append-to-body
                    >
                      <fcbaseform
                        v-for="(data, cindex) of cmodel.data"
                        :key="cindex"
                        :value="data"
                        :inforow="cmodel.infoRow"
                        :rules="cmodel.ruleInfo"
                        :name="cmodel.gldGroupCode"
                        @labelclick="fieldLabelClick(cmodel, mainObj, $event)"
                        @click="fieldClick(cmodel, data, $event)"
                        @dblclick="fieldDblclick(cmodel, data, $event)"
                        @blur="fieldBlur(cmodel, data, $event)"
                        @focus="fieldFocus(cmodel, data, $event)"
                        @change="fieldValueChange(cmodel, data, $event)"
                      >
                      </fcbaseform>
                    </el-dialog>
                  </template>
                </template>
              </div>
              <div class="grpFooter" v-if="cmodel.toolbarView">
                <div v-if="cmodel.toolbarView === 'bottomRight'">
                  <fctoolbar
                    @click="groupToolbar(cmodel, $event.btn)"
                    :toolbar="cmodel.linetoolbar"
                  ></fctoolbar>
                </div>
              </div>
            </div>
            <slot name="listchild"></slot>
          </div>
        </div>
      </div>
      <!-- <div class="footer" v-if="model.fldGroupOpen">
        <fctoolbar
          @click="formToolbar($event.btn)"
          :toolbar="model.toolbar"
        ></fctoolbar>
      </div> -->
    </template>
    <template v-else-if="model.childViewType === 'tab'">
      <el-tabs :value="model.fldGroupCode">
        <el-tab-pane
          :label="model.title"
          :name="model.fldGroupCode"
        >
          <div class="form">
            <div class="grpToolbar" v-if="model.lineToolbar && model.lineToolbar.length !== 0">
              <fctoolbar
                @click="formToolbar(model, $event.btn)"
                :toolbar="model.lineToolbar"
              ></fctoolbar>
            </div>
            <div class="grpContent">
              <fcbaseform
                :value="mainObj"
                :inforow="model.infoRow"
                :rules="model.ruleInfo"
                :name="model.gldGroupCode"
                @labelclick="fieldLabelClick(model, mainObj, $event)"
                @click="fieldClick(model, data, $event)"
                @dblclick="fieldDblclick(model, data, $event)"
                @blur="fieldBlur(model, data, $event)"
                @focus="fieldFocus(model, data, $event)"
                @change="fieldValueChange(model, data, $event)"
              >
                <template #formchild>
                  <slot name="formchild"></slot>
                </template>
              </fcbaseform>
            </div>
            <div class="grpFooter">
              <div class="analysis">
                <div v-if="model.counteFields && model.counteFields.length !== 0">
                  <span
                    class="analysisItem"
                    v-for="(anal, indexAnal) of model.counteFields"
                    :key="indexAnal"
                  >
                    <template v-if="model.fields[anal]">
                      {{ model.fields[anal].fieldName }}合计：{{
                        mainObj[anal] || 0
                      }};
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="footer" v-if="model.lineToolbar && model.lineToolbar.length !== 0">
            <fctoolbar
              @click="formToolbar($event.btn)"
              :toolbar="model.lineToolbar"
            ></fctoolbar>
          </div> -->
        </el-tab-pane>
        <el-tab-pane
          v-for="(cmodel, childIndex) of model.children"
          :label="cmodel.title"
          :key="childIndex"
          :name="cmodel.fldGroupCode"
        >
          <div class="form">
            <div
              class="grpToolbar"
              v-if="cmodel.toolbar && cmodel.toolbar.length !== 0"
            >
              <fctoolbar
                @click="groupToolbar(cmodel, $event.btn)"
                :toolbar="cmodel.toolbar"
              ></fctoolbar>
            </div>
            <div class="grpContent" :hidden="cmodel.fldGroupOpen === false">
              <template
                v-if="
                  cmodel.viewType === 'form' ||
                  (cmodel.viewType === 'links' && cmodel.editType === 'listFormEdit')
                "
              >
                <fcbaseform
                  v-for="(data, cindex) of cmodel.data"
                  :key="cindex"
                  :value="data"
                  :inforow="cmodel.infoRow"
                  :rules="cmodel.ruleInfo"
                  :name="cmodel.gldGroupCode"
                  @labelclick="fieldLabelClick(cmodel, mainObj, $event)"
                  @click="fieldClick(cmodel, data, $event)"
                  @dblclick="fieldDblclick(cmodel, data, $event)"
                  @blur="fieldBlur(cmodel, data, $event)"
                  @focus="fieldFocus(cmodel, data, $event)"
                  @change="fieldValueChange(cmodel, data, $event)"
                >
                </fcbaseform>
              </template>
              <template v-else-if="cmodel.viewType === 'links'">
                <template v-if="cmodel.editType === 'listEdit'">
                  <fctable
                    :tableInfo="cmodel"
                    :height="200"
                    :isloading="isLoading"
                    :value="cmodel.data"
                    @toolbar="tableToolbar(cmodel, $event)"
                    @cellclick="tableCellClick(cmodel, $event)"
                    @celldblclick="tableCellDblClick(cmodel, $event)"
                    @rowclick="tableRowClick(cmodel, $event)"
                    @rowdblclick="tableRowDblClick(cmodel, $event)"
                    @sortchange="tableSortChange(cmodel, $event)"
                    @headerclick="tableHeaderClick(cmodel, $event)"
                    @rowcontextmenu="tableRowContextmenu(cmodel, $event)"
                    @headercontextmenu="tableHeaderContextmenu(cmodel, $event)"
                    @selectionchange="tableSelectionChange(cmodel, $event)"
                    @selectall="tableSelectAll(cmodel, $event)"
                    @select="tableSelectOne(cmodel, $event)"
                    @pagechange="tablePageChange(cmodel, $event)"
                    @linkclick="tableLinkClick(cmodel, $event)"
                    @click="tableFieldClick(cmodel, cmodel.data, $event)"
                    @dblclick="tableFieldDblclick(cmodel, cmodel.data, $event)"
                    @blur="tableFieldBlur(cmodel, cmodel.data, $event)"
                    @focus="tableFieldFocus(cmodel, cmodel.data, $event)"
                    @change="tableFieldValueChange(cmodel, cmodel.data, $event)"
                  ></fctable>
                </template>
                <template v-else-if="cmodel.editType === 'dialogEdit'">
                  <el-dialog
                    :title="cmodel.title"
                    :visible="cmodel.formShow === true"
                    width="70%"
                    v-dialogDrag
                    :before-close="formClose"
                    append-to-body
                  >
                    <fcbaseform
                      v-for="(data, cindex) of cmodel.data"
                      :key="cindex"
                      :value="data"
                      :inforow="cmodel.infoRow"
                      :rules="cmodel.ruleInfo"
                      :name="cmodel.gldGroupCode"
                      @labelclick="fieldLabelClick(cmodel, mainObj, $event)"
                      @click="fieldClick(cmodel, data, $event)"
                      @dblclick="fieldDblclick(cmodel, data, $event)"
                      @blur="fieldBlur(cmodel, data, $event)"
                      @focus="fieldFocus(cmodel, data, $event)"
                      @change="fieldValueChange(cmodel, data, $event)"
                    >
                    </fcbaseform>
                  </el-dialog>
                </template>
              </template>
            </div>
            <div class="grpFooter" v-if="cmodel.toolbarView">
              <div v-if="cmodel.toolbarView === 'bottomRight'">
                <fctoolbar
                  @click="groupToolbar(cmodel, $event.btn)"
                  :toolbar="cmodel.linetoolbar"
                ></fctoolbar>
              </div>
            </div>
            <div class="formContent" v-if="cmodel.children">
              <div
                class="form"
                v-for="(ccmodel, cchildIndex) of cmodel.children"
                :key="cchildIndex"
              >
                <div class="grpTitle">
                  <div class="title">{{ ccmodel.title }}</div>
                  <div class="analysis">
                    <div
                      v-if="ccmodel.counteFields && ccmodel.counteFields.length !== 0"
                    >
                      <span
                        class="analysisItem"
                        v-for="(canal, cindexAnal) of ccmodel.counteFields"
                        :key="cindexAnal"
                      >
                        <template v-if="ccmodel.fields[canal]">
                          {{ ccmodel.fields[canal].fieldName }}合计：{{
                            mainObj[anal] || 0
                          }};
                        </template>
                      </span>
                    </div>
                  </div>
                  <div class="open">
                    <div
                      class="toolbar"
                      v-if="!ccmodel.toolbarView || ccmodel.toolbarView === 'topRight'"
                    >
                      <span
                        class="btn"
                        v-for="(cbtn, cbtnIndex) of ccmodel.toolbar"
                        :key="cbtnIndex"
                        size="mini"
                        @click="groupToolbar(ccmodel, cbtn)"
                        >{{ $t(cbtn.btnName) }}</span
                      >
                    </div>
                    <i
                      class="el-icon-arrow-left"
                      @click="showLine(ccmodel)"
                      v-if="ccmodel.fldGroupOpen === false"
                    ></i>
                    <i
                      class="el-icon-arrow-down"
                      @click="showLine(ccmodel)"
                      v-else
                    ></i>
                  </div>
                </div>
                <div class="grpContent" :hidden="ccmodel.fldGroupOpen === false">
                  <template
                    v-if="
                      ccmodel.viewType === 'form' ||
                      (ccmodel.viewType === 'links' &&
                        ccmodel.editType === 'listFormEdit')
                    "
                  >
                    <fcbaseform
                      v-for="(data, cindex) of ccmodel.data"
                      :key="cindex"
                      :value="data"
                      :inforow="ccmodel.infoRow"
                      :rules="ccmodel.ruleInfo"
                      :name="ccmodel.gldGroupCode"
                      @labelclick="fieldLabelClick(ccmodel, mainObj, $event)"
                      @click="fieldClick(ccmodel, data, $event)"
                      @dblclick="fieldDblclick(ccmodel, data, $event)"
                      @blur="fieldBlur(ccmodel, data, $event)"
                      @focus="fieldFocus(ccmodel, data, $event)"
                      @change="fieldValueChange(ccmodel, data, $event)"
                    >
                    </fcbaseform>
                  </template>
                  <template v-else-if="ccmodel.viewType === 'links'">
                    <template v-if="ccmodel.editType === 'listEdit'">
                      <fctable
                        :tableInfo="ccmodel"
                        :height="200"
                        :isloading="isLoading"
                        :value="ccmodel.data"
                        @toolbar="tableToolbar(ccmodel, $event)"
                        @cellclick="tableCellClick(ccmodel, $event)"
                        @celldblclick="tableCellDblClick(ccmodel, $event)"
                        @rowclick="tableRowClick(ccmodel, $event)"
                        @rowdblclick="tableRowDblClick(ccmodel, $event)"
                        @sortchange="tableSortChange(ccmodel, $event)"
                        @headerclick="tableHeaderClick(ccmodel, $event)"
                        @rowcontextmenu="tableRowContextmenu(ccmodel, $event)"
                        @headercontextmenu="
                          tableHeaderContextmenu(ccmodel, $event)
                        "
                        @selectionchange="tableSelectionChange(ccmodel, $event)"
                        @selectall="tableSelectAll(ccmodel, $event)"
                        @select="tableSelectOne(ccmodel, $event)"
                        @pagechange="tablePageChange(ccmodel, $event)"
                        @linkclick="tableLinkClick(ccmodel, $event)"
                        @click="tableFieldClick(ccmodel, ccmodel.data, $event)"
                        @dblclick="tableFieldDblclick(ccmodel, ccmodel.data, $event)"
                        @blur="tableFieldBlur(ccmodel, ccmodel.data, $event)"
                        @focus="tableFieldFocus(ccmodel, ccmodel.data, $event)"
                        @change="tableFieldValueChange(ccmodel, ccmodel.data, $event)"
                      ></fctable>
                    </template>
                    <template v-else-if="ccmodel.editType === 'dialogEdit'">
                      <el-dialog
                        :title="ccmodel.title"
                        :visible="ccmodel.formShow === true"
                        width="70%"
                        :before-close="formClose"
                        v-dialogDrag
                        append-to-body
                      >
                        <fcbaseform
                          v-for="(data, cindex) of ccmodel.data"
                          :key="cindex"
                          :value="data"
                          :inforow="ccmodel.infoRow"
                          :rules="ccmodel.ruleInfo"
                          :name="ccmodel.gldGroupCode"
                          @labelclick="fieldLabelClick(ccmodel, mainObj, $event)"
                          @click="fieldClick(ccmodel, data, $event)"
                          @dblclick="fieldDblclick(ccmodel, data, $event)"
                          @blur="fieldBlur(ccmodel, data, $event)"
                          @focus="fieldFocus(ccmodel, data, $event)"
                          @change="fieldValueChange(ccmodel, data, $event)"
                        >
                        </fcbaseform>
                      </el-dialog>
                    </template>
                  </template>
                </div>
                <div class="grpFooter" v-if="ccmodel.fldGroupOpen">
                  <div v-if="ccmodel.toolbarView === 'bottomRight'">
                    <fctoolbar
                      @click="groupToolbar(ccmodel, $event.btn)"
                      :toolbar="ccmodel.toolbar"
                    ></fctoolbar>
                  </div>
                </div>
              </div>
            </div>
            <div class="grpFooter">
              <div class="analysis">
                <div v-if="cmodel.counteFields && cmodel.counteFields.length !== 0">
                  <span
                    class="analysisItem"
                    v-for="(anal, indexAnal) of cmodel.counteFields"
                    :key="indexAnal"
                  >
                    <template v-if="cmodel.fields[anal]">
                      {{ cmodel.fields[anal].fieldName }}合计：{{
                        mainObj[anal] || 0
                      }};
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="footer" v-if="model.linetoolbar">
            <fctoolbar
              @click="formToolbar($event.btn)"
              :toolbar="model.linetoolbar"
            ></fctoolbar>
          </div>
        </el-tab-pane>
        <slot name="listchild"></slot>
      </el-tabs>
    </template>
    <template v-else-if="model.childViewType === 'tablist'">
      <div class="formContent">
        <div class="form">
          <div
            class="grpTitle"
            :style="{ backgroundColor:'#fff' }"
          >
            <div class="analysis">
              <div class="titlecenter">
                {{ model.title }}
              </div>
              <div v-if="model.counteFields && model.counteFields.length !== 0">
                <span
                  class="analysisItem"
                  v-for="(anal, indexAnal) of model.counteFields"
                  :key="indexAnal"
                >
                  <template v-if="model.fields[anal]">
                    {{ model.fields[anal].fieldName }}合计：{{
                      mainObj[anal] || 0
                    }};
                  </template>
                </span>
              </div>
            </div>
            <div class="open">
              <div
                class="toolbar"
                v-if="!model.toolbarView || model.toolbarView === 'topRight'"
              >
                <span
                  class="btn"
                  v-for="(btn, btnIndex) of model.toolbar"
                  :key="btnIndex"
                  size="mini"
                  @click="groupToolbar(model, btn)"
                  >{{ $t(btn.btnName) }}</span
                >
              </div>
              <i
                class="el-icon-arrow-left"
                @click="showLine(formInfo)"
                v-if="formInfo.fldGroupOpen === false"
              ></i>
              <i class="el-icon-arrow-down" @click="showLine(formInfo)" v-else></i>
            </div>
          </div>
          <div class="grpContent" :hidden="formInfo.fldGroupOpen === false">
            <fcbaseform
              :value="mainObj"
              :inforow="model.infoRow"
              :rules="model.ruleInfo"
              :name="model.gldGroupCode"
              @labelclick="fieldLabelClick(model, mainObj, $event)"
              @click="fieldClick(model, mainObj, $event)"
              @dblclick="fieldDblclick(model, mainObj, $event)"
              @blur="fieldBlur(model, mainObj, $event)"
              @focus="fieldFocus(model, mainObj, $event)"
              @change="fieldValueChange(model, mainObj, $event)"
            >
              <template #formchild>
                <slot name="formchild"></slot>
              </template>
            </fcbaseform>
          </div>
        </div>
      </div>
      <el-tabs :value="model.children[0].fldGroupCode">
        <el-tab-pane
          v-for="(cmodel, childIndex) of model.children"
          :label="cmodel.title"
          :key="childIndex"
          :name="cmodel.fldGroupCode"
        >
          <div class="form">
            <div
              class="grpToolbar"
              v-if="cmodel.toolbar && cmodel.toolbar.length !== 0"
            >
              <fctoolbar
                @click="groupToolbar(cmodel, $event.btn)"
                :toolbar="cmodel.toolbar"
              ></fctoolbar>
            </div>
            <div class="grpContent" :hidden="cmodel.fldGroupOpen === false">
              <template
                v-if="
                  cmodel.viewType === 'form' ||
                  (cmodel.viewType === 'links' && cmodel.editType === 'listFormEdit')
                "
              >
                <fcbaseform
                  v-for="(data, cindex) of cmodel.data"
                  :key="cindex"
                  :value="data"
                  :inforow="cmodel.infoRow"
                  :rules="cmodel.ruleInfo"
                  :name="cmodel.gldGroupCode"
                  @labelclick="fieldLabelClick(cmodel, mainObj, $event)"
                  @click="fieldClick(cmodel, data, $event)"
                  @dblclick="fieldDblclick(cmodel, data, $event)"
                  @blur="fieldBlur(cmodel, data, $event)"
                  @focus="fieldFocus(cmodel, data, $event)"
                  @change="fieldValueChange(cmodel, data, $event)"
                >
                </fcbaseform>
              </template>
              <template v-else-if="cmodel.viewType === 'links'">
                <template v-if="cmodel.editType === 'listEdit'">
                  <fctable
                    :tableInfo="cmodel"
                    :height="200"
                    :isloading="isLoading"
                    :value="cmodel.data"
                    @toolbar="tableToolbar(cmodel, $event)"
                    @cellclick="tableCellClick(cmodel, $event)"
                    @celldblclick="tableCellDblClick(cmodel, $event)"
                    @rowclick="tableRowClick(cmodel, $event)"
                    @rowdblclick="tableRowDblClick(cmodel, $event)"
                    @sortchange="tableSortChange(cmodel, $event)"
                    @headerclick="tableHeaderClick(cmodel, $event)"
                    @rowcontextmenu="tableRowContextmenu(cmodel, $event)"
                    @headercontextmenu="tableHeaderContextmenu(cmodel, $event)"
                    @selectionchange="tableSelectionChange(cmodel, $event)"
                    @selectall="tableSelectAll(cmodel, $event)"
                    @select="tableSelectOne(cmodel, $event)"
                    @pagechange="tablePageChange(cmodel, $event)"
                    @linkclick="tableLinkClick(cmodel, $event)"
                    @click="tableFieldClick(cmodel, cmodel.data, $event)"
                    @dblclick="tableFieldDblclick(cmodel, cmodel.data, $event)"
                    @blur="tableFieldBlur(cmodel, cmodel.data, $event)"
                    @focus="tableFieldFocus(cmodel, cmodel.data, $event)"
                    @change="tableFieldValueChange(cmodel, cmodel.data, $event)"
                  ></fctable>
                </template>
                <template v-else-if="cmodel.editType === 'dialogEdit'">
                  <el-dialog
                    :title="cmodel.title"
                    :visible="cmodel.formShow === true"
                    width="70%"
                    v-dialogDrag
                    :before-close="formClose"
                    append-to-body
                  >
                    <fcbaseform
                      v-for="(data, cindex) of cmodel.data"
                      :key="cindex"
                      :value="data"
                      :inforow="cmodel.infoRow"
                      :rules="cmodel.ruleInfo"
                      :name="cmodel.gldGroupCode"
                      @labelclick="fieldLabelClick(cmodel, mainObj, $event)"
                      @click="fieldClick(cmodel, data, $event)"
                      @dblclick="fieldDblclick(cmodel, data, $event)"
                      @blur="fieldBlur(cmodel, data, $event)"
                      @focus="fieldFocus(cmodel, data, $event)"
                      @change="fieldValueChange(cmodel, data, $event)"
                    >
                    </fcbaseform>
                  </el-dialog>
                </template>
              </template>
            </div>
            <div class="grpFooter" v-if="cmodel.toolbarView">
              <div v-if="cmodel.toolbarView === 'bottomRight'">
                <fctoolbar
                  @click="groupToolbar(cmodel, $event.btn)"
                  :toolbar="cmodel.linetoolbar"
                ></fctoolbar>
              </div>
            </div>
            <div class="formContent" v-if="cmodel.children">
              <div
                class="form"
                v-for="(ccmodel, cchildIndex) of cmodel.children"
                :key="cchildIndex"
              >
                <div class="grpTitle">
                  <div class="title">{{ ccmodel.title }}</div>
                  <div class="analysis">
                    <div
                      v-if="ccmodel.counteFields && ccmodel.counteFields.length !== 0"
                    >
                      <span
                        class="analysisItem"
                        v-for="(canal, cindexAnal) of ccmodel.counteFields"
                        :key="cindexAnal"
                      >
                        <template v-if="ccmodel.fields[canal]">
                          {{ ccmodel.fields[canal].fieldName }}合计：{{
                            mainObj[anal] || 0
                          }};
                        </template>
                      </span>
                    </div>
                  </div>
                  <div class="open">
                    <div
                      class="toolbar"
                      v-if="!ccmodel.toolbarView || ccmodel.toolbarView === 'topRight'"
                    >
                      <span
                        class="btn"
                        v-for="(cbtn, cbtnIndex) of ccmodel.toolbar"
                        :key="cbtnIndex"
                        size="mini"
                        @click="groupToolbar(ccmodel, cbtn)"
                        >{{ $t(cbtn.btnName) }}</span
                      >
                    </div>
                    <i
                      class="el-icon-arrow-left"
                      @click="showLine(ccmodel)"
                      v-if="ccmodel.fldGroupOpen === false"
                    ></i>
                    <i
                      class="el-icon-arrow-down"
                      @click="showLine(ccmodel)"
                      v-else
                    ></i>
                  </div>
                </div>
                <div class="grpContent" :hidden="ccmodel.fldGroupOpen === false">
                  <template
                    v-if="
                      ccmodel.viewType === 'form' ||
                      (ccmodel.viewType === 'links' &&
                        ccmodel.editType === 'listFormEdit')
                    "
                  >
                    <fcbaseform
                      v-for="(data, cindex) of ccmodel.data"
                      :key="cindex"
                      :value="data"
                      :inforow="ccmodel.infoRow"
                      :rules="ccmodel.ruleInfo"
                      :name="ccmodel.gldGroupCode"
                      @labelclick="fieldLabelClick(ccmodel, mainObj, $event)"
                      @click="fieldClick(ccmodel, data, $event)"
                      @dblclick="fieldDblclick(ccmodel, data, $event)"
                      @blur="fieldBlur(ccmodel, data, $event)"
                      @focus="fieldFocus(ccmodel, data, $event)"
                      @change="fieldValueChange(ccmodel, data, $event)"
                    >
                    </fcbaseform>
                  </template>
                  <template v-else-if="ccmodel.viewType === 'links'">
                    <template v-if="ccmodel.editType === 'listEdit'">
                      <fctable
                        :tableInfo="ccmodel"
                        :height="200"
                        :isloading="isLoading"
                        :value="ccmodel.data"
                        @toolbar="tableToolbar(ccmodel, $event)"
                        @cellclick="tableCellClick(ccmodel, $event)"
                        @celldblclick="tableCellDblClick(ccmodel, $event)"
                        @rowclick="tableRowClick(ccmodel, $event)"
                        @rowdblclick="tableRowDblClick(ccmodel, $event)"
                        @sortchange="tableSortChange(ccmodel, $event)"
                        @headerclick="tableHeaderClick(ccmodel, $event)"
                        @rowcontextmenu="tableRowContextmenu(ccmodel, $event)"
                        @headercontextmenu="
                          tableHeaderContextmenu(ccmodel, $event)
                        "
                        @selectionchange="tableSelectionChange(ccmodel, $event)"
                        @selectall="tableSelectAll(ccmodel, $event)"
                        @select="tableSelectOne(ccmodel, $event)"
                        @pagechange="tablePageChange(ccmodel, $event)"
                        @linkclick="tableLinkClick(ccmodel, $event)"
                        @click="tableFieldClick(ccmodel, ccmodel.data, $event)"
                        @dblclick="tableFieldDblclick(ccmodel, ccmodel.data, $event)"
                        @blur="tableFieldBlur(ccmodel, ccmodel.data, $event)"
                        @focus="tableFieldFocus(ccmodel, ccmodel.data, $event)"
                        @change="tableFieldValueChange(ccmodel, ccmodel.data, $event)"
                      ></fctable>
                    </template>
                    <template v-else-if="ccmodel.editType === 'dialogEdit'">
                      <el-dialog
                        :title="ccmodel.title"
                        :visible="ccmodel.formShow === true"
                        width="70%"
                        :before-close="formClose"
                        v-dialogDrag
                        append-to-body
                      >
                        <fcbaseform
                          v-for="(data, cindex) of ccmodel.data"
                          :key="cindex"
                          :value="data"
                          :inforow="ccmodel.infoRow"
                          :rules="ccmodel.ruleInfo"
                          :name="ccmodel.gldGroupCode"
                          @labelclick="fieldLabelClick(ccmodel, mainObj, $event)"
                          @click="fieldClick(ccmodel, data, $event)"
                          @dblclick="fieldDblclick(ccmodel, data, $event)"
                          @blur="fieldBlur(ccmodel, data, $event)"
                          @focus="fieldFocus(ccmodel, data, $event)"
                          @change="fieldValueChange(ccmodel, data, $event)"
                        >
                        </fcbaseform>
                      </el-dialog>
                    </template>
                  </template>
                </div>
                <div class="grpFooter" v-if="ccmodel.fldGroupOpen">
                  <div v-if="ccmodel.toolbarView === 'bottomRight'">
                    <fctoolbar
                      @click="groupToolbar(ccmodel, $event.btn)"
                      :toolbar="ccmodel.toolbar"
                    ></fctoolbar>
                  </div>
                </div>
              </div>
            </div>
            <div class="grpFooter">
              <div class="analysis">
                <div v-if="cmodel.counteFields && cmodel.counteFields.length !== 0">
                  <span
                    class="analysisItem"
                    v-for="(anal, indexAnal) of cmodel.counteFields"
                    :key="indexAnal"
                  >
                    <template v-if="cmodel.fields[anal]">
                      {{ cmodel.fields[anal].fieldName }}合计：{{
                        mainObj[anal] || 0
                      }};
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="footer" v-if="model.linetoolbar">
            <fctoolbar
              @click="formToolbar($event.btn)"
              :toolbar="model.linetoolbar"
            ></fctoolbar>
          </div>
        </el-tab-pane>
        <slot name="listchild"></slot>
      </el-tabs>
      <!-- <div class="footer" v-if="model.linetoolbar">
        <fctoolbar
          @click="formToolbar($event.btn)"
          :toolbar="model.linetoolbar"
        ></fctoolbar>
      </div> -->
    </template>
  </div>
</template>
<script>
import ViewModel from './list-form'
import fcbaseform from './baseform'
import fctable from './table'
import fctoolbar from './toolbar'

export default {
  name: 'fcview',
  components: {
    fcbaseform,
    fctoolbar,
    fctable
  },
  data () {
    return {
      isLoading: false,
      // 默认状态，当为-1时可以关闭，当为已保存时可以关闭
      status: '-1',
      mainObj: this.value
    }
  },
  props: {
    formInfo: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    model () {
      return { ...this.formInfo }
    }
  },
  watch: {
    formInfo: {
      // eslint-disable-next-line no-unused-vars
      handler (newName, oldName) {
        this.init()
      },
      deep: true,
      immediate: true
    },
    value () {
      this.mainObj = this.value
    }
  },
  methods: {
    /**
     * 初始化内容
     */
    init () {
      ViewModel.initViewModel(this.model)
    },
    /**
     * 点击显示或隐藏分组或分区
     */
    showLine (grp) {
      grp.fldGroupOpen = !grp.fldGroupOpen
      this.event('titleclick', '显示隐藏', { grp })
    },
    /**
     * 分组工具栏事件
     * @param {*} grp 分组内容
     * @param {*} btn 按钮事件名称
     */
    groupToolbar (grp, btn) {
      this.event('grouptoolbar', '分组工具栏事件', { grp, btn })
    },
    /**
     * 表单工具栏事件
     * @param {*} btn 按钮事件名称
     */
    formToolbar (btn) {
      this.event('toolbar', '表单工具栏事件', { eventname: btn.btnAct, btn })
    },
    /**
     * 点击标题处理
     */
    fieldLabelClick (grp, data, field) {
      this.event('labelclick', '点击标题', { grp, data, field })
    },
    /**
     * 单击处理
     */
    fieldClick (grp, data, param) {
      this.event('click', '单击', { grp, data, ...param })
    },
    /**
     * 双击处理
     */
    fieldDblclick (grp, data, param) {
      this.event('dblClick', '双击', { grp, data, ...param })
    },
    /**
     * 失去焦点处理
     */
    fieldBlur (grp, data, param) {
      this.event('blur', '失去失去焦点', { grp, data, ...param })
    },
    /**
     * 获得焦点处理
     */
    fieldFocus (grp, data, param) {
      this.event('focus', '获得焦点', { grp, data, ...param })
    },
    /**
     * 内容修改处理
     */
    fieldValueChange (grp, data, param) {
      const fieldCode = param.field.tableName === undefined ? param.field.fieldCode : `${param.field.tableName}___${param.field.fieldCode}`
      // eslint-disable-next-line vue/no-mutating-props
      this.value[fieldCode] = param.change[fieldCode]
      // eslint-disable-next-line vue/no-mutating-props
      this.formInfo.data[0] = this.value
      this.event('change', '内容修改', {
        grp,
        ...param
      })
    },
    /**
     * 列表工具栏事件
     */
    tableToolbar (grp, param) {
      param.grp = grp
      this.event('tabletoolbar', '列表工具栏', param)
    },
    /**
     * 列表行点击事件处理
     */
    tableRowClick (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '行单击', param)
    },
    /**
     * 双击行时，默认选中的对象修改为当前行，并打开浏览窗口
     */
    tableRowDblClick (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '行双击', param)
    },
    /**
     * 列表单元格点击事件处理
     */
    tableCellClick (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '单元格单击', param)
    },
    /**
     * 列表单元格双击事件处理
     */
    tableCellDblClick (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '单元格双击', param)
    },
    /**
     * 打开链接，暂时支持查看当前明细
     */
    tableLinkClick (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '点击链接', param)
    },
    /**
     * 列表排序处理
     */
    tableSortChange (grp, param) {
      param.grp = grp
      grp.status = 1
      this.event(`table${param.eventname}`, '排序', param)
    },
    /**
     * 标题点击
     */
    tableHeaderClick (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '标题单击', param)
    },
    /**
     * 行右键
     */
    tableRowContextmenu (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '行右键', param)
    },
    /**
     * 标题右键
     */
    tableHeaderContextmenu (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '标题右键', param)
    },
    /**
     * 选中行修改时
     */
    tableSelectionChange (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '选中行修改', param)
    },
    /**
     * 全选事件
     */
    tableSelectAll (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '全选', param)
    },
    /**
     * 单选一行
     */
    tableSelectOne (grp, param) {
      param.grp = grp
      this.event(`table${param.eventname}`, '单选', param)
    },
    /**
     * 页数改变时
     */
    tablePageChange (grp, param) {
      param.grp = grp
      this.event('tablepagechange', '页数改变', {
        eventname: 'pagenumChange',
        ...param,
        change: param.change
      })
    },
    /**
     * 列表字段单击处理
     */
    tableFieldClick (grp, data, param) {
      this.event('tablefieldclick', '列表字段单击', { grp, ...param })
    },
    /**
     * 列表字段双击处理
     */
    tableFieldDblclick (grp, data, param) {
      this.event('tablefielddblclick', '列表字段双击', { grp, ...param })
    },
    /**
     * 列表字段失去焦点处理
     */
    tableFieldBlur (grp, data, param) {
      this.event('tablefieldblur', '列表字段失去焦点', { grp, ...param })
    },
    /**
     * 列表字段获得焦点处理
     */
    tableFieldFocus (grp, data, param) {
      this.event('tablefieldfocus', '列表字段获得焦点', { grp, ...param })
    },
    /**
     * 列表字段内容修改处理
     */
    tableFieldValueChange (grp, data, param) {
      // 值被修改
      grp.status = 1
      this.event('tablefieldchange', '列表字段内容修改', {
        grp,
        ...param
      })
    },
    /**
     * 获取当前表单数据内容及子表的内容
     */
    getAllValue () {
      const result = {}
      function getValue (group, data = {}) {
        const obj = {}
        Object.keys(data).forEach((key) => {
          const value = data[key]
          if (key.indexOf('.') === -1) {
            obj[key] = value
          } else {
            const keys = key.split('.')
            const tableObj = obj[keys[0]] || {}
            tableObj[keys[1]] = value
            obj[keys[0]] = tableObj
          }
        })
        return obj
      }
      result[this.formInfo.fldGroupCode] = getValue(this.formInfo, this.formInfo.data[0])
      if (this.formInfo.children) {
        this.formInfo.children.forEach((child) => {
          const dValue = {}
          result[child.fldGroupCode] = dValue
          child.data.forEach((d) => {
            const temp = getValue(child, d)
            Object.keys(temp).forEach((tn) => {
              if (dValue[tn] === undefined) {
                dValue[tn] = [temp[tn]]
              } else {
                dValue[tn].push(temp[tn])
              }
            })
          })
          if (child.children) {
            child.children.forEach((cchild) => {
              const cdValue = {}
              result[cchild.fldGroupCode] = cdValue
              cchild.data.forEach((d) => {
                const temp = getValue(cchild, d)
                Object.keys(temp).forEach((tn) => {
                  if (cdValue[tn] === undefined) {
                    cdValue[tn] = [temp[tn]]
                  } else {
                    cdValue[tn].push(temp[tn])
                  }
                })
              })
            })
          }
        })
      }
      return result
    },
    event (eventname, desc, param) {
      if (param.grp === undefined) {
        param.grp = this.model.fldGroup[0]
      }
      this.$emit(eventname, {
        ...param,
        desc,
        fldGroupCode: param.grp.fldGroupCode,
        eventname,
        ref: this.$refs.form,
        value: this.getAllValue()
      })
    }
  }
}
</script>

<style lang="scss">
.el-form {
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}
.fcform {
  background-color: #fff;
  margin: 10px auto;
  width: 1200px;
  height: auto;
  -webkit-box-shadow: 0 0 10px 0 #d4d4d4;
  box-shadow: 0 0 10px 0 #d4d4d4;
  padding: 30px;
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
          .titlecenter {
            font-size: 20px;
            font-weight: 700;
            color: #38a9ff;
            height: 25px;
            line-height: 25px;
            border-bottom: 1px solid #38a9ff;
            padding: 0 25px;
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
