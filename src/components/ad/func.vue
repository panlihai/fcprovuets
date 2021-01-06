<template>
  <div>
    <fcapp :model="model" :height="height" :width="width" @formevent="formevent"
     @viewevent="viewevent" @toolbarevent="toolbarevent" @queryevent="queryevent" @tableevent="tableevent">
    <template v-slot:formchild>
      </template>
      <template v-slot:formlistchild>
      </template>
      <template v-slot:viewchild>
      </template>
      <template v-slot:viewlistchild>
      </template>
    </fcapp>
    <el-dialog
      v-if="fieldConfigShow"
      title="字段配置"
      v-model:visible="fieldConfigShow"
      v-dialogDrag
      width="540px"
      :before-close="openFieldConfig"
      append-to-body
    >
      <el-transfer
        v-model="parentFields"
        :data="childFields"
        :titles="['明细字段', '表头字段']"
      ></el-transfer>
    </el-dialog>
    <!-- 随手记 -->
    <el-dialog
      v-if="dialogNotesVisible"
      class="bill-dialog"
      :title="title"
      v-dialogDrag
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model:visible="dialogNotesVisible">
      <div
        class="bill"
        v-for="(item, index) of templateList"
        :key="index">
        <div class="title">
          <span class="text" v-text="item.name"></span>
        </div>
        <div class="content">
          <div class="placeholder" v-if="!item.child || !item.child.length">
            {{ $t('该随手记未配置模板') }}
          </div>
          <template v-else>
            <div
              class="boe-operation"
              v-for="(opera, index) of item.child"
              v-show="item.showMore || index < 9"
              :key="index"
              :title="opera.name"
              @click="add(item, opera)">
              <div class="icon-wrap">
                <svg class="icon" aria-hidden="true" v-if="opera.icon">
                  <use :xlink:href="opera.icon"></use>
                </svg>
                <div class="icon" v-else>
                  {{ opera.name && opera.name.slice(0, 2) }}
                </div>
              </div>
              <div class="name" v-text="opera.name"></div>
            </div>
            <div class="boe-operation" v-if="item.child.length >= 10 && !item.showMore" @click="handlerShowMoreTemplate(item)">
              <div class="icon-wrap">
                <div class="icon">
                  {{ $t('更多') }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fcapp from './app'
import Model from '@/api/model'
// import { useRoute } from 'vue-router'
export default {
  name: 'sysfunc',
  components: { fcapp },
  props: {
    param: {
      type: Object,
      default: () => ({ APPID: '' })
    }
  },
  computed: {
    ...mapState('model', {
      allModel: (state) => {
        return state
      }
    }),
    ...mapState('system', {
      userInfo: (state) => state.sysuser
    })
  },
  data () {
    return {
      fieldConfigShow: false,
      model: {
        searchInfo: {
        },
        tableInfo: {}
      },
      // 表头字段
      parentFields: [],
      // 子表字典
      childFields: [],
      // 选择随手记类型弹窗
      dialogNotesVisible: false,
      title: '',
      showMore: false,
      templateList: [],
      mainObj: {},
      // 状态
      status: '-1',
      height: document.body.clientHeight - 180,
      width: document.body.clientWidth - 228,
      data: []
    }
  },
  watch: {
    /**
     * 字段配置调整后重新计算
     */
    parentFields () {
      const fieldstr = `${this.parentFields.join(',')},`
      const group = this.model.formInfo
      // 找到所有的表头字段
      group.fldGroup[0].fields = []
      Object.keys(group.fields).forEach((fieldCode) => {
        if (fieldstr.indexOf(`${fieldCode},`) !== -1 || group.fields[fieldCode].tableName !== 'OP_BUSINESS_NOTE_LINES') {
          group.fldGroup[0].fields.push({ fieldCode })
        }
      })
      // 追加新移动过来的字段
      this.parentFields.forEach((fieldCode) => {
        // 判断是否存在，存在则不加入
        const filter = group.fldGroup[0].fields.filter(
          f => f === fieldCode
        )
        if (filter.length === 0) {
          group.fldGroup[0].fields.push({ fieldCode })
        }
      })
      // 找到行字段
      group.children
        .filter(cg => cg.fldGroupCode === 'appendInfo')
        .forEach((cgroup) => {
          // 追加新移动过来的字段
          cgroup.fldGroup[0].fields = []
          this.childFields
            .filter(f => fieldstr.indexOf(`${f.key},`) === -1)
            .forEach((f) => {
              cgroup.fldGroup[0].fields.push({ fieldCode: f.key })
            })
        })
      // this.model = { ...this.model }
    }
  },
  created () {
    // this.param = useRoute().params
    this.model = this.allModel[this.param.APPID]
    // 查询数据
    this.query()
    window.onresize = () => {
      this.height = document.body.clientHeight - 200
      this.width = document.body.clientWidth - 40
    }
  },
  methods: {
    /**
     * 工具栏事件处理
     * 各个按钮事件（btn的btnAct事件）
     */
    toolbarevent (param) {
      console.log(`工具栏内部${param.desc || ''}`, param)
      switch (param.eventname) {
        // 点击新增
        case 'add':
          // 新增态
          this.status = '0'
          this.handlerClick()
          break
        // 点击工具栏删除
        case 'delete':
          // 删除态
          this.status = '1'
          this.delete(param)
          break
        default:
          console.log(`未处理事件${param.desc || ''}，事件名称${param.eventname}`, param)
      }
    },
    /**
     * 表单事件处理
     * 包括表单事件focus,blur,change,click,dblclick，标题click
     * 包括表单子表事件处理单击、双击单元格或行，单选，多选，全选行，右键单元格及标题，标题点击排序事件
     * 包括表单工具栏事件及列表工具栏事件处理（btn的btnAct事件）
     */
    formevent (param) {
      switch (param.eventname) {
        // 点击列表编辑
        case 'close':
          this.model.formInfo.formShow = false
          this.model = { ...this.model }
          break
        // 点击列表编辑
        case 'edit':
          this.handlerClick()
          break
        case 'save':
          this.save(param)
          break
        case 'tablefieldchange':
        case 'change':
          this.initValueFromForm(param)
          break
        // 工具栏新增事件
        case 'delete':
          // 随手记明细处理
          if (param.fldGroupCode === 'appendInfo') {
            // 提示确认删除
            this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              param.grp.data = param.grp.data.filter((d, index) => param.index !== index)
            }, () => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
          break
        // 表单分组工具栏事件
        case 'grouptoolbar':
          // 随手记明细处理
          if (param.fldGroupCode === 'appendInfo') {
            switch (param.btn.btnAct) {
              // 工具栏字段配置事件
              case 'openFieldConfig':
                this.openFieldConfig()
                break
              // 工具栏新增事件
              case 'add':
                param.grp.data.push({})
                break
              default:
            }
          }
          break
        default:
          console.log(`未处理事件${param.desc || ''}，事件名称${param.eventname}`, param)
      }
    },
    /**
     * 预览事件处理
     * 包括表单事件focus,blur,change,click,dblclick，标题click
     * 包括表单子表事件处理单击、双击单元格或行，单选，多选，全选行，右键单元格及标题，标题点击排序事件
     * 包括表单工具栏事件及列表工具栏事件处理（btn的btnAct事件）
     */
    viewevent (param) {
      console.log(`预览${param.desc || ''}`, param)
      switch (param.eventname) {
        // 点击列表编辑
        case 'close':
          this.model.viewInfo.formShow = false
          this.model = { ...this.model }
          break
        default:
          console.log(`未处理事件${param.desc || ''}，事件名称${param.eventname}`, param)
      }
    },
    /**
     * 查询条件事件处理
     * 包括表单事件focus,blur,change,click,dblclick，标题click
     * 包括查询，重置，异常及显示更多行
     */
    queryevent (param) {
      console.log(`查询${param.desc || ''}`, param)
      switch (param.eventname) {
        case 'showmore':
          this.height = document.body.clientHeight - 200 - 47 * (this.model.searchInfo.viewRowSize || 1)
          break
        // 点击列表编辑
        case 'reset':
        case 'search':
          this.query()
          break
        default:
          console.log(`未处理事件${param.desc || ''}，事件名称${param.eventname}`, param)
      }
    },
    /**
     * 列表事件处理
     * 列表事件处理单击、双击单元格或行，单选，多选，全选行，右键单元格及标题，标题点击排序事件
     * 列表行单元格输入事件focus,blur,change,click,dblclick，
     * 包括列表行工具栏事件及列表工具栏事件处理（btn的btnAct事件）
     * 包括分页事件pageChange
     */
    tableevent (param) {
      console.log(`列表${param.desc || ''}`, param)
      // 随手记明细处理
      switch (param.eventname) {
        case 'linkclick':
          // 浏览态
          this.status = '2'
          this.loadingVersionModule(param.value.templateId, param.value.templateVersionId, param.value.assetsCategoryId, () => {
            this.model.viewInfo.formShow = true
            this.model.viewInfo.data = [param.value]
          })
          break
        // 点击列表编辑
        case 'edit':
        // eslint-disable-next-line no-fallthrough
        case 'celldblclick':
          // 修改态
          this.status = '3'
          this.loadingVersionModule(param.value.templateId, param.value.templateVersionId, param.value.assetsCategoryId, () => {
            this.model.formInfo.formShow = true
            this.model.formInfo.data = [param.value]
          })
          break
        case 'delete':
          // 删除态
          this.status = '1'
          // 删除单个
          this.delete(param)
          break
        default:
          console.log(`未处理事件${param.desc || ''}，事件名称${param.eventname}`, param)
      }
    },
    /**
     * 点击新增后打开选择不同的随手记模板
     */
    handlerClick () {
      this.dialogNotesVisible = true
    },
    /**
     * 点击新增后的操作
     */
    add (param, child) {
      console.log(param, child)
      this.dialogNotesVisible = false
      this.loadingModule(child.id, () => {
        this.model.formInfo.formShow = true
      })
    },
    /**
     * 根据templateid加载数据
     */
    loadingModule (templateId, callback) {
      this.$http.post(`/base/templatecontent/selectMaxContentByDefineId?templateDefineId=${templateId}`)
        .then((result) => {
          if (result.data.code === 0) {
            try {
              this.model = { ...this.model, ...JSON.parse(result.data.sysTemplateContentDTO.template1), ...{ tableInfo: this.model.tableInfo, searchInfo: this.model.searchInfo } }
              this.model.formInfo.data = [{ templateId, templateVersionId: result.data.sysTemplateContentDTO.id }]
              this.model.viewInfo.data = [{}]
              this.counteFields()
              if (callback) {
                callback()
              }
            } catch (error) {
              console.log(error)
            }
          }
        })
    },
    /**
     * 根据templateVersionid（模板版本的id值）加载模板
     */
    loadingVersionModule (templateVersionId, callback) {
      this.$http.get(`/base/templatecontent/${templateVersionId}`)
        .then((result) => {
          if (result.data.code === 0) {
            try {
              this.model = { ...this.model, ...JSON.parse(result.data.sysTemplateContentDTO.template1), ...{ tableInfo: this.model.tableInfo, searchInfo: this.model.searchInfo } }
              this.model.formInfo.data = [{}]
              this.model.viewInfo.data = [{}]
              this.counteFields()
              if (callback) {
                callback()
              }
            } catch (error) {
              console.log(error)
            }
          }
        })
    },
    /**
     * 字段配置页面关闭或打开
     */
    openFieldConfig () {
      this.fieldConfigShow = !this.fieldConfigShow
    },
    /**
     * 字段配置
     */
    counteFields () {
      this.parentFields = []
      this.childFields = []
      const group = this.model.formInfo
      Object.keys(group.fields).forEach((fieldCode) => {
        const f = group.fields[fieldCode]
        // 子表
        if (f.tableName === 'OP_BUSINESS_NOTE_LINES') {
          this.parentFields.push(fieldCode)
          this.childFields.push({ key: f.fieldCode, label: f.fieldName })
        }
      })
      group.children
        .filter(cg => cg.fldGroupCode === 'appendInfo')
        .forEach((cgroup) => {
          cgroup.fldGroup[0].fields.forEach((field) => {
            const cf = cgroup.fields[field.fieldCode]
            // 子表
            if (cf.tableName === 'OP_BUSINESS_NOTE_LINES') {
              this.childFields.push({
                key: field.fieldCode,
                label: cf.fieldName
              })
            }
          })
        })
    },
    /**
     * 计算需要保存的内容
     */
    initValueFromForm (param) {
      const basicObj = {}
      Object.keys(param.value.basic).forEach((key) => {
        const tableNameFieldCode = key.split('___')
        const tableName = tableNameFieldCode[0]
        const fieldCode = tableNameFieldCode[1]
        let valueObj = basicObj[tableName]
        if (valueObj === undefined) {
          valueObj = {}
          basicObj[tableName] = valueObj
        }
        valueObj[fieldCode] = param.value.basic[key]
      })
      let value = {}
      const detailObj = []
      Object.keys(param.value.appendInfo).forEach((tableName) => {
        if (basicObj[tableName]) {
          value[tableName] = []
          const values = detailObj[tableName]
          values.forEach((v) => {
            value[tableName].push({ ...v, ...basicObj[tableName] })
          })
          delete basicObj[tableName]
        } else {
          value[tableName] = detailObj[tableName]
        }
      })
      if (param.value.fileList instanceof Object) {
        param.value.fileList = [param.value.fileList]
      }
      // 把单对象转为数组方式提交
      Object.keys(basicObj).forEach((key) => {
        basicObj[key] = [basicObj[key]]
      })
      if (param.value.invoiceList instanceof Object) {
        param.value.invoiceList = [param.value.invoiceList]
      }
      value = {
        fileList: param.value.fileList,
        invoiceList: param.value.invoiceList,
        ...value,
        ...basicObj
      }
      this.mainObj = value
    },
    /**
     * 查询列表
     */
    query () {
      this.data = []
      Model.Listinfo(this.param.APPID, {}).then((result) => {
        if (result.CODE === '0') {
          try {
            // this.model = { ...this.model, ...{ tableInfo: Model.toTable(result.MODEL) } }
            this.data = result.DATA
            this.data.map((d, index) => {
              d.rownum = index + 1
              return d
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    /**
     * 删除操作
     */
    delete (param) {
      if (param.selectedObjs && param.selectedObjs.length !== 0) {
        // 提示确认删除
        this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = param.selectedObjs.map(obj => obj.id)
          this.$http.delete('/boe/templateConfig', { data: { templateConfigCode: 'sysBusinessUseTemplateSerice', ids } }).then((result) => {
            if (result.data.code === 0) {
              try {
                this.$message({
                  type: 'info',
                  message: '已删除数据'
                })
                this.query()
              } catch (error) {
                console.error(error)
              }
            } else {
              this.$message({
                type: 'warning',
                message: '请选择数据'
              })
            }
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
    },
    /**
     * 删除操作
     */
    save (param) {
      console.log(this.mainObj, param)
      if (this.status === '3') { // 修改
        this.$http.put('/boe/templateConfig', { templateConfigCode: 'sysBusinessUseTemplateSerice', ...this.mainObj }).then((result) => {
          if (result.data.code === 0) {
            try {
              this.$message({
                type: 'info',
                message: '已保存'
              })
            } catch (error) {
              console.error(error)
            }
          } else {
            this.$message({
              type: 'warning',
              message: result.data.msg
            })
          }
        })
      } else if (this.status === '0') { // 新增
        this.$http.post('/boe/templateConfig', { templateConfigCode: 'sysBusinessUseTemplateSerice', ...this.mainObj }).then((result) => {
          if (result.data.code === 0) {
            try {
              this.$message({
                type: 'info',
                message: '已保存'
              })
            } catch (error) {
              console.error(error)
            }
          } else {
            this.$message({
              type: 'warning',
              message: result.data.msg
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
