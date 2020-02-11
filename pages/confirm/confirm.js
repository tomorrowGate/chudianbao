// pages/confirm/confirm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showTabbar(){
      wx.showTabBar({
        animation:true,
        success(){
          console.log("成功")
        },fail(){
          console.log(arguments)
        }
      })
      
    }
  },
  /* 生命周期 */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.showTabbar()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
