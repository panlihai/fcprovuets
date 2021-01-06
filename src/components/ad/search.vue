<!--
 * @Description: In User Settings Edit
 * @Author: panlihai
 * @Date: 2020-12-7 14:35:06
 * @LastEditTime: 2020-12-7 14:35:06
 * @LastEditors: panlihai
 -->
<template>
  <div class="searchModel" v-if="infoRow.length!==0">
    <el-form
      size="mini"
      label-width="100px"
      label-position="right"
      ref="form"
      :model="value"
    >
      <el-row v-for="(row, index) of infoRow" :key="index">
        <template
          v-if="
            (index === 0 && searchInfo.viewRowSize === 1) || searchInfo.viewRowSize !== 1
          "
        >
          <el-col v-for="(field, index0) of row" :span="field.span" :key="index0">
            <el-form-item
              :label="field.fieldName"
              :prop="field.fieldCode"
              :class="field.inputType"
              @click="labelClick(field)"
              class="search-form-item"
            >
              <fcbasefield :field="field" :value="mainObj" :showlabel="true" :maxrow="infoRow.length" :viewRowSize="searchInfo.viewRowSize"
              @toolbar="toolbar"
              @click="fieldClick(field)"
              @dblclick="fieldDblclick(field)"
              @blur="fieldBlur(field)"
              @focus="fieldFocus(field)"
              @change="valueChange(field, $event)"
              ></fcbasefield>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import ViewModel from './list-form'
import fcbasefield from './field'

export default {
  name: 'fcsearch',
  components: { fcbasefield },
  props: {
    searchInfo: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      infoRow: [],
      mainObj: { ...this.value }
    }
  },
  watch: {
    searchInfo: {
      handler () {
        this.infoRow = ViewModel.initSearchModel(
          this.searchInfo,
          false
        )
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.infoRow = ViewModel.initSearchModel(
      this.searchInfo,
      false
    )
  },
  methods: {
    valueChange (field, value) {
      this.mainObj = { ...this.mainObj, ...value.change }
      this.event('change', { field, change: value.change })
    },
    toolbar (param) {
      switch (param.eventname) {
        case 'showmore':
          if (param.showonerow) {
            // eslint-disable-next-line vue/no-mutating-props
            this.searchInfo.viewRowSize = this.infoRow.length
          } else {
            // eslint-disable-next-line vue/no-mutating-props
            this.searchInfo.viewRowSize = 1
          }
          ViewModel.initSearchModel(
            this.searchInfo,
            this.searchInfo.viewRowSize !== 1
          )
          this.event('toolbar', { eventname: 'showmore', isshow: this.searchInfo.viewRowSize })
          break
        case 'reset':
          this.$refs.form.resetFields()
          this.event('toolbar', { eventname: 'reset', event: param.$event })
          break
        case 'search':
          this.event('toolbar', { eventname: 'search', event: param.$event })
          break
        default:
      }
    },
    /**
     * 点击标题处理
     */
    labelClick (field) {
      this.event('labelclick', { field })
    },
    fieldClick (field) {
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
    event (eventname, param) {
      this.$emit(eventname, {
        eventname,
        ...param,
        ref: this.$refs.form,
        value: this.mainObj
      })
    }
  }
}
</script>

<style lang="scss">
.searchModel {
  .el-form{
    display: block;
  }
  .extend {
    padding: 0 10px;
    font-size: 13px;
  }
}
</style>
