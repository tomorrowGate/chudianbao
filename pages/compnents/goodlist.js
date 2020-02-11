// pages/compnents/goodlist.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brand: {
      type: Object,
      value:{
        isBrand: true,//是品牌商
        pcategory: [],
        isImgRect:true//是否需要图片正方形显示
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* brand: {
        isBrand: true,//是品牌商
        pcategory: []
    }, */
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_pcategory: function () {
      //获取对应的品牌分类
      var user_id = wx.getStorageSync('user_id');
      var brand_id = wx.getStorageSync('brand_id');
      var that = this;
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_pcategory',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id: user_id,
          brand_id: brand_id
        },
        success: function (res) {
          console.log(res);
          var pcategory_data = res.data.retval;
          that.setData({
            'brand.pcategory': pcategory_data
          });
        },
        fail: function (err) {
          console.log(err);
        },
        complete: function (res) {
          console.log(res);
        }
      })
    },
    goSkip(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
  , lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      //this.get_pcategory()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
