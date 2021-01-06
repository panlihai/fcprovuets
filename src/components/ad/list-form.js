/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/**
 * 查询条件配置
 */
const searchInfo = {
  // 标题
  title: '模型查询条件',
  // 分几列
  columnSize: 4,
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
      column: 1
    }, {
      // 字段编码
      fieldCode: 'APPNAME',
      // 内部样式
      style: '',
      // 属性中文名称
      fieldName: '模型名称',
      // 所占列数，不能跨行
      column: 1
    }, {
      // 字段编码
      fieldCode: 'ENABLE',
      // 内部样式
      style: '',
      // 属性中文名称
      fieldName: '是否启用',
      // 所占列数，不能跨行
      column: 1
    }, {
      // 字段编码
      fieldCode: 'APPID',
      // 内部样式
      style: '',
      // 属性中文名称
      fieldName: '模型编码',
      // 所占列数，不能跨行
      column: 1
    }, {
      // 字段编码
      fieldCode: 'APPNAME',
      // 内部样式
      style: '',
      // 属性中文名称
      fieldName: '模型名称',
      // 所占列数，不能跨行
      column: 2
    }, {
      // 字段编码
      fieldCode: 'ENABLE',
      // 内部样式
      style: '',
      // 属性中文名称
      fieldName: '是否启用',
      // 所占列数，不能跨行
      column: 1
    }
  ],
  // 工具栏
  toolbar: [
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
  ]
}

/**
 * 编辑表单页面配置
 */
const formInfo = {
  // 标题
  title: '编辑模型',
  // list：批量编辑；form: 表单编辑（弹窗）
  viewType: 'form',
  // 子表列表渲染方式 tab：tab页方式（横向）；list：列表方式(纵向) tablist: 先list后tab
  childViewType: 'list',
  // 表单分组
  fldGroup: [
    {
      // 区域标题
      title: '基本信息',
      // 区域编码
      fldGroupCode: 'basic',
      // 表单类型
      type: 'form',
      // 点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 4,
      // 只读字段 显示为text
      readonlyFieldCodes: ['APPID'],
      // 必填字段
      requiredFieldCodes: ['APPFILTER'],
      // 隐藏字段
      hiddenFieldCodes: [],
      // 子表必填字段
      requiredChildFieldCodes: [],
      // 子表只读字段
      readonlyChildFieldCodes: [],
      // 子表隐藏字段
      hiddenChildFieldCodes: [],
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID'
        },
        {
          // 字段编码
          fieldCode: 'APPNAME',
          // 属性中文名称
          fieldName: '模型名称'
        },
        {
          // 字段编码
          fieldCode: 'APPMODEL',
          // 属性中文名称
          fieldName: '所属系统'
        },
        {
          // 字段编码
          fieldCode: 'APPTYPE',
          // 属性中文名称
          fieldName: '模型类型'
        },
        {
          // 字段编码
          fieldCode: 'DATASOURCE',
          // 属性中文名称
          fieldName: '数据源'
        },
        {
          // 字段编码
          fieldCode: 'SOURCETYPE',
          // 属性中文名称
          fieldName: '来源类型'
        },
        {
          // 字段编码
          fieldCode: 'CITY',
          // 属性中文名称
          fieldName: '市'
        },
        {
          // 字段编码
          fieldCode: 'MAINTABLE',
          // 属性中文名称
          fieldName: '主表'
        },
        {
          // 字段编码
          fieldCode: 'APPFILTER',
          // 属性中文名称
          fieldName: '模型条件',
          column: 3
        },
        {
          // 字段编码
          fieldCode: 'SORTBY',
          // 属性中文名称
          fieldName: '排序字段'
        }
      ],
      // 计算字段
      counteFields: ['PSIZE'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 工具栏
      // toolbar: [
      //   {
      //     btnCode: 'btnSave',
      //     btnName: '保存',
      //     btnAct: 'save',
      //     bustype: 'submit',
      //     btnIcon: '',
      //   },
      //   {
      //     btnCode: 'btnSave',
      //     btnName: '保存并新增',
      //     btnAct: 'saveNew',
      //     bustype: 'submit',
      //     btnIcon: '',
      //   },
      //   {
      //     btnCode: 'btnQuery',
      //     btnName: '查询',
      //     btnAct: 'query',
      //     bustype: 'reset',
      //     btnIcon: '',
      //   },
      // ],
      // 工具栏显示位置 title: 标题栏，blank: 独立一行
      toolbarView: 'title',
      children: [
        {
          title: '附加信息',
          fldGroupCode: 'appendInfo',
          // 点击表可展开隐藏
          fldCanOpen: true,
          // 区域标题默认展开
          fldGroupOpen: true,
          // 表单模式及列表模式
          type: 'form',
          // 分几列
          columnSize: 4,
          fields: [
            {
              // 字段编码
              fieldCode: 'ENABLE',
              // 属性中文名称
              fieldName: '是否启用?'
            },
            {
              // 字段编码
              fieldCode: 'CARDCOLS',
              // 属性中文名称
              fieldName: '表单列数'
            },
            {
              // 字段编码
              fieldCode: 'PSIZE',
              // 属性中文名称
              fieldName: '分页偏移量'
            },
            {
              // 字段编码
              fieldCode: 'ENABLELOG',
              // 属性中文名称
              fieldName: '记录日志?'
            },
            {
              // 字段编码
              fieldCode: 'ENABLECACHE',
              // 属性中文名称
              fieldName: '缓存?'
            },
            {
              // 字段编码
              fieldCode: 'BEGINDATE',
              // 属性中文名称
              fieldName: '生效日期'
            },
            {
              // 字段编码
              fieldCode: 'CREATETIME',
              // 属性中文名称
              fieldName: '填单日期'
            },
            {
              // 字段编码
              fieldCode: 'UPDATETIME',
              // 属性中文名称
              fieldName: '更新时间'
            }
          ]
        },
        {
          title: '其它信息',
          fldGroupCode: 'otherInfo',
          type: 'form',
          // 区域标题默认展开
          fldGroupOpen: true,
          // 分几列
          columnSize: 3,
          fields: [
            {
              // 字段编码
              fieldCode: 'REMARK',
              // 属性中文名称
              fieldName: '备注',
              column: 2
            },
            {
              // 字段编码
              fieldCode: 'HELP',
              // 属性中文名称
              fieldName: '帮助',
              column: 2
            }
          ]
        },
        {
          title: '附件',
          fldGroupCode: 'upload',
          // 点击表可展开隐藏
          fldCanOpen: true,
          // 区域标题默认展开
          fldGroupOpen: true,
          fields: [
            {
              // 字段编码
              fieldCode: 'fileList',
              // 属性中文名称
              fieldName: '附件',
              //
              inputType: 'uploadfile'
            }
          ],
          type: 'form',
          // 分几列
          columnSize: 3
        }
      ]
    },
    {
      title: '属性信息',
      fldGroupCode: 'SYSAPPFIELDS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['PSIZE'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 工具栏
      toolbar: [
        {
          btnCode: 'btnNew',
          btnName: '新增',
          btnAct: 'save',
          bustype: 'submit'
        }
      ],
      // 工具栏显示位置 title: 标题栏，blank: 独立一行
      toolbarView: 'title',
      // 当 type为links的时候，可以是dialogEdit:弹窗编辑;listEdit:行编辑;listFormEdit:行表单编辑
      editType: 'listEdit'
    },
    {
      title: '事件模型',
      fldGroupCode: 'SYSAPPBUTTONS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['PSIZE'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 工具栏
      toolbar: [
        {
          btnCode: 'btnNew',
          btnName: '新增',
          btnAct: 'save',
          bustype: 'submit'
        }
      ],
      // 工具栏显示位置 title: 标题栏，blank: 独立一行
      toolbarView: 'title',
      // 当 type为links的时候，可以是dialogEdit:弹窗编辑;listEdit:行编辑;listFormEdit:行表单编辑
      editType: 'listEdit'
    },
    {
      title: '关联模型',
      fldGroupCode: 'SYSAPPLINKS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['ORDER'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 工具栏
      toolbar: [
        {
          btnCode: 'btnNew',
          btnName: '新增',
          btnAct: 'save',
          bustype: 'submit'
        }
      ],
      // 工具栏显示位置 title: 标题栏，blank: 独立一行
      toolbarView: 'title',
      // 当 type为links的时候，可以是dialogEdit:弹窗编辑;listEdit:行编辑;listFormEdit:行表单编辑
      editType: 'listEdit'
    },
    {
      title: '属性分组',
      fldGroupCode: 'SYSFLDGROUPS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['ORDER'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 工具栏
      toolbar: [
        {
          btnCode: 'btnNew',
          btnName: '新增',
          btnAct: 'save',
          bustype: 'submit'
        }
      ],
      // 工具栏显示位置 title: 标题栏，blank: 独立一行
      toolbarView: 'title',
      // 当 type为links的时候，可以是dialogEdit:弹窗编辑;listEdit:行编辑;listFormEdit:行表单编辑
      editType: 'listEdit'
    }
  ],
  toolbar: [
    {
      btnCode: 'btnSave',
      btnName: '保存',
      btnAct: 'save',
      bustype: 'submit'
    },
    {
      btnCode: 'btnSaveNew',
      btnName: '保存并新增',
      btnAct: 'saveNew',
      bustype: 'submitNew'
    },
    {
      btnCode: 'btnSaveCopy',
      btnName: '保存并复制',
      btnAct: 'savecopy',
      bustype: 'submitNew'
    },
    {
      btnCode: 'btnSave',
      btnName: '关闭',
      btnAct: 'close',
      bustype: 'close'
    }
  ],
  // 工具栏显示位置 top: 顶部，bottom: 整个网页的底部
  toolbarView: 'bottom'
}
/**
 * 显示内容
 */
const viewInfo = {
  // 标题
  title: '浏览模型',
  // list：批量编辑；form: 表单编辑（弹窗）
  viewType: 'form',
  // 子表列表渲染方式 tab：tab页方式（横向）；list：列表方式(纵向) tablist: 先list后tab
  childViewType: 'list',
  // 表单分组
  fldGroup: [
    {
      // 区域标题
      title: '基本信息',
      // 区域编码
      fldGroupCode: 'basic',
      // 表单类型
      type: 'form',
      // 点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 4,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID'
        },
        {
          // 字段编码
          fieldCode: 'APPNAME',
          // 属性中文名称
          fieldName: '模型名称'
        },
        {
          // 字段编码
          fieldCode: 'APPMODEL',
          // 属性中文名称
          fieldName: '所属系统'
        },
        {
          // 字段编码
          fieldCode: 'APPTYPE',
          // 属性中文名称
          fieldName: '模型类型'
        },
        {
          // 字段编码
          fieldCode: 'DATASOURCE',
          // 属性中文名称
          fieldName: '数据源'
        },
        {
          // 字段编码
          fieldCode: 'SOURCETYPE',
          // 属性中文名称
          fieldName: '来源类型'
        },
        {
          // 字段编码
          fieldCode: 'CITY',
          // 属性中文名称
          fieldName: '市'
        },
        {
          // 字段编码
          fieldCode: 'MAINTABLE',
          // 属性中文名称
          fieldName: '主表'
        },
        {
          // 字段编码
          fieldCode: 'APPFILTER',
          // 属性中文名称
          fieldName: '模型条件',
          column: 3
        },
        {
          // 字段编码
          fieldCode: 'SORTBY',
          // 属性中文名称
          fieldName: '排序字段'
        }
      ],
      // 计算字段
      counteFields: ['PSIZE'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title',
      // 工具栏
      // toolbar: [
      //   {
      //     btnCode: 'btnSave',
      //     btnName: '保存',
      //     btnAct: 'save',
      //     bustype: 'submit',
      //     btnIcon: '',
      //   },
      //   {
      //     btnCode: 'btnSave',
      //     btnName: '保存并新增',
      //     btnAct: 'saveNew',
      //     bustype: 'submit',
      //     btnIcon: '',
      //   },
      //   {
      //     btnCode: 'btnQuery',
      //     btnName: '查询',
      //     btnAct: 'query',
      //     bustype: 'reset',
      //     btnIcon: '',
      //   },
      // ],
      // 工具栏显示位置 title: 标题栏，blank: 独立一行
      toolbarView: 'title',
      children: [
        {
          title: '附加信息',
          fldGroupCode: 'appendInfo',
          // 点击表可展开隐藏
          fldCanOpen: true,
          // 区域标题默认展开
          fldGroupOpen: true,
          type: 'form',
          // 分几列
          columnSize: 4,
          fields: [
            {
              // 字段编码
              fieldCode: 'ENABLE',
              // 属性中文名称
              fieldName: '是否启用?'
            },
            {
              // 字段编码
              fieldCode: 'CARDCOLS',
              // 属性中文名称
              fieldName: '表单列数'
            },
            {
              // 字段编码
              fieldCode: 'PSIZE',
              // 属性中文名称
              fieldName: '分页偏移量'
            },
            {
              // 字段编码
              fieldCode: 'ENABLELOG',
              // 属性中文名称
              fieldName: '记录日志?'
            },
            {
              // 字段编码
              fieldCode: 'ENABLECACHE',
              // 属性中文名称
              fieldName: '缓存?'
            },
            {
              // 字段编码
              fieldCode: 'BEGINDATE',
              // 属性中文名称
              fieldName: '生效日期'
            },
            {
              // 字段编码
              fieldCode: 'CREATETIME',
              // 属性中文名称
              fieldName: '填单日期'
            },
            {
              // 字段编码
              fieldCode: 'UPDATETIME',
              // 属性中文名称
              fieldName: '更新时间'
            }
          ]
        },
        {
          title: '其它信息',
          fldGroupCode: 'otherInfo',
          type: 'form',
          // 区域标题默认展开
          fldGroupOpen: true,
          // 分几列
          columnSize: 3,
          fields: [
            {
              // 字段编码
              fieldCode: 'REMARK',
              // 属性中文名称
              fieldName: '备注',
              column: 2
            },
            {
              // 字段编码
              fieldCode: 'HELP',
              // 属性中文名称
              fieldName: '帮助',
              column: 2
            }
          ]
        },
        {
          title: '附件',
          fldGroupCode: 'upload',
          // 点击表可展开隐藏
          fldCanOpen: true,
          // 区域标题默认展开
          fldGroupOpen: true,
          fields: [
            {
              // 字段编码
              fieldCode: 'fileList',
              // 属性中文名称
              fieldName: '附件',
              //
              inputType: 'uploadfile'
            }
          ],
          type: 'links',
          // 分几列
          columnSize: 3
        }
      ]
    },
    {
      title: '属性信息',
      fldGroupCode: 'SYSAPPFIELDS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['PSIZE'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title'
    },
    {
      title: '事件模型',
      fldGroupCode: 'SYSAPPBUTTONS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['PSIZE'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title'
    },
    {
      title: '关联模型',
      fldGroupCode: 'SYSAPPLINKS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['ORDER'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title'
    },
    {
      title: '属性分组',
      fldGroupCode: 'SYSFLDGROUPS',
      type: 'links',
      // 区域标题默认展开,点击表可展开隐藏
      fldCanOpen: true,
      // 区域标题默认展开
      fldGroupOpen: true,
      // 分几列
      columnSize: 3,
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'APPID',
          // 属性中文名称
          fieldName: '模型编码'
        },
        {
          // 字段编码
          fieldCode: 'ORDER',
          // 属性中文名称
          fieldName: '模型编码'
        }
      ],
      // 计算字段
      counteFields: ['ORDER'],
      // 计算结果显示位置 title: 标题栏；blank: 独立一行；list：在列表模式时显示在列表的行上
      counteFieldsView: 'title'
    }
  ],
  toolbar: [
    {
      btnCode: 'btnSave',
      btnName: '关闭',
      btnAct: 'close',
      bustype: 'close'
    }
  ]
}
/**
 * 列表描述
 */
const tableInfo = {
  // 标题
  title: '模型定义',
  fldGroupCode: 'basic',
  // 请求url
  requestUrl: '',
  // 请求
  // 表大小
  size: 'mini',
  // 是否有操作栏
  hasaction: true,
  // 根据状态返回是否可操作按钮
  editDisabled: (row) => {
    if (row && row.APPMODEL === 'SYSTEM') {
      return false
    }
    return true
  },
  // 列表可编辑
  editable: true,
  // 是否可多选
  selection: true,
  // 是否显示合计值
  showsummary: false,
  // 默认排序
  sort: {
    order: 'APPNAME',
    ascending: true,
    descending: false
  },
  // 是否开启内部分页，in：table组件内部分页；out：外部分页，自定义分页
  pagination: 'out',
  // 当前页数
  pageNum: 1,
  // 页偏移量
  pageSize: 20,
  // 列表分组
  fldGroup: [
    {
      // 区域标题
      title: '基本信息',
      // 区域编码
      fldGroupCode: 'basic',
      type: 'links',
      // 显示字段
      fields: [
        {
          // 字段编码
          fieldCode: 'APPNAME'
        },
        {
          // 字段编码
          fieldCode: 'ENABLE'
        },
        {
          // 字段编码
          fieldCode: 'APPMODEL'
        },
        {
          // 字段编码
          fieldCode: 'APPTYPE'
        },
        {
          // 字段编码
          fieldCode: 'DATASOURCE'
        },
        {
          // 字段编码
          fieldCode: 'SOURCETYPE'
        },
        {
          // 字段编码
          fieldCode: 'MAINTABLE'
        },
        {
          // 字段编码
          fieldCode: 'APPFILTER'
        },
        {
          // 字段编码
          fieldCode: 'PSIZE'
        },
        {
          // 字段编码
          fieldCode: 'SORTBY'
        },
        {
          // 字段编码
          fieldCode: 'ENABLELOG'
        },
        {
          // 字段编码
          fieldCode: 'ENABLECACHE'
        },
        {
          // 字段编码
          fieldCode: 'CARDCOLS'
        },
        {
          // 字段编码
          fieldCode: 'REMARK'
        },
        {
          // 字段编码
          fieldCode: 'HELP'
        }
      ],
      // 计算字段
      counteFields: ['ORDER']
    }
  ],
  // 列表行工具栏
  lineToolbar: [
    {
      btnCode: 'btnEdit',
      btnName: '编辑',
      btnAct: 'edit'
    },
    {
      btnCode: 'btnDelete',
      btnName: '删除',
      btnAct: 'delete'
    }
  ],
  // 列表工具栏
  toolbar: [
    {
      btnCode: 'btnAdd',
      btnName: '新建',
      btnAct: 'add'
    },
    {
      btnCode: 'btnDelete',
      btnName: '删除',
      btnAct: 'delete'
    }
  ],
  // 工具栏显示位置 topLeft: 顶部右侧，topRight: 顶部右侧；bottom：底部
  toolbarView: 'topLeft',
  // 查询选择后写入到当前表单规则
  trans: [{
    from: 'APPNAME',
    to: 'APPID'
  }]
}

// 下拉选项内容
const select = {
  SYSYORNZH: [{
    label: '是',
    value: 'Y'
  }, {
    label: '否',
    value: 'N'
  }],
  picvalue: [{
    label: '1',
    value: '0',
    src: '/pages/img/invoice/fapiao.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '1',
    src: '/pages/img/index/banner.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '2',
    src: '/pages/img/invoice/feiji.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '3',
    src: '/pages/img/invoice/fp_add.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '4',
    src: '/pages/img/invoice/go.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '5',
    src: '/pages/img/invoice/invoice.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '6',
    src: '/pages/img/invoice/huoche.png',
    title: '1',
    sort: 0
  },
  {
    label: '1',
    value: '7',
    src: '/pages/img/invoice/other.png',
    title: '1',
    sort: 0
  }],
  SYSAPPSOURCETYPE: [{
    label: '系统',
    value: 'SYSTEM'
  }, {
    label: '用户定义',
    value: 'CUSTOMER'
  }, {
    label: '字典数据',
    value: 'SYSDIC'
  }, {
    label: '系统',
    value: 'SYSTEM1'
  }, {
    label: '用户定义',
    value: 'CUSTOMER2'
  }, {
    label: '字典数据',
    value: 'SYSDIC3'
  }],
  SYSAPPTYPE: [
    {
      label: '表',
      value: 'TABLE'
    }, {
      label: '视图',
      value: 'VIEW'
    }]
}
// 模型字段
const fields = {
  APPID: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'APPID',
    // 样式类名
    className: '',
    // 内部样式
    style: '',
    // 属性中文名称
    fieldName: '模型编码',
    // 是否必填
    isrequired: true,
    // 是否只读
    readonly: false,
    // 是否禁用
    disabled: false,
    // 页面内容格式化
    format: '',
    // 最大长度 默认为数据库的长度
    maxlength: 39,
    // 最小长度 默认为0
    minlength: 0,
    // 此字段的组件 按模板渲染
    inputType: 'text', // datepicker,datetimepicker,timepicker,    combo,chosen,component,    upload,picview,text,input,long,double,textarea,
    // 当是模态框时 需要渲染并请求第三方数据时，指定的渲染页面，与requestUrl、selectedKeyMap 配合使用
    requestPage: '',
    // 当是模态框时 需要渲染并请求第三方数据时，指定的请求地址，与requestPage、selectedKeyMap 配合使用
    requestUrl: '',
    // 当是模态框时 需要渲染并请求第三方数据时，指定的指定的内容与组件的映射关系，与requestUrl、requestPage 配合使用 或 combo、chosen的映射关系
    selectedKeyMap: {
      code: 'appname',
      label: 'appname',
      value: 'appname'
    },
    // 备选的数据内容，此处为key，映射select对象中key指定的的数组对象，
    selectOptionCode: '',
    // 默认的值
    defaultValue: '',
    // 自定义校验逻辑
    validate: (valid, value) => new Promise(resolve => setTimeout(() => resolve({ valid, value }), 2000)),
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 字段描述
    description: '',
    // 数据字典名称
    dicCode: '',
    // 显示错误信息
    showerror: false,
    // 显示错误内容
    error: ''
  },
  APPNAME: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'APPNAME',
    // 属性中文名称
    fieldName: '模型名称',
    // 组件类型
    inputType: 'text',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 默认的值
    defaultValue: ''
  },
  ENABLE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'ENABLE',
    // 属性中文名称
    fieldName: '是否启用',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'check',
    // 映射关系
    selectedKeyMap: {
      label: 'DICDESC',
      value: 'DICVALUE'
    },
    // 默认的值
    defaultValue: 'N',
    // 备选的数据内容，此处为key，映射select对象中key指定的的数组对象，
    dicCode: 'SYSYORNZH'
  },
  APPMODEL: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'APPMODEL',
    // 属性中文名称
    fieldName: '所属系统',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'select',
    // 映射关系
    selectedKeyMap: {
      label: 'PNAME',
      value: 'PID'
    },
    dicCode: 'SYSPRODUCT'
  },
  APPTYPE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'APPTYPE',
    // 属性中文名称
    fieldName: '模型类型',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'select',
    // 默认的值
    defaultValue: '',
    // 映射关系
    selectedKeyMap: {
      label: 'DICDESC',
      value: 'DICVALUE'
    },
    dicCode: 'SYSAPPTYPE'
  },
  DATASOURCE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'DATASOURCE',
    // 属性中文名称
    fieldName: '数据源',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 组件类型
    inputType: 'select',
    // 是否必填
    isrequired: true,
    // 映射关系
    selectedKeyMap: {
      label: 'DSNAME',
      value: 'DSID'
    },
    dicCode: 'SYSDATASOURCE'
  },
  SOURCETYPE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'SOURCETYPE',
    // 属性中文名称
    fieldName: '来源类型',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'table',
    // 默认的值
    defaultValue: 'SYSTEM',
    // 映射关系
    selectedKeyMap: {
      label: 'DICDESC',
      value: 'DICVALUE'
    },
    dicCode: 'SYSAPPSOURCETYPE'
  },
  CITY: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'CITY',
    // 属性中文名称
    fieldName: '市',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'city',
    // 当是模态框时 需要渲染并请求第三方数据时，指定的渲染页面，与requestUrl、selectedKeyMap 配合使用
    requestPage: '',
    // 当是模态框时 需要渲染并请求第三方数据时，指定的请求地址，与requestPage、selectedKeyMap 配合使用
    requestUrl: 'sys/base/city/findCityPage',
    // 当是模态框时 需要渲染并请求第三方数据时，指定的指定的内容与组件的映射关系，与requestUrl、requestPage 配合使用 或 combo、chosen的映射关系
    selectedKeyMap: {
      resultNodeCode: 'code',
      resultCodeValue: 0,
      childNodeName: 'data'
    },
    // 提交数据
    requestBody: {
      type: Object,
      value: {
        key: 'A^B^C^D^E^F^G^H^I^J^K^L^M^N^O^P^Q^R^S^T^U^V^W^X^Y^Z',
        metheodType: 'letterAll'
      }
    },
    dicCode: 'SYSCITY'
  },
  MAINTABLE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'MAINTABLE',
    // 属性中文名称
    fieldName: '主表',
    // 分组 区块 名称
    fldGroupCode: 'basic',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'text'
  },
  FILEPATH: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'FILEPATH',
    // 属性中文名称
    fieldName: '附件',
    // 分组 区块 名称
    fldGroupCode: 'form',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'upload'
  },
  TITLE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'TITLE',
    // 属性中文名称
    fieldName: '展示数值',
    // 分组 区块 名称
    fldGroupCode: 'form',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'double'
  },
  PICVIEWER: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'PICVIEWER',
    // 属性中文名称
    fieldName: '展示图片',
    // 分组 区块 名称
    fldGroupCode: 'form',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'picview',
    // 数据字典
    dicCode: 'picvalue'
  },
  APPFILTER: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'APPFILTER',
    // 属性中文名称
    fieldName: '模型条件',
    // 分组 区块 名称
    fldGroupCode: 'form',
    // 是否必填
    isrequired: false,
    // 组件类型
    inputType: 'textarea',
    // 默认的值
    defaultValue: ''
  },
  PSIZE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'PSIZE',
    // 属性中文名称
    fieldName: '分页偏移量',
    // 分组 区块 名称
    fldGroupCode: 'form',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'long',
    // 默认的值
    defaultValue: '20'
  },
  SORTBY: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'SORTBY',
    // 属性中文名称
    fieldName: '排序字段',
    // 分组 区块 名称
    fldGroupCode: 'form',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'text',
    // 默认的值
    defaultValue: ''
  },
  ENABLELOG: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'ENABLELOG',
    // 属性中文名称
    fieldName: '记录日志？',
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'check',
    // 映射关系
    selectedKeyMap: {
      label: 'DICDESC',
      value: 'DICVALUE'
    },
    // 默认的值
    defaultValue: 'N'
  },
  ENABLECACHE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'ENABLECACHE',
    // 属性中文名称
    fieldName: '缓存？',
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 是否必填
    isrequired: true,
    // 组件类型
    inputType: 'check',
    // 映射关系
    selectedKeyMap: {
      label: 'DICDESC',
      value: 'DICVALUE'
    },
    // 默认的值
    defaultValue: 'N'
  },
  CARDCOLS: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'CARDCOLS',
    // 属性中文名称
    fieldName: '表单列数',
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 组件类型
    inputType: 'long',
    // 是否必填
    isrequired: true,
    // 默认的值
    defaultValue: '2'
  },
  REMARK: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'REMARK',
    // 属性中文名称
    fieldName: '备注',
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 组件类型
    inputType: 'textarea'
  },
  HELP: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'HELP',
    // 属性中文名称
    fieldName: '帮助',
    // 是否必填
    isrequired: true,
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 组件类型
    inputType: 'textarea'
  },
  BEGINDATE: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'BEGINDATE',
    // 属性中文名称
    fieldName: '生效日期',
    // 是否必填
    isrequired: true,
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 组件类型
    inputType: 'date'
  },
  CREATETIME: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'CREATETIME',
    // 属性中文名称
    fieldName: '填单日期',
    // 是否必填
    isrequired: true,
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 组件类型
    inputType: 'datetime'
  },
  UPDATETIME: {
    // 表名称
    tableName: 'SYSAPP',
    // 字段编码
    fieldCode: 'UPDATETIME',
    // 属性中文名称
    fieldName: '更新时间',
    // 是否必填
    isrequired: true,
    // 分组 区块 名称
    fldGroupCode: 'other',
    // 组件类型
    inputType: 'datetime'
  }
}
// /**
//  * 事件集合
//  */
// const methods = {
//   /**
//    * 查询方法
//    * 利用查询条件（searchObj对象）及分页条件（pagination对象）拼装条件查询后端
//    */
//   query() {
//     this.isLoading = true;
//     this.value = [];
//     this.$http.get(`/server/api/SYSTEM/SYSMODEL/listinfo?AID=SYSAPP&PAGENUM=${this.vm.tableInfo.pageNum}&PAGESIZE=${this.vm.tableInfo.pageSize}`).then((result) => {
//       result.DATA.forEach((d, index) => {
//         this.value.push({
//           ...d, rownum: index + 1,
//         });
//       });
//       this.vm.tableInfo.totalSize = result.TOTALSIZE;
//     }).catch((result) => {
//       result.DATA.forEach((d, index) => {
//         this.value.push({
//           ...d, rownum: index + 1,
//         });
//       });
//       this.vm.tableInfo.totalSize = result.TOTALSIZE;
//     }).finally(() => {
//       this.isLoading = false;
//     });
//   },
//   /**
//    * 删除操作之前的处理，可校验是否可以删除，返回ture进行下一步，返回false则放弃
//    */
//   beforeDelete() {
//     return new Promise((resolve, reject) => {
//       this.$http.get(`/server/api/SYSTEM/SYSMODEL/listinfo?AID=SYSAPP&PAGENUM=${this.vm.tableInfo.pageNum}&PAGESIZE=${this.vm.tableInfo.pageSize}`).then(() => {
//         resolve(true);
//       }).catch(() => {
//         reject();
//       });
//     });
//   },
//   /**
//    * 删除操作
//    * @param {*} delObjs 删除多个对象
//    */
//   delete(delObjs) {
//     return new Promise((resolve) => {
//       resolve(delObjs);
//     });
//   },
//   /**
//    * 删除之后执行自定义操作
//    */
//   afterDelete() {
//   },
//   /**
//    * 点击编辑按钮后，打开弹窗前执行的操作，在此可以校验是否可以编辑，返回ture进行下一步，返回false则放弃
//    * 自定义校验规则
//    * 数据对象为this.selectObj
//    */
//   beforeEdit() {
//     return new Promise((resolve) => {
//       resolve({});
//     });
//   },
//   /**
//    * 点击保存之前的操作，可以做校验，调整数据内容，返回ture则可以提交保存，返回false则放弃保存
//    * 数据对象为this.selectObj
//    */
//   beforeSave() {
//   },
//   /**
//    * 保存操作，此操作执行完后将执行方法this.query()
//    */
//   save() {
//     return new Promise((resolve) => {
//       resolve({});
//     });
//   },
//   /**
//    * 保存完成后执行的操作，不论是否成功都将执行
//    */
//   afterSave() {
//   },
// };
/**
 * 获取列
 * @param {*} cols 列
 * @param {*} field 字段
 * @param {*} vm 模型
 */
function getCols (columns = 1, field, vm) {
  field.span = 24 / (vm.columnSize || 3) * (field.column || 1)
  if ((field.column || 1) + columns <= vm.columnSize) {
    return true
  }
  return false
}
/**
 * 获取查询表单的行列，第一行 及 最后一行 根据参数的值确定是否需要加入查询及重置按钮
 * @param {*} group 模型
 * @param {*} isOpen 是否展开
 */
function initSearchModel (group = {}, isOpen) {
  const row = []
  let cols = []
  let columns = 0
  const span = 24 / (group.columnSize || 3)
  if (group.fields) {
    group.fields.forEach((field) => {
      // 第一行末尾 先加入查询及重置按钮，在新的一行加入当前遍历字段
      if (isOpen === false && columns === group.columnSize - 1 && row.length === 0) {
        cols.push({ inputType: 'searchBtn', span })
        row.push([...cols])
        cols = []
        columns = field.column || 1
      } else if (getCols(columns, field, group) === false) {
        // 需要换行
        if (cols.length !== 0) {
          row.push([...cols])
          cols = []
        }
        columns = field.column || 1
      } else {
        columns += field.column || 1
      }
      cols.push({ ...group.fields[field.fieldCode], ...field })
    })
    if (isOpen === false) {
      // 判断是否只有一行
      for (let i = cols.length; i < group.columnSize; i++) {
        if (group.columnSize - 1 !== cols.length) {
          cols.push({ inputType: 'space', span })
        } else {
          cols.push({ inputType: 'searchBtn', span })
        }
      }
    }
    // 最后一行加入到行集合中
    if (cols.length !== 0) {
      row.push(cols)
    }
    // 判断是最后一行且是否最后一行满行，如果是满行则新起一行，在新行中最后一列加入查询及重置字段
    if (isOpen === true) {
      if (cols.length === group.columnSize) {
        const lastestCols = []
        for (let i = 0; i < group.columnSize - 1; i++) {
          lastestCols.push({ inputType: 'space', span })
        }
        lastestCols.push({ inputType: 'searchBtn', span })
        row.push(lastestCols)
      } else {
        // 计算出已经占有的列上格栅数
        let spans = 0
        for (let i = 0; i < group.columnSize - 1; i++) {
          if (cols.length <= i) {
            if (spans + span < 24) {
              cols.push({ inputType: 'space', span })
            }
          } else {
            spans += cols[i].span
          }
        }
        cols.push({ inputType: 'searchBtn', span })
      }
    }
  }
  return row
}
/**
 * 获取表单的行列
 * @param {*} group 表单组模型
 */
function initFormOneModel (group = {}) {
  const row = []
  let cols = []
  let columns = 0
  group.fldGroup[0].fields.forEach((field) => {
    // 隐藏字段配置中如果没有属性或属性值为false的时候显示该字段
    if (group.hiddenFields[field.fieldCode] === undefined || group.hiddenFields[field.fieldCode] === false) {
      if (getCols(columns, field, group) === false) {
        if (cols.length !== 0) {
          row.push([...cols])
          cols = []
        }
        columns = field.column || 1
      } else {
        columns += field.column || 1
      }
      // 当字段配置进行移动后会导致找不到物理表字段则从子表中查找
      if (group.fields[field.fieldCode] === undefined) {
        if (group.children && group.children[0]) {
          cols.push({
            ...group.children[0].fields[field.fieldCode],
            ...field,
            ...group.requiredFields[field.fieldCode], // 覆盖必填
            ...group.readonlyFields[field.fieldCode] // 覆盖只读
          })
        }
      } else {
        cols.push({
          ...group.fields[field.fieldCode],
          ...field,
          ...group.requiredFields[field.fieldCode], // 覆盖必填
          ...group.readonlyFields[field.fieldCode] // 覆盖只读
        })
      }
    }
  })
  if (cols.length !== 0) {
    row.push(cols)
  }
  return row
}
/**
 * 获取表单的校验规则
 * @param {*} group 表单模型
 */
function initRuleOneModel (group = {}) {
  const rules = {}
  group.fldGroup[0].fields.forEach((field) => {
    // 必填
    const f = { ...group.fields[field.fieldCode], ...field, ...group.requiredFields[field.fieldCode] }
    const rule = []
    switch (f.inputType) {
      case 'date':
      case 'datetime':
      case 'time':
      case 'datepicker':
      case 'datetimepicker':
      case 'timepicker':
        if (f.isrequired === true) {
          rule.push({
            type: 'date', required: true, message: `${f.fieldName}不能为空`, trigger: 'change'
          })
        }
        let mRule = {}
        if (f.maxlength && f.maxlength !== 0) {
          mRule = {
            max: true, message: `最长不能超过${f.length}`, trigger: 'change'
          }
        }
        if (f.minlength && f.minlength !== 0) {
          if (mRule.max === true) {
            mRule = { ...mRule, min: f.minlength, message: `${f.fieldName}长度需介于${f.minlength}，${f.maxlength}之间` }
          } else {
            mRule = {
              min: true, message: `最短不能小于${f.minlength}`, trigger: 'change'
            }
          }
        }
        if (mRule.min === true || mRule === true) {
          rule.push(mRule)
        }
        break
      case 'combo':
      case 'radio':
      case 'chosen':
      case 'component':
      case 'table':
      case 'check':
      case 'checkbox':
      case 'upload':
        rule.push({
          type: 'array', required: true, message: `${f.fieldName}不能为空`, trigger: 'change'
        })
        break
      default:
        if (f.isrequired === true) {
          rule.push({
            required: true, message: `${f.fieldName}不能为空`, trigger: 'blur'
          })
        }
        let mRule0 = {}
        if (f.maxlength && f.maxlength !== 0) {
          mRule0 = {
            max: true, message: `最长不能超过${f.length}`, trigger: 'blur'
          }
        }
        if (f.minlength && f.minlength !== 0) {
          if (mRule0.max === true) {
            mRule0 = { ...mRule, min: f.minlength, message: `${f.fieldName}长度需介于${f.minlength}，${f.maxlength}之间` }
          } else {
            mRule0 = {
              min: true, message: `最短不能小于${f.minlength}`, trigger: 'blur'
            }
          }
        }
        if (mRule0.min === true || mRule0 === true) {
          rule.push(mRule0)
        }
    }
    if (rule.length !== 0) {
      rules[`${f.tableName}___${f.fieldCode}`] = rule
    }
  })
  return rules
}
/**
 * 获取浏览表单的行列
 * @param {*} group 表单模型
 */
function initViewOneModel (group = {}) {
  const row = []
  let cols = []
  let columns = 0
  group.fldGroup[0].fields.forEach((field) => {
    if (getCols(columns, field, group) === false) {
      if (cols.length !== 0) {
        row.push([...cols])
        cols = []
      }
      columns = field.column || 1
    } else {
      columns += field.column || 1
    }
    // 当字段配置进行移动后会导致找不到物理表字段则从子表中查找
    if (group.fields[field.fieldCode] === undefined) {
      if (group.children && group.children[0]) {
        cols.push({
          ...group.children[0].fields[field.fieldCode],
          ...field,
          placeholder: '',
          isrequired: false,
          readonly: true,
          disabled: false
        })
      }
    } else {
      cols.push({
        ...group.fields[field.fieldCode],
        ...field,
        placeholder: '',
        isrequired: false,
        readonly: true,
        disabled: false
      })
    }
  })
  if (cols.length !== 0) {
    row.push(cols)
  }
  return row
}
/**
 * 获取列表的列
 * @param {*} group 列表模型
 */
function initTableOneModel (group = {}) {
  const row = []
  const cols = []
  group.fldGroup[0].fields.forEach((field) => {
    cols.push({ ...group.fields[field.fieldCode] })
  })
  if (cols.length !== 0) {
    row.push(cols)
  }
  return row
}
/**
 * 获取表单的行列
 * @param {*} group 查看模型
 */
function initFormModel (group = {}) {
  if (group.viewType === 'form') {
    // 获取只读字段
    const readonlyFields = {}
    if (group.readonlyFieldCodes) {
      group.readonlyFieldCodes.forEach((fieldCode) => {
        readonlyFields[fieldCode] = true
      })
    }
    group.readonlyFields = readonlyFields
    // 获取隐藏字段
    const hiddenFields = {}
    if (group.hiddenFieldCodes) {
      group.hiddenFieldCodes.forEach((fieldCode) => {
        hiddenFields[fieldCode] = true
      })
    }
    group.hiddenFields = hiddenFields
    const requiredFields = {}
    // 获取只读字段
    if (group.requiredFieldCodes) {
      group.requiredFieldCodes.forEach((fieldCode) => {
        requiredFields[fieldCode] = { isrequired: true }
      })
    }
    group.requiredFields = requiredFields
    group.infoRow = initFormOneModel(group)
    if (group.children) {
      group.children.forEach((cgroup) => {
        // 获取只读字段
        const creadonlyFields = {}
        if (cgroup.readonlyFieldCodes) {
          cgroup.readonlyFieldCodes.forEach((fieldCode) => {
            creadonlyFields[fieldCode] = true
          })
        }
        cgroup.readonlyFields = creadonlyFields
        // 获取隐藏字段
        const chiddenFields = {}
        if (cgroup.hiddenFieldCodes) {
          cgroup.hiddenFieldCodes.forEach((fieldCode) => {
            chiddenFields[fieldCode] = true
          })
        }
        cgroup.hiddenFields = chiddenFields
        const crequiredFields = {}
        // 获取只读字段
        if (cgroup.requiredFieldCodes) {
          cgroup.requiredFieldCodes.forEach((fieldCode) => {
            crequiredFields[fieldCode] = { isrequired: true }
          })
        }
        cgroup.requiredFields = crequiredFields
        cgroup.infoRow = initFormOneModel(cgroup)
      })
    }
  }
}
/**
 * 获取表单输入的校验规则
 * @param {*} group 模型
 */
function initRuleModel (group = {}) {
  if (group.viewType === 'form') {
    group.ruleInfo = initRuleOneModel(group)
    if (group.children) {
      group.children.forEach((cgroup) => {
        if (cgroup.viewType === 'form') {
          cgroup.ruleInfo = initRuleOneModel(cgroup)
        }
      })
    }
  }
}
/**
 * 获取表单的行列
 * @param {*} group 查看模型
 */
function initViewModel (group = {}) {
  if (group.viewType === 'form') {
    group.infoRow = initViewOneModel(group)
    if (group.children) {
      group.children.forEach((cgroup) => {
        if (cgroup.viewType === 'form') {
          cgroup.infoRow = initViewOneModel(cgroup)
        }
      })
    }
  }
}
/**
 * 初始化列表行
 * @param {*} group 列表模型
 */
function initTableModel (group = {}) {
  let infoRow = []
  if (group.viewType === 'links') {
    infoRow = infoRow.concat(...initTableOneModel(group))
  }
  return infoRow
}
export default {
  searchInfo, formInfo, viewInfo, select, fields, tableInfo, initFormModel, initRuleModel, initViewModel, initSearchModel, initTableModel
}
