// pages/compnents/share_datas.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    identity:{
      type: String,
      value: wx.getStorageSync("identity")
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sharesData: {
      myDistribute: 0,
      myCustomer: 0,
      weekShare: 0,
      weekView: 0,
      totalShare: 0,
      totalView: 0
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goStatistics() {
      /* this.triggerEvent('goStatistics') */
      wx.navigateTo({
        url: '/hkb/pages/statistics_index?sharesData=' + this.data.sharesData,
      })
    },
    getFive() {
      var user_id = wx.getStorageSync('user_id');
      console.log(user_id,"----------------")
      var that = this
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_five',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id: user_id,
        },
        success: function (res) {
          console.log(res);
          if (res.data.done) {
            that.setData({
              "sharesData.myDistribute": res.data.retval.num1,
              "sharesData.myCustomer": res.data.retval.num1,
              "sharesData.weekView": res.data.retval.num2,
              "sharesData.weekShare": res.data.retval.num3,
              "sharesData.totalView": res.data.retval.num4,
              "sharesData.totalShare": res.data.retval.num5,
            })
          }
        },
        fail: function (err) {
          //console.log(err);
        }
        ,
        complete: function (res) {
          //console.log(res);
        }
      })
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.getFive()
      this.setData({
        identity: wx.getStorageSync("identity")
      })
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执
      this.getFive()
      this.setData({
        identity: wx.getStorageSync("identity")
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
