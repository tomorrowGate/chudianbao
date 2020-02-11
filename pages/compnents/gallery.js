// pages/compnents/ gallery.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gallery:{
      type:Object,
      value:{
        showDialog: false
        , imgsrc: ""
        , isBrandShow: false
      },
      observer(newVal, oldVal, changePath) {
        if (newVal.showDialog){
          this.fadeIn()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* showDialog: false */
    /* isBrandShow:false */
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleDialog() {
      this.setData({
        'gallery.showDialog': false,
        /* 'gallery.showDialog': !this.properties.gallery.showDialog */
      });
      console.log(this.properties.gallery.showDialog)
      this.properties.gallery.showDialog ? this.fadeIn() : this.fadeOut()
     /*  this.triggerEvent('toggleDialog') */
    },
    stopProp(e){
      /* just for stopPropgation */
      // console.log(e)
    },
    sure(){
      //this.toggleDialog()
      this.triggerEvent('sure')
    },
    fadeOut(){
      app.sliderightshow(this,'animation',750,0)
    },
    fadeIn(){
      app.sliderightshow(this, 'animation', 0, 1)
    },
  }
  , lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.animation = wx.createAnimation()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
