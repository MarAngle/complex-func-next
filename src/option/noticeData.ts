let noticeData = {
  showMsg: function(content: string, type?: string, title?:string, duration?: number, option: any = {}) {
    console.error('notice对应方法未定义')
  },
  alert: function(content: string, title?: string, next?: (act: string) => void, okText?: string) {
    console.error('notice对应方法未定义')
  },
  confirm: function(content: string, title?: string, next?: (act: string) => void, okText?: string, cancelText?: string) {
    console.error('notice对应方法未定义')
  },
  setMsg: function(...args: any[]) {
    console.error('notice对应方法未定义')
  }
}

export default noticeData
