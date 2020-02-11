// pica/pages/pica_sharecard/pica_sharecard.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareId:0,
    share:{
      isShare:true
    },
    brief: {
      logo: "",
      brand_name: "",
      brand_content: "",
      address: "",
      identity_str: "",
      identity: 0,
      isbrief: false, //是否要打开简介
      isshopbrief: false,
    },
    shareInfo:{
      identity_str: "",
      region_name: "",
      address: "",
      phone_mob: "",
      wx_id: ""
    },
    identity_str:"",
    identity:"",

    imgUrls: '',
    username: '',
    brand_name: '',
    brandorigin: '',
    isstore: false,
    isbrand: false,
    issimple: false,
    identity_num: 0,
    region_name: "",
    address: "",
    phone_mob: "",
    wx_id: "",
    user_id:"",
    real_name2:""
  },
  addPhoneContact() {
    var mobilePhoneNumber = this.data.phone_mob
    var weChatNumber = this.data.wx_id
    var firstName = this.data.real_name2
    wx.addPhoneContact({
      firstName,
      mobilePhoneNumber,
      weChatNumber,
      success(res) {
        console.log(res, '大帅哥')
      }
    })
  },
  get_hkb_info: function () {
    //获取品牌商和经销商的信息
    var user_id = wx.getStorageSync('user_id');
    var identity = wx.getStorageSync('identity');
    var identity_str = wx.getStorageSync('identity_str');
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_hkb_info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        identity: identity,
      },
      success: function (res) {
        //console.log(res);
        wx.setStorageSync('brand_id', res.data.retval.brand_id);
        that.setData({
          "brief.logo": app.globalData.url + "" + res.data.retval.brand_logo,
          "brief.brand_name": res.data.retval.brand_name,
          "brief.brand_content": res.data.retval.brand_introduce,
          "brief.identity_str": identity_str,
          "brief.identity": identity,
          identity_str: identity_str,
          identity: identity
        })
      },
      fail: function (err) {
      }
      ,
      complete: function (res) {
      }
    })
  },
  shareCard(e) {
    console.log(e)
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
        that.setData({
          'userInfo.username': data.nickname,
          'userInfo.identity_str': data.identity_str,
          'userInfo.imgUrls': data.headimgurl,
          'userInfo.brand_name': data.brand_name,

          "brief.logo": app.globalData.url + "" + data.brand_logo,
          "brief.brand_name": data.brand_name,
          "brief.brand_content": data.brand_introduce,
          "brief.identity_str": data.identity_str,
          "brief.identity": data.im_aliww,

          phone_mob: data.phone_mob,
          real_name2: data.real_name2,

          imgUrls: data.headimgurl,
          username: data.nickname,
          identity_str: data.identity_str,
          brand_name: data.brand_name,
          region_name: data.region_name,
          address: data.address,
          wx_id: data.wx_id,

          'shareInfo.region_name': data.region_name,
          'shareInfo.address': data.address,
          'shareInfo.phone_mob': data.phone_mob,
          'shareInfo.wx_id': data.wx_id,
          'shareInfo.brand_name': data.brand_name,
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
  getShareInfo(user_id){
    var that = this
   
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_share_info',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id: user_id,
        },
        success: function (res) {
          console.log(res);
          //if(res.)
          that.setData({
            //头像
            imgUrls: res.data.retval.headimgurl,
            username: res.data.retval.nickname,
            identity_str: res.data.retval.identity_str,
            brand_name: res.data.retval.brand_name,
            region_name: res.data.retval.region_name,
            address: res.data.retval.address,
            wx_id: res.data.retval.wx_id,

            //用户信息
            "shareInfo.phone_mob": res.data.retval.phone_mob,
            "shareInfo.wx_id": res.data.retval.wx_id,
            "shareInfo.brand_name": res.data.retval.brand_name,
            "shareInfo.address": res.data.retval.address,
            "shareInfo.region_name": res.data.retval.region_name,

            user_id: user_id
          })

        },
        fail: function (err) {

        },
        complete: function (res) {

        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'share')
    var shareId = options.user_id
    this.setData({
      shareId,
    })
    
    this.get_hkb_info(options.user_id)
    /* this.getShareInfo(options.user_id) */
    this.getUserById(options.user_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var user_id = this.data.shareId;
    return {
      title: "厨电宝",
      path: "/pica/pages/pica_sharecard/pica_sharecard?user_id=" + user_id
    }
  }
})