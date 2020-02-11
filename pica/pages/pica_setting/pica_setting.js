// pica/pages/pica_setting/pica_setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_mob: "",
    isPhoneBind: false,
    wxNick: "",
    isWxCheck: false,
    code: "",
    isPhoneInput: false,
    isWxInput: false,
    wx_id: "",

    btn: false,

    storeInfo: {
      isErro: false,
      tel: "",
      wxId: ""
    },
    animationData: {}
  },
  goMyMsg(e) {
    wx.navigateTo({
      url: '/pica/pages/pica_personInfo/pica_personInfo',
    })
  },
  goReAuthe() {
    wx.reLaunch({
      url: '/pages/index/authorize',
    })
  },
  getUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) { //已经授权过了
      this.setData({
        isWxCheck: true
      })
      wx.showToast({
        title: '您已绑定微信号',
        icon: "none"
      })
    } else {
      wx.reLaunch({
        url: '/pages/index/authorize',
      })
    }
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
        let phone_mob = data.phone_mob
        let wx_id = data.wx_id
        let isPhoneBind = !!phone_mob ? true : false
        let isWxCheck = !!wx_id ? true : false
        that.setData({
          phone_mob,
          isPhoneBind,
          wx_id,
          isWxCheck
        })
      },
      fail: function (err) {
        // console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  submitInfo() {
    //向后台发送请求--修改手机号
    var that = this;
    var edit_phone = this.data.storeInfo.tel;
    console.log(this.data.storeInfo.tel, 'err', edit_phone)
    var user_id = wx.getStorageSync('user_id');

    if (!user_id) {
      wx.showToast({
        title: '账号异常',
      })
      wx.reLaunch({
        url: '/pages/index/authorize',
      })
      return;
    }
    //console.log(this.data.phone_mob, wx.getStorageSync('phone_mob'),'+++++')
    if (edit_phone == wx.getStorageSync('phone_mob')) {
      console.log("两次手机一致")
      return
    }
    wx.showLoading({
      title: '正在设置',
      mask: "true"
    })
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=edit_phone_mob',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        phone_mob: edit_phone,
      },
      success: function(res) {
        //console.log(res);
        if (res.data.done) {
          //存数据
          wx.hideLoading()
          wx.setStorageSync('phone_mob', edit_phone); //手机号
          that.setData({
            phone_mob: edit_phone
          })
          wx.showToast({
            title: res.data.retval,
          })
          return;
        } else {
          wx.hideLoading()
          console.log(res.data.msg, '设置')
          /*  wx.showToast({
             title: res.data.msg,
             icon: "none"
           }) */
          return;
        }
      },
      fail: function(err) {
        wx.hideLoading()
        wx.showToast({
          title: '系统异常',
          icon: "none"
        })
        return;
      },
      complete: function(res) {
        //console.log(res);
      }
    })
  },
  submitInfo_wx_id() {
    //向后台发送请求--修改微信号
    var that = this;
    var wx_id = this.data.storeInfo.wxId;
    //console.log(wx_id,"************************************");
    var user_id = wx.getStorageSync('user_id');

    if (!user_id) {
      wx.showToast({
        title: '账号异常',
        icon: "none"
      })
      wx.reLaunch({
        url: '/pages/index/authorize',
      })
      return;
    }
    console.log(this.data.wx_id, wx.getStorageSync('wx_id'), wx_id, 32156)
    if (wx_id == wx.getStorageSync('wx_id')) {
      console.log("两次微信一致")
      return
    }
    wx.showLoading({
      title: '正在设置',
      mask: "true"
    })
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=edit_wx_id',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        wx_id: wx_id,
      },
      success: function(res) {
        console.log(res);
        if (res.data.done) {
          //存数据
          wx.hideLoading()
          wx.setStorageSync('wx_id', wx_id);
          that.setData({
            wx_id: wx_id
          })
          wx.showToast({
            title: res.data.retval,
          })
          return;
        } else {
          console.log(res.data.msg)
          wx.hideLoading()
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
          return;
        }

      },
      fail: function(err) {
        wx.showToast({
          title: '系统异常',
          icon: "none"
        })
        return;
      },
      complete: function(res) {
        //console.log(res);
      }
    })
  },
  openDia(e) {
    if (e.currentTarget.dataset.type == "phone") {
      this.setData({
        isPhoneInput: true,
        'storeInfo.tel': e.currentTarget.dataset.phone
      })
    } else {
      this.setData({
        isPhoneInput: false,
        'storeInfo.wxId': e.currentTarget.dataset.wx
      })
    }
    this.showDia()
    this.fadeIn()
  },
  hideDia() {
    this.setData({
      btn: false
    })
  },
  showDia() {
    this.setData({
      btn: true
    })
  },
  sure(e) {
    var str = this.data.storeInfo.tel
    //console.log(str, 'sure')
    if (e.currentTarget.dataset.type == "phone") {
      this.checkTel(str)
        .then(res => {
          console.log(res, 999)
          this.submitInfo()
        })
        .catch(rej => {
          console.log(rej)
        })
    } else {
      if (this.data.wx_id.length <= 0) {
        wx.showToast({
          title: '微信号不能为空',
          icon: 'none',
        })
      } else {
        //发送请求
        this.submitInfo_wx_id()
      }
    }
    this.fadeOut()
    this.hideDia()
  },
  cencle(e) {
    this.fadeOut()
    this.hideDia()
  },
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
  setPhone(e) {
    //设置手机号
    this.setData({
      "storeInfo.tel": e.detail.value
    })
    console.log(this.data.storeInfo.tel, 296)
  },
  setWx(e) {
    console.log(e, 6498)
    this.setData({
      'storeInfo.wxId': e.detail.value
    })
    console.log(this.data.storeInfo.wxId)
  },
  checkTel(str) {
    //检验是否符合手机号
    return new Promise((resove, rej) => {
      let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (reg.test(str)) {
        this.setData({
          "storeInfo.isErro": false,
          "storeInfo.tel": str
        })
        resove(str)
      } else {
        wx.showToast({
          title: '手机号码有问题',
          icon: 'none',
        })
        this.setData({
          "storeInfo.isErro": true
        })
        rej(str)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserById(wx.getStorageSync("user_id"))
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})