import D from '@/api/dao'

const Api = {
  Listinfo: '/SYSTEM/SYSMODEL/listinfo',
  Listdetail: '/SYSTEM/SYSMODEL/listdetail',
  Info: '/SYSTEM/SYSMODEL/info',
  Infolist: '/SYSTEM/SYSMODEL/infolist',
  Count: '/SYSTEM/SYSMODEL/count',
  Min: '/SYSTEM/SYSMODEL/min',
  Max: '/SYSTEM/SYSMODEL/max',
  Sum: '/SYSTEM/SYSMODEL/sum',
  Avg: '/SYSTEM/SYSMODEL/avg',
  Create: '/SYSTEM/SYSMODEL/create',
  Remove: '/SYSTEM/SYSMODEL/remove',
  Update: '/SYSTEM/SYSMODEL/update',
  CreateStandardEvent: '/SYSTEM/SYSMODEL/createStandardEvent',
  ImportFieldByTable: '/SYSTEM/SYSMODEL/importFieldByTable',
  GetTableByDsid: '/SYSTEM/SYSMODEL/getTableByDsid',
  Appdetail: '/SYSTEM/SYSMODEL/appdetail'
}

export default {
  /**
   * listinfo func
   * param: {
   *     AID
   *  PAGESIZE
   *  PAGENUM
   *  WHERE：{
   *      FIELDCODE：{
   *          eq:''
   *      }，
   *      FIELDCODE1：{
   *          like:''
   *      }，
   *  }
   *  ORDER
   *  GROUP
   *  SELECT
   * }
   * @param param
   * @returns {*}
   */
  Listinfo (aid: string, param: any) {
    return D.get(Api.Listinfo, { AID: aid, ...param })
  },
  Info (aid: string, param: any) {
    return D.get(Api.Info, { AID: aid, ...param })
  },
  Listdetail (aid: string, param: any) {
    return D.get(Api.Listdetail, { AID: aid, ...param })
  },
  Infolist (aid: string, param: any) {
    return D.get(Api.Infolist, { AID: aid, ...param })
  },
  Count (aid: string, param: any) {
    return D.get(Api.Count, { AID: aid, ...param })
  },
  Min (aid: string, param: any) {
    return D.get(Api.Min, { AID: aid, ...param })
  },
  Max (aid: string, param: any) {
    return D.get(Api.Max, { AID: aid, ...param })
  },
  Sum (aid: string, param: any) {
    return D.get(Api.Sum, { AID: aid, ...param })
  },
  Avg (aid: string, param: any) {
    return D.get(Api.Avg, { AID: aid, ...param })
  },
  Create (aid: string, param: any, body: any) {
    return D.post(Api.Create, { AID: aid, ...param }, body)
  },
  Remove (aid: string, param: any, body: any) {
    return D.post(Api.Remove, { AID: aid, ...param }, body)
  },
  Update (aid: string, param: any, body: any) {
    return D.post(Api.Update, { AID: aid, ...param }, body)
  },
  CreateStandardEvent (aid: string, param: any, body: any) {
    return D.post(Api.CreateStandardEvent, { AID: aid, ...param }, body)
  },
  ImportFieldByTable (aid: string, param: any, body: any) {
    return D.post(Api.ImportFieldByTable, { AID: aid, ...param }, body)
  },
  GetTableByDsid (aid: string, param: any) {
    return D.get(Api.GetTableByDsid, { AID: aid, ...param })
  },
  Appdetail (appCode: string, pid: string) {
    return D.get(Api.Appdetail, { APPCODE: appCode, PID: pid })
  },
  toField (f: any = {}, app: any) {
    const transto: any = {}
    if (f.DICCODE) {
      const dics = app.SYSDIC.filter((d: any) => d.DICID === f.DICCODE)
      if (dics.length !== 0) {
        const dic = dics[0]
        if (dic.SYSDICAPP) {
          dic.SYSDICAPP.forEach((de: any) => {
            transto[f.FIELDCODE] = de.VALUECODE
            de.SYSDICAPPDETAIL.forEach((ad: any) => {
              if (app.APPID === ad.TOAPPID) {
                transto[f.FIELDCODE] = ad.TOFIELDCODE
              }
            })
          })
        }
      }
    }
    return {
      // 表名称
      tableName: f.APPID,
      // 字段编码
      fieldCode: f.FIELDCODE,
      // 样式类名
      className: f.TCLASS,
      // 内部样式
      style: f.STYLE,
      // 属性中文名称
      fieldName: f.FIELDNAME,
      // 是否必填
      isrequired: f.ISNULL === 'N',
      // 是否只读
      readonly: f.ISVIRTUAL === 'Y',
      // 是否禁用
      disabled: f.ENABLE === 'Y',
      // 页面内容格式化
      format: f.VIEWFORMAT,
      // 最大长度 默认为数据库的长度
      maxlength: f.LENGTH,
      // 最小长度 默认为0
      minlength: 0,
      // 此字段的组件 按模板渲染
      inputType: f.INPUTTYPE, // datepicker,datetimepicker,timepicker,    combo,chosen,component,    upload,picview,text,input,long,double,textarea,
      // 当是模态框时 需要渲染并请求第三方数据时，指定的渲染页面，与requestUrl、selectedKeyMap 配合使用
      requestPage: '',
      // 当是模态框时 需要渲染并请求第三方数据时，指定的请求地址，与requestPage、selectedKeyMap 配合使用
      requestUrl: 'SYSTEM/SYSMODEL/listinfo',
      // 当是模态框时 需要渲染并请求第三方数据时，指定的指定的内容与组件的映射关系，与requestUrl、requestPage 配合使用 或 combo、chosen的映射关系
      selectedKeyMap: {
        code: 'appname',
        label: 'appname',
        value: 'appname'
      },
      transto,
      // 备选的数据内容，此处为key，映射select对象中key指定的的数组对象，
      selectOptionCode: '',
      // 默认的值
      defaultValue: f.FILEDEFAULT,
      // 自定义校验逻辑
      validate: (valid: any, value: any) => new Promise(resolve => setTimeout(() => resolve({ valid, value }), 2000)),
      // 分组 区块 名称
      fldGroupCode: f.APPID,
      // 字段描述
      description: f.HELP,
      // 数据字典名称
      dicCode: f.DICCODE,
      // 显示错误信息
      showerror: false,
      // 显示错误内容
      error: ''
    }
  },
  toGrp (app: any, fields: any[], childFields: any[], lineToolbar: any[], toolbar: any[]) {
    return {
      // 数据
      data: [],
      // 请求列表数据的url
      requestUrl: 'SYSTEM/SYSMODEL/listinfo',
      // 删除列表的url
      deleteUrl: 'SYSTEM/SYSMODEL/remove',
      // 保存及修改的url
      saveUrl: 'SYSTEM/SYSMODEL/save',
      // 加载当前数据的模板url
      loadModuleUrl: '',
      // 加载最新模板url
      loadLastModuleUrl: '',
      // -1为未做任何调整，初始化状态； 0 为修改过变量
      status: '-1',
      // 分组编码
      fldGroupCode: app.APPID,
      // 标题
      title: app.APPNAME,
      // 点击表可展开隐藏
      fldCanOpen: true,
      // 标题默认展开
      fldGroupOpen: true,
      // links：关联模式一对多；form: 表单模式，一对一
      viewType: 'links',
      // 子表列表渲染方式 tab：tab页方式（横向）；list：列表方式(纵向) tablist: 先list后tab
      childViewType: 'list',
      // viewType为form时有效，表单列数
      columnSize: app.CARDCOLS || 4,
      // 编辑样式，listEdit为列表编辑，listFormEdit为列表表单，dialogEdit为弹窗编辑form
      editType: 'listEdit',
      // 列表批量编辑  viewType为links有效
      editable: true,
      // 表大小
      size: 'mini',
      // 是否可多选 viewType为links有效
      selection: true,
      // 是否显示合计值 viewType为links有效
      showsummary: false,
      // 只读字段 显示为text
      readonlyFieldCodes: [''],
      // // 必填字段
      requiredFieldCodes: [''],
      // 隐藏字段
      hiddenFieldCodes: [''],
      // 计算字段
      counteFields: [''],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 默认排序  viewType为links有效
      sort: {
        order: '',
        ascending: true,
        descending: false
      },
      // 所有字段
      fields,
      // 转换
      trans: [{ from: '', to: '' }],
      // 是否开启内部分页，in：table组件内部分页；out：外部分页，自定义分页  viewType为links有效
      pagination: 'in',
      // 当前页数 viewType为links有效
      pageNum: 1,
      // 页偏移量 viewType为links有效
      pageSize: app.PSIZE,
      // 分组，当viewType为links时为多级表头，如为form时为多个分组
      fldGroup: [
        {
          title: '基本信息',
          fldGroupCode: 'basic',
          fields: childFields
        }
      ],
      // 根据状态返回是否可操作按钮
      toolbarDisabled: (row: any) => {
        if (row) {
          return true
        }
        return false
      },
      // 工具栏
      toolbar,
      // 工具栏显示位置 topLeft: 顶部跟标题同行左边，topRight:顶部跟标题同行右边；bottomLeft: 整个组的底部左侧，独立一行 bottomRight: 整个组底部右侧
      toolbarView: 'topRight',
      // 是否有操作栏 如果有则显示linetoolbar
      hasaction: true,
      // 根据状态返回是否可操作按钮
      lineToolbarDisabled: (row: any) => {
        if (row) {
          return true
        }
        return false
      },
      // 行工具栏，当viewType为links的时候有效
      lineToolbar,
      // 子表
      children: [],
      // 是否显示表单
      formShow: false
    }
  },
  toToolbar (app: any, btnType: string) {
    const toolbar: any[] = []
    app.SYSAPPBUTTONS.forEach((b: any) => {
      if (b.BTNTYPE === btnType) {
        toolbar.push({
          btnCode: b.BTNCODE,
          btnName: b.BTNNAME,
          btnAct: b.ACTCODE,
          bustype: b.BUSTYPE,
          permission: b.ALLOWTYPE,
          quickkeys: b.QUICKKEYS,
          help: b.HELP,
          icon: b.BTNICON,
          type: b.BTNCLASS
        })
      }
    })
    return toolbar
  },
  toSelect (app: any) {
    const select: any = {}
    if (app.SYSAPPDIC) {
      app.SYSAPPDIC.forEach((dic: any) => {
        if (dic.DICTYPE === 'LISTVALUE') {
          const dicdetail: any[] = []
          dic.SYSDICDETAIL.forEach((de: any) => {
            dicdetail.push({
              label: de.DICDESC,
              value: de.DICVALUE,
              src: de.SRC || '',
              icon: de.ICON || '',
              title: de.REMARK || '',
              sort: de.SORT
            })
          })
          select[dic.DICID] = dicdetail
        }
      })
    }
    return select
  },
  /**
   * 把模型转成model
   * @param {*} app 模型
   */
  toLinkApp (app: any) {
    const fields: any = {}
    const listFields: any[] = []
    const formFields: any[] = []
    const searchFields: any[] = []
    app.SYSAPPFIELDS.forEach((f: any) => {
      const field: any = this.toField(f, app)
      if (f.SHOWCARD === 'Y') {
        formFields.push({ fieldCode: field.fieldCode })
      }
      if (f.SHOWLIST === 'Y') {
        listFields.push({ fieldCode: field.fieldCode })
      }
      if (f.ENABLESEARCH === 'Y') {
        searchFields.push({ ...field })
      }
      if (f.ENABLEWRITE === 'Y') {
        field.readonly = true
      }
      fields[f.FIELDCODE] = { ...field }
    })
    const listToolbar = this.toToolbar(app, 'LIST')
    const listOneToolbar = this.toToolbar(app, 'LISTONE')
    const fieldToolbar = this.toToolbar(app, 'CARD')
    const tableInfo = this.toGrp(app, fields, listFields, listOneToolbar, listToolbar)
    const viewInfo = this.toGrp(app, fields, formFields, [], [{
      btnCode: 'btnSave',
      btnName: '关闭',
      btnAct: 'close',
      bustype: 'close'
    }])
    const formInfo = this.toGrp(app, fields, formFields, fieldToolbar, [])
    const searchInfo = this.toGrp(app, searchFields, [], fieldToolbar, [
      {
        btnCode: 'btnQuery',
        btnName: '查询',
        btnAct: 'query',
        bustype: 'query'
      },
      {
        btnCode: 'btnQuery',
        btnName: '重置',
        btnAct: 'reset',
        bustype: 'reset'
      }
    ])
    const select = this.toSelect(app)
    return {
      select,
      tableInfo,
      viewInfo,
      searchInfo,
      formInfo
    }
  },
  toTable (app: any) {
    const fields: any = {}
    const listFields: any[] = []
    app.SYSAPPFIELDS.forEach((f: any) => {
      const field: any = this.toField(f, app)
      if (f.SHOWLIST === 'Y') {
        listFields.push({ fieldCode: field.fieldCode })
      }
      fields[f.FIELDCODE] = { ...field }
    })
    const listToolbar = this.toToolbar(app, 'LIST')
    const listOneToolbar = this.toToolbar(app, 'LISTONE')
    const tableInfo = this.toGrp(app, fields, listFields, listOneToolbar, listToolbar)
    return tableInfo
  }
}
