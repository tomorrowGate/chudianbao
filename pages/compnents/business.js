// pages/compnents/buss.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object,
      value:{
        imgUrls: '',
        username: '',
        brand_name: '',
        brandorigin: '',
        isstore: false,
        isbrand: false,
        issimple: false,
        identity_num: 0,
        result: '',//存储后台传到前台的值
        identity_str: "",
        region_name: wx.getStorageSync('region_name'),
        address: wx.getStorageSync('address'),
        phone_mob: wx.getStorageSync('phone_mob'),
        wx_id: ""
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
    getUser() {
      this.setData({
        imgUrls: wx.getStorageSync('headimgurl'),
        username: wx.getStorageSync('nickname'),
        identity_str: wx.getStorageSync('identity_str'),
        brand_name: wx.getStorageSync('brand_name'),
        region_name: wx.getStorageSync('region_name'),
        address: wx.getStorageSync('address'),
        wx_id: wx.getStorageSync('wx_id'),
      })
    },
  }
  , lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getUser()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
