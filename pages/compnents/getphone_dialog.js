// pages/compnents/getphone_dialog.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /* isMaskHide:{
      type: Object,
      value: false
    } */
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    phone:"",
    isMaskHide:true
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
      animation.rotateX(90).step()
      this.setData({
        animationData: animation.export()
      })
    },
    fadeIn() {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      });
      this.animation = animation
      animation.rotateX(0).step()
      this.setData({
        animationData: animation.export()
      })
    },
    cencle(){
      return false
    },
    getPhoneNumber(e){
      var that = this
      app.getPhoneNumber(e)
        .then(res=>{
          
          that.fadeOut()
          that.setData({
            isMaskHide: true
          })
        })
        .catch(err=>{
          console.log(err, 1111)
        })
    },
      getUserById: function (user_id) {
      var that = this;
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=getUserById',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id,
        },
        success: function (res) {
          console.log(res);
          var data = res.data.retval;
          if (!res.data.retval.phone_mob){//有手机号
            that.setData({
              isMaskHide:false
            })
          }
        },
        fail: function (err) {
          // console.log(err);
        },
        complete: function (res) {
          //console.log(res);
        }
      })
    },
  }, 
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getUserById(wx.getStorageSync('user_id'))
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }

})
