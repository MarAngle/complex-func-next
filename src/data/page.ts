import { anyFunction } from '../../ts'
import throttle from './utils/throttle'

const recount: {
  [prop: PropertyKey]: number
} = {
  data: 0,
  body: 0
}

type dataType = {
  width: number,
  height: number
}

export type modType = {
  change?: anyFunction,
  recount?: (extraData: dataType) => any
}

const mod: {
  [prop: PropertyKey]: modType
} = {}


const page = {
  type: 'default',
  recount: recount,
  data: {
    body: {
      width: 0,
      height: 0
    },
    main: {
      width: 0,
      height: 0
    },
    extra: {
      width: 0,
      height: 0
    }
  },
  mod: mod,
  setType(type: string) {
    this.type = type
  },
  // 添加模块
  installMod(name: string, pageMod: modType, unRecount?: boolean) {
    if (pageMod) {
      this.mod[name] = pageMod
    }
    this.recount[name] = 0
    if (!unRecount) {
      this.triggerRecount()
      this.recountChange(name)
    }
  },
  // 触发模块变更
  triggerChange(name: string, ...args: any[]) {
    const pageMod = this.mod[name]
    if (pageMod && pageMod.change) {
      pageMod.change(...args)
      this.triggerRecount()
    } else {
      this.triggerRecountMain()
    }
    this.recountChange(name)
  },
  // 重计算
  recountChange(name?: string) {
    if (name) {
      this.recount[name]++
    }
    this.recount.data++
  },
  // 触发重计算
  triggerRecount() {
    this.triggerRecountExtra()
    this.triggerRecountMain()
  },
  // 重计算额外占用部分
  triggerRecountExtra() {
    this.data.extra.width = 0
    this.data.extra.height = 0
    for (const name in this.mod) {
      const pageMod = this.mod[name]
      if (pageMod && pageMod.recount) {
        pageMod.recount(this.data.extra)
      }
    }
  },
  // 重计算可用部分
  triggerRecountMain() {
    this.data.main.width = this.data.body.width - this.data.extra.width
    this.data.main.height = this.data.body.height - this.data.extra.height
  },
  // 设置body数据
  recountBody(extra?: boolean) {
    this.data.body.width = document.documentElement.clientWidth
    this.data.body.height = document.documentElement.clientHeight
    if (extra) {
      this.triggerRecount()
    } else {
      this.triggerRecountMain()
    }
    this.recountChange('body')
  },
  // 加载body
  initBody(offset = 200) {
    this.recountBody(true)
    window.onresize = throttle(() => {
      this.recountBody()
    }, offset, 2)
  },
  init(offset?: number) {
    this.initBody(offset)
  }
}

export default page
