// pages/compnents/dialog_index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialog:{
      type:Object,
      value:{
        isDone:false,
        showText: '您还没有完成认证入驻，不能查看品牌信息哦~',
        btnText: '前往完成认证'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showText: '您还没有完成认证入驻，不能查看品牌信息哦~',
    btnText:'前往完成认证'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleDialog() {
      /* this.setData({
        showDialog: !this.data.showDialog
      }); */
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancle', myEventDetail, myEventOption)
    },
    stopProp(e){
      /* just for stopPropgation */
      // console.log(e)
    },
    sure(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('sure', myEventDetail, myEventOption)
    },
    fadeOut(){
      
    }
  }
  , lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.animation = wx.createAnimation()
      let identify = wx.getStorageSync('identity');
      if (identify!=0){
        this.setData({
          showText:"您的认证申请已提交，开始您的厨电宝之旅吧~",
          btnText:"确定"
        })
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
