// pages/compnents/brief.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brief:{
      type: Object,
      value:{
        logo: "",
        brand_name: "brand_name",
        brand_content: "brand_content",
        address: "",
        identity_str: "identity_str",
        identity: 0,
        //要打开简介
        isbrief: false,
        isshopbrief: false,
        /* brand: {
          isBrand: true //是品牌商
        }, */
      }
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
    gotMoreMsg(e) {
      this.setData({
        'brief.isbrief': !this.data.brief.isbrief
      })
    },
  }
  , lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
