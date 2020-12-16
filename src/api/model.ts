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
  GetTableByDsid: '/SYSTEM/SYSMODEL/getTableByDsid'
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
  }
}
