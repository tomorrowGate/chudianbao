// pages/compnents/article_dialog.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isMask:{
      type:Boolean,
      value: true,
      observer:function(){
        console.log(this.properties.isMask,'observer')
        if (!this.properties.isMask){
          this.fadeIn()
        }
      }
    },
    detail:{
      type:Object,
      value:{
        setmeal_remark:"",
        setmeal_name:""
      },
    }
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
    fadeOut() {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      });
      this.animation = animation
      animation.scaleY(0.0001).step()//反正是不能设置为0
      this.setData({
        animationData: animation.export()
      })
    },
    fadeIn() {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      this.animation = animation
      animation.scaleY(1).step()
      this.setData({
        animationData: animation.export()
      })
    },
    cencle() {
      this.fadeOut()
      this.setData({
        isMask:true
      })
      //return false
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
